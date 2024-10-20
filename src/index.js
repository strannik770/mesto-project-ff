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
  patchUserAvatar
} from "./components/api.js";

import * as constants from "./components/constants.js";


addClosePopups(constants.popups);
enableValidation(constants.validationConfig);
Promise.all([getUserData(), getUsersCards()]).then(([userData, usersCard]) => {
  setUserData(userData, constants.profileTitle, constants.profileDescription, constants.profileAvatar);
  createCardList(constants.cardList, usersCard, userData._id);
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

function createCardList(cardList, initialCards, userId) {
  initialCards.forEach((obj) => {
    cardList.append(
      createCard(
        obj,
        deleteCard,
        cardLike,
        openPopupImg,
        userId,
      )
    );
  });
}

function openPopupImg(cardValue) {
  constants.img.src = cardValue.link;
  constants.img.alt = cardValue.name;
  constants.popupImgCaption.textContent = cardValue.name;
  openModal(constants.popupImg);
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

constants.profileEditButton.addEventListener("click", () => {
  openModal(constants.popupTypeEdit);
  clearErrorValidation(constants.formElementEditProfile, constants.validationConfig);
  constants.nameInput.value = constants.profileTitle.textContent;
  constants.jobInput.value = constants.profileDescription.textContent;
});

constants.profileAddButton.addEventListener("click", () => {
  openModal(constants.popupTypeNewCard);
  clearErrorValidation(constants.formElementNewPlace, constants.validationConfig);
});

constants.profileAvatar.addEventListener("click", () => {
  openModal(constants.popupTypeNewAvatar);
  clearErrorValidation(constants.formElementNewAvatar, constants.validationConfig);
});

constants.formElementEditProfile.addEventListener("submit", handleFormSubmitEditProfile);

function handleFormSubmitEditProfile(event) {
  event.preventDefault();

  renderLoading(true, constants.formButtonEditProfile);
  patchUserData(constants.nameInput.value, constants.jobInput.value)
    .then((result) => {
      constants.profileTitle.textContent = result.name;
      constants.profileDescription.textContent = result.about;
    }).catch((err) => {
      console.log(err); 
    })
    .finally(() =>
      renderLoading(false, constants.formButtonEditProfile)
    );
  closeModal(constants.popupTypeEdit);
}

constants.formElementNewPlace.addEventListener("submit", (event) =>
  hadleFormSumbitNewCard(event, constants.cardList)
);

function hadleFormSumbitNewCard(event, cardList) {
  event.preventDefault();

  renderLoading(true, constants.submitButtonNewPlace);
  postNewCard(constants.cardNameInput.value, constants.linkInput.value)
    .then((res) => {
      constants.cardList.prepend(
        createCard(
          res,
          deleteCard,
          cardLike,
          openPopupImg,
          res.owner._id,
        )
      );
      constants.formElementNewPlace.reset();
      closeModal(constants.popupTypeNewCard);
    }).catch((err) => {
      console.log(err); 
    })
    .finally(() =>
      renderLoading(false, constants.submitButtonNewPlace)
    );
}

constants.formElementNewAvatar.addEventListener("submit", (event) => {
  event.preventDefault();

  renderLoading(true, constants.submitButtonNewAvatar);
  patchUserAvatar(constants.linkInputAvatar.value)
    .then((result) => {
      constants.profileAvatar.setAttribute(
        "style",
        `background-image: url(${result.avatar})`
      );
    }).catch((err) => {
      console.log(err); 
    })
    .finally(() =>
      renderLoading(false, constants.submitButtonNewAvatar)
    );
  
    constants.formElementNewAvatar.reset();
  closeModal(constants.popupTypeNewAvatar);
});

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранить...";
  } else {
    button.textContent = "Сохранить";
  }
}
