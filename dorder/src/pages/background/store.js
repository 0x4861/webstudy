import { applyMiddleware, createStore } from 'redux';
import { wrapStore, alias } from "react-chrome-redux";
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import reducer from './reducers'
import throttle from 'lodash/throttle';
import { saveState, loadState } from './localStorage';

console.log('inside the store');
//const store = createStore(reducer);
//const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore (
    reducer,
    loadState()
);

store.subscribe(throttle(()=>{
    saveState({
        bookmark: store.getState().bookmark,
        order: store.getState().order
    })
}), 1000)

wrapStore(store, {
    portName: 'ORDER_TOOL',
})

export default store;