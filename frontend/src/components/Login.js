import React from "react";

function Login({loginValue, setLoginValue, handleSubmit}) {

  function handleChange(evt) {
    const {name, value} = evt.target;
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
  }

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Вход</h1>
      <form className="form auth-page__form" onSubmit={handleSubmit}>
        <div className="form__input-container">
          <input name='email' type='email' placeholder='Email' id="email-input"
                 className="form__input form__input_theme_dark form__input_value_email"
                 required onChange={handleChange} value={loginValue.email}/>
          <span className="form__input-error email-input-error"/>
        </div>
        <div className="form__input-container">
          <input name='password' type='password' placeholder='Пароль' id='password-input'
                 className="form__input form__input_theme_dark form__input_value_password" required
                 onChange={handleChange} value={loginValue.password}/>
          <span className="form__input-error description-input-error"/>
        </div>
        <button type="submit" aria-label="Зарегистрироватся" className="form__submit-button form__submit-button_theme_dark">
          Войти</button>
      </form>
    </div>
  )
}

export default Login;
