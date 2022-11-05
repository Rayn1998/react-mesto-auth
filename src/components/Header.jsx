import React from "react";
import { Link, useLocation, useHistory, } from "react-router-dom";
import { withRouter } from "react-router-dom";
import logo from "../images/logo.svg";

function Header() {
  const location = useLocation()
  const history = useHistory()

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
        <li className="header__menu-item">Email</li>
        <li className="header__menu-item">Выйти</li>
      </nav>
    </header>
  );
}

export default withRouter(Header);
