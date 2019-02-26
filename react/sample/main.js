// component는 트리 구조로 구성되어져 있다.

class Rectangle extends React.Component{
  render() {
    var recStyle={
      height:160,
      backgroundColor:this.props.color
    };
    return(
      <div style={recStyle}></div>
    );
  }
};

class ColorName extends React.Component{
  render() {
    var nameStyle={
      fontWeight:"bold",
      padding:15,
      margin:0,
      textAlign:"center"
    };
    return (
      //<div style={nameStyle}>Blue</div>
      <p style={nameStyle}>{this.props.color}</p>
    );
  }
};

class ColorCard extends React.Component{
  render() {
    var cardStyle = {
      width:150,
      height:200,
      padding:0,
      backgroundColor:"#fff",
      WebkitFilter:"drop-shadow(0px 0px 5px #777)",
      Filter:"drop-shadow(0px 0px 5px #777)"
    };
    return (
      <div style={cardStyle}>
        <Rectangle color={this.props.color}/>
        <ColorName color={this.props.color}/>
      </div>
    );
  }
};

const element = <div><ColorCard color="yellow"/></div>;
ReactDOM.render(element, document.querySelector('#container'));
