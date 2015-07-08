/**
 * Created by sq_xu on 2015/7/6.
 */
/*define('cBase',[], function(){
    var n = function (){};
    n.Class = (function(){

        var inherits = function(ctor, superCtor) {
            // 显式的指定父类
            ctor.super_ = superCtor;

            // ECMAScript 5  原型式继承并解除引用
            if (Object.create) {
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
            } else {
                // 无Object.create方法的平稳退化
                function F() {};
                F.prototype = superCtor.prototype;
                ctor.prototype = new F();
                ctor.prototype.constructor = ctor;
            }
        };

        return function() {
            // 最后一个参数是新类方法、属性和构造函数声明
            var subClazz = arguments[arguments.length - 1] || {};
            // initialize是构造函数，否构造函数就是一个空函数
            var fn = subClazz.initialize == null ? function() {} : subClazz.initialize;
            // 继承除最一个参数以的类，多继承，也可以用作扩展方法
            for (var index = 0; index < arguments.length - 1; index++) {
                inherits(fn, arguments[index]);
            }
            // 实现新类的方法
            for (var prop in subClazz) {
                if (subClazz.hasOwnProperty(prop)){
                    if (prop == "initialize") {
                        continue;
                    }

                    fn.prototype[prop] = subClazz[prop];
                }
            }

            return fn;
        }
    })();
    return n;
}),*/

define("cCoreInherit", [], function() {
    var t = [].slice,
        n = function() {};
    return n.Class = function() {
        function r() {
            this.__propertys__(), this.initialize.apply(this, arguments)
        }
        if (arguments.length == 0 || arguments.length > 2) throw "参数错误";
        var e = null,
            n = t.call(arguments);
        typeof n[0] == "function" && (e = n.shift()), n = n[0], r.superclass = e, r.subclasses = [];
        var i = function() {},
            s = n.__propertys__ || function() {};
        if (e) {
            e.prototype.__propertys__ && (i = e.prototype.__propertys__);
            var o = function() {};
            o.prototype = e.prototype, r.prototype = new o, e.subclasses.push(r)
        }
        var u = r.superclass && r.superclass.prototype;
        for (var a in n) {
            var f = n[a];
            if (u && typeof f == "function") {
                var l = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(f.toString())[1].replace(/\s/i, "").split(",");
                l[0] === "$super" && u[a] && (f = function(e, n) {
                    return function() {
                        var r = this,
                            i = [
                                function() {
                                    return u[e].apply(r, arguments)
                                }
                            ];
                        return n.apply(this, i.concat(t.call(arguments)))
                    }
                }(a, f))
            }
            r.prototype[a] = f
        }
        r.prototype.initialize || (r.prototype.initialize = function() {}), r.prototype.__propertys__ = function() {
            i.call(this), s.call(this)
        };
        for (key in e) e.hasOwnProperty(key) && key !== "prototype" && key !== "superclass" && (r[key] = e[key]);
        return r.prototype.constructor = r, r
    }, n.extend = function() {
        var e = t.call(arguments),
            n = e.shift() || {};
        if (!n) return !1;
        for (var r = 0, i = e.length; r < i; r++)
            if (typeof e[r] == "object")
                for (var s in e[r]) n[s] = e[r][s];
        return n
    }, n.implement = function(e, t) {
        if (typeof e != "function") return !1;
        for (var n in t) e.prototype[n] = t[n];
        return e
    }, n
}),
define("cBase", [/*"libs", */"cCoreInherit", "cUtility"], function(/*e,*/ t, n) {
    typeof console == "undefined" && (console = {
        log: function() {},
        error: function() {}
    });
    var r = {};
     r.Class = t.Class, r.extend = t.extend, r.implement = t.implement;
    var i = [].slice,
        s = function(e, t, n) {
            return n = n || [],
                function() {
                    e.apply(t, n.concat(i.call(arguments)))
                }
        },
        o = function(e) {
            return Object.prototype.toString.call(e)
        };
    r.Object = new r.Class({});
    var u = {
        keys: function(e) {
            var t = [];
            if (typeof e == "object")
                if (typeof Object.keys == "function") Object.keys(e);
                else
                    for (var n in e) e.hasOwnProperty(n) && t.push(n);
            return t
        }
    };
    return r.extend(r.Object, u),r.Date = n.Date,/*  r.Hash = n.Hash,*/ r.getInstance = function() {
        return this.instance || new this
    }, r.getServerDate = n.getServerDate, r
}),
define("cAbstractStorage", ["cBase"], function(e) {
    var t = window.JSON,
        n = e.Date,
        r = new e.Class({
            __propertys__: function() {
                this.proxy = null
            },
            initialize: function($super, e) {},
            _buildStorageObj: function(e, t, n, r, i) {
                return {
                    value: e,
                    oldvalue: i || null,
                    timeout: t,
                    tag: n,
                    savedate: r
                }
            },
            set: function(e, r, i, s, o, u) {
                o = o || (new n).format("Y/m/d H:i:s"), i = i ? new n(i) : (new n).addDay(30);
                var a = this._buildStorageObj(r, i.format("Y/m/d H:i:s"), s, o, u);
                try {
                    return this.proxy.setItem(e, t.stringify(a)), !0
                } catch (f) {
                    console && 0
                }
                return !1
            },
            get: function(e, r, i) {
                var s, o = null;
                try {
                    s = this.proxy.getItem(e), s && (s = t.parse(s), n.parse(s.timeout, !0) >= new Date && (r ? r === s.tag && (o = i ? s.oldvalue : s.value) : o = i ? s.oldvalue : s.value))
                } catch (u) {
                    console && 0
                }
                return o
            },
            getTag: function(e) {
                var n, r = null,
                    i = null;
                try {
                    n = this.proxy.getItem(e), n && (n = t.parse(n), i = n && n.tag)
                } catch (s) {
                    console && 0
                }
                return i
            },
            getSaveDate: function(e, r) {
                var i, s = null;
                try {
                    i = this.proxy.getItem(e), i && (i = t.parse(i), i.savedate && (s = n.parse(i.savedate), r || (s = s.valueOf())))
                } catch (o) {
                    console && 0
                }
                return s
            },
            getExpireTime: function(e) {
                var n = null,
                    r = null;
                try {
                    n = this.proxy.getItem(e), n && (n = t.parse(n), r = Date.parse(n.timeout))
                } catch (i) {
                    console && 0
                }
                return r
            },
            remove: function(e) {
                return this.proxy.removeItem(e)
            },
            getAll: function() {
                var e = this.proxy.length,
                    t = [];
                for (var n = 0; n < e; n++) {
                    var r = this.proxy.key(n),
                        i = {
                            key: r,
                            value: this.get(r)
                        };
                    t.push(i)
                }
                return t
            },
            clear: function() {
                this.proxy.clear()
            },
            gc: function() {
                var e = this.proxy,
                    t = this.proxy.length;
                for (var n = 0; n < t; n++) {
                    var r = e.key(n);
                    try {
                        this.get(r) || this.remove(r)
                    } catch (i) {}
                }
            }
        });
    return r
}),
define("cStorage", ["cBase", "cAbstractStorage"], function(e, t) {
    var n = new e.Class(t, {
        __propertys__: function() {},
        initialize: function($super, e) {
            this.proxy = window.localStorage, $super(e)
        },
        oldGet: function(t) {
            var n = localStorage.getItem(t),
                r = n ? JSON.parse(n) : null;
            if (r && r.timeout) {
                var i = new Date,
                    s = e.Date.parse(r.timeout).valueOf();
                if (r.timeby) {
                    if (s - i >= 0) return r
                } else if (s - e.Date.parse(e.Date.format(i, "Y-m-d")).valueOf() >= 0) return r;
                return localStorage.removeItem(t), null
            }
            return r
        },
        oldSet: function(e, t) {
            localStorage.setItem(e, t)
        },
        getExpireTime: function(t) {
            var n = localStorage.getItem(t),
                r = n ? JSON.parse(n) : null;
            return r && r.timeout ? r.timeout : (new e.Date(e.getServerDate())).addDay(2).format("Y-m-d")
        },
        oldRemove: function(e) {
            localStorage.removeItem(e)
        }
    });
    return n.getInstance = function() {
        return this.instance ? this.instance : this.instance = new this
    }, n.localStorage = n.getInstance(), n
}),
define("cUtilityDate", ["cCoreInherit"], function(e) {
    var n = {};
    return n.Date = new e.Class({
        initialize: function(e) {
            e = e || new Date, this.date = new Date(e)
        },
        addDay: function(e) {
            return e = e || 0, this.date.setDate(this.date.getDate() + e), this
        },
        addMonth: function(e) {
            return e = e || 0, this.date.setMonth(this.date.getMonth() + e), this
        },
        addHours: function(e) {
            return e = e || 0, this.date.setHours(this.date.getHours() + e), this
        },
        addMinutes: function(e) {
            return e = e || 0, this.date.setMinutes(this.date.getMinutes() + e), this
        },
        addSeconds: function(e) {
            return e = e || 0, this.date.setSeconds(this.date.getSeconds() + e), this
        },
        addYear: function(e) {
            return e = e || 0, this.date.setYear(this.date.getFullYear() + e), this
        },
        setHours: function() {
            return this.date.setHours.apply(this.date, arguments), this
        },
        valueOf: function() {
            return this.date
        },
        getTime: function() {
            return this.date.valueOf()
        },
        toString: function() {
            return this.date.toString()
        },
        format: function(e) {
            typeof e != "string" && (e = "");
            for (var t in this._MAPS) e = this._MAPS[t].call(this, e, this.date, t);
            return e
        },
        diffMonth: function(e) {
            var t = parseInt(this.format("Y")),
                r = parseInt(this.format("m")),
                i = new n.Date(e),
                s = parseInt(i.format("Y")),
                o = parseInt(i.format("m"));
            return (s - t) * 12 + (o - r)
        },
        getServerDate: function(){
          return new Date();
        },
        _DAY1: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        _DAY2: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        _MAPS: {
            d: function(e, t, n) {
                var r = t.getDate().toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r)
            },
            j: function(e, t, n) {
                return e.replace(new RegExp(n, "mg"), t.getDate())
            },
            N: function(e, t, n) {
                var r = t.getDay();
                return r === 0 && (r = 7), e.replace(new RegExp(n, "mg"), r)
            },
            w: function(e, t, n) {
                var r = t.getDay(),
                    i = this._DAY1[r];
                return e.replace(new RegExp(n, "mg"), i)
            },
            W: function(e, t, n) {
                var r = t.getDay(),
                    i = this._DAY2[r];
                return e.replace(new RegExp(n, "mg"), i)
            },
            m: function(e, t, n) {
                var r = (t.getMonth() + 1).toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r)
            },
            n: function(e, t, n) {
                return e.replace(n, t.getMonth() + 1)
            },
            Y: function(e, t, n) {
                return e.replace(new RegExp(n, "mg"), t.getFullYear())
            },
            y: function(e, t, n) {
                return e.replace(new RegExp(n, "mg"), t.getYear())
            },
            g: function(e, t, n) {
                var r = t.getHours();
                return r >= 12 && (r -= 12), e.replace(new RegExp(n, "mg"), r)
            },
            G: function(e, t, n) {
                return e.replace(new RegExp(n, "mg"), t.getHours())
            },
            h: function(e, t, n) {
                var r = t.getHours();
                return r >= 12 && (r -= 12), r += "", r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r)
            },
            H: function(e, t, n) {
                var r = t.getHours().toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r)
            },
            i: function(e, t, n) {
                var r = t.getMinutes().toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r)
            },
            s: function(e, t, n) {
                var r = t.getSeconds().toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r)
            },
            I: function(e, t, n) {
                var r = t.getMinutes().toString();
                return e.replace(new RegExp(n, "mg"), r)
            },
            S: function(e, t, n) {
                var r = t.getSeconds().toString();
                return e.replace(new RegExp(n, "mg"), r)
            },
            D: function(e, n, r) {
                var i = this.getServerDate();//TODO CHECK
                i.setHours(0, 0, 0, 0), n = new Date(n.valueOf()), n.setHours(0, 0, 0, 0);
                var s = 864e5,
                    o = "",
                    u = n - i;
                return u >= 0 && (u < s ? o = "今天" : u < 2 * s ? o = "明天" : u < 3 * s && (o = "后天")), e.replace(new RegExp(r, "mg"), o)
            }
        }
    }), e.extend(n.Date, {
        parse: function(e, t) {
            if (typeof e == "undefined") return new Date;
            if (typeof e == "string") {
                e = e || "";
                var r = /^(\d{4})\-?(\d{1,2})\-?(\d{1,2})/i;
                e.match(r) && (e = e.replace(r, "$2/$3/$1"));
                var i = Date.parse(e),
                    s = new Date(i || new Date);
                return t ? s : new n.Date(s)
            }
            return typeof e == "number" ? new Date(e) : new Date
        },
        getHM: function(e) {
            var t = this._getDate(e),
                n = t.getHours(),
                r = t.getMinutes();
            return (n < 10 ? "0" + n : "" + n) + ":" + (r < 10 ? "0" + r : "" + r)
        },
        getIntervalDay: function(e, t) {
            var n = this._getDate(e),
                r = this._getDate(t);
            return n.setHours(0, 0, 0, 0), r.setHours(0, 0, 0, 0), parseInt((r - n) / 864e5)
        },
        m2H: function(e) {
            var t = Math.floor(e / 60),
                n = e % 60;
            return (t > 0 ? t + "小时" : "") + (n > 0 ? n + "分钟" : "")
        },
        _getDate: function(e) {
            var t = n.Date.parse(e, !0),
                r = new Date;
            return r.setTime(t), r
        },
        format: function(e, t) {
            return (new n.Date(e)).format(t)
        },
        weekday: function(e) {
            var t = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                n = new Date(e);
            return t[n.getDay()]
        },
        diffMonth: function(e, t) {
            return e = new n.Date(e), e.diffMonth(t)
        }
    }), n.Date
}),
    define("cUtility", ["cUtilityDate"], function(n) {
    var s = function(e) {
            return Object.prototype.toString.call(e)
        },
        o = {};
    return  o.Object = {}, o.Object.set = function(e, t, n) {
        if (!t) return null;
        var r = t.split(".");
        e = e || {};
        for (var i = 0, s = r.length, o = Math.max(s - 1, 0); i < s; i++) i < o ? e = e[r[i]] = e[r[i]] || {} : e[r[i]] = n;
        return e
    }, o.Object.get = function(e, t) {
        if (!e || !t) return null;
        var n = t.split(".");
        e = e || {};
        for (var r = 0, i = n.length, s = Math.max(i - 1, 0); r < i; r++) {
            e = e[n[r]];
            if (e === null || typeof e == "undefined") return null
        }
        return e
    },o.Date = n,  o.getServerDate = n.getServerDate,  o
}),
define("cAbstractStore", ["cBase", "cStorage", "cUtility"], function(e, t, n) {
    CDate = e.Date, HObject = n.Object;
    var r = new e.Class({
        __propertys__: function() {
            this.NULL = {}, this.key = this.NULL, this.lifeTime = "30M", this.useServerTime = !1, this.defaultData = null, this.rollbackEnabled = !1, this.sProxy = this.NULL
        },
        initialize: function(e) {
            for (var t in e) this[t] = e[t];
            this.assert()
        },
        assert: function() {
            if (this.key === this.NULL) throw "not override key property"
        },
        set: function(e, t, n) {
            var r = this._getNowTime();
            r.addSeconds(this._getLifeTime()), this.rollbackEnabled && !n && (n = e), this.sProxy.set(this.key, e, r, t, null, n)
        },
        setLifeTime: function(e, t) {
            this.lifeTime = e;
            var n = this.getTag(),
                r = this.get(),
                i;
            t ? i = this._getNowTime() : i = this.sProxy.getSaveDate(this.key, !0) || this._getNowTime();
            var s = (new CDate(i.valueOf())).format("Y/m/d H:i:s");
            i.addSeconds(this._getLifeTime()), this.sProxy.set(this.key, r, i, n, s)
        },
        setAttr: function(e, t, n) {
            if (_.isObject(e)) {
                for (var r in e) e.hasOwnProperty(r) && this.setAttr(r, e[r], t);
                return
            }
            n = n || this.getTag();
            var i = this.get(n) || {},
                s = {};
            if (i) {
                if (this.rollbackEnabled) {
                    s = this.get(n, !0);
                    var o = HObject.get(i, e);
                    HObject.set(s, e, o)
                }
                return HObject.set(i, e, t), this.set(i, n, s)
            }
            return !1
        },
        get: function(t, n) {
            var r = null,
                i = !0;
            Object.prototype.toString.call(this.defaultData) === "[object Array]" ? r = this.defaultData.slice(0) : this.defaultData && (r = _.clone(this.defaultData));
            var s = this.sProxy.get(this.key, t, n),
                o = typeof s;
            if ({
                string: !0,
                number: !0,
                "boolean": !0
            }[o]) return s;
            if (s)
                if (Object.prototype.toString.call(s) == "[object Array]") {
                    r = [];
                    for (var u = 0, a = s.length; u < a; u++) r[u] = s[u]
                } else s && !r && (r = {}), e.extend(r, s);
            for (var f in r) {
                i = !1;
                break
            }
            return i ? null : r
        },
        getAttr: function(e, t) {
            var n = this.get(t),
                r = null;
            return n && (r = HObject.get(n, e)), r
        },
        getTag: function() {
            return this.sProxy.getTag(this.key)
        },
        remove: function() {
            this.sProxy.remove(this.key)
        },
        removeAttr: function(e) {
            var t = this.get() || {};
            t[e] && delete t[e], this.set(t)
        },
        getExpireTime: function() {
            var e = null;
            try {
                e = this.sProxy.getExpireTime(this.key)
            } catch (t) {
                console && 0
            }
            return e
        },
        setExpireTime: function(e) {
            var t = this.get(),
                n = new CDate(e);
            this.sProxy.set(this.key, t, n)
        },
        _getNowTime: function() {
            return this.useServerTime ? new CDate(e.getServerDate()) : new CDate
        },
        _getLifeTime: function() {
            var e = 0,
                t = this.lifeTime + "",
                n = t.charAt(t.length - 1),
                r = +t.substring(0, t.length - 1);
            return typeof n == "number" ? n = "M" : n = n.toUpperCase(), n == "D" ? e = r * 24 * 60 * 60 : n == "H" ? e = r * 60 * 60 : n == "M" ? e = r * 60 : n == "S" ? e = r : e = r * 60, e
        },
        rollback: function(e) {
            if (this.rollbackEnabled) {
                var t = this.getTag(),
                    n = this.sProxy.get(this.key, t),
                    r = this.sProxy.get(this.key, t, !0);
                if (e && e instanceof Array)
                    for (var i in e) {
                        var s = e[i],
                            o = r[s];
                        typeof o != "undefined" && (n[s] = o)
                    } else n = r, r = {};
                this.set(n, t, r)
            }
        }
    });
    return r.getInstance = function() {
        return this.instance ? this.instance : this.instance = new this
    }, r
}), define("cStore", ["cBase", "cAbstractStore", "cStorage"], function(e, t, n) {
var r = new e.Class(t, {
    __propertys__: function() {
        this.sProxy = n.getInstance()
    },
    initialize: function($super, e) {
        $super(e)
    }
});
return r
}),
    define("cAjax", [], function() {
    var t = {
            json: "application/json; charset=utf-8",
            jsonp: "application/json"
        },
        n = function(e) {
            return e && (e = t[e] ? t[e] : e), e
        },
        r = function(e) {
            function t(e, t, n, r) {
                var i = f(e, t, n, r);
                return i.type = "GET", u(i)
            }

            function r(e, t, r, i) {
                var s = t.contentType;
                t = JSON.stringify(t);
                var o = f(e, t, r, i);
                return o.type = "POST", o.dataType = "json", o.timeout = 3e4, o.contentType = n(s) || "application/json", u(o)
            }

            function i(e, t, n, r) {
                var i = f(e, t, n, r);
                return i.type = "GET", i.dataType = "jsonp", i.crossDomain = !0, u(i)
            }

            function s(e, t, r, i, s) {
                var o = r.contentType;
                t.toLowerCase() !== "get" && (r = JSON.stringify(r));
                var a = f(e, r, i, s);
                return a.type = t, a.dataType = "json", a.crossDomain = !0, a.data = r, a.contentType = n(o) || "application/json", u(a)
            }

            function o(t, n, r, i) {
                var s = null,
                    o = "";
                typeof n == "string" ? s = e("#" + n) : s = e(n), s && s.length > 0 && (o = s.serialize());
                var a = f(t, o, r, i);
                return u(a)
            }

            function u(t) {
                var n = {
                    url: t.url,
                    type: t.type,
                    dataType: t.dataType,
                    data: t.data,
                    contentType: t.contentType,
                    timeout: t.timeout || 5e4,
                    success: function(e) {
                        t.callback(e)
                    },
                    error: function(e) {
                        t.error && t.error(e)
                    }
                };
                return t.url.indexOf(window.location.host) === -1 && (n.crossDomain = !!t.crossDomain), $.ajax(n)
            }

            function a(t) {
                if (window.XDomainRequest) {
                    var n = new XDomainRequest;
                    if (n) {
                        t.error && typeof t.error == "function" && (n.onerror = function() {
                            t.error()
                        }), t.timeout && typeof t.timeout == "function" && (n.ontimeout = function() {
                            t.timeout()
                        }), t.success && typeof t.success == "function" && (n.onload = function() {
                            t.dataType ? t.dataType.toLowerCase() == "json" && t.callback(JSON.parse(n.responseText)) : t.callback(n.responseText)
                        });
                        var r = "";
                        t.type == "POST" ? r = t.data : r = e.param(t.data), n.open(t.type, t.url), n.send(r)
                    }
                }
            }

            function f(e, t, n, r) {
                return {
                    url: e,
                    data: t,
                    callback: n,
                    error: r
                }
            }
            return {
                get: t,
                post: r,
                jsonp: i,
                cros: s,
                form: o
            }
        }($);
    return r
}),
define("cAbstractModel", [/*"libs", */"cBase", "cAjax", /*"cLog"*/], function(/*e,*/ t, n/*, r*/) {
    var i = new t.Class({
        __propertys__: function() {
            this.url = null, this.param = null, this.dataformat = null, this.validates = [], this.debug = !1,
           this.protocol = "http", this.contentType = i.CONTENT_TYPE_JSON, this.method = "POST", this.ajax, this.isAbort = !1, this.onBeforeCompleteCallback = null
        },
        initialize: function(e) {
            this.assert();
            for (var t in e) this[t] = e[t]
        },
        assert: function() {
            if (this.url === null) throw "not override url property";
            if (this.param === null) throw "not override param property"
        },
        pushValidates: function(e) {
            typeof e == "function" && this.validates.push($.proxy(e, this))
        },
        setParam: function(e, t) {
            typeof e == "object" && !t ? this.param = e : this.param[e] = t
        },
        getParam: function() {
            return this.param
        },
        buildurl: function() {
            throw "[ERROR]abstract method:buildurl, must be override"
        },
        execute: function(e, t, s, o, u) {
            this.isAbort = !1;
            var a = this.buildurl(),
                f = this,
                l = $.proxy(function(n) {
                    //r.serverLog(f.buildurl(), f.getParam(), n);
                    if (this.validates && this.validates.length > 0)
                        for (var i = 0, o = this.validates.length; i < o; i++)
                            if (!this.validates[i](n)) return typeof t == "function" ? t.call(s || this, n) : !1;
                    var u = typeof this.dataformat == "function" ? this.dataformat(n) : n;
                    typeof this.onBeforeCompleteCallback == "function" && this.onBeforeCompleteCallback(u), typeof e == "function" && e.call(s || this, u, n)
                }, this),
                c = $.proxy(function(e) {
                    //r.serverLog(f.buildurl(), f.getParam());
                    if (f.isAbort) return f.isAbort = !1, typeof o == "function" ? o.call(s || this, e) : !1;
                    typeof t == "function" && t.call(s || this, e)
                }, this),
                u = u || _.clone(this.getParam() || {});
            return u.contentType = this.contentType,
                  this.contentType === i.CONTENT_TYPE_JSON ? this.ajax = n.cros(a, this.method, u, l, c) :
                  this.contentType === i.CONTENT_TYPE_JSONP ? this.ajax = n.jsonp(a, u, l, c) : this.ajax = n.post(a, u, l, c)
        },
        abort: function() {
            this.isAbort = !0, this.ajax && this.ajax.abort && this.ajax.abort()
        }
    });
    return i.getInstance = function() {
        return this.instance instanceof this ? this.instance : this.instance = new this
    }, i.baseurl = function() {
        throw "[ERROR]abstract method:baseurl, must be override"
    }, i.CONTENT_TYPE_JSON = "json", i.CONTENT_TYPE_FORM = "form", i.CONTENT_TYPE_JSONP = "jsonp", i
}),
define("cModel", [/*"libs",*/ "cBase", "cStore", /*"cUtility","CommonStore",*/  "cAbstractModel"], function(/*e,*/ t, n, /*r, i,*/ s) {
    var/* u = r.Object,*/
        a = new t.Class(s, {
            __propertys__: function() {
                this.usehead = !0, /*this.head = i.HeadStore.getInstance(),*/ this.result = null, this.headinfo = null, this.ajaxOnly = !1, this.isUserData = !1
            },
            initialize: function($super, e) {
                $super(e), this.baseurl || (this.baseurl = a.baseurl.call(this, this.protocol))
            },
            setHead: function(e) {
               /* if (!e instanceof n) throw "Set head is not a store";*/
                this.head = e
            },
            getHead: function() {
                return this.head
            },
            getParamStore: function() {
                return this.param
            },
            setParamStore: function(e) {
                if (typeof e != "object") throw "Set param is not a store";
                this.param = e
            },
            getResultStore: function() {
                return this.result
            },
            clearResult: function() {
                this.result && typeof this.result.remove == "function" && this.result.remove()
            },
            setParam: function(e, t) {
             /*   var r = {};
                typeof e == "object" && !t ? r = e : r[e] = t;
                for (var i in r) this.param instanceof n ? this.param.setAttr(i, r[i]) : u.set(this.param, i, r[i])*/
            },
            getParam: function() {
                return /*this.param instanceof n ? this.param.get() : */this.param;
            },
            buildurl: function() {
                var baseurl = this.baseurl();
                var tempUrl = this.protocol + '://' + (baseurl.domain) + '' + (baseurl.path) + (typeof this.url === 'function' ? this.url() : this.url);
                return tempUrl;
            },
            getTag: function() {
                var e = _.clone(this.getParam() || {});
                return JSON.stringify(e)
            },
            excute: function(e, t, r, i, s) {
                var o = _.clone(this.getParam() || {});
                this.pushValidates(function(e) {
                    var /*t = this.head.get(),*/
                        n = this._getResponseHead(e);
                    return this.contentType !== a.CONTENT_TYPE_JSONP && this.usehead && n.auth/* && n.auth !== t.auth && this.head.setAuth(n.auth)*/, n.success
                });
                var u = this.getTag(),
                    f = this.result && this.result.get(u);
                !f || this.ajaxOnly || r ? (this.method.toLowerCase() !== "get" && this.usehead && this.contentType !== a.CONTENT_TYPE_JSONP ? o.head = this.head.get() : this.method.toLowerCase() !== "get" && !this.usehead && this.contentType !== a.CONTENT_TYPE_JSONP && this.headinfo && (o.head = this.headinfo), this.onBeforeCompleteCallback = function(e) {
         //TODO 复原store相关
                    if (this.result instanceof n) {
                        try {} catch (t) {}
                        this.result.set(e, u)
                    }
                }, this.execute(e, t, i, s, o)) : typeof e == "function" && e.call(i || this, f)
            },
            _getResponseHead: function(e) {
                var t = !!e.ResponseStatus,
                    n = t ? e.ResponseStatus : e.head,
                    r = "",
                    i = !1;
                if (t) {
                    var s = n.Extension;
                    for (var o in s) {
                        var u = s[o];
                        if (u.id == "auth") {
                            r = u.value;
                            break
                        }
                    }
                    i = n && n.Ack === "Success"
                } else r = n.auth, i = n && n.errcode === 0;
                return {
                    auth: r,
                    success: i
                }
            }
        });
    return a.baseurl = function(e) {
        var n = "m.ctrip.com",
            i = "restapi";
        if(e == "https"){
            n =  "wpg.ctrip.com";
        }
        return {
            domain: n,
            path: i
        };
    }, a.isHttps = function(e) {
        return location.protocol == "https" || e == "https"
    }, a
})
