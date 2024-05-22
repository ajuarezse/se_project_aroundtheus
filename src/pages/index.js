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
  profilePopup.close();
}

function handleAddCardFormSubmit(cardData) {
  const { title, url } = cardData;
  renderCard({ name: title, link: url });
  addCardPopup.close();
}

const previewImageModal = new PopupWithImage("#modal-preview");
previewImageModal.setEventListeners();

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

function createCard(cardData) {
  const newCard = new Card(cardData, "#card-template", (data) => {
    previewImageModal.open(data);
  });
  return newCard.getView();
}

// Renderer function for Section class
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

// Instantiate Section with initial cards and renderer function
const section = new Section(
  {
    items: constants.initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

section.renderItems();

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
