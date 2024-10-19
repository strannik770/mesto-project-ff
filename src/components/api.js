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

  return Promise.reject(res.status);
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