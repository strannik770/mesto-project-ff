import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, cardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// место для карточек
const cardList = document.querySelector(".places__list");
// данные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//массив попапов
const popups = document.querySelectorAll(".popup");
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
// форма новой карточки
const formElementNewPlace = document.querySelector("[name = new-place]");
const cardNameInput = formElementNewPlace.querySelector("[name = place-name]");
const linkInput = formElementNewPlace.querySelector("[name = link]");

createCardList(cardList, initialCards);
addClosePopups(popups);

function createCardList(cardList, initialCards) {
  initialCards.forEach((obj) => {
    cardList.append(createCard(obj, deleteCard, cardLike, openPopupImg));
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

profileEditButton.addEventListener("click", function () {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", () => openModal(popupTypeNewCard));

formElementEditProfile.addEventListener("submit", handleFormSubmitEditProfile);

function handleFormSubmitEditProfile(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

formElementNewPlace.addEventListener("submit", (event) =>
  hadleFormSumbitNewCard(event, cardList)
);

function hadleFormSumbitNewCard(event, cardList) {
  event.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: linkInput.value,
  };

  cardList.prepend(createCard(newCard, deleteCard, cardLike, openPopupImg));
  formElementNewPlace.reset();
  closeModal(popupTypeNewCard);
}
