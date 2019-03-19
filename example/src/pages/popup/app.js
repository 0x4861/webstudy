import React, {Component} from 'react';
import {connect} from 'react-redux';
import { addBookmark, refreshBookmark } from '../background/actions';
import './app.css';
import randomId from 'uuid/v4';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: ['nothing']
        }
        //this.addBookmark = this.addBookmark.bind(this);
        //this.createList = this.createList.bind(this);
    }

    saveBookmark() {
        return new Promise ((resolved, rejected)=>{
            chrome.tabs.query({active: true}, (data) => {
                this.props.add(data[0]);
                resolved(data[0])
            })
        }).then (link => {
            chrome.storage.sync.set({'url': ['hello']}, function() {

            })
        });
    }
    
    loadBookmark() {
        return new Promise ((resolved, rejected)=>{
            chrome.storage.sync.get('url', data=>{
                resolved(data)
            })
        }).then ((data) => {
            this.props.refresh(data)
        })
    }

    renderBookmark() {
        return this.props.tabs.map (tab => {
            return (
                <h3 key={randomId()}>{tab}</h3>
            )
        });
    }

    componentDidMount() {
        this.loadBookmark()
    }
   
    render() {
        console.log('[App render] props', this.props)
        return (
            <div>
                <h1>Title</h1>
                <button onClick={()=>this.saveBookmark()}>Add</button>
                <div>{this.renderBookmark()}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tabs : state.tabs
});

const mapDispatchToProps = (dispatch) => ({
    //addNum: (data) => dispatch(add(data))
    //addNum: async () => dispatch(await add())
    add: (link) => dispatch(addBookmark(link)),
    refresh: (data) => dispatch(refreshBookmark(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);