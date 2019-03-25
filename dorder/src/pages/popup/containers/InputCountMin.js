import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setGoodsCountMin } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-goods.css';

import Perf from 'react-addons-perf';
window.Perf = Perf;

class InputCountMin extends PureComponent {
    constructor(props) {
        super(props)

        this.onChanageMin = this.onChanageMin.bind(this);
    }

    onChanageMin(e) {
        this.props.setMin(e.target.value)
    }
    render() {
        console.log('min ', this.props)
        return (
            <FormGroup className='form-count-min'>
                <Col md={ 2 }>최소주문량</Col>
                <Col md={ 10 }>
                    <FormControl 
                        type="number"
                        className="count-min"
                        placeholder="주문 최소 수량을 입력하세요."
                        value={this.props.min.data}
                        onChange={this.onChanageMin}
                        required/>
                </Col>
            </FormGroup>
        )
    }
}

const mapStateToProps = (state) => ({
    min: state.min
});

const mapDispatchToProps = (dispatch) => ({
    setMin: data => dispatch(setGoodsCountMin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputCountMin);
