import { SETORDERDELAY, CLEARORDERDELAY } from '../actions'

const defaultState = {
    delay: 0,
};

const time = (state = defaultState, action) => {
    switch (action.type) {
        case SETORDERDELAY:
            console.log('action', action)
            return {
                ...state,
                delay: action.delay
            }
        case CLEARORDERDELAY:
            console.log('action', action)
            return {
                ...state,
                delay: 0
            }
    }
    return state;
};

export default time;