import React, { useState, useEffect, useContext } from 'react';
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

  const cardsProps = {
    onGetCardsData: function getCardsData() {
      return api.getCardsData().then(res => res).catch(err => console.log(err))
    },
    onCardLike:function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id)
      isLiked 
      ? api.deleteLike(card).then(card => setCards(state => state.map(c => c._id === card._id ? card : c)))
      : api.like(card._id).then(card => setCards(state => state.map(c => c._id === card._id ? card : c)))
    },
    onCardDelete: function handleCardDelete(cardId) {
      api.deleteCard(cardId).then(setCards(cards => cards.filter(card => card._id !== cardId)))
    },
    onSetNewCard: function setNewCard(card) {
      setCards(cards => [...cards, card])
    },
    onAddCard: function handleAddCard(newData) {
      api.newCard(newData).then(card => setCards([card, ...cards])).catch(err => console.log(err))
    }
  }

  const props = {
    onEditProfile: function handleEditProfileClick() {
      setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    },
    onAddPlace: function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    },
    onEditAvatar: function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    },
    onClose: function closeAllPopups() {
      setIsAddPlacePopupOpen(false)
      setIsEditProfilePopupOpen(false)
      setIsEditAvatarPopupOpen(false)
      setIsImagePopupOpen(false)
      setSelectedCard({})
    },
    onImageClick: function handleCardClick(e) {
      setSelectedCard(e.target)
      setIsImagePopupOpen(true)
    },
    onSubmit: function handleUpdateUser(newData){
      api.sendData(newData).then(data => {
        setCurrentUser({...currentUser, ...data})
      })
    },
    onSubmitAvatar: function handleUpdateAvatar(newData) {
      api.editAvatar(newData).then(data => setCurrentUser({...currentUser, ...data})).catch(err => console.log(err))
    },
  }

  useEffect(() => {
    api.getUserData().then(userData => setCurrentUser({ ...currentUser, ...userData })).catch(err => console.log(err))
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header />
        <Main 
          props={props} 
          openState={{ isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, isImagePopupOpen }} 
          card={selectedCard} 
          cardsProps={cardsProps}
          cards={cards}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={props.onSubmitAvatar} onClose={props.onClose} /> 
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App