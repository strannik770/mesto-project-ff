export { openPopup, closePopup, closePopupOnKey };

function openPopup(popupType) {
  popupType.classList.add("popup_is-opened", "popup_is-animated");
}

function closePopup(event) {
  event.target.closest(".popup").classList.remove("popup_is-opened");
}

function closePopupOnKey(event, popupType) {
  if (event.key === "Escape") {
    popupType.classList.remove("popup_is-opened");
    document.removeEventListener(closePopupOnKey, document);
  }
}
