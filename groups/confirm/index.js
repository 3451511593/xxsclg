var a = getApp(), t = a.requirejs("core"), e = a.requirejs("jquery"), i = (a.requirejs("foxui"), 
a.requirejs("biz/diyform"));

Page({
    data: {
        options: [],
        data: {},
        api: 0,
        message: "",
        real_name: "",
        mobile: "",
        deduct: !1,
        onFocus: !1,
        isShowText: !0,
        remark: "50字以内（选填）"
    },
    onLoad: function(e) {
        var i = this;
        this.setData({
            options: e
        }), a.getCache("isIpx") ? i.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : i.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), t.get("groups/order/create_order", {
            id: i.data.options.id,
            group_option_id: i.data.options.option_id,
            ladder_id: i.data.options.ladder_id,
            type: i.data.options.type,
            heads: i.data.options.heads,
            teamid: i.data.options.teamid
        }, function(a) {
            if (1 == a.error) return t.alert(a.message), void t.confirm(a.message, function() {
                wx.navigateBack();
            }, function() {
                wx.navigateBack();
            });
            i.setData({
                data: a.data,
                sysset: a.sysset
            }), a.data.address && i.setData({
                aid: a.data.address.id
            }), a.data.fields.length > 0 && i.setData({
                diyform: {
                    f_data: a.data.f_data,
                    fields: a.data.fields
                }
            });
        });
    },
    onShowTextarea: function() {
        "50字以内（选填）" === this.data.remark && this.setData({
            remark: ""
        }), this.setData({
            isShowText: !1,
            onFacus: !0
        });
    },
    onShowText: function(a) {
        var t = a.detail.value;
        "" === t && (t = "50字以内（选填）"), this.setData({
            isShowText: !0,
            onFacus: !1,
            remark: t
        });
    },
    onChange: function(a) {
        return i.onChange(this, a);
    },
    DiyFormHandler: function(a) {
        return i.DiyFormHandler(this, a);
    },
    selectArea: function(a) {
        return i.selectArea(this, a);
    },
    bindChange: function(a) {
        return i.bindChange(this, a);
    },
    onCancel: function(a) {
        return i.onCancel(this, a);
    },
    onConfirm: function(a) {
        i.onConfirm(this, a);
        var t = this.data.pval, e = this.data.areas, d = this.data.areaDetail.detail;
        d.province = e[t[0]].name, d.city = e[t[0]].city[t[1]].name, d.datavalue = e[t[0]].code + " " + e[t[0]].city[t[1]].code, 
        e[t[0]].city[t[1]].area && e[t[0]].city[t[1]].area.length > 0 ? (d.area = e[t[0]].city[t[1]].area[t[2]].name, 
        d.datavalue += " " + e[t[0]].city[t[1]].area[t[2]].code, this.getStreet(e, t)) : d.area = "", 
        d.street = "", this.setData({
            "areaDetail.detail": d,
            streetIndex: 0,
            showPicker: !1
        });
    },
    getIndex: function(a, t) {
        return i.getIndex(a, t);
    },
    clearform: function() {
        var a = this.data.diyform, t = {};
        e.each(a, function(i, d) {
            e.each(d, function(e, i) {
                5 == i.data_type && (a.f_data[i.diy_type].count = 0, a.f_data[i.diy_type].images = [], 
                t[i.diy_type] = a.f_data[i.diy_type]);
            });
        }), a.f_data = t, this.setData({
            diyform: a
        });
    },
    submit: function() {
        var a = this.data.diyform;
        if (null == this.data.diyform) var e = ""; else e = this.data.diyform.f_data;
        if (null != a && !i.verify(this, a)) return void t.alert("请查看是否有未填写的内容");
        t.post("groups/order/create_order", {
            id: this.data.options.id,
            group_option_id: this.data.options.option_id,
            ladder_id: this.data.options.ladder_id,
            type: this.data.options.type,
            heads: this.data.options.heads,
            teamid: this.data.options.teamid,
            aid: this.data.aid,
            message: this.data.message,
            realname: this.data.real_name,
            mobile: this.data.mobile,
            deduct: this.data.deduct,
            diydata: e
        }, function(a) {
            1 != a.error ? wx.navigateTo({
                url: "../pay/index?id=" + a.orderid + "&teamid=" + a.teamid
            }) : t.alert(a.message);
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = a.getCache("orderAddress");
        a.getCache("orderShop");
        t && this.setData({
            "data.address": t,
            aid: t.id
        });
    },
    toggle: function(a) {
        var e = t.pdata(a), i = e.id, d = e.type, o = {};
        o[d] = 0 == i || void 0 === i ? 1 : 0, this.setData(o);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    message: function(a) {
        this.setData({
            message: a.detail.value
        });
    },
    realname: function(a) {
        this.setData({
            real_name: a.detail.value
        });
    },
    mobile: function(a) {
        this.setData({
            mobile: a.detail.value
        });
    },
    dataChange: function(a) {
        var t = this.data.data;
        a.target.id;
        t.deduct = a.detail.value;
        var i = parseFloat(t.price);
        i += t.deduct ? -parseFloat(t.credit.deductprice) : parseFloat(t.credit.deductprice), 
        t.price = i, t.price = e.toFixed(t.price, 2), this.setData({
            data: t,
            deduct: a.detail.value
        });
    }
});