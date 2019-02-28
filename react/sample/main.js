class TempClass extends React.Component {
  render() {
    var tempStyle={
      padding:10,
      margin:20,
      display:"inline-block",
      backgroundColor:this.props.bgColor,
      width:100,
      height:100,
      borderRadius:"50%"
    };

    return (
      <div style={tempStyle}></div>
    );
  }
};

var destination = document.querySelector('#container');
ReactDOM.render(
  <div>
  </div>, destination);
