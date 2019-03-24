import { SETGOODSCOUNTMAX, CLEARGOODSCOUNTMAX } from '../actions'

const defaultState = {
    data: 0,
};

const max = (state = defaultState, action) => {
    switch (action.type) {
        case SETGOODSCOUNTMAX:
            console.log('action', action)
            return {
                ...state,
                data: action.max
            }
        case CLEARGOODSCOUNTMAX:
            console.log('action', action)
            return {
                ...state,
                data: 0
            }
    }
    return state;
};

export default max;