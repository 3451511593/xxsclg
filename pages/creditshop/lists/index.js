var t = getApp(), a = t.requirejs("core");

t.requirejs("jquery");

Page({
    data: {
        page: 1,
        datas: {},
        more: !0,
        load: !0,
        notgoods: !0,
        keywords: "",
        cate: ""
    },
    onLoad: function(t) {
        t.cate && this.setData({
            cate: t.cate
        }), t.keywords && this.setData({
            keywords: t.keywords
        }), this.get_list();
    },
    onPullDownRefresh: function(t) {
        wx.showNavigationBarLoading(), this.get_list(), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
    },
    onReachBottom: function(t) {
        this.setData({
            page: this.data.page + 1,
            load: !1
        }), this.get_list("", !0), this.setData({
            load: !0
        });
    },
    focus: function() {
        this.setData({
            showbtn: "in"
        });
    },
    get_list: function(t, e) {
        var s = this;
        a.post("creditshop/lists/getlist", {
            page: s.data.page,
            keywords: s.data.keywords,
            cate: s.data.cate
        }, function(t) {
            s.setData({
                creditname: t.sysset.texts.credit
            }), 0 == t.error && (0 == t.list.length ? 1 == s.data.page && s.setData({
                notgoods: !1
            }) : (s.setData({
                notgoods: !0
            }), t.next_page <= s.data.page && 1 != s.data.page && s.setData({
                more: !1
            })), e ? (t.list = s.data.datas.concat(t.list), s.setData({
                datas: t.list
            })) : s.setData({
                datas: t.list
            }));
        });
    },
    search: function() {
        this.setData({
            page: 1
        }), this.get_list();
    },
    doinput: function(t) {
        this.setData({
            keywords: t.detail.value
        });
    }
});