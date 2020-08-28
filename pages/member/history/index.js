var t = getApp(), i = t.requirejs("core");

t.requirejs("foxui");

Page({
    data: {
        icons: t.requirejs("icons"),
        page: 1,
        loading: !1,
        loaded: !1,
        isedit: !1,
        isCheckAll: !1,
        checkObj: {},
        checkNum: 0,
        list: []
    },
    onLoad: function(i) {
        t.url(i), this.getList();
    },
    onShow: function() {
        t.getCache("isIpx") ? this.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : this.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), i.get("member/history/get_list", {
            page: t.data.page
        }, function(i) {
            var a = {
                loading: !1,
                loaded: !0,
                total: i.total,
                pagesize: i.pagesize,
                show: !0
            };
            i.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(i.list), 
            i.list.length < i.pagesize && (a.loaded = !0)), t.setData(a);
        });
    },
    itemClick: function(t) {
        var a = i.pdata(t).id, e = i.pdata(t).goodsid;
        if (this.data.isedit) {
            var s = this.data.checkObj, c = this.data.checkNum;
            s[a] ? (s[a] = !1, c--) : (s[a] = !0, c++);
            var n = !0;
            for (var h in s) if (!s[h]) {
                n = !1;
                break;
            }
            this.setData({
                checkObj: s,
                isCheckAll: n,
                checkNum: c
            });
        } else wx.navigateTo({
            url: "/pages/goods/detail/index?id=" + e
        });
    },
    btnClick: function(t) {
        var a = this, e = t.currentTarget.dataset.action;
        if ("edit" == e) {
            var s = {};
            for (var c in this.data.list) {
                s[this.data.list[c].id] = !1;
            }
            a.setData({
                isedit: !0,
                checkObj: s,
                isCheckAll: !1
            });
        } else if ("delete" == e) {
            s = a.data.checkObj;
            var n = [];
            for (var c in s) s[c] && n.push(c);
            if (n.length < 1) return;
            i.confirm("删除后不可恢复，确定要删除吗？", function() {
                i.post("member/history/remove", {
                    ids: n
                }, function(t) {
                    a.setData({
                        isedit: !1,
                        checkNum: 0,
                        page: 0,
                        list: []
                    }), a.getList();
                });
            });
        } else "finish" == e && a.setData({
            isedit: !1,
            checkNum: 0
        });
    },
    checkAllClick: function() {
        var t = !this.data.isCheckAll, i = this.data.checkObj, a = {
            isCheckAll: t,
            checkObj: i
        };
        for (var e in i) a.checkObj[e] = !!t;
        a.checkNum = t ? this.data.list.length : 0, this.setData(a);
    }
});