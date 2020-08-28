var t = getApp(), e = t.requirejs("core");

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
    onLoad: function(e) {
        t.url(e), this.getList();
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
        }), e.get("member/favorite/get_list", {
            page: t.data.page
        }, function(e) {
            var i = {
                loading: !1,
                loaded: !0,
                total: e.total,
                pagesize: e.pagesize,
                show: !0
            };
            e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list), 
            e.list.length < e.pagesize && (i.loaded = !0)), t.setData(i);
        });
    },
    itemClick: function(t) {
        var i = e.pdata(t).id, a = e.pdata(t).goodsid;
        if (this.data.isedit) {
            var s = this.data.checkObj, c = this.data.checkNum;
            s[i] ? (s[i] = !1, c--) : (s[i] = !0, c++);
            var l = !0;
            for (var o in s) if (!s[o]) {
                l = !1;
                break;
            }
            this.setData({
                checkObj: s,
                isCheckAll: l,
                checkNum: c
            });
        } else wx.navigateTo({
            url: "/pages/goods/detail/index?id=" + a
        });
    },
    btnClick: function(t) {
        var i = this, a = t.currentTarget.dataset.action;
        if ("edit" == a) {
            var s = {};
            for (var c in this.data.list) {
                s[this.data.list[c].id] = !1;
            }
            i.setData({
                isedit: !0,
                checkObj: s,
                isCheckAll: !1
            });
        } else if ("delete" == a) {
            s = i.data.checkObj;
            var l = [];
            for (var c in s) s[c] && l.push(c);
            if (l.length < 1) return;
            e.confirm("删除后不可恢复，确定要删除吗？", function() {
                e.post("member/favorite/remove", {
                    ids: l
                }, function(t) {
                    i.setData({
                        isedit: !1,
                        checkNum: 0,
                        page: 0,
                        list: []
                    }), i.getList();
                });
            });
        } else "finish" == a && i.setData({
            isedit: !1,
            checkNum: 0
        });
    },
    checkAllClick: function() {
        var t = !this.data.isCheckAll, e = this.data.checkObj, i = {
            isCheckAll: t,
            checkObj: e
        };
        for (var a in e) i.checkObj[a] = !!t;
        i.checkNum = t ? this.data.list.length : 0, this.setData(i);
    }
});