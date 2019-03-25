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
        this.createAlarm = this.createAlarm.bind(this);
    }

    onRestart() {
        chrome.runtime.reload();
    }

    onTestButton(event) {
        event.preventDefault();
        if (!this.IsValidUserInfo()) {
            alert("Error");
        }
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

    createAlarm() {
        var self = this;
        var alarm = {};
        alarm.name = 'order-alarm';
        alarm.date = $('input[name=alarm-date]').val();
        alarm.time = $('input[name=alarm-time]').val();

        console.log("name ", alarm.name, "date ", alarm.date, "time ", alarm.time);

        // validate alarm date
        var now = new Date().getTime();
        var alarmDate = new Date(alarm.date + ' ' + alarm.time + ':00').getTime();

        if (alarmDate > now) { // create alarm
            chrome.alarms.create(alarm.name, {when: alarmDate});

            var alarms_arr = [];
            chrome.storage.local.get('alarms', function (data) {
                console.log(data);
                if (typeof data.alarms !== 'undefined') {
                    data.alarms.push(alarm);
                    alarms_arr = data.alarms;
                } else {
                    alarms_arr.push(alarm);
                }
                chrome.storage.local.set({'alarms': alarms_arr}, function () {
                    //self.getAlarms();
                    //console.log(data);
                });
            });
        } else {
            alert("알람시간을 다시 확인해주세요.");
        }
    }

    deleteAlarm(alarmName, callback) {
        var self = this;
        chrome.alarms.clear(alarmName, function () {            
            chrome.storage.local.get('alarms', function (data) {

                var alarms = data.alarms;
                for (var i = 0; i < data.alarms.length; i++) {
                    if (alarmName == data.alarms[i]['name']) {
                        alarms.splice(i, 1);
                        chrome.storage.local.set({'alarms': alarms}, function () {
                            callback();
                        });   
                    }
                }
            });
        });
    }

    getAlarms() {
        var self = this;
        chrome.storage.local.get('alarms', function (data) {

            if (typeof data.alarms !== 'undefined' && data.alarms.length > 0) {
                data.alarms.reverse();
                console.log("storage.local.get:", data.alarms);
                // set alarms status
                chrome.alarms.getAll(function(alarms) {
                    console.log("alarms.getAll", alarms);
                    for (var i = 0; i < data.alarms.length; i++) {
                        data.alarms[i]['status'] = 'off';
                        for (var j = 0; j < alarms.length; j++) {
                            if (alarms[j]['name'] == data.alarms[i]['name']) {
                                data.alarms[i]['status'] = 'on';
                            }
                        }
                    }

                    // set content
                    var alarmsHTML = '';
                    for (var i = 0; i < data.alarms.length; i++) {

                        var name = data.alarms[i]['name'];
                        var nameFull = data.alarms[i]['name'];
                        var date = data.alarms[i]['date'];
                        var time = data.alarms[i]['time'];
                        var status = data.alarms[i]['status'];
                        var image = data.alarms[i]['image'];
                        var videoTitle = data.alarms[i]['videoTitle'];

                        console.log(new Date(date + ':00'));

                        if (name.length > 19) {
                            name = name.substring(0, 19) + '..';
                        }

                        if (videoTitle.length > 30) {
                            videoTitle = videoTitle.substring(0, 30) + '..';
                        }

                        alarmsHTML += '<li class="row '+ name +'">' +
                        '<div class="image">\n' +
                            '<img src="'+ image +'">\n' +
                        '</div>\n' +
                        '<div class="info">\n' +
                            '<p class="alarm-name" title="'+ nameFull +'">'+ name +'</p>\n' +
                            '<p class="video-title">'+ videoTitle +'</p>\n' +
                            '<p class="alarm-date">'+ date +'</p>\n' +
                            '<p class="status '+ status +'"></p>\n' + 
                        '</div>\n' +
                        '<div class="time">\n' +
                            '<p>'+ time +'</p>'
                        '</div>\n' +
                        '</li>\n';
                    }

                    $('.alarms-list').html(alarmsHTML);
                    $('.no-alarm').hide();

                    // bind click event to alarms
                    $('.alarms-list li.row').click(function () {
                        var alarmName = $(this).attr('class').replace('row ', '');
                        self.updateAlarm(alarmName);
                    });

                    self.goBack();
                    $('.loader').hide();
                });

            } else {
                $('.no-alarm').show();
                $('.loader').hide();
            }
        });
    }

    pad(value) {
        return value.toString().length > 1 ? value : '0' + value;
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
                    <Button
                        className='form-button-test'
                        type="button"
                        bsStyle="info"
                        size="sm"
                        onClick={this.onTestButton}>
                        테스트
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
