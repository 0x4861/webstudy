const defaultState = {
    goods_url: ""
};

const order = (state = defaultState, action) => {
    switch (action.type) {
        case 'SETGOODSURL':
            console.log('action', action)
            return {
                ...state,
                goods_url: action.url
            }
        default:
            {
                return state;
            }
    }
};

export default order;