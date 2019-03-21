import {combineReducers} from 'redux';
import bookmark from './reducers/bookmark_reducer';
import order from './reducers/order_reducer';

export default combineReducers ({
  bookmark : bookmark,
  order : order,
})
