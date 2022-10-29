import React, {useState, useEffect} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import {Route} from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    api.getUserData().then(userData => setCurrentUser({...currentUser, ...userData})).catch(err => console.log(err))
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
    }
  }

  return (   
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content"> 
        <Header />
        <Main props={props} openState={{isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, isImagePopupOpen}} card={selectedCard} />
        <Footer /> 
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App