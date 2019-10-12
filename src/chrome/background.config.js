window.WhBoCo = (function () {
  var _config = {
    contacts: {},
    chats: {}
  }

  function _returnConfig () {
    return _config
  }

  return {
    get: _returnConfig
  }
})()
