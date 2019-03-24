import { SETALARMDATE, SETALARMTIME, CLEARALARMDATE, CLEARALARMTIME } from '../actions'

const defaultState = {
    date: "",
    time: "",
};

const alarm = (state = defaultState, action) => {
    switch (action.type) {
        case SETALARMDATE:
            console.log('action', action)
            return {
                ...state,
                date: action.date
            }
        case SETALARMTIME:
            console.log('action', action)
            return {
                ...state,
                time: action.time
            }
        case CLEARALARMDATE:
            console.log('action', action)
            return {
                ...state,
                date: ""
            }
        case CLEARALARMTIME:
            console.log('action', action)
            return {
                ...state,
                time: ""
            }
    }
    return state;
};

export default alarm;