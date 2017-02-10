whatsInject = (function() {

    function _formatNumber(obj) {
        var number = '';
        switch(obj.code){
            case '34':
                number = '+' + obj.code + obj.tel + '@c.us';
            break;
            case '54':
                number = '' + obj.code + '9' + obj.tel + '@c.us';
            break;
            case '52':
                number = '' + obj.code + '1' + obj.tel + '@c.us';
            break;
            default:
            number = '' + obj.code + obj.tel + '@c.us';
            break;
        }
        return number;
    }

    function _chat(data) {
        var number = _formatNumber({code: data.code, tel: data.tel});
        return theChat = number.length === 0 ? void 0 : Store.Chat.get(number) == undefined ? Store.Chat.add({cmd: 'action', id: number}, {merge: !0}) : Store.Chat.get(number);
    }

    function _msj(data) {
        const c = _chat(data);
        c && c.sendMessage && c.sendMessage(data.txt);
    }

    function _read(msj) {
        switch(msj.action) {
            case 'sendMsj':
                _msj(msj.data);
                break;
            default:
                break;
        }
    }

    return {
        listen: _read,
    }
})();

window && window.addEventListener && window.addEventListener('message', function(e) {
    e.data && e.data.origin && e.data.origin == 'WhatsBot' && whatsInject.listen(e.data.info);
});
