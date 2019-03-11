
import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term : "" };
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    // https://openweathermap.org/
    // key = 0ec5c505c13d345c61f31796603cf1f0

    onFormSubmit(event) {
        event.preventDefault(); //폼을 제출하지 않도록 막아준다.
    }
    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="inpput-group">
                <input
                    placeholder="Get a five-day forcast in your favorite cities" 
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}/>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondeary">submit</button>
                </span>
            </form>
        );
    }
}