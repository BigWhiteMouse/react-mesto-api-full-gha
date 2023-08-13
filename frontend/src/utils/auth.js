import {path} from "./utils";

class Auth {
  constructor(path) {
    this.path = path;
  }

  //обработчик ответа
  _getResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //headers
  _getHeaders() {
    return {
      "Content-Type": "application/json"
    }
  }

  //регистрация
  register(email, password) {
    return fetch(`${this.path}signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password}),
    }).then(this._getResult);
  }

  //авторизация
  login(email, password) {
    return fetch(`${this.path}signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password}),
    }).then(this._getResult).then(res => {
      return res
    })
  }

  //проверка токена
  checkToken() {
    return fetch(`${this.path}users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      }
    }).then(this._getResult);
  }

  signOut() {
    return fetch(`${this.path}/signout`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._getResult);
  }
}

const auth = new Auth(path);

export default auth;
