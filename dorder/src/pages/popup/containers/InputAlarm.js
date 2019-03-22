import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setOrderDelay } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-goods.css';

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
                            onChange={(e)=>this.props.delay(e.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup className='form-time-alarm'>
                    <Col md={ 2 }>알람 주문</Col>
                    <Col md={ 10 }>
                        <FormControl 
                            type="text"
                            placeholder="알람시간을 설정하세요."
                            value={this.props.time.order_delay}
                            onChange={(e)=>this.props.delay(e.target.value)}/>
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
    delay: data => dispatch(setOrderDelay(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputAlarm);
