export const setGoodsUrlOrder = (url) => ({
    type: 'SETGOODSURL',
    url: url
})

export const setGoodsCountMin = (data) => ({
    type: 'SETGOODSCOUNTMIN',
    min: data
})

export const setGoodsCountMax = (data) => ({
    type: 'SETGOODSCOUNTMAX',
    max: data
})

export const setGoodsCountAll = (data) => ({
    type: 'SETGOODSCOUNTALL',
    all: data
})

export const setOrderDelay = (data) => ({
    type: 'SETORDERDELAY',
    delay: data
})

export const refreshBookmark = (data) => ({
    type: 'REFRESH',
    urlList: data
})

export const deleteAllBookmark = () => ({
    type: 'DELETE-ALL'
})

export const deleteOneBookmark = (url) => ({
    type: 'DELETE-ONE',
    url: url
})


/*
export const add = (data) => {
    console.log('inside reducers..', data);
    return ({
        type: 'ADD',
        counter: data
    })
}
*/

/*
export const add = () => {
    return new Promise((resolve, reject) => {
        console.log('inside actions..')
        let whatever;
        // chrome.tabs.query({}, (data) => {
        //   let link = data.filter((link) => {
        //     return link.active
        //   });
        //   whatever = {
        //     type: 'ADD',
        //     link: 'hello'//link[0].url
        //   }
        //   resolve(whatever)
        // })
        chrome.tabs.getSelected(null, (tab) => {
            const urlTab = tab.url.toString();
            console.log('urltab : ', urlTab)
            whatever = {
                type: 'ADD',
                link: urlTab
            }
            console.log(whatever);
            resolve(whatever);
        });
    });
}
*/