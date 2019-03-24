export const SETGOODSURL = 'SETGOODSURL';
export const SETGOODSCOUNTMIN = 'SETGOODSCOUNTMIN';
export const SETGOODSCOUNTMAX = 'SETGOODSCOUNTMAX';
export const SETGOODSCOUNTALL = 'SETGOODSCOUNTALL';
export const SETORDERDELAY = 'SETORDERDELAY';
export const SETALARMDATE = 'SETALARMDATE';
export const SETALARMTIME = 'SETALARMTIME';
export const SETFILEDATA = 'SETFILEDATA';
export const SETFILENAME = 'SETFILENAME';

export const CLEARGOODSURL = 'CLEARGOODSURL';
export const CLEARGOODSCOUNTMIN = 'CLEARGOODSCOUNTMIN';
export const CLEARGOODSCOUNTMAX = 'CLEARGOODSCOUNTMAX';
export const CLEARGOODSCOUNTALL = 'CLEARGOODSCOUNTALL';
export const CLEARORDERDELAY = 'CLEARORDERDELAY';
export const CLEARALARMDATE = 'CLEARALARMDATE';
export const CLEARALARMTIME = 'CLEARALARMTIME';
export const CLEARFILEDATA = 'CLEARFILEDATA';
export const CLEARFILENAME = 'CLEARFILENAME';

export const setGoodsUrl = (url) => ({
    type: SETGOODSURL,
    url: url
})

export const setGoodsCountMin = (data) => ({
    type: SETGOODSCOUNTMIN,
    min: data
})

export const setGoodsCountMax = (data) => ({
    type: SETGOODSCOUNTMAX,
    max: data
})

export const setGoodsCountAll = (data) => ({
    type: SETGOODSCOUNTALL,
    all: data
})

export const setOrderDelay = (data) => ({
    type: SETORDERDELAY,
    delay: data
})

export const setAlarmDate = (data) => ({
    type: SETALARMDATE,
    date: data
})

export const setAlarmTime = (data) => ({
    type: SETALARMTIME,
    time: data
})

export const setFileData = (data) => ({
    type: SETFILEDATA,
    file_data: data
})

export const setFileName = (data) => ({
    type: SETFILENAME,
    file_name: data
})


// CLEAR
export const clearGoodsUrl = () => ({
    type: CLEARGOODSURL,
})

export const clearGoodsCountMin = () => ({
    type: CLEARGOODSCOUNTMIN,
})

export const clearGoodsCountMax = () => ({
    type: CLEARGOODSCOUNTMAX,
})

export const clearGoodsCountAll = () => ({
    type: CLEARGOODSCOUNTALL,
})

export const clearOrderDelay = () => ({
    type: CLEARORDERDELAY,
})

export const clearAlarmDate = () => ({
    type: CLEARALARMDATE,
})

export const clearAlarmTime = () => ({
    type: CLEARALARMTIME,
})

export const clearFileData = () => ({
    type: CLEARFILEDATA,
})

export const clearFileName = () => ({
    type: CLEARFILENAME,
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