import levelsConfig from '../config/LevelsConfig.json';
import tinycolor from 'tinycolor2';
import Utils from '../utils/Utils';

export default class LevelsFactory {

  constructor() {
  };

  getSetupForLevel(level) {
    const levelConfig = levelsConfig[level - 1];
    // Set width and height according to level
    let width, height;
    if (level == 1) {
      width = 1;
      height = 7;
    } else if (level == 2) {
      width = 3;
      height = 3;
    } else if (level == 3) {
      width = 5;
      height = 5;
    } else {
      width = 7;
      height = 7;
    }
    return { 
      width: width, 
      height: height,
      colors: levelConfig.colors
    }
  }

};