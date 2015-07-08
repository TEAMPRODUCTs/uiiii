define(["cStore", "cBase"], function(cs, cb) {
    var _ret = {};
    var _base = new cb.Class(cs, {
        __propertys__: function() {},
        initialize: function($super, options) {
            $super(options);
        }
    });
    _ret.CustomStore = function(key, lifeTime) { //自定义
        return new cb.Class(_base, {
            __propertys__: function() {
                this.key = key;
                this.lifeTime = lifeTime;
            },
            initialize: function($super, options) {
                $super(options)
            }
        })
    };
    //order传递参数store
    _ret.OrderParamStore = _ret.CustomStore("GOLF-ORDER-PARAM", "1d");

    //TODO DELETED { {vGlobal: {}, vPrice: {}, vDays: {}} };
    _ret.ProdListParamStore = _ret.CustomStore("GOLFS_PRODUCT_LIST_PARAM", "1d");

    //高尔夫套餐列表{vGlobal: {}, vPrice: {}, vDays: {}}
    _ret.PkgProdListParamStore = _ret.CustomStore("GOLFS_PACKAGE_PRODUCT_LIST_PARAM", "1d");

    //高尔夫旅行列表{vGlobal: {}, vPrice: {}, vDays: {}}
    _ret.TravelProdListParamStore = _ret.CustomStore("GOLFS_TRAVEL_PRODUCT_LIST_PARAM", "1d");

    //高尔夫套餐城市列表历史城市
    _ret.PkgCityHistoryStore = _ret.CustomStore("GOLFS_PACKAGE_CITY_HISTORY", "365d");

    //高尔夫旅行城市列表历史城市
    _ret.TravelCityHistoryStore = _ret.CustomStore("GOLFS_TRAVEL_CITY_HISTORY", "365d");

    //高尔夫套餐城市列表
    _ret.PkgCityListStore = _ret.CustomStore("GOLFS_PACKAGE_CITY_LIST", "1d");

    //高尔夫旅行城市列表
    _ret.TravelCityListStore = _ret.CustomStore("GOLFS_TRAVEL_CITY_LIST", "1d");

    //Golf Geo Location
    _ret.GeoLocationStore = _ret.CustomStore("GOLFS_GEOLOCATION", "1d");


    /********************************
     * @description:  绑定bill单临时参数
     */
    _ret.BookingConfirmTemp = new cb.Class(_base, {
        __propertys__: function () {
            this.key = 'S_GOLF_BOOKINGCONFIRM_TEMP';
            this.lifeTime = '1H';
            this.defaultData = {
                orderid : 0,
                externalno : "",
                billno : "",
                paytype : 0
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });



    /********************************
     * @description:  绑定bill单参数
     */
    _ret.BookingConfirmParam = new cb.Class(_base, {
        __propertys__: function () {
            this.key = 'S_GOLF_BOOKINGCONFIRM_PARAM';
            this.lifeTime = '1H';
            this.defaultData = {
                tempoid : 0,
                amt : 0,
                payinfo : {
                    paytype : 0,
                    paymode : 1,
                    extno : "",
                    billno : ""
                }
            };
        },
        initialize: function ($super, options) {
            $super(options);
        },
        setParam : function(data){
            for (var key in data) {
                this.setAttr(key, data[key]);
            }
        }
    });

    //Leaderboard summary
    _ret.LeaderBoardSummaryStore = _ret.CustomStore("LEADERBOARD-SUMMARY", "1d");

    //Leaderboard summary
    _ret.LeaderBoardStore = _ret.CustomStore("LEADERBOARD-DETAILS", "1d");


    /**
     * save url hash params to localStorage,every store which extends cs will has this method.
     *
     * @param {String} arg1,arg2,... 字符串参数,是你想通过store.setAttr方法将url的hash参数存到localStorge的参数，如果个数为0，则会将所有的url的hash参数通用store.setAttr存到localStorage
     * @param {Function} fn 可选的callback，如果此callback不为空，则该函数不会调用 store.setAttr将url的hash参数存到localStorage中，而是由此callback自行处理。
     * @return {Object} 返回url的hash参数值，若指定的url的hash参数个数为0，则返回所有的url的hash参数及其值
     */

    cs.prototype.setURLParamsToStore = function() {
        var args = [].slice.call(arguments),
            len = args.length,
            self = this,
            fn;
        function getJsonLength(json){
            var len = 0;
            for (var key in json) {
                if (typeof json[key] === 'undefined' || json[key] === null) {
                    continue;
                }
                len++;
            };
            return len;
        };
        function splits(str){
            str += "";
            if ((str.length < 1) || (str.indexOf(",") < 0)) {
                return str;
            }
            var temp = str.split(",");
            for (var i = temp.length-1; i >= 0; i--) {
                var t = "" + temp[i];
                if (t.length > 0) {
                    return t;
                }
            }
            return "";
        };

        if (len > 0 && typeof args[len - 1] === 'function') {
            fn = args.pop();
        }
        var argVals = self.getURLParams.apply(self,args);
        if (typeof argVals === 'string') {
            argVals = [argVals];
        }
        if (typeof fn === 'function') {
            var vals = [];
            $.each(argVals,function(k,v) {
                vals.push(v);
            });
            fn.apply(self,vals);
        } else {
            var len = getJsonLength(argVals);
            if (len > 0) { //先清空
                var defaultData = self.defaultData;
                if (defaultData) {
                    $.each(defaultData,function(k,v) {
                        self.setAttr(k,v);
                    });
                }

                $.each(argVals,function(k,v) {
                    if (v == undefined) {
                        return;
                    }
                    v = splits(v);
                    self.setAttr(k,v);  //存成值
                });
            };
        }
        return argVals;
    };

    /**
     * fetch url hash params' value
     *
     * @param {String} arg1,arg2,... url的hash参数，如果个数为0，返回｛Object}所有的url的hash参数值,个数为1，返回一个字符串值，个数大于1，返回｛Object｝指定的参数及其值
     * @returns {Object|String} 返回url的hash参数值，若指定的url的hash参数个数为0，则返回所有的url的hash参数及其值
     */
    cs.prototype.getURLParams = function() {
        var hashUrl = decodeURIComponent(window.location.hash.replace(/^#+/i,'')).toLowerCase(),
            params = parseHash(hashUrl),
            query = params['query'] || {},
            args = [].slice.call(arguments),
            ret = {};

        switch(args.length) {
            case 0:
                return query;
            default :
                args.forEach(function(el) {
                    ret[el] = query[el];
                });
                break;
        }

        return ret;
    };


    var parseHash = function (hash) {
        var fullhash = hash,
            hash = hash.replace(/([^\|]*)(?:\|.*)?$/img, '$1'),
            h = /^([^?&|]*)(.*)?$/i.exec(hash),
            vp = h[1] ? h[1].split('!') : [],
            viewpath = (vp.shift() || '').replace(/(^\/+|\/+$)/i, ''),
            path = vp.length ? vp.join('!').replace(/(^\/+|\/+$)/i, '').split('/') : {},
            q = (h[2] || '').replace(/^\?*/i, '').split('&'),
            query = {}, y, qn;

        if (q) {
            for (var i = 0; i < q.length; i++) {
                if (q[i]) {
                    y = q[i].split('=');
                    y[1] ? (qn = y.shift(), query[qn] = y.join('=')) : (query[y[0]] = '');
                }
            }
        }

        return {
            viewpath: viewpath,
            path: path,
            query: query,
            root: location.pathname + location.search,
            fullhash: fullhash
        };
    };

    return _ret;
});