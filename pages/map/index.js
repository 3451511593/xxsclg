var t = getApp().requirejs("core");

Page({
    data: {
        lng: 0,
        lat: 0,
        scale: 13,
        name: "未填写",
        address: "地址：未填写",
        tel1: "",
        tel2: "",
        logo: "/static/images/noface.png",
        markers: [ {
            iconPath: "/static/images/location.png",
            id: 0,
            longitude: 0,
            latitude: 0,
            width: 30,
            height: 30,
            label: {
                content: "未填写",
                color: "#666666",
                fontSize: 12,
                borderRadius: 10,
                bgColor: "#ffffff",
                padding: 5,
                display: "ALWAYS",
                textAlign: "center",
                x: -20,
                y: -60
            }
        } ],
        circles: [ {
            longitude: 0,
            latitude: 0,
            color: "#4e73f1DD",
            fillColor: "#4e73f1AA",
            radius: 15,
            strokeWidth: 1
        } ]
    },
    get_list: function() {},
    regionchange: function(t) {},
    markertap: function(t) {},
    controltap: function(t) {},
    onLoad: function(e) {
        var a = this;
        t.get("shop.cityexpress.map", {}, function(t) {
            a.setData({
                lng: t.cityexpress.lng,
                lat: t.cityexpress.lat,
                scale: t.cityexpress.zoom,
                name: t.cityexpress.name,
                address: t.cityexpress.address,
                tel1: t.cityexpress.tel1,
                tel2: t.cityexpress.tel2,
                logo: t.cityexpress.logo,
                "markers[0].longitude": t.cityexpress.lng,
                "markers[0].latitude": t.cityexpress.lat,
                "markers[0].label.content": t.cityexpress.name,
                "circles[0].longitude": t.cityexpress.lng,
                "circles[0].latitude": t.cityexpress.lat,
                "circles[0].radius": parseInt(t.cityexpress.range)
            });
        });
    },
    call: function() {
        "" == this.data.tel1 || "" == this.data.tel2 ? ("" != this.data.tel1 && wx.makePhoneCall({
            phoneNumber: this.data.tel1
        }), "" != this.data.tel2 && wx.makePhoneCall({
            phoneNumber: this.data.tel2
        })) : this.setData({
            listout: "out",
            listin: "in"
        });
    },
    calldown: function() {
        this.setData({
            listout: "",
            listin: ""
        });
    },
    callup: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.target.dataset.tel
        });
    }
});