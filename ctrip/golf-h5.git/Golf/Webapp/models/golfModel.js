define(["c", "cModel", "cBase", 'CommonStore', 'GolfStore', 'res/scripts/util', 'cUtility'],
    function (c, cModel, cBase, commonStore, store, util, cUtility) {
        var _ret = {};
        var _base = new cBase.Class(cModel, {
            __propertys__: function () {
                var bdomain, bpath;

                var env = util.getEnvCode(cUtility);
                if (env == 0) {//测试环境
                    bdomain = "mobile.api.fun.fat62.qa.nt.ctripcorp.com:8080";
                    bpath = 'fun-golf-mobile/';

                } else if (env == 1) {//堡垒环境
                    bdomain = "mobile.api.fun.ctripcorp.com";
                    bpath = 'fun-golf-mobile/';
                }else if(env == -1){//自定义
                    var  userStore = commonStore.UserStore.getInstance();
                    var user = userStore.getUser();
                    bdomain = !!user&&user.domain ? user.domain : "172.16.130.7:8080";
                    bpath =  !!user&&user.path ? user.path :'fun-golf-mobile/';
                }  else{//生产环境
                    this.protocol = "https";
                    bdomain = "sec-m.ctrip.com";
                    bpath = "restapi/fun-golf-mobile/";
                }
                this.env = env;

                this.baseurl = {
                    domain: bdomain,
                    path: bpath
                };
                this.method = 'POST';
                this.param = {};
                this.result = null;
            },
            initialize: function ($super, options) {
                $super(options);
            },
            vaGet: function (name) {
                return util.memoryCache.get(name);
            },
            vaGetCache: function (name) {
                return this.vaGet(name || this._buildurl());
            },
            vaSet: function (name, value) {
                return util.memoryCache.set(name, value);
            },
            vaRemove: function (name) {
                return util.memoryCache.remove(name);
            },
            /*
            * @param {Boolean} [cacheInMemory = true] // 是否需要内存缓存
            * @param {String} [cacheKey = apiPath] //
            * @param {Function} onComplete
            * @param {Function} onError
            * @param {Function} onAlways // 无论成功或失败，都会调用
            * @param {Boolean} ajaxOnly
            * @param {Object} scope
            * @param {Function} onAbort
            */
            vaExec: function (options) {
                options = _.extend({
                    cacheInMemory: true,
                    cacheKey: this._buildurl()
                }, options);

                var callbackArgs;
                var self = this;
                var scope = options.scope || this;
                //if (options.cacheInMemory && (cacheValue = this.vaGet(options.cacheKey))) {
                //    options.onComplete.call(scope, cacheValue, checkNotError);
                //    always([cacheValue]);
                //    return this;
                //} else {
                    return this.execute(function (json) {
                        callbackArgs = arguments;
                        // 成功，直接保存和传递使用 json.data
                        if (json.errno == 0) {
                            if (options.cacheInMemory) {
                                self.vaSet(options.cacheKey, json.data);
                            }
                            // 保证还使用原来的 this
                            options.onComplete && options.onComplete.call(scope, json.data, checkNotError);
                        }
                        // 失败，直接走 onError 的流程
                        else {
                            error();
                        }
                        always(callbackArgs);
                    }, function () {
                        callbackArgs = arguments;
                        error();
                        always(callbackArgs);
                    }, options.ajaxOnly, scope, options.onAbort);
                //}

                function checkNotError(trueCondition, errorMessage) {
                    if (!trueCondition) {
                        error(errorMessage);
                        self.vaRemove(options.cacheKey);
                    }
                    return trueCondition;
                }

                function error(errorMessage) {
                    var error = callbackArgs[0];
                    if (Object.prototype.toString.call(error) !== '[object Object]') error = { originError: error };
                    error.errmsg = errorMessage || error.errmsg || error.msg;
                    options.onError && options.onError.call(scope, error);
                }

                function always(args) {
                    options.onAlways && options.onAlways.apply(scope, args);
                }
            },
            // 改自 Lizard
            _buildurl: function () {
                return this.protocol + '://' + this.baseurl.domain + '/' + this.baseurl.path + (typeof this.url === 'function' ? this.url() : this.url) + util.paramStringify(this.param);
            }
        });

        //提交订单
        _ret.SubmitOrderModel = new cBase.Class(_base, {
            __propertys__: function(){
              //  this.url = 'v1/orders/submit';
                this.url = 'v2/:token/orders/:orderNo/submit/:isThird';
                this.param = {};
                this.result = null;
                this.method = "GET";
            },
            setParameter: function(token, orderNo, isThird) {
                this.url = this.url.replace(":token", token);
                this.url = this.url.replace(":orderNo",orderNo);
                this.url = this.url.replace(":isThird",isThird);
            },
            initialize: function($super, options){
                $super(options);
            }
        });

        //套餐列表 旅游列表
        _ret.PkgTravelsListModel = new cBase.Class(_base, {
            __propertys__: function(){
                //this.url = 'v1/orders';//TODO Change the TravelsListModel
                this.url = '/v1/tourProducts';
                this.param = {
                    "productCategory": "2", //产品类型（1--套餐 2--旅行）
                    "cityID":"2",//目的地ID
                    "startCityID": "2",//出发城市ID 必选
                    "sortType": "D",//排序类型（D-默认  P-价格  T-游玩天数）
                    "sortDirection":"DESC", //排序方向，大写DESC，ASC
                    "pageIndex":1,  //页码 从1开始
                    "pageSize":20 //每页大小
                };
                this.method = "GET";
                this.result = null;
            },
            initialize: function($super, options){
                $super(options);
            }
        });

        // 套餐，旅行城市列表
        _ret.CityListModel = new cBase.Class(_base, {
            __propertys__: function () {
                this.url = '/v1/tourProductCities';
                this.param = {
                    "productCategory": 1  //产品类型（1--套餐 2--旅行）
                };
                this.result = null;
                this.method = "GET";
            },
            initialize: function ($super, options) {
                $super(options);
            }
        });

        // 保存推荐码
        _ret.RecommendModel = new cBase.Class(_base, {
            __propertys__: function () {
                this.url = '/v2/users/recommend';
                this.param = {
                    "token": "" , //token
                    "recommendCode":""
                };
                this.result = null;
                this.method = "GET";
            },
            initialize: function ($super, options) {
                $super(options);
            }
        });

        //搜索推荐用户
        _ret.RecommendUsersModel = new cBase.Class(_base, {
            __propertys__: function () {
                this.url = '/v2/recommendUsers';
                this.param = {
                    "token": "" , //token
                    "pagerOffset": 0, //分页偏移,从0开始
                    "pagerPerPage": 100, //每页显示多少条，最多100
                    "sortType": "D", //排序类型(D--默认)
                    "sortDirection":"ASC" //排序方向，大写DESC，ASC
                };
                this.result = null;
                this.method = "GET";
            },
            initialize: function ($super, options) {
                $super(options);
            }
        });

        var LeaderBoardBaseModel = new cBase.Class(_base, {
            __propertys__: function () {
                this.method = 'GET';
                var headInfo = commonStore.HeadStore.getInstance().get();
                this.authString = cUtility.isInApp() ? headInfo.auth : "";
            },
            setGameAccessCode: function(gameID, passcode) {
                this.gameID = gameID;
                this.url = this.url.replace(":id", gameID);

                if(passcode) {
                    this.param.passcode = passcode;
                }
                else {
                    if(this.authString) {
                        this.param.auth_string = this.authString;
                    }
                }

                this.fullParam = $.extend({}, this.param);       //clone the para object
                this.fullParam.game_id = this.gameID;
            },
            initialize: function ($super, options) {
                $super(options);
            },
            load: function(onSuccess, onFailure) {
                var cachedData = this.result.get();

                if(!cachedData || cachedData.gameID !== this.gameID
                    || !cachedData.data.version) {
                    //console.log("no cached data");
                    delete this.param.version;
                } else {
                    //console.log("cached data version:"+cachedData.data.version);
                    this.param.version = cachedData.data.version;
                }

                this.execute(function (json){
                    switch(json.code) {
                        case undefined:
                            onSuccess(json, true);
                            this.result.set({gameID: this.gameID, data: json});
                            break;
                        case 304:                                   //No update
                            //console.log("304: no update received");
                            onSuccess(cachedData.data, false);
                            break;
                        default:
                            onFailure && onFailure(json.message);
                            break;
                    }
                }, function(){
                    onFailure && onFailure("无法获取计分数据。");
                });
            },
            refresh:function(onSuccess, onFailure){
                this.load(onSuccess, onFailure);
            }
        });

        _ret.LeaderBoardSummaryModel = new cBase.Class(LeaderBoardBaseModel, {
            __propertys__: function () {
                this.url = "games/:id/leader_board/summary";
                this.result = store.LeaderBoardSummaryStore.getInstance();
            },
            initialize: function ($super, options) {
                $super(options);
            },
            deletePlayer: function(playerID, onSuccess, onFailure, onCancel) {
                var self = this;

                //this.authString = "069818DDC3E7152CBCBC4FAA461255E490D9021947823074ED19EA7BAE1BCCE1";
                var url = this.protocol + '://' + this.baseurl.domain + "/" + this.baseurl.path
                    + "games/" + this.gameID + "/leader_board/details/"
                    + playerID.toString()
                    + "?auth_string=" + this.authString;

                //if(cUtility.isInApp()) {
                //    CtripUtil.app_log("deleting url:[" + url + "]");
                //}

                var deleteAlert = new c.ui.Alert({
                    title: '提示信息',
                    message: '您确定要删除此参赛人？',
                    buttons: [{
                        text: '取消',
                        click: function () {
                            this.hide();
                            onCancel && onCancel();
                        },
                        type: c.ui.Alert.STYLE_CANCEL
                    }, {
                        text: '确定',
                        click: function () {
                            self.executeDelete(url, onSuccess, onFailure);
                            this.hide();
                        },
                        type: c.ui.Alert.STYLE_CONFIRM
                    }]
                });

                deleteAlert.show();
             },
            deleteGame: function(onSuccess, onFailure, onCancel){
                var self = this;
                var url = this.protocol + '://' + this.baseurl.domain + "/" + this.baseurl.path
                    + "games/me/" + this.gameID
                    + "?auth_string=" + this.authString;

                var deleteAlert = new c.ui.Alert({
                    title: '提示信息',
                    message: '您确定要删除此次参赛记录？',
                    buttons: [{
                        text: '取消',
                        click: function () {
                            this.hide();
                            onCancel && onCancel();
                        },
                        type: c.ui.Alert.STYLE_CANCEL
                    }, {
                        text: '确定',
                        click: function () {
                            self.executeDelete(url, onSuccess, onFailure);
                            this.hide();
                        },
                        type: c.ui.Alert.STYLE_CONFIRM
                    }]
                });

                deleteAlert.show();
            },
            executeDelete: function(url, onSuccess, onFailure){
                $.ajax({
                    url: url,
                    type: "DELETE",
                    success: function (data, textStatus, jqXHR) {
                        if(data.code) {
                            onFailure(data.message);
                        }else {
                            onSuccess();
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        onFailure(errorThrown);
                    }
                });
            }
         });

        _ret.LeaderBoardModel = new cBase.Class(LeaderBoardBaseModel, {
            __propertys__: function () {
                this.url = "games/:id/leader_board/details";
                this.result = store.LeaderBoardStore.getInstance();
            },
            initialize: function ($super, options) {
                $super(options);
            }
         });

        return _ret;
    });