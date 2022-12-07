import state, { domElements } from './state.js';
import gallery from './gallery/gallery.js';
import toolbox from '../components/toolbox.js';
import { controlItems } from './gallery-preview/gallery-preview.js';

/************* Gallery Actions *************/
function addItems(){
  const newPhotos = domElements.fileInput.input.files;
  const number = newPhotos.length;
  
  if(number > 0){
    for(let i = 0; i < number; i++) controlItems.addNewItem(newPhotos[i]);
  } else alert('Please add an image.')
}


function deleteItem(event) {
  event.stopPropagation();
  controlItems.deleteItem(toolbox.getIdNumber(event.target.id));
}


function changeDesignColor() {
  const root = document.documentElement;
  const accentColor = domElements.galleryPreview.inputs.color.value;
  root.style.setProperty('--accent-color', accentColor);
  document.querySelector('.page').style.backgroundColor = accentColor;
}


function createGallery(image) {
  state.galleryCreated = true;
  domElements.page.forEach(el => el.style.display = 'none');
  domElements.galleryPreview.buttons.back.style.display = 'block';
  domElements.galleryPreview.preview.style.maxWidth = '100%';
  document.querySelectorAll('.delete-button').forEach(item => {
    item.style.top = '1em';
    item.style.zIndex = '-1';
  });
}


function leavePresentationRegimen() {
  state.galleryCreated = false;

  domElements.page.forEach(el => {
    if(el.className === 'footer' || el.className === 'gallery-preview__controls-wrapper') el.style.display = 'flex'
    else el.style.display = 'block'
  });

  document.querySelectorAll('.delete-button').forEach(item => {
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
    domElements.galleryPreview.buttons.color.addEventListener('change', changeDesignColor);
    //create gallery
    domElements.galleryPreview.buttons.create.addEventListener('click', createGallery);
    //leave 'presentation' regimen
    domElements.galleryPreview.buttons.back.addEventListener('click', leavePresentationRegimen);
  },

  setupGalleryPreviewItem(item) {
    item.addEventListener('click', () => openGallery(item));
    //delete item
    const deleteButton = item.children[1];
    deleteButton.addEventListener('click', (event) => deleteItem(event));
  },

  setupGallery(){
    //close gallery
    domElements.gallery.btns.close.addEventListener('click', gallery.closeGallery)

    //flip through gallery
    domElements.gallery.btns.flip.forEach(currentBtn => currentBtn.addEventListener('click', function(){
      gallery.flipThrough(currentBtn.id);
    }))

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

export { listeners };
export default setupEventListeners;