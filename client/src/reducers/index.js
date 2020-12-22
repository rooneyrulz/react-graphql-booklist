import { combineReducers } from 'redux';

// Reducer
import auth from './auth';
import book from './book';
import alert from './alert';

export default combineReducers({
  auth,
  book,
  alert,
});
