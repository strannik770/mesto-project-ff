import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard,deleteCard, cardLike } from "./components/card.js"
import { openPopup, closePopup, closePopupOnKey } from "./components/modal.js"

// данные профиля
const profileTitle = document.querySelector(".profile__title");   
const profileDescription = document.querySelector(".profile__description"); 
//попап редактирования данных профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
//попап новой карточки
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
//форма профиля
const formElement = document.querySelector("[name = edit-profile]");
const nameInput = formElement.querySelector("[name = name]");
const jobInput = formElement.querySelector("[name = description]");
// форма новой карточки
const formElementNewPlace = document.querySelector("[name = new-place]");
const cardNameInput = formElementNewPlace.querySelector("[name = place-name]");
const linkInput = formElementNewPlace.querySelector("[name = link]");

createCardList(initialCards);

function createCardList(initialCards) {
  const cardList = document.querySelector(".places__list");
  initialCards.forEach((obj) => {
    cardList.append(createCard(obj, deleteCard,cardLike,openPopupImg));
  });
}


function openPopupImg(event) {
  const popupImg = document.querySelector(".popup_type_image");
  const img =  popupImg.querySelector(".popup__image"); 


  openPopup(popupImg);
  img.src = event.target.src;
  img.alt = event.target.alt;
  popupImg.querySelector(".popup__caption").textContent = event.target.alt;

  popupImg.querySelector(".popup__close").addEventListener("click", closePopup);
}

profileEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  popupTypeEdit.querySelector(".popup__close").addEventListener("click", closePopup);
  popupTypeEdit.addEventListener("click", function (event) {
    if (event.target === popupTypeEdit) closePopup(event);
  })

  document.addEventListener("keydown",function (event) {
    closePopupOnKey(event,popupTypeEdit);
  });
});

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);

  popupTypeNewCard.querySelector(".popup__close").addEventListener("click", closePopup);
  popupTypeNewCard.addEventListener("click", function (event) {
    if (event.target === popupTypeNewCard) closePopup(event);
  })

  document.addEventListener("keydown",function (event) {
    closePopupOnKey(event,popupTypeNewCard);
  });
});

formElement.addEventListener('submit', handleFormSubmit); 

function handleFormSubmit(event) {
  event.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(event);
}

formElementNewPlace.addEventListener('submit', hadleFormSumbitNewCard);

function hadleFormSumbitNewCard(event) {
  event.preventDefault();

  const newCard = {
    name : cardNameInput.value,
    link : linkInput.value,
  }

  document.querySelector(".places__list").prepend(createCard(newCard, deleteCard,cardLike,openPopupImg));
  cardNameInput.value = "";
  linkInput.value = "";
  closePopup(event);
}


