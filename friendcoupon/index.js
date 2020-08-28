var t = getApp(), i = t.requirejs("/core"), a = t.requirejs("foxui");

t.requirejs("jquery");

Page({
    data: {
        activity_setting: {},
        shareid: "",
        id: "",
        share_id: "",
        time: [ "00", "00", "00", "00" ],
        listlength: !1,
        pindex: 6
    },
    onLoad: function(i) {
        t.url(i);
        i.share_id && this.setData({
            share_id: i.share_id
        }), i.id && this.setData({
            id: i.id
        }), this.getList();
    },
    getCoupon: function(e) {
        var s = this;
        if (!s.data.isGet) {
            var r = {
                id: s.data.id,
                share_id: s.data.share_id,
                form_id: e.detail.formId
            };
            s.data.isLogin ? (s.setData({
                isGet: !0
            }), i.get("friendcoupon/receive", r, function(t) {
                0 == t.error ? (a.toast(s, "领取成功"), s.getList(), s.setData({
                    isGet: !1
                })) : s.setData({
                    invalidMessage: t.message.replace("<br>", "\n"),
                    isGet: !1
                });
            })) : t.checkAuth();
        }
    },
    carve: function(e) {
        var s = this, r = {
            id: s.data.id,
            share_id: s.data.share_id,
            form_id: e.detail.formId
        };
        s.data.isLogin ? i.get("friendcoupon/divide", r, function(t) {
            t.error, a.toast(s, t.message), s.getList();
        }) : t.checkAuth();
    },
    mycoupon: function() {
        this.setData({
            id: this.data.data.currentActivityInfo.activity_id,
            share_id: this.data.data.currentActivityInfo.headerid
        }), this.getList();
    },
    onShareAppMessage: function(t) {
        var a = this.data.data.activitySetting.title, e = "/friendcoupon/index?share_id=" + this.data.shareid + "&id=" + this.data.id;
        return i.onShareAppMessage(e, a);
    },
    more: function() {
        var t = this, e = t.data.activityList;
        i.get("friendcoupon/more", {
            id: t.data.id,
            share_id: t.data.shareid,
            pindex: t.data.pindex
        }, function(i) {
            0 === i.result.list.length ? a.toast(t, "没有更多了") : t.setData({
                activityList: e.concat(i.result.list),
                pindex: t.data.pindex + 10
            });
        });
    },
    getList: function() {
        var t = this;
        i.get("friendcoupon", {
            id: t.data.id,
            share_id: t.data.share_id
        }, function(e) {
            if (0 == e.error) {
                if (e.currentActivityInfo && (e.currentActivityInfo.enough = Number(e.currentActivityInfo.enough)), 
                "string" == typeof e.activitySetting.desc && t.setData({
                    isArray: !0
                }), t.setData({
                    activityData: e.activityData,
                    activityList: e.activityData.length > 5 ? e.activityData.slice(0, 5) : e.activityData,
                    data: e,
                    isLogin: e.isLogin,
                    mylink: e.mylink,
                    invalidMessage: e.invalidMessage,
                    shareid: e.currentActivityInfo ? e.currentActivityInfo.headerid : ""
                }), +e.overTime + 3 > Math.round(+new Date() / 1e3)) var s = setInterval(function() {
                    t.setData({
                        time: i.countDown(+e.overTime + 3)
                    }), t.data.time || (clearInterval(s), t.getList());
                }, 1e3);
            } else a.toast(t, e.message);
        });
    }
});