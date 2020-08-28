var t, a, e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), i = getApp(), s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"), o = i.requirejs("biz/diypage"), r = i.requirejs("biz/diyform"), d = i.requirejs("biz/goodspicker"), u = (i.requirejs("foxui"), 
i.requirejs("jquery"));

Page((a = {
    onPullDownRefresh: function() {
        var t = this;
        o.get(this, "home", function(a) {
            t.getDiypage(a), 0 == a.error && wx.stopPullDownRefresh();
        });
    },
    data: (t = {
        imgUrls: [ "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963648306&di=1194f5980cccf9e5ad558dfb18e895ab&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de87bbdad39ceef01f3a29797f.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963737453&di=b1472a710a2c9ba30808fd6823b16feb&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fwenwen%2Fuploads%2Fpic.wenwen.soso.com%2Fp%2F20160830%2F20160830220016-586751007.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3004162400,3684436606&fm=11&gp=0.jpg" ],
        indicatorDotss: !0,
        autoplays: !0,
        intervals: 2e3,
        durations: 500,
        circulars: !0,
        adveradmin: !0,
        current: 0,
        clock: "",
        diypage: "true",
        route: "home",
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
    (0, e.default)(t, "closeBtn", !1), (0, e.default)(t, "soundpic", !1), (0, e.default)(t, "sound", !0), 
    (0, e.default)(t, "modelShow", !1), (0, e.default)(t, "limits", !0), (0, e.default)(t, "result", {}), 
    (0, e.default)(t, "showcoupon", !1), (0, e.default)(t, "showcoupontips", !1), (0, 
    e.default)(t, "topmenu", {}), (0, e.default)(t, "topmenuDataType", ""), (0, e.default)(t, "tabbarData", {}), 
    (0, e.default)(t, "tabbarDataType", ""), (0, e.default)(t, "istopmenu", !1), (0, 
    e.default)(t, "seckillinfo", {}), (0, e.default)(t, "timer", 0), (0, e.default)(t, "lasttime", 0), 
    (0, e.default)(t, "hour", "-"), (0, e.default)(t, "min", "-"), (0, e.default)(t, "sec", "-"), 
    t),
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
    onLoad: function(t) {
        wx.hideTabBar({}), t = t || {};
        var a = this;
        a.setData({
            imgUrl: i.globalData.approot
        }), s.get("black", {}, function(t) {
            t.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function(t) {
                    t.confirm && a.close(), t.cancel && a.close();
                }
            });
        });
        var e = decodeURIComponent(t.scene);
        if (!t.id && e) {
            var n = s.str2Obj(e);
            t.id = n.id, n.mid && (t.mid = n.mid, i.setCache("usermid", n));
        }
        setTimeout(function() {
            a.setData({
                areas: i.getCache("cacheset").areas
            });
        }, 3e3), i.url(t), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? a.diypageGet() : s.get("wxAppSetting", {}, function(t) {
                    t.sysset.force_auth, a.diypageGet();
                });
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
    diypageGet: function() {
        var t = this;
        o.get(this, "home", function(a) {
            if (console.log(a), wx.showTabBar({}), t.getDiypage(a), null != t.data.startadv && "" != t.data.startadv) {
                0 != t.data.startadv.status && "" != t.data.startadv || wx.getSetting({
                    success: function(a) {
                        a.authSetting["scope.userInfo"] && t.get_nopayorder();
                    }
                });
                var e = t.data.startadv.params;
                if ("default" == e.style) {
                    var s = e.autoclose;
                    !function a(e) {
                        t.setData({
                            clock: s
                        }), s <= 0 ? t.setData({
                            adveradmin: !1
                        }) : setTimeout(function() {
                            s -= 1, a(e);
                        }, 1e3);
                    }(t);
                }
                if (1 == e.showtype) {
                    var n = 1e3 * e.showtime * 60, o = i.getCache("startadvtime"), r = +new Date(), d = !0;
                    t.setData({
                        adveradmin: !0
                    }), o && r - o < n && (d = !1), t.setData({
                        adveradmin: d
                    }), d && i.setCache("startadvtime", r);
                }
                t.data.startadv.status;
            }
        });
    },
    onHide: function() {
        this.setData({
            adveradmin: !1,
            unpaid: !1
        });
    },
    onShow: function() {
        var t = this, a = wx.getSystemInfoSync(), e = i.getCache("sysset");
        t.getShop(), t.getRecommand(), t.get_hasnewcoupon(), t.get_cpinfos(), wx.getSetting({
            success: function(a) {
                var e = a.authSetting["scope.userInfo"];
                t.setData({
                    limits: e
                });
            }
        });
        var s = e.shopname || "商城首页";
        t.data.pages && "" != t.data.pages.title && (s = t.data.diytitle), wx.setNavigationBarTitle({
            title: s
        }), t.data.pages && wx.setNavigationBarColor({
            frontColor: t.data.pages.titlebarcolor,
            backgroundColor: t.data.pages.titlebarbg
        }), t.setData({
            screenWidth: a.windowWidth
        });
    },
    goodsicon: function(t) {
        this.setData({
            iconheight: t.detail.height,
            iconwidth: t.detail.width
        });
    },
    getDiypage: function(t) {
        var a = this;
        u.each(t.diypage.items, function(t, e) {
            if ("topmenu" == e.id) if (a.setData({
                topmenu: e
            }), null == e.data[0]) var i = ""; else {
                i = e.data[0].linkurl;
                s.get("diypage/getInfo", {
                    dataurl: i
                }, function(t) {
                    e.data[0].data = t.goods.list;
                });
            }
            if ("seckillgroup" == e.id) {
                var n = {};
                n.status = e.data.status, n.endtime = e.data.endtime, n.starttime = e.data.starttime, 
                a.initSeckill(n);
            }
        });
    },
    onShareAppMessage: function() {
        var t = null, a = null;
        return this.data.diytitle && (t = "/pages/index/index", a = this.data.diytitle), 
        s.onShareAppMessage(t, a);
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
            url: a,
            fail: function() {
                wx.switchTab({
                    url: a
                });
            }
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
                d.selectpicker(t, a, "goodslist"), a.setData({
                    cover: "",
                    showvideo: !1
                });
            }
        }
    });
}), (0, e.default)(a, "chooseGift", function(t) {
    d.chooseGift(t, this);
}), (0, e.default)(a, "specsTap", function(t) {
    d.specsTap(t, this);
}), (0, e.default)(a, "emptyActive", function() {
    this.setData({
        active: "",
        slider: "out",
        tempname: "",
        specsTitle: ""
    });
}), (0, e.default)(a, "buyNow", function(t) {
    d.buyNow(t, this);
}), (0, e.default)(a, "getCart", function(t) {
    d.getCart(t, this);
}), (0, e.default)(a, "select", function() {
    d.select(this);
}), (0, e.default)(a, "inputNumber", function(t) {
    d.inputNumber(t, this);
}), (0, e.default)(a, "number", function(t) {
    d.number(t, this);
}), (0, e.default)(a, "onChange", function(t) {
    return r.onChange(this, t);
}), (0, e.default)(a, "DiyFormHandler", function(t) {
    return r.DiyFormHandler(this, t);
}), (0, e.default)(a, "selectArea", function(t) {
    return r.selectArea(this, t);
}), (0, e.default)(a, "bindChange", function(t) {
    return r.bindChange(this, t);
}), (0, e.default)(a, "onCancel", function(t) {
    return r.onCancel(this, t);
}), (0, e.default)(a, "onConfirm", function(t) {
    return r.onConfirm(this, t);
}), (0, e.default)(a, "getIndex", function(t, a) {
    return r.getIndex(t, a);
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
        fail: function() {
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
}), (0, e.default)(a, "tabtopmenu", function(t) {
    var a = this, e = a.data.diypages, i = (e.items, t.currentTarget.dataset.id, t.currentTarget.dataset.url), n = t.currentTarget.dataset.type, o = a.data.topmenu, r = t.currentTarget.dataset.index;
    if (a.setData({
        topmenuindex: r
    }), "m0" == t.currentTarget.id && "" == i && s.get("diypage", {
        type: "home"
    }, function(t) {
        var e = t.diypage;
        u.each(e.items, function(t, a) {
            "topmenu" == a.id && (a.status = n);
        }), 0 == t.error && a.setData({
            diypages: t.diypage
        });
    }), "" != i && null != i) {
        if (1 == i.indexOf("pages")) {
            var d = i.lastIndexOf("="), c = i.substring(d + 1, i.length);
            s.get("diypage", {
                id: c
            }, function(t) {
                if (0 == t.error) {
                    var e = [];
                    for (var i in t.diypage.items) e.push(t.diypage.items[i]);
                    e.unshift(o);
                    var s = new Object();
                    for (var r in e) s[r] = e[r], "topmenu" == e[r].id && (e[r].status = n);
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
                type: "home"
            }, function(e) {
                var i = e.diypage;
                u.each(i.items, function(a, e) {
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
        for (var s in e.items) if (s == i) {
            e.items[s].data[o].data = t.goods.list, e.items[s].data[o].type = t.type, e.items[s].type = t.type, 
            e.items[s].status = o, t.goods.list.length <= 8 && (e.items[s].data[o].showmore = !0);
            a.setData({
                diypages: e
            });
        }
    });
}), (0, e.default)(a, "getstoremore", function(t) {
    var a = this, e = t.currentTarget.dataset.id, i = a.data.diypages;
    u.each(i.items, function(t, n) {
        if (t == e) if (null == n.status || "" == n.status) {
            if (-1 != n.data[0].linkurl.indexOf("stores")) var o = "stores"; else o = "goods";
            var r = n.data[0].linkurl, d = n.data[0].data.length;
            s.get("diypage/getInfo", {
                dataurl: r,
                num: d,
                paramsType: o
            }, function(t) {
                n.data[0].data = t.goods.list, n.data[0].data.length == t.goods.count && (n.data[0].showmore = !0), 
                a.setData({
                    diypages: i
                });
            });
        } else {
            if (-1 != n.data[n.status].linkurl.indexOf("stores")) o = "stores"; else o = "goods";
            r = n.data[n.status].linkurl, d = n.data[n.status].data.length;
            s.get("diypage/getInfo", {
                dataurl: r,
                num: d,
                paramsType: o
            }, function(t) {
                n.data[n.status].data = t.goods.list, n.data[n.status].data.length == t.goods.count && (n.data[n.status].showmore = !0), 
                a.setData({
                    diypages: i
                });
            });
        }
    });
}), (0, e.default)(a, "close", function() {
    i.globalData.flag = !0, wx.reLaunch({
        url: "../index/index"
    });
}), (0, e.default)(a, "initSeckill", function(t) {
    var a = this, e = parseInt(t.status), s = t.starttime, n = t.endtime;
    if (-1 != e) {
        var o = 0, r = 0, d = i.globalData.approot;
        wx.request({
            url: d + "timer.php",
            success: function(i) {
                var d = i.data;
                o = 0 == e ? n - d : s - d, a.setData({
                    lasttime: o
                }), clearInterval(a.data.timer), a.setTimer(t), r = a.setTimerInterval(t), a.setData({
                    timer: r
                });
            }
        });
    }
}), (0, e.default)(a, "setTimer", function(t) {
    var a = this, e = 0;
    if (-1 != t.status && parseInt(a.data.lasttime) % 10 == 0) {
        var s = i.globalData.approot;
        wx.request({
            url: s + "timer.php",
            success: function(i) {
                var s = i.data;
                e = 0 == t.status ? t.endtime - s : t.starttime - s, a.setData({
                    lasttime: e
                });
            }
        });
    }
    e = parseInt(a.data.lasttime) - 1;
    var n = a.formatSeconds(e);
    a.setData({
        lasttime: e,
        hour: n.hour,
        min: n.min,
        sec: n.sec
    }), e <= 0 && a.onLoad();
}), (0, e.default)(a, "setTimerInterval", function(t) {
    var a = this;
    return setInterval(function() {
        a.setTimer(t);
    }, 1e3);
}), (0, e.default)(a, "formatSeconds", function(t) {
    var a = parseInt(t), e = 0, i = 0;
    return a > 60 && (e = parseInt(a / 60), a = parseInt(a % 60), e > 60 && (i = parseInt(e / 60), 
    e = parseInt(e % 60))), {
        hour: i < 10 ? "0" + i : i,
        min: e < 10 ? "0" + e : e,
        sec: a < 10 ? "0" + a : a
    };
}), (0, e.default)(a, "cutGoods", function(t) {
    var a = t.currentTarget.dataset.type, e = t.currentTarget.dataset.num, i = t.currentTarget.dataset.id, s = this.data.diypages;
    for (var n in s.items) if (n == i) {
        var o = s.items[n].current || 0;
        "advance" == a ? o < e - 1 ? (s.items[n].current = o + 1, this.setData({
            diypages: s
        })) : (s.items[n].current = 0, this.setData({
            diypages: s
        })) : o > 0 ? (s.items[n].current = o - 1, this.setData({
            diypages: s
        })) : (s.items[n].current = e - 1, this.setData({
            diypages: s
        }));
    }
}), a));