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

  useEffect(() => {
    api.getUserData().then(userData => setCurrentUser({ ...currentUser, ...userData })).catch(err => console.log(err))
  }, [])

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
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header />
        <Main props={props} openState={{ isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, isImagePopupOpen }} card={selectedCard} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={props.onSubmitAvatar} onClose={props.onClose} /> 
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App