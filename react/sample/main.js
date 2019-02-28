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

// function showCircle() {
//   var colors = ["orange", "blue", "green", "cyan"];
//   var randomColor = Math.floor(Math.random()*colors.length);

//   return <Circle bgColor={colors[randomColor]}/>
// }
var colors = ["orange", "blue", "green", "black", "lightgray", "red", "yellow"];

var compData = [];
for (var i=0; i<colors.length; i++) {
  var color = colors[i];
  compData.push(<Circle key={i+color} bgColor={color}/>);
}

var destination = document.querySelector('#container');
ReactDOM.render(
  <div>
    {compData}
  </div>, destination);
