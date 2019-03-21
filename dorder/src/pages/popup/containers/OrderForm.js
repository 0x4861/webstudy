import React, { Component } from 'react';
import {connect} from 'react-redux';
import InputGoodsUrl from './InputGoodsUrl';
import '../styles/app.css';

class OrderForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Title</h1>
                <InputGoodsUrl/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);