var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-76663200-3']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})()
WhBo = (function() {
// ****************************************************************************
// *                             Datos compartidos                            *
// ****************************************************************************
    const url_whats = 'https://web.whatsapp.com';

    function getWhatsTab(callback) {
        var url_search_ = url_whats + '/';
        chrome.tabs.query({currentWindow: !0, url: url_search_}, function(tabs) {
            tabs.length == 0 ? (chrome.tabs.create({url: url_whats}, callback)) : chrome.tabs.update(tabs[0].id, {selected: true}, callback);
        });
    }

    function _track(obj) {
        _gaq.push(['_setAccount', 'UA-76663200-3']);
        _gaq.push(['_trackEvent', obj.info, obj.type]);
    }

    function _page() {
        _gaq.push(['_setAccount', 'UA-76663200-3']);
        _gaq.push(['_trackPageview']);
    }

// ****************************************************************************
// *                        Datos y funciones genericas                       *
// ****************************************************************************
    manifest = chrome.runtime.getManifest()

    chrome.runtime.onInstalled.addListener(function(detail) {
        detail.reason == 'install' ? (_track({info: manifest.version, type: 'install'}), closeWhatsTab()) : detail.reason == 'update' && _track({info: manifest.version, type: 'update'})
    });

    function closeWhatsTab () {
        var url_search_ = url_whats + '/*'
        chrome.tabs.query({currentWindow: !0, url: url_search_}, function(tabs) {
            if (tabs.length != 0) {
                chrome.tabs.remove(tabs[0].id);
            }
        });
    }

    return {
        whatsTab: getWhatsTab,
        tracking: _track,
        trackPage: _page,
    }
})();