//array
export const initialCards = [
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

export const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//elements

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__span_opened",
};

export const forms = document.querySelectorAll(config.formSelector);

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditCloseButton =
  profileEditModal.querySelector(".modal__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

export const addNewCardButton = document.querySelector(".profile__add-button");
export const addNewModalCard = document.querySelector("#add-card-modal");
export const addCardCloseButton = document.querySelector(
  "#add-card-close-button"
);

export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const addNewCardFormElement =
  addNewModalCard.querySelector(".modal__form");

export const previewImageModal = document.querySelector("#modal-preview");
export const previewImage = document.querySelector(".modal__image");
export const previewImageTitle = document.querySelector(
  ".modal__preview-title"
);
export const previewImageModalClose = document.querySelector(
  "#preview-image-close"
);

export const cardTitleInput = addNewCardFormElement.querySelector(
  ".modal__input_type_title"
);

export const cardUrlInput = addNewCardFormElement.querySelector(
  ".modal__input_type_url"
);
