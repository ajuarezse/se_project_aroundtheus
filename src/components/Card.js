export default class Card {
  constructor(
    { name, link, id, likes, userId },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._likes = likes || [];
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this._id, this);
      });

    this._cardElement
      .querySelector(".card__button-trash")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id, this);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  updateLikes(likes) {
    this._likes = likes || [];
    const isLiked = this.isLiked();
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    cardTitleEl.textContent = this._name;
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;

    this.updateLikes(this._likes);

    this._setEventListeners();

    return this._cardElement;
  }
}
