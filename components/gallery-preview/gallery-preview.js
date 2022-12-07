import toolbox from '../toolbox.js';
import gallery from '../gallery/gallery.js';
import { listeners } from '../events.js';
import { domElements } from '../state.js';
import { showMessage } from '../modal/modal.js';

const controlItems = {
  //creates new item in gallery-preview
  createNewItem: function(image){
    const number = domElements.images.compressed.length;

    //item in gallery-preview
    const newGalleryPreviewItem = domElements.galleryPreview.preview.appendChild(document.createElement('div'));
    newGalleryPreviewItem.id = `gallery-preview-item-${number}`;
    newGalleryPreviewItem.classList.add('gallery-preview__item', 'has-shadow');

    //photo itself(compressed)
    const newPhotoElement = newGalleryPreviewItem.appendChild(document.createElement('img'))
    newPhotoElement.id = `imgC${number}`;
    newPhotoElement.classList.add('gallery-preview__photo');
    newPhotoElement.src = image.src;
    domElements.images.compressed.push(document.getElementById(newPhotoElement.id));

    //delete button
    const deleteButton = newGalleryPreviewItem.appendChild(document.createElement('p'));
    deleteButton.id = `delete-button-${number}`;
    deleteButton.classList.add('gallery-preview__delete-button', 'delete-button');
    deleteButton.textContent = '×';
    
    //event listeners for the item
    listeners.setupGalleryPreviewItem(newGalleryPreviewItem);
    return newPhotoElement
  },

  //Add new item to the app
  addNewItem: function(photo){
    const regExp = new RegExp(/(jpe*g|png|svg|heic|ico|gif)$/, 'i');
    if (photo.name.match(regExp)) {
      const reader = new FileReader();
    
      //compresses the image and adds to small gallery
      this.compressImage(photo, 1);
  
      //creates new gallery indicator
      const createNewIndicator = function(){
        const newIndicator = document.createElement('li');
        newIndicator.classList.add('gallery__indicator');
        domElements.gallery.indicators.appendChild(newIndicator);
      }
  
      //reader's work
      reader.onload = () => {
        gallery.createImage(reader.result);
        createNewIndicator();
        domElements.fileInput.input.value = '';
      }
      reader.onerror = () => showMessage(`An error occured while reading the provided file... Are you sure it's an image?`);
      reader.readAsDataURL(photo);
    } else showMessage(`The provided file must be one of the following formats: "jpg", "jpeg", "png", "svg", "ico", "heic", 
    "gif"`);
  },

  //compresses image
  compressImage: function(originalImage, quality){
    const parent = this;
    const reader = new FileReader();
    let compressedImage;

    reader.onload = function(){
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      
      image.src = reader.result;
      image.onload = function(){
        const ratio = toolbox.findCompressionParameters(image.width, image.height);
        canvas.width = ratio.width * ratio.scale;
        canvas.height = ratio.height * ratio.scale;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        compressedImage = new Image();
        compressedImage.src = canvas.toDataURL('image/jpeg', quality);
        parent.createNewItem(compressedImage);
      }
    }

    if(originalImage) reader.readAsDataURL(originalImage);
    else alert(`No image was detected...\nTry once more, please.`);
  },


  //Delete an item from the app
  deleteItem: function(idNumber){
    //update data about images
    domElements.images.compressed.splice(idNumber, 1);
    domElements.images.original.splice(idNumber, 1);

    //delete items from the UI
    domElements.galleryPreview.preview.removeChild(document.querySelectorAll(`.gallery-preview__item`)[idNumber]);
    domElements.gallery.indicators.removeChild(document.querySelector('.gallery__indicator'));

    //set images numbers according to the new order
    toolbox.normaliseCounters(domElements.images.compressed);
    toolbox.normaliseCounters(domElements.images.original);
    toolbox.normaliseCounters(document.querySelectorAll('.gallery-preview__item'));

    //setting "delete-button"s ids the same as "gallery-preview-item"s ids
    document.querySelectorAll('.gallery-preview__item').forEach(curElem => {
      const id = toolbox.getIdNumber(curElem.children[0].id);
      curElem.children[1].id = `delete-button-${id}`;
    });
  },
}

export { controlItems };
