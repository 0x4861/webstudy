import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Button, Col } from "react-bootstrap";
import { 
    clearAllData,
    registerOrder
} from '../../background/actions';
import '../styles/button-group.css';

import $ from 'jquery';

import Perf from 'react-addons-perf';
window.Perf = Perf;

class ButtonGroup extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onClearAll = this.onClearAll.bind(this);
        this.onRestart = this.onRestart.bind(this);

        this.IsValidUrl = this.IsValidUrl.bind(this);
        this.IsValidCount = this.IsValidCount.bind(this);
        this.IsValidAlarm = this.IsValidAlarm.bind(this);
        this.IsValidUserInfo = this.IsValidUserInfo.bind(this);
        // tmp
        this.onTestButton = this.onTestButton.bind(this);
        //this.createAlarm = this.createAlarm.bind(this);
    }

    onRestart() {
        chrome.runtime.reload();
    }

    onTestButton(event) {
        event.preventDefault();
    }

    onClearAll(event) {
        event.preventDefault();
        console.log('onClearAll');
        this.props.resetData();
    }

    onSubmit(event) {
        event.preventDefault();
        let err_cnt = 0;

        if (!this.IsValidUrl()) {
            alert("주문상품 URL 정보를 다시 확인해주세요.");
            err_cnt += 1;
        }
        if (!this.IsValidCount()) {
            alert("주문수량을 다시 확인해주세요.");
            err_cnt += 1;
        }
        if (!this.IsValidAlarm()) {
            alert("알람시간을 다시 확인해주세요.");
            err_cnt += 1;
        }

        if (!this.IsValidUserInfo()) {
            alert("csv파일을 등록해주세요.");
            err_cnt += 1;
        }

        if (err_cnt == 0) {
            this.props.regOrder().then( (result) => {console.log(result)});
        }

        // TODO
        // 1. 주문 데이터 생성
        // 2. 알람설정
        // Alarm 시간이 되면, Background에서 listen함
        // this.createAlarm();
    }

    IsValidUrl() {
        var _url = "";
        _url = $('.input-url').val();
        if (_url==="") {
            return false;
        }
        return true;
    }

    IsValidCount() {
        var _count = {};
        _count.min = parseInt($('.count-min').val());
        _count.max = parseInt($('.count-max').val());
        _count.all = parseInt($('.count-all').val());
        if ((_count.min<0)||(_count.min>_count.max)||(_count.min>_count.all)||(_count.max>_count.all)) {
            return false;
        }
        return true;
    }

    IsValidAlarm() {
        var alarm = {};
        alarm.name = 'order-alarm';
        alarm.date = $('input[name=alarm-date]').val();
        alarm.time = $('input[name=alarm-time]').val();

        var now = new Date().getTime();
        var alarmDate = new Date(alarm.date + ' ' + alarm.time + ':00').getTime();

        if (alarmDate > now) { // create alarm
            return true;
        } else {
            return false;
        }
    }

    IsValidUserInfo() {
        var file = $('.csv-input').val();
        var iValue = file.lastIndexOf(".csv");

        if (iValue < 0) {
            return false;
        }
        return true;
    }

    render () {
        console.log('button', this.props)
        return (
            <FormGroup className='form-button'>
                <Col md={3} mdOffset={3} >
                    <Button
                        className='form-button-order-start'
                        type="submit"
                        bsStyle="success"
                        size="sm"
                        onClick={this.onSubmit}>
                        주문시작
                    </Button>
                </Col>
                <Col md={3} mdOffset={3} >
                    <Button
                        className='form-button-clear'
                        type="button"
                        bsStyle="info"
                        size="sm"
                        onClick={this.onClearAll}>
                        설정초기화
                    </Button>
                </Col>
                <Col md={3} mdOffset={3} >
                    <Button className="restart" type="submit" bsStyle="danger" onClick={this.onRestart}>
                        앱재시작
                    </Button>
                </Col>
            </FormGroup>               
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    resetData: () => dispatch(clearAllData()),
    regOrder: () => dispatch(registerOrder()),
});

export default connect(null, mapDispatchToProps)(ButtonGroup);
