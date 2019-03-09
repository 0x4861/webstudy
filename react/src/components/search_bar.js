// Syntactic sugar
// import React, { Component } -> const Componet = React.Component
import React, { Component } from 'react';

// function component
/*
const SearchBar = () => {
  return (
    <input />
  )  
};
*/

// class component
class SearchBar extends Component {
  // state.
  // state는 js 객체로써, 유저 이벤트를 저장하고 반응하는데 이용된다.
  // component기반의 각 클래스는 그 자체의 스테이트 객체를 가진다.
  // component state가 바뀔때마다, component는 즉시 리렌더링하고 자식요소들에게도 렌더링을 하도록 강제한다.
  // state는 사용하기 전에 초기화해야한다.
  // state를 위해 state property를 클래스의 constructor 메소드 안에 넣는다.
  // 모든 자바스크립트 클래스는 생성자가 있고, 생성될때마다 자동으로 실행된다.
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }
  render() {
    return (
      <div>
        <input onChange={event=>this.setState({term:event.target.value})}/>
        Value of the input : {this.state.term}
      </div>
    );
  }
}

export default SearchBar;
