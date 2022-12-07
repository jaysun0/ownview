const state = {
  galleryCreated: false,
  itemsCount: 0,
};

/************* DOM ELEMENTS *************/
const domElements = {
  //elements to be hidden when user turns on gallery mode
  page: [
      document.querySelector('.header'),
      document.querySelector('.gallery-preview__title'),
      document.querySelector('.gallery-preview__controls-wrapper'),
      document.querySelector('.footer'),
  ],

  fileInput: {
      add: document.querySelector('.file-input__add-btn'),
      input: document.querySelector('.file-input__input'),
  },

  galleryPreview: {
    preview: document.querySelector('.gallery-preview__items'),
    items: document.querySelectorAll(`.gallery-preview__item`),
    buttons: {
      delete: document.querySelectorAll('.gallery-preview__delete-button'),
      color: document.querySelector('.gallery-preview__color-btn'),
      create: document.querySelector('.gallery-preview__create-btn'),
      back: document.querySelector('.gallery-preview__back-button'),
    },
    inputs: {
      color: document.querySelector('.gallery-preview__color-input'),
    }
  },

  gallery: {
    gallery: document.querySelector('.gallery'),
    image: document.querySelector('.gallery__image'),
    indicators: document.querySelector('.gallery__carousel-indicators-wrapper'),
    btns: {
      close: document.querySelector('.gallery__button_close'),
      flip: [
        document.querySelector('.gallery__button_previous'),
        document.querySelector('.gallery__button_next')
      ]
    }
  },

  modal: {
    wrapper: document.querySelector('.modal__wrapper'),
    text: document.querySelector('.modal__text'),
    closeBtn: document.querySelector('.modal__close-btn'),
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

export { domElements };
export default state;