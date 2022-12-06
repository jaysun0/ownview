import { domElements } from '../state.js'
import toolbox from '../../components/toolbox.js';

const gallery = {
  //opens the gallery
  openGallery: function(imageId){
    scroll(0,0)
    document.querySelector('body').style.overflowY = 'hidden'
    domElements.gallery.gallery.style.display = 'block'
    domElements.gallery.image.src = toolbox.findSourceById(imageId)
    domElements.gallery.image.id = `${toolbox.getIdNumber(imageId)}`
    domElements.gallery.indicators.children[parseInt(toolbox.getIdNumber(imageId))].classList.toggle('gallery__indicator-active')
  },

  //closes the gallery
  closeGallery: function(){
    domElements.gallery.gallery.style.display = 'none'
    Array.prototype.forEach.call(domElements.gallery.indicators.children, function(c){
      if(c.classList.contains('gallery__indicator-active')) c.classList.remove('gallery__indicator-active')
    })
    document.querySelector('body').style.overflowY = 'scroll'
  },

  //flips through the gallery
  flipThrough: function(direction){
    let nextImageIdNumber, nextImageId
    const currentImageIdNumber = toolbox.getIdNumber(domElements.gallery.image.id)
    switch(direction){
      case 'next':
        nextImageIdNumber = currentImageIdNumber >= domElements.images.original.length - 1 ? 0 : currentImageIdNumber + 1
      break
      case 'previous':
        nextImageIdNumber = currentImageIdNumber < 1 ? domElements.images.original.length - 1 : currentImageIdNumber - 1
      break
      default: gallery.closeGallery()
    }
    nextImageId = `img${nextImageIdNumber}`
    domElements.gallery.image.src = toolbox.findSourceById(nextImageId)
    domElements.gallery.image.id = nextImageId
    domElements.gallery.indicators.children[currentImageIdNumber].classList.toggle('gallery__indicator-active')
    domElements.gallery.indicators.children[nextImageIdNumber].classList.toggle('gallery__indicator-active')
  },

  //creates instance of an original-size photo
  createImage: function(source){
    const image = new Image()
    image.src = source
    image.id = `img${domElements.images.original.length}`
    domElements.images.original.push(image)
    image.style.display = 'none'
  },
}

export default gallery;
