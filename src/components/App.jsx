import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlaceOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [isRemoveCardPopupOpen, setRemoveCardOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState('')

  const props = {
    onEditProfile: function handleEditProfileClick() {
      setEditProfileOpen(!isEditProfilePopupOpen)
    },
    onAddPlace: function handleAddPlaceClick() {
      setAddPlaceOpen(!isAddPlacePopupOpen)
    },
    onEditAvatar: function handleEditAvatarClick() {
      setEditAvatarOpen(!isEditAvatarPopupOpen) 
    },
    onClose: function closeAllPopups() {
      setAddPlaceOpen(false)
      setEditProfileOpen(false)
      setEditAvatarOpen(false)
      setImagePopupOpen(false)
    },
    onImageClick: function handleCardClick(e) {
      setSelectedCard(e.target)
      setImagePopupOpen(true)
    }
  }

  return (
    <div className="body">          
      <div className="content"> 
        <Header />
        <Main props={props} openState={{isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, isImagePopupOpen}} card={selectedCard} />
        <Footer /> 
      </div>
    </div>
  );
}

export default App