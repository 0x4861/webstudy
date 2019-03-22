const defaultState = {
    delay: '',
    date: "",
    time: "",
};

const time = (state = defaultState, action) => {
    switch (action.type) {
        case 'SETORDERDELAY':
            console.log('action', action)
            return {
                ...state,
                delay: action.delay
            }
        case 'SETALARMDATE':
            console.log('action', action)
            return {
                ...state,
                date: action.date
            }
        case 'SETALARMTIME':
            console.log('action', action)
            return {
                ...state,
                time: action.time
            }
        case 'CLEARTIMEPROPS':
            console.log('action', action)
            return {
                ...state,
                delay: '',
                date: "",
                time: ""
            }
        default:
            {
                return state;
            }
    }
};

export default time;