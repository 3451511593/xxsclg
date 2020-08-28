var t = getApp(), a = t.requirejs("/core");

t.requirejs("jquery");

Page({
    data: {
        list: [],
        page: 1,
        status: "all",
        loading: !1
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    goIndex: function() {
        wx.navigateTo({
            url: "/pages/quickbuy/index"
        });
    },
    onLoad: function() {
        this.getlist({
            page: 1
        });
    },
    tab: function(t) {
        var a = t.currentTarget.dataset.status, e = {
            page: 1,
            status: "all" == a ? "" : a
        };
        this.setData({
            status: a,
            list: []
        }), this.getlist(e);
    },
    onReachBottom: function() {
        var t = {
            page: this.data.page,
            status: this.data.status
        };
        this.getlist(t);
    },
    getlist: function(t) {
        var e = this;
        e.setData({
            loading: !0
        }), a.get("dividend/order", t, function(a) {
            if (0 == a.error) {
                if (a.list.length > 0) {
                    var i = e.data.list.concat(a.list);
                    t.page = t.page + 1;
                }
                wx.setNavigationBarTitle({
                    title: a.textdividend + "订单" || "分红订单"
                }), e.setData({
                    member: a.member,
                    list: i,
                    loading: !1,
                    total: a.total,
                    page: t.page,
                    stop: !1,
                    ordercount: a.ordercount,
                    textyuan: a.textyuan,
                    textdividend: a.textdividend
                });
            }
        });
    }
});