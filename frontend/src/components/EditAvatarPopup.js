import EditProfilePopup from "./EditProfilePopup";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}){

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return(
    <PopupWithForm
      name = "add-new-avatar"
      title = "Обновить аватар"
      buttonText = {isLoading ? "Сохранение..." : "Сохранить"}
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
    >
      <div className="form__input-container">
        <input name='link' type='url' placeholder='Ссылка на картинку' id="place-link-new-avatar"
               className="form__input form__input_value_description" required ref={avatarRef}/>
        <span className="form__input-error place-link-new-avatar-error"/>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
