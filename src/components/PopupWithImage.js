import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._imageTitle = this._popupElement.querySelector(
      ".modal__preview-title"
    ); // Corrected class name
  }

  open(data) {
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name; // Simplified alt text
    this._imageTitle.textContent = data.name;
    super.open();
  }
}
