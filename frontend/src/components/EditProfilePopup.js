import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}){

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
      name = "edit-profile"
      title = "Редактировать профиль"
      buttonText = {isLoading ? "Сохранение..." : "Сохранить"}
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
    >
      <div className="form__input-container">
        <input name='name' type='text' placeholder='Имя' id="name-input"
               className="form__input form__input_value_name"
               minLength="2" maxLength="40" required onChange={handleNameChange} value={name || ''}/>
        <span className="form__input-error name-input-error"/>
      </div>
      <div className="form__input-container">
        <input name='description' type='text' placeholder='Вид деятельности' id='description-input'
               className="form__input form__input_value_description" minLength="2" maxLength="200" required
               onChange={handleDescriptionChange} value={description || ''}/>
        <span className="form__input-error description-input-error"/>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
