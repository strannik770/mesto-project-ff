// место для карточек
export const cardList = document.querySelector(".places__list");
// данные профиля
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
//массив попапов
export const popups = document.querySelectorAll(".popup");
//попап новой аватарки
export const profileAvatar = document.querySelector(".profile__image");
export const popupTypeNewAvatar = document.querySelector(".popup_type_new-avatar");
//попап редактирования данных профиля
export const profileEditButton = document.querySelector(".profile__edit-button");
export const popupTypeEdit = document.querySelector(".popup_type_edit");
//попап новой карточки
export const profileAddButton = document.querySelector(".profile__add-button");
export const popupTypeNewCard = document.querySelector(".popup_type_new-card");
//попап картинки
export const popupImg = document.querySelector(".popup_type_image");
export const img = popupImg.querySelector(".popup__image");
export const popupImgCaption = popupImg.querySelector(".popup__caption")
//форма профиля
export const formElementEditProfile = document.querySelector("[name = edit-profile]");
export const nameInput = formElementEditProfile.querySelector("[name = name]");
export const jobInput = formElementEditProfile.querySelector("[name = description]");
export const formButtonEditProfile = formElementEditProfile.querySelector(".popup__button");
// форма новой карточки
export const formElementNewPlace = document.querySelector("[name = new-place]");
export const cardNameInput = formElementNewPlace.querySelector("[name = place-name]");
export const linkInput = formElementNewPlace.querySelector("[name = link]");
export const submitButtonNewPlace =  formElementNewPlace.querySelector(".popup__button");
//форма нового аватара
export const formElementNewAvatar = document.querySelector("[name = new-avatar]");
export const linkInputAvatar = formElementNewAvatar.querySelector(
  "[name = link-avatar]"
);
export const submitButtonNewAvatar = formElementNewAvatar.querySelector(".popup__button");

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


export const popupTypeDelete = document.querySelector(".popup_type_delete");
export const submitButtonDelete = popupTypeDelete.querySelector("[name = delete]");