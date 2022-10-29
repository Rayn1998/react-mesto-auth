import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onSubmit}) => {
  const cardName = useRef()
  const cardLink = useRef()

  function handleClose() {
    onClose()
  }

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit({
      name: cardName.current.value,
      link: cardLink.current.value
    })
    cardName.current.value = ''
    cardLink.current.value = ''
    handleClose()
  }

  return (
    <PopupWithForm isOpen={isOpen} onSubmit={handleSubmit} onClose={handleClose} name='add-place-form' title='Новое место' buttonText='Сохранить'>
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
          ref={cardName}
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
          ref={cardLink}
        />
        <span className="popup__error popup__link-error"></span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;