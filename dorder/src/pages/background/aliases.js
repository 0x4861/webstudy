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
    // 알람설정
    createAlarm(state).then(result => {
        console.log(result)
        if (result) {
            alert("알람이 설정 되었습니다.")
        } else {
            alert("알람이 시간을 다시 확인해주세요.")
        }
    });
    // Alarm 시간이 되면, Background에서 listen함
}

export default {
    CLEARALLDATA: resetAllData,
    REGISTERORDER: registerOrderData,
};
