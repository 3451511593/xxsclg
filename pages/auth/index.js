var e = getApp(), n = require("../../utils/core.js");

Page({
    data: {
        shop_logo: "",
        shop_name: ""
    },
    onLoad: function(e) {
        var o = this;
        n.get("wxAppSetting", {}, function(e) {
            var n = e.sysset;
            o.setData({
                shop_logo: n.shoplogo,
                shop_name: n.shopname
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindGetUserInfo: function(o) {
        wx.showLoading({
            title: "加载中"
        }), wx.login({
            success: function(t) {
                n.post("wxapp/login", {
                    code: t.code
                }, function(t) {
                    t.error ? n.alert("获取用户登录态失败:" + t.message) : n.get("wxapp/auth", {
                        data: o.detail.encryptedData,
                        iv: o.detail.iv,
                        sessionKey: t.session_key
                    }, function(n) {
                        1 == n.isblack && wx.showModal({
                            title: "无法访问",
                            content: "您在商城的黑名单中，无权访问！",
                            success: function(n) {
                                n.confirm && e.close(), n.cancel && e.close();
                            }
                        }), o.detail.userInfo.openid = n.openId, o.detail.userInfo.id = n.id, o.detail.userInfo.uniacid = n.uniacid, 
                        e.setCache("userinfo", o.detail.userInfo), e.setCache("userinfo_openid", o.detail.userInfo.openid), 
                        e.setCache("userinfo_id", n.id), e.getSet(), wx.navigateBack({
                            changed: !0
                        });
                    });
                });
            },
            fail: function() {
                n.alert("获取用户信息失败!");
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    navigateBack: function() {
        wx.navigateBack({
            changed: !0
        });
    },
    close: function() {
        wx.navigateBack({
            delta: 0
        });
    }
});