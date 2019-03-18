import { combineReducers } from 'redux';

const defaultState = {
    count: 0
}

const counter = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD':
        console.log('insid reducers..', action, 'state', state);
            return ({
                count: action.counter.count + 1
            })
    }
    return state;

}

const reducers = combineReducers({
    counter
});

export default reducers;