const reading = (function () {
  var scrip = document.createElement('script')
  scrip.setAttribute('src', window['chrome'].extension.getURL('/public/whatsWeb.min.js'))
  document.body.appendChild(scrip)

  function _read (msj, sender, cb) {
    let status = 200
    switch (msj.action) {
      case 'sendMsj':
        window && window.postMessage && window.postMessage({ origin: 'WhatsBot', info: msj }, 'https://web.whatsapp.com')
        break
      default:
        status = 500
        break
    }
    cb(status)
  }

  return {
    read: _read
  }
})()

window['chrome'].runtime && window['chrome'].runtime.onMessage && window['chrome'].runtime.onMessage.addListener(reading.read.bind())
