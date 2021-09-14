import { domElements } from '../script.js'

const toolbox = {
  //Gets only digits from photos' id
  getIdNumber: function(id){
     return parseInt(id.match(/\d{1,3}/)[0])
  },

  //Puts ids in order after deleting some items
  normaliseCounters: function(array){
    const newArray = []
    array.forEach(c => {
      if(c.id) newArray.push(c)
    })
    for(let i = 0; i < newArray.length; i++){
      newArray[i].id = `${newArray[i].id.match(/\D*/)[0]}${i}`
    }
  },

  //finds 'src' attribute value of an original-size photo
  findSourceById: function(imageId){
    let attribute
    const newId = `img${toolbox.getIdNumber(imageId)}`
    domElements.images.original.forEach(c =>{
      if(c.id === newId) attribute = c.src
    })
    return attribute
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


export { toolbox }
