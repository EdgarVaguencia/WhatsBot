reading = (function() {

    var scrip = document.createElement('script');
    scrip.setAttribute('src', chrome.extension.getURL('/public/whatsWeb.js'));
    document.body.appendChild(scrip);

    function _read(msj, sender, cb) {
        console.info(sender);
        switch(msj.action) {
            case 'sendMsj':
                window && window.postMessage && window.postMessage({origin: 'WhatsBot', info: msj}, 'https://web.whatsapp.com');
                cb(200);
            break;
            default:
                cb(500);
                console.log('Saludos');
            break;
        }
    }

    return {
        read: _read,
    }

})();

chrome.runtime && chrome.runtime.onMessage && chrome.runtime.onMessage.addListener(reading.read.bind());