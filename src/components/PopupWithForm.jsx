import React from 'react';

function PopupWithForm(props) {
  return (
      <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__body">
          <div className="popup__content">
            <button 
              type="button" 
              className="popup__close-btn" 
              aria-label="Кнопка закрытия попапа"
              onClick={props.onClose}
            ></button>
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__inputs" id={props.name} name={props.name} noValidate>
                {props.children}
                <button 
                    type="submit" 
                    className="popup__save-btn" 
                    id="popup_type_profile-save-btn"
                    aria-label="Кнопка отправки формы на сервер"
                >
                  {props.buttonText}           
                </button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default PopupWithForm