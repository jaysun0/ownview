import { showMessage, addInfo } from '../modal/modal.js';
import { createGalleryImage } from '../gallery/gallery.js';
import { listeners } from '../events.js';
import state, { dom } from '../state.js';
import { 
  compressImage, 
  createNode,
  findOrderIndexById
} from '../toolbox.js';


function createGalleryPreviewElement (image, idNumber){
  //item-wrapper
  const galleryPreviewItem = createNode('div', null, ['gallery-preview__item', 'has-shadow']);
  galleryPreviewItem.id = `gallery-preview-item-${idNumber}`;
  galleryPreviewItem.classList.add();
  dom.galleryPreview.preview.appendChild(galleryPreviewItem);

  //image (compressed)
  const imgElement = createNode('img', `imgC${idNumber}`, ['gallery-preview__img']);
  imgElement.src = image.src;
  galleryPreviewItem.appendChild(imgElement);
  dom.images.compressed.push(imgElement);

  //delete button
  const deleteButton = createNode('p', `delete-btn-${idNumber}`, ['gallery-preview__delete-btn', 'delete-btn', 'btn']);
  deleteButton.textContent = '×';
  galleryPreviewItem.appendChild(deleteButton);
  listeners.setupGalleryPreviewItem(galleryPreviewItem);
}


//compresses image and adds to gallery-preview
function addGalleryPreviewItem(image, idNumber) {
  createGalleryPreviewElement(image, idNumber);
  addInfo(`Progress: ${++state.imageAddition.added}/${state.imageAddition.toAdd} ...`);
  if (state.imageAddition.added === state.imageAddition.toAdd) {
    addInfo(`${state.imageAddition.added} images added.`);
    dom.modal.closeBtn.removeAttribute('disabled');
  }
}


export function addNewItem(image, idNumber) {
  const regExp = new RegExp(/(jpe*g|png|svg|heic|ico|gif)$/, 'i');

  if (image.name.match(regExp)) {
    const galleryPreviewImageMinWidth = 240;
    const galleryImageMinWidth = 1080;
    const addGalleryPreviewItemBound = (compressedImg) => addGalleryPreviewItem.call(null, compressedImg, idNumber);
    const createGalleryImageBound = (compressedImg) => createGalleryImage.call(null, compressedImg.src, idNumber);
    compressImage(image, galleryPreviewImageMinWidth, addGalleryPreviewItemBound);
    compressImage(image, galleryImageMinWidth, createGalleryImageBound);
  } else showMessage(`The provided file must be one of the following formats: "jpg", "jpeg", "png", "svg", "ico", "heic", 
  "gif"`);
}


export function deleteItem(idNumber) {
  //delete from original images object
  delete dom.images.original[`img${idNumber}`];
  //delete from preview images array
  const imageIndex = dom.images.compressed.findIndex(img => img.id === `img${idNumber}`);
  dom.images.compressed.splice(imageIndex, 1);
  //delete from UI
  const previewItem = document.getElementById(`gallery-preview-item-${idNumber}`);
  document.getElementById(`indicator-${idNumber}`).remove();
  previewItem.remove();
  //delete from order
  dom.images.order.splice(findOrderIndexById(idNumber), 1);
}









