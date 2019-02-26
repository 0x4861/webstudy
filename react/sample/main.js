/*
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
*/

class C extends React.Component{
  render() {
    return (
      <div>
        <p>{this.props.color}</p>
        <p>{this.props.name}</p>
        <p>{this.props.size}</p>
      </div>
    );
  }
};

class B extends React.Component{
  render() {
    return (
      <C color={this.props.color} name={this.props.name} size={this.props.size}/>
    );
  }
};

class A extends React.Component{
  render() {
    return (
      <div>
        <!--<B color={this.props.color} name={this.props.name} size={this.props.size}/>-->
        <B {...this.props}/>
      </div>
    );
  }
};

const element = <div><A color="red" name="빨강" size="small"/></div>;
ReactDOM.render(element, document.querySelector('#container'));
