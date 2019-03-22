const defaultState = {
    delay: '',
    date: "",
    time: "",
};

const time = (state = defaultState, action) => {
    console.log('action', action)
    switch (action.type) {
        case 'SETORDERDELAY':
            return {
                ...state,
                delay: action.delay
            }
        case 'SETALARMDATE':
            return {
                ...state,
                date: action.date
            }
        case 'SETALARMTIME':
            return {
                ...state,
                time: action.time
            }
        default:
            {
                return state;
            }
    }
};

export default time;