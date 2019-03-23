import {combineReducers} from 'redux';
import order from './reducers/order_reducer';
import time from './reducers/time_reducer';
import file from './reducers/file_reducer';

export default combineReducers ({
  order : order,
  time : time,
  file : file,
})
