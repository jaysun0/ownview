import state from "../state.js";

const possibleLangs = ['en', 'ru'];
const nodes = [];
function addNodeToTranslate(nodeClass, en, ru){
    return nodes.push({
        node: document.querySelector(nodeClass),
        en,
        ru,
    });
}

function translateTo(lang) {
    if (possibleLangs.contains(lang)){
        state.language = lang;
        nodes.forEach(nodeObj => nodeObj.node.textContent === nodeObj[lang]);
    }
}

function initiateNodesTranslate() {
    addNodeToTranslate('.header__motto', 'create your own gallery in a couple of clicks...', 'создайте собственную галерею за пару кликов');
    addNodeToTranslate('.gallery-preview__title', 'gallery preview', 'предпросмотр галереи');
    addNodeToTranslate('.gallery-preview__label_add-image', 'add image/s', 'добавить изображение/я');
    addNodeToTranslate('.gallery-preview__add-btn', 'add', 'добавить');
    addNodeToTranslate('.gallery-preview__label_change-color', 'change design color', 'изменить цвет дизайна');
    addNodeToTranslate('.gallery-preview__color-btn', 'change', 'изменить');
    addNodeToTranslate('.gallery-preview__label_delete-all', 'delete all images', 'удалить все изображения');
    addNodeToTranslate('.gallery-preview__delete-all-btn', 'delete', 'удалить');
    addNodeToTranslate('.gallery-preview__create-btn', 'create gallery', 'создать галерею');
    addNodeToTranslate('.modal__title', 'system message', 'сиситемное сообщение');
}

export { translateTo, initiateNodesTranslate };

