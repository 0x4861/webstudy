const defaultState = {
    data: [],
    name: '',
};

const file = (state = defaultState, action) => {
    switch (action.type) {
        case 'SETFILEDATA':
            console.log('action', action)
            return {
                ...state,
                data: action.file_data
            }
        case 'SETFILENAME':
            console.log('action', action)
            return {
                ...state,
                name: action.file_name
            }
        case 'CLEARFILEPROPS':
            console.log('action', action)
            return {
                ...state,
                data: [],
                name: ''
            }
        default:
            {
                return state;
            }
    }
};

export default file;