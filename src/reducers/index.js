import { combineReducers } from 'redux';
import { MOVED_INDEX } from "../actions/";

let dataState = { 
  movedIndex: null,
};

const indexReducer = (state = dataState, action) => {
  switch (action.type) {
    case MOVED_INDEX:
      return Object.assign({}, state, { 
          movedIndex: action.data,
      });
    default:
      return state;
    }
  };

// Combine all the reducers
const AppReducer = combineReducers({
  indexReducer,
});

export default AppReducer;