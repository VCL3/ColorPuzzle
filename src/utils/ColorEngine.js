import tinycolor from 'tinycolor2';
import Utils from './Utils';

const getStepIncrement = function (start, end, i) {
  return start + (end - start) / (Utils.tileCount - 1) * i;
}

const getStepColor = function (startColor, endColor, i) {
  const startR = startColor.toRgb().r;
  const startG = startColor.toRgb().g;
  const startB = startColor.toRgb().b;
  const endR = endColor.toRgb().r;
  const endG = endColor.toRgb().g;
  const endB = endColor.toRgb().b;
  return tinycolor({ r: getStepIncrement(startR, endR, i), g: getStepIncrement(startG, endG, i), b: getStepIncrement(startB, endB, i) });
}

const getOneDimensionalArray = function (startColor, endColor) {
  let oneDimensionalArray = [];
  for (let i = 0; i < Utils.tileCount; i++) {
    oneDimensionalArray.push(getStepColor(startColor, endColor, i));
  }
  return oneDimensionalArray;
}

const generateColorArray = function (upperLeft, upperRight, lowerLeft, lowerRight) {
  let fullColorArray = [];
  // upperLeft -> lowerLeft
  const leftColumn = getOneDimensionalArray(upperLeft, lowerLeft);
  // upperRight -> lowerRight
  const rightColumn = getOneDimensionalArray(upperRight, lowerRight);
  for (let i = 0; i < Utils.tileCount; i++) {
    let rowColorArray = getOneDimensionalArray(leftColumn[i], rightColumn[i]);
    fullColorArray = fullColorArray.concat(rowColorArray);
  }
  return fullColorArray;
}

const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

// fully random by @BetonMAN
const fullyShuffleArray = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);

const randomizeTiles = function (colorArray) {
  const randomizableTiles = [];
  colorArray.map((color, index) => {
    if (!(Utils.isBorderTile(index) || Utils.isCrossTile(index))) {
      randomizableTiles.push(color);
    }
  });
  const randomizedTiles = fullyShuffleArray(randomizableTiles);
  let i = 0;
  colorArray.map((color, index) => {
    if (!(Utils.isBorderTile(index) || Utils.isCrossTile(index))) {
      colorArray[index] = randomizedTiles[i];
      i++;
    }
  });
  return colorArray;
}

export default class ColorEngine {

  constructor(upperLeft, upperRight, lowerLeft, lowerRight) {
    this._colorArray = generateColorArray(upperLeft, upperRight, lowerLeft, lowerRight);
    this.currentColorArray = randomizeTiles(this._colorArray.slice());
  };

  checkSuccess() {
    for (let i = 0; i < this._colorArray.length; i++) {
      if (!tinycolor.equals(this._colorArray[i], this.currentColorArray[i])) {
        return false;
      }
    }
    return true;
  }

};