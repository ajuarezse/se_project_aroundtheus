import Popup from "./Popup";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupButton = this._popupElement.querySelector(".modal__button");
  }

  handleDeleteConfirm(callback) {
    this._handleDeleteConfirm = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteConfirm();
    });
  }
}
