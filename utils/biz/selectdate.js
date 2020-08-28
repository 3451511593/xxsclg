module.exports = {
    doDay: function(e, t) {
        var a = t.data.currentObj, r = a.getFullYear(), d = a.getMonth() + 1, n = a.getDate(), c = "";
        c = "left" == e.currentTarget.dataset.key ? (d -= 1) <= 0 ? r - 1 + "/12/" + n : r + "/" + d + "/" + n : (d += 1) <= 12 ? r + "/" + d + "/" + n : r + 1 + "/1/" + n, 
        a = new Date(c);
        t.setData({
            currentDate: a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日" + [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ][a.getDay()],
            currentObj: a,
            currentYear: a.getFullYear(),
            currentMonth: a.getMonth() + 1
        }), this.setSchedule(t);
    },
    getCurrentDayString: function(e, t) {
        var a = t.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3");
        return new Date(a);
    },
    setSchedule: function(e) {
        var t = e.data.currentObj.getMonth() + 1, a = e.data.currentObj.getFullYear(), r = e.data.currentObj.getDate(), d = (e.data.currentObj.getDate(), 
        new Date(a, t, 0).getDate()), n = e.data.currentObj.getUTCDay() + 1 - (r % 7 - 1), c = n <= 0 ? 7 + n : n, u = [], i = 0, s = {};
        s.y = a, s.m = t, t < 10 && (s.m = "0" + t);
        var g = [ "周一", "周二", "周三", "周四", "周五", "周六", "周日" ];
        if (1 == e.data.isdelay) {
            var o, D = (o = e.data.cycelbuy_periodic.split(","))[0] * [ 1, 7, 30 ][o[1]], l = e.data.period_index;
            0 == l && (l = 1);
            var y = o[2] - l + 1;
        }
        for (var h = e.data.maxday, k = e.data.initDate, p = e.data.checkedDate, f = 0; f < 42; f++) {
            var v = f % 7;
            if (f < c - 1) u[f] = {
                id: "",
                week: "",
                no_optional: !0,
                checked: !1
            }; else if (i < d) {
                if (s.d = i + 1, i < 9) {
                    var w = i + 1;
                    s.d = "0" + w;
                }
                var M = !1, Y = !1, b = Date.parse(s.y + "/" + s.m + "/" + s.d);
                b < k && (M = !0), 1 == e.data.isdelay && (b - p) % (864e5 * D) == 0 && b < p + y * D * 864e5 && b > p && (Y = !0), 
                b > k + 864e5 * (h - 1) && (M = !0), b == p && (M = !1, Y = !0), u[f] = {
                    id: i + 1,
                    week: g[v],
                    no_optional: M,
                    checked: Y
                }, i = u[f].id;
            } else i >= d && (u[f] = {
                id: "",
                week: "",
                no_optional: !0,
                checked: !1
            });
        }
        e.setData({
            currentDayList: u
        });
    },
    selectDay: function(e, t) {
        if (e.target.dataset.day) {
            if (t.data.create) var a = t.data.currentYear + "." + t.data.currentMonth + "." + e.target.dataset.day + " " + e.target.dataset.week; else a = t.data.currentYear + "年" + t.data.currentMonth + "月" + e.target.dataset.day + "日 " + e.target.dataset.week;
            var r = e.target.dataset.week;
            r = r.replace("周", "星期"), t.setData({
                week: r,
                currentDay: e.target.dataset.day,
                currentDa: e.target.dataset.day,
                currentDate: a,
                checkedDate: Date.parse(t.data.currentYear + "/" + t.data.currentMonth + "/" + e.target.dataset.day),
                receipttime: Date.parse(t.data.currentYear + "/" + t.data.currentMonth + "/" + e.target.dataset.day) / 1e3
            });
        }
    }
};