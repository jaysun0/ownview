import toolbox from '../../components/toolbox.js';
import state, { domElements } from '../state.js';

const gallery = {
  //opens the gallery
  openGallery: function(imageId){
    scroll(0,0)
    document.querySelector('body').style.overflowY = 'hidden';
    domElements.gallery.gallery.style.display = 'block';
    domElements.gallery.image.src = toolbox.findSourceById(imageId);
    domElements.gallery.image.id = `img${toolbox.getIdNumber(imageId)}`;

    const idNumber = toolbox.getIdNumber(imageId);
    this.setIndicator(idNumber);
  },

  //closes the gallery
  closeGallery: function(){
    domElements.gallery.gallery.style.display = 'none';
    domElements.gallery.indicators
    document.querySelector('body').style.overflowY = 'scroll';
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
    image.src = source;
    image.id = `img${idNumber}`;
    domElements.images.original.push(image);
    image.style.display = 'none';
  },
}

export default gallery;
