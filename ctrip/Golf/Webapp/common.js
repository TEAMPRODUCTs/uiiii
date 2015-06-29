define("AbstractAPP", ["libs", "cBase", "cUIAnimation"], function(e, t, n) {
	var r = new t.Class({
		__propertys__: function() {
			this.webroot = "/#hotelsearch", this.viewRootPath = "app/views/", this.defaultView = "index", this.request, this.viewpath, this.mainframe, this.viewport, this.statedom, this.views = new t.Hash, this.curView, this.lastView, this.inteface = {
				loadView: _.bind(this.loadView, this),
				forward: _.bind(this.forward, this),
				back: _.bind(this.back, this)
			}, this.isCreate = !1, this.history = [], this.stopListening = !1, this.timeoutres, this.lastHash = "", this.lashFullHash = "", this.isChangeHash = !1, this.animations = n, this.isAnimat = !0, this.animatSwitch = !1, t.isInApp() && (this.animatSwitch = !0), this.animForwardName = "slideleft", this.animBackwardName = "slideright", this.animNoName = "noAnimate", this.animatName = this.animNoName, this.path = [], this.query = {}, this.viewMapping = {}
		},
		initialize: function(e) {
			this.setOption(e), this.buildEvent()
		},
		setOption: function(e) {
			e = e || {};
			for (var t in e) this[t] = e[t]
		},
		buildEvent: function() {
			var e = this;
			requirejs.onError = function(e) {
				if (e && e.requireModules)
					for (var t = 0; t < e.requireModules.length; t++) {
						0;
						break
					}
			}, $(window).bind("hashchange", _.bind(this.onHashChange, this)), this.onHashChange(), this.pushHistory()
		},
		onHashChange: function() {
			if (!this.stopListening) {
				var e = decodeURIComponent(location.href).replace(/^[^#]+(#(.+))?/g, "$2").toLowerCase();
				this._onHashChange(e)
			}
		},
		_onHashChange: function(e, t) {
			e = e.replace(/^#+/i, "");
			var n = this.parseHash(e);
			this.localObserver(n, t)
		},
		parseHash: function(e) {
			function o(e) {
				var e = e.split("://"),
					t = /([^&=?]+)=([^&]+)/g,
					n = {},
					r, i, s;
				while (r = t.exec(e[0])) name = r[1], i = r[2], n[name] = i;
				if (e[1]) {
					var o = 0;
					s = _.size(n), _.each(n, function(t, r) {
						++o == s && (n[r] += "://" + e[1])
					})
				}
				return n
			}
			var t = e,
				e = e.replace(/([^\|]*)(?:\|.*)?$/img, "$1"),
				n = /^([^?&|]*)(.*)?$/i.exec(e),
				r = n[1] ? n[1].split("!") : [],
				i = (r.shift() || "").replace(/(^\/+|\/+$)/i, ""),
				s = r.length ? r.join("!").replace(/(^\/+|\/+$)/i, "").split("/") : this.path;
			return this.isChangeHash = !this.lastHash && t === this.lashFullHash || !!this.lastHash && this.lastHash !== e, location.hash.indexOf("cui-") != -1 && (this.isChangeHash = !1), this.lastHash = e, this.lashFullHash = t, {
				viewpath: i,
				path: s,
				query: o(t),
				root: location.pathname + location.search,
				fullhash: t
			}
		},
		localObserver: function(e, t) {
			this.animatName = t ? this.animForwardName : this.animBackwardName, this.request = e, this.viewpath = this.request.viewpath || this.defaultView, this.request.viewpath = this.viewpath, this.switchView(this.viewpath)
		},
		switchView: function(e) {
			var t = e,
				n = this.views.getItem(t),
				r = this.curView;
			r && r != n && (this.lastView = r);
			if (n) {
				if (n == this.curView && this.isChangeHash == 0) return;
				n.request = this.request, this.curView = n;
				var i = (r || n).viewname;
				this.curView.__load(i)
			} else this.loadView(e, function(e) {
				n = new e(this.request, this.inteface, t), this.views.push(t, n), n.turning = _.bind(function() {
					this.createViewPort(), n.viewport = this.viewport, this.startAnimation(function(e, t) {
						this.views.each(function(n, r) {
							if (e === n || t === n) return !1;
							n.$el.hide()
						}), e.$el.show()
					})
				}, this), this.curView = n;
				var i = (r || n).viewname;
				this.curView.__load(i)
			})
		},
		startAnimation: function(e) {
			var t = this.curView,
				n = this.lastView;
			n && (n.scrollPos = {
				x: window.scrollX,
				y: window.scrollY
			}), this.animatSwitch || (this.isAnimat = !1), this.isAnimat || (this.animatName = this.animNoName), this.timeoutres = this.animations[this.animatName] && this.animations[this.animatName].call(this, t, n, e, this), this.isAnimat = !0
		},
		loadView: function(e, t) {
			var n = this;
			requirejs([this.buildUrl(e)], function(e) {
				t && t.call(n, e)
			})
		},
		buildUrl: function(e) {
			var t = this.viewMapping[e];
			return t ? t : this.viewRootPath + e
		},
		createViewPort: function() {
			if (this.isCreate) return;
			var e = ['<div class="main-frame">', '<div class="main-viewport"></div>', '<div class="main-state"></div>', "</div>"].join("");
			this.mainframe = $(e), this.viewport = this.mainframe.find(".main-viewport"), this.statedom = this.mainframe.find(".main-state");
			var t = $("#main");
			t.empty(), t.append(this.mainframe), this.isCreate = !0
		},
		lastUrl: function() {
			return this.history.length < 2 ? document.referrer : this.history[this.history.length - 2]
		},
		startObserver: function() {
			this.stopListening = !1
		},
		endObserver: function() {
			this.stopListening = !0
		},
		forward: function(e, t, n) {
			e = e.toLowerCase(), n && (this.isAnimat = !1), this.endObserver(), t ? window.location.replace(("#" + e).replace(/^#+/, "#")) : window.location.href = ("#" + e).replace(/^#+/, "#"), this.pushHistory(), this._onHashChange(e, !0), setTimeout(_.bind(this.startObserver, this), 1)
		},
		back: function(e, t) {
			t && (this.isAnimat = !1);
			var n = this.lastUrl();
			n && this.history.pop(), e && (!n || n.indexOf(e) !== 0) ? window.location.hash = e : (e = this.request.query.refer, e ? window.location.href = e : history.back())
		},
		pushHistory: function() {
			var e = window.location.href;
			this.history.push(e)
		}
	});
	return r
}), define("App", ["libs", "cBase", "AbstractAPP", "cWidgetFactory", "cWidgetGuider", "cStorage"], function(e, t, n, r, i) {
	(function() {
		function s(e, t, n, r, i) {
			var s = Math.abs(e - t),
				o = Math.abs(n - r),
				u = s >= o ? e - t > 0 ? "left" : "right" : n - r > 0 ? "up" : "down";
			return i && (u == "left" || u == "right" ? o / s > i && (u = "") : (u == "up" || u == "down") && s / o > i && (u = "")), u
		}

		function o(o, u, a, f, l) {
			if (!o) return;
			o.on(n, function(e) {
				var n = e.touches && e.touches[0] || e;
				t.x1 = n.pageX, t.y1 = n.pageY
			}).on(r, function(e) {
				var n = e.touches && e.touches[0] || e;
				t.x2 = n.pageX, t.y2 = n.pageY, f || e.preventDefault()
			}).on(i, function(n) {
				if (t.x2 && Math.abs(t.x1 - t.x2) > e || t.y2 && Math.abs(t.y1 - t.y2) > e) {
					var r = s(t.x1, t.x2, t.y1, t.y2, l);
					u === r && typeof a == "function" && a()
				} else u === "tap" && typeof a == "function" && a()
			})
		}

		function u(e) {
			if (!e) return;
			e.off(n).off(r).off(i)
		}
		var e = 20,
			t = {},
			n = "touchstart",
			r = "touchmove",
			i = "touchend";
		"ontouchstart" in window || (n = "mousedown", r = "mousemove", i = "mouseup"), $.flip = o, $.flipDestroy = u
	})();
	var s = new t.Class(n, {
		__propertys__: function() {},
		cleanCache: function() {
			var e = ["FLIGHT_SEARCH", "FLIGHT_SEARCH_SUBJOIN", "FLTINTL_SEARCH", "FLIGHT_LIST", "FLIGHT_INTER_CITY_LIST", "FLIGHT_CITY_LIST", "zqInCityInfo", "zqInCityDateStore", "LastInCitySelectDateTime", "LastzqInAirportSelectDateTime", "zqInAirportInfo", "zqInAirportDateStore", "zqInAirportDateAndAddressStore", "zqInCityDateAndAddressStore", "zqInCitySelectStore", "zqInAirportSelectStore", "FLIGHT_DETAILS", "FLIGHT_DETAILS_PARAM", "FLIGHT_ORDERINFO", "USER_FLIGHT_ORDERLIST", "USER_FLIGHT_ORDERDETAIL", "USER_FLIGHT_ORDERPARAM", "FLIGHT_RETURNPAGE", "FLIGHT_SELECTED_INFO", "FLIGHT_PICK_TICKET_SELECT", "FLIGHT_AIRLINE", "FLIGHT_AIRCTRAFT", "FLIGHT_ENUM_TAKETIME", "FLIGHT_ENUM_CABINS", "FLIGHT_LIST_FILTER", "FLIGHT_PICK_TICKET", "FLIGHT_PICK_TICKET_PARAM", "FLIGHT_AD_TIMEOUT", "P_FLIGHT_TicketList", "U_FLIGHT_ORDERLIST", "U_FLIGHT_ORDERDETAIL"],
				t = {
					flight: e
				},
				n = t[this.channel];
			if (Array.isArray(n))
				for (var r in n) window.localStorage.removeItem(r)
		},
		initialize: function($super, e) {
			$super(e);
			var t = r.create("Guider");
			t.create(), $.bindFastClick && $.bindFastClick(), this.cleanCache()
		}
	});
	return s
})