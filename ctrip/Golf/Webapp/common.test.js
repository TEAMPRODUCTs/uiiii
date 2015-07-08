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
}),
define("cUIAnimation", [], function() {
    return {
        slideleft: function(e, t, n, r) {
            $("body").addClass("hiddenx"), e.addClass("animatestart"), e.addClass("sliderightin"), e.__show();
            var i = this;
            return setTimeout(function() {
                $("body").removeClass("hiddenx"), e.removeClass("animatestart"), e.removeClass("sliderightin"), t && t.__hide(e.viewname), n && n.call(r, e, t)
            }, 340)
        },
        slideright: function(e, t, n, r) {
            $("body").addClass("hiddenx"), t && (t.addClass("animatestart"), t.addClass("sliderightout")), e.__show();
            var i = this;
            return setTimeout(function() {
                $("body").removeClass("hiddenx"), t && (t.removeClass("animatestart"), t.removeClass("sliderightout"), t.__hide(e.viewname)), n && n.call(r, e, t)
            }, 340)
        },
        noAnimate: function(e, t, n, r) {
            t && t.__hide(e.viewname), e.__show(), n && n.call(r, e, t)
        }
    }
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
}), define("cAbstractStore", ["cBase", "cStorage", "cUtility"], function(e, t, n) {
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
}),
define("cWidgetGuider", ["cUtilityHybrid", "cWidgetFactory", "cHybridFacade"], function(e, t, n) {
	var r = "Guider",
		i = {
			jump: function(e) {
				var t = {
					refresh: function() {
						n.request({
							name: n.METHOD_OPEN_URL,
							targetMode: 0,
							title: e.title,
							pageName: e.pageName
						})
					},
					app: function() {
						if (e && e.module) {
							var t = n.getOpenUrl(e);
							n.request({
								name: n.METHOD_OPEN_URL,
								openUrl: t,
								targetMode: 1,
								title: e.title,
								pageName: e.pageName
							})
						} else e && e.url && n.request({
							name: n.METHOD_OPEN_URL,
							openUrl: e.url,
							targetMode: 1,
							title: e.title,
							pageName: e.pageName
						})
					},
					h5: function() {
						e && e.url && n.request({
							name: n.METHOD_OPEN_URL,
							openUrl: e.url,
							targetMode: 2,
							title: e.title,
							pageName: e.pageName
						})
					},
					browser: function() {
						e && e.url && n.request({
							name: n.METHOD_OPEN_URL,
							openUrl: e.url,
							targetMode: 3,
							title: e.title,
							pageName: e.pageName
						})
					},
					open: function() {
						e && e.url && n.request({
							name: n.METHOD_OPEN_URL,
							openUrl: e.url,
							targetMode: 4,
							title: e.title,
							pageName: e.pageName
						})
					}
				};
				typeof t[e.targetModel] == "function" && t[e.targetModel]()
			},
			apply: function(e) {
				_.isObject(e) && _.isFunction(e.hybridCallback) && e.hybridCallback()
			},
			call: function(e) {
				return !1
			},
			init: function(e) {
				e && window.parseFloat(e.version) < 5.2 ? n.request({
					name: n.METHOD_ENTRY,
					callback: e.callback
				}) : n.request({
					name: n.METHOD_INIT,
					callback: e.callback
				})
			},
			log: function(e) {
				n.request({
					name: n.METHOD_LOG_EVENT,
					event_name: e.name
				})
			},
			print: function(e) {
				n.request({
					name: n.METHOD_NATIVE_LOG,
					log: e.log,
					result: e.result
				})
			},
			callService: function() {
				n.request({
					name: n.METHOD_CALL_SERVICE_CENTER
				})
			},
			backToLastPage: function(e) {
				var t = e ? e.param : "";
				n.request({
					name: n.METHOD_BACK_TO_LAST_PAGE,
					param: t
				})
			},
			checkUpdate: function() {
				n.request({
					name: n.METHOD_CHECK_UPDATE
				})
			},
			recommend: function() {
				n.request({
					name: n.METHOD_RECOMMEND_APP_TO_FRIEND
				})
			},
			addWeixinFriend: function() {
				n.request({
					name: n.METHOD_ADD_WEIXIN_FRIEND
				})
			},
			showNewestIntroduction: function() {
				n.request({
					name: n.METHOD_SHOW_NEWEST_INTRODUCTION
				})
			},
			register: function(e) {
				e && e.tagname && e.callback && n.register({
					tagname: e.tagname,
					callback: e.callback
				})
			},
			create: function() {
				n.init()
			},
			home: function() {
				n.request({
					name: n.METHOD_BACK_TO_HOME
				})
			},
			jumpHotel: function(e) {
				n.request({
					name: n.METHOD_GO_TO_HOTEL_DETAIL,
					hotelId: e.hotelId,
					hotelName: e.name,
					cityId: e.cityId,
					isOverSea: e.isOverSea
				})
			},
			injectUbt: function() {
				return !1
			},
			checkAppInstall: function(e) {
				n.request({
					name: n.METHOD_CHECK_APP_INSTALL,
					url: e.url,
					"package": e.package,
					callback: e.callback
				})
			},
			callPhone: function(e) {
				n.request({
					name: n.METHOD_CALL_PHONE,
					tel: e.tel
				})
			},
			cross: function(e) {
				n.request({
					name: n.METHOD_CROSS_JUMP,
					param: e.param,
					path: e.path
				})
			},
			refreshNative: function(e) {
				n.request({
					name: n.METHOD_REFRESH_NATIVE,
					"package": e.package,
					json: e.json
				})
			},
			copyToClipboard: function(e) {
				n.request({
					name: n.METHOD_COPY_TO_CLIPBOARD,
					content: e.content
				})
			},
			readFromClipboard: function(e) {
				n.request({
					name: n.METHOD_READ_FROM_CLIPBOARD,
					callback: e.callback
				})
			},
			shareToVendor: function(e) {
				n.request({
					name: n.METHOD_SHARE_TO_VENDOR,
					imgUrl: e.imgUrl,
					text: e.text,
					title: e.title,
					linkUrl: e.linkUrl,
					isIOSSystemShare: e.isIOSSystemShare
				})
			},
			downloadData: function(e) {
				n.request({
					name: n.METHOD_DOWNLOAD_DATA,
					url: e.url,
					callback: e.callback,
					suffix: e.suffix
				})
			},
			encode: function(e) {
				e && e.mode === "base64" && n.request({
					name: n.METHOD_ENCRYPT_BASE64,
					callback: e.callback,
					info: e.info
				})
			},
			choose_invoice_title: function(e) {
				n.request({
					name: n.METHOD_APP_CHOOSE_INVOICE_TITLE,
					callback: e.callback,
					title: e.title
				})
			}
		};
	i.file = {
		isFileExist: function(e) {
			n.request({
				name: n.METHOD_CHECK_FILE_EXIST,
				callback: e.callback,
				fileName: e.fileName,
				relativeFilePath: e.relativeFilePath
			})
		},
		deleteFile: function(e) {
			n.request({
				name: n.METHOD_DELETE_FILE,
				callback: e.callback,
				fileName: e.fileName,
				relativeFilePath: e.relativeFilePath
			})
		},
		getCurrentSandboxName: function(e) {
			n.request({
				name: n.METHOD_GET_CURRENT_SANDBOX_NAME,
				callback: e.callback
			})
		},
		getFileSize: function(e) {
			n.request({
				name: n.METHOD_GET_FILE_SIZE,
				callback: e.callback,
				fileName: e.fileName,
				relativeFilePath: e.relativeFilePath
			})
		},
		makeDir: function(e) {
			n.request({
				name: n.METHOD_MAKE_DIR,
				callback: e.callback,
				dirname: e.dirname,
				relativeFilePath: e.relativeFilePath
			})
		},
		readTextFromFile: function(e) {
			n.request({
				name: n.METHOD_READ_TEXT_FROM_FILE,
				callback: e.callback,
				fileName: e.fileName,
				relativeFilePath: e.relativeFilePath
			})
		},
		writeTextToFile: function(e) {
			n.request({
				name: n.METHOD_WRITE_TEXT_TO_FILE,
				callback: e.callback,
				text: e.text,
				isAppend: e.isAppend,
				fileName: e.fileName,
				relativeFilePath: e.relativeFilePath
			})
		}
	}, i.pipe = {
		socketRequest: function(e) {
			n.request({
				name: n.METHOD_SEND_H5_PIPE_REQUEST,
				callback: e.callback,
				serviceCode: e.serviceCode,
				header: e.header,
				data: e.data,
				sequenceId: Date.now()
			})
		},
		httpRequest: function(e) {
			var t = Date.now();
			return n.request({
				name: n.METHOD_SEND_HTTP_PIPE_REQUEST,
				callback: e.callback,
				target: e.url,
				method: e.method,
				header: e.header,
				queryData: e.param,
				retryInfo: e.retry,
				sequenceId: t
			}), t
		},
		abortRequest: function(e) {
			n.request({
				name: n.METHOD_ABORT_HTTP_PIPE_REQUEST,
				sequenceId: e.id
			})
		}
	}, i.pay = {
		checkStatus: function(e) {
			n.request({
				name: n.METHOD_CHECK_PAY_APP_INSTALL_STATUS,
				callback: e.callback
			})
		},
		payOut: function(e) {
			n.request({
				name: n.METHOD_OPEN_PAY_APP_BY_URL,
				payAppName: e.payAppName,
				payURL: e.payURL,
				successRelativeURL: e.successRelativeURL,
				detailRelativeURL: e.detailRelativeURL
			})
		}
	}, i.encrypt = {
		ctrip_encrypt: function(e) {
			n.request({
				name: n.METHOD_ENCRYPT_CTRIP,
				callback: e.callback,
				inString: e.inStr,
				encType: 1
			})
		},
		ctrip_decrypt: function(e) {
			n.request({
				name: n.METHOD_ENCRYPT_CTRIP,
				callback: e.callback,
				inString: e.inStr,
				encType: 2
			})
		}
	};
	var s = {
		jump: function(e) {
			e && e.url && typeof e.url == "string" && (window.location.href = e.url)
		},
		apply: function(e) {
			e && e.callback && typeof e.callback == "function" && e.callback()
		},
		call: function(e) {
			var t = document.getElementById("h5-hybrid-caller");
			if (!e || !e.url || !typeof e.url === "string") return !1;
			t && t.src == e.url ? t.contentDocument.location.reload() : t && t.src != e.url ? t.src = e.url : (t = document.createElement("iframe"), t.id = "h5-hybrid-caller", t.src = e.url, t.style.display = "none", document.body.appendChild(t))
		},
		init: function() {
			return !1
		},
		log: function(e) {
			window.console && window.console.log(e.name)
		},
		print: function(e) {
			return 0
		},
		callService: function() {
			window.location.href = "tel:4000086666"
		},
		backToLastPage: function() {
			window.location.href = document.referrer
		},
		checkUpdate: function() {
			return !1
		},
		recommend: function() {
			return !1
		},
		addWeixinFriend: function() {
			return !1
		},
		showNewestIntroduction: function() {
			return !1
		},
		register: function() {
			return !1
		},
		create: function() {
			return !1
		},
		home: function() {
			window.location.href = "/"
		},
		jumpHotel: function() {
			return !1
		},
		injectUbt: function() {
			return !1
		},
		checkAppInstall: function() {
			return !1
		},
		callPhone: function() {
			return !1
		},
		cross: function() {
			return !1
		},
		refreshNative: function() {
			return !1
		},
		copyToClipboard: function(e) {
			return !1
		},
		readFromClipboard: function(e) {
			return !1
		},
		shareToVendor: function(e) {
			return !1
		},
		downloadData: function(e) {
			return !1
		},
		encode: function(e) {
			return !1
		}
	};
	s.file = {
		isFileExist: function(e) {
			return !1
		},
		deleteFile: function(e) {
			return !1
		},
		getCurrentSandboxName: function(e) {
			return !1
		},
		getFileSize: function(e) {
			return !1
		},
		makeDir: function(e) {
			return !1
		},
		readTextFromFile: function(e) {
			return !1
		},
		writeTextToFile: function(e) {
			return !1
		}
	}, s.pipe = {
		socketRequest: function() {
			return !1
		},
		httpRequest: function() {
			return !1
		},
		abortRequest: function() {
			return !1
		}
	}, s.pay = {
		checkStatus: function() {
			return !1
		},
		payOut: function() {
			return !1
		}
	}, s.encrypt = {
		ctrip_encrypt: function() {
			return !1
		},
		ctrip_decrypt: function() {
			return !1
		}
	}, t.register({
		name: r,
		fn: e.isInApp() ? i : s
	})
})