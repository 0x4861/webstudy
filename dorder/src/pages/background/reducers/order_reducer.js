const defaultState = {
    goods_url: "",
    goods_count_min: '',
    goods_count_max: '',
    goods_count_all: '',
};

const order = (state = defaultState, action) => {
    switch (action.type) {
        case 'SETGOODSURL':
            console.log('action', action)
            return {
                ...state,
                goods_url: action.url
            }
        case 'SETGOODSCOUNTMIN':
            console.log('action', action)
            return {
                ...state,
                goods_count_min: action.min
            }
        case 'SETGOODSCOUNTMAX':
            console.log('action', action)
            return {
                ...state,
                goods_count_max: action.max
            }
        case 'SETGOODSCOUNTALL':
            console.log('action', action)
            return {
                ...state,
                goods_count_all: action.all
            }
        default:
            {
                return state;
            }
    }
};

export default order;