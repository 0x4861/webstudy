import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAlarmDate, setAlarmTime } from '../../background/actions';
import { FormGroup, Col } from 'react-bootstrap';
import '../styles/input-time.css';

import Perf from 'react-addons-perf';
window.Perf = Perf;

class InputAlarm extends Component {
    constructor(props) {
        super(props)

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
    }

    onChangeDate(e) {
        this.props.setDate(e.target.value)
    }

    onChangeTime(e) {
        this.props.setTime(e.target.value)
    }

    render () {
        console.log('alarm', this.props)
        return (
            <div className='form-time'>
                <FormGroup className='form-time-alarm'>
                    <Col className='time-alarm-label'>알람 주문</Col>
                    <Col className='time-alarm-group'>
                        <div class="row">
                            <div class="input-field date">
                                <label for="alarm-date"></label>
                                <input type="date"
                                    name="alarm-date" 
                                    class="datepicker"
                                    value={this.props.alarm.date}
                                    onChange={this.onChangeDate}
                                    required/>
                            </div>
                            <div class="input-field time">
                                <input type="time" 
                                    name="alarm-time" 
                                    class="timepicker" 
                                    value={this.props.alarm.time}
                                    onChange={this.onChangeTime}
                                    required/>
                            </div>
                        </div>
                    </Col>
                </FormGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    alarm: state.alarm
});

const mapDispatchToProps = (dispatch) => ({
    setDate: data => dispatch(setAlarmDate(data)),
    setTime: data => dispatch(setAlarmTime(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputAlarm);
