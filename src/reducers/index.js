import { combineReducers } from 'redux';
import Utils from '../utils/Utils';

const defaultState = {
  highestLevel: 1,
  gameMoves: 0,
  customLevels: Utils.defaultCustomLevels,
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_HIGHEST_LEVEL':
      return Object.assign({}, state, { 
        highestLevel: state.highestLevel + 1,
      });
    case 'SET_HIGHEST_LEVEL':
      return Object.assign({}, state, { 
        highestLevel: action.highestLevel,
      });
    case 'ADD_GAME_MOVE':
      return Object.assign({}, state, { 
        gameMoves: state.gameMoves + 1,
      });
    case 'CLEAR_GAME_MOVE':
      return Object.assign({}, state, { 
        gameMoves: 0,
      });
    case 'SET_CUSTOM_LEVELS':
      return Object.assign({}, state, { 
        customLevels: action.customLevels,
      });
    default: 
      return state;
  }
};

// Combine all the reducers
const AppReducer = combineReducers({
  gameReducer,
});

export default AppReducer;