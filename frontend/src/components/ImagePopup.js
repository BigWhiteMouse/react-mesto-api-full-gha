function ImagePopup({card: {name, link}, onClose}){

  function close(e){
    if (e.target.classList.contains('popup')) onClose();
  }

  return(
    <div className={`popup popup_usage_image ${name ? "popup_visible" : ""}`} onClick={close}>
      <div className="popup__container">
        <button type="reset" aria-label="Закрыть" className="popup__exit-button" onClick={onClose}/>
        <img className="popup__img" alt={name} src={link}/>
        <p className="popup__description">{name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;
