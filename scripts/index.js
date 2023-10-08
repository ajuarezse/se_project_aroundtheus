const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*-----------------------------------------------------*/
/*                     elements                        */
/*-----------------------------------------------------*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addNewCardButton = document.querySelector(".profile__add-button");
const addNewModalCard = document.querySelector("#add-card-modal");
const addCardCloseButton = document.querySelector("#add-card-close-button");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardFormElement = addNewModalCard.querySelector(".modal__form");

/*----------------------------------------------------*/
/*               Functions                            */
/*---------------------------------------------------*/
/*function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}*/

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const cardRemoveButton = cardElement.querySelector(".card__button-remove");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  /* cardRemoveButton.addEventListener("click", () => {
    cardElement.remove();
  });*/

  cardImageEL.setAttribute("src", cardData.link);
  cardImageEL.setAttribute("alt", cardData.name);
  cardTitleEL.textContent = cardData.name;
  return cardElement;
}

const cardTitleInput = addNewCardFormElement.querySelector(
  ".modal__input_type_title"
);

const cardUrlInput = addNewCardFormElement.querySelector(
  ".modal__input_type_url"
);

/*-------------------------------------------------*/
/*              Event Handlers                     */
/*-------------------------------------------------*/

function handleProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addNewModalCard);
  addNewCardFormElement.reset();
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/*----------------------------------------------*/
/*             Event Listeners                  */
/*----------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

addNewModalCard.addEventListener("submit", handleAddCardFormSubmit);
addNewCardButton.addEventListener("click", () => {
  addNewModalCard.classList.add("modal_opened");
});

addCardCloseButton.addEventListener("click", () => closePopup(addNewModalCard));

/*modalCloseButton.addEventListener("click", closePopup);*/
/*placeCloseButton.addEventListener("click", closePopup);*/

profileEditForm.addEventListener("submit", handleProfileSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
