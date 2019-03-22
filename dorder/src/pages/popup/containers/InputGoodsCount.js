import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGoodsCountMin, setGoodsCountMax, setGoodsCountAll } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-goods.css';

class InputGoodsCount extends Component {

    render () {
        console.log('goods count', this.props)
        return (
            <FormGroup className='goods-count-group'>
                <Col md={ 2 }>주문 최소 수량</Col>
                <Col md={ 10 }>
                    <FormControl 
                        type="number"
                        placeholder="주문 최소 수량을 입력하세요."
                        value={this.props.order.goods_count_min}
                        onChange={(e)=>this.props.min(e.target.value)}/>
                </Col>
                <Col md={ 2 }>주문 최대 수량</Col>
                <Col md={ 10 }>
                    <FormControl 
                        type="number"
                        placeholder="주문 최대 수량을 입력하세요."
                        value={this.props.order.goods_count_max}
                        onChange={(e)=>this.props.max(e.target.value)}/>
                </Col>
                <Col md={ 2 }>주문 전체 수량</Col>
                <Col md={ 10 }>
                    <FormControl 
                        type="number"
                        placeholder="전체 주문 수량을 입력하세요."
                        value={this.props.order.goods_count_all}
                        onChange={(e)=>this.props.all(e.target.value)}/>
                </Col>
            </FormGroup>
        )
    }
}

const mapStateToProps = (state) => ({
    order: state.order
});

const mapDispatchToProps = (dispatch) => ({
    min: data => dispatch(setGoodsCountMin(data)),
    max: data => dispatch(setGoodsCountMax(data)),
    all: data => dispatch(setGoodsCountAll(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputGoodsCount);
