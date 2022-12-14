import { getIdNumber, createNode } from '../../components/toolbox.js';
import state, { dom } from '../state.js';


function openGallery(imageId) {
  const gallery = dom.gallery.gallery;
  gallery.style.transform = `translateY(${scrollY}px)`;
  gallery.style.display = 'block';
  gallery.classList.add('stop-scrolling');

  const newId = `img${getIdNumber(imageId)}`;
  dom.gallery.image.id = `img${getIdNumber(imageId)}`;
  dom.images.original.forEach(image => {
    if(image.id === newId) dom.gallery.image.src = image.src;
  });

  const idNumber = getIdNumber(imageId);
  setIndicator(idNumber);
};


function closeGallery() {
  const gallery = dom.gallery.gallery;
  gallery.classList.remove('stop-scrolling');
  gallery.style.display = 'none';
};


function flipThrough(direction) {
  const images = [...dom.images.original];
  const currentImageIndex = images.findIndex(image => image.src === dom.gallery.image.src);
  let nextImageId, nextImageIndex;

  if (direction === 'next') {
    nextImageIndex = (currentImageIndex + 1) >= images.length ? 0 : (currentImageIndex + 1);
    nextImageId = images[nextImageIndex].id;
  } else {
    nextImageIndex = (currentImageIndex - 1) < 0 ? (images.length - 1) : (currentImageIndex - 1);
    nextImageId = images[nextImageIndex].id;
  }

  dom.gallery.image.id = nextImageId;
  dom.images.original.forEach(image => {
    if(image.id === nextImageId) dom.gallery.image.src = image.src;
  })
  setIndicator(getIdNumber(nextImageId));
}


function createImageIndicator(idNumber) {
  const indicator = createNode('li', `indicator-${idNumber}`, ['gallery__indicator']);
  indicator.addEventListener('click', () => {
    openGallery(`gallery-preview-item-${idNumber}`);
    setIndicator(idNumber);
  });

  dom.gallery.indicators.append(indicator);
}


function createImage(source, idNumber) {;
  const image = new Image();
  image.style.display = 'none';
  image.id = `img${idNumber}`;
  image.src = source;

  dom.images.original.push(image);
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
