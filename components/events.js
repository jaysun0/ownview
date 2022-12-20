import { addNewItem, deleteItem } from './galleryPreview/galleryPreview.js';
import state, { dom } from './state.js';
import { getIdNumber } from '../components/toolbox.js';
import { showMessage, addInfo } from './modal/modal.js';
import {
  openGallery,
  closeGallery,
  flipThrough,
  createGalleryImage
} from './gallery/gallery.js';

/************* GALLERY ACTIONS *************/
function addItems(){
  const newPhotos = dom.fileInput.input.files;
  const number = newPhotos.length;
  
  if(number > 0) {
    state.imageAddition.added = 0;
    state.imageAddition.toAdd = number;
    showMessage('Please, wait for your images to be added to the app.');
    addInfo(`Progress: 0/${number} ...`);
    dom.modal.closeBtn.setAttribute('disabled', '');
    for(let i = 0; i < number; i++) addNewItem(newPhotos[i], state.itemsCount++);
  } else showMessage('Choose one or multiple images from your device to add to the gallery.');
  
  dom.fileInput.input.value = '';
}

function deleteAllItems() {
  const imageIds = dom.images.compressed.map(image => image.id);
  imageIds.forEach(id => deleteItem(getIdNumber(id)));
  showMessage('All images were deleted.');
}


function changeDesignColor() {
  const root = document.documentElement;
  const accentColor = dom.galleryPreview.inputs.color.value;
  root.style.setProperty('--accent-color', accentColor);
  document.querySelector('.page').style.backgroundColor = accentColor;
}


function createGallery() {
  if (state.itemsCount > 0) {
    state.galleryCreated = true;
    dom.page.forEach(el => el.style.display = 'none');
    dom.galleryPreview.buttons.back.style.display = 'block';
    dom.galleryPreview.preview.style.maxWidth = '100%';
    document.querySelectorAll('.delete-btn').forEach(item => {
      item.style.top = '1em';
      item.style.zIndex = '-1';
    });
  } else showMessage('To create gallery you need to add some images. On the left there is a file-input to do that. You can add one or multiple files at once.');
}


function leavePresentationRegimen() {
  state.galleryCreated = false;

  dom.page.forEach(el => {
    if(el.className === 'footer' || el.className === 'gallery-preview__controls-wrapper') el.style.display = 'flex'
    else el.style.display = 'block'
  });

  document.querySelectorAll('.delete-btn').forEach(item => {
    item.style.top = '0'
    item.style.zIndex = '0'
  });

  dom.galleryPreview.buttons.back.style.display = 'none';
}


function open(item) {
  const itemNumber = getIdNumber(item.id);
  if(state.galleryCreated) openGallery(itemNumber);
  else {
    createGallery();
    openGallery(itemNumber);
  }
}



/************* EVENT LISTENERS *************/
const listeners = {
  setupPreviewControls() {
    //add a new photo to the gallery
    dom.fileInput.add.addEventListener('click', addItems);
    //change design color
    dom.galleryPreview.buttons.color.addEventListener('click', changeDesignColor);
    //delete all images
    dom.galleryPreview.buttons.deleteAll.addEventListener('click', deleteAllItems);
    //create gallery
    dom.galleryPreview.buttons.create.addEventListener('click', createGallery);
    //leave 'presentation' regimen
    dom.galleryPreview.buttons.back.addEventListener('click', leavePresentationRegimen);
  },

  setupGalleryPreviewItem(item) {
    item.addEventListener('click', () => open(item));
    const deleteButton = item.querySelector('.delete-btn');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteItem(getIdNumber(event.target.id));
    });
  },

  setupGallery() {
    dom.gallery.btns.close.addEventListener('click', closeGallery);
    dom.gallery.btns.flip.forEach(btn => btn.addEventListener('click', () => flipThrough(btn.id)));

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

  dom.galleryPreview.items.forEach((item) => listeners.setupGalleryPreviewItem(item));
  listeners.setupPreviewControls();
  listeners.setupGallery();
  
  for(let i = 0; i < state.itemsCount; i++) createGalleryImage(`./assets/img/img${i}.jpg`, i);
};

export default setupEventListeners;
export { listeners };