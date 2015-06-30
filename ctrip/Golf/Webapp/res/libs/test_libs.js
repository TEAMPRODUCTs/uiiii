// Zepto 1.1.4 (generated with Zepto Builder) - zepto event ajax form ie detect fx - zeptojs.com/license 

//     (c) 2010-2014 Thomas Fuchs

//     Zepto.js may be freely distributed under the MIT license.

// > http://underscorejs.org
// > (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
// > Underscore may be freely distributed under the MIT license.

//     (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.

//     Backbone may be freely distributed under the MIT license.

var Zepto = function () {
    function M(e) {
        return e == null ? String(e) : x[T.call(e)] || "object"
    }

    function _(e) {
        return M(e) == "function"
    }

    function D(e) {
        return e != null && e == e.window
    }

    function P(e) {
        return e != null && e.nodeType == e.DOCUMENT_NODE
    }

    function H(e) {
        return M(e) == "object"
    }

    function B(e) {
        return H(e) && !D(e) && Object.getPrototypeOf(e) == Object.prototype
    }

    function j(e) {
        return typeof e.length == "number"
    }

    function F(e) {
        return o.call(e, function (e) {
            return e != null
        })
    }

    function I(e) {
        return e.length > 0 ? n.fn.concat.apply([], e) : e
    }

    function q(e) {
        return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function R(e) {
        return e in f ? f[e] : f[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
    }

    function U(e, t) {
        return typeof t == "number" && !l[q(e)] ? t + "px" : t
    }

    function z(e) {
        var t, n;
        return a[e] || (t = u.createElement(e), u.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), n == "none" && (n = "block"), a[e] = n), a[e]
    }

    function W(e) {
        return"children"in e ? s.call(e.children) : n.map(e.childNodes, function (e) {
            if (e.nodeType == 1)return e
        })
    }

    function X(n, r, i) {
        for (t in r)i && (B(r[t]) || O(r[t])) ? (B(r[t]) && !B(n[t]) && (n[t] = {}), O(r[t]) && !O(n[t]) && (n[t] = []), X(n[t], r[t], i)) : r[t] !== e && (n[t] = r[t])
    }

    function V(e, t) {
        return t == null ? n(e) : n(e).filter(t)
    }

    function $(e, t, n, r) {
        return _(t) ? t.call(e, n, r) : t
    }

    function J(e, t, n) {
        n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
    }

    function K(t, n) {
        var r = t.className || "", i = r && r.baseVal !== e;
        if (n === e)return i ? r.baseVal : r;
        i ? r.baseVal = n : t.className = n
    }

    function Q(e) {
        var t;
        try {
            return e ? e == "true" || (e == "false" ? !1 : e == "null" ? null : !/^0/.test(e) && !isNaN(t = Number(e)) ? t : /^[\[\{]/.test(e) ? n.parseJSON(e) : e) : e
        } catch (r) {
            return e
        }
    }

    function G(e, t) {
        t(e);
        for (var n = 0, r = e.childNodes.length; n < r; n++)G(e.childNodes[n], t)
    }

    var e, t, n, r, i = [], s = i.slice, o = i.filter, u = window.document, a = {}, f = {}, l = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1}, c = /^\s*<(\w+|!)[^>]*>/, h = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, d = /^(?:body|html)$/i, v = /([A-Z])/g, m = ["val", "css", "html", "text", "data", "width", "height", "offset"], g = ["after", "prepend", "before", "append"], y = u.createElement("table"), b = u.createElement("tr"), w = {tr: u.createElement("tbody"), tbody: y, thead: y, tfoot: y, td: b, th: b, "*": u.createElement("div")}, E = /complete|loaded|interactive/, S = /^[\w-]*$/, x = {}, T = x.toString, N = {}, C, k, L = u.createElement("div"), A = {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, O = Array.isArray || function (e) {
        return e instanceof Array
    };
    return N.matches = function (e, t) {
        if (!t || !e || e.nodeType !== 1)return!1;
        var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
        if (n)return n.call(e, t);
        var r, i = e.parentNode, s = !i;
        return s && (i = L).appendChild(e), r = ~N.qsa(i, t).indexOf(e), s && L.removeChild(e), r
    }, C = function (e) {
        return e.replace(/-+(.)?/g, function (e, t) {
            return t ? t.toUpperCase() : ""
        })
    }, k = function (e) {
        return o.call(e, function (t, n) {
            return e.indexOf(t) == n
        })
    }, N.fragment = function (t, r, i) {
        var o, a, f;
        return h.test(t) && (o = n(u.createElement(RegExp.$1))), o || (t.replace && (t = t.replace(p, "<$1></$2>")), r === e && (r = c.test(t) && RegExp.$1), r in w || (r = "*"), f = w[r], f.innerHTML = "" + t, o = n.each(s.call(f.childNodes), function () {
            f.removeChild(this)
        })), B(i) && (a = n(o), n.each(i, function (e, t) {
            m.indexOf(e) > -1 ? a[e](t) : a.attr(e, t)
        })), o
    }, N.Z = function (e, t) {
        return e = e || [], e.__proto__ = n.fn, e.selector = t || "", e
    }, N.isZ = function (e) {
        return e instanceof N.Z
    }, N.init = function (t, r) {
        var i;
        if (!t)return N.Z();
        if (typeof t == "string") {
            t = t.trim();
            if (t[0] == "<" && c.test(t))i = N.fragment(t, RegExp.$1, r), t = null; else {
                if (r !== e)return n(r).find(t);
                i = N.qsa(u, t)
            }
        } else {
            if (_(t))return n(u).ready(t);
            if (N.isZ(t))return t;
            if (O(t))i = F(t); else if (H(t))i = [t], t = null; else if (c.test(t))i = N.fragment(t.trim(), RegExp.$1, r), t = null; else {
                if (r !== e)return n(r).find(t);
                i = N.qsa(u, t)
            }
        }
        return N.Z(i, t)
    }, n = function (e, t) {
        return N.init(e, t)
    }, n.extend = function (e) {
        var t, n = s.call(arguments, 1);
        return typeof e == "boolean" && (t = e, e = n.shift()), n.forEach(function (n) {
            X(e, n, t)
        }), e
    }, N.qsa = function (e, t) {
        var n, r, i = t[0] == "#", o = !i && t[0] == ".", u = i || o ? t.slice(1) : t, a = S.test(u);
        r = P(e) && a && i ? (n = e.getElementById(u)) ? [n] : [] : e.nodeType !== 1 && e.nodeType !== 9 ? [] : s.call(a && !i ? o ? e.getElementsByClassName(u) : e.getElementsByTagName(t) : e.querySelectorAll(t));
        if (e.nodeType !== 1)return r;
        var f = [];
        for (var l = 0, c = r.length; l < c; l++)e.contains(r[l]) && f.push(r[l]);
        return f
    }, n.contains = u.documentElement.contains ? function (e, t) {
        return e !== t && e.contains(t)
    } : function (e, t) {
        while (t && (t = t.parentNode))if (t === e)return!0;
        return!1
    }, n.type = M, n.isFunction = _, n.isWindow = D, n.isArray = O, n.isPlainObject = B, n.isEmptyObject = function (e) {
        var t;
        for (t in e)return!1;
        return!0
    }, n.inArray = function (e, t, n) {
        return i.indexOf.call(t, e, n)
    }, n.camelCase = C, n.trim = function (e) {
        return e == null ? "" : String.prototype.trim.call(e)
    }, n.uuid = 0, n.support = {}, n.expr = {}, n.map = function (e, t) {
        var n, r = [], i, s;
        if (j(e))for (i = 0; i < e.length; i++)n = t(e[i], i), n != null && r.push(n); else for (s in e)n = t(e[s], s), n != null && r.push(n);
        return I(r)
    }, n.each = function (e, t) {
        var n, r;
        if (j(e)) {
            for (n = 0; n < e.length; n++)if (t.call(e[n], n, e[n]) === !1)return e
        } else for (r in e)if (t.call(e[r], r, e[r]) === !1)return e;
        return e
    }, n.grep = function (e, t) {
        return o.call(e, t)
    }, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        x["[object " + t + "]"] = t.toLowerCase()
    }), n.fn = {forEach: i.forEach, reduce: i.reduce, push: i.push, sort: i.sort, indexOf: i.indexOf, concat: i.concat, map: function (e) {
        return n(n.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, slice: function () {
        return n(s.apply(this, arguments))
    }, ready: function (e) {
        return E.test(u.readyState) && u.body ? e(n) : u.addEventListener("DOMContentLoaded", function () {
            e(n)
        }, !1), this
    }, get: function (t) {
        return t === e ? s.call(this) : this[t >= 0 ? t : t + this.length]
    }, toArray: function () {
        return this.get()
    }, size: function () {
        return this.length
    }, remove: function () {
        return this.each(function () {
            this.parentNode != null && this.parentNode.removeChild(this)
        })
    }, each: function (e) {
        return i.every.call(this, function (t, n) {
            return e.call(t, n, t) !== !1
        }), this
    }, filter: function (e) {
        return _(e) ? this.not(this.not(e)) : n(o.call(this, function (t) {
            return N.matches(t, e)
        }))
    }, add: function (e, t) {
        return n(k(this.concat(n(e, t))))
    }, is: function (e) {
        return this.length > 0 && N.matches(this[0], e)
    }, not: function (t) {
        var r = [];
        if (_(t) && t.call !== e)this.each(function (e) {
            t.call(this, e) || r.push(this)
        }); else {
            var i = typeof t == "string" ? this.filter(t) : j(t) && _(t.item) ? s.call(t) : n(t);
            this.forEach(function (e) {
                i.indexOf(e) < 0 && r.push(e)
            })
        }
        return n(r)
    }, has: function (e) {
        return this.filter(function () {
            return H(e) ? n.contains(this, e) : n(this).find(e).size()
        })
    }, eq: function (e) {
        return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
    }, first: function () {
        var e = this[0];
        return e && !H(e) ? e : n(e)
    }, last: function () {
        var e = this[this.length - 1];
        return e && !H(e) ? e : n(e)
    }, find: function (e) {
        var t, r = this;
        return e ? typeof e == "object" ? t = n(e).filter(function () {
            var e = this;
            return i.some.call(r, function (t) {
                return n.contains(t, e)
            })
        }) : this.length == 1 ? t = n(N.qsa(this[0], e)) : t = this.map(function () {
            return N.qsa(this, e)
        }) : t = [], t
    }, closest: function (e, t) {
        var r = this[0], i = !1;
        typeof e == "object" && (i = n(e));
        while (r && !(i ? i.indexOf(r) >= 0 : N.matches(r, e)))r = r !== t && !P(r) && r.parentNode;
        return n(r)
    }, parents: function (e) {
        var t = [], r = this;
        while (r.length > 0)r = n.map(r, function (e) {
            if ((e = e.parentNode) && !P(e) && t.indexOf(e) < 0)return t.push(e), e
        });
        return V(t, e)
    }, parent: function (e) {
        return V(k(this.pluck("parentNode")), e)
    }, children: function (e) {
        return V(this.map(function () {
            return W(this)
        }), e)
    }, contents: function () {
        return this.map(function () {
            return s.call(this.childNodes)
        })
    }, siblings: function (e) {
        return V(this.map(function (e, t) {
            return o.call(W(t.parentNode), function (e) {
                return e !== t
            })
        }), e)
    }, empty: function () {
        return this.each(function () {
            this.innerHTML = ""
        })
    }, pluck: function (e) {
        return n.map(this, function (t) {
            return t[e]
        })
    }, show: function () {
        return this.each(function () {
            this.style.display == "none" && (this.style.display = ""), getComputedStyle(this, "").getPropertyValue("display") == "none" && (this.style.display = z(this.nodeName))
        })
    }, replaceWith: function (e) {
        return this.before(e).remove()
    }, wrap: function (e) {
        var t = _(e);
        if (this[0] && !t)var r = n(e).get(0), i = r.parentNode || this.length > 1;
        return this.each(function (s) {
            n(this).wrapAll(t ? e.call(this, s) : i ? r.cloneNode(!0) : r)
        })
    }, wrapAll: function (e) {
        if (this[0]) {
            n(this[0]).before(e = n(e));
            var t;
            while ((t = e.children()).length)e = t.first();
            n(e).append(this)
        }
        return this
    }, wrapInner: function (e) {
        var t = _(e);
        return this.each(function (r) {
            var i = n(this), s = i.contents(), o = t ? e.call(this, r) : e;
            s.length ? s.wrapAll(o) : i.append(o)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            n(this).replaceWith(n(this).children())
        }), this
    }, clone: function () {
        return this.map(function () {
            return this.cloneNode(!0)
        })
    }, hide: function () {
        return this.css("display", "none")
    }, toggle: function (t) {
        return this.each(function () {
            var r = n(this);
            (t === e ? r.css("display") == "none" : t) ? r.show() : r.hide()
        })
    }, prev: function (e) {
        return n(this.pluck("previousElementSibling")).filter(e || "*")
    }, next: function (e) {
        return n(this.pluck("nextElementSibling")).filter(e || "*")
    }, html: function (e) {
        return 0 in arguments ? this.each(function (t) {
            var r = this.innerHTML;
            n(this).empty().append($(this, e, t, r))
        }) : 0 in this ? this[0].innerHTML : null
    }, text: function (e) {
        return 0 in arguments ? this.each(function (t) {
            var n = $(this, e, t, this.textContent);
            this.textContent = n == null ? "" : "" + n
        }) : 0 in this ? this[0].textContent : null
    }, attr: function (n, r) {
        var i;
        return typeof n != "string" || 1 in arguments ? this.each(function (e) {
            if (this.nodeType !== 1)return;
            if (H(n))for (t in n)J(this, t, n[t]); else J(this, n, $(this, r, e, this.getAttribute(n)))
        }) : !this.length || this[0].nodeType !== 1 ? e : !(i = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : i
    }, removeAttr: function (e) {
        return this.each(function () {
            this.nodeType === 1 && J(this, e)
        })
    }, prop: function (e, t) {
        return e = A[e] || e, 1 in arguments ? this.each(function (n) {
            this[e] = $(this, t, n, this[e])
        }) : this[0] && this[0][e]
    }, data: function (t, n) {
        var r = "data-" + t.replace(v, "-$1").toLowerCase(), i = 1 in arguments ? this.attr(r, n) : this.attr(r);
        return i !== null ? Q(i) : e
    }, val: function (e) {
        return 0 in arguments ? this.each(function (t) {
            this.value = $(this, e, t, this.value)
        }) : this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function () {
            return this.selected
        }).pluck("value") : this[0].value)
    }, offset: function (e) {
        if (e)return this.each(function (t) {
            var r = n(this), i = $(this, e, t, r.offset()), s = r.offsetParent().offset(), o = {top: i.top - s.top, left: i.left - s.left};
            r.css("position") == "static" && (o.position = "relative"), r.css(o)
        });
        if (!this.length)return null;
        var t = this[0].getBoundingClientRect();
        return{left: t.left + window.pageXOffset, top: t.top + window.pageYOffset, width: Math.round(t.width), height: Math.round(t.height)}
    }, css: function (e, r) {
        if (arguments.length < 2) {
            var i = this[0], s = getComputedStyle(i, "");
            if (!i)return;
            if (typeof e == "string")return i.style[C(e)] || s.getPropertyValue(e);
            if (O(e)) {
                var o = {};
                return n.each(e, function (e, t) {
                    o[t] = i.style[C(t)] || s.getPropertyValue(t)
                }), o
            }
        }
        var u = "";
        if (M(e) == "string")!r && r !== 0 ? this.each(function () {
            this.style.removeProperty(q(e))
        }) : u = q(e) + ":" + U(e, r); else for (t in e)!e[t] && e[t] !== 0 ? this.each(function () {
            this.style.removeProperty(q(t))
        }) : u += q(t) + ":" + U(t, e[t]) + ";";
        return this.each(function () {
            this.style.cssText += ";" + u
        })
    }, index: function (e) {
        return e ? this.indexOf(n(e)[0]) : this.parent().children().indexOf(this[0])
    }, hasClass: function (e) {
        return e ? i.some.call(this, function (e) {
            return this.test(K(e))
        }, R(e)) : !1
    }, addClass: function (e) {
        return e ? this.each(function (t) {
            if (!("className"in this))return;
            r = [];
            var i = K(this), s = $(this, e, t, i);
            s.split(/\s+/g).forEach(function (e) {
                n(this).hasClass(e) || r.push(e)
            }, this), r.length && K(this, i + (i ? " " : "") + r.join(" "))
        }) : this
    }, removeClass: function (t) {
        return this.each(function (n) {
            if (!("className"in this))return;
            if (t === e)return K(this, "");
            r = K(this), $(this, t, n, r).split(/\s+/g).forEach(function (e) {
                r = r.replace(R(e), " ")
            }), K(this, r.trim())
        })
    }, toggleClass: function (t, r) {
        return t ? this.each(function (i) {
            var s = n(this), o = $(this, t, i, K(this));
            o.split(/\s+/g).forEach(function (t) {
                (r === e ? !s.hasClass(t) : r) ? s.addClass(t) : s.removeClass(t)
            })
        }) : this
    }, scrollTop: function (t) {
        if (!this.length)return;
        var n = "scrollTop"in this[0];
        return t === e ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function () {
            this.scrollTop = t
        } : function () {
            this.scrollTo(this.scrollX, t)
        })
    }, scrollLeft: function (t) {
        if (!this.length)return;
        var n = "scrollLeft"in this[0];
        return t === e ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function () {
            this.scrollLeft = t
        } : function () {
            this.scrollTo(t, this.scrollY)
        })
    }, position: function () {
        if (!this.length)return;
        var e = this[0], t = this.offsetParent(), r = this.offset(), i = d.test(t[0].nodeName) ? {top: 0, left: 0} : t.offset();
        return r.top -= parseFloat(n(e).css("margin-top")) || 0, r.left -= parseFloat(n(e).css("margin-left")) || 0, i.top += parseFloat(n(t[0]).css("border-top-width")) || 0, i.left += parseFloat(n(t[0]).css("border-left-width")) || 0, {top: r.top - i.top, left: r.left - i.left}
    }, offsetParent: function () {
        return this.map(function () {
            var e = this.offsetParent || u.body;
            while (e && !d.test(e.nodeName) && n(e).css("position") == "static")e = e.offsetParent;
            return e
        })
    }}, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function (t) {
        var r = t.replace(/./, function (e) {
            return e[0].toUpperCase()
        });
        n.fn[t] = function (i) {
            var s, o = this[0];
            return i === e ? D(o) ? o["inner" + r] : P(o) ? o.documentElement["scroll" + r] : (s = this.offset()) && s[t] : this.each(function (e) {
                o = n(this), o.css(t, $(this, i, e, o[t]()))
            })
        }
    }), g.forEach(function (e, t) {
        var r = t % 2;
        n.fn[e] = function () {
            var e, i = n.map(arguments, function (t) {
                return e = M(t), e == "object" || e == "array" || t == null ? t : N.fragment(t)
            }), s, o = this.length > 1;
            return i.length < 1 ? this : this.each(function (e, a) {
                s = r ? a : a.parentNode, a = t == 0 ? a.nextSibling : t == 1 ? a.firstChild : t == 2 ? a : null;
                var f = n.contains(u.documentElement, s);
                i.forEach(function (e) {
                    if (o)e = e.cloneNode(!0); else if (!s)return n(e).remove();
                    s.insertBefore(e, a), f && G(e, function (e) {
                        e.nodeName != null && e.nodeName.toUpperCase() === "SCRIPT" && (!e.type || e.type === "text/javascript") && !e.src && window.eval.call(window, e.innerHTML)
                    })
                })
            })
        }, n.fn[r ? e + "To" : "insert" + (t ? "Before" : "After")] = function (t) {
            return n(t)[e](this), this
        }
    }), N.Z.prototype = n.fn, N.uniq = k, N.deserializeValue = Q, n.zepto = N, n
}();
window.Zepto = Zepto, window.$ === undefined && (window.$ = Zepto), function ($) {
    function triggerAndReturn(e, t, n) {
        var r = $.Event(t);
        return $(e).trigger(r, n), !r.isDefaultPrevented()
    }

    function triggerGlobal(e, t, n, r) {
        if (e.global)return triggerAndReturn(t || document, n, r)
    }

    function ajaxStart(e) {
        e.global && $.active++ === 0 && triggerGlobal(e, null, "ajaxStart")
    }

    function ajaxStop(e) {
        e.global && !--$.active && triggerGlobal(e, null, "ajaxStop")
    }

    function ajaxBeforeSend(e, t) {
        var n = t.context;
        if (t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [e, t]) === !1)return!1;
        triggerGlobal(t, n, "ajaxSend", [e, t])
    }

    function ajaxSuccess(e, t, n, r) {
        var i = n.context, s = "success";
        n.success.call(i, e, s, t), r && r.resolveWith(i, [e, s, t]), triggerGlobal(n, i, "ajaxSuccess", [t, n, e]), ajaxComplete(s, t, n)
    }

    function ajaxError(e, t, n, r, i) {
        var s = r.context;
        r.error.call(s, n, t, e), i && i.rejectWith(s, [n, t, e]), triggerGlobal(r, s, "ajaxError", [n, r, e || t]), ajaxComplete(t, n, r)
    }

    function ajaxComplete(e, t, n) {
        var r = n.context;
        n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [t, n]), ajaxStop(n)
    }

    function empty() {
    }

    function mimeToDataType(e) {
        return e && (e = e.split(";", 2)[0]), e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text"
    }

    function appendQuery(e, t) {
        return t == "" ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
    }

    function serializeData(e) {
        e.processData && e.data && $.type(e.data) != "string" && (e.data = $.param(e.data, e.traditional)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data), e.data = undefined)
    }

    function parseArguments(e, t, n, r) {
        return $.isFunction(t) && (r = n, n = t, t = undefined), $.isFunction(n) || (r = n, n = undefined), {url: e, data: t, success: n, dataType: r}
    }

    function serialize(e, t, n, r) {
        var i, s = $.isArray(t), o = $.isPlainObject(t);
        $.each(t, function (t, u) {
            i = $.type(u), r && (t = n ? r : r + "[" + (o || i == "object" || i == "array" ? t : "") + "]"), !r && s ? e.add(u.name, u.value) : i == "array" || !n && i == "object" ? serialize(e, u, n, t) : e.add(t, u)
        })
    }

    var jsonpID = 0, document = window.document, key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i, jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/;
    $.active = 0, $.ajaxJSONP = function (e, t) {
        if ("type"in e) {
            var n = e.jsonpCallback, r = ($.isFunction(n) ? n() : n) || "jsonp" + ++jsonpID, i = document.createElement("script"), s = window[r], o, u = function (e) {
                $(i).triggerHandler("error", e || "abort")
            }, a = {abort: u}, f;
            return t && t.promise(a), $(i).on("load error", function (n, u) {
                clearTimeout(f), $(i).off().remove(), n.type == "error" || !o ? ajaxError(null, u || "error", a, e, t) : ajaxSuccess(o[0], a, e, t), window[r] = s, o && $.isFunction(s) && s(o[0]), s = o = undefined
            }), ajaxBeforeSend(a, e) === !1 ? (u("abort"), a) : (window[r] = function () {
                o = arguments
            }, i.src = e.url.replace(/\?(.+)=\?/, "?$1=" + r), document.head.appendChild(i), e.timeout > 0 && (f = setTimeout(function () {
                u("timeout")
            }, e.timeout)), a)
        }
        return $.ajax(e)
    }, $.ajaxSettings = {type: "GET", beforeSend: empty, success: empty, error: empty, complete: empty, context: null, global: !0, xhr: function () {
        return new window.XMLHttpRequest
    }, accepts: {script: "text/javascript, application/javascript, application/x-javascript", json: jsonType, xml: "application/xml, text/xml", html: htmlType, text: "text/plain"}, crossDomain: !1, timeout: 0, processData: !0, cache: !0}, $.ajax = function (options) {
        var settings = $.extend({}, options || {}), deferred = $.Deferred && $.Deferred();
        for (key in $.ajaxSettings)settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
        ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), settings.url || (settings.url = window.location.toString()), serializeData(settings);
        var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url);
        hasPlaceholder && (dataType = "jsonp");
        if (settings.cache === !1 || (!options || options.cache !== !0) && ("script" == dataType || "jsonp" == dataType))settings.url = appendQuery(settings.url, "_=" + Date.now());
        if ("jsonp" == dataType)return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(settings, deferred);
        var mime = settings.accepts[dataType], headers = {}, setHeader = function (e, t) {
            headers[e.toLowerCase()] = [e, t]
        }, protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol, xhr = settings.xhr(), nativeSetHeader = xhr.setRequestHeader, abortTimeout;
        deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*");
        if (mime = settings.mimeType || mime)mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime);
        (settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
        if (settings.headers)for (name in settings.headers)setHeader(name, settings.headers[name]);
        xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
                var result, error = !1;
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
                    dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type")), result = xhr.responseText;
                    try {
                        dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result))
                    } catch (e) {
                        error = e
                    }
                    error ? ajaxError(error, "parsererror", xhr, settings, deferred) : ajaxSuccess(result, xhr, settings, deferred)
                } else ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred)
            }
        };
        if (ajaxBeforeSend(xhr, settings) === !1)return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), xhr;
        if (settings.xhrFields)for (name in settings.xhrFields)xhr[name] = settings.xhrFields[name];
        var async = "async"in settings ? settings.async : !0;
        xhr.open(settings.type, settings.url, async, settings.username, settings.password);
        for (name in headers)nativeSetHeader.apply(xhr, headers[name]);
        return settings.timeout > 0 && (abortTimeout = setTimeout(function () {
            xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings, deferred)
        }, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr
    }, $.get = function () {
        return $.ajax(parseArguments.apply(null, arguments))
    }, $.post = function () {
        var e = parseArguments.apply(null, arguments);
        return e.type = "POST", $.ajax(e)
    }, $.getJSON = function () {
        var e = parseArguments.apply(null, arguments);
        return e.dataType = "json", $.ajax(e)
    }, $.fn.load = function (e, t, n) {
        if (!this.length)return this;
        var r = this, i = e.split(/\s/), s, o = parseArguments(e, t, n), u = o.success;
        return i.length > 1 && (o.url = i[0], s = i[1]), o.success = function (e) {
            r.html(s ? $("<div>").html(e.replace(rscript, "")).find(s) : e), u && u.apply(r, arguments)
        }, $.ajax(o), this
    };
    var escape = encodeURIComponent;
    $.param = function (e, t) {
        var n = [];
        return n.add = function (e, t) {
            this.push(escape(e) + "=" + escape(t))
        }, serialize(n, e, t), n.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (e) {
    function t(e) {
        var t = this.os = {}, n = this.browser = {}, r = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/), i = e.match(/(Android);?[\s\/]+([\d.]+)?/), s = !!e.match(/\(Macintosh\; Intel /), o = e.match(/(iPad).*OS\s([\d_]+)/), u = e.match(/(iPod)(.*OS\s([\d_]+))?/), a = !o && e.match(/(iPhone\sOS)\s([\d_]+)/), f = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), l = e.match(/Windows Phone ([\d.]+)/), c = f && e.match(/TouchPad/), h = e.match(/Kindle\/([\d.]+)/), p = e.match(/Silk\/([\d._]+)/), d = e.match(/(BlackBerry).*Version\/([\d.]+)/), v = e.match(/(BB10).*Version\/([\d.]+)/), m = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/), g = e.match(/PlayBook/), y = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/), b = e.match(/Firefox\/([\d.]+)/), w = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/), E = !y && e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/), S = E || e.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
        if (n.webkit = !!r)n.version = r[1];
        i && (t.android = !0, t.version = i[2]), a && !u && (t.ios = t.iphone = !0, t.version = a[2].replace(/_/g, ".")), o && (t.ios = t.ipad = !0, t.version = o[2].replace(/_/g, ".")), u && (t.ios = t.ipod = !0, t.version = u[3] ? u[3].replace(/_/g, ".") : null), l && (t.wp = !0, t.version = l[1]), f && (t.webos = !0, t.version = f[2]), c && (t.touchpad = !0), d && (t.blackberry = !0, t.version = d[2]), v && (t.bb10 = !0, t.version = v[2]), m && (t.rimtabletos = !0, t.version = m[2]), g && (n.playbook = !0), h && (t.kindle = !0, t.version = h[1]), p && (n.silk = !0, n.version = p[1]), !p && t.android && e.match(/Kindle Fire/) && (n.silk = !0), y && (n.chrome = !0, n.version = y[1]), b && (n.firefox = !0, n.version = b[1]), w && (n.ie = !0, n.version = w[1]), S && (s || t.ios) && (n.safari = !0, s && (n.version = S[1])), E && (n.webview = !0), t.tablet = !!(o || g || i && !e.match(/Mobile/) || b && e.match(/Tablet/) || w && !e.match(/Phone/) && e.match(/Touch/)), t.phone = !!(!t.tablet && !t.ipod && (i || a || f || d || v || y && e.match(/Android/) || y && e.match(/CriOS\/([\d.]+)/) || b && e.match(/Mobile/) || w && e.match(/Touch/)))
    }

    t.call(e, navigator.userAgent), e.__detect = t
}(Zepto), function (e) {
    function c(e) {
        return e._zid || (e._zid = t++)
    }

    function h(e, t, n, r) {
        t = p(t);
        if (t.ns)var i = d(t.ns);
        return(o[c(e)] || []).filter(function (e) {
            return e && (!t.e || e.e == t.e) && (!t.ns || i.test(e.ns)) && (!n || c(e.fn) === c(n)) && (!r || e.sel == r)
        })
    }

    function p(e) {
        var t = ("" + e).split(".");
        return{e: t[0], ns: t.slice(1).sort().join(" ")}
    }

    function d(e) {
        return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
    }

    function v(e, t) {
        return e.del && !a && e.e in f || !!t
    }

    function m(e) {
        return l[e] || a && f[e] || e
    }

    function g(t, r, i, s, u, a, f) {
        var h = c(t), d = o[h] || (o[h] = []);
        r.split(/\s/).forEach(function (r) {
            if (r == "ready")return e(document).ready(i);
            var o = p(r);
            o.fn = i, o.sel = u, o.e in l && (i = function (t) {
                var n = t.relatedTarget;
                if (!n || n !== this && !e.contains(this, n))return o.fn.apply(this, arguments)
            }), o.del = a;
            var c = a || i;
            o.proxy = function (e) {
                e = x(e);
                if (e.isImmediatePropagationStopped())return;
                e.data = s;
                var r = c.apply(t, e._args == n ? [e] : [e].concat(e._args));
                return r === !1 && (e.preventDefault(), e.stopPropagation()), r
            }, o.i = d.length, d.push(o), "addEventListener"in t && t.addEventListener(m(o.e), o.proxy, v(o, f))
        })
    }

    function y(e, t, n, r, i) {
        var s = c(e);
        (t || "").split(/\s/).forEach(function (t) {
            h(e, t, n, r).forEach(function (t) {
                delete o[s][t.i], "removeEventListener"in e && e.removeEventListener(m(t.e), t.proxy, v(t, i))
            })
        })
    }

    function x(t, r) {
        if (r || !t.isDefaultPrevented) {
            r || (r = t), e.each(S, function (e, n) {
                var i = r[e];
                t[e] = function () {
                    return this[n] = b, i && i.apply(r, arguments)
                }, t[n] = w
            });
            if (r.defaultPrevented !== n ? r.defaultPrevented : "returnValue"in r ? r.returnValue === !1 : r.getPreventDefault && r.getPreventDefault())t.isDefaultPrevented = b
        }
        return t
    }

    function T(e) {
        var t, r = {originalEvent: e};
        for (t in e)!E.test(t) && e[t] !== n && (r[t] = e[t]);
        return x(r, e)
    }

    var t = 1, n, r = Array.prototype.slice, i = e.isFunction, s = function (e) {
        return typeof e == "string"
    }, o = {}, u = {}, a = "onfocusin"in window, f = {focus: "focusin", blur: "focusout"}, l = {mouseenter: "mouseover", mouseleave: "mouseout"};
    u.click = u.mousedown = u.mouseup = u.mousemove = "MouseEvents", e.event = {add: g, remove: y}, e.proxy = function (t, n) {
        var o = 2 in arguments && r.call(arguments, 2);
        if (i(t)) {
            var u = function () {
                return t.apply(n, o ? o.concat(r.call(arguments)) : arguments)
            };
            return u._zid = c(t), u
        }
        if (s(n))return o ? (o.unshift(t[n], t), e.proxy.apply(null, o)) : e.proxy(t[n], t);
        throw new TypeError("expected function")
    }, e.fn.bind = function (e, t, n) {
        return this.on(e, t, n)
    }, e.fn.unbind = function (e, t) {
        return this.off(e, t)
    }, e.fn.one = function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    };
    var b = function () {
        return!0
    }, w = function () {
        return!1
    }, E = /^([A-Z]|returnValue$|layer[XY]$)/, S = {preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped"};
    e.fn.delegate = function (e, t, n) {
        return this.on(t, e, n)
    }, e.fn.undelegate = function (e, t, n) {
        return this.off(t, e, n)
    }, e.fn.live = function (t, n) {
        return e(document.body).delegate(this.selector, t, n), this
    }, e.fn.die = function (t, n) {
        return e(document.body).undelegate(this.selector, t, n), this
    }, e.fn.on = function (t, o, u, a, f) {
        var l, c, h = this;
        if (t && !s(t))return e.each(t, function (e, t) {
            h.on(e, o, u, t, f)
        }), h;
        !s(o) && !i(a) && a !== !1 && (a = u, u = o, o = n);
        if (i(u) || u === !1)a = u, u = n;
        return a === !1 && (a = w), h.each(function (n, i) {
            f && (l = function (e) {
                return y(i, e.type, a), a.apply(this, arguments)
            }), o && (c = function (t) {
                var n, s = e(t.target).closest(o, i).get(0);
                if (s && s !== i)return n = e.extend(T(t), {currentTarget: s, liveFired: i}), (l || a).apply(s, [n].concat(r.call(arguments, 1)))
            }), g(i, t, a, u, o, c || l)
        })
    }, e.fn.off = function (t, r, o) {
        var u = this;
        return t && !s(t) ? (e.each(t, function (e, t) {
            u.off(e, r, t)
        }), u) : (!s(r) && !i(o) && o !== !1 && (o = r, r = n), o === !1 && (o = w), u.each(function () {
            y(this, t, o, r)
        }))
    }, e.fn.trigger = function (t, n) {
        return t = s(t) || e.isPlainObject(t) ? e.Event(t) : x(t), t._args = n, this.each(function () {
            "dispatchEvent"in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
        })
    }, e.fn.triggerHandler = function (t, n) {
        var r, i;
        return this.each(function (o, u) {
            r = T(s(t) ? e.Event(t) : t), r._args = n, r.target = u, e.each(h(u, t.type || t), function (e, t) {
                i = t.proxy(r);
                if (r.isImmediatePropagationStopped())return!1
            })
        }), i
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (t) {
        e.fn[t] = function (e) {
            return e ? this.bind(t, e) : this.trigger(t)
        }
    }), ["focus", "blur"].forEach(function (t) {
        e.fn[t] = function (e) {
            return e ? this.bind(t, e) : this.each(function () {
                try {
                    this[t]()
                } catch (e) {
                }
            }), this
        }
    }), e.Event = function (e, t) {
        s(e) || (t = e, e = t.type);
        var n = document.createEvent(u[e] || "Events"), r = !0;
        if (t)for (var i in t)i == "bubbles" ? r = !!t[i] : n[i] = t[i];
        return n.initEvent(e, r, !0), x(n)
    }
}(Zepto), function (e) {
    e.fn.serializeArray = function () {
        var t, n, r = [];
        return e([].slice.call(this.get(0).elements)).each(function () {
            t = e(this), n = t.attr("type"), this.nodeName.toLowerCase() != "fieldset" && !this.disabled && n != "submit" && n != "reset" && n != "button" && (n != "radio" && n != "checkbox" || this.checked) && r.push({name: t.attr("name"), value: t.val()})
        }), r
    }, e.fn.serialize = function () {
        var e = [];
        return this.serializeArray().forEach(function (t) {
            e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
        }), e.join("&")
    }, e.fn.submit = function (t) {
        if (t)this.bind("submit", t); else if (this.length) {
            var n = e.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (e, t) {
    function w(e) {
        return e.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
    }

    function E(e) {
        return r ? r + e : e.toLowerCase()
    }

    var n = "", r, i, s, o = {Webkit: "webkit", Moz: "", O: "o"}, u = window.document, a = u.createElement("div"), f = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, l, c, h, p, d, v, m, g, y, b = {};
    e.each(o, function (e, i) {
        if (a.style[e + "TransitionProperty"] !== t)return n = "-" + e.toLowerCase() + "-", r = i, !1
    }), l = n + "transform", b[c = n + "transition-property"] = b[h = n + "transition-duration"] = b[d = n + "transition-delay"] = b[p = n + "transition-timing-function"] = b[v = n + "animation-name"] = b[m = n + "animation-duration"] = b[y = n + "animation-delay"] = b[g = n + "animation-timing-function"] = "", e.fx = {off: r === t && a.style.transitionProperty === t, speeds: {_default: 400, fast: 200, slow: 600}, cssPrefix: n, transitionEnd: E("TransitionEnd"), animationEnd: E("AnimationEnd")}, e.fn.animate = function (n, r, i, s, o) {
        return e.isFunction(r) && (s = r, i = t, r = t), e.isFunction(i) && (s = i, i = t), e.isPlainObject(r) && (i = r.easing, s = r.complete, o = r.delay, r = r.duration), r && (r = (typeof r == "number" ? r : e.fx.speeds[r] || e.fx.speeds._default) / 1e3), o && (o = parseFloat(o) / 1e3), this.anim(n, r, i, s, o)
    }, e.fn.anim = function (n, r, i, s, o) {
        var u, a = {}, E, S = "", x = this, T, N = e.fx.transitionEnd, C = !1;
        r === t && (r = e.fx.speeds._default / 1e3), o === t && (o = 0), e.fx.off && (r = 0);
        if (typeof n == "string")a[v] = n, a[m] = r + "s", a[y] = o + "s", a[g] = i || "linear", N = e.fx.animationEnd; else {
            E = [];
            for (u in n)f.test(u) ? S += u + "(" + n[u] + ") " : (a[u] = n[u], E.push(w(u)));
            S && (a[l] = S, E.push(l)), r > 0 && typeof n == "object" && (a[c] = E.join(", "), a[h] = r + "s", a[d] = o + "s", a[p] = i || "linear")
        }
        return T = function (t) {
            if (typeof t != "undefined") {
                if (t.target !== t.currentTarget)return;
                e(t.target).unbind(N, T)
            } else e(this).unbind(N, T);
            C = !0, e(this).css(b), s && s.call(this)
        }, r > 0 && (this.bind(N, T), setTimeout(function () {
            if (C)return;
            T.call(x)
        }, r * 1e3 + 25)), this.size() && this.get(0).clientLeft, this.css(a), r <= 0 && setTimeout(function () {
            x.each(function () {
                T.call(this)
            })
        }, 0), this
    }, a = null
}(Zepto), function (e) {
    "__proto__"in{} || e.extend(e.zepto, {Z: function (t, n) {
        return t = t || [], e.extend(t, e.fn), t.selector = n || "", t.__Z = !0, t
    }, isZ: function (t) {
        return e.type(t) === "array" && "__Z"in t
    }});
    try {
        getComputedStyle(undefined)
    } catch (t) {
        var n = getComputedStyle;
        window.getComputedStyle = function (e) {
            try {
                return n(e)
            } catch (t) {
                return null
            }
        }
    }
}(Zepto), function (e) {
    var t = {endY: e.os.android ? 1 : 0, duration: 100, updateRate: 15}, n = function (e, t, n) {
        return e + (t - e) * n
    }, r = function (e) {
        return-Math.cos(e * Math.PI) / 2 + .5
    }, i = function (i) {
        var s = e.extend({}, t, i);
        if (s.duration === 0) {
            window.scrollTo(0, s.endY), typeof s.callback == "function" && s.callback();
            return
        }
        var o = window.pageYOffset, u = Date.now(), a = u + s.duration, f = function () {
            var e = Date.now(), t = e > a ? 1 : (e - u) / s.duration;
            window.scrollTo(0, n(o, s.endY, r(t))), e < a ? setTimeout(f, s.updateRate) : typeof s.callback == "function" && s.callback()
        };
        f()
    }, s = function (i) {
        var s = e.extend({}, t, i);
        if (s.duration === 0) {
            this.scrollTop = s.endY, typeof s.callback == "function" && s.callback();
            return
        }
        var o = this.scrollTop, u = Date.now(), a = u + s.duration, f = this, l = function () {
            var e = Date.now(), t = e > a ? 1 : (e - u) / s.duration;
            f.scrollTop = n(o, s.endY, r(t)), e < a ? setTimeout(l, s.updateRate) : typeof s.callback == "function" && s.callback()
        };
        l()
    };
    e.scrollTo = i, e.fn.scrollTo = function () {
        if (this.length) {
            var e = arguments;
            this.forEach(function (t, n) {
                s.apply(t, e)
            })
        }
    }
}(Zepto), define("$", function () {
}), function () {
    var e = this, t = e._, n = {}, r = Array.prototype, i = Object.prototype, s = Function.prototype, o = r.push, u = r.slice, a = r.concat, f = i.toString, l = i.hasOwnProperty, c = r.forEach, h = r.map, p = r.reduce, d = r.reduceRight, v = r.filter, m = r.every, g = r.some, y = r.indexOf, b = r.lastIndexOf, w = Array.isArray, E = Object.keys, S = s.bind, x = function (e) {
        if (e instanceof x)return e;
        if (!(this instanceof x))return new x(e);
        this._wrapped = e
    };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x, x.VERSION = "1.4.4";
    var T = x.each = x.forEach = function (e, t, r) {
        if (e == null)return;
        if (c && e.forEach === c)e.forEach(t, r); else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++)if (t.call(r, e[i], i, e) === n)return
        } else for (var o in e)if (x.has(e, o) && t.call(r, e[o], o, e) === n)return
    };
    x.map = x.collect = function (e, t, n) {
        var r = [];
        return e == null ? r : h && e.map === h ? e.map(t, n) : (T(e, function (e, i, s) {
            r[r.length] = t.call(n, e, i, s)
        }), r)
    };
    var N = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function (e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (p && e.reduce === p)return r && (t = x.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
        T(e, function (e, s, o) {
            i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
        });
        if (!i)throw new TypeError(N);
        return n
    }, x.reduceRight = x.foldr = function (e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (d && e.reduceRight === d)return r && (t = x.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
        var s = e.length;
        if (s !== +s) {
            var o = x.keys(e);
            s = o.length
        }
        T(e, function (u, a, f) {
            a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
        });
        if (!i)throw new TypeError(N);
        return n
    }, x.find = x.detect = function (e, t, n) {
        var r;
        return C(e, function (e, i, s) {
            if (t.call(n, e, i, s))return r = e, !0
        }), r
    }, x.filter = x.select = function (e, t, n) {
        var r = [];
        return e == null ? r : v && e.filter === v ? e.filter(t, n) : (T(e, function (e, i, s) {
            t.call(n, e, i, s) && (r[r.length] = e)
        }), r)
    }, x.reject = function (e, t, n) {
        return x.filter(e, function (e, r, i) {
            return!t.call(n, e, r, i)
        }, n)
    }, x.every = x.all = function (e, t, r) {
        t || (t = x.identity);
        var i = !0;
        return e == null ? i : m && e.every === m ? e.every(t, r) : (T(e, function (e, s, o) {
            if (!(i = i && t.call(r, e, s, o)))return n
        }), !!i)
    };
    var C = x.some = x.any = function (e, t, r) {
        t || (t = x.identity);
        var i = !1;
        return e == null ? i : g && e.some === g ? e.some(t, r) : (T(e, function (e, s, o) {
            if (i || (i = t.call(r, e, s, o)))return n
        }), !!i)
    };
    x.contains = x.include = function (e, t) {
        return e == null ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e, function (e) {
            return e === t
        })
    }, x.invoke = function (e, t) {
        var n = u.call(arguments, 2), r = x.isFunction(t);
        return x.map(e, function (e) {
            return(r ? t : e[t]).apply(e, n)
        })
    }, x.pluck = function (e, t) {
        return x.map(e, function (e) {
            return e[t]
        })
    }, x.where = function (e, t, n) {
        return x.isEmpty(t) ? n ? null : [] : x[n ? "find" : "filter"](e, function (e) {
            for (var n in t)if (t[n] !== e[n])return!1;
            return!0
        })
    }, x.findWhere = function (e, t) {
        return x.where(e, t, !0)
    }, x.max = function (e, t, n) {
        if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.max.apply(Math, e);
        if (!t && x.isEmpty(e))return-Infinity;
        var r = {computed: -Infinity, value: -Infinity};
        return T(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o >= r.computed && (r = {value: e, computed: o})
        }), r.value
    }, x.min = function (e, t, n) {
        if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.min.apply(Math, e);
        if (!t && x.isEmpty(e))return Infinity;
        var r = {computed: Infinity, value: Infinity};
        return T(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o < r.computed && (r = {value: e, computed: o})
        }), r.value
    }, x.shuffle = function (e) {
        var t, n = 0, r = [];
        return T(e, function (e) {
            t = x.random(n++), r[n - 1] = r[t], r[t] = e
        }), r
    };
    var k = function (e) {
        return x.isFunction(e) ? e : function (t) {
            return t[e]
        }
    };
    x.sortBy = function (e, t, n) {
        var r = k(t);
        return x.pluck(x.map(e, function (e, t, i) {
            return{value: e, index: t, criteria: r.call(n, e, t, i)}
        }).sort(function (e, t) {
            var n = e.criteria, r = t.criteria;
            if (n !== r) {
                if (n > r || n === void 0)return 1;
                if (n < r || r === void 0)return-1
            }
            return e.index < t.index ? -1 : 1
        }), "value")
    };
    var L = function (e, t, n, r) {
        var i = {}, s = k(t || x.identity);
        return T(e, function (t, o) {
            var u = s.call(n, t, o, e);
            r(i, u, t)
        }), i
    };
    x.groupBy = function (e, t, n) {
        return L(e, t, n, function (e, t, n) {
            (x.has(e, t) ? e[t] : e[t] = []).push(n)
        })
    }, x.countBy = function (e, t, n) {
        return L(e, t, n, function (e, t) {
            x.has(e, t) || (e[t] = 0), e[t]++
        })
    }, x.sortedIndex = function (e, t, n, r) {
        n = n == null ? x.identity : k(n);
        var i = n.call(r, t), s = 0, o = e.length;
        while (s < o) {
            var u = s + o >>> 1;
            n.call(r, e[u]) < i ? s = u + 1 : o = u
        }
        return s
    }, x.toArray = function (e) {
        return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
    }, x.size = function (e) {
        return e == null ? 0 : e.length === +e.length ? e.length : x.keys(e).length
    }, x.first = x.head = x.take = function (e, t, n) {
        return e == null ? void 0 : t != null && !n ? u.call(e, 0, t) : e[0]
    }, x.initial = function (e, t, n) {
        return u.call(e, 0, e.length - (t == null || n ? 1 : t))
    }, x.last = function (e, t, n) {
        return e == null ? void 0 : t != null && !n ? u.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
    }, x.rest = x.tail = x.drop = function (e, t, n) {
        return u.call(e, t == null || n ? 1 : t)
    }, x.compact = function (e) {
        return x.filter(e, x.identity)
    };
    var A = function (e, t, n) {
        return T(e, function (e) {
            x.isArray(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
        }), n
    };
    x.flatten = function (e, t) {
        return A(e, t, [])
    }, x.without = function (e) {
        return x.difference(e, u.call(arguments, 1))
    }, x.uniq = x.unique = function (e, t, n, r) {
        x.isFunction(t) && (r = n, n = t, t = !1);
        var i = n ? x.map(e, n, r) : e, s = [], o = [];
        return T(i, function (n, r) {
            if (t ? !r || o[o.length - 1] !== n : !x.contains(o, n))o.push(n), s.push(e[r])
        }), s
    }, x.union = function () {
        return x.uniq(a.apply(r, arguments))
    }, x.intersection = function (e) {
        var t = u.call(arguments, 1);
        return x.filter(x.uniq(e), function (e) {
            return x.every(t, function (t) {
                return x.indexOf(t, e) >= 0
            })
        })
    }, x.difference = function (e) {
        var t = a.apply(r, u.call(arguments, 1));
        return x.filter(e, function (e) {
            return!x.contains(t, e)
        })
    }, x.zip = function () {
        var e = u.call(arguments), t = x.max(x.pluck(e, "length")), n = new Array(t);
        for (var r = 0; r < t; r++)n[r] = x.pluck(e, "" + r);
        return n
    }, x.object = function (e, t) {
        if (e == null)return{};
        var n = {};
        for (var r = 0, i = e.length; r < i; r++)t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    }, x.indexOf = function (e, t, n) {
        if (e == null)return-1;
        var r = 0, i = e.length;
        if (n) {
            if (typeof n != "number")return r = x.sortedIndex(e, t), e[r] === t ? r : -1;
            r = n < 0 ? Math.max(0, i + n) : n
        }
        if (y && e.indexOf === y)return e.indexOf(t, n);
        for (; r < i; r++)if (e[r] === t)return r;
        return-1
    }, x.lastIndexOf = function (e, t, n) {
        if (e == null)return-1;
        var r = n != null;
        if (b && e.lastIndexOf === b)return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
        var i = r ? n : e.length;
        while (i--)if (e[i] === t)return i;
        return-1
    }, x.range = function (e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        var r = Math.max(Math.ceil((t - e) / n), 0), i = 0, s = new Array(r);
        while (i < r)s[i++] = e, e += n;
        return s
    }, x.bind = function (e, t) {
        if (e.bind === S && S)return S.apply(e, u.call(arguments, 1));
        var n = u.call(arguments, 2);
        return function () {
            return e.apply(t, n.concat(u.call(arguments)))
        }
    }, x.partial = function (e) {
        var t = u.call(arguments, 1);
        return function () {
            return e.apply(this, t.concat(u.call(arguments)))
        }
    }, x.bindAll = function (e) {
        var t = u.call(arguments, 1);
        return t.length === 0 && (t = x.functions(e)), T(t, function (t) {
            e[t] = x.bind(e[t], e)
        }), e
    }, x.memoize = function (e, t) {
        var n = {};
        return t || (t = x.identity), function () {
            var r = t.apply(this, arguments);
            return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
        }
    }, x.delay = function (e, t) {
        var n = u.call(arguments, 2);
        return setTimeout(function () {
            return e.apply(null, n)
        }, t)
    }, x.defer = function (e) {
        return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
    }, x.throttle = function (e, t) {
        var n, r, i, s, o = 0, u = function () {
            o = new Date, i = null, s = e.apply(n, r)
        };
        return function () {
            var a = new Date, f = t - (a - o);
            return n = this, r = arguments, f <= 0 ? (clearTimeout(i), i = null, o = a, s = e.apply(n, r)) : i || (i = setTimeout(u, f)), s
        }
    }, x.debounce = function (e, t, n) {
        var r, i;
        return function () {
            var s = this, o = arguments, u = function () {
                r = null, n || (i = e.apply(s, o))
            }, a = n && !r;
            return clearTimeout(r), r = setTimeout(u, t), a && (i = e.apply(s, o)), i
        }
    }, x.once = function (e) {
        var t = !1, n;
        return function () {
            return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
        }
    }, x.wrap = function (e, t) {
        return function () {
            var n = [e];
            return o.apply(n, arguments), t.apply(this, n)
        }
    }, x.compose = function () {
        var e = arguments;
        return function () {
            var t = arguments;
            for (var n = e.length - 1; n >= 0; n--)t = [e[n].apply(this, t)];
            return t[0]
        }
    }, x.after = function (e, t) {
        return e <= 0 ? t() : function () {
            if (--e < 1)return t.apply(this, arguments)
        }
    }, x.keys = E || function (e) {
        if (e !== Object(e))throw new TypeError("Invalid object");
        var t = [];
        for (var n in e)x.has(e, n) && (t[t.length] = n);
        return t
    }, x.values = function (e) {
        var t = [];
        for (var n in e)x.has(e, n) && t.push(e[n]);
        return t
    }, x.pairs = function (e) {
        var t = [];
        for (var n in e)x.has(e, n) && t.push([n, e[n]]);
        return t
    }, x.invert = function (e) {
        var t = {};
        for (var n in e)x.has(e, n) && (t[e[n]] = n);
        return t
    }, x.functions = x.methods = function (e) {
        var t = [];
        for (var n in e)x.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, x.extend = function (e) {
        return T(u.call(arguments, 1), function (t) {
            if (t)for (var n in t)e[n] = t[n]
        }), e
    }, x.pick = function (e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        return T(n, function (n) {
            n in e && (t[n] = e[n])
        }), t
    }, x.omit = function (e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        for (var i in e)x.contains(n, i) || (t[i] = e[i]);
        return t
    }, x.defaults = function (e) {
        return T(u.call(arguments, 1), function (t) {
            if (t)for (var n in t)e[n] == null && (e[n] = t[n])
        }), e
    }, x.clone = function (e) {
        return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({}, e) : e
    }, x.tap = function (e, t) {
        return t(e), e
    };
    var O = function (e, t, n, r) {
        if (e === t)return e !== 0 || 1 / e == 1 / t;
        if (e == null || t == null)return e === t;
        e instanceof x && (e = e._wrapped), t instanceof x && (t = t._wrapped);
        var i = f.call(e);
        if (i != f.call(t))return!1;
        switch (i) {
            case"[object String]":
                return e == String(t);
            case"[object Number]":
                return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
            case"[object Date]":
            case"[object Boolean]":
                return+e == +t;
            case"[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if (typeof e != "object" || typeof t != "object")return!1;
        var s = n.length;
        while (s--)if (n[s] == e)return r[s] == t;
        n.push(e), r.push(t);
        var o = 0, u = !0;
        if (i == "[object Array]") {
            o = e.length, u = o == t.length;
            if (u)while (o--)if (!(u = O(e[o], t[o], n, r)))break
        } else {
            var a = e.constructor, l = t.constructor;
            if (a !== l && !(x.isFunction(a) && a instanceof a && x.isFunction(l) && l instanceof l))return!1;
            for (var c in e)if (x.has(e, c)) {
                o++;
                if (!(u = x.has(t, c) && O(e[c], t[c], n, r)))break
            }
            if (u) {
                for (c in t)if (x.has(t, c) && !(o--))break;
                u = !o
            }
        }
        return n.pop(), r.pop(), u
    };
    x.isEqual = function (e, t) {
        return O(e, t, [], [])
    }, x.isEmpty = function (e) {
        if (e == null)return!0;
        if (x.isArray(e) || x.isString(e))return e.length === 0;
        for (var t in e)if (x.has(e, t))return!1;
        return!0
    }, x.isElement = function (e) {
        return!!e && e.nodeType === 1
    }, x.isArray = w || function (e) {
        return f.call(e) == "[object Array]"
    }, x.isObject = function (e) {
        return e === Object(e)
    }, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
        x["is" + e] = function (t) {
            return f.call(t) == "[object " + e + "]"
        }
    }), x.isArguments(arguments) || (x.isArguments = function (e) {
        return!!e && !!x.has(e, "callee")
    }), typeof /./ != "function" && (x.isFunction = function (e) {
        return typeof e == "function"
    }), x.isFinite = function (e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }, x.isNaN = function (e) {
        return x.isNumber(e) && e != +e
    }, x.isBoolean = function (e) {
        return e === !0 || e === !1 || f.call(e) == "[object Boolean]"
    }, x.isNull = function (e) {
        return e === null
    }, x.isUndefined = function (e) {
        return e === void 0
    }, x.has = function (e, t) {
        return l.call(e, t)
    }, x.noConflict = function () {
        return e._ = t, this
    }, x.identity = function (e) {
        return e
    }, x.times = function (e, t, n) {
        var r = Array(e);
        for (var i = 0; i < e; i++)r[i] = t.call(n, i);
        return r
    }, x.random = function (e, t) {
        return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    };
    var M = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;"}};
    M.unescape = x.invert(M.escape);
    var _ = {escape: new RegExp("[" + x.keys(M.escape).join("") + "]", "g"), unescape: new RegExp("(" + x.keys(M.unescape).join("|") + ")", "g")};
    x.each(["escape", "unescape"], function (e) {
        x[e] = function (t) {
            return t == null ? "" : ("" + t).replace(_[e], function (t) {
                return M[e][t]
            })
        }
    }), x.result = function (e, t) {
        if (e == null)return null;
        var n = e[t];
        return x.isFunction(n) ? n.call(e) : n
    }, x.mixin = function (e) {
        T(x.functions(e), function (t) {
            var n = x[t] = e[t];
            x.prototype[t] = function () {
                var e = [this._wrapped];
                return o.apply(e, arguments), j.call(this, n.apply(x, e))
            }
        })
    };
    var D = 0;
    x.uniqueId = function (e) {
        var t = ++D + "";
        return e ? e + t : t
    }, x.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var P = /(.)^/, H = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "	": "t", "\u2028": "u2028", "\u2029": "u2029"}, B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function (e, t, n) {
        var r;
        n = x.defaults({}, n, x.templateSettings);
        var i = new RegExp([(n.escape || P).source, (n.interpolate || P).source, (n.evaluate || P).source].join("|") + "|$", "g"), s = 0, o = "__p+='";
        e.replace(i, function (t, n, r, i, u) {
            return o += e.slice(s, u).replace(B, function (e) {
                return"\\" + H[e]
            }), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (o += "';\n" + i + "\n__p+='"), s = u + t.length, t
        }), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        try {
            r = new Function(n.variable || "obj", "_", o)
        } catch (u) {
            throw u.source = o, u
        }
        if (t)return r(t, x);
        var a = function (e) {
            return r.call(this, e, x)
        };
        return a.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", a
    }, x.chain = function (e) {
        return x(e).chain()
    };
    var j = function (e) {
        return this._chain ? x(e).chain() : e
    };
    x.mixin(x), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
        var t = r[e];
        x.prototype[e] = function () {
            var n = this._wrapped;
            return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], j.call(this, n)
        }
    }), T(["concat", "join", "slice"], function (e) {
        var t = r[e];
        x.prototype[e] = function () {
            return j.call(this, t.apply(this._wrapped, arguments))
        }
    }), x.extend(x.prototype, {chain: function () {
        return this._chain = !0, this
    }, value: function () {
        return this._wrapped
    }})
}.call(this), define("_", function () {
}), function () {
    var e = this, t = e.Backbone, n = [], r = n.push, i = n.slice, s = n.splice, o;
    typeof exports != "undefined" ? o = exports : o = e.Backbone = {}, o.VERSION = "1.0.0";
    var u = e._;
    !u && typeof require != "undefined" && (u = require("underscore")), o.$ = e.jQuery || e.Zepto || e.ender || e.$, o.noConflict = function () {
        return e.Backbone = t, this
    }, o.emulateHTTP = !1, o.emulateJSON = !1;
    var a = o.Events = {on: function (e, t, n) {
        if (!l(this, "on", e, [t, n]) || !t)return this;
        this._events || (this._events = {});
        var r = this._events[e] || (this._events[e] = []);
        return r.push({callback: t, context: n, ctx: n || this}), this
    }, once: function (e, t, n) {
        if (!l(this, "once", e, [t, n]) || !t)return this;
        var r = this, i = u.once(function () {
            r.off(e, i), t.apply(this, arguments)
        });
        return i._callback = t, this.on(e, i, n)
    }, off: function (e, t, n) {
        var r, i, s, o, a, f, c, h;
        if (!this._events || !l(this, "off", e, [t, n]))return this;
        if (!e && !t && !n)return this._events = {}, this;
        o = e ? [e] : u.keys(this._events);
        for (a = 0, f = o.length; a < f; a++) {
            e = o[a];
            if (s = this._events[e]) {
                this._events[e] = r = [];
                if (t || n)for (c = 0, h = s.length; c < h; c++)i = s[c], (t && t !== i.callback && t !== i.callback._callback || n && n !== i.context) && r.push(i);
                r.length || delete this._events[e]
            }
        }
        return this
    }, trigger: function (e) {
        if (!this._events)return this;
        var t = i.call(arguments, 1);
        if (!l(this, "trigger", e, t))return this;
        var n = this._events[e], r = this._events.all;
        return n && c(n, t), r && c(r, arguments), this
    }, stopListening: function (e, t, n) {
        var r = this._listeners;
        if (!r)return this;
        var i = !t && !n;
        typeof t == "object" && (n = this), e && ((r = {})[e._listenerId] = e);
        for (var s in r)r[s].off(t, n, this), i && delete this._listeners[s];
        return this
    }}, f = /\s+/, l = function (e, t, n, r) {
        if (!n)return!0;
        if (typeof n == "object") {
            for (var i in n)e[t].apply(e, [i, n[i]].concat(r));
            return!1
        }
        if (f.test(n)) {
            var s = n.split(f);
            for (var o = 0, u = s.length; o < u; o++)e[t].apply(e, [s[o]].concat(r));
            return!1
        }
        return!0
    }, c = function (e, t) {
        var n, r = -1, i = e.length, s = t[0], o = t[1], u = t[2];
        switch (t.length) {
            case 0:
                while (++r < i)(n = e[r]).callback.call(n.ctx);
                return;
            case 1:
                while (++r < i)(n = e[r]).callback.call(n.ctx, s);
                return;
            case 2:
                while (++r < i)(n = e[r]).callback.call(n.ctx, s, o);
                return;
            case 3:
                while (++r < i)(n = e[r]).callback.call(n.ctx, s, o, u);
                return;
            default:
                while (++r < i)(n = e[r]).callback.apply(n.ctx, t)
        }
    }, h = {listenTo: "on", listenToOnce: "once"};
    u.each(h, function (e, t) {
        a[t] = function (t, n, r) {
            var i = this._listeners || (this._listeners = {}), s = t._listenerId || (t._listenerId = u.uniqueId("l"));
            return i[s] = t, typeof n == "object" && (r = this), t[e](n, r, this), this
        }
    }), a.bind = a.on, a.unbind = a.off, u.extend(o, a);
    var p = o.View = function (e) {
        this.cid = u.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
    }, d = /^(\S+)\s*(.*)$/, v = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    u.extend(p.prototype, a, {tagName: "div", $: function (e) {
        return this.$el.find(e)
    }, initialize: function () {
    }, render: function () {
        return this
    }, remove: function () {
        return this.$el.remove(), this.stopListening(), this
    }, setElement: function (e, t) {
        return this.$el && this.undelegateEvents(), this.$el = e instanceof o.$ ? e : o.$(e), this.el = this.$el[0], t !== !1 && this.delegateEvents(), this
    }, delegateEvents: function (e) {
        if (!e && !(e = u.result(this, "events")))return this;
        this.undelegateEvents();
        for (var t in e) {
            var n = e[t];
            u.isFunction(n) || (n = this[e[t]]);
            if (!n)continue;
            var r = t.match(d), i = r[1], s = r[2];
            n = u.bind(n, this), i += ".delegateEvents" + this.cid, s === "" ? this.$el.on(i, n) : this.$el.on(i, s, n)
        }
        return this
    }, undelegateEvents: function () {
        return this.$el.off(".delegateEvents" + this.cid), this
    }, _configure: function (e) {
        this.options && (e = u.extend({}, u.result(this, "options"), e)), u.extend(this, u.pick(e, v)), this.options = e
    }, _ensureElement: function () {
        if (!this.el) {
            var e = u.extend({}, u.result(this, "attributes"));
            this.id && (e.id = u.result(this, "id")), this.className && (e["class"] = u.result(this, "className"));
            var t = o.$("<" + u.result(this, "tagName") + ">").attr(e);
            this.setElement(t, !1)
        } else this.setElement(u.result(this, "el"), !1)
    }});
    var m = function (e, t) {
        var n = this, r;
        e && u.has(e, "constructor") ? r = e.constructor : r = function () {
            return n.apply(this, arguments)
        }, u.extend(r, n, t);
        var i = function () {
            this.constructor = r
        };
        return i.prototype = n.prototype, r.prototype = new i, e && u.extend(r.prototype, e), r.__super__ = n.prototype, r
    };
    p.extend = m
}.call(this), define("B", function () {
}), function (e) {
    function v(i) {
        if (i.targetTouches.length > 1)return!0;
        s = i.target;
        var a = e(s).closest(".nofastclick");
        if (a.length > 0)return!0;
        if (h) {
            var f = window.getSelection();
            if (f.rangeCount && !f.isCollapsed)return!0;
            if (i.targetTouches[0].identifier === p)return event.preventDefault(), !1;
            p = i.targetTouches[0].identifier
        }
        return t = !0, n = i.timeStamp, o = i.targetTouches[0].pageX, u = i.targetTouches[0].pageY, i.timeStamp - r < 0 && (r = i.timeStamp), i.timeStamp - r < 200 && i.preventDefault(), !0
    }

    function m(e) {
        if (!t)return!0;
        a = e.changedTouches[0].pageX, f = e.changedTouches[0].pageY;
        if (Math.abs(a - o) > l || Math.abs(f - u) > l)s = null, t = !1;
        return!0
    }

    function g(o) {
        if (!t)return!0;
        if (o.timeStamp - r < 200)return i = !0, !0;
        r = o.timeStamp, t = !1;
        var u = s.tagName.toLowerCase();
        if (u == "label") {
            var a = x(s);
            if (a) {
                var f = e(a);
                f.attr("type") == "checkbox" || f.attr("type") == "radio" ? f.attr("checked") ? f.removeAttr("checked") : f.attr("checked", "checked") : e(a).focus();
                if (c)return!1;
                s = a
            }
        } else if (S(s)) {
            if (o.timeStamp - n > 100)return s = null, !1;
            var l;
            return h && s.setSelectionRange && s.type.indexOf("date") !== 0 && s.type !== "time" ? (l = s.value.length, s.setSelectionRange(l, l)) : s.focus(), u !== "select" && (s = null, o.preventDefault()), !1
        }
        return n = 0, E(s) || (o.preventDefault(), T(s, o)), !1
    }

    function y(e) {
        t = !1, s = null
    }

    function b(t) {
        var n = t.target, r = e(n).closest(".nofastclick");
        return r.length > 0 ? !0 : s ? t.touchEvent ? !0 : t.cancelable ? !E(s) || i ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0 : !0
    }

    function w(e) {
        if (t)return t = !1, s = null, !0;
        if (e.target.type === "submit" && e.detail === 0)return!0;
        var n = b(e);
        return n || (s = null), n
    }

    function E(e) {
        switch (e.nodeName.toLowerCase()) {
            case"button":
            case"select":
            case"textarea":
                if (e.disabled)return!0;
                break;
            case"input":
                if (h && e.type === "file" || e.disabled)return!0;
                break;
            case"video":
                return!0
        }
        return/\bneedclick\b/.test(e.className)
    }

    function S(e) {
        switch (e.nodeName.toLowerCase()) {
            case"textarea":
            case"select":
                return!0;
            case"input":
                switch (e.type) {
                    case"button":
                    case"checkbox":
                    case"file":
                    case"image":
                    case"radio":
                    case"submit":
                        return!1
                }
                return!e.disabled && !e.readOnly;
            default:
                return/\bneedfocus\b/.test(e.className)
        }
    }

    function x(e) {
        return e.control !== undefined ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }

    function T(e, t) {
        var n, r;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent("click", !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.touchEvent = !0, e.dispatchEvent(n)
    }

    function N() {
        return typeof window.ontouchstart == "undefined" ? !1 : !0
    }

    var t = !1, n = 0, r = 0, i = !1, s = null, o = 0, u = 0, a = 0, f = 0, l = 4, c = navigator.userAgent.indexOf("Android") > 0, h = /iP(ad|hone|od)/.test(navigator.userAgent), p = 0, d = h && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
    e.needFocus = S, e.bindFastClick = function () {
        if (!N())return!0;
        e(document).ready(function () {
            c && (document.addEventListener("mouseover", b, !0), document.addEventListener("mousedown", b, !0), document.addEventListener("mouseup", b, !0)), document.addEventListener("click", w, !0), e(document).on("touchstart", v).on("touchmove", m).on("touchend", g).on("touchcancel", y)
        })
    }, e.unbindFastClick = function () {
        if (!N())return!0;
        c && (document.removeEventListener("mouseover", b, !0), document.removeEventListener("mousedown", b, !0), document.removeEventListener("mouseup", b, !0)), document.removeEventListener("click", w, !0), e(document).off("touchstart", v).off("touchmove", m).off("touchend", g).off("touchcancel", y)
    }
}(Zepto), define("F", function () {
}), require.config({baseUrl: "/webapp/", shim: {$: {exports: "zepto"}, _: {exports: "_"}, B: {deps: ["_", "$"], exports: "Backbone"}, common: {deps: ["libs"]}}, paths: {$: "res/libs/zepto", _: "res/libs/underscore", B: "res/libs/backbone", libs: "libs_r", common: "app/common"}}), require(["$", "_", "B"], function () {
}), define("libs", function () {
});