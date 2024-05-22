/* Imports */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

/* Functions */
function handleEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    modal.close();
  }
}

/* Event Handlers */
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

function handleProfileSubmit(userData) {
  userInfo.setUserInfo({
    title: userData.title,
    description: userData.description,
  });
  constants.profileEditModal.close();
}

function handleAddCardFormSubmit(cardData) {
  const { title, url } = cardData;
  renderCard({ name: title, link: url }, constants.cardListEl);
  constants.addNewModalCard.close();
}

function handleImageClick(cardData) {
  constants.previewImageModal.open();
  constants.previewImage.src = cardData.link;
  constants.previewImageTitle.textContent = cardData.name;
  constants.previewImage.setAttribute("alt", cardData.name);
}

/* Event Listeners */
// Profile popup instantiation
const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileSubmit
);
profilePopup.setEventListeners();

constants.profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  constants.profileTitleInput.value = currentUser.title;
  constants.profileDescriptionInput.value = currentUser.description;

  profilePopup.open();
  editProfileFormValidator.resetValidation();
});

// Add card popup instantiation
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

constants.addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

constants.profileEditCloseButton.addEventListener("click", () => {
  constants.profileEditModal.close();
});

constants.previewImageModalClose.addEventListener("click", () => {
  constants.previewImageModal.close();
});

constants.addCardCloseButton.addEventListener("click", () => {
  constants.addNewModalCard.close();
});

/* Create card */
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
