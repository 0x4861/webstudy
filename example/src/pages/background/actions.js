// export const addBookmark = (link) => ({
//     type: 'ADD',
//     link: link
// })

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