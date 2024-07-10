export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  //GET https://around-api.en.tripleten-services.com/v1/users/me
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //GET https://around-api.en.tripleten-services.com/v1/cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //PATCH https://around-api.en.tripleten-services.com/v1/users/me
  updateProfileInfo({ name, description }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: description,
      }),
    }).then(this._handleResponse);
  }

  //POST https://around-api.en.tripleten-services.com/v1/cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
  updateProfileAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._handleResponse);
  }

  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
