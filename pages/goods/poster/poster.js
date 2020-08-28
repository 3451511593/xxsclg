var t = getApp(), e = t.requirejs("core"), s = t.requirejs("foxui");

Page({
    data: {
        show: !1,
        accredit: "",
        errMsg: "",
        Image: ""
    },
    onLoad: function(t) {
        (t = t || {}).id ? this.getImage(t.id) : wx.redirectTo({
            url: "/pages/goods/index/index"
        });
    },
    getImage: function(t) {
        var o = this;
        e.json("goods/poster/getimage", {
            id: t
        }, function(t) {
            0 != t.error ? s.toast(o, t.message) : o.setData({
                Image: t.url
            });
        });
    },
    loadImg: function(t) {
        this.setData({
            show: !0
        });
    },
    previewImage: function() {
        wx.previewImage({
            current: this.data.Image,
            urls: [ this.data.Image ]
        });
    },
    savePicture: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.writePhotosAlbum"] ? (wx.showLoading({
                    title: "图片下载中..."
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), wx.downloadFile({
                    url: t.data.Image,
                    success: function(e) {
                        wx.saveImageToPhotosAlbum({
                            filePath: e.tempFilePath,
                            success: function(e) {
                                s.toast(t, "保存图片成功");
                            },
                            fail: function(e) {
                                t.setData({
                                    errMsg: e.errMsg
                                }), s.toast(t, "保存图片失败");
                            }
                        });
                    }
                })) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        wx.showLoading({
                            title: "图片下载中..."
                        }), setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3), wx.downloadFile({
                            url: t.data.Image,
                            success: function(e) {
                                wx.saveImageToPhotosAlbum({
                                    filePath: e.tempFilePath,
                                    success: function(e) {
                                        s.toast(t, "保存图片成功");
                                    },
                                    fail: function(e) {
                                        t.setData({
                                            errMsg: e.errMsg
                                        }), s.toast(t, "保存图片失败");
                                    }
                                });
                            }
                        });
                    },
                    fail: function() {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权，将无法正常使用保存图片或视频的功能体验，请删除小程序重新进入。"
                        });
                    }
                });
            }
        });
    }
});