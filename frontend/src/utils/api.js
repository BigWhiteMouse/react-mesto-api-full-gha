import {userToken, path} from './utils.js';

class Api {
    constructor(token, path) {
        this.token = token;
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
    _getHeaders(){
        return {
            "Content-Type": "application/json",
           //authorization: this.token
        }
    }

    //получение информации о пользователе
    getUserInformation(){
        return fetch(`${this.path}users/me`, {
            credentials: 'include',
            headers: this._getHeaders()
        }).then(this._getResult);
    }

    //получение карточек
    getInitialCards() {
        return fetch(`${this.path}cards`, {
            credentials: 'include',
            headers: this._getHeaders()
        }).then(this._getResult);
    }

    //редактирование профиля
    editProfile(values) {
        return fetch(`${this.path}users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: values.name,
                about: values.about
            })
        }).then(this._getResult);
    }

    //добавление карточки
    addNewCard(values){
        return fetch(`${this.path}cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: values.name,
                link: values.link
            })
        }).then(this._getResult);
    }

    //удаление карточки
    deleteCard(id){
        return fetch(`${this.path}cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._getHeaders()
        }).then(this._getResult);
    }

    //лайк карточки
    putLike(id){
        return fetch(`${this.path}cards/${id}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._getHeaders()
        }).then(this._getResult);
    }

    //удаление лайка
    deleteLike(id){
        return fetch(`${this.path}cards/${id}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._getHeaders()
        }).then(this._getResult);
    }

    //редактирование аватара
    editAvatar(link){
        return fetch(`${this.path}users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: link
            })
        }).then(this._getResult);
    }
}

const api = new Api(userToken, path);

export default api;
