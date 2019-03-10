import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
const API_KEY = 'AIzaSyBYIKt3pJV_CrBSHSxWQAPSwlaPi78srXs';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        };

        YTSearch({key:API_KEY, term: 'surfboards'}, (videos) => {
            this.setState({ videos }); 
            // ES6에서 key와 value가 같을 때는 줄여서 쓸수 있다.
            // origin : this.setState({ videos: videos}); 
            // ES6 : this.setState({ videos }); 
        });
    }
    render() {
        return (
            <div>
                <SearchBar />
                <VideoList videos={this.state.videos}/>
            </div>
        );
    }
}

// Take this component is generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App/>, document.querySelector('.container'));

// https://babeljs.io/repl

// youtube api key
// AIzaSyBYIKt3pJV_CrBSHSxWQAPSwlaPi78srXs
