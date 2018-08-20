import levelsConfig from '../config/LevelsConfig.json';
import tinycolor from 'tinycolor2';
import Utils from '../utils/Utils';

export default class LevelsFactory {

  constructor(level) {
    this.hello = level;
  };

  getSetupForLevel(level) {
    const levelConfig = levelsConfig[level - 1];
    return { 
      width: levelConfig.width, 
      height: levelConfig.height,
      colors: levelConfig.colors
    }
  }

};