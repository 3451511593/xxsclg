var e = getApp(), s = e.requirejs("core"), r = e.requirejs("foxui");

e.requirejs("jquery");

Page({
    data: {
        express: "",
        expresscom: "",
        express_number: ""
    },
    onLoad: function(s) {
        this.setData({
            options: s
        }), e.url(s), this.get_list();
    },
    get_list: function() {
        var e = this;
        void 0 === e.data.options.singlerefund ? s.get("order/express_number", e.data.options, function(r) {
            0 == r.error ? (r.show = !0, e.setData(r)) : s.toast(r.message, "loading");
        }) : s.get("order/single_express_number", e.data.options, function(r) {
            0 == r.error ? (r.show = !0, e.setData(r)) : s.toast(r.message, "loading");
        });
    },
    inputPrickChange: function(e) {
        var s = this.data.express_list, r = e.detail.value, t = s[r].name, i = s[r].express;
        this.setData({
            expresscom: t,
            express: i,
            index: r
        });
    },
    inputChange: function(e) {
        var s = e.detail.value;
        this.setData({
            express_number: s
        });
    },
    back: function() {
        wx.navigateBack();
    },
    submit: function(e) {
        var t = e.currentTarget.dataset.refund, i = this.data.express_number, a = (t = this.data.options.refundid, 
        this.data.options.id);
        if ("" != i) {
            var n = this.data.express, o = this.data.expresscom;
            void 0 === this.data.options.singlerefund ? s.get("order/express_number", {
                submit: 1,
                refundid: t,
                orderid: a,
                express_number: i,
                express: n,
                expresscom: o
            }, function(e) {
                0 == e.error && wx.navigateTo({
                    url: "/pages/order/detail/index?id=" + a
                });
            }) : s.get("order/single_express_number", {
                submit: 1,
                refundid: t,
                orderid: a,
                express_number: i,
                express: n,
                expresscom: o
            }, function(e) {
                0 == e.error && wx.navigateTo({
                    url: "/pages/order/detail/index?id=" + a
                });
            });
        } else r.toast(this, "请填写快递单号");
    }
});