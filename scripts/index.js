// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

createCardList(initialCards);

function createCardList(initialCards) {
    const cardList = document.querySelector(".places__list");
    for (let obj of initialCards) {
      createCard(obj,cardList,deleteCard);
    }
  }

function createCard(cardValue,cardList,deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = cardValue.link;
  cardElement.querySelector(".card__title").textContent = cardValue.name;
  cardDeleteButton.addEventListener("click",deleteCard);

  cardList.append(cardElement);
}

function deleteCard(event) {
    event.target.closest(".card").remove();
}


