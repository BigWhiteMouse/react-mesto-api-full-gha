import React from 'react';
import Card from './Card.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" alt="Аватар" src={currentUser.avatar}/>
            <div className="profile__avatar-edit" onClick={onEditAvatar}/>
          </div>
          <div className="profile__info">
            <div className="profile__owner-container">
              <h1 className="profile__owner">{currentUser.name}</h1>
              <button type="button" aria-label="Редактировать" className="profile__edit-button"
                      onClick={onEditProfile}>
              </button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}/>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) =>(
            <Card
              key = {card._id}
              card = {card}
              onCardClick = {onCardClick}
              onCardLike = {onCardLike}
              onCardDelete = {onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;

