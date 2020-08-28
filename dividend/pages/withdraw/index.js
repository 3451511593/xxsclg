var t = getApp(), e = t.requirejs("/core");

t.requirejs("jquery");

Page({
    data: {},
    onLoad: function(i) {
        var a = this;
        t.getCache("isIpx") ? a.setData({
            isIpx: !0
        }) : a.setData({
            isIpx: !1
        }), e.get("dividend/withdraw", "", function(t) {
            a.setData({
                msg: t
            });
        });
    },
    onShow: function(t) {
        var i = this;
        e.get("dividend/withdraw", "", function(t) {
            i.setData({
                msg: t
            }), wx.setNavigationBarTitle({
                title: t.set.texts.dividend + "佣金" || "分红佣金"
            });
        });
    },
    submit: function(t) {
        t.currentTarget.dataset.price <= 0 || wx.navigateTo({
            url: "/dividend/pages/apply/index"
        });
    }
});