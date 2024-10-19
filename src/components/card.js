export { createCard, deleteCard, cardLike };
import {  putLike, deleteLike, deleteCardServer } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  cardValue,
  deleteCard,
  cardLike,
  openPopupImg,
  userId,
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardValue.link;
  cardImage.alt = cardValue.name;
  cardElement.querySelector(".card__title").textContent = cardValue.name;
  cardLikeCount.textContent = cardValue.likes.length;

  if (userId !== cardValue.owner._id) {
    cardDeleteButton.style.display = "none";
  }

  for (let item of cardValue.likes) {
    if (item._id === userId) {
      cardLikeButton.classList.add("card__like-button_is-active");
      break;
    }
  }

  cardLikeButton.addEventListener("click", () => {
    cardLike(cardValue._id, cardLikeButton, cardLikeCount);
  });
  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardValue._id, cardElement);
  });
  cardImage.addEventListener("click", () => openPopupImg(cardValue));

  return cardElement;
}

function deleteCard(idCard, cardElement) {
  deleteCardServer(idCard).then(() => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

function cardLike(idCard, cardLikeButton, cardLikeCount) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(idCard)
      .then((res) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        cardLikeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(idCard)
      .then((res) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        cardLikeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
