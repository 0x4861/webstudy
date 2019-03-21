import React, { Component } from 'react';
import './item-view.css';

export default class ItemView extends Component {
    render () {
        console.log('props in listview', this.props)
        return (
            <div className='content-container'>
                <img src={this.props.tab_icon}/>
                <div>{this.props.tab_title}</div>
            </div>
        )
    }
}