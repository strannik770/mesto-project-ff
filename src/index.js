import "./pages/index.css";
import { createCard, deleteCard, cardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  enableValidation,
  clearErrorValidation,
} from "./components/validation.js";
import {
  getUserData,
  getUsersCards,
  patchUserData,
  postNewCard,
  deleteCardServer,
  putLike,
  deleteLike,
  patchUserAvatar
} from "./components/api.js";

// место для карточек
const cardList = document.querySelector(".places__list");
// данные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//массив попапов
const popups = document.querySelectorAll(".popup");
//попап новой аватарки
const profileAvatar = document.querySelector(".profile__image");
const popupTypeNewAvatar = document.querySelector(".popup_type_new-avatar");
//попап редактирования данных профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
//попап новой карточки
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
//попап картинки
const popupImg = document.querySelector(".popup_type_image");
const img = popupImg.querySelector(".popup__image");
//форма профиля
const formElementEditProfile = document.querySelector("[name = edit-profile]");
const nameInput = formElementEditProfile.querySelector("[name = name]");
const jobInput = formElementEditProfile.querySelector("[name = description]");
const formButtonEditProfile = formElementEditProfile.querySelector(".popup__button");
// форма новой карточки
const formElementNewPlace = document.querySelector("[name = new-place]");
const cardNameInput = formElementNewPlace.querySelector("[name = place-name]");
const linkInput = formElementNewPlace.querySelector("[name = link]");
const submitButtonNewPlace =  formElementNewPlace.querySelector(".popup__button");
//форма нового аватара
const formElementNewAvatar = document.querySelector("[name = new-avatar]");
const linkInputAvatar = formElementNewAvatar.querySelector(
  "[name = link-avatar]"
);
const submitButtonNewAvatar = formElementNewAvatar.querySelector(".popup__button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

addClosePopups(popups);
enableValidation(validationConfig);
Promise.all([getUserData(), getUsersCards()]).then(([userData, usersCard]) => {
  setUserData(userData, profileTitle, profileDescription, profileAvatar);
  createCardList(cardList, usersCard, userData);
}).catch((err) => {
  console.log(err); 
});

function setUserData(result, profileTitle, profileDescription, profileAvatar) {
  profileTitle.textContent = result.name;
  profileDescription.textContent = result.about;
  profileAvatar.setAttribute(
    "style",
    `background-image: url(${result.avatar})`
  );
}

function createCardList(cardList, initialCards, userData) {
  initialCards.forEach((obj) => {
    cardList.append(
      createCard(
        obj,
        deleteCard,
        cardLike,
        openPopupImg,
        userData,
        deleteCardServer,
        putLike,
        deleteLike
      )
    );
  });
}

function openPopupImg(cardValue) {
  openModal(popupImg);
  img.src = cardValue.link;
  img.alt = cardValue.name;
  popupImg.querySelector(".popup__caption").textContent = cardValue.name;
}

function addClosePopups(popups) {
  popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");

    closeButton.addEventListener("click", () => closeModal(popup));
    popup.addEventListener("mousedown", (event) => {
      if (event.target === popup) {
        closeModal(popup);
      }
    });
    popup.classList.add("popup_is-animated");
  });
}

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  clearErrorValidation(formElementEditProfile, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
  clearErrorValidation(formElementNewPlace, validationConfig);
});

profileAvatar.addEventListener("click", () => {
  openModal(popupTypeNewAvatar);
  clearErrorValidation(formElementNewAvatar, validationConfig);
});

formElementEditProfile.addEventListener("submit", handleFormSubmitEditProfile);

function handleFormSubmitEditProfile(event) {
  event.preventDefault();

  renderLoading(true, formButtonEditProfile);
  patchUserData(nameInput, jobInput)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    }).catch((err) => {
      console.log(err); 
    })
    .finally(() =>
      renderLoading(false, formButtonEditProfile)
    );
  closeModal(popupTypeEdit);
}

formElementNewPlace.addEventListener("submit", (event) =>
  hadleFormSumbitNewCard(event, cardList)
);

function hadleFormSumbitNewCard(event, cardList) {
  event.preventDefault();

  renderLoading(true, submitButtonNewPlace);
  postNewCard(cardNameInput, linkInput)
    .then((res) => {
      cardList.prepend(
        createCard(
          res,
          deleteCard,
          cardLike,
          openPopupImg,
          res.owner,
          deleteCardServer,
          putLike,
          deleteLike
        )
      );
    }).catch((err) => {
      console.log(err); 
    })
    .finally(() =>
      renderLoading(false, submitButtonNewPlace)
    );

  formElementNewPlace.reset();
  closeModal(popupTypeNewCard);
}

formElementNewAvatar.addEventListener("submit", (event) => {
  event.preventDefault();

  renderLoading(true, submitButtonNewAvatar);
  patchUserAvatar(linkInputAvatar)
    .then((result) => {
      profileAvatar.setAttribute(
        "style",
        `background-image: url(${result.avatar})`
      );
    }).catch((err) => {
      console.log(err); 
    })
    .finally(() =>
      renderLoading(false, submitButtonNewAvatar)
    );
  
  formElementNewAvatar.reset();
  closeModal(popupTypeNewAvatar);
});

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранить...";
  } else {
    button.textContent = "Сохранить";
  }
}
