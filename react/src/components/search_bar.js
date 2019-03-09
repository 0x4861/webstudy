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
  render() {
    return <input onChange={event=>console.log(event.target.value)}/>;
  }
}


export default SearchBar;
