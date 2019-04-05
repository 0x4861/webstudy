console.log("inside background...")

import _ from 'lodash';
import store from './store';
import { deleteAlarm } from './alarm';
import { getOrderData } from './order';

import { hyundailmall_order_run,
    hyundaimall_insert_event,
    hyundaimall_setPortInterface } from './hyundaimall';

const HYUNDAI = "hyundaihmall";
const LOTTE = "lottemall";

const EVENT_TAB_CREATED = 'EVENT_TAB_CREATED';

let contentPortList = [];
let contentPort = -1;
let contentWindow;
let contentWindowId = 0;
let contentTab;
let contentTabId = -1;

let orderData = {}; //주문 정보 데이터

var currMall;

const portRecovery = () => {
    chrome.storage.local.set({"msg": ""}, function() {
        console.log("[back] 내부 저장 값 클리어");
    });
    var theValue = "RECOVERYPORT";
    // Save it using the Chrome extension storage API.
    chrome.storage.local.set({"msg": theValue}, function() {
        console.log("[back] 포트 복구 진행");
    });
  }

const sendMsgToContent = (action, msg) => {
    if ((typeof contentPort != 'undefined') && (contentPortList.length!=0)) {
        var message = {
            action: action,
            payload: msg
        }
        try {
            contentPort.postMessage(message);
        } catch(err) {
            console.log("[back] ", err);
            portRecovery();
        }
    } else {
        alert("백그라운드 연결이 끊어졌습니다.");
        // TODO:
        // should reconnect ???
    }
}

const updateCurrentWindowCallback = (window) => {
    if (contentWindowId != window.id) {
        updateCurrentWindowId(window.id);
        updateCurrentWindow(window);
    }
}

const updateCurrentWindowData = () => {
    chrome.windows.getCurrent({populate:false}, updateCurrentWindowCallback);
}

const createNewTabCallback = (tab) => {
    contentTab = tab;
    insertEvent(EVENT_TAB_CREATED, event_tab_created);
}

const createNewTab = (wid, url) => {
    var createProperties = {
        'windowId': wid,
        'index': 0,
        'url': url,
        'active': true,
    }
    chrome.tabs.create(createProperties, createNewTabCallback);
}

const updateTabCallback = (tab) => {
    //contentTabId = tab.id;
}

const updateTab = (url) => {
    var updateProperties = {
        'url': url,
        'active': true,
        'openerTabId': 0
    };
    chrome.tabs.update(updateProperties, updateTabCallback);
}
/*
const loadLoginPage = (mall) => {
    prevState = currState;
    currState = order_state.LOADLOGIN;
    sendMsgToContent('REQUEST_LOAD_LOGIN', {
        'shop': mall
    });
}

const login = (id, pw, mall) => {
    prevState = currState;
    currState = order_state.REQLOGIN;
    // 컨텐트로 아이디 비번 전달 -> 로그인
    sendMsgToContent('REQUEST_LOGIN', {
        'id':id,
        'pw':pw,
        'shop': mall
    });
}

const setOrderOption = (count, mall) => {
    prevState = currState;
    currState = order_state.SETORDER;
    // 컨텐트로 아이디 비번 전달 -> 로그인
    sendMsgToContent('SETORDER', {
        'count':count,
        'shop': mall
    });
}

const setDeleveryInfo = (mall) => {
    prevState = currState;
    currState = order_state.SETDELEVERY;
    // 배송정보 중 입력가능한 가벼운 것만 먼저 처리
    sendMsgToContent('SETDELEVERYINFO', {
        'shop': mall
    });
}

const setAddress = (addr, mall) => {
    prevState = currState;
    currState = order_state.SETADDRESS;
    // 배송정보 중 입력가능한 가벼운 것만 먼저 처리
    sendMsgToContent('SETADDRESS', {
        'addr': addr,
        'shop': mall
    });
}

const setCoupon = (coupon, count, mall) => {
    prevState = currState;
    currState = order_state.SETCOUPON;
    // 쿠폰 입력 진행
    sendMsgToContent('SETCOUPON', {
        'coupon': coupon,
        'count': count,
        'shop': mall
    });
}

const setRetryOrder = (url, mall) => {
    prevState = currState;
    currState = order_state.INIT;
    // 로그아웃 후, 상품페이지를 리로드 하고, 주문할 수 있도록 전개
    updateTab(url);
}
*/

//////////// Listener /////////////////

const contentPortMsgListener = (msg) => {
    var event = msg.event;
    var payload = msg.payload;
    console.log("-> [Back] event=",event," payload:",payload);
    if (currMall == HYUNDAI) {
        hyundaimall_insert_event(event, payload);
    } else if (currMall == LOTTE) {

    } else {

    }
}

const contentPortDisconnectListener = (event) => {
    console.log("[Back] 포트 연결이 끊어졌습니다.");
    if (typeof contentPortList != 'undefined') {
        var tmp = contentPortList.pop();
        console.log("[Back] poped port : ", tmp, " portlist length : ", contentPortList.length);
        // TODO:
        // notify port disconnect into shop page
        portRecovery();
    }
}

const contentConnectedListener = function (port) {
    console.assert(port.name == "BACKGROUND-CONTENT");

    if ( port.name === "BACKGROUND-CONTENT") {
        contentPort = port;
        contentPortList.push(contentPort);
        contentPort.onMessage.addListener(contentPortMsgListener);
        contentPort.onDisconnect.addListener(contentPortDisconnectListener);
        if (currMall == HYUNDAI) {
            hyundaimall_setPortInterface(sendMsgToContent);
        } else if (currMall == LOTTE) {
    
        } else {
    
        }
    } else {

    }
}

const tabUpadtedListener = function (tabId, changeInfo, tab) {
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
    if (contentTabId != tabId) {
        contentTabId = tabId; // 현재 탭이 변경되었으면 탭 아이디를 변경해준다.
        console.log("탭이 변경되었습니다. ", tabId, "   info ", changeInfo);
    }
}

const tabActivatedListener = function (tabs) {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        //console.log(tabs[0].url);
        // chrome.runtime.onConnect.addListener(function (port) {
        //     console.assert(port.name == "url-connection");
        //     port.onMessage.addListener(function (msg) {
        //         if (msg.message == "url")
        //             port.postMessage({
        //                 result: tabs[0].url.toString()
        //             });
        //     });
        // });
        console.log('탭이 활성화 되었습니다.')
        console.log('current URL:', tabs[0].url);
        console.log(tabs);
        //chrome.runtime.onConnect.addListener(contentConnectedListener);
    });
}

const do_order = () => {
    var state = store.getState();
    orderData = getOrderData(state);
    currMall = orderData.shopInfo.mall;
    if (currMall == HYUNDAI) {
        hyundailmall_order_run(orderData);
    } else if (currMall == LOTTE) {

    } else {

    }
}

const commandListener = function (command) {
    console.log('[사용자 명령] ' , command);
    do_order();
}

// content와 연결되는 리스너
chrome.runtime.onConnect.addListener(contentConnectedListener);

// 탭이 업데이트 되었을때 리스너
chrome.tabs.onUpdated.addListener(tabUpadtedListener);

// 탭이 활성화 되었을때 리스너
chrome.tabs.onActivated.addListener(tabActivatedListener);

// 키보드 커맨드 들어올때 리스너
chrome.commands.onCommand.addListener(commandListener);

// 알람 리스너
chrome.alarms.onAlarm.addListener(function(alarm) {
    window.alarm = alarm;
    // 등록된 알람 클리어
    deleteAlarm().then(result=>{console.log(result)});
    do_order();
});

const chromeMessageListener = (msg, sender, sendResponse) => {
    // 크롬 api를 통한 메시지 통신. (tab정보등을 알아야 통신이 가능한다.)
    //console.log(msg);
    //let event = new CustomEvent('GET_DUCK');
    //window.dispatchEvent(event);
    console.log("-> [back] 크롬런타임리스너 : ", msg);
}

// runtime.sendMessage 혹은 컨텐트 스크립트에서 tabs.sendMessage로 보낼때 호출됨.
chrome.runtime.onMessage.addListener(chromeMessageListener);