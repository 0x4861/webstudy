import axios from 'axios';
import store from './store';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab

    // var div=document.createElement("div");
    // document.body.appendChild(div);
    // div.innerText="test123";
    // let x = chrome.tabs.executeScript({
    //
    // });
});

chrome.commands.onCommand.addListener(function (command) {
    alert('hello')
});

/*
// 탭이 활성화 되었을때 url을 로그로 찍는다.
chrome.tabs.onActivated.addListener(function (tabs) {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        //console.log(tabs[0].url);
        chrome.runtime.onConnect.addListener(function (port) {
            console.assert(port.name == "url-connection");
            port.onMessage.addListener(function (msg) {
                if (msg.message == "url")
                    port.postMessage({
                        result: tabs[0].url.toString()
                    });
            });
        });
        console.log('current URL:', tabs[0].url);
    });
})
*/

/*
chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "url-connection");
    port.onMessage.addListener(function (msg) {
        console.log("msg : ", msg);
        if (msg.message === "url") {
            chrome.tabs.getSelected(null, function (tab) {
                port.postMessage({
                    result: tab.url.toString()
                });
            });
        }
    });
});
*/