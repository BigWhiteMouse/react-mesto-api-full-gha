import React from "react";
import successIcon from "../images/successIcon.png";
import errorIcon from "../images/errorIcon.png";


function InfoTooltip({isOpen, onClose, isRegistered}) {

  function close(e){
    if (e.target.classList.contains('popup')) onClose();
  }

  return (
    <div className={`popup popup_usage_register ${isOpen ? "popup_visible" : ""}`} onClick={close}>
      <div className="popup__content popup__content_tooltip">
        <button type="reset" aria-label="Закрыть" className="popup__exit-button" onClick={onClose}/>
        <img
          src = {isRegistered ? successIcon : errorIcon}
          alt = {isRegistered ? "Регистрация успешна" : "Что-то пошло не так"}
          className="popup__icon"
        />
        <h2 className="popup__header popup__header_tooltip">
          {isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
