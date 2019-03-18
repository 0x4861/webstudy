import React, {Component} from 'react';
import {connect} from 'react-redux';
import {add} from '../background/actions';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.add = this.add.bind(this);
    }

    add() {
        console.log("[add]", this.props.counter);
        this.props.addNum(this.props.counter);
    }

    componentDidMount() {
        this.add();
    }

    render() {
        console.log('props', this.props);
        return (
            <div>
                <p>hello</p>
                <h1>Title</h1>
                <button onClick={()=>this.add()}>Add</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    counter: state.counter
});

const mapDispatchToProps = (dispatch) => ({
    addNum: (data) => dispatch(add(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);