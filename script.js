/************* MODULES *************/
import { toolbox } from './js/toolbox.js'
import { gallery } from './gallery/gallery.js'
import { controlItems } from './main/section-photo/control-items.js'



/************* DOM ELEMENTS *************/
const domElements = {
  //elements to be hidden when user turns on gallery mode
  page: [
      document.querySelector('.header'),
      document.querySelector('.section-photo__title'),
      document.querySelector('.section-photo__controls-wrapper'),
      document.querySelector('.footer'),
  ],

  fileInput: {
      add: document.querySelector('.file-input__add-btn'),
      input: document.querySelector('.file-input__input'),
  },

  smallGallery: {
    smallGallery: document.querySelector('.small-gallery'),
    smallGalleryItems: document.querySelectorAll(`.small-gallery__item`),
    buttons: {
      delete: document.querySelectorAll('.small-gallery__delete-button'),
      color: document.querySelector('.section-photo__ok-btn'),
      create: document.querySelector('.section-photo__create-btn'),
      back: document.querySelector('.small-gallery__back-button'),
    },
    inputs: {
      color: document.querySelector('.section-photo__color-input'),
    }
  },

  gallery: {
    gallery: document.querySelector('.gallery'),
    image: document.querySelector('.gallery__image'),
    indicators: document.querySelector('.gallery__carousel-indicators-wrapper'),
    galleryBtns: {
      close: document.querySelector('.gallery__button_close'),
      flip: [
        document.querySelector('.gallery__button_previous'),
        document.querySelector('.gallery__button_next')
      ]
    }
  },

  images: {
    compressed: [
      document.getElementById('imgC0'),
      document.getElementById('imgC1'),
      document.getElementById('imgC2'),
    ],
    original: [],
  },
}



/************* EVENT LISTENERS *************/
const setupEventListeners = {
  states: {
    galleryCreated: false,
  },

  smallGallery: function(el){
    //open gallery
    el.addEventListener('click', () => {
      if(this.states.galleryCreated === true) gallery.openGallery(el.id)
      else alert('Push "create gallery" button to open the photos.')
    })
    //delete item
    const deleteButton = el.children[1]
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation()
      controlItems.deleteItem(toolbox.getIdNumber(deleteButton.id))
    })
  },

  controlItems: function(){
    //add a new photo to the gallery
    domElements.fileInput.add.addEventListener('click', function(){
      const newPhotos = domElements.fileInput.input.files
      const number = newPhotos.length
      if(number > 0){
        for(let i = 0; i < number; i++){
          controlItems.addNewItem(newPhotos[i])
        }
      } else alert('Please add an image.')
    })
    //change design color
    domElements.smallGallery.buttons.color.addEventListener('click', () =>{
      const root = document.documentElement
      const accentColor = domElements.smallGallery.inputs.color.value

      root.style.setProperty('--accent-color', accentColor)
      document.querySelector('.page').style.backgroundColor = accentColor
    })
    //create gallery
    domElements.smallGallery.buttons.create.addEventListener('click', () => {
      this.states.galleryCreated = true
      domElements.page.forEach(el => el.style.display = 'none')
      document.querySelectorAll('.delete-button').forEach(item => {
        item.style.top = '1em'
        item.style.zIndex = '-1'
      })
      domElements.smallGallery.buttons.back.style.display = 'block'
      domElements.smallGallery.smallGallery.style.maxWidth = '100%'
      document.querySelector('html').style.fontSize = '23px'
    })
    //leave 'presentation' regimen
    domElements.smallGallery.buttons.back.addEventListener('click', () => {
      this.states.galleryCreated = false
      domElements.page.forEach(el => {
        if(el.className === 'footer' || el.className === 'section-photo__controls-wrapper') el.style.display = 'flex'
        else el.style.display = 'block'
      })
      document.querySelectorAll('.delete-button').forEach(item => {
        item.style.top = '0'
        item.style.zIndex = '0'
      })
      domElements.smallGallery.buttons.back.style.display = 'none'
      document.querySelector('html').style.fontSize = '20px'
    })
    //reload when logo was pressed
    const logo = document.querySelector('.header__title');
    logo.addEventListener('click', () => window.location.reload());
  },

  gallery: function(){
    //close gallery
    domElements.gallery.galleryBtns.close.addEventListener('click', gallery.closeGallery)
    //flip through gallery
    domElements.gallery.galleryBtns.flip.forEach(currentBtn => currentBtn.addEventListener('click', function(){
      gallery.flipThrough(currentBtn.id)
    }))
    //keyboard keys to control gallery
    document.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowLeft') gallery.flipThrough('previous')
      else if(e.key === 'ArrowRight') gallery.flipThrough('next')
      else if(e.key === 'Escape') gallery.closeGallery()
    })
  },
};



/************* INITIAL STEPS *************/
//Initialize internal JS gallery with original-size photos
for(let i = 0; i < domElements.images.compressed.length; i++){
  gallery.createImage(`img/img${i}.jpg`)
}

(function(){
  domElements.smallGallery.smallGalleryItems.forEach(c => setupEventListeners.smallGallery(c))
  setupEventListeners.controlItems()
  setupEventListeners.gallery()
})()

export { domElements, setupEventListeners }
