import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteConfirm();
    });
  }

  handleDeleteConfirm(handleDelete) {
    this._handleDeleteConfirm = handleDelete;
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
