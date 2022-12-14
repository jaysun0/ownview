import toolbox from '../toolbox.js';
import { createImage } from '../gallery/gallery.js';
import { listeners } from '../events.js';
import state, { domElements } from '../state.js';
import { showMessage } from '../modal/modal.js';


function createGalleryPreviewElement (image, idNumber){
  //item-wrapper
  const galleryPreviewItem = domElements.galleryPreview.preview.appendChild(document.createElement('div'));
  galleryPreviewItem.id = `gallery-preview-item-${idNumber}`;
  galleryPreviewItem.classList.add('gallery-preview__item', 'has-shadow');

  //photo (compressed)
  const photoElement = galleryPreviewItem.appendChild(document.createElement('img'));
  photoElement.classList.add('gallery-preview__photo');
  photoElement.id = `imgC${idNumber}`;
  photoElement.src = image.src;
  domElements.images.compressed.push(photoElement);

  //delete button
  const deleteButton = galleryPreviewItem.appendChild(document.createElement('p'));
  deleteButton.classList.add('gallery-preview__delete-btn', 'delete-btn', 'btn');
  deleteButton.id = `delete-btn-${idNumber}`;
  deleteButton.textContent = '×';
  listeners.setupGalleryPreviewItem(galleryPreviewItem);
  
  return photoElement;
}


//compresses image and adds to gallery-preview
function addGalleryPreviewItem(originalImage, idNumber) {
  const reader = new FileReader();
  const imageQuality = 1;

  reader.onload = function(){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    
    image.src = reader.result;
    image.onload = () => {
      const ratio = toolbox.findCompressionParameters(image.width, image.height);
      canvas.width = ratio.width * ratio.scale;
      canvas.height = ratio.height * ratio.scale;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const compressedImage = new Image();
      compressedImage.src = canvas.toDataURL('image/jpeg', imageQuality);
      createGalleryPreviewElement(compressedImage, idNumber);
    }
  }

  reader.readAsDataURL(originalImage);
}


export function addNewItem(photo, idNumber) {
  const regExp = new RegExp(/(jpe*g|png|svg|heic|ico|gif)$/, 'i');

  if (photo.name.match(regExp)) {
    addGalleryPreviewItem(photo, idNumber);

    const reader = new FileReader();
    reader.onload = () => {
      createImage(reader.result, idNumber);
      domElements.fileInput.input.value = '';
    }
    reader.onerror = () => showMessage(`An error occured while reading the provided file... Are you sure it's an image?`);
    reader.readAsDataURL(photo);
  } else showMessage(`The provided file must be one of the following formats: "jpg", "jpeg", "png", "svg", "ico", "heic", 
  "gif"`);
}


export function deleteItem(idNumber) {
  state.itemsCount--;

  //update data about images
  const index = domElements.images.original.findIndex(image => {
    return toolbox.getIdNumber(image.id) === idNumber;
  });

  domElements.images.compressed.splice(index, 1);
  domElements.images.original.splice(index, 1);

  //delete items from the UI
  const previewItem = document.getElementById(`gallery-preview-item-${idNumber}`);
  toolbox.getIndicatorElement(idNumber).remove();
  previewItem.remove();
};

