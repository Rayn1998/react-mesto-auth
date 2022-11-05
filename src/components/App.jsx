import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import RemoveCardPopup from "./RemoveCardPopup";

import * as auth from '../auth';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import PageNotFound from "./PageNotFound";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = useState(false);
  const [isInfoToolTipPopup, setIsInfoToolTipPopup] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setIsLoggedIn] = useState(false);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isRemoveCardPopupOpen ||
    isInfoToolTipPopup;

  const setUserState = useCallback((data) => {
    setIsLoggedIn(true)
    localStorage.setItem('jwt', data.jwt)
    setCurrentUser(data.user)
  }, [])

  const checkToken = useCallback(async () => {
    try {
      setIsLoading(true)

      const jwt = localStorage.getItem('jwt')
      if (!jwt) {
        throw new Error('No token found')
      }

      const user = await auth.checkToken()
      if (!user) {
        throw new Error('Invalid user')
      }

      setIsLoggedIn(true)
    } catch {}
    finally {
      setIsLoading(false)
    }

  }, [])

  const authenticate = useCallback(async (password, email) => {
    try {
      const data = await auth.authenticate(password, email)
      if (!data) {
        throw new Error('Invalid credentials')
      } 
      if (data.jwt) {
        setUserState(data)
      }
    } catch {}
  }, [])

  const register = useCallback(async (password, email) => {
    try {
      const data = await auth.register(password, email)
      if (!data) {
        throw new Error('Failed to register')
      }
      if(data.jwt) {
        setUserState(data)
      }
    } catch {}
  }, [])

  // Функции запросов на сервер
  async function getUserData() {
    const userData = await api.getUserData()
    return userData
  }

  async function getCardsData() {
    const cards = await api.getCardsData()
    return cards
  }

  // Функции для работы с карточками
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    isLiked
      ? api
        .deleteLike(card)
        .then((card) =>
          setCards((state) =>
            state.map((c) => (c._id === card._id ? card : c))
          )
        )
        .catch((err) => console.log(err))
      : api
        .like(card._id)
        .then((card) =>
          setCards((state) =>
            state.map((c) => (c._id === card._id ? card : c))
          )
        )
        .catch((err) => console.log(err));
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddCard(newData) {
    setIsLoading(true);
    api
      .newCard(newData)
      .then((card) => setCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // Функции попапов
  function handleCardClick(e) {
    setSelectedCard(e.target);
    setIsImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleRemoveCardClick(card) {
    setSelectedCard(card);
    setIsRemoveCardPopupOpen(!isRemoveCardPopupOpen);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsRemoveCardPopupOpen(false);
    setIsInfoToolTipPopup(false);
    setSelectedCard({});
  }

  // Функции сабмитов
  function handleUpdateUser(newData) {
    setIsLoading(true);
    api
      .sendData(newData)
      .then((data) => setCurrentUser({ ...currentUser, ...data }))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(newData) {
    setIsLoading(true);
    api
      .editAvatar(newData)
      .then((data) => setCurrentUser({ ...currentUser, ...data }))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // USEEFFECTS
  useEffect(() => {
    getUserData()
      .then((userData) => setCurrentUser({ ...currentUser, ...userData }))
      .catch((err) => console.log(err));

    getCardsData()
      .then((cardsData) => setCards(cardsData))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    function closeByEsc(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEsc);
      return () => {
        document.removeEventListener("keydown", closeByEsc);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute
            path='/main'
            loggedIn={loggedIn}
            props={{
              handleEditAvatarClick,
              handleEditProfileClick,
              handleAddPlaceClick,
              handleCardClick,
              handleRemoveCardClick,
              handleCardLike,
            }}
            cards={cards}
            component={Main}
          />
          <Route path='/sign-in'>
            <Login />
          </Route>
          <Route path='/sign-up'>
            <Register />
          </Route>
          <Route exact path='/'>
            {loggedIn ? <Redirect to='/main' /> : <Redirect to='/sign-in' />}
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        <Footer />

        {/* POPUPS */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onSubmit={handleAddCard}
          onClose={closeAllPopups}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <PopupWithForm name="card-remove-form" title="Вы уверены?" />
        <RemoveCardPopup
          isOpen={isRemoveCardPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          card={selectedCard}
          onSubmit={handleCardDelete}
        />
        <InfoToolTip isOpen={isInfoToolTipPopup} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
