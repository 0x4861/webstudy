console.log('Inside content script...')

import $ from 'jquery';
import _ from 'lodash';
import elementReady from 'element-ready';
import {Store} from 'react-chrome-redux'

const HYUNDAI = "hyundaihmall";
const LOTTE = "lottemall";
const backStore = new Store({ portName: 'ORDER_TOOL'});
const BACKPORTNAME = "BACKGROUND-CONTENT";
const ORDER_COMPLETE_PAGE_KEY = 'orderComplete.do';

let backPort;
let currAction;

var s = document.createElement('script');
s.src = chrome.extension.getURL('pages/pagescript.js');
(document.head || document.documentElement).appendChild(s);
// s.parentNode.removeChild(s);

// 백그라운드와 메시지 교환용 패스 셋업
const connect4msg = () => {
  return chrome.runtime.connect({ name: BACKPORTNAME });
}

const isPortConnected = () => {
  return (typeof backPort != 'undefined') ? true:false;
}

const sendMsgToBackground = (msg) => {
  if (isPortConnected()) {
    try {
      backPort.postMessage(msg);
    } catch (err) {
      console.log("[Content] 백으로 메시지 전송 실패. ", err);
    } 
  }
}

const delay = (ms, msg) => {
  var start = Date.now();
  var now = start;
  while (now - start < ms) {
    now = Date.now();
  }
  console.log(ms + "ms 지연. [" + msg + "]");
}

const hyundaiActionHandler = (action, payload) => {
  var shop = payload.shop;
  currAction = action;
  console.log("action:", action, ", payload:", payload);
  delay(1000, "");
  switch(action) {
    case 'ACTION_LOAD_LOGIN_PAGE':
      elementReady('.fr').then(()=>{
        try {
          $('.fr')[0].firstElementChild.click();
        } catch (e) {
          console.log(e);
        }
      });
      break;
    case 'ACTION_REQ_LOGIN':
      console.log("test");
      $("input[name='id']")[0].value
      $("input[name='pwd']")[0].value
      delay(1000, '');
      $(".mm-bottombtn")[0].click((msg)=>{console.log(msg);});
      break;
    case 'ACTION_SET_OPTION_N_REQ_ORDER':
      var count = payload.count;
      $('.defaultVal')[1].click();
      delay(1000, "딜레이");
      $('.item')[0].click();
      for (var i=1; i < count; i++) { //이때는 이미 1개가 카운트되어있음
        $('.amount_plus')[1].click();
      }
      delay(1000, "딜레이");
      $('.btnBuyNow')[0].click();
      break;
    case 'ACTION_SET_DELEVERYINFO':
      $('html, body').animate({ scrollTop: $(document).height()/4 }, 'fast');
      delay(2000, "");
      $('#to')[0].value = $('input[name=senderName]')[0].value;
      $('#uPhon22')[0].value = $('#senderMobile1')[0].value;
      $('input[name=dstnHpIntmNo]')[0].value = $('#senderMobile2')[0].value;
      $('input[name=dstnHpBckNo]')[0].value = $('#senderMobile3')[0].value;
      $('.thIn > #dTypeNormalForTr > td > .button:nth-child(4) > span')[0].click();
      break;
    case 'ACTION_SET_DSTADDR':
      var address = payload.addr; // 1번, 2번 .. 이런식으로 할지, 주소입력일지 협의 필요
      $('.btn_type_j01 > a')[0].click();
      break;
    case 'ACTION_SET_COUPON':
      $('.thIn > tr > td > .status > span')[0].click();
      var count = payload.count;
      console.log("count : ", count);
      elementReady('.cuponlistBox').then(() => {
        setTimeout(()=> {
          console.log("쿠폰 선택 구간");
          for (var i=0; i<count; i++) {
            $('.cuponlistBox > p')[i].click();
            $('.cuponSelec2 > table > tbody > tr:nth-child(2)')[i].firstElementChild.lastElementChild.click();
          }
          console.log("쿠폰 선택 끝");
        }, 1000);
      });
      elementReady('.pt20').then(()=>{
        setTimeout(()=>{
          console.log("쿠폰 적용하기 구간");
          $('.pt20 > a')[0].click();
        },1500);
      });
      setTimeout(()=>{
        sendMsgToBackground({
          event: "EVENT_COMPLETE_COUPON_SETTING",
          payload: ''
        });
      },5000);
      break;
    case 'ACTION_REQ_PAY':
      console.log("지불 관련 입력");
      console.log(".. ", payload);
      const biznum = payload.biznum;
      elementReady('#payType2').then(()=>{
        $('#payType2')[0].checked=true;
        $('#payType2')[0].click();
        console.log("1");
        elementReady('.paymentForm').then(()=>{
          console.log("2");
          setTimeout(()=>{
            //$('select[name=wibkBankCd] option[value=026]').attr('selected','selected');
            $('select[name=wibkBankCd] option[value=026]')[0].selected="true";
            console.log("3");
            $('#receiptY')[0].click();
            console.log("4");
            elementReady('.box1').then(()=>{
              console.log("5");
              $('#receiptPurpose2')[0].click();
              console.log("6");
              elementReady('.uesrNumBox').then(()=>{
                console.log("7");
                console.log("biznum", biznum);
                $('input[name=rgno1]')[0].value = biznum.slice(0,3);
                $('input[name=rgno2]')[0].value = biznum.slice(4,6);
                $('input[name=rgno3]')[0].value = biznum.slice(7,);
                console.log("8");
                elementReady('.agreeChk').then(()=>{
                  console.log("9");
                  $('#agreeChk').click();
                  $('.sbBtns')[0].firstElementChild.click();
                });
              });
            });
          },2000);
        });
      });
      break;
    case 'ACTION_REQ_LOGOUT':
      $('.fr')[0].firstElementChild.click();
      break;

/*
    case 'ACTION_CHECK_LOGINED':
      console.log("로그인/아웃 체크");
      var loginState = document.querySelector('.fr').firstElementChild.innerHTML;
      console.log(loginState, " value : ", loginState.value)
      if (loginState.indexOf("로그인")==0) {
        sendMsgToBackground({
          event: "EVENT_CHECK_ALREAD_LOGINED_RESULT",
          payload: false // 로그인 안되어있음.(로그인 하면됨)
        });
      } else {
        sendMsgToBackground({
          event: "EVENT_CHECK_ALREAD_LOGINED_RESULT",
          payload: true // 이미 로그인 되어있음.(로그아웃 필요)
        });
      }
      break;
    case 'REQUEST_LOAD_LOGIN':
      if (shop == "hyundaihmall") {
        var loginState = document.querySelector('.fr').firstElementChild.innerHTML;
        console.log(loginState, " value : ", loginState.value)
        if (loginState.indexOf("로그인")==0) {
          document.querySelector('.fr').firstElementChild.click();
        } else { // 이미 로그인 되어 있는 경우
          sendMsgToBackground({
            action: "ALREADY_LOGIN",
            payload: backStore.getState().url.data // 윈도우나 탭에서 url을 가져와서 추가해야 할것.
          });
          // 로그아웃 하고 다시 진행
          document.querySelector('.fr').firstElementChild.click();
        }
      } else if (shop == "lottemall") {

      } else {
        sendMsgToBackground({action:"ERROR", payload:"unknown mall"});
      }
      break;
    case 'REQUEST_LOGIN':
      if (shop == "hyundaihmall") {
        $("input[name='id']")[0].value
        $("input[name='pwd']")[0].value
        $(".mm-bottombtn")[0].click((msg)=>{
          console.log(msg);
        });
      } else if (shop == "lottemall") {

      } else {
        sendMsgToBackground({action:"ERROR", payload:"unknown mall"});
      }
      break;
    case 'SETORDER':
      if (shop == "hyundaihmall") {
        var count = payload.count;
        $('.defaultVal')[1].click();
        delay(1000, "딜레이");
        $('.item')[0].click();
        for (var i=1; i < count; i++) { //이때는 이미 1개가 카운트되어있음
          $('.amount_plus')[1].click();
        }
        delay(1000, "딜레이");
        $('.btnBuyNow')[0].click();
      } else if (shop == "lottemall") {

      } else {
        sendMsgToBackground({action:"ERROR", payload:"unknown mall"});
      }
      break;
    case 'SETDELEVERYINFO':
      if (shop == "hyundaihmall") {
        // var address = msg.payload.address;
        // var biznum = msg.payload.biznum;
        // var coupon = msg.payload.coupon;
        var snd_name = $('input[name=senderName]')[0].value;
        var rcv_name = $('#to')[0].value;
        var mobilnum1 = $('#senderMobile1')[0].value;
        var mobilnum2 = $('#senderMobile2')[0].value;
        var mobilnum3 = $('#senderMobile3')[0].value;
        var rcv_hpnum1 = $('#uPhon22')[0].value;
        var rcv_hpnum2 = $('input[name=dstnHpIntmNo]')[0].value;
        var rcv_hpnum3 = $('input[name=dstnHpBckNo]')[0].value;
        var dstAddr = $('.thIn > #dTypeNormalForTr > td > .button:nth-child(4) > span')[0]; //주소선택창
        $('html, body').animate({ scrollTop: $(document).height()/4 }, 'fast');
        setTimeout(() => {
          rcv_name = snd_name;
          //delay(500, "이름 입력");
          rcv_hpnum1 = mobilnum1;
          //delay(500, "폰번호1 입력");
          rcv_hpnum2 = mobilnum2;
          //delay(500, "폰번호2 입력");
          rcv_hpnum3 = mobilnum3;
          //delay(500, "폰번호3 입력");
          dstAddr.click();
        }, 2000);
      } else if (shop == "lottemall") {

      } else {
        sendMsgToBackground({action:"ERROR", payload:"unknown mall"});
      }
      break;
    case 'SETADDRESS': //.thIn > #dTypeNormalForTr > td > .button:nth-child(4) > span
      if (shop == "hyundaihmall") {
        var address = payload.addr; // 1번, 2번 .. 이런식으로 할지, 주소입력일지 협의 필요
        var addr = $('.btn_type_j01 > a')[0]; // 주소선택
        setTimeout(() => {
          sendMsgToBackground({action:"COMPLETED_SETADDRESS"});
          addr.click();
       }, 1000);
      } else if (shop == "lottemall") {

      } else {
        sendMsgToBackground({action:"ERROR", payload:"unknown mall"});
      }
      break;
    case 'SETCOUPON':
      console.log("??????????/");
      if (shop == "hyundaihmall") {
        $('html, body').animate({ scrollTop: $(document).height()/2 }, 'fast');
        delay(1000, "애니메이션 수행");
        var coupon = payload.coupon;
        var count = payload.count; // count만큼 쿠폰 적용할 수도 있음
        var coupon_select_btn = $('.thIn > tr > td > .status > span')[0]; // 주소선택
        coupon_select_btn.click();
        delay(1000, "쿠폰 선택 창 로드");
        for (var i=0; i<count; i++) {
          $('.cuponlistBox > p')[i].click();
          //delay(1000, "쿠폰 선택 대기");
          var tmp_node = $('.cuponSelec2 > table > tbody > tr:nth-child(2)');
          tmp_node[i].firstElementChild.lastElementChild.click();
          //delay(1000, "쿠폰 선택 대기");
        }
        $('div .floatClear.center.pt20 > a').click();
        delay(1000, "쿠폰 선택 완료");
        sendMsgToBackground({action:"COMPLETED_SETCOUPON"});
      } else if (shop == "lottemall") {

      } else {
        sendMsgToBackground({action:"ERROR", payload:"unknown mall"});
      }
      break;
*/
    default:
        console.log('[컨텐트] 알수없는 메시지를 수신하였습니다.');
  }
}

// 백그라운드와 포트를 통한 메시지 통신
const backPortMessageListener = (msg) => {
  var action = msg.action;
  var shop;
  console.log("-> [Content] action=",action);

  if (typeof msg.payload != 'undefined') {
    shop = msg.payload.shop;
    console.log("-> [Content] shop:", shop);
    // shop에 따른 함수 호출
    if (shop == HYUNDAI) {
      hyundaiActionHandler(action, msg.payload);
    } else if (shop == LOTTE) {
      lotteActionHandler(action, msg.payload);
    } else {
      console.log("[Content] 지원하지 않는 샵입니다. ", shop);
    }
  }
}

const backPortDisconnectListener = (msg) => {
  console.log("[Content] 백그라운드 연결이 끊어졌습니다. : ", msg);
}

const myAlert = (msg) => {
  console.log('Hidden Alert ' + msg);
}

const windowLoadListener = (window, event) => {
  window.alert = myAlert; // alert를 콘솔로그로 변경

  // TODO:
  // 윈도우가 로드되고 나서 모든 것이 진행되도록 하기 위해, 포트도 여기서 생성시도 하면 될듯.
  // 1. 백그라운드 메시지 포트 연결
  backPort = connect4msg();
  try {
    backPort.onMessage.addListener(backPortMessageListener);
    backPort.onDisconnect.addListener(backPortDisconnectListener);
  } catch (e) {
    console.log("[Content] 리스너 등록에 문제가 발생했습니다. 이유: ", e);
  }

  sendMsgToBackground({
    event: "EVENT_WINDOW_LOADED",
    payload: window.target.URL
  });

  // 주문 완료의 경우
  var url = window.target.URL;
  if (url.indexOf(ORDER_COMPLETE_PAGE_KEY) >= 0) {
    console.log("결과 데이터 전송 준비");
    elementReady('.section_area').then(()=>{
      const rcv_name = $('.order_scroll > table > tbody > tr:nth-child(2) > td')[0].innerText;
      const rcv_addr = $('.order_scroll > table > tbody > tr:nth-child(2) > td')[1].innerText;
      const money = $('.perInfo4 > tbody > tr:nth-child(1)')[0].lastElementChild.innerText;
      const account = $('.perInfo4 > tbody > tr:nth-child(2) > td')[0].innerText;
      const result = {
        'rcv_nam':rcv_name,
        'rcv_addr':rcv_addr,
        'money' : money,
        'account': account
      }
      sendMsgToBackground({
        event: "EVENT_COMPLET_ORDER",
        payload: result
      });
    });
  }
}

const windowMessageListener = (event) => {
  //console.log("window event : ", event);
  //contentPort.postMessage({msg:"ok"});
}

const localStorageChangedListener = (changes, namespace) => {
  for (var key in changes) {
    var storageChange = changes[key];
    if ((namespace=="local")&&(key=="msg")&&(storageChange.newValue=="RECOVERYPORT")) {
      // 포트복구진행
      backPort = connect4msg();
      backPort.onMessage.addListener(backPortMessageListener);
      backPort.onDisconnect.addListener(backPortDisconnectListener);
      delay(1000, "[Content] 포트 복구 완료. 다시 호출");
      // TODO:
      // 1. 포트 복구가 완료되었다고 보내고, 백그라운드에서 상황에 따라 정리하는게 좋을듯.
      sendMsgToBackground({event:"EVENT_RECOVERY_COMPLETED", payload: {action:currAction}});
      console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
    }
  }
}

window.addEventListener('load', windowLoadListener);
window.addEventListener('message', windowMessageListener, false);
chrome.storage.onChanged.addListener(localStorageChangedListener);
