import React, {useState, useEffect, useContext} from 'react';
import avatar from '../images/avatar.jpg';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';
import Card from './Card';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({props, openState, card}) {
  const currentUser = useContext(CurrentUserContext)

  const [cards, setCards] = useState([])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    isLiked 
    ? api.deleteLike(card).then(card => setCards(state => state.map(c => c._id === card._id ? card : c)))
    : api.like(card._id).then(card => setCards(state => state.map(c => c._id === card._id ? card : c)))
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(setCards(cards => cards.filter(card => card._id !== cardId)))
  }

  function setNewCard(card) {
    setCards(cards => [...cards, card])
  }

  function getData() {
    return api.getCardsData().then(res => res).catch(err => console.log(err))
  }

  useEffect(() => {
    getData().then(cardsData => {
      cardsData.forEach(item => {
        setNewCard(item)
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
                <Card card={card} key={i} onCardLike={handleCardLike} onImageClick={props.onImageClick} onCardDelete={handleCardDelete} />
              )
            })
          }
        </section>
      </main>

      <EditProfilePopup onUpdateUser={props.onSubmit} isOpen={openState.isEditProfilePopupOpen} onClose={props.onClose} />
      <ImagePopup isOpen={openState.isImagePopupOpen} onClose={props.onClose} card={card}/>

      <PopupWithForm isOpen={openState.isAddPlacePopupOpen} onClose={props.onClose} name='add-place-form' title='Новое место' buttonText='Сохранить'>
        <div className="popup__divide-container">
          <input 
            name="name" 
            className="popup__input popup__input_type_title" 
            type="text" 
            placeholder="Название"
            id="popup__title" 
            required 
            minLength="2" 
            maxLength="30" 
          />
          <span className="popup__error popup__title-error"></span>
        </div>
        <div className="popup__divide-container">
          <input 
            name="link" 
            className="popup__input popup__input_type_link" 
            type="url"
            placeholder="Ссылка на картинку" 
            id="popup__link" 
            required 
          />
          <span className="popup__error popup__link-error"></span>
        </div>
      </PopupWithForm>

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