import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../images/logo.svg';

function Header() {
  return(
    <header className="header">
        <img src={logo} className="header__logo" alt="Логотип Место" />
        <nav className='header__menu'>
          <NavLink to='#' className='header__menu-item'>Войти</NavLink>
          <NavLink to='#' className='header__menu-item'>Регистрация</NavLink>
          <NavLink to='#' className='header__menu-item'>Email</NavLink>
          <NavLink to='#' className='header__menu-item'>Выйти</NavLink>
        </nav>
    </header>  
  )
}

export default Header