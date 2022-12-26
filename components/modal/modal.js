import { dom } from "../state.js";

function showMessage(message, title) {
  const titleToShow = title ? title : 'system message';
  dom.modal.title.textContent = titleToShow;
  dom.modal.text.textContent = message;
  dom.modal.wrapper.style.transform = `translateY(${scrollY}px)`;
  dom.modal.wrapper.classList.remove('closed');
  dom.body.classList.add('stop-scrolling');
}


function addInfo(info) {
  dom.modal.info.textContent = info;
}

function closeModal() {
  dom.modal.wrapper.classList.add('closed');
  dom.modal.text.textContent = '';
  dom.modal.wrapper.style.transform = `translateY(0px)`;
  dom.body.classList.remove('stop-scrolling');
  addInfo('');
}
dom.modal.closeBtn.addEventListener('click', closeModal);

export { showMessage, closeModal, addInfo };