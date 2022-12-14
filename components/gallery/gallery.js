import toolbox from '../../components/toolbox.js';
import state, { domElements } from '../state.js';


function openGallery(imageId) {
  const gallery = domElements.gallery.gallery;
  gallery.style.transform = `translateY(${scrollY}px)`;
  gallery.style.display = 'block';
  gallery.classList.add('stop-scrolling');

  domElements.gallery.image.src = toolbox.findSourceById(imageId);
  domElements.gallery.image.id = `img${toolbox.getIdNumber(imageId)}`;

  const idNumber = toolbox.getIdNumber(imageId);
  setIndicator(idNumber);
};


function closeGallery() {
  const gallery = domElements.gallery.gallery;
  gallery.classList.remove('stop-scrolling');
  gallery.style.display = 'none';
};


function flipThrough(direction) {
  const images = [...domElements.images.original];
  const currentImageIndex = images.findIndex(image => image.src === domElements.gallery.image.src);
  let nextImageId, nextImageIndex;

  if (direction === 'next') {
    nextImageIndex = (currentImageIndex + 1) >= images.length ? 0 : (currentImageIndex + 1);
    nextImageId = images[nextImageIndex].id;
  } else {
    nextImageIndex = (currentImageIndex - 1) < 0 ? (images.length - 1) : (currentImageIndex - 1);
    nextImageId = images[nextImageIndex].id;
  }

  domElements.gallery.image.src = toolbox.findSourceById(nextImageId);
  domElements.gallery.image.id = nextImageId;
  setIndicator(toolbox.getIdNumber(nextImageId));
}


function createImageIndicator(idNumber) {
  const indicator = document.createElement('li');

  indicator.classList.add('gallery__indicator');
  indicator.id = `indicator-${idNumber}`;
  indicator.addEventListener('click', () => {
    openGallery(`gallery-preview-item-${idNumber}`);
    setIndicator(idNumber);
  });

  domElements.gallery.indicators.append(indicator);
}


function createImage(source, idNumber) {;
  const image = new Image();
  image.style.display = 'none';
  image.id = `img${idNumber}`;
  image.src = source;

  domElements.images.original.push(image);
  createImageIndicator(idNumber);
}


function setIndicator(id) {
  const activeIndicator = document.getElementById(`indicator-${state.activeIndicatorId}`);
  activeIndicator && activeIndicator.classList.remove('gallery__indicator_active');
  document.getElementById(`indicator-${id}`).classList.add('gallery__indicator_active');
  state.activeIndicatorId = id;
}


export {
  openGallery,
  closeGallery,
  flipThrough,
  createImage,
};
