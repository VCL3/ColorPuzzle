import { combineReducers } from 'redux';
import { getHighestLevel } from '../Storage';

const defaultState = {
  highestLevel: 1,
  gameMoves: 0,
  customLevels: [
  {
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
  },
  ],
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