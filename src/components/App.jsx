import React, { useState, useEffect } from 'react';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  function getUserData() {
    return api.getUserData()
  }

  function getCardsData() {
    return api.getCardsData()
      .then(res => res)
      .catch(err => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    isLiked 
    ? api.deleteLike(card)
      .then(() => 
        card => setCards(state => state.map(c => c._id === card._id ? card : c)))
      .catch(err => console.log(err))
    : api.like(card._id)
      .then(() => 
        card => setCards(state => state.map(c => c._id === card._id ? card : c)))
      .catch(err => console.log(err))
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards(cards => cards.filter(card => card._id !== cardId))
        setIsLoading(true)
      }).catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function setNewCard(card) {
    setCards(cards => [...cards, card])
  }

  function handleAddCard(newData) {
    api.newCard(newData)
      .then(() => {
        card => setCards([card, ...cards])
        setIsLoading(true)
      }).catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setSelectedCard({})
  }

  function handleCardClick(e) {
    setSelectedCard(e.target)
    setIsImagePopupOpen(true)
  }

  function handleUpdateUser(newData){
    api.sendData(newData)
      .then(() => {
        data => setCurrentUser({...currentUser, ...data})
        setIsLoading(true)
      }).catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(newData) {
    api.editAvatar(newData)
      .then(() => {
        data => setCurrentUser({...currentUser, ...data})
        setIsLoading(true)
      }).catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getUserData()
      .then(() => 
        userData => setCurrentUser({ ...currentUser, ...userData }))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    cardsProps.onGetCardsData()
      .then(cardsData => 
        cardsData.forEach(item => 
          cardsProps.onSetNewCard(item)))
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header />
        <Main 
          props={
            handleEditAvatarClick
          } 
          openState={{
            isAddPlacePopupOpen, 
            isEditAvatarPopupOpen, 
            isEditProfilePopupOpen, 
            isImagePopupOpen 
          }}
          card={selectedCard} 
          cardsProps={{
            handleCardLike,
            handleCardDelete
          }}
          cards={cards}
        />

        {/* POPUPS */}
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          isLoading={isLoading} 
          onUpdateAvatar={props.onSubmitAvatar} 
          onClose={props.onClose} 
        /> 
        <EditProfilePopup 
          isOpen={openState.isEditProfilePopupOpen}
          isLoading={isLoading} 
          onUpdateUser={props.onSubmit} 
          onClose={props.onClose} 
        />
        <AddPlacePopup 
          isOpen={openState.isAddPlacePopupOpen} 
          isLoading={isLoading} 
          onSubmit={onAddCard} 
          onClose={props.onClose} 
        />
        <ImagePopup 
          isOpen={openState.isImagePopupOpen} 
          isLoading={isLoading} 
          onClose={props.onClose} 
          card={card}
        />
        <PopupWithForm 
          name='card-remove-form' 
          title='Вы уверены?' 
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App