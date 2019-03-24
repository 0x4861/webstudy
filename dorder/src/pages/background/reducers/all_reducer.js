import { SETGOODSCOUNTALL, CLEARGOODSCOUNTALL } from '../actions'

const defaultState = {
    data: 0,
};

const all = (state = defaultState, action) => {
    switch (action.type) {
        case SETGOODSCOUNTALL:
            console.log('action', action)
            return {
                ...state,
                data: action.all
            }
        case CLEARGOODSCOUNTALL:
            console.log('action', action)
            return {
                ...state,
                data: 0
            }
    }
    return state;
};

export default all;