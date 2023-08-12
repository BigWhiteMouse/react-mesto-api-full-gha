import React from "react";
import {Link} from "react-router-dom";

function Register({registerValue, setRegisterValue, handleSubmit}) {

  function handleChange(evt) {
    const {name, value} = evt.target;
    setRegisterValue({
      ...registerValue,
      [name]: value,
    });
  }

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Регистрация</h1>
      <form className="form auth-page__form" onSubmit={handleSubmit}>
        <div className="form__input-container">
          <input name='email' type='email' placeholder='Email' id="email-input"
                 className="form__input form__input_theme_dark form__input_value_email"
                 required onChange={handleChange} value={registerValue.email}/>
          <span className="form__input-error email-input-error"/>
        </div>
        <div className="form__input-container">
          <input name='password' type='password' placeholder='Пароль' id='password-input'
                 className="form__input form__input_theme_dark form__input_value_password" required
                 onChange={handleChange} value={registerValue.password}/>
          <span className="form__input-error description-input-error"/>
        </div>
        <button type="submit" aria-label="Зарегистрироватся" className="form__submit-button form__submit-button_theme_dark">
          Зарегистрироваться</button>
      </form>
      <p className="auth-page__text">Уже зарегистрированы?
        <Link className="auth-page__link" to="/sign-in"> Войти</Link>
      </p>
    </div>
  )
}

export default Register;
