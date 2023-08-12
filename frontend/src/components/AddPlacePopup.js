import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}){

  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    setName("");
    setImage("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link: image });
  }

  return(
    <PopupWithForm
      name = "add-new-place"
      title = "Новое место"
      buttonText = {isLoading ? "Сохранение..." : "Создать"}
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
    >
      <div className="form__input-container">
        <input name='name' type='text' placeholder='Название' id='place-name-input'
               className="form__input form__input_value_name" minLength="2"
               maxLength="30" required onChange={handleNameChange}
               value={name}/>
        <span className="form__input-error place-name-input-error"/>
      </div>
      <div className="form__input-container">
        <input name='link' type='url' placeholder='Ссылка на картинку' id="place-link-input"
               className="form__input form__input_value_description" required onChange={handleImageChange}
               value={image}/>
        <span className="form__input-error place-link-input-error"/>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
