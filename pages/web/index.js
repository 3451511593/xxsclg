Page({
    data: {
        url: ""
    },
    onLoad: function(e) {
        if ("sign" == e.module) var o = e.domain + "?" + decodeURIComponent(e.params) + "&uid=" + e.mid; else o = decodeURIComponent(e.url);
        this.setData({
            url: o
        });
    }
});