import {
    combineReducers
} from 'redux';

const defaultState = {
    tabs: []
}

const bookmark = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD':
            console.log('adding reducerd')
            return {
                ...state,
                tabs: [...state.tabs, action.link.url]
            }
        case 'REFRESH':
            return {
                ...state,
                tabs: [...state.tabs, ...action.urlList.url]
            }
        default:
            return state;
    }
}

const reducers = combineReducers({
    //counter
});

export default bookmark;