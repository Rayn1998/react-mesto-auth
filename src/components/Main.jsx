import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import avatar from '../images/avatar.jpg';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';
import Card from './Card';
import ImagePopup from './ImagePopup';

function Main({props, openState, card}) {
  const [userName, setUserName] = useState('Jack Coustou')
  const [userDescription, setUserDescription] = useState('Sailor, adventurer')
  const [userAvatar, setUserAvatar] = useState(avatar)
  const [cards, setCards] = useState([])

  function setUserFeatures(data) {
    setUserName(data.name)
    setUserDescription(data.about)
    setUserAvatar(data.avatar)
  }

  function setNewCard(card) {
    setCards(cards => [...cards, card])
  }

  function getData() {
    return Promise.all([api.getUserData(), api.getCardsData()]).then(res => res).catch(err => console.log(err))
  }

  useEffect(() => {
    getData().then(([userData, cardsData]) => {
      setUserFeatures(userData)
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
              <img className="profile__avatar" src={userAvatar} alt="Изображение профиля" />
              <div className="profile__avatar-overlay" onClick = {props.onEditAvatar}></div>
            </div>
            <div className="profile__info">
              <div className="profile__title">
                <h1 className="profile__name">{userName}</h1>
                <button type="button" onClick = {props.onEditProfile} className="profile__edit-btn" aria-label="Кнопка изменения данных профиля"></button>
              </div>
              <p className="profile__profession">{userDescription}</p>
            </div>
          </div>
          <button type="button" className="profile__add-btn" onClick = {props.onAddPlace} aria-label="Кнопка добавления новой карточки"></button>
        </section>
          
        <section className="elements">
          {cards.map((card, i) => {
              return (
                <Card card={card} key={i} onCardClick={props.onImageClick} />
              )
            })
          }
        </section>
      </main>

      <PopupWithForm isOpen={openState.isEditProfilePopupOpen} onClose={props.onClose} name='edit-profile-form' title='Редактировать профиль' buttonText='Сохранить'>
        <div className="popup__divide-container">
          <input 
            name="name" 
            className="popup__input popup__input_type_name" 
            type="text" placeholder="Имя"
            id="popup__name"
            required
            minLength="2" 
            maxLength="40" 
          />
          <span className="popup__error popup__name-error"></span>
        </div>
        <div className="popup__divide-container">
          <input 
            name="about" 
            className="popup__input popup__input_type_profession" 
            type="text"
            placeholder="О себе" 
            id="popup__profession" 
            required 
            minLength="2" 
            maxLength="200" 
          />
          <span className="popup__error popup__profession-error"></span>
        </div>
      </PopupWithForm>

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

      <PopupWithForm isOpen={openState.isEditAvatarPopupOpen} onClose={props.onClose} name='avatar-edit-form' title='Обновить аватар' buttonText='Сохранить'>
        <div className="popup__divide-container">
          <input 
            name="avatar" 
            className="popup__input popup__input_type_link" 
            type="url"
            placeholder="Ссылка на картинку"
            id="popup__link-avatar" 
            required 
          />
          <span className="popup__error popup__link-avatar-error"></span>
        </div>
      </PopupWithForm>

      <ImagePopup isOpen={openState.isImagePopupOpen} onClose={props.onClose} card={card}/>
    </>
  )
}

export default Main