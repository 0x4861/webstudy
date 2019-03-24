import { SETGOODSCOUNTMIN, CLEARGOODSCOUNTMIN } from '../actions'

const defaultState = {
    data: 0,
};

const min = (state = defaultState, action) => {
    switch (action.type) {
        case SETGOODSCOUNTMIN:
            console.log('action', action)
            return {
                ...state,
                data: action.min
            }
        case CLEARGOODSCOUNTMIN:
            console.log('action', action)
            return {
                ...state,
                data: 0
            }
    }
    return state;
};

export default min;