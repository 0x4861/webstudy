import $ from 'jquery';
//import elementReady from 'element-ready';

var orderData = [];
var shopData = {};
var proxy = '';
export const getUserList = (state) => {
    var array_length = state.file.data.length;
    var data = state.file.data;
    var data_item;
    var data_item_length;
    var ididx;
    var pwidx;
    var addridx;
    var biznumidx;
    var couponidx;
    var entrypoint;
    console.log('array_length :', array_length);
    for (var i = 0; i < array_length; i++) {
        data_item = data[i];
        data_item_length = data_item.length;
        if (data_item_length > 3) { // id, pw, address, biz-num
            for (var j = 0; j < data_item_length; j++) {
                if (data_item[j] == 'id') {
                    ididx = j;
                    entrypoint = i + 1;
                } else if (data_item[j] == 'password') {
                    pwidx = j;
                } else if ((data_item[j] == 'address') || (data_item[j] == '배송지')) {
                    addridx = j;
                } else if ((data_item[j] == 'biznum') || (data_item[j] == '사업자번호')) {
                    biznumidx = j;
                } else if ((data_item[j] == 'coupon') || (data_item[j] == '쿠폰보유')) {
                    couponidx = j;
                } else {}
            }
        }
    }

    var userList = []
    for (var i = entrypoint; i < array_length; i++) {
        var user = {}
        user.id = data[i][ididx]
        user.password = data[i][pwidx]
        user.address = data[i][addridx]
        user.biznum = data[i][biznumidx]
        user.coupon = data[i][couponidx]
        userList.push(user);
    }
    return userList;
}

export const getOrderCount = (state, userData) => {
    var totcnt = state.all.data;
    var mincnt = state.min.data;
    var maxcnt = state.max.data;

    for (var i = 0, check = totcnt; i < userData.length; i++) {
        var randomvalue = _.random(mincnt, maxcnt);

        if (check > maxcnt) {

        } else if ((check >= mincnt) && (check <= maxcnt)) {
            if (randomvalue > check) {
                randomvalue = check;
            }
        } else if (check < mincnt) {
            randomvalue = check;
        } else {
            randomvalue = 0;
        }
        if (i == (userData.length - 1)) {
            randomvalue = check;
        }
        userData[i].ordercount = randomvalue
        check -= randomvalue;
    }
    console.log('check ', check);
    return userData;
}

export const getOrderDelay = (state, userData) => {
    var orderDelay = state.time.delay;

    for (var i = 0; i < userData.length; i++) {
        userData[i].delay = orderDelay;
    }
    return userData;
}

export const isHyundaiMall = (url) => {
    var hmall = "www.hyundaihmall.com"
    var compareResult = url.indexOf(hmall);
    if (compareResult != -1) {
        return true;
    }
    return false;
}

export const isLotteMall = (url) => {
    var lmall = "www.lotteimall.com"
    var compareResult = url.indexOf(lmall);
    if (compareResult != -1) {
        return true;
    }
    return false;
}

export const getShopInfo = (state) => {
    var shopInfo = {}
    var shopUrl = state.url.data;
    shopInfo.url = shopUrl;
    if (isHyundaiMall(shopUrl)) {
        shopInfo.mall = "hyundaihmall";
    } else if (isLotteMall(shopUrl)) {
        shopInfo.mall = "lotteimall";
    } else {
        shopInfo.mall = "unknown";
    }
    return shopInfo;
}

export const getOrderData = (state) => {
    //1. 주문을 위한 데이터 생성
    // user 정보 정리
    var userData = getUserList(state);
    console.log(userData);

    // 주문수량 정리 : 랜덤값 적용
    userData = getOrderCount(state, userData);
    console.log(userData);

    // 주문 시간 간격 설정
    userData = getOrderDelay(state, userData);
    console.log(userData);

    // url 체크 : 쇼핑몰이 어딘지 알아야함
    var shopInfo = getShopInfo(state);
    console.log(shopInfo);

    return { userData, shopInfo };
}

const callback_tabquery = (tab) => {
    var url = shopData.url;
    console.log(tab)
    console.log(tab.url)
    console.log(url)
    console.log(tab.url !== url)
    if (tab.url !== url) {
        console.log(tab.id, {
            url
        })
        chrome.tabs.update(tab.id, {
            url
        });
    }

    setTimeout(()=>{
        console.log('send message');
        port.postMessage({
            result: "shopopen"
        });
    }, 5000);

    setTimeout(() => {
        console.log("getcurrent callback");
        console.log(window);
        $(document).ready(function(){
            console.log("111111"); 
            var login = document.querySelector('.fr').firstElementChild;
            login.click();
         });
    }, 7000);
}

const callback_getCurrent = (window) => {
    var queryInfo = {
        active: true,
        windowId: window.id
    };
    chrome.tabs.query(queryInfo, callback_tabquery);
    
    /*
    chrome.tabs.getSelected(window.id, tab => {
        console.log(tab)
        console.log(tab.url)
        console.log(url)
        console.log(tab.url !== url)
        if (tab.url !== url) {
            console.log(tab.id, {
                url
            })
            chrome.tabs.update(tab.id, {
                url
            });
        }

        checkCurrentLink(url, () => {
            setTimeout(() => {
                chrome.tabs.executeScript(tab.id, {
                    file: 'pages/script.js'
                });
            }, 3000);
        });
    });
    */
}

const createWindowCallback = (window) => {
    console.log('create windows');
    var queryInfo = {
        active: true,
        windowId: window.id
    };
    chrome.tabs.query(queryInfo, (tabs)=> {
        setTimeout(() => {
            console.log("getcurrent callback");
            console.log(window);
            $(document).ready(function(){
                console.log("111111"); 
                var login = document.querySelector('.fr').firstElementChild;
                login.click();
             });
        }, 7000);
    })
}

import compareUrls from 'compare-urls';

const checkCurrentLink = (link, func) => {
    const checker = setInterval(() => {
        console.count(link);
        chrome.tabs.getSelected(tab => {
            if (compareUrls(tab.url, link)) {
                func();
                clearInterval(checker)
            }
        })
    }, 100);
}

import { getDom } from './index'; 

export const doRunOrder = (shopInfo, userData, port) => {

    orderData = userData;
    shopData = shopInfo;
    proxy = port;
    var w = screen.width;
    var h = screen.height;
    var left = 0;
    var top = 0;
    var createData = {};
    createData.url = shopInfo.url;
    createData.type = 'popup';
    createData.width = w;
    createData.height = h;
    createData.left = left;
    createData.top = top;

    // create alarm popup
    //chrome.windows.create(createData, createWindowCallback);
    //chrome.windows.getCurrent(callback_getCurrent);

    var createProperties = {};
    createProperties.index = 0;
    createProperties.url = shopInfo.url;

    chrome.windows.getCurrent((window) => {
        var queryInfo = {
            active: true,
            windowId: window.id
        };

        chrome.tabs.getSelected(window.id, (tab)=> {
            var url = shopInfo.url;
            console.log(tab);
            if (tab.url !== url) {
                console.log(tab.id, {url})
                chrome.tabs.update(tab.id, { url });
            }

            checkCurrentLink(url, () => {
                setTimeout(() => {
                    console.log("tab id : ", tab.id);
                    chrome.tabs.executeScript(tab.id, {
                        file: "pages/script.js",
                        runAt: "document_end"
                    }, function () {
                        console.log("is script loaded ??");
                        var dom = getDom();
                    });
                }, 5000);
            });
        });
        
        /*
        chrome.tabs.getSelected(window.id, tab => {
            console.log(tab)
            console.log(tab.url)
            console.log(url)
            console.log(tab.url !== url)
            if (tab.url !== url) {
                console.log(tab.id, {
                    url
                })
                chrome.tabs.update(tab.id, {
                    url
                });
            }
    
            checkCurrentLink(url, () => {
                setTimeout(() => {
                    chrome.tabs.executeScript(tab.id, {
                        file: 'pages/script.js'
                    });
                }, 3000);
            });
        });
        */
    });
/*
    chrome.tabs.create(createProperties, function(tab){
        console.log(tab);

        setTimeout(()=> {
            var script = {};
            if (shopInfo.mall=="hyundaihmall") {
                script.file = 'pages/index.js'
            }
            chrome.tabs.executeScript(tab.id, script);
         }, 3000);
    });
*/
}

chrome.tabs.onCreated.addListener(function (tab){
    console.log(tab);
})