((win) => {
  let modules

  const timerId = setInterval(() => {
    if (win.localStorage.WABrowserId) {
      clearInterval(timerId)
      getModules()
    }
  }, 5000)

  function getModules () {
    win['webpackJsonp']([],
      {
        123: function (module, exports, __webpack_require__) {
          modules = __webpack_require__.c
          isReady()
        }
      }, [123])
  }

  function isReady () {
    const timeModules = setInterval(() => {
      if (modules['dbbhhgjjbg'] && modules['bhggeigghg']) {
        if (modules['bhggeigghg'].exports.default.Chat) {
          win['Store'] = requireId(modules['bhggeigghg'].i.replace(/"/g, '"')).default
        }
        if (modules['dbbhhgjjbg'].exports.sendTextMsgToChat) {
          window['Chatme'] = requireId(modules['dbbhhgjjbg'].i.replace(/"/g, '"'))
        }
        clearInterval(timeModules)
        console.info('Listo: WhatsBot')
      }
    })
  }

  function requireId (id) {
    return window['webpackJsonp']([], null, [id])
  }
})(window)

const whatsInject = (function () {
  function _formatNumber (obj) {
    var number = ''
    switch (obj.code) {
      case '34':
        number = '+' + obj.code + obj.tel + '@c.us'
        break
      case '54':
        number = '' + obj.code + '9' + obj.tel + '@c.us'
        break
      case '52':
        number = '' + obj.code + '1' + obj.tel + '@c.us'
        break
      default:
        number = '' + obj.code + obj.tel + '@c.us';
        break
    }
    return number
  }

  function _chat (data) {
    var number = _formatNumber({ code: data.code, tel: data.tel })
    return number.length === 0 ? void 0 : window['Store'].Chat.get(number) === undefined ? window['Store'].Chat.add({ cmd: 'action', id: number }, { merge: !0 }) : window['Store'].Chat.get(number)
  }

  function _msj (data) {
    const c = _chat(data)
    window['Chatme'].sendTextMsgToChat(c, data.txt)
  }

  function _read (msj) {
    switch (msj.action) {
      case 'sendMsj':
        _msj(msj.data)
        break
      default:
        break
    }
  }

  return {
    listen: _read
  }
})()

window && window.addEventListener && window.addEventListener('message', (e) => {
  e.data && e.data.origin && e.data.origin === 'WhatsBot' && whatsInject.listen(e.data.info)
})
