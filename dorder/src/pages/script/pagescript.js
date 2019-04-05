console.log('inside content script...')

window.alert = function (msg) {
    console.log("[Hidden] ", msg);
}

window.addEventListener ('GET_DUCK', (event)=> {
    window.postMessage({msg: "ok2"});
}, false);

/*
window.alert = function alert(msg) {
    console.log('Hidden Alert ' + msg);
};
*/