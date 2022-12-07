import { domElements } from "../state.js";

function showMessage(message) {
  domElements.modal.text.textContent = message;
  domElements.modal.wrapper.classList.remove('closed');
}

function closeModal() {
  domElements.modal.wrapper.classList.add('closed');
  domElements.modal.text.textContent = '';
}

domElements.modal.closeBtn.addEventListener('click', closeModal);

export { showMessage, closeModal };