//import { searchCompanyByNameAndDomain } from '../../../popup/js/utils/launch';
// TODO
// 1. 액션 추가 임폴트
// 2. 
import store from './store';

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
    console.log('ready to order');
    let state = store.getState();
    console.log('state ', state);
    // TODO
    // 1. 주문 데이터 생성
    // 2. 알람설정
    // Alarm 시간이 되면, Background에서 listen함
    // this.createAlarm();
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