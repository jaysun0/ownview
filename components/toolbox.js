const getIdNumber = id => parseInt(id.match(/\d*$/));


function createNode(nodeName, id, classes) {
  const node = document.createElement(nodeName);
  if (classes && classes.length) node.classList.add(...classes);
  if (id) node.id = id;
  return node;
} 


function findCompressionParameters (width, height) {
  let large, small, divisor, counter, ratioWidth, ratioHeight, scale
  divisor = -1;

  if(width > height){
    large = width;
    small = height;
  } else {
    large = height;
    small = width;
  }

  counter = small;

  while (divisor === -1) {
    if(large % counter === 0 && small % counter === 0) divisor = counter;
    counter--;
  }

  ratioWidth = width/divisor;
  ratioHeight = height/divisor;

  while (ratioWidth > 16 || ratioHeight > 16) {
    ratioWidth = Math.round(ratioWidth/2);
    ratioHeight = Math.round(ratioHeight/2);
  }

  if (ratioWidth > 5 || ratioHeight > 5) scale = 30;
  else scale = 90

  return {
    width: ratioWidth,
    height: ratioHeight,
    scale: scale,
  }
};


export {
  getIdNumber,
  createNode,
  findCompressionParameters,
}
