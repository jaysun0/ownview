import setupEventListeners from './components/events.js';
import state, { domElements } from './components/state.js';
import gallery from './components/gallery/gallery.js';

//initialize internal JS gallery with original-size photos
for(let i = 0; i < domElements.images.compressed.length; i++) {
  gallery.createImage(`./assets/img/img${i}.jpg`, i);
  state.itemsCount++;
}

setupEventListeners();


/* TO BE DONE:

* fix: opens not right image
* indicators for lots of photos
* adaptive
* back-btn adaptive
* adding photos loader
* add "clear all" button
* gallery opens on user scrollY
* overall refactoring

*/


