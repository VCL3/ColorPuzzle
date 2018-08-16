import { combineReducers } from 'redux';

const defaultState = {
  level: 1,
  moves: 0,
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_LEVEL':
      return Object.assign({}, state, { 
        level: state.level + 1,
      });
    case 'ADD_MOVE':
      return Object.assign({}, state, { 
        moves: state.moves + 1,
      });
    case 'CLEAR_MOVE':
      return Object.assign({}, state, { 
        moves: 0,
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