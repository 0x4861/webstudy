import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Button, Col } from "react-bootstrap";
import { clearOrderProps, clearTimeProps, clearFileProps } from '../../background/actions';
import '../styles/button-group.css';

class ButtonGroup extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("Submit !!", event);
    }

    onInputClear(event) {
        event.preventDefault();
        console.log("Clear !!", event, this.props);
        this.props.clearOrder();
        this.props.clearTime();
        this.props.clearFile();
    }

    render () {
        console.log('button group', this.props)
        return (
            <FormGroup className='form-button'>
                <Col md={3} mdOffset={3} className='form-button-order-start'>
                    <Button
                        type="submit"
                        bsStyle="success"
                        size="sm"
                        onClick={(e)=>{this.onSubmit(e)}}>
                        주문시작
                    </Button>
                </Col>
                <Col md={3} mdOffset={3} className='form-button-clear'>
                    <Button
                        type="button"
                        bsStyle="info"
                        size="sm"
                        onClick={(e)=>{this.onInputClear(e)}}>
                        설정초기화
                    </Button>
                </Col>
            </FormGroup>               
        )
    }
}

const mapStateToProps = (state) => ({
    order: state.order,
    time: state.time,
    file: state.file
});

const mapDispatchToProps = (dispatch) => ({
    clearOrder: () => dispatch(clearOrderProps()),
    clearTime: () => dispatch(clearTimeProps()),
    clearFile: () => dispatch(clearFileProps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);
