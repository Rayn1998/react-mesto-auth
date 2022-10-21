import React from 'react';

function ImagePopup() {
  return (
    <div className="popup popup_type_picture">
    <div className="popup__body">
      <div className="popup__content-image">
        <button type="button" className="popup__close-btn" aria-label="Кнопка закрытия попапа"></button>
        <img className="popup__picture" src='#' alt='#' />
        <h2 className="popup__text"></h2>
      </div>
    </div>
  </div>
  )
}

export default ImagePopup