import { createNode, findOrderIndexById} from '../toolbox.js';
import state, { dom } from '../state.js';


function openGallery(imageNumber) {
  state.currentImgIndex = findOrderIndexById(imageNumber);

  const gallery = dom.gallery.gallery;
  gallery.style.transform = `translateY(${scrollY}px)`;
  gallery.style.display = 'flex';
  dom.body.classList.add('stop-scrolling');
  dom.gallery.image.src = dom.images.original[`img${imageNumber}`].src;
  setIndicator(imageNumber);
}


function closeGallery() {
  const gallery = dom.gallery.gallery;
  dom.body.classList.remove('stop-scrolling');
  gallery.style.display = 'none';
}


function flipThrough(direction) {
  const images = dom.images.original;
  const order = dom.images.order;

  if (direction === 'next') state.currentImgIndex = state.currentImgIndex >= (order.length - 1) ? 0 : (state.currentImgIndex + 1);
  else state.currentImgIndex = state.currentImgIndex === 0 ? order.length - 1 : (state.currentImgIndex - 1);

  const newImageNumber = order[state.currentImgIndex];
  const newImage = images[`img${newImageNumber}`];

  setIndicator(newImageNumber);
  dom.gallery.image.src = newImage.src;
}


function createImageIndicator(idNumber) {
  const indicator = createNode('li', `indicator-${idNumber}`, ['gallery__indicator']);
  indicator.addEventListener('click', () => {
    dom.gallery.image.src = dom.images.original[`img${idNumber}`].src;
    state.currentImgIndex = findOrderIndexById(idNumber);
    setIndicator(idNumber);
  });

  dom.gallery.indicators.append(indicator);
}


function createGalleryImage(source, idNumber) {
  const image = new Image();
  image.style.display = 'none';
  image.id = `img${idNumber}`;
  image.src = source;

  dom.images.original[image.id] = image;
  createImageIndicator(idNumber);
  dom.images.order.push(idNumber);
}


function setIndicator(idNumber) {
  const activeIndicator = document.getElementById(`indicator-${state.activeIndicator}`);
  activeIndicator && activeIndicator.classList.remove('gallery__indicator_active');

  const newActiveIndicator = document.getElementById(`indicator-${idNumber}`);
  newActiveIndicator.classList.add('gallery__indicator_active');
  state.activeIndicator = idNumber;
}


export {
  openGallery,
  closeGallery,
  flipThrough,
  createGalleryImage,
};
