var e = getApp(), t = require("./../../../utils/core.js");

Page({
    data: {
        close: 0,
        text: "",
        imgUrl: ""
    },
    onLoad: function(t) {
        this.setData({
            close: t.close,
            text: t.text,
            imgUrl: e.globalData.approot
        });
    },
    onShow: function() {
        var t = e.getCache("sysset").shopname;
        wx.setNavigationBarTitle({
            title: t || "提示"
        });
    },
    bind: function() {
        var e = this, t = setInterval(function() {
            wx.getSetting({
                success: function(n) {
                    var i = n.authSetting["scope.userInfo"];
                    i && (wx.reLaunch({
                        url: "/pages/index/index"
                    }), clearInterval(t), e.setData({
                        userInfo: i
                    }));
                }
            });
        }, 1e3);
    },
    bindGetUserInfo: function(n) {
        var i = e.getCache("routeData"), a = i.url, o = i.params, s = "";
        Object.keys(o).forEach(function(e) {
            s += e + "=" + o[e] + "&";
        });
        var c = "/" + a + "?" + (o = s.substring(0, s.length - 1));
        wx.login({
            success: function(i) {
                t.post("wxapp/login", {
                    code: i.code
                }, function(i) {
                    i.error ? t.alert("获取用户登录态失败:" + i.message) : t.get("wxapp/auth", {
                        data: n.detail.encryptedData,
                        iv: n.detail.iv,
                        sessionKey: i.session_key
                    }, function(t) {
                        console.log(t), 1 == t.isblack && wx.showModal({
                            title: "无法访问",
                            content: "您在商城的黑名单中，无权访问！",
                            success: function(t) {
                                t.confirm && e.close(), t.cancel && e.close();
                            }
                        }), n.detail.userInfo.openid = t.openId, n.detail.userInfo.id = t.id, n.detail.userInfo.uniacid = t.uniacid, 
                        e.setCache("userinfo", n.detail.userInfo), e.setCache("userinfo_openid", n.detail.userInfo.openid), 
                        e.setCache("userinfo_id", t.id), e.getSet(), wx.reLaunch({
                            url: c
                        });
                    });
                });
            },
            fail: function() {
                t.alert("获取用户信息失败!");
            }
        });
    },
    cancelLogin: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    }
});