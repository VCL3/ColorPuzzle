import tinycolor from 'tinycolor2';
import Utils from '../utils/Utils';

const getStepIncrement = function (length, start, end, i) {
  if (length == 1) {
    return start;
  } else {
    return start + (end - start) / (length - 1) * i;
  }
}

const getStepColor = function (length, startColor, endColor, i) {
  const startR = startColor.toRgb().r;
  const startG = startColor.toRgb().g;
  const startB = startColor.toRgb().b;
  const endR = endColor.toRgb().r;
  const endG = endColor.toRgb().g;
  const endB = endColor.toRgb().b;
  return tinycolor({ r: getStepIncrement(length, startR, endR, i), g: getStepIncrement(length, startG, endG, i), b: getStepIncrement(length, startB, endB, i) });
}

const getOneDimensionalArray = function (length, startColor, endColor) {
  let oneDimensionalArray = [];
  for (let i = 0; i < length; i++) {
    oneDimensionalArray.push(getStepColor(length, startColor, endColor, i));
  }
  return oneDimensionalArray;
}

const generateColorArray = function (width, height, upperLeft, upperRight, lowerLeft, lowerRight) {
  let fullColorArray = [];
  // upperLeft -> lowerLeft
  const leftColumn = getOneDimensionalArray(height, upperLeft, lowerLeft);
  // upperRight -> lowerRight
  const rightColumn = getOneDimensionalArray(height, upperRight, lowerRight);
  for (let i = 0; i < height; i++) {
    let rowColorArray = getOneDimensionalArray(width, leftColumn[i], rightColumn[i]);
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

const randomizeTiles = function (colorArray, width, height) {
  const randomizableTiles = [];
  colorArray.map((color, index) => {
    if (!(Utils.isBorderTile(index, width, height) || Utils.isCrossTile(index, width, height))) {
      randomizableTiles.push(color);
    }
  });
  const randomizedTiles = fullyShuffleArray(randomizableTiles);
  let i = 0;
  colorArray.map((color, index) => {
    if (!(Utils.isBorderTile(index, width, height) || Utils.isCrossTile(index, width, height))) {
      colorArray[index] = randomizedTiles[i];
      i++;
    }
  });
  return colorArray;
}

export default class ColorEngine {

  constructor(width, height, upperLeft, upperRight, lowerLeft, lowerRight) {
    this._colorArray = generateColorArray(width, height, upperLeft, upperRight, lowerLeft, lowerRight);
    this.currentColorArray = randomizeTiles(this._colorArray.slice(), width, height);
    // Make sure start state is not success state
    while (this.checkSuccess()) {
      this.currentColorArray = randomizeTiles(this._colorArray.slice(), width, height);
    }
  };

  getCorrectColorForIndex(index) {
    if (index < this._colorArray.length) {
      return this._colorArray[index];
    } else {
      return tinycolor('#ffffff');
    }
  }

  getIncorrectColorIndex() {
    const incorrectIndices = [];
    this.currentColorArray.map((color, index) => {
      if (!tinycolor.equals(this._colorArray[index], this.currentColorArray[index])) {
        incorrectIndices.push(index);
      }
    });
    return incorrectIndices[Math.floor(Math.random() * incorrectIndices.length)];
  }

  checkSuccess() {
    for (let i = 0; i < this._colorArray.length; i++) {
      if (!tinycolor.equals(this._colorArray[i], this.currentColorArray[i])) {
        return false;
      }
    }
    return true;
  }

};