//import { searchCompanyByNameAndDomain } from '../../../popup/js/utils/launch';
// TODO
// 1. 액션 추가 임폴트
// 2. 
import _ from 'lodash';
import store from './store';
import { createAlarm, getAlarm, deleteAlarm } from './alarm';

import { 
    clearGoodsUrl,
    clearGoodsCountMin,
    clearGoodsCountMax,
    clearGoodsCountAll,
    clearOrderDelay,
    clearAlarmDate,
    clearAlarmTime,
    clearFileProps
} from './actions.js';

const resetAllData = () => dispatch => {
    console.log('redux test');

    dispatch(clearGoodsUrl());
    dispatch(clearGoodsCountMin());
    dispatch(clearGoodsCountMax());
    dispatch(clearGoodsCountAll());
    dispatch(clearOrderDelay());
    dispatch(clearAlarmDate());
    dispatch(clearAlarmTime());
    dispatch(clearFileProps());
};

const registerOrderData = () => dispatch => {
    var state = store.getState();
    console.log('state ', state);
    // TODO
    // 1. 주문 데이터 생성
    // 2. 알람설정

    // clear Alarm
    // deleteAlarm().then(result=>{console.log(result)});
    // get Alarm
    // getAlarm().then(result => {console.log("Alarm : ", result);});

    createAlarm(state).then(result => {
        console.log(result)
        if (result) {
            alert("알람이 설정 되었습니다.")
        } else {
            alert("알람이 시간을 다시 확인해주세요.")
        }
    });
    // Alarm 시간이 되면, Background에서 listen함
    // this.createAlarm();

    // random
    // _.random(5, 15) * 1000;
    // delay
    // _.delay(() => { /* do somethin */ }, timeout);
}

export default {
    CLEARALLDATA: resetAllData,
    REGISTERORDER: registerOrderData,
};
/*
import {
    START_PARSE_SEARCH_COMPANY,
    FETCH_PARSE_COMPANY,
    CLEAR_SEARCH_COMPANIES_DATA,
    HANDLE_PARSE_COMPANY,
    CLEAR_STATE_DATA
} from '../../../actionTypes';

const fetchCompanyData = () => ({
    type: FETCH_PARSE_COMPANY
});

const clearStateData = () => ({
    type: CLEAR_STATE_DATA
});

const hendleCompanyData = data => ({
    type: HANDLE_PARSE_COMPANY,
    data
});

const getSourceCode = actionOwner => dispatch => {
    const { value, industries } = actionOwner;
    dispatch(clearStateData());
    dispatch(fetchCompanyData());
    
    searchCompanyByNameAndDomain(value, industries)
        .then(result => {
            
            dispatch(hendleCompanyData(result));
        })
    
};

export default {
    START_PARSE_SEARCH_COMPANY: getSourceCode,
    CLEAR_SEARCH_COMPANIES_DATA: clearStateData
};

*/