import {
    combineReducers
} from 'redux';

const defaultState = {
    tabs: []
}

const bookmark = (state = defaultState, action) => {
    switch (action.type) {
        // case 'ADD':
        //     console.log('adding reducerd')
        //     return {
        //         ...state,
        //         tabs: [...state.tabs, action.link.url]
        //     }
        case 'REFRESH':
            console.log('REFRESH url list', action.urlList)
            return {
                ...state,
                tabs: [...state.tabs, action.urlList]
            }
        case 'DELETE-ALL':
            return {
                ...state,
                tabs: []
            }
        default:
            return state;
    }
}

const reducers = combineReducers({
    //counter
});

export default bookmark;