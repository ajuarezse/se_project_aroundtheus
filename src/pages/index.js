/*imports*/

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

/*Functions*/

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
}

/*Event Handlers*/

function handleProfileSubmit(e) {
  e.preventDefault();
  constants.profileTitle.textContent = constants.profileTitleInput.value;
  constants.profileDescription.textContent =
    constants.profileDescriptionInput.value;
  closePopup(constants.profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = constants.cardTitleInput.value;
  const link = constants.cardUrlInput.value;
  renderCard({ name, link }, constants.cardListEl);
  closePopup(constants.addNewModalCard);
  constants.addNewCardFormElement.reset();
}

function handleImageClick(cardData) {
  openPopup(previewImageModal);
  previewImage.src = cardData.link;
  previewImageTitle.textContent = cardData.name;
  previewImage.setAttribute("alt", cardData.name);
}

/*Event Listeners*/

constants.profileEditButton.addEventListener("click", () => {
  constants.profileTitleInput.value = constants.profileTitle.textContent;
  constants.profileDescriptionInput.value =
    constants.profileDescription.textContent;
  openPopup(constants.profileEditModal);
});

constants.profileEditCloseButton.addEventListener("click", () => {
  closePopup(constants.profileEditModal);
});

constants.previewImageModalClose.addEventListener("click", () => {
  closePopup(previewImageModal);
});

constants.addNewModalCard.addEventListener("submit", handleAddCardFormSubmit);
constants.addNewCardButton.addEventListener("click", () => {
  openPopup(constants.addNewModalCard);
});

constants.addCardCloseButton.addEventListener("click", () =>
  closePopup(constants.addNewModalCard)
);

constants.profileEditForm.addEventListener("submit", handleProfileSubmit);

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});

/*create card*/

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
}

constants.initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  constants.cardListEl.append(card);
});

function renderCard(cardData) {
  const card = createCard(cardData);
  constants.cardListEl.prepend(card);
}

const editProfileFormValidator = new FormValidator(
  constants.config,
  constants.profileEditForm
);
const addCardFormValidator = new FormValidator(
  constants.config,
  constants.addNewModalCard
);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
