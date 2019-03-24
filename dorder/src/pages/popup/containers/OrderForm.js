import React, { Component } from 'react';
import InputAlarm from './InputAlarm';
import InputFile from './InputFile';
import ButtonGroup from './ButtonGroup';
import InputUrl from './InputUrl';
import InputCountMin from './InputCountMin';
import InputCountMax from './InputCountMax';
import InputCountAll from './InputCountAll';
import InputOrderDelay from './InputOrderDelay';
import '../styles/app.css';

import Perf from 'react-addons-perf';
window.Perf = Perf;

export default class OrderForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("ordreForm render!!!")
        return (
            <div>
                <InputUrl />
                <InputCountMin />
                <InputCountMax />
                <InputCountAll />
                <InputOrderDelay />
                <InputAlarm />
                <InputFile />
                <ButtonGroup />
            </div>
        );
    }
}
