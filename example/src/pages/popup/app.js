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
        this.props.addNum();
    }

    componentDidMount() {
        this.add();
    }

    render() {
        return (
            <div>
                <p>hello</p>
                <h1>Title</h1>
                <button accesskey="h" onClick={()=>this.add()}>Add</button>
                <p> counting {this.props.counter} </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    counter: state.counter
});

const mapDispatchToProps = (dispatch) => ({
    //addNum: (data) => dispatch(add(data))
    addNum: async () => dispatch(await add())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);