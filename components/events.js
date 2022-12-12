import state, { domElements } from './state.js';
import gallery from './gallery/gallery.js';
import toolbox from '../components/toolbox.js';
import { controlItems } from './gallery-preview/gallery-preview.js';
import { showMessage } from './modal/modal.js';

/************* Gallery Actions *************/
function addItems(){
  const newPhotos = domElements.fileInput.input.files;
  const number = newPhotos.length;
  
  if(number > 0){
    for(let i = 0; i < number; i++) controlItems.addNewItem(newPhotos[i], ++state.itemsCount);
  } else showMessage('Choose one or multiple images from your device to add to the gallery.');
}

function setupIndicator(indicator, id) {
  indicator.addEventListener('click', () => {
    gallery.openGallery(`gallery-preview-item-${id}`);
    gallery.setIndicator(id);
  });
}

function deleteItem(id) {
  state.itemsCount--;
  controlItems.deleteItem(toolbox.getIdNumber(id));
}

function deleteAllItems() {
  const imageIds = domElements.images.compressed.map(image => image.id);
  imageIds.forEach(id => deleteItem(id));
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


function openGallery(item) {
  if(state.galleryCreated) gallery.openGallery(item.id);
  else {
    createGallery();
    gallery.openGallery(item.id);
  }
}



/************* EVENT LISTENERS *************/
const listeners = {
  setupPreviewControls(){
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
    item.addEventListener('click', () => openGallery(item));
    //delete item
    const deleteButton = item.children[1];
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteItem(event.target.id);
    });
  },

  setupGallery(){
    //close gallery
    domElements.gallery.btns.close.addEventListener('click', gallery.closeGallery)

    //flip through gallery
    domElements.gallery.btns.flip.forEach(currentBtn => currentBtn.addEventListener('click', function(){
      gallery.flipThrough(currentBtn.id);
    }));

    //open image via indicator
    [...domElements.gallery.indicators.children].forEach((indicator, index) => setupIndicator(indicator, index));

    //keyboard keys to control gallery
    document.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowLeft') gallery.flipThrough('previous')
      else if(e.key === 'ArrowRight') gallery.flipThrough('next')
      else if(e.key === 'Escape') gallery.closeGallery()
    })
  },
};

function setupEventListeners(){
  const logo = document.querySelector('.header__title');
  logo.addEventListener('click', () => window.location.reload());
  domElements.galleryPreview.items.forEach((item) => listeners.setupGalleryPreviewItem(item));
  listeners.setupPreviewControls();
  listeners.setupGallery();
};

export { listeners, setupIndicator };
export default setupEventListeners;