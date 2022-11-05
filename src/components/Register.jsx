import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Register = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''})

  function handleChangeValues(e) {
    setFormValues(oldValues => ({
      ...oldValues, 
      [e.target.name]: e.target.value 
    }))
  }

  return (
    <>
      <form className='auth-form'>
        <h2 className='auth-form__title'>Регистрация</h2>
        <div className='auth-form__fields-wrapper'>
          <input 
            className='auth-form__input'
            name='email'
            type='email' 
            value={formValues.email}
            onChange={handleChangeValues}
            required
            minLength='2'
            placeholder='Email'
          />
          <input 
            className='auth-form__input'
            name='password'
            type='password'
            value={formValues.password}
            onChange={handleChangeValues}
            required
            placeholder='Password'
          />
        </div>
        <button className='auth-form__btn-submit'>Зарегистрироваться</button>
      </form>      
        <p className='auth-form__registered'>Уже зарегистрированы? <Link to='/sign-in' className='auth-form__log-in'>Войти</Link></p>
    </>
  );
};

export default Register