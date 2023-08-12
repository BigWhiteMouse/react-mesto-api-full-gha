import React from "react";

function PopupWithForm({name, title, buttonText, children, isOpen, onClose, onSubmit}){

  function close(e){
    if (e.target.classList.contains('popup')) onClose();
  }

  return(
    <div className={`popup popup_usage_${name} ${isOpen ? "popup_visible" : ""}`} onClick={close}>
      <div className="popup__content">
        <h2 className="popup__header">{title}</h2>
        <button type="reset" aria-label="Закрыть" className="popup__exit-button" onClick={onClose}/>
        <form name={name} className="form" noValidate onSubmit={onSubmit}>
          {children}
          <button type="submit" aria-label="Сохранить" className="form__submit-button">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
