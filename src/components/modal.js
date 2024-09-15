export { openModal, closeModal};

function openModal(popupType) {
  popupType.classList.add("popup_is-opened");
  document.addEventListener('keydown', closePopupOnKey);
}

function closeModal(popupType) {
  popupType.classList.remove("popup_is-opened");
  document.removeEventListener(closePopupOnKey, document);
}

function closePopupOnKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}
