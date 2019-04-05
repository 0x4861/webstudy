import Queue from 'js-queue';
import store from './store';
import { getOrderData } from './order';
import { ExportToCsv } from 'export-to-csv';

const LOGIN_PAGE_KEY = 'loginPup.do';
const ORDER_PAGE_kEY = 'order.do';
const ADDR_SELECT_PAGE_KEY = 'selectDstnAdrListPup.do';
const ORDER_COMPLETE_PAGE_KEY = 'orderComplete.do';
const HOME_PAGE_KEY = 'Home.html';

const ACTION_LOAD_SHOP_PAGE = 'ACTION_LOAD_SHOP_PAGE';
const ACTION_LOAD_LOGIN_PAGE = 'ACTION_LOAD_LOGIN_PAGE';
const ACTION_REQ_LOGIN = 'ACTION_REQ_LOGIN';
const ACTION_SET_OPTION_N_REQ_ORDER = 'ACTION_SET_OPTION_N_REQ_ORDER';
const ACTION_SET_DELEVERYINFO = 'ACTION_SET_DELEVERYINFO';
const ACTION_SET_DSTADDR = 'ACTION_SET_DSTADDR';
const ACTION_SET_COUPON = 'ACTION_SET_COUPON';
const ACTION_REQ_PAY = 'ACTION_REQ_PAY';
const ACTION_REQ_LOGOUT = 'ACTION_REQ_LOGOUT';

const EVENT_LOAD_SHOP_PAGE = 'EVENT_LOAD_SHOP_PAGE';
const EVENT_WINDOW_LOADED = 'EVENT_WINDOW_LOADED';
const EVENT_RECOVERY_COMPLETED = 'EVENT_RECOVERY_COMPLETED';
const EVENT_COMPLETE_COUPON_SETTING = 'EVENT_COMPLETE_COUPON_SETTING';
const EVENT_COMPLET_ORDER = 'EVENT_COMPLET_ORDER';
const EVENT_RELOAD_SHOP_PAGE = 'EVENT_RELOAD_SHOP_PAGE';

let orderData = {}; //주문 정보 데이터
let userIndex = 0;
let totalUserCount = 0;
let currAction;
let currWindow = {};
let portCallback;
let resultData = [];

export function hyundaimall_setPortInterface(callback) {
    portCallback = callback;
}

export function hyundaimall_insert_event(event, payload) {
    insertEvent(event,payload);
}

export function hyundailmall_order_run(data) {
    orderData = data;
    userIndex = 0;
    totalUserCount = orderData.userData.length;
    console.log("[Back]", orderData, " total user=",totalUserCount);

    insertEvent(EVENT_LOAD_SHOP_PAGE, orderData.shopInfo.url);
}

// [BEGIN] Event function
function printEvent (event, payload) {
    console.log("-> [Back] Event:",event, ", payload:",payload);
}

function insertEvent (event, payload) {
    printEvent(event, payload);
    eventHandle(event, payload);
}

function eventHandle(event, data) {
    switch (event) {
        case EVENT_LOAD_SHOP_PAGE:
            var url = data;
            doAction(ACTION_LOAD_SHOP_PAGE, {'url':url});
            break;
        case EVENT_WINDOW_LOADED:
            handleWindowLoadedEvent(data);
            break;
        case EVENT_RECOVERY_COMPLETED:
            // 복구완료, 기존에 작업하던것 이 후 진행하는 알고리즘..
            handleRecoveryCompletedEvent(data);
            break;
        case EVENT_COMPLETE_COUPON_SETTING:
            handleCouponSettingCompleteEvent();
            break;
        case EVENT_COMPLET_ORDER:
            handleOrderCompleteEvent(data);
            break;
        default:
            break;
    }
}
// [END] Event function

// [BEGIN] Action function
function setCurrentAction(action) {
    currAction = action;
}

function printAction(action, payload) {
    console.log("<- [Back] Action:",action, ", payload:", payload);
}

function doAction(action, payload) {
    printAction(action, payload);
    setCurrentAction(action);
    actionHandle(action, payload);
}

function actionHandle(action, data) {
    switch(action) {
        case ACTION_LOAD_SHOP_PAGE:
            var url = data.url;
            createNewWindow(url, createdWindowCallback);
            break;
        case ACTION_LOAD_LOGIN_PAGE:
            portCallback(action, {'shop': orderData.shopInfo.mall});
            break;
        case ACTION_REQ_LOGIN:
            var msg = {
                'id':orderData.userData[userIndex].id,
                'pw':orderData.userData[userIndex].password,
                'shop':orderData.shopInfo.mall
            };
            portCallback(action, msg);
            break;
        case ACTION_SET_OPTION_N_REQ_ORDER:
            var msg = {
                'count':orderData.userData[userIndex].ordercount,
                'shop': orderData.shopInfo.mall
            }
            portCallback(action, msg);
            break;
        case ACTION_SET_DELEVERYINFO:
            var msg = {
                'shop': orderData.shopInfo.mall
            }
            portCallback(action, msg);
            break;
        case ACTION_SET_DSTADDR:
            var msg = {
                'addr': 0,
                'shop': orderData.shopInfo.mall
            }
            portCallback(action, msg);
            break;
        case ACTION_SET_COUPON:
            var msg = {
                'coupon': orderData.userData[userIndex].coupon,
                'count': orderData.userData[userIndex].ordercount,
                'shop': orderData.shopInfo.mall
            }
            portCallback(action, msg);
            break;
        case ACTION_REQ_PAY:
            var msg = {
                'biznum' : orderData.userData[userIndex].biznum,
                'shop': orderData.shopInfo.mall
            }
            portCallback(action, msg);
        case ACTION_REQ_LOGOUT:
            var msg = {
                'shop': orderData.shopInfo.mall
            }
            portCallback(action, msg);
        default:
            break;
    }
    currAction = action;
}
// [END] Action function

function createdWindowCallback(window) {
    if (typeof window.id != 'undefined') {
        currWindow.id = window.id;
    } else {
        console.log("[Back] 윈도우 생성 에러 : ", window);
        // TODO:
        // 윈도우 생성 실패 이벤트 호출
        currWindow.url = '';
        currWindow.id = -1;
    }
}

function createNewWindow(url, callback) {
    var cb = callback;
    var createData = {
        'url':url,
        'type': "popup",
        'state': "normal"
    }
    if (typeof cb == 'undefined') {
        console.log("[Back] 콜백함수가 정의되지 않았습니다.");
        return;
    }
    currWindow.url = url;
    chrome.windows.create(createData, cb);
}

function isSameWithUrl(a, b) {
    return (a.indexOf(b) < 0) ? false:true;
}

function handleWindowLoadedEvent(data) {
    var windowUrl = data;

    if (isSameWithUrl(windowUrl, currWindow.url)) {
        console.log('쇼핑몰 맞음');                
        // 이전 액션이 로그인이었는지 체크
        if (currAction == ACTION_REQ_LOGIN) {
            // 로그인 되었음, 주문 선택
            doAction(ACTION_SET_OPTION_N_REQ_ORDER, '');
        } else {
            // LOGIN 요청
            doAction(ACTION_LOAD_LOGIN_PAGE, '');
        }
    } else if (isSameWithUrl(windowUrl, LOGIN_PAGE_KEY)) {
        // LOGIN시도
        if (userIndex < totalUserCount) {
            doAction(ACTION_REQ_LOGIN, '');
        }
    } else if (isSameWithUrl(windowUrl, ORDER_PAGE_kEY)) {
        // 주문서 작성
        doAction(ACTION_SET_DELEVERYINFO, '');
    } else if (isSameWithUrl(windowUrl, ADDR_SELECT_PAGE_KEY)) {
        // 주소 선택
        doAction(ACTION_SET_DSTADDR, '');
    } else if (isSameWithUrl(windowUrl, ORDER_COMPLETE_PAGE_KEY)) {
        console.log("test");
        //doAction(ACTION_GEN_REPORT_DATA,'');
    } else if (isSameWithUrl(windowUrl, HOME_PAGE_KEY)){
        // 이전 액션을 기준으로 로그인을 할지 선택
        if ((userIndex < totalUserCount)&&(currAction==ACTION_REQ_LOGOUT)) {
            doAction(ACTION_LOAD_LOGIN_PAGE, '');
        }
    } else {

    }
}

function handleRecoveryCompletedEvent(data) {
    var action = data.action;

    if (action == ACTION_SET_DELEVERYINFO) {
        // 다음 진행 (쿠폰))
        doAction(ACTION_SET_COUPON, '');
    }
}

function handleCouponSettingCompleteEvent() {
    // 지불 진행
    doAction(ACTION_REQ_PAY, '');
}

function handleOrderCompleteEvent(data) {
    console.log(data);
    // 결과 데이터 저장
    resultData.push(data);
    userIndex += 1;
    console.log("user Index = ", userIndex);
    if (userIndex >= totalUserCount) {
        // 저장
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'My Awesome CSV',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        }
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(resultData);
        console.log("[Back] 레포트 데이터 : ", resultData);
    }

    // 로그아웃
    doAction(ACTION_REQ_LOGOUT, '');
}


function delay (ms, msg) {
    var start = Date.now();
    var now = start;
    while (now - start < ms) {
      now = Date.now();
    }
    console.log(ms + "ms 지연. [" + msg + "]");
  }