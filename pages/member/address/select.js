var e = getApp(), t = e.requirejs("core");

Page({
    data: {
        loaded: !1,
        list: [],
        can: !0
    },
    onLoad: function(t) {
        e.url(t);
    },
    onShow: function() {
        if (this.data.can) {
            this.getList();
            e.getCache("isIpx") ? this.setData({
                isIpx: !0,
                iphonexnavbar: "fui-iphonex-navbar",
                paddingb: "padding-b"
            }) : this.setData({
                isIpx: !1,
                iphonexnavbar: "",
                paddingb: ""
            });
        }
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var e = this;
        console.log(33), t.get("member/address/get_list", {}, function(t) {
            e.setData({
                loaded: !0,
                list: t.list,
                show: !0
            });
        });
    },
    chooseAddress: function() {
        this.data.can = !1, wx.chooseAddress({
            success: function(e) {
                var t = {
                    realname: e.userName,
                    mobile: e.telNumber,
                    address: e.detailInfo,
                    province: e.provinceName,
                    city: e.cityName,
                    area: e.countyName,
                    is_from_wx: 1
                };
                setTimeout(function() {
                    wx.redirectTo({
                        url: "/pages/member/address/post?type=quickaddress&params=" + JSON.stringify(t)
                    });
                }, 0);
            }
        });
    },
    select: function(s) {
        var a = t.pdata(s).index;
        e.setCache("orderAddress", this.data.list[a], 30), wx.navigateBack();
    },
    searchlist: function(e) {
        var s = this, a = e.detail.value;
        t.get("member/address/searchlist", {
            key: a
        }, function(e) {
            s.setData({
                loaded: !0,
                list: e.list,
                show: !0
            });
        });
    }
});