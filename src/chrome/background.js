var _gaq = window['_gaq'] !== undefined ? window['_gaq'] : [];
(function () {
  var ga = document.createElement('script')
  ga.type = 'text/javascript'
  ga.async = true
  ga.src = 'https://ssl.google-analytics.com/ga.js'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(ga, s)
})()
const WhBo = (function () {
// ****************************************************************************
// *                             Datos compartidos                            *
// ****************************************************************************
  const urlWhats = 'https://web.whatsapp.com'

  function getWhatsTab (callback) {
    let urlSearch_ = urlWhats + '/'
    window['chrome'].tabs.query({ currentWindow: !0, url: urlSearch_ }, function (tabs) {
      tabs.length === 0 ? (window['chrome'].tabs.create({ url: urlWhats }, callback)) : window['chrome'].tabs.update(tabs[0].id, { selected: true }, callback)
    })
  }

  function _track (obj) {
    _gaq.push(['_setAccount', 'UA-76663200-3'])
    _gaq.push(['_trackEvent', obj.info, obj.type, manifest.version])
  }

  function _page () {
    _gaq.push(['_setAccount', 'UA-76663200-3'])
    _gaq.push(['_trackPageview'])
  }

  // ****************************************************************************
  // *                        Datos y funciones genericas                       *
  // ****************************************************************************
  const manifest = window['chrome'].runtime.getManifest()

  window['chrome'].runtime.onInstalled.addListener(function (detail) {
    switch (detail) {
      case 'install':
        _track({ info: manifest.version, type: 'install' })
        closeWhatsTab()
        break
      case 'update':
        _track({ info: manifest.version, type: 'update' })
        break
    }
  })

  function closeWhatsTab () {
    let urlSearch = urlWhats + '/*'
    window['chrome'].tabs.query({ currentWindow: !0, url: urlSearch }, function (tabs) {
      if (tabs.length !== 0) {
        window['chrome'].tabs.remove(tabs[0].id)
      }
    })
  }

  return {
    whatsTab: getWhatsTab,
    tracking: _track,
    trackPage: _page
  }
})()

WhBo.trackPage()
