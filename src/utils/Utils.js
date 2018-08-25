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
  tileCount: 7,
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
    themeBackgroundColor: 'rgb(235, 214, 174)',
    themeShadeColor: 'rgb(240, 224, 194)',
    themeIconColor: 'rgb()',
    themeDarkBlack: 'rgb(51, 51, 51)',
    themeLightBlack: 'rgb(102, 102, 102)',
    themeDarkGrey: 'rgb(153, 153, 153)',
    themeLightGrey: 'rgb(204, 204, 204)',
    themeUpperLeft: 'rgb(235, 214, 174)',
    themeUpperRight: 'rgb(255, 225, 168)',
    themeLowerLeft: 'rgb(255, 208, 122)',
    themeLowerRight: 'rgb(255, 196, 86)',
  },
  isBorderTile: isBorderTile,
  isCrossTile: isCrossTile,
};

export default Utils;