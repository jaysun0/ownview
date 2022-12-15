import { createNode, findCompressionParameters, getIdNumber } from '../toolbox.js';
import { createImage } from '../gallery/gallery.js';
import { listeners } from '../events.js';
import state, { dom } from '../state.js';
import { showMessage, addInfo } from '../modal/modal.js';


function createGalleryPreviewElement (image, idNumber){
  //item-wrapper
  const galleryPreviewItem = createNode('div', null, ['gallery-preview__item', 'has-shadow']);
  galleryPreviewItem.id = `gallery-preview-item-${idNumber}`;
  galleryPreviewItem.classList.add();
  dom.galleryPreview.preview.appendChild(galleryPreviewItem);

  //photo (compressed)
  const photoElement = createNode('img', `imgC${idNumber}`, ['gallery-preview__photo']);
  photoElement.src = image.src;
  galleryPreviewItem.appendChild(photoElement);
  dom.images.compressed.push(photoElement);

  //delete button
  const deleteButton = createNode('p', `delete-btn-${idNumber}`, ['gallery-preview__delete-btn', 'delete-btn', 'btn']);
  deleteButton.textContent = '×';
  galleryPreviewItem.appendChild(deleteButton);
  listeners.setupGalleryPreviewItem(galleryPreviewItem);
  
  return photoElement;
}


//compresses image and adds to gallery-preview
function addGalleryPreviewItem(originalImage, idNumber) {
  const reader = new FileReader();
  const imageQuality = 1;

  reader.onload = function(){
    const canvas = createNode('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    
    image.src = reader.result;
    image.onload = () => {
      const ratio = findCompressionParameters(image.width, image.height);
      canvas.width = ratio.width * ratio.scale;
      canvas.height = ratio.height * ratio.scale;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const compressedImage = new Image();
      compressedImage.src = canvas.toDataURL('image/jpeg', imageQuality);
      createGalleryPreviewElement(compressedImage, idNumber);
      
      addInfo(`Progress: ${++state.imageAddition.added}/${state.imageAddition.toAdd} ...`);
      if (state.imageAddition.added === state.imageAddition.toAdd) {
        addInfo(`${state.imageAddition.added} images added.`);
        dom.modal.closeBtn.removeAttribute('disabled', '');
      };
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
      dom.fileInput.input.value = '';
    }
    reader.onerror = () => showMessage(`An error occured while reading the provided file... Are you sure it's an image?`);
    reader.readAsDataURL(photo);
  } else showMessage(`The provided file must be one of the following formats: "jpg", "jpeg", "png", "svg", "ico", "heic", 
  "gif"`);
}


export function deleteItem(idNumber) {
  state.itemsCount--;

  //update data about images
  const index = dom.images.original.findIndex(image => {
    return getIdNumber(image.id) === idNumber;
  });

  dom.images.compressed.splice(index, 1);
  dom.images.original.splice(index, 1);

  //delete items from the UI
  const previewItem = document.getElementById(`gallery-preview-item-${idNumber}`);
  document.getElementById(`indicator-${idNumber}`).remove();
  previewItem.remove();
};









