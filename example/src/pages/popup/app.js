import React, {Component} from 'react';
import {connect} from 'react-redux';
import { refreshBookmark, deleteAllBookmark } from '../background/actions';
import './app.css';
import ListView from './ListView.js'
import truncate from 'truncate';

class App extends Component {
    constructor(props) {
        super(props);
    }

    saveBookmark() {
        return new Promise ((resolved, rejected)=>{
            chrome.tabs.query({active: true, 'lastFocusedWindow':true }, (data) => {
                console.log('tabs info', data)
                resolved(data);
            })
        }).then (link => {
            console.log('link ', link);
            this.addEmptyPic(link);
            this.truncateTitle(link);
            this.props.refresh(link);
        })
    }

    addEmptyPic(pic) {
        if (!pic[0].favIconUrl) {
            pic[0].favIconUrl='../assets/nothing.png';
        }
    }
    
    truncateTitle(title) {
        if (title[0].title.length > 10) {
            title[0].title = truncate(title[0].title.toString(), 55)
        }
    }

    clearAll () {
        this.props.deleteAll()
    }

    componentDidMount() {
        //this.loadBookmark()
    }
   
    render() {
        console.log('[App render] props', this.props.state)
        return (
            <div className='wrapper'>
                <h1>Title</h1>
                <button onClick={()=>this.saveBookmark()}>Add</button>
                <button onClick={()=>this.clearAll()}>Clear</button>
                <ListView tabs={this.props.tabs}></ListView>
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