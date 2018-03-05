import { combineReducers } from 'redux';
import { reducer } from 'redux-form';

const rootReducer = combineReducers({
  form: reducer
});

export default rootReducer;
