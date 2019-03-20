import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Store} from 'react-chrome-redux';
import { refreshBookmark, deleteAllBookmark } from '../background/actions';
import './app.css';
import randomId from 'uuid/v4';

// const store = new Store({ portName: "COUNTING" });

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
                resolved(data[0])
            })
        }).then (link => {
            // chrome.storage.sync.set({'url': this.props.tabs}, function() {
            //     console.log('tabs updated', this.props.tabs)
                return new Promise ((resolved, rejected) => {
                    resolved(link)
                }).then (link => { this.props.refresh(link) })
        })
    }
    
    loadBookmark() {
        // return new Promise ((resolved, rejected)=>{
        //     chrome.storage.sync.get('url', data=>{
        //         resolved(data)
        //     })
        // }).then ((data) => {
        //     this.props.refresh(data)
        // })
    }

    renderBookmark() {
        console.log('called from rendering TABS', this.props.tabs)
        const tabs = this.props.tabs
        return tabs.map (tab => {
            console.log('TAB', tab)
            return (
                <h3 key={ randomId() } className='link'>{tab}</h3>
            )
        });
    }

    clearAll () {
        // chrome.storage.sync.clear(function(obj){
        //     console.log("local storage cleared", obj);
        // });
        this.props.deleteAll()
    }

    componentDidMount() {
        //this.loadBookmark()
    }
   
    render() {
        console.log('[App render] props', this.props.state)
        return (
            <div>
                <h1>Title</h1>
                <button onClick={()=>this.saveBookmark()}>Add</button>
                <button onClick={()=>this.clearAll()}>Clear</button>
                <div id='container'>{this.renderBookmark()}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tabs : state.tabs,
});

const mapDispatchToProps = (dispatch) => ({
    //addNum: (data) => dispatch(add(data))
    //addNum: async () => dispatch(await add())
    // add: (link) => dispatch(addBookmark(link)),
    refresh: (data) => dispatch(refreshBookmark(data)),
    deleteAll: () => dispatch(deleteAllBookmark()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);