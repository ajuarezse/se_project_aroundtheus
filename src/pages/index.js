/* Imports */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b67d986e-405b-4d76-86b9-0a516353ed7d",
    "Content-Type": "application/json",
  },
});

api
  .getAppData()
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });

    section.setItems(initialCards);
    section.renderItems();
  })
  .catch(console.error);

function handleProfileSubmit(userData) {
  api
    .updateProfileInfo({
      name: userData.title,
      description: userData.description,
    })
    .then((updatedUserData) => {
      userInfo.setUserInfo({
        title: updatedUserData.name,
        description: updatedUserData.about,
      });
      profilePopup.close();
    })
    .catch(console.error);
}

function handleAddCardFormSubmit(cardData) {
  const { title, url } = cardData;
  api
    .addCard({ name: title, link: url })
    .then((newCardData) => {
      renderCard({ name: newCardData.name, link: newCardData.link });
      addCardPopup.close();
    })
    .catch(console.error);
}

const previewImageModal = new PopupWithImage("#modal-preview");
previewImageModal.setEventListeners();

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileSubmit
);
profilePopup.setEventListeners();

const deleteCardPopup = new PopupDeleteCard("#delete-card-modal");
deleteCardPopup.setEventListeners();

constants.profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  constants.profileTitleInput.value = currentUser.title;
  constants.profileDescriptionInput.value = currentUser.description;

  profilePopup.open();
  editProfileFormValidator.resetValidation();
});

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

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

const section = new Section(
  {
    items: [],
    renderer: renderCard,
  },
  ".cards__list"
);

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

function handleDeleteCard(cardId, cardElement) {
  deleteCardPopup.open();
  deleteCardPopup.handleDeleteConfirm(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.removeCardElement();
        deleteCardPopup.close();
      })
      .catch(console.error);
  });
}
