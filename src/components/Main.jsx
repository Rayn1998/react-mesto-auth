import React, { useContext} from 'react';
import avatar from '../images/avatar.jpg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  handleEditAvatarClick,
  openState,
  card, 
  cards, 
  cardsProps
}) {
  const currentUser = useContext(CurrentUserContext)

  const {onGetCardsData, onCardLike, onCardDelete, onSetNewCard, onAddCard} = cardsProps

  return (
    <>
      <main className="page">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__avatar-container">
              <img className="profile__avatar" src={currentUser.avatar} alt="Изображение профиля" />
              <div className="profile__avatar-overlay" onClick = {handleEditAvatarClick}></div>
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
                <Card card={card} key={card._id} onCardLike={onCardLike} onImageClick={props.onImageClick} onCardDelete={onCardDelete} />
              )
            })
          }
        </section>
      </main>
    </>
  )
}

export default Main