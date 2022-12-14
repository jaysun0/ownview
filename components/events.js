import { addNewItem, deleteItem } from './galleryPreview/galleryPreview.js';
import state, { domElements } from './state.js';
import toolbox from '../components/toolbox.js';
import { showMessage } from './modal/modal.js';
import {
  openGallery,
  closeGallery,
  flipThrough,
  createImage
} from './gallery/gallery.js';

/************* Gallery Actions *************/
function addItems(){
  const newPhotos = domElements.fileInput.input.files;
  const number = newPhotos.length;
  
  if(number > 0){
    for(let i = 0; i < number; i++) addNewItem(newPhotos[i], ++state.itemsCount);
  } else showMessage('Choose one or multiple images from your device to add to the gallery.');
}

function deleteAllItems() {
  const imageIds = domElements.images.compressed.map(image => image.id);
  imageIds.forEach(id => deleteItem(toolbox.getIdNumber(id)));
  showMessage('All images were deleted.');
}


function changeDesignColor() {
  const root = document.documentElement;
  const accentColor = domElements.galleryPreview.inputs.color.value;
  root.style.setProperty('--accent-color', accentColor);
  document.querySelector('.page').style.backgroundColor = accentColor;
}


function createGallery() {
  if (state.itemsCount > 0) {
    state.galleryCreated = true;
    domElements.page.forEach(el => el.style.display = 'none');
    domElements.galleryPreview.buttons.back.style.display = 'block';
    domElements.galleryPreview.preview.style.maxWidth = '100%';
    document.querySelectorAll('.delete-btn').forEach(item => {
      item.style.top = '1em';
      item.style.zIndex = '-1';
    });
  } else showMessage('To create gallery you need to add some images. On the left there is a file-input to do that. You can add one or multiple files at once.');
}


function leavePresentationRegimen() {
  state.galleryCreated = false;

  domElements.page.forEach(el => {
    if(el.className === 'footer' || el.className === 'gallery-preview__controls-wrapper') el.style.display = 'flex'
    else el.style.display = 'block'
  });

  document.querySelectorAll('.delete-btn').forEach(item => {
    item.style.top = '0'
    item.style.zIndex = '0'
  });

  domElements.galleryPreview.buttons.back.style.display = 'none';
}


function open(item) {
  if(state.galleryCreated) openGallery(item.id);
  else {
    createGallery();
    openGallery(item.id);
  }
}



/************* EVENT LISTENERS *************/
const listeners = {
  setupPreviewControls() {
    //add a new photo to the gallery
    domElements.fileInput.add.addEventListener('click', addItems);
    //change design color
    domElements.galleryPreview.buttons.color.addEventListener('click', changeDesignColor);
    //delete all images
    domElements.galleryPreview.buttons.deleteAll.addEventListener('click', deleteAllItems);
    //create gallery
    domElements.galleryPreview.buttons.create.addEventListener('click', createGallery);
    //leave 'presentation' regimen
    domElements.galleryPreview.buttons.back.addEventListener('click', leavePresentationRegimen);
  },

  setupGalleryPreviewItem(item) {
    item.addEventListener('click', () => open(item));
    const deleteButton = item.querySelector('.delete-btn');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteItem(toolbox.getIdNumber(event.target.id));
    });
  },

  setupGallery() {
    domElements.gallery.btns.close.addEventListener('click', closeGallery);
    domElements.gallery.btns.flip.forEach(btn => btn.addEventListener('click', () => flipThrough(btn.id)));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') flipThrough('previous');
      else if (e.key === 'ArrowRight') flipThrough('next');
      else if (e.key === 'Escape') closeGallery();
    });
  },
};

function setupEventListeners(){
  const logo = document.querySelector('.header__title');
  logo.addEventListener('click', () => window.location.reload());

  domElements.galleryPreview.items.forEach((item) => listeners.setupGalleryPreviewItem(item));
  listeners.setupPreviewControls();
  listeners.setupGallery();
  
  for(let i = 0; i < state.itemsCount; i++) createImage(`./assets/img/img${i}.jpg`, i);
};

export default setupEventListeners;
export { listeners };