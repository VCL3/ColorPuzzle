import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const isBorderTile = (index, width, height) => {
  if (width == 1) {
    return (index == 0) || (index == height - 1); 
  } else if (width == 3) {
    return (index == 0) || (index == 2) || (index == 6) || (index == 8);
  } else if (width > 3) {
    return (index < width) || (index > (width * (height - 1))) || (index % width == 0) || (index % width == width - 1);
  } else {
    return false;
  }
}

const isCrossTile = (index, width, height) => {
  if (width >= 5) {
    return (index % width === Math.floor(width / 2)) || (Math.floor(index / width) === Math.floor(height / 2));
  } else {
    return false;
  }
}

const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? LANDSCAPE : PORTRAIT;
}

const Utils = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    statusBarHeight: getStatusBarHeight(),
  },
  getOrientation: getOrientation, 
  widthHeightRatio: 1.2,
  post(url, data, callback) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then((response) => {
      return response.json() 
    })
    .then((responseData) => {
      callback(responseData);
    });
  },
  colors: {
    themeBackgroundColor: '#FFE8D1',
    themeShadeColor: 'rgb(240, 224, 194)',
    themeDarkBlack: 'rgb(51, 51, 51)',
    themeLightBlack: 'rgb(102, 102, 102)',
    themeUpperLeft: '#F25F5C',
    themeUpperRight: '#FFE066',
    themeLowerLeft: '#247BA0',
    themeLowerRight: '#70C1B3',
    themeBrown: '#50514F',
    themeDarkRed: '#F25F5C',
  },
  isBorderTile: isBorderTile,
  isCrossTile: isCrossTile,
  formatRgbColor: function(rgbColor) {
    const res = rgbColor.split(' ');
    return 'rgb(' + res[1] + ',' + res[2] + ',' + res[3] + ')';
  },
  revertRgbColor: function(rgbColorString) {
    const rgbPart = rgbColorString.substring(4, rgbColorString.length - 1);
    const res = rgbPart.split(', ');
    return 'rgb ' + res[0] + ' ' + res[1] + ' ' + res[2];
  },
  defaultCustomLevels: [{
    "level":1,
    "colors":["rgb 188 69 68", "rgb 89 175 241", "rgb 242 196 108", "rgb 243 243 243"]
  },
  {
    "level":2,
    "colors":["rgb 188 69 68", "rgb 89 175 241", "rgb 242 196 108", "rgb 243 243 243"]
  },
  {
    "level":3,
    "colors":["rgb 188 69 68", "rgb 89 175 241", "rgb 242 196 108", "rgb 243 243 243"]
  },
  {
    "level":4,
    "colors":["rgb 188 69 68", "rgb 89 175 241", "rgb 242 196 108", "rgb 243 243 243"]
  }],
};

export default Utils;