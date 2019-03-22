import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGoodsUrlOrder,
    setGoodsCountMin,
    setGoodsCountMax,
    setGoodsCountAll } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-goods.css';

class InputGoodsOrder extends Component {

    render () {
        console.log('order goods', this.props)
        return (
            <div className='form-order'>
                <FormGroup className='form-goods-url'>
                    <Col md={ 2 }>주문상품URL</Col>
                    <Col md={ 10 }>
                        <FormControl 
                            type="text"
                            placeholder="주문상품 URL을 입력하세요."
                            value={this.props.order.goods_url}
                            onChange={(e)=>this.props.add(e.target.value)}
                            required/>
                    </Col>
                </FormGroup>
                <FormGroup className='form-goods-count'>
                    <Col md={ 2 }>최소주문량</Col>
                    <Col md={ 10 }>
                        <FormControl 
                            type="number"
                            placeholder="주문 최소 수량을 입력하세요."
                            value={this.props.order.goods_count_min}
                            onChange={(e)=>this.props.min(e.target.value)}
                            required/>
                    </Col>
                    <Col md={ 2 }>최대주문량</Col>
                    <Col md={ 10 }>
                        <FormControl 
                            type="number"
                            placeholder="주문 최대 수량을 입력하세요."
                            value={this.props.order.goods_count_max}
                            onChange={(e)=>this.props.max(e.target.value)}
                            required/>
                    </Col>
                    <Col md={ 2 }>전체주문량</Col>
                    <Col md={ 10 }>
                        <FormControl 
                            type="number"
                            placeholder="전체 주문 수량을 입력하세요."
                            value={this.props.order.goods_count_all}
                            onChange={(e)=>this.props.all(e.target.value)}
                            required/>
                    </Col>
                </FormGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    order: state.order
});

const mapDispatchToProps = (dispatch) => ({
    add: url => dispatch(setGoodsUrlOrder(url)),
    min: data => dispatch(setGoodsCountMin(data)),
    max: data => dispatch(setGoodsCountMax(data)),
    all: data => dispatch(setGoodsCountAll(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputGoodsOrder);
