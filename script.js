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

* overall refactoring
* adding photos loader
* indicators for lots of photos
* adaptive
* add apps description
* add contacts

*/


