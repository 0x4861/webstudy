class Counter extends React.Component {
  render() {
    var counterStyle={
      fontSize: 70,
      color:"#555",
      fontWeight:"bold"
    };

    return (
      <div style={counterStyle}>
        {this.props.display}
      </div>
    );
  }
};

class CounterParent extends React.Component {
  constructor() {
    super();
    this.render=this.render.bind(this);
    this.countup=this.countup.bind(this);
    this.countdown=this.countdown.bind(this);
    this.state={
      count:10
    }
  }

  countup() {
      this.setState({
        count:this.state.count+1
      });
    };

  countdown() {
    this.setState({
        count:this.state.count-1
      });
  };

  render() {
    var backgroundStyle={
      padding:50,
      backgroundColor : "orange",
      width:250,
      height:150,
      borderRadius:10,
      textAlign:"center"
    };

    var buttonStyle={
      fontSize:20,
      width:40,
      height:30,
      color:"#555",
      fontWeight:"bold"
    };

    return(
      <div style={backgroundStyle}>
        <Counter display={this.state.count}/>
        <button onClick={this.countdown} style={buttonStyle}>-</button>
        <button onClick={this.countup} style={buttonStyle}>+</button>
      </div>
    );
  }
}

var destination = document.querySelector('#container');
ReactDOM.render(
  <div>
    <CounterParent />
  </div>, destination);
