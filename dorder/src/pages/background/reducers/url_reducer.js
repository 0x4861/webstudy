import { SETGOODSURL, CLEARGOODSURL } from '../actions'

const defaultState = {
    data: "",
};

const url = (state = defaultState, action) => {
    switch (action.type) {
        case SETGOODSURL:
            console.log('action', action)
            return {
                ...state,
                data: action.url
            }
        case CLEARGOODSURL:
            console.log('action', action)
            return {
                ...state,
                data: ""
            }
    }
    return state;
};

export default url;