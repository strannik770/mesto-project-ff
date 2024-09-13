import "./pages/index.css";
import { initialCards } from "./cards.js";

createCardList(initialCards);

function createCardList(initialCards) {
  const cardList = document.querySelector(".places__list");
  initialCards.forEach((obj) => {
    cardList.append(createCard(obj, deleteCard,cardLike,openPopupImg));
  });
}

function createCard(cardValue, deleteCard,cardLike, openPopupImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button")

  cardImage.src = cardValue.link;
  cardImage.alt = cardValue.name;
  cardElement.querySelector(".card__title").textContent = cardValue.name;
  cardDeleteButton.addEventListener("click", deleteCard);
  cardLikeButton.addEventListener("click", cardLike);
  cardImage.addEventListener("click", openPopupImg);

  return cardElement;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function cardLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
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


const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");



profileEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  popupTypeEdit.addEventListener("click", function (event) {
    if (event.target === popupTypeEdit) closePopup(event);
  })

  popupTypeEdit.querySelector(".popup__close").addEventListener("click", closePopup);

  document.addEventListener("keydown",function (event) {
    closePopupOnKey(event,popupTypeEdit);
  });
});

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);

  popupTypeNewCard.addEventListener("click", function (event) {
    if (event.target === popupTypeNewCard) closePopup(event);
  })

  popupTypeNewCard.querySelector(".popup__close").addEventListener("click", closePopup);

  document.addEventListener("keydown",function (event) {
    closePopupOnKey(event,popupTypeNewCard);
  });
});

function openPopup(popupType) {
  popupType.classList.add("popup_is-opened","popup_is-animated");
}

function closePopup(event) {
  event.target.closest(".popup").classList.remove("popup_is-opened");
}

function closePopupOnKey (event,popupType) {
  if (event.key === "Escape") {
    popupType.classList.remove("popup_is-opened");
    document.removeEventListener(closePopupOnKey,document);
    }
}

const formElement = document.querySelector("[name = edit-profile]");
const nameInput = formElement.querySelector("[name = name]");
const jobInput = formElement.querySelector("[name = description]");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleFormSubmit(event) {
  event.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(event);
}

formElement.addEventListener('submit', handleFormSubmit); 

const formElementNewPlace = document.querySelector("[name = new-place]");
const cardNameInput = formElementNewPlace.querySelector("[name = place-name]");
const linkInput = formElementNewPlace.querySelector("[name = link]");

function hadleFormSumbitNewCard(event) {
  event.preventDefault();

  const newCard = {
    name : cardNameInput.value,
    link : linkInput.value,
  }

  document.querySelector(".places__list").prepend(createCard(newCard, deleteCard));
  cardNameInput.value = "";
  linkInput.value = "";

  closePopup(event);
}

formElementNewPlace.addEventListener('submit', hadleFormSumbitNewCard);