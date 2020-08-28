var e = getApp();

Page({
    onLoad: function() {
        e.checkAuth();
    },
    onShow: function() {
        var n = e.getCache("userinfo");
        console.log(n), n && wx.switchTab({
            url: "/pages/member/index/index"
        });
    }
});