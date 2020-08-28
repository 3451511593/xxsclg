var e = getApp();

e.requirejs("core"), e.requirejs("jquery");

Page({
    data: {
        region: []
    },
    onLoad: function(e) {
        var r = e.region, n = e.onlysent;
        this.setData({
            region: r,
            onlysent: n
        });
    }
});