import React from 'react';

function Card({card, onCardClick}) {
    return (
        <article className="element">
            <img className="element__image" src={card.link} alt={card.name} onClick={onCardClick} />
            <div className="element__trash"></div>
            <div className="element__base">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className="element__like" aria-label="Кнопка лайка"></button>
                    <span className="element__like-amount">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card