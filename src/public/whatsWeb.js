((win) => {
  const modulesWhats = [
    {
      id: 'Store',
      exists: module => {
        return module.default && module.default.Chat ? module.default : null
      }
    },
    {
      id: 'Chats',
      exists: module => {
        return module.sendTextMsgToChat ? module : null
      }
    }
  ]

  const timerId = setInterval(() => {
    if (win.localStorage.WABrowserId || win.sessionStorage.WABrowserId) {
      clearInterval(timerId)
      getModules()
    }
  }, 5000)

  function getModules () {
    if (typeof window['webpackJsonp'] === 'function') {
      window['webpackJsonp']([],
        {
          [123]: (m, e, webPackModule) => isReady(webPackModule.c)
        }, [123])
    } else {
      window['webpackJsonp'].push([
        [123], {
          123: (m, e, webPackModule) => isReady(webPackModule.c)
        }, [[123]]
      ])
    }
  }

  function isReady (modules) {
    let moduleFound = 0
    const timeModules = setInterval(() => {
      for (let idMod in modules) {
        if (modules[idMod].exports) {
          modulesWhats.forEach(needModule => {
            if (needModule.module) return
            let exposeModule = needModule.exists(modules[idMod].exports)
            if (exposeModule !== null) {
              moduleFound++
              needModule.module = exposeModule
            }
          })
          if (moduleFound === modulesWhats.length) {
            let storeModule = modulesWhats.find(m => m.id === 'Store')
            win['Store'] = storeModule.module ? storeModule.module : {}
            modulesWhats.splice(modulesWhats.indexOf(storeModule), 1)
            modulesWhats.forEach(mod => {
              win['Store'][mod.id] = mod.module
            })
            clearInterval(timeModules)
            console.info('Listo: WhatsBot')
          }
        }
      }
    })
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
        number = '' + obj.code + obj.tel + '@c.us'
        break
    }
    return number
  }

  function _chat (data) {
    var number = _formatNumber({ code: data.code, tel: data.tel })
    return number.length === 0 ? { isChat: false } : window['Store'].Chat.get(number) === undefined ? { isChat: false } : { isChat: true, chat: window['Store'].Chat.get(number) }
  }

  function _msj (data) {
    const c = _chat(data)
    if (c.isChat) {
      window['Store'].Chats.sendTextMsgToChat(c.chat, data.txt)
    } else {
      window.location.href = 'https://api.whatsapp.com/send?phone=' + _formatNumber({ code: data.code, tel: data.tel }).split('@')[0]
    }
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
