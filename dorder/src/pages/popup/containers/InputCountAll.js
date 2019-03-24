import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setGoodsCountAll } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-goods.css';

import Perf from 'react-addons-perf';
window.Perf = Perf;

class InputCountAll extends PureComponent {
    constructor(props) {
        super(props)

        this.onChangeAll = this.onChangeAll.bind(this);
    }

    onChangeAll(e) {
        this.props.setTotalCount(e.target.value)
    }

    render() {
        console.log('all ', this.props)
        return (
            <FormGroup className='form-count-all'>
                <Col md={ 2 }>전체주문량</Col>
                <Col md={ 10 }>
                    <FormControl 
                        type="number"
                        placeholder="전체 주문 수량을 입력하세요."
                        value={this.props.all.data}
                        onChange={this.onChangeAll}
                        required/>
                </Col>
            </FormGroup>
        )
    }
}

const mapStateToProps = (state) => ({
    all: state.all
});

const mapDispatchToProps = (dispatch) => ({
    setTotalCount: data => dispatch(setGoodsCountAll(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputCountAll);
