console.log('content script...')

import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import {Store} from 'react-chrome-redux'

const store = new Store({
    portName: 'ORDER_TOOL'
});

class InjectApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      console.log('store', store)
      
      return (
        <div>
            <div className='add-button' onClick={()=>location.href=store.getState().order.goods_url}></div>
        </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});

//document.body.innerHTML += "<img id='add' src='http://www.downloadclipart.net/medium/18122-blue-pin-clip-art.png'style='width: 50px; position:fixed; top:5px; left:5px; z-index:999999'/>";

/*
var port = chrome.runtime.connect({
    name: "url-connection"
});
//Event listener for click to the button add
document.getElementById('add').addEventListener('click', function () {
    console.log('finally');
    // I want to ask to the background the url of the tab

    // chrome.runtime.sendMessage({message: "url"}, function(response) {
    //   console.log('response', response, 'response farewell', response.farewell);
    // });
    // port.postMessage({
    //     message: "url"
    // });
    // port.onMessage.addListener(function (msg) {
    //     if (msg.result) {
    //         console.log('OK', msg.result)
    //         port.postMessage({
    //             answer: "Madame"
    //         });
    //     }
    // });
    console.log('Inside click listener, CS ...');
    port.postMessage({
        message: "url",
    });
    port.onMessage.addListener(function (msg) {
        if (msg.result) {
            console.log('url received in the page', msg.result);
            port.postMessage ({message: "hello"});
        }
    });
})
*/
