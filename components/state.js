const state = {
  galleryCreated: false,
  itemsCount: 3,
  activeIndicatorId: 0,
  imageAddition: {
    toAdd: 0,
    added: 0
  }
};

/************* DOM ELEMENTS *************/
const dom = {
  body: document.querySelector('body'),

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
      deleteAll: document.querySelector('.gallery-preview__delete-all-btn'),
      delete: document.querySelectorAll('.gallery-preview__delete-btn'),
      color: document.querySelector('.gallery-preview__color-btn'),
      create: document.querySelector('.gallery-preview__create-btn'),
      back: document.querySelector('.gallery-preview__back-btn'),
    },
    inputs: {
      color: document.querySelector('.gallery-preview__color-input'),
    }
  },

  gallery: {
    gallery: document.querySelector('.gallery'),
    image: document.querySelector('.gallery__image'),
    indicators: document.querySelector('.gallery__indicators-list'),
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
    info: document.querySelector('.modal__info'),
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

export { dom };
export default state;