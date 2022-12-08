import { domElements } from "./state.js";

const toolbox = {
  //Gets only digits from photos' id
  getIdNumber: function(id){
    return parseInt(id.match(/\d*$/));
  },

  //finds 'src' attribute value of an original-size photo
  findSourceById: function(imageId){
    let attribute
    const newId = `img${this.getIdNumber(imageId)}`
    domElements.images.original.forEach(image =>{
      if(image.id === newId) attribute = image.src;
    });
    return attribute
  },

  //finds indicator-element
  getIndicatorElement(idNumber) {
    return document.getElementById(`indicator-${idNumber}`);
  },

  //Finds image ratio and defines it's compression parameters
  findCompressionParameters: function(width, height){
    let large, small, divisor, counter, ratioWidth, ratioHeight, scale
    divisor = -1

    if(width > height){
      large = width
      small = height
    } else {
      large = height
      small = width
    }

    counter = small

    while(divisor === -1){
      if(large % counter === 0 && small % counter === 0){
        divisor = counter
      }
      counter--
    }

    ratioWidth = width/divisor
    ratioHeight = height/divisor

    while(ratioWidth > 16 || ratioHeight > 16){
      ratioWidth = Math.round(ratioWidth/2)
      ratioHeight = Math.round(ratioHeight/2)
    }

    if(ratioWidth > 5 || ratioHeight > 5) scale = 30
    else scale = 90

    return {
      width: ratioWidth,
      height: ratioHeight,
      scale: scale
    }
  },
}


export default toolbox;
