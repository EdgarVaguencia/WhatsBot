eListen = (function() {

    const actions = ['sendMsj'];

    function _reader(msj, sender, callback) {
        sender.tab ? void 0 : 0 >= actions.indexOf(msj.action) ? WhBo.whatsTab(function(tab) {
            chrome.tabs.sendMessage(tab.id, msj, callback(status));
        }) : callback({error: "Action not found!"});
        callback('Termino');
    }

    return {
        read: _reader
    }
})();

chrome.runtime && chrome.runtime.onMessage && chrome.runtime.onMessage.addListener(eListen.read.bind());