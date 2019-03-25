import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setGoodsUrl } from '../../background/actions';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import '../styles/input-goods.css';

import Perf from 'react-addons-perf';
window.Perf = Perf;

class InputUrl extends PureComponent {
    constructor(props) {
        super(props)

        this.onChangeUrl = this.onChangeUrl.bind(this);
    }

    onChangeUrl(e) {
        this.props.setUrl(e.target.value)
    }
    render() {
        console.log('url ', this.props)
        return (
            <FormGroup className='form-goods-url'>
                <Col md={ 2 }>주문상품URL</Col>
                <Col md={ 10 }>
                    <FormControl 
                        type="text"
                        className="input-url"
                        placeholder="주문상품 URL을 입력하세요."
                        value={this.props.url.data}
                        onChange={this.onChangeUrl}
                        required/>
                </Col>
            </FormGroup>
        )
    }
}

const mapStateToProps = (state) => ({
    url: state.url
});

const mapDispatchToProps = (dispatch) => ({
    setUrl: url => dispatch(setGoodsUrl(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputUrl);
