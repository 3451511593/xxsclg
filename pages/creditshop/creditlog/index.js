var t = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../@babel/runtime/helpers/defineProperty")), e = getApp(), a = e.requirejs("core");

e.requirejs("jquery");

Page((0, t.default)({
    data: {
        page: 1,
        list: {},
        total: 0,
        load: !0,
        more: !0,
        notgoods: !0
    },
    onLoad: function(t) {
        this.get_list();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    get_list: function(t) {
        var e = this;
        a.post("creditshop/creditlog/getlist", {
            page: e.data.page
        }, function(a) {
            e.setData({
                credit: a.sysset.texts.credit
            }), e.setData({
                total: a.credit
            }), t ? (a.list = e.data.list.concat(a.list), e.setData({
                list: a.list
            })) : e.setData({
                list: a.list
            }), 0 == a.total ? e.setData({
                notgoods: !1
            }) : e.setData({
                notgoods: !0
            }), a.pagesize >= a.next_page ? e.setData({
                more: !1
            }) : e.setData({
                more: !0
            });
        });
    }
}, "onReachBottom", function(t) {
    this.setData({
        page: this.data.page + 1,
        load: !1
    }), this.get_list(!0), this.setData({
        load: !0
    });
}));