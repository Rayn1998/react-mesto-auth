import React, { useState, useEffect } from 'react';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import RemoveCardPopup from './RemoveCardPopup';

import Login from './Login';

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

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isRemoveCardPopupOpen

  function getUserData() {
    return api.getUserData()
  }

  function getCardsData() {
    return api.getCardsData()
      .then(cardsData => cardsData)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    isLiked  
    ? api.deleteLike(card)
        .then(card => setCards(state => state.map(c => c._id === card._id ? card : c)))
        .catch(err => console.log(err))
    : api.like(card._id)
        .then(card => setCards(state => state.map(c => c._id === card._id ? card : c)))
        .catch(err => console.log(err))
  }

  function handleCardDelete(cardId) {
    setIsLoading(true)
    api.deleteCard(cardId)
      .then(() => {
        setCards(cards => cards.filter(card => card._id !== cardId))
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleAddCard(newData) {
    setIsLoading(true)
    api.newCard(newData)
      .then(card => setCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
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

  function handleRemoveCardClick(card) {
    setSelectedCard(card)
    setIsRemoveCardPopupOpen(!isRemoveCardPopupOpen)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsRemoveCardPopupOpen(false)
    setSelectedCard({})
  }

  function handleCardClick(e) {
    setSelectedCard(e.target)
    setIsImagePopupOpen(true)
  }

  function handleUpdateUser(newData) {
    setIsLoading(true)
    api.sendData(newData)
      .then(data => setCurrentUser({...currentUser, ...data}))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(newData) {
    setIsLoading(true)
    api.editAvatar(newData)
      .then(data => setCurrentUser({...currentUser, ...data}))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getUserData()
      .then(userData => setCurrentUser({ ...currentUser, ...userData }))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    getCardsData()
      .then(cardsData => setCards(cardsData))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    function closeByEsc(e) {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEsc)
      return () => {
        document.removeEventListener('keydown', closeByEsc)
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header />
        {/*<Main 
          props={{
            handleEditAvatarClick,
            handleEditProfileClick,
            handleAddPlaceClick,
            handleCardClick,
            handleRemoveCardClick,
            handleCardLike
          }} 
          cards={cards}
        /> */}
        <Login />

        {/* POPUPS */}
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          isLoading={isLoading} 
          onUpdateAvatar={handleUpdateAvatar} 
          onClose={closeAllPopups} 
        /> 
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading} 
          onUpdateUser={handleUpdateUser} 
          onClose={closeAllPopups} 
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          isLoading={isLoading} 
          onSubmit={handleAddCard} 
          onClose={closeAllPopups} 
        />
        <ImagePopup 
          isOpen={isImagePopupOpen} 
          isLoading={isLoading} 
          onClose={closeAllPopups} 
          card={selectedCard}
        />
        <PopupWithForm 
          name='card-remove-form' 
          title='Вы уверены?' 
        />
        <RemoveCardPopup
          isOpen={isRemoveCardPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          card={selectedCard}
          onSubmit={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App