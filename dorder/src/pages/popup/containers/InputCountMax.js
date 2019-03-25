import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setGoodsCountMax } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-goods.css';

import Perf from 'react-addons-perf';
window.Perf = Perf;

class InputCountMax extends PureComponent {
    constructor(props) {
        super(props)

        this.onChanageMax = this.onChanageMax.bind(this);
    }

    onChanageMax(e) {
        this.props.setMax(e.target.value)
    }

    render() {
        console.log('max ', this.props)
        return (
            <FormGroup className='form-count-max'>
                <Col md={ 2 }>최대주문량</Col>
                <Col md={ 10 }>
                    <FormControl 
                        type="number"
                        className="count-max"
                        placeholder="주문 최대 수량을 입력하세요."
                        value={this.props.max.data}
                        onChange={this.onChanageMax}
                        required/>
                </Col>
            </FormGroup>
        )
    }
}

const mapStateToProps = (state) => ({
    max: state.max
});

const mapDispatchToProps = (dispatch) => ({
    setMax: data => dispatch(setGoodsCountMax(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputCountMax);
