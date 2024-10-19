export { createCard, deleteCard, cardLike };

function createCard(
  cardValue,
  deleteCard,
  cardLike,
  openPopupImg,
  userData,
  deleteCardServer,
  putLike,
  deleteLike,
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardValue.link;
  cardImage.alt = cardValue.name;
  cardElement.querySelector(".card__title").textContent = cardValue.name;
  cardLikeCount.textContent = cardValue.likes.length;
  

  if (userData._id !== cardValue.owner._id) {
    cardDeleteButton.style.display = "none";
  }

  for (let key in cardValue.likes) {
    if (cardValue.likes[key]._id === userData._id) {
      cardLikeButton.classList.add("card__like-button_is-active");
      break;
    }
  }

  cardLikeButton.addEventListener("click", (event) => {
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      deleteLike(cardValue).then(res => {
        cardLikeCount.textContent = res.likes.length;
      });
    } else {
      putLike(cardValue).then(res => {
        cardLikeCount.textContent = res.likes.length;
      })
    }
    cardLike(event);
  });
  cardDeleteButton.addEventListener("click", () => {
    deleteCardServer(cardValue).then(() => {
      deleteCard(cardElement);
    });
  });
  cardImage.addEventListener("click", () => openPopupImg(cardValue));


  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function cardLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
