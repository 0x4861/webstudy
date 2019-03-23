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

export const setAlarmDate = (data) => ({
    type: 'SETALARMDATE',
    date: data
})

export const setAlarmTime = (data) => ({
    type: 'SETALARMTIME',
    time: data
})

export const setFileData = (data) => ({
    type: 'SETFILEDATA',
    file_data: data
})

export const setFileName = (data) => ({
    type: 'SETFILENAME',
    file_name: data
})

export const clearOrderProps = () => ({
    type: 'CLEARORDERPROPS'
})

export const clearTimeProps = () => ({
    type: 'CLEARTIMEPROPS'
})

export const clearFileProps = () => ({
    type: 'CLEARFILEPROPS'
})

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