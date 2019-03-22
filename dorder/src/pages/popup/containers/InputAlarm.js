import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setOrderDelay, setAlarmDate, setAlarmTime } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-time.css';

class InputAlarm extends Component {

    render () {
        console.log('order time', this.props)
        return (
            <div className='form-time'>
                <FormGroup className='form-time-delay'>
                    <Col md={ 2 }>주문 간격</Col>
                    <Col md={ 10 }>
                        <FormControl 
                            type="number"
                            placeholder="주문과 주문 사이의 시간을 입력하세요."
                            value={this.props.time.delay}
                            onChange={(e)=>this.props.setDelay(e.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup className='form-time-alarm'>
                    <Col md={ 2 }>알람 주문</Col>
                    <Col md={ 10 } className='time-alarm-group'>
                        <div class="input-field date">
                            <label for="alarm-date"></label>
                            <input type="date" 
                                name="alarm-date" 
                                class="datepicker"
                                value={this.props.time.date}
                                onChange={(e)=>this.props.setDate(e.target.value)}
                                required />
                        </div>
                        <div class="input-field time">
                            <input type="time" 
                                name="alarm-time" 
                                class="timepicker"
                                value={this.props.time.time}
                                onChange={(e)=>this.props.setTime(e.target.value)}
                                required />
                        </div>
                    </Col>
                </FormGroup>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    time: state.time
});

const mapDispatchToProps = (dispatch) => ({
    setDelay: data => dispatch(setOrderDelay(data)),
    setDate: data => dispatch(setAlarmDate(data)),
    setTime: data => dispatch(setAlarmTime(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputAlarm);
