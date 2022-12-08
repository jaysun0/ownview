import toolbox from '../toolbox.js';
import gallery from '../gallery/gallery.js';
import { listeners, setupIndicator } from '../events.js';
import state, { domElements } from '../state.js';
import { showMessage } from '../modal/modal.js';

const controlItems = {
  //creates new item in gallery-preview
  createNewItem: function(image, idNumber){
    //item in gallery-preview
    const newGalleryPreviewItem = domElements.galleryPreview.preview.appendChild(document.createElement('div'));
    newGalleryPreviewItem.id = `gallery-preview-item-${idNumber}`;
    newGalleryPreviewItem.classList.add('gallery-preview__item', 'has-shadow');

    //photo itself(compressed)
    const newPhotoElement = newGalleryPreviewItem.appendChild(document.createElement('img'))
    newPhotoElement.id = `imgC${idNumber}`;
    newPhotoElement.classList.add('gallery-preview__photo');
    newPhotoElement.src = image.src;
    domElements.images.compressed.push(document.getElementById(newPhotoElement.id));

    //delete button
    const deleteButton = newGalleryPreviewItem.appendChild(document.createElement('p'));
    deleteButton.id = `delete-button-${idNumber}`;
    deleteButton.classList.add('gallery-preview__delete-button', 'delete-button', 'btn');
    deleteButton.textContent = '×';
    listeners.setupGalleryPreviewItem(newGalleryPreviewItem);
    
    return newPhotoElement
  },

  //Add new item to the app
  addNewItem: function(photo, idNumber){
    const regExp = new RegExp(/(jpe*g|png|svg|heic|ico|gif)$/, 'i');

    if (photo.name.match(regExp)) {
      const reader = new FileReader();
    
      //compresses the image and then adds to small gallery
      this.compressImage(photo, 1, idNumber);
  
      //creates new gallery indicator
      const createNewIndicator = () => {
        const newIndicator = document.createElement('li');
        newIndicator.classList.add('gallery__indicator');
        newIndicator.id = `indicator-${idNumber}`;
        setupIndicator(newIndicator, idNumber);
        domElements.gallery.indicators.append(newIndicator);
      }
  
      //reader's work
      reader.onload = () => {
        gallery.createImage(reader.result, idNumber);
        createNewIndicator();
        domElements.fileInput.input.value = '';
      }
      
      reader.onerror = () => showMessage(`An error occured while reading the provided file... Are you sure it's an image?`);
      reader.readAsDataURL(photo);
    } else showMessage(`The provided file must be one of the following formats: "jpg", "jpeg", "png", "svg", "ico", "heic", 
    "gif"`);
  },

  //compresses image
  compressImage: function(originalImage, quality, idNumber){
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
        parent.createNewItem(compressedImage, idNumber);
      }
    }

    if(originalImage) reader.readAsDataURL(originalImage);
    else showMessage('No image was detected... Try once more, please.');
  },


  //Delete an item from the app
  deleteItem: function(idNumber){
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
  },
}

export { controlItems };
