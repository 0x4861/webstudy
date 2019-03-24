import React, { Component } from 'react';
import './jquery-dateFormat.min.js';

// 현재시간 표기하는 컨테이너
// jqeury-dateFormat.min.js가 반드시 필요
// state의 상태가 변경되면 render가 다시 호출되는 방식으로 업데이트 
class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: new Date(),
            id: 0
        }
    }

    componentDidMount() {
        var state = this.state;

        state.id = setInterval(function(){
            var state = this.state;
            state.time = new Date();
            this.setState(state);
        }.bind(this), 1000);
        this.setState(state);
    }

    componentWillUnmount() {
        clearInterval(this.state.id);
    }

    render() {
        return (
            <div className="clock-group">
                <h4 className="wall-clock">{$.format.date(this.state.time, 'HH:mm:ss')}</h4>
            </div>
        )
    }
}

export default Clock;