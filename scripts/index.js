// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

createCardList(initialCards);

function createCardList(initialCards) {
    const cardList = document.querySelector(".places__list");
    initialCards.forEach(obj => {
      cardList.append(createCard(obj,deleteCard));
    });
  }

function createCard(cardValue,deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardValue.link;
  cardImage.alt = cardValue.name;
  cardElement.querySelector(".card__title").textContent = cardValue.name;
  cardDeleteButton.addEventListener("click",deleteCard);

  return cardElement;
}

function deleteCard(event) {
    event.target.closest(".card").remove();
}


