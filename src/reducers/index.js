import { combineReducers } from 'redux';
import { MOVED_INDEX } from "../actions/";

const defaultState = {
  moves: 0,
};

const movesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_MOVE':
      return Object.assign({}, state, { 
        moves: state.moves + 1,
      });
    default: 
      return state;
  }
};

// Combine all the reducers
const AppReducer = combineReducers({
  movesReducer,
});

export default AppReducer;