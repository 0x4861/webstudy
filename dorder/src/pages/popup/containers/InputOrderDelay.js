import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setOrderDelay } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-goods.css';

import Perf from 'react-addons-perf';
window.Perf = Perf;

class InputOrderDelay extends PureComponent {
    constructor(props) {
        super(props)

        this.onChanageDelay = this.onChanageDelay.bind(this);
    }

    onChanageDelay(e) {
        this.props.setDelay(e.target.value)
    }
    render() {
        console.log('delay ', this.props)
        return (
            <FormGroup className='form-time-delay'>
                <Col md={ 2 }>주문 간격</Col>
                <Col md={ 10 }>
                    <FormControl 
                        type="number"
                        placeholder="주문과 주문 사이의 시간을 입력하세요. 비어두시면 기본값으로 처리됩니다."
                        value={this.props.time.delay}
                        onChange={this.onChanageDelay}/>
                </Col>
            </FormGroup>
        )
    }
}

const mapStateToProps = (state) => ({
    time: state.time
});

const mapDispatchToProps = (dispatch) => ({
    setDelay: data => dispatch(setOrderDelay(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputOrderDelay);
