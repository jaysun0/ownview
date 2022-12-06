import { gallery } from '../gallery/gallery.js'
import { domElements, setupEventListeners } from '../../script.js'
import { toolbox } from '../../helpers/toolbox.js'

const controlItems = {
  //creates new small element in small gallery
  createNewItem: function(image){
    const number = domElements.images.compressed.length
    //item in small gallery
    const newSmallGalleryItem = domElements.smallGallery.smallGallery.appendChild(document.createElement('div'))
    newSmallGalleryItem.id = `small-gallery-item-${number}`
    newSmallGalleryItem.classList.add('small-gallery__item')
    //photo itself(compressed)
    const newPhotoElement = newSmallGalleryItem.appendChild(document.createElement('img'))
    newPhotoElement.id = `imgC${number}`
    newPhotoElement.classList.add('small-gallery__photo')
    newPhotoElement.src = image.src
    domElements.images.compressed.push(document.getElementById(newPhotoElement.id))
    //delete button
    const deleteButton = newSmallGalleryItem.appendChild(document.createElement('p'))
    deleteButton.id = `delete-button-${number}`
    deleteButton.classList.add('small-gallery__delete-button')
    deleteButton.classList.add('delete-button')
    deleteButton.textContent = '×'
    //event listeners for the item
    setupEventListeners.smallGallery(newSmallGalleryItem)
    return newPhotoElement
  },

  //Add new item to the app
  addNewItem: function(photo){
    const reader = new FileReader()
    //compresses the image and adds to small gallery
    const compressedImage = this.compressImage(photo, 1)
    //creates new gallery indicator
    const createNewIndicator = function(){
      const newIndicator = document.createElement('li')
      newIndicator.classList.add('gallery__indicator')
      domElements.gallery.indicators.appendChild(newIndicator)
    }
    //reader's work
    reader.onload = () => {
      gallery.createImage(reader.result)
      createNewIndicator()
      domElements.fileInput.input.value = ''
    }
    reader.onerror = () => alert(`Cant't read the file. Are you sure it's an image?`)
    reader.readAsDataURL(photo)
  },

  //compresses image
  compressImage: function(originalImage, quality){
    let compressedImage
    const parent = this
    const reader = new FileReader()
    reader.onload = function(){
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const image = new Image()
      image.src = reader.result
      image.onload = function(){
        const ratio = toolbox.findCompressionParameters(image.width, image.height)
        canvas.width = ratio.width * ratio.scale
        canvas.height = ratio.height * ratio.scale
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        compressedImage = new Image()
        compressedImage.src = canvas.toDataURL('image/jpeg', quality)
        parent.createNewItem(compressedImage)
      }
    }
    if(originalImage){
      reader.readAsDataURL(originalImage)
    } else {
      alert(`No image was detected...\nTry once more, please.`)
    }
  },


  //Delete an item from the app
  deleteItem: function(idNumber){
    //update data about images
    domElements.images.compressed.splice(idNumber, 1)
    domElements.images.original.splice(idNumber, 1)
    //delete items from the UI
    domElements.smallGallery.smallGallery.removeChild(document.querySelectorAll(`.small-gallery__item`)[idNumber])
    domElements.gallery.indicators.removeChild(document.querySelector('.gallery__indicator'))
    //set images numbers according to the new order
    toolbox.normaliseCounters(domElements.images.compressed)
    toolbox.normaliseCounters(domElements.images.original)
    toolbox.normaliseCounters(document.querySelectorAll('.small-gallery__item'))
    //setting "delete-button"s ids the same as "small-gallery-item"s ids
    document.querySelectorAll('.small-gallery__item').forEach(curElem => {
      const id = toolbox.getIdNumber(curElem.children[0].id)
      curElem.children[1].id = `delete-button-${id}`
    })
  },
}

export { controlItems }
