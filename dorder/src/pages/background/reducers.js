import {combineReducers} from 'redux';
import url from './reducers/url_reducer.js';
import min from './reducers/min_reducer.js';
import max from './reducers/max_reducer.js';
import all from './reducers/all_reducer.js';
import time from './reducers/time_reducer';
import alarm from './reducers/alarm_reducer';
import file from './reducers/file_reducer';

export default combineReducers ({
  url: url,
  min: min,
  max: max,
  all: all,
  time : time,
  alarm: alarm,
  file : file,
})
