import React, {useState, useEffect, useContext} from 'react';
import avatar from '../images/avatar.jpg';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';
import Card from './Card';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';

function Main({props, openState, card, cards, cardsProps}) {
  const currentUser = useContext(CurrentUserContext)

  const {onGetCardsData, onCardLike, onCardDelete, onSetNewCard, onAddCard} = cardsProps

  useEffect(() => {
    onGetCardsData().then(cardsData => {
      cardsData.forEach(item => {
        onSetNewCard(item)
      })
    })
  }, [])

  return (
    <>
      <main className="page">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__avatar-container">
              <img className="profile__avatar" src={currentUser.avatar} alt="Изображение профиля" />
              <div className="profile__avatar-overlay" onClick = {props.onEditAvatar}></div>
            </div>
            <div className="profile__info">
              <div className="profile__title">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button type="button" onClick = {props.onEditProfile} className="profile__edit-btn" aria-label="Кнопка изменения данных профиля"></button>
              </div>
              <p className="profile__profession">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add-btn" onClick = {props.onAddPlace} aria-label="Кнопка добавления новой карточки"></button>
        </section>
          
        <section className="elements">
          {cards.map((card, i) => {
              return (
                <Card card={card} key={i} onCardLike={onCardLike} onImageClick={props.onImageClick} onCardDelete={onCardDelete} />
              )
            })
          }
        </section>
      </main>

      <EditProfilePopup onUpdateUser={props.onSubmit} isOpen={openState.isEditProfilePopupOpen} onClose={props.onClose} />
      <AddPlacePopup isOpen={openState.isAddPlacePopupOpen} onSubmit={onAddCard} onClose={props.onClose} />
      <ImagePopup isOpen={openState.isImagePopupOpen} onClose={props.onClose} card={card}/>

      <PopupWithForm name='card-remove-form' title='Вы уверены?' >
        <button 
          type="submit" 
          className="popup__save-btn" 
          id="popup_type_card-remove-btn"
          aria-label="Кнопка удаления карточки"
        >
          Да
        </button>
      </PopupWithForm>
    </>
  )
}

export default Main