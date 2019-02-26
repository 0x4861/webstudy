// component state 변화를 저장, 데이터를 활용
// getInitialState -> component가 마운트 되기 전에 실행됨. 초기값을 정할때 사용.
// componentWillMount -> 렌더링 되기전 실행됨.
// componentDidMount -> 렌더링 후에 실행됨.
// setState -> state값을 새로 셋팅할 때 사용.

class AutoCounter extends React.Component {
  constructor() {
    super();
    // timerCount 함수에서 this.setState 함수를 호출하기 위해서는, 초기화 과정에서 bind를 해줘야 한다.
    this.timerCount=this.timerCount.bind(this);
    this.state={count:10};
  }

  timerCount() {
    this.setState({
      count:this.state.count+10
    });
  }

  componentDidMount(){
    setInterval(this.timerCount, 1000);
  }

  render() {
    return (
      <h1>{this.state.count}</h1>
    );
  }
};

class AutoCounterDisplay extends React.Component {
  render() {
    var divStyle={
      width:300,
      textAlign:"center",
      padding:40,
      backgroundColor:"gray",
      color:"blue",
      borderRadius:20,
      margin:20
    }
    return (
      <div style={divStyle}>
        <AutoCounter/>
      </div>
    );
  }
};

const element = <AutoCounterDisplay/>;
ReactDOM.render(element, document.querySelector('#container'));
