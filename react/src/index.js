import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'

const API_KEY = 'AIzaSyBYIKt3pJV_CrBSHSxWQAPSwlaPi78srXs';

// Create a new component. This component should produce some HTML

// const는 ES6에서 나오는 표현법.(선언후 변경할 수 없음)
// function() 를 ()=> 로 변경하여 사용할 수 있음.
const App = () => {
    // JSX문법. (함수안에 HTML이 들어가도 문제 없는 이유)
    return (
        <div>
            <SearchBar/>
        </div>
    );
}

// Take this component is generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App/>, document.querySelector('.container'));

// https://babeljs.io/repl

// youtube api key
// AIzaSyBYIKt3pJV_CrBSHSxWQAPSwlaPi78srXs
