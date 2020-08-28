var t = getApp(), a = t.requirejs("core"), e = t.requirejs("foxui");

Page({
    data: {
        page: 1,
        cate: "all",
        list: []
    },
    onLoad: function(t) {
        this.setData({
            options: t,
            cate: t.cate || ""
        }), "true" == t.hasmembercard && this.setData({
            cate: "my"
        }), this.get_list();
    },
    tab: function(t) {
        this.setData({
            cate: t.currentTarget.dataset.cate,
            list: [],
            page: 1
        }), this.get_list();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.get_list();
    },
    get_list: function() {
        var t = this;
        t.setData({
            loading: !0
        }), a.get("membercard.getlist", {
            page: t.data.page,
            cate: t.data.cate
        }, function(e) {
            0 == e.error ? (t.setData({
                loading: !1,
                total: e.total,
                empty: !0,
                all_total: e.all_total,
                my_total: e.my_total
            }), e.list.length > 0 && t.setData({
                page: t.data.page + 1,
                list: t.data.list.concat(e.list)
            }), e.list.length > e.pagesize && t.setData({
                loaded: !0
            })) : a.toast(e.message, "loading");
        }, this.data.show);
    },
    submit: function(t) {
        var s = t.currentTarget.dataset, i = this;
        -1 != s.startbuy && ("0" != s.stock ? a.post("membercard.order.create_order", {
            id: s.id
        }, function(t) {
            0 == t.error ? wx.navigateTo({
                url: "/pages/member/membercard/pay/index?order_id=" + t.order.order_id
            }) : e.toast(i, t.message);
        }) : e.toast(i, "库存不足"));
    }
});