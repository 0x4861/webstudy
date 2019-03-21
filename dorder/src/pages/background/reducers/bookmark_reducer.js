const defaultState = {
    tabs: []
}

const bookmark = (state = defaultState, action) => {
    switch (action.type) {
        // case 'ADD':
        //     console.log('adding reducerd')
        //     return {
        //         ...state,
        //         tabs: [...state.tabs, action.link.url]
        //     }
        case 'REFRESH':
            console.log('REFRESH url list', action.urlList)
            return {
                ...state,
                tabs: [...state.tabs, action.urlList]
            }
        case 'DELETE-ALL':
            return {
                ...state,
                tabs: []
            }
        case 'DELETE-ONE':
            return {
                ...state,
                tabs: [...state.tabs.filter(element => element[0].url !== action.url)]
            }
        default:
            return state;
    }
}

export default bookmark;