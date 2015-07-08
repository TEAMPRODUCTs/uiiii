/**
 * Created by sq_xu on 2015/7/6.
 */
define('cBase',[], function(){
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
           return fn.getInstance = function() {
                return this.instance || new fn
            }, /*r.getServerDate = n.getServerDate,*/ fn
           // return fn;
        }
    })();
    return n;
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
    var i = t.Class({
        __propertys__: function() {
            this.url = null, this.param = null, this.dataformat = null, this.validates = [], this.debug = !1,
           this.protocol = "http", this.contentType = i.CONTENT_TYPE_JSON, this.method = "POST", this.ajax, this.isAbort = !1, this.onBeforeCompleteCallback = null
        },
        initialize: function(e) {
            i.__propertys__.call(this);
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
define("cModel", [/*"libs",*/ "cBase", /*"cStore", "cUtility","CommonStore",*/  "cAbstractModel"], function(/*e,*/ t, /*n, r, i,*/ s) {
    var/* u = r.Object,*/
        a = t.Class(s, {
            __propertys__: function() {
                this.usehead = !0, /*this.head = i.HeadStore.getInstance(),*/ this.result = null, this.headinfo = null, this.ajaxOnly = !1, this.isUserData = !1
            },
            initialize: function( e) {
                a.super_.call(this, e);
                a.__propertys__.call(this);
                /*$super(e),*/ this.baseurl || (this.baseurl = a.baseurl.call(this, this.protocol))
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
          /*          if (this.result instanceof n) {
                        try {} catch (t) {}
                        this.result.set(e, u)
                    }*/
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
