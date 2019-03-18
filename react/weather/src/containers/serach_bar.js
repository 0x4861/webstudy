
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term : "" };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    // https://openweathermap.org/
    // key = 0ec5c505c13d345c61f31796603cf1f0

    onFormSubmit(event) {
        event.preventDefault(); //폼을 제출하지 않도록 막아준다.

        this.props.fetchWeather(this.state.term);
        this.setState({ term: '' });
    }
    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                    placeholder="Get a five-day forcast in your favorite cities" 
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}/>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    // fetchWeather는 액션생성자로서, 호출될 대마다 dispatch와 함께 액션이 반환됨.
    // 이 액션이 미들웨어로 흘러가 리덕스 어플리케이션안의 리듀서로 들어가는 것을 확인.
    return bindActionCreators({ fetchWeather }, dispatch);
}

// mapStateToProps 대신 null을 사용하는건, 리덕스가 state를 신경쓰고있으니, 컨테이너는 어떤 스테이트도 필요 없어서
export default connect(null, mapDispatchToProps)(SearchBar);