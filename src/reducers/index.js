import { combineReducers } from 'redux';

const defaultState = {
  highestLevel: 1,
  gameLevel: 1,
  gameMoves: 0,
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_HIGHEST_LEVEL':
      return Object.assign({}, state, { 
        highestLevel: state.highestLevel + 1,
      });
    case 'ADD_GAME_LEVEL':
      return Object.assign({}, state, { 
        gameLevel: state.gameLevel + 1,
      });
    case 'ADD_GAME_MOVE':
      return Object.assign({}, state, { 
        gameMoves: state.gameMoves + 1,
      });
    case 'CLEAR_GAME_MOVE':
      return Object.assign({}, state, { 
        gameMoves: 0,
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