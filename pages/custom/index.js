var t, a, e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), i = getApp(), s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"), o = i.requirejs("biz/diypage"), d = i.requirejs("biz/diyform"), u = i.requirejs("biz/goodspicker"), r = (i.requirejs("foxui"), 
i.requirejs("jquery"));

Page((a = {
    data: (t = {
        imgUrls: [ "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963648306&di=1194f5980cccf9e5ad558dfb18e895ab&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de87bbdad39ceef01f3a29797f.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963737453&di=b1472a710a2c9ba30808fd6823b16feb&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fwenwen%2Fuploads%2Fpic.wenwen.soso.com%2Fp%2F20160830%2F20160830220016-586751007.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3004162400,3684436606&fm=11&gp=0.jpg" ],
        indicatorDotss: !0,
        autoplays: !0,
        intervals: 2e3,
        durations: 500,
        circulars: !0,
        adveradmin: !0,
        clock: "",
        diypage: "true",
        route: "custom",
        icons: i.requirejs("icons"),
        shop: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        storeRecommand: [],
        total: 1,
        page: 1,
        loaded: !1,
        loading: !0,
        indicatorDotsHot: !1,
        autoplayHot: !0,
        intervalHot: 5e3,
        durationHOt: 1e3,
        circularHot: !0,
        hotimg: "/static/images/hotdot.jpg",
        notification: "/static/images/notification.png",
        saleout1: "/static/images/saleout-1.png",
        saleout2: "/static/images/saleout-2.png",
        saleout3: "/static/images/saleout-3.png",
        play: "/static/images/video_play.png",
        mute: "/static/images/icon/mute.png",
        voice: "/static/images/icon/voice.png",
        specs: [],
        options: [],
        diyform: {},
        specsTitle: ""
    }, (0, e.default)(t, "total", 1), (0, e.default)(t, "active", ""), (0, e.default)(t, "slider", ""), 
    (0, e.default)(t, "tempname", ""), (0, e.default)(t, "buyType", ""), (0, e.default)(t, "areas", []), 
    (0, e.default)(t, "closeBtn", !1), (0, e.default)(t, "soundpic", !0), (0, e.default)(t, "modelShow", !1), 
    (0, e.default)(t, "limits", !0), (0, e.default)(t, "result", {}), (0, e.default)(t, "audios", {}), 
    (0, e.default)(t, "audiosObj", {}), (0, e.default)(t, "picture", {}), (0, e.default)(t, "result", {}), 
    (0, e.default)(t, "pageid", 0), t),
    onShow: function() {
        var t = this, a = wx.getSystemInfoSync(), e = t.data.pageid;
        s.get("diypage&id=" + e, {}, function(a) {
            var e = {
                loading: !1,
                diypage: a.diypage
            };
            t.setData(e);
        }), t.setData({
            screenWidth: a.windowWidth
        });
    },
    onLoad: function(t) {
        t = t || {};
        var a = this;
        a.pauseOther();
        var e = t.pageid;
        if (null == e) {
            var n = getCurrentPages(), d = n[n.length - 1].route.split("/");
            e = d[d.length - 1];
        }
        a.setData({
            pageid: e,
            imgUrl: i.globalData.approot
        });
        var u = decodeURIComponent(t.scene);
        if (!t.id && u) {
            var r = s.str2Obj(u);
            t.id = r.id, r.mid && (t.mid = r.mid);
        }
        setTimeout(function() {
            a.setData({
                areas: i.getCache("cacheset").areas
            });
        }, 3e3), i.url(t), o.get(this, e, function(t) {
            if (null != a.data.startadv && "" != a.data.startadv) {
                0 != a.data.startadv.status && "" != a.data.startadv || wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"];
                    }
                });
                var e = a.data.startadv.params;
                if ("default" == e.style) {
                    var s = e.autoclose;
                    !function t(e) {
                        a.setData({
                            clock: s
                        }), s <= 0 ? a.setData({
                            adveradmin: !1
                        }) : setTimeout(function() {
                            s -= 1, t(e);
                        }, 1e3);
                    }(a);
                }
                if (1 == e.showtype) {
                    var n = 1e3 * e.showtime * 60, o = i.getCache("startadvtime"), d = +new Date(), u = !0;
                    a.setData({
                        adveradmin: !0
                    }), o && d - o < n && (u = !1), a.setData({
                        adveradmin: u
                    }), u && i.setCache("startadvtime", d);
                }
                a.data.startadv.status;
            }
        }), a.setData({
            cover: !0,
            showvideo: !1
        }), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowWidth / 1.7;
                a.setData({
                    swiperheight: e
                });
            }
        });
    },
    getShop: function() {
        var t = this;
        s.get("shop/get_shopindex", {}, function(a) {
            n.wxParse("wxParseData", "html", a.copyright, t, "5"), t.setData({
                shop: a
            });
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand();
    },
    getRecommand: function() {
        var t = this;
        "true" != t.data.diypage && s.get("shop/get_recommand", {
            page: t.data.page
        }, function(a) {
            var e = {
                loading: !1,
                total: a.total
            };
            t.setData({
                loading: !1,
                total: a.total,
                show: !0
            }), a.list || (a.list = []), a.list.length > 0 && (t.setData({
                storeRecommand: t.data.storeRecommand.concat(a.list),
                page: a.page + 1
            }), a.list.length < a.pagesize && (e.loaded = !0));
        });
    },
    imagesHeight: function(t) {
        var a = t.detail.width, e = t.detail.height, i = t.target.dataset.type, s = this;
        wx.getSystemInfo({
            success: function(t) {
                s.data.result[i] = t.windowWidth / a * e, (!s.data[i] || s.data[i] && result[i] < s.data[i]) && s.setData({
                    result: s.data.result
                });
            }
        });
    },
    bindInput: function(t) {
        this.setData({
            inputValue: t.detail.value
        });
    },
    t1: function(t) {
        o.fixedsearch(this, t);
    },
    startplay: function(t) {
        var a = t.target.dataset.cover;
        this.setData({
            cover: a,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("Video"), this.videoContext.play();
    },
    unpaidcolse: function(t) {
        var a = "";
        a = "open" == t.target.dataset.type, this.setData({
            unpaid: a
        });
    },
    unpaidcolse2: function(t) {
        this.setData({
            unpaidhide: !0
        });
    },
    get_nopayorder: function() {
        var t = this;
        s.get("shop/get_nopayorder", {}, function(a) {
            1 == a.hasinfo && t.setData({
                nopaygoods: a.goods,
                nopaygoodstotal: a.goodstotal,
                nopayorder: a.order,
                unpaid: !0
            });
        });
    },
    get_hasnewcoupon: function() {
        var t = this;
        s.get("shop/get_hasnewcoupon", {}, function(a) {
            1 == a.hasnewcoupon && t.setData({
                showcoupontips: !0
            });
        });
    },
    get_cpinfos: function() {
        var t = this;
        s.get("shop/get_cpinfos", {}, function(a) {
            1 == a.hascpinfos && t.setData({
                showcoupon: !0,
                cpinfos: a.cpinfos
            });
        });
    },
    adverclose: function() {
        this.setData({
            adveradmin: !1
        }), this.get_nopayorder();
    },
    indexChangebtn: function(t) {
        var a = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: a
        });
    }
}, (0, e.default)(a, "unpaidcolse", function(t) {
    var a = "";
    a = "open" == t.target.dataset.type, this.setData({
        unpaid: a
    });
}), (0, e.default)(a, "unpaidcolse2", function(t) {
    this.setData({
        unpaidhide: !0
    });
}), (0, e.default)(a, "selectPicker", function(t) {
    i.checkAuth();
    var a = this;
    wx.getSetting({
        success: function(e) {
            if (e.authSetting["scope.userInfo"]) {
                u.selectpicker(t, a, "goodslist"), a.setData({
                    cover: "",
                    showvideo: !1
                });
            }
        }
    });
}), (0, e.default)(a, "specsTap", function(t) {
    u.specsTap(t, this);
}), (0, e.default)(a, "emptyActive", function() {
    this.setData({
        active: "",
        slider: "out",
        tempname: "",
        specsTitle: ""
    });
}), (0, e.default)(a, "buyNow", function(t) {
    u.buyNow(t, this);
}), (0, e.default)(a, "getCart", function(t) {
    u.getCart(t, this);
}), (0, e.default)(a, "select", function() {
    u.select(this);
}), (0, e.default)(a, "inputNumber", function(t) {
    u.inputNumber(t, this);
}), (0, e.default)(a, "number", function(t) {
    u.number(t, this);
}), (0, e.default)(a, "onChange", function(t) {
    return d.onChange(this, t);
}), (0, e.default)(a, "DiyFormHandler", function(t) {
    return d.DiyFormHandler(this, t);
}), (0, e.default)(a, "selectArea", function(t) {
    return d.selectArea(this, t);
}), (0, e.default)(a, "bindChange", function(t) {
    return d.bindChange(this, t);
}), (0, e.default)(a, "onCancel", function(t) {
    return d.onCancel(this, t);
}), (0, e.default)(a, "onConfirm", function(t) {
    return d.onConfirm(this, t);
}), (0, e.default)(a, "getIndex", function(t, a) {
    return d.getIndex(t, a);
}), (0, e.default)(a, "changevoice", function() {
    this.data.sound ? this.setData({
        sound: !1,
        soundpic: !0
    }) : this.setData({
        sound: !0,
        soundpic: !1
    });
}), (0, e.default)(a, "phone", function() {
    var t = this.data.phonenumber + "";
    wx.makePhoneCall({
        phoneNumber: t
    });
}), (0, e.default)(a, "cancelclick", function() {
    this.setData({
        modelShow: !1
    });
}), (0, e.default)(a, "confirmclick", function() {
    this.setData({
        modelShow: !1
    }), wx.openSetting({
        success: function(t) {}
    });
}), (0, e.default)(a, "navigate", function(t) {
    var a = t.currentTarget.dataset.url, e = t.currentTarget.dataset.phone, i = t.currentTarget.dataset.appid, s = t.currentTarget.dataset.appurl;
    a && wx.navigateTo({
        url: a,
        fail: function(t) {
            wx.switchTab({
                url: a
            });
        }
    }), e && wx.makePhoneCall({
        phoneNumber: e
    }), i && wx.navigateToMiniProgram({
        appId: i,
        path: s
    });
}), (0, e.default)(a, "closecoupon", function() {
    this.setData({
        showcoupon: !1
    });
}), (0, e.default)(a, "closecoupontips", function() {
    this.setData({
        showcoupontips: !1
    });
}), (0, e.default)(a, "onReady", function(t) {}), (0, e.default)(a, "pauseOther", function(t) {
    var a = this;
    r.each(this.data.audiosObj, function(e, i) {
        if (e != t) {
            i.pause();
            var s = a.data.audios;
            s[e] && (s[e].status = !1, a.setData({
                audios: s
            }));
        }
    });
}), (0, e.default)(a, "play", function(t) {
    var a = t.target.dataset.id, e = this.data.audiosObj[a] || !1;
    if (!e) {
        e = wx.createInnerAudioContext("audio_" + a);
        var i = this.data.audiosObj;
        i[a] = e, this.setData({
            audiosObj: i
        });
    }
    var s = this;
    e.onPlay(function() {
        var t = setInterval(function() {
            var i = e.currentTime / e.duration * 100 + "%", n = Math.floor(Math.ceil(e.currentTime) / 60), o = (Math.ceil(e.currentTime) % 60 / 100).toFixed(2).slice(-2), d = Math.ceil(e.currentTime);
            n < 10 && (n = "0" + n);
            var u = n + ":" + o, r = s.data.audios;
            r[a].audiowidth = i, r[a].Time = t, r[a].audiotime = u, r[a].seconds = d, s.setData({
                audios: r
            });
        }, 1e3);
    });
    var n = t.currentTarget.dataset.audio, o = t.currentTarget.dataset.time, d = t.currentTarget.dataset.pausestop, u = t.currentTarget.dataset.loopplay;
    0 == u && e.onEnded(function(t) {
        r[a].status = !1, s.setData({
            audios: r
        });
    });
    var r = s.data.audios;
    r[a] || (r[a] = {}), e.paused && 0 == o ? (e.src = n, e.play(), 1 == u && (e.loop = !0), 
    r[a].status = !0, s.pauseOther(a)) : e.paused && o > 0 ? (e.play(), 0 == d ? e.seek(o) : e.seek(0), 
    r[a].status = !0, s.pauseOther(a)) : (e.pause(), r[a].status = !1), s.setData({
        audios: r
    });
}), (0, e.default)(a, "imagesHeight", function(t) {
    var a = t.detail.width, e = t.detail.height, i = t.target.dataset.type, s = this;
    wx.getSystemInfo({
        success: function(t) {
            s.data.result[i] = t.windowWidth / a * e, (!s.data[i] || s.data[i] && result[i] < s.data[i]) && s.setData({
                result: s.data.result
            });
        }
    });
}), (0, e.default)(a, "onHide", function() {
    this.pauseOther();
}), (0, e.default)(a, "onUnload", function() {
    this.pauseOther();
}), (0, e.default)(a, "onPullDownRefresh", function() {}), (0, e.default)(a, "onReachBottom", function() {}), 
(0, e.default)(a, "onShareAppMessage", function() {
    return {
        title: this.data.diypages.page.title
    };
}), (0, e.default)(a, "tabtopmenu", function(t) {
    var a = this, e = a.data.diypages, i = (e.items, t.currentTarget.dataset.id, t.currentTarget.dataset.url), n = t.currentTarget.dataset.type, o = a.data.topmenu, d = t.currentTarget.dataset.index;
    if (c = a.data.pageid, a.setData({
        topmenuindex: d
    }), "" != i && null != i) {
        if (1 == i.indexOf("pages")) {
            var u = i.lastIndexOf("="), c = i.substring(u + 1, i.length);
            s.get("diypage", {
                id: c
            }, function(t) {
                if (0 == t.error) {
                    var e = [];
                    for (var i in t.diypage.items) e.push(t.diypage.items[i]);
                    e.unshift(o);
                    var s = new Object();
                    for (var d in e) s[d] = e[d], "topmenu" == e[d].id && (e[d].status = n);
                    t.diypage.items = s, a.setData({
                        diypages: t.diypage,
                        topmenuDataType: ""
                    });
                }
            });
        } else s.get("diypage/getInfo", {
            dataurl: i
        }, function(t) {
            a.data.topmenu;
            s.get("diypage", {
                type: c
            }, function(e) {
                var i = e.diypage;
                r.each(i.items, function(a, e) {
                    if ("topmenu" == e.id) for (var i in e.status = n, e.data) i == n && (e.data[i].data = t.goods.list, 
                    t.goods.list.length <= 8 && (e.data[i].showmore = !0));
                }), 0 == e.error && a.setData({
                    diypages: e.diypage,
                    topmenuDataType: t.type
                });
            });
        });
        a.setData({
            diypages: e
        });
    }
}), (0, e.default)(a, "tabwidget", function(t) {
    var a = this, e = a.data.diypages, i = (e.items, t.currentTarget.dataset.id), n = t.currentTarget.dataset.url, o = t.currentTarget.dataset.type;
    "" != n && null != n && s.get("diypage/getInfo", {
        dataurl: n
    }, function(t) {
        for (var s in e.items) s == i && (e.items[s].data[o].data = t.goods.list, e.items[s].data[o].type = t.type, 
        e.items[s].type = t.type, e.items[s].status = o, t.goods.list.length <= 8 && (e.items[s].data[o].showmore = !0), 
        a.setData({
            diypages: e
        }));
    });
}), (0, e.default)(a, "getstoremore", function(t) {
    var a = this, e = t.currentTarget.dataset.id, i = a.data.diypages;
    r.each(i.items, function(t, n) {
        if (t == e) if (null == n.status || "" == n.status) {
            if (-1 != n.data[0].linkurl.indexOf("stores")) var o = "stores"; else o = "goods";
            var d = n.data[0].linkurl, u = n.data[0].data.length;
            s.get("diypage/getInfo", {
                dataurl: d,
                num: u,
                paramsType: o
            }, function(t) {
                n.data[0].data = t.goods.list, n.data[0].data.length == t.goods.count && (n.data[0].showmore = !0), 
                a.setData({
                    diypages: i
                });
            });
        } else {
            if (-1 != n.data[n.status].linkurl.indexOf("stores")) o = "stores"; else o = "goods";
            d = n.data[n.status].linkurl, u = n.data[n.status].data.length;
            s.get("diypage/getInfo", {
                dataurl: d,
                num: u,
                paramsType: o
            }, function(t) {
                n.data[n.status].data = t.goods.list, n.data[n.status].data.length == t.goods.count && (n.data[n.status].showmore = !0), 
                a.setData({
                    diypages: i
                });
            });
        }
    });
}), a));