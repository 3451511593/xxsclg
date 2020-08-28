var t = getApp(), a = t.requirejs("/core");

t.requirejs("jquery");

Page({
    data: {
        list: [],
        page: 1,
        status: "all",
        loading: !1
    },
    onLoad: function() {
        this.getlist({
            page: 1,
            status: ""
        });
    },
    tab: function(t) {
        var a = t.currentTarget.dataset.status, s = {
            page: 1,
            status: "all" == a ? "" : a
        };
        console.error(a), this.setData({
            status: a,
            list: []
        }), this.getlist(s);
    },
    onReachBottom: function() {
        var t = {
            page: this.data.page,
            status: this.data.status
        };
        this.getlist(t);
    },
    getlist: function(t) {
        var s = this;
        s.setData({
            loading: !0
        }), a.get("dividend/log/get_list", t, function(a) {
            if (console.error(a), 0 == a.error) {
                if (a.list.length > 0) {
                    var e = s.data.list.concat(a.list);
                    t.page = t.page + 1;
                }
                s.setData({
                    dividendcount: a.dividendcount,
                    list: e,
                    loading: !1,
                    total: a.total,
                    page: t.page,
                    stop: !1
                });
            }
        });
    }
});