import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';

const isBorderTile = (index, width, height) => (index < width) || (index > (width * (height - 1))) || (index % width == 0) || (index % width == width - 1);
const isCrossTile = (index, width, height) => (index % Utils.tileCount === Math.floor(Utils.tileCount / 2)) || (Math.floor(index / Utils.tileCount) === Math.floor(Utils.tileCount / 2));
const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? LANDSCAPE : PORTRAIT;
}

const Utils = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  getOrientation: getOrientation, 
  tileCount: 7,
  widthHeightRatio: 1.0,
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
  },
  isBorderTile: isBorderTile,
  isCrossTile: isCrossTile,
};

export default Utils;