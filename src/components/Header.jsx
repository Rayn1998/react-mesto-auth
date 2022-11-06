import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({loggedIn, onLogOut}) {
  const location = useLocation()
  const user = useContext(CurrentUserContext)

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Место" />
      <nav className="header__menu">
        {location.pathname === '/sign-up' &&
        <Link to="/sign-in" className="header__menu-item">
          Войти
        </Link>
        }
        {location.pathname === '/sign-in'&&
        <Link to="/sign-up" className="header__menu-item">
          Регистрация
        </Link>
        }
        {loggedIn && 
          <>
            <li className="header__menu-item">{user.email}</li>
            <li className="header__menu-item" style={{cursor: 'pointer'}} onClick={onLogOut}>Выйти</li>
          </>
        }
      </nav>
    </header>
  );
}

export default Header;
