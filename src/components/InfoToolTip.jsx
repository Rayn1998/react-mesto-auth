import React from "react";
import registerOk from '../images/register-ok.png';

const InfoToolTip = ({ isOpen, onClose }) => {
  return (
    <div className={`popup popup_type_info-tool-tip ${isOpen && "popup_opened"}`}>
      <div className="popup__body">
        <div className="popup__content">
          <button
            type="button"
            className="popup__close-btn"
            aria-label="Кнопка закрытия попапа"
            onClick={onClose}
          />
          <div className="popup__auth-wrapper">
            <img className="popup__auth-reg-img" src={registerOk} alt='Изображение после регистрации' />
            <p className='popup__auth-reg-text'>Вы успешно зарегистрировались!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoToolTip;
