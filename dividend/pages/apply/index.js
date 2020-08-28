var a = getApp(), t = a.requirejs("/core"), e = a.requirejs("/foxui");

a.requirejs("jquery");

Page({
    data: {
        radios: {
            balance: {
                checked: 0,
                name: "余额"
            },
            weixin: {
                checked: 0,
                name: "微信"
            },
            alipay: {
                checked: 0,
                name: "支付宝"
            },
            card: {
                checked: 0,
                name: "银行卡"
            }
        },
        args: {}
    },
    onLoad: function(a) {
        var e = this;
        t.get("dividend/apply", "", function(a) {
            e.setData({
                msg: a
            }), a.member;
        });
    },
    selected: function(a) {
        var t = this.data.radios, e = a.currentTarget.dataset.status;
        for (var i in t) e == i ? (t[i].checked = 1 != a.currentTarget.dataset.checked, 
        this.setData({
            radios: t,
            "args.type": a.currentTarget.dataset.type
        })) : (t[i].checked = !1, this.setData({
            radios: t
        }));
    },
    changeinput: function(a) {
        var t = a.detail.value, e = a.target.dataset.input, i = this.data.args;
        i[e] = t, this.setData({
            args: i
        });
    },
    bindpullldown: function(a) {
        console.error(a.detail.value);
        var t = a.detail.value, e = this.data.msg.banklist;
        this.data.args;
        for (var i in e) i == t && this.setData({
            "args.bankname": e[t].bankname,
            index: t
        });
    },
    submit: function() {
        var a = "", i = this.data.args;
        if (0 == i.type) a = "余额"; else if (1 == i.type) a = "微信钱包"; else if (2 == i.type) {
            if (a = "支付宝", !i.realname) return void e.toast(this, "请输入姓名");
            if (!i.alipay) return void e.toast(this, "请输入支付宝账号");
            if (!i.alipay1) return void e.toast(this, "请输入支付宝确认账号");
            if (i.alipay != i.alipay1) return void e.toast(this, "支付宝账号不一致");
        } else if (3 == i.type) {
            if (a = "银行卡", !i.realname1) return void e.toast(this, "请输入姓名");
            if (!i.bankname) return void e.toast(this, "请选择银行");
            if (!i.bankcard) return void e.toast(this, "请输入银行卡账号");
            if (!i.bankcard1) return void e.toast(this, "请输入银行卡确认账号");
            if (i.bankcard != i.bankcard1) return void e.toast(this, "银行卡账号不一致");
            i.realname = i.realname1;
        }
        wx.showModal({
            title: "提示",
            content: "确认提现到" + a + "吗？",
            success: function(a) {
                a.confirm && t.post("dividend/apply", i, function(a) {
                    wx.navigateBack({
                        detail: 1
                    });
                });
            }
        });
    }
});