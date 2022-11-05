import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({loggedIn}) {
  const location = useLocation()

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
            <li className="header__menu-item">Email</li>
            <li className="header__menu-item">Выйти</li>
          </>
        }
      </nav>
    </header>
  );
}

export default Header;
