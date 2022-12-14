import toolbox from '../../components/toolbox.js';
import state, { domElements } from '../state.js';

const gallery = {
  //opens the gallery
  openGallery(imageId) {
    const gallery = domElements.gallery.gallery;
    gallery.style.transform = `translateY(${scrollY}px)`;
    gallery.classList.add('stop-scrolling');
    gallery.style.display = 'block';
    domElements.gallery.image.src = toolbox.findSourceById(imageId);
    domElements.gallery.image.id = `img${toolbox.getIdNumber(imageId)}`;

    const idNumber = toolbox.getIdNumber(imageId);
    this.setIndicator(idNumber);
  },

  //closes the gallery
  closeGallery(){
    const gallery = domElements.gallery.gallery;
    gallery.classList.remove('stop-scrolling');
    gallery.style.display = 'none';
  },

  createImageIndicator(idNumber) {
    const indicator = document.createElement('li');

    indicator.classList.add('gallery__indicator');
    indicator.id = `indicator-${idNumber}`;
    indicator.addEventListener('click', () => {
      gallery.openGallery(`gallery-preview-item-${idNumber}`);
      gallery.setIndicator(idNumber);
    });

    domElements.gallery.indicators.append(indicator);
  },


  setIndicator(id) {
    const activeIndicator = toolbox.getIndicatorElement(state.activeIndicatorId);
    activeIndicator && activeIndicator.classList.remove('gallery__indicator_active');
    toolbox.getIndicatorElement(id).classList.add('gallery__indicator_active');
    state.activeIndicatorId = id;
  },

  //flips through the gallery
  flipThrough: function(direction){

    const images = [...domElements.images.original];
    const currentImageIndex = images.findIndex(image => image.src === domElements.gallery.image.src);
    let nextImageId, nextImageIndex;

    switch(direction){
      case 'next':
        nextImageIndex = (currentImageIndex + 1) >= images.length ? 0 : (currentImageIndex + 1);
        nextImageId = images[nextImageIndex].id;
      break;
      case 'previous':
        nextImageIndex = (currentImageIndex - 1) < 0 ? (images.length - 1) : (currentImageIndex - 1);
        nextImageId = images[nextImageIndex].id;
      break;
      default: gallery.closeGallery();
    }

    domElements.gallery.image.src = toolbox.findSourceById(nextImageId);
    domElements.gallery.image.id = nextImageId;
    this.setIndicator(toolbox.getIdNumber(nextImageId));
  },

  //creates instance of an original-size photo
  createImage: function(source, idNumber){;
    const image = new Image();
    image.style.display = 'none';
    image.id = `img${idNumber}`;
    image.src = source;

    domElements.images.original.push(image);
    this.createImageIndicator(idNumber);
  },
}

export default gallery;
