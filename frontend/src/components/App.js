import React from 'react';
import {Routes, Route} from "react-router-dom";
import Header from './Header.js';
import Main from './Main.js';
import Footer from "./Footer.js";
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProctectedRoute";
import Register from "./Register";
import Login from "./Login";
import auth from "../utils/auth";
import {useNavigate} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [loginValue, setLoginValue] = React.useState({email: '', password: ''});
  const [registerValue, setRegisterValue] = React.useState({email: '', password: ''});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isRegistered, setRegistered] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch(err => console.log(err));
  }, [])

  React.useEffect(() => {
    api.getUserInformation()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err));
  },[]);

  React.useEffect(() =>{
    const userId = localStorage.getItem('userId');
    if (userId){
      auth.checkToken()
        .then(res =>{
          setIsLoggedIn(true);
          setEmail(res.email);
          navigate("/", {replace: true});
        })
        .catch(err => console.log(err));
    }
  }, []);

  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(){
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups(){
      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setSelectedCard({});
      setInfoTooltipOpen(false);
  }

  function handleCardClick(name, link) {
    setSelectedCard({name, link});
  }

  React.useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || setSelectedCard ||isInfoTooltipOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, setSelectedCard, isInfoTooltipOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => console.log(err));
    }
    else{
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(values) {
    setIsLoading(true);
    api.editProfile(values)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.editAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlaceSubmit(values) {
    setIsLoading(true);
    api.addNewCard(values)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(e){
    e.preventDefault();
    const {email, password} = loginValue;
    if (!loginValue.email || !loginValue.password) return;
    auth.login(email, password)
      .then(res => {
        localStorage.setItem('userId', res.id);
        setEmail(loginValue.email);
        setIsLoggedIn(true);
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoginValue({email: '', password: ''});
      });
  }

  function handleRegister(e){
    e.preventDefault();
    const {email, password} = registerValue;
    if (!registerValue.email || !registerValue.password) return;
    auth.register(email, password)
      .then(() => {
        setRegistered(true);
        navigate('/sign-in', {replace: true});
      })
      .catch(err => {
        setRegistered(false);
        console.log(err)
      })
      .finally(() => {
        setRegisterValue({email: '', password: ''});
        setInfoTooltipOpen(true);
      });
  }

  function handleSignOut() {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate("/sign-in");
      })
      .catch((err) => console.log(err));
  }

  function getNewUserInfo() {
    api.getUserInformation()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      getNewUserInfo();
    }
  }, [isLoggedIn]);

  return (
    <div className="body">
      <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Header
              email={email}
              onSignOut = {handleSignOut}
            />
            <Routes>
              <Route
                path = "/"
                element = {
                  <ProtectedRoute
                    element = {Main}
                    cards = {cards}
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onEditAvatar = {handleEditAvatarClick}
                    onCardClick = {handleCardClick}
                    onCardLike = {handleCardLike}
                    onCardDelete = {handleCardDelete}
                    isLoggedIn = {isLoggedIn}
                  />
                }
              />
              <Route
                path = "/sign-up"
                element = {
                  <Register
                    registerValue = {registerValue}
                    setRegisterValue = {setRegisterValue}
                    handleSubmit = {handleRegister}
                  />
                }
              />
              <Route
                path = "/sign-in"
                element = {
                  <Login
                    loginValue = {loginValue}
                    setLoginValue = {setLoginValue}
                    handleSubmit = {handleLogin}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <EditProfilePopup
            isOpen = {isEditProfilePopupOpen}
            onClose = {closeAllPopups}
            onUpdateUser = {handleUpdateUser}
            isLoading = {isLoading}
          />
          <EditAvatarPopup
            isOpen = {isEditAvatarPopupOpen}
            onClose = {closeAllPopups}
            onUpdateAvatar = {handleUpdateAvatar}
            isLoading = {isLoading}
          />
          <AddPlacePopup
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            onAddPlace = {handleAddPlaceSubmit}
            isLoading = {isLoading}
          />
          <PopupWithForm
            name = "delete-card"
            title = "Вы уверены?"
            buttonText = "Да"
            isOpen = {false}
          >
          </PopupWithForm>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
            isRegistered = {isRegistered}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
