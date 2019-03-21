import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGoodsUrlOrder } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-goods-url.css';

class InputGoodsUrl extends Component {

    render () {
        console.log('goods url', this.props)
        return (
            <FormGroup className='container-goods-url'>
                <Col md={ 2 }>주문상품URL</Col>
                <Col md={ 10 }>
                    <FormControl 
                        type="text"
                        placeholder="주문상품 URL을 입력하세요."
                        value={this.props.order.goods_url}
                        onChange={(e)=>this.props.add(e.target.value)}/>
                </Col>
            </FormGroup>
        )
    }
}

const mapStateToProps = (state) => ({
    bookmark: state.bookmark,
    order: state.order
});

const mapDispatchToProps = (dispatch) => ({
    add: url => dispatch(setGoodsUrlOrder(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputGoodsUrl);
