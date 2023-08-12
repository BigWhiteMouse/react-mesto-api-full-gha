import headerLogo from "../images/header_logo.png";
import {Link, useLocation} from "react-router-dom";
import React from "react";

function Header({email}) {

  const location = useLocation();

  function handleSignOut(){
    localStorage.removeItem('token');
  }

  return (
    <header className="header">
      <img className="header__logo" alt="Логотип проекта Mesto" src={headerLogo}/>
      <ul className="header__nav-bar">
        {location.pathname === "/sign-up" && <li><Link className="header__link" to="/sign-in">Войти</Link></li>}
        {location.pathname === "/sign-in" && <li><Link className="header__link" to="/sign-up">Регистрация</Link></li>}
        {location.pathname === "/" && <li className="header__email">{email}</li>}
        {location.pathname === "/" && <li><Link className="header__link header__link_type_exit" to="/sign-in" onClick={handleSignOut}>Выйти</Link></li>}
      </ul>
    </header>
  )
}

export default Header;
