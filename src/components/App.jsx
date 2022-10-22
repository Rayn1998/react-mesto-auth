import '../index.css';
import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

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
    <div className="content"> 
      <Header />
      <Main props={props} openState={{isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, isImagePopupOpen}} card={selectedCard} />
      <Footer /> 
    </div>
  );
}

export default App