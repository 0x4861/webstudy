import { applyMiddleware, createStore } from 'redux';
import { wrapStore, alias } from "react-chrome-redux";
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk'
import reducer from './reducers'
import throttle from 'lodash/throttle';
import { saveState, loadState } from './localStorage';
import aliasSource from './aliases.js';

console.log('inside the store');

const logger = createLogger();

const middlewares = [
    alias(aliasSource),
    logger,
    ReduxThunk
];

//const store = createStore(reducer);
//const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore (
    reducer,
    loadState(),
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(throttle(()=>{
    saveState({
        url: store.getState().url,
        min: store.getState().min,
        max: store.getState().max,
        all: store.getState().all,
        time: store.getState().time,
        alarm: store.getState().alarm,
        file: store.getState().file,
    })
}), 1000)

wrapStore(store, {
    portName: 'ORDER_TOOL',
})

export default store;
