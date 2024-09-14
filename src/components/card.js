export { createCard,deleteCard, cardLike }

function createCard(cardValue, deleteCard, cardLike, openPopupImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

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
