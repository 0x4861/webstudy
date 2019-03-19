import {
    combineReducers
} from 'redux';

const defaultState = {
    tabs: []
}

const bookmark = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                tabs: [...state.tabs, action.link.url]
            }
        default:
            return state;
    }
}

const reducers = combineReducers({
    //counter
});

export default bookmark;