class Circle extends React.Component {
  render() {
    var circleStyle={
      padding:10,
      margin:20,
      display:"inline-block",
      backgroundColor:this.props.bgColor,
      width:100,
      height:100,
      borderRadius:"50%"
    };

    return (
      <div style={circleStyle}></div>
    );
  }
};

function showCircle() {
  var colors = ["orange", "blue", "green", "cyan"];
  var randomColor = Math.floor(Math.random()*colors.length);

  return <Circle bgColor={colors[randomColor]}/>
}

var element = <Circle bgColor="red"/>;
var element2 = <Circle bgColor="orange"/>;
var destination = document.querySelector('#container');
ReactDOM.render(<div>{showCircle()}{showCircle()}{showCircle()}</div>, destination);
