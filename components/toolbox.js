import { dom } from "./state.js";

const getIdNumber = id => parseInt(id.match(/\d*$/));


function createNode(nodeName, id, classes) {
  const node = document.createElement(nodeName);
  if (classes && classes.length) node.classList.add(...classes);
  if (id) node.id = id;
  return node;
} 


function findGeneralGreatestDivisor(number1, number2) {
  let large = number1 > number2 ? number1 : number2;
  let small = number1 < number2 ? number1 : number2;
  let counter = small;
  let divisor = -1;

  while (divisor === -1) {
    if(large % counter === 0 && small % counter === 0) divisor = counter;
    counter--;
  }

  return divisor;
}


function findCompressionParameters (imageWidth, imageHeight, minWidth) {
  const divisor = findGeneralGreatestDivisor(imageWidth, imageHeight);
  //get image proportions
  let ratioWidth = imageWidth/divisor;
  let ratioHeight = imageHeight/divisor;
  while (ratioWidth > 16 || ratioHeight > 16) {
    ratioWidth = Math.round(ratioWidth/2);
    ratioHeight = Math.round(ratioHeight/2);
  }

  //set appropriate scaling
  let width = 0;
  let height = 0;
  let scale = 10;
  while (width < minWidth || height < minWidth) {
    scale += 10;
    width = ratioWidth * scale;
    height = ratioHeight * scale;
  }

  return {
    width,
    height,
  }
}


function compressImage(originalImage, maxWidth, callback) {
  const reader = new FileReader();
  const image = new Image();
  const canvas = createNode('canvas');
  const ctx = canvas.getContext('2d');
  const imageQuality = 1;

  reader.onload = () => {  
    image.src = reader.result;
    image.onload = () => {
      const { width, height } = findCompressionParameters(image.width, image.height, maxWidth);
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const compressedImage = new Image();
      compressedImage.src = canvas.toDataURL('image/jpeg', imageQuality);
      callback(compressedImage);
    }
  }

  return reader.readAsDataURL(originalImage);
}


function findOrderIndexById(idNumber) {
  return dom.images.order.findIndex(number => number === idNumber);
}


export {
  getIdNumber,
  createNode,
  compressImage,
  findOrderIndexById,
}
