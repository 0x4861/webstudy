const defaultState = {
    delay: ''
};

const time = (state = defaultState, action) => {
    switch (action.type) {
        case 'SETORDERDELAY':
            console.log('action', action)
            return {
                ...state,
                delay: action.delay
            }
        default:
            {
                return state;
            }
    }
};

export default time;