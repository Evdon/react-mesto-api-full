import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { register, authorize, checkToken } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpenClose] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpenClose] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState(false);
  const [isSuccessReg, setIsSuccessReg] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoToolPopupOpen, setIsInfoToolPopupOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userInfo, cards]) => {
          setCards(cards);
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {

    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpenClose(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpenClose(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpenClose(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpenClose(false);
    setAddPlacePopupOpenClose(false);
    setEditAvatarPopupOpenClose(false);
    setSelectedCard({});
  }

  function handleCardClick(evt) {
    setSelectedCard(evt);
  }

  function handleRegister(password, email) {
    register(password, email)
      .then((res) => {
        if (res.statusCode !== 400) {
          setIsSuccessReg(true);
          setIsInfoToolPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessReg(false);
        setIsInfoToolPopupOpen(true);
      });
  }

  function handleLogin(password, email) {
    setEmail(email);
    authorize(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        history.push("/mesto");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessReg(false);
        setIsInfoToolPopupOpen(true);
      });
  }

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/mesto");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function closePopup() {
    setIsInfoToolPopupOpen(false);
    if (isSuccessReg) {
      history.push("/sign-in");
    }
  }

  function onButtonCLick() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-in">
            <Header link="sign-up" linkText="Регистрация" />
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Header link="sign-in" linkText="Войти" />
            <Register onRegister={handleRegister} />
          </Route>
          <ProtectedRoute path="/mesto" loggedIn={loggedIn}>
            <Header
              mail={email}
              buttonText="Выйти"
              buttonClass="header__button"
              onClick={onButtonCLick}
            />
            <Main
              loggedIn={loggedIn}
              cards={cards}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/mesto" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          loggedIn={loggedIn}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup name="img" card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolPopupOpen}
          onClose={closePopup}
          isSuccessReg={isSuccessReg}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
