import React, { Component } from 'react';
import InputGoodsOrder from './InputGoodsOrder';
import InputAlarm from './InputAlarm';
import InputFile from './InputFile';
import ButtonGroup from './ButtonGroup';
import '../styles/app.css';

export default class OrderForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <InputGoodsOrder />
                <InputAlarm />
                <InputFile />
                <ButtonGroup />
            </div>
        );
    }
}
