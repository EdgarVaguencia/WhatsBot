const eListen = (function () {
  const actions = ['sendMsj']

  function _reader (msj, sender, callback) {
    sender.tab ? void 0 : actions.indexOf(msj.action) >= 0 ? window['WhBo'].whatsTab(function (tab) {
      window['chrome'].tabs.sendMessage(tab.id, msj, callback(status))
    }) : callback({ error: "Action not found!" })
    callback('Termino')
  }

  return {
    read: _reader
  }
})()

window['chrome'].runtime && window['chrome'].runtime.onMessage && window['chrome'].runtime.onMessage.addListener(eListen.read.bind())
