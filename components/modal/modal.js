import { domElements } from "../state.js";

function showMessage(message) {
  domElements.modal.text.textContent = message;
  domElements.modal.wrapper.style.transform = `translateY(${scrollY}px)`;
  domElements.modal.wrapper.classList.remove('closed');
  domElements.body.classList.add('stop-scrolling');
}

function closeModal() {
  domElements.modal.wrapper.classList.add('closed');
  domElements.modal.text.textContent = '';
  domElements.modal.wrapper.style.transform = `translateY(0px)`;
  domElements.body.classList.remove('stop-scrolling');
}

domElements.modal.closeBtn.addEventListener('click', closeModal);

export { showMessage, closeModal };