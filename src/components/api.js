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

export const patchUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(handleResposive);
};

export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResposive);
};

export const deleteCardServer = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResposive);
};

export const putLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResposive);
};

export const deleteLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResposive);
};

export const patchUserAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(handleResposive);
};
