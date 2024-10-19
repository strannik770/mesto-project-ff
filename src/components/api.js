const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "a8ddae83-1e8e-4769-862e-c763902ef95e",
    "Content-Type": "application/json",
  },
};

const handleResposive = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResposive);
};

export const getUsersCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResposive);
};

export const patchUserData = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then(handleResposive);
};

export const postNewCard = (cardNameInput, linkInput) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: linkInput.value,
    }),
  }).then(handleResposive);
};

export const deleteCardServer = (cardValue) => {
  return fetch(`${config.baseUrl}/cards/${cardValue._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResposive);
};

export const putLike = (cardValue) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardValue._id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResposive);
};

export const deleteLike = (cardValue) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardValue._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResposive);
};

export const patchUserAvatar = (linkInputAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkInputAvatar.value,
    }),
  }).then(handleResposive);
};
