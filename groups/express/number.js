var e = getApp(), s = e.requirejs("core");

e.requirejs("foxui"), e.requirejs("jquery");

Page({
    data: {
        express: "",
        expresscom: "",
        expresssn: "",
        orderid: ""
    },
    onLoad: function(e) {
        var r = this;
        s.post("groups.refund", {
            orderid: e.orderid
        }, function(t) {
            0 == t.error ? (t.show = !0, r.setData(t), r.setData({
                options: e
            })) : s.toast(t.message, "loading");
        });
    },
    inputPrickChange: function(e) {
        var s = this.data.express_list, r = e.detail.value, t = s[r].name, a = s[r].express;
        this.setData({
            expresscom: t,
            express: a,
            index: r
        });
    },
    inputChange: function(e) {
        var s = e.detail.value;
        this.setData({
            expresssn: s
        });
    },
    back: function() {
        wx.navigateBack();
    },
    submit: function(e) {
        var r = this.data.expresssn, t = (this.data.options.refundid, this.data.options.orderid);
        if ("" != r) {
            var a = {
                express: this.data.express,
                expresscom: this.data.expresscom,
                expresssn: r,
                orderid: t
            };
            s.post("groups.refund.express", a, function(e) {
                0 == e.error ? wx.navigateBack() : wx.showToast({
                    title: e.error,
                    icon: "none",
                    duration: 2e3
                });
            }, !0);
        } else wx.showToast({
            title: "请填写快递单号",
            icon: "none",
            duration: 2e3
        });
    }
});