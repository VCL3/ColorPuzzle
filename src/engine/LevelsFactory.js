import levelsConfig from '../config/LevelsConfig.json';
import ColorEngine from './ColorEngine';

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
      width = 5;
      height = 5;
    } else {
      width = 7;
      height = 7;
    }

    return { 
      width: width, 
      height: height,
      // colors: ColorEngine.generateColorPalette(),
      colors: levelConfig.colors,
    }
  }

};