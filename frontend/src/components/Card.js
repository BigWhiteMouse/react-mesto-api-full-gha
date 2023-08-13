import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}){

  const {name, link, likes} = card;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button_active'}`
  );

  function handleClick () {
    onCardClick(name, link);
  }

  function handleLikeClick(){
    onCardLike(card);
  }

  function handleCardDelete(){
    onCardDelete(card);
  }

  return(
    <li className="element">
      <img className="element__image" alt={name} src={link} onClick={handleClick}/>
      {isOwn && <button type="button" aria-label="Удалить" className="element__delete-button" onClick={handleCardDelete}/>}
      <div className="element__container">
        <p className="element__description">{name}</p>
        <div className="element__likes-container">
          <button type="button" aria-label="Оценить" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <span className="element__likes">{likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
