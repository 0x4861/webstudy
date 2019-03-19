import { combineReducers } from 'redux';

const defaultState = {
    link: ''
}

const counter = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD':
        console.log('add reducers ', action);
        return 'ok'
        // console.log('insid reducers..', action, 'state', state);
        //     return ({
        //         count: action.counter.count + 1
        //     })
    }
    return state;

}

const reducers = combineReducers({
    //counter
});

export default counter;