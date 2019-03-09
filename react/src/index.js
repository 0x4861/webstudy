import React from 'react'
import ReactDOM from 'react-dom'

// Create a new component. This component should produce some HTML

// const는 ES6에서 나오는 표현법.(선언후 변경할 수 없음)
const App = function() {
    // JSX문법. (함수안에 HTML이 들어가도 문제 없는 이유)
    return <div>Hi!</div>;
}

// Take this component is generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App/>);

// https://babeljs.io/repl
