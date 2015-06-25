/**
 * Created by sq_xu on 14-6-22.
 */
define(['libs', 'c', 'cPageView', 'text!templates/golf.list.html', 'cWidgetFactory', 'cWidgetGeolocation', 'GolfStore', 'GolfModel', 'res/scripts/widget/c.ui.imageSlider', 'cWidgetGuider'],
    function (libs, c, pageview, listTemplate, cWidgetFactory, cWidgetGeolocation, golfStore, golfModel, cslide) {
        "use strict";
        var GeoLocationWidget, getLocation, geoLocation, prodListParam, renderData = {}, linetype, salecity, sname, destCityId, destCtyName, /**/
            currGolfType, renderData = {}, onceCount = 20, $baseLoad, currentScroll, showmore, showNext, isAndroid, productCategory; /*productCategory 1套餐 2 旅行*/
        var defaultDepartCity = "上海", defaultDepartCityId = "2", defaultDestCity = "上海", defaultDestCityId = "2";
        var Guider = cWidgetFactory.create('Guider');
        var isInApp = c.utility.isInApp();
        var ProdListParamStore, ProdListParam;
        var GeoLocationStore = golfStore.GeoLocationStore.getInstance();
        var SortType = ['', 'D', 'P', 'T'];
        var GolfType = ['', 'vGlobal', 'vPrice', 'vDays']; //排序类型（D-默认  P-价格  T-游玩天数）
        var tabScrollY = { vGlobal: 0, vPrice: 0, vDays: 0 },
            addmoreLoading = { vGlobal: 0, vPrice: 0, vDays: 0 },
            countStart = { vGlobal: 0, vPrice: 0, vDays: 0 };
        var vStoreData = { vGlobal: {}, vPrice: {}, vDays: {} };

        var groupView = pageview.extend({
            pageid: '275002', //TODO
            pkgTravelsListModel: golfModel.PkgTravelsListModel.getInstance(),
            render: function (data) {
                var tpl = this.initTemplate();
                this.$el.html(tpl({
                    "data": data
                }));
                $baseLoad = this.$el.find('.base_loading');
                this._checkImgPos = $.proxy(this.checkImgPos, this);
            },
            initTemplate: function () {
                return _.template(listTemplate);
            },
            onCreate: function () {
                // this.injectHeaderView();
                //this.render();Lizard2.0
            },
            events: {
                'click .hot_vacation .feature': "showOrHideFeature",
                "click .tpye_tab li": "tabSwitch",
                "click .hot_list_tab": "detail",
                "click .try_again": "tryAgain"
            },
            onLoad: function () {
                var self = this;
                isAndroid = $.os && $.os.android;
                $(".product_list").html('');
                $(".no_more").hide();
                self.showLoading();
                productCategory = !!this.getQuery('prdcategory') && !isNaN(this.getQuery('prdcategory')) ? this.getQuery('prdcategory') : 1;
                if (productCategory == 1) {
                    this.pageid = '275002';
                    this.hpageid = '276002';
                } else if (productCategory == 2) {
                    this.pageid = '275004';
                    this.hpageid = '276004';
                }
                ProdListParamStore = productCategory == 1 ? golfStore.PkgProdListParamStore.getInstance() : golfStore.TravelProdListParamStore.getInstance();
                ProdListParam = ProdListParamStore.get() || { vGlobal: {}, vPrice: {}, vDays: {} };

                !!this.tabScrollY && (tabScrollY = this.tabScrollY);

                showNext = function () { self.onWindowScroll(self); }
                linetype = (!!this.getQuery('type') && !isNaN(this.getQuery('type')) ? this.getQuery('type') : ProdListParam.linetype) || 1;

                salecity = this.getQuery('salecity') || ProdListParam.departCtyId || defaultDepartCityId; //出发城市id
                sname = this.getQuery('sname') || ProdListParam.departCtyName || defaultDepartCity; //出发城市名

                destCityId = this.getQuery('destctyid') || ProdListParam.destCtyId || defaultDestCityId; //目的地城市ID
                destCtyName = this.getQuery('destctyname') || ProdListParam.destCtyName || defaultDestCity; //目的地城市名

                // 1套餐 2旅行
                if (!ProdListParam.frompage) { ProdListParam.frompage = self.getQuery('from'); ProdListParamStore.set(ProdListParam); }
                currGolfType = GolfType[linetype];
                renderData = vStoreData[currGolfType];
                //this.headerview.show();
                self.headerReset();
                // renderData.products = testData.tourProducts; TODO TEST Data

                // this.turning();
                goOn();

                function goOn() {
                    //记录之前获取的各值
                    ProdListParam.linetype = linetype, ProdListParam.departCtyId = salecity || defaultDepartCityId, ProdListParam.departCtyName = sname || defaultDepartCity,
                    ProdListParam.destCtyId = destCityId || defaultDestCityId, ProdListParam.destCtyName = destCtyName || defaultDestCity;
                    ProdListParamStore.set(ProdListParam);

                    if (!ProdListParam.renew && !!renderData.products && renderData.products.length &&
                        ((productCategory == 1 && self.pkgTravelsListModel.param.cityID == destCityId) || (productCategory == 2 && self.pkgTravelsListModel.param.startCityID == salecity))) {
                        self.headerShow();
                    } else {
                        vStoreData[currGolfType] = {};
                        renderData = {};
                        self.getRenderDatas();
                    }
                    //tab切换时会触发滚动事件，我也不知道为什么。。。
                    /*   setTimeout(function () { $(window).bind("scroll", function () { self.BarHiding(); }); }, 0);*/
                }
            },
            showOrHideFeature: function (event) {
                // event.stopPropagation();
                event.stopImmediatePropagation();
                $(event.target).closest('.hot_list_tab').toggleClass("feature_show");

            },
            onWindowScroll: function (self) {
                //addmoreLoading的值：0：未加载，1：正在加载，2：全部加载完毕
                if (!!renderData.products && !$baseLoad.height() && !addmoreLoading[currGolfType]) {
                    $baseLoad.show()
                }

                function showMore() {
                    var checkHeight = $("#headerview")[0].clientHeight + $(".product_list")[0].clientHeight;

                    if (currentScroll + $(window).height() > checkHeight) {
                        console.log("scrollDown");
                        !addmoreLoading[currGolfType] && renderData.products && self.addmore()
                    }
                }

                if (addmoreLoading[currGolfType] == 2) {
                    $(window).unbind("scroll", showNext);
                    !!renderData.products && $(".no_more").show();
                }
                else {
                    currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    // 300毫秒延时，防止连续请求
                    clearTimeout(showmore);
                    showmore = setTimeout(showMore, 300);
                }
            },
            addmore: function (isLocal, callback) {
                var self = this;
                countStart[currGolfType] += onceCount;
                self.pkgTravelsListModel.param.pageIndex = countStart[currGolfType] / onceCount;
                var sortType = SortType[ProdListParam.linetype];

                self.pkgTravelsListModel.param =
                {
                    "productCategory": !!productCategory ? productCategory : 1, //产品类型（1--套餐 2--旅行）
                    "cityID": !!ProdListParam.destCtyId ? ProdListParam.destCtyId : -1, //目的地ID
                    "startCityID": !!ProdListParam.departCtyId ? ProdListParam.departCtyId : -1, //出发城市ID 必选
                    "sortType": sortType, //排序类型（D-默认  P-价格  T-游玩天数）
                    "sortDirection": "DESC", //排序方向，大写DESC，ASC
                    "pageIndex": countStart[currGolfType] / onceCount + 1,  //页码 从1开始
                    "pageSize": onceCount //每页大小
                };

                self.pkgTravelsListModel.execute(function (data) {
                    if (self.pkgTravelsListModel.param.sortType != SortType[ProdListParam.linetype]) {
                        return;
                    } else {
                        //TODO TEST DATA data = testData;
                        addmoreLoading[currGolfType] = 1;
                        data.destCtyId = self.pkgTravelsListModel.param.cityID;
                        data.departCtyId = self.pkgTravelsListModel.param.startCityID;
                        data.isInApp = isInApp;
                        data.isAndroid = isAndroid;

                        if (data.tourProducts && data.tourProducts.length) {
                            var tpl = '<%_.each(data.tourProducts, function(v,k){%>\
                            <ul class="hot_list_tab btn_active" data-pid="<%=v.productID %>&saleCityId=<%=v.saleCities.cityID %>&departCityId=<%=v.departCities.cityID %>">\
                            <li class="hot_img">\
                            <img width="142px" height="80px" alt="" src="http://pic.c-ctrip.com/vacation_v2/h5/group_travel/no_product_pic.png" data-src="<% if(!!data.isAndroid && v.androidPicUrl && !!v.androidPicUrl.trim()){%><%=v.androidPicUrl%> <%}else if(!data.isAndroid && v.iphonePicUrl && !!v.iphonePicUrl.trim()){%><%=v.iphonePicUrl%><%}else{ %>http://pic.c-ctrip.com/vacation_v2/h5/group_travel/no_product_pic.png<%} %>">\
                            </li>\
                            <li class="hot_vacation">\
                            <div class="ellipsis"><p class="xname"><%=v.name%></p></div>\
                            <div class="price_wrap">\
                            <div class="pices">\
                            <%if(!!v.price){ %>\
                            <dfn>¥</dfn>\
                            <span><%=v.price%></span>起\
                            <%}else{ %>\
                            <span class="font14">实时计价</span>\
                            <%} %>\
                            </div>\
                            <div class\
                            ="feature">\
                            <span>产品特色</span><i class=""></i>\
                            </div>\
                            </div>\
                            </li>\
                            <li class="product_feature">\
                            <%_.each(v.features, function(fv,fk){%>\
                            <p><%=fv%></p>\
                            <%})%>\
                            <%})%>';

                            var template = _.template(tpl);
                            var vList = $(template({ data: data }));
                            self.$el.find(".product_list").append(vList);
                            self.correctImage(vList);
                            var _storeData = vStoreData[currGolfType];
                            _storeData.products = (_storeData.products && _storeData.products.length ? _storeData.products : []).concat(data.tourProducts); //TODO
                            if (data.tourProducts.length == onceCount) {
                                addmoreLoading[currGolfType] = 0;
                            }
                            else {
                                addmoreLoading[currGolfType] = 2;
                                $(".no_more").show();
                            }
                        }
                        else {
                            addmoreLoading[currGolfType] = 2;
                            $(".no_more").show();
                        }

                        if (callback && $.type(callback) == 'function') {
                            callback.apply(null);
                        }
                        $baseLoad.hide();
                    }
                }, function (errorInfo) {
                    //console.info(errorInfo);
                    addmoreLoading[currGolfType] = 2;
                    $(".no_more").show();
                    $baseLoad.hide();
                }, false, this);
            },
            correctImage: function (container) {
                var $imgs = $("img", container);
                $imgs.each(function (index, element) {
                    var $this = $(element);
                    element.onload = function () { $this.show("fast"); };
                    // 增加error判断，当图片加载错误时，显示元素，alt文字会替代图片
                    element.onerror = function () {
                        $this.attr("src", "http://pic.c-ctrip.com/vacation_v2/h5/group_travel/no_product_pic.png");
                        //$this.show();
                    };
                })
            },
            tabSwitch: function (e) {
                $(window).unbind("scroll");
                //使用iscroll的坐标记录
                tabScrollY[GolfType[ProdListParam.linetype]] = window.scrollY;
                var self = this;
                var target = e.target || e.srcElement;
                var $target = $(target);
                if (!$target.hasClass('on')) {
                    $target.addClass('on');
                    $target.siblings('li').removeClass('on');
                    ProdListParam.linetype = $target.data('linetype');
                    ProdListParamStore.set(ProdListParam);
                    if (!!this.getQuery('type')) {
                        self.back();
                    } else {
                        self.onLoad();
                    }
                }
            },
            detail: function (e) {
                tabScrollY[currGolfType] = window.scrollY;
                // this.tabScrollY = tabScrollY;
                $(".tpye_tab").show();
                //TODO AT WEB RETURN HAS ISSUES
                var QueryString = '#detail?productId=' + $(e.currentTarget).data("pid") + '&from=/webapp/golf/index.html#golf.list?prdcategory=' + productCategory;
                if (isInApp) {
                    Guider.cross({
                        path: 'tour',
                        param: 'index.html' + QueryString
                    });
                } else {
                    //TODO TEMP
                    window.location.href = 'http://m.ctrip.com' + '/webapp/tour/index.html' + QueryString;
                }
            },
            headerUpdate: function (hData, setListTitle) {
                var self = this;
                self.header.set({
                    title: hData.title,
                    //tclass: hData.class||'',
                    subtitle: hData.subtitle, //目前无法使用subtitle
                    customtitle: hData.customtitle, //title和customtitle只能选择其一
                    back: true,
                    view: this,
                    tel: null,
                    home: hData.home,
                    custom: hData.custom ? hData.custom.html : '',
                    btn: hData.btn,
                    bindEvents: function ($el) {
                        if (hData.custom && hData.custom.class) {
                            $el.on('click', hData.custom.class, hData.custom.func)
                        }
                        if (hData.btn && hData.btn.classname) {
                            $el.on('click', '.' + hData.btn.classname, hData.btn.func)
                        }
                    },
                    events: {
                        returnHandler: hData.returnfunc,
                        homeHandler: hData.homefunc
                    },
                    commit: hData.commit
                });
                self.headerview.show();
                //self.headerview.htmlMap.title = '<h1 class="title"><%=title %></h1>';
            },
            showToast: function (msg, fun) {
                if (!fun) {
                    fun = function () { }
                }
                if (!this.toast) {
                    this.toast = new c.ui.Toast();
                }
                this.toast.show(msg, 2, fun, true);
            },
            headerReset: function () {
                var _btnTitle, _title;
                var self = this;
                if (productCategory == 1) {
                    _btnTitle = ((ProdListParam && ProdListParam.destCtyName) ? ProdListParam.destCtyName : defaultDestCity) + ">";
                    _title = '套餐';
                } else if (productCategory == 2) {
                    _btnTitle = (ProdListParam && ProdListParam.departCtyName) ? ProdListParam.departCtyName + "出发>" : defaultDepartCity + "出发";
                    _title = '旅行';
                }
                var hdata = {
                    title: _title,
                    home: false,
                    btn: { title: _btnTitle, id: 'confirmBtn', classname: 'header_r' },
                    homefunc: function (event) {
                        ProdListParam.frompage = undefined;
                        ProdListParamStore.set(ProdListParam);
                        IWanUtil.app_back_to_home();
                    },
                    returnfunc: function () {
                        var backpage = ProdListParam.frompage || '';
                        ProdListParam.frompage = undefined;
                        ProdListParamStore.set(ProdListParam);
                        if (backpage == 'nopage') {
                            isInApp ? Guider.backToLastPage({}) : self.back()
                        }
                        else if (/\/webapp\/(\S+)\/(\S+)/.test(backpage)) {
                            var _fromParams = backpage.match(/\/webapp\/(\S+)\/(\S+)/);
                            isInApp ? Guider.cross({ path: _fromParams[1], param: _fromParams[2] }) : window.location = _fromParams[0];
                        }
                        else {
                            this.back((backpage || '#index'));
                        }
                    },
                    commit: { id: 'confirmBtn', callback: function () { self.forward("#golf.city?prdcategory=" + productCategory); } }
                };
                self.headerUpdate(hdata, 1);
            },
            headerShow: function () {
                var self = this;
                self.headerReset();
                self.hideLoading();
                self.render(renderData);
                self.turning();
                if (renderData.products && renderData.products.length < onceCount) {
                    addmoreLoading[currGolfType] = 2;
                    $(".no_more").show();
                }
                $(window).bind("scroll", showNext);
                //改用iscroll，以下代码不需要
                /*                        if (self.referrer != 'index') {
                //来源不是列表页的时候进行重定位，列表和查询页进来没必要使用该方法
                window.scrollTo((self.scrollPos ? self.scrollPos.x : 0), tabScrollY[currTourType]);
                }*/
            },

            getRenderDatas: function () {
                var self = this;
                renderData.isInApp = isInApp;
                renderData.isAndroid = isAndroid;

                //重新查询时重置滚动高度
                //当从首页进入或者搜索城市发生改变时，初始化相关值。不支持浏览器刷新，即当使用浏览器刷新时，会进入下面条件初始化。
                if (ProdListParam.renew || (productCategory == 1) ? (self.pkgTravelsListModel.param.cityID != destCityId) : (self.pkgTravelsListModel.param.startCityID != salecity)) {
                    ProdListParam.renew = 0;
                    ProdListParam.vGlobal = {};
                    ProdListParam.vPrice = {};
                    ProdListParam.vDays = {};
                    ProdListParamStore.set(ProdListParam);
                    tabScrollY = { vGlobal: 0, vPrice: 0, vDays: 0 },
                    addmoreLoading = { vGlobal: 0, vPrice: 0, vDays: 0 },
                    countStart = { vGlobal: 0, vPrice: 0, vDays: 0 };
                    vStoreData = { vGlobal: {}, vPrice: {}, vDays: {} };
                }

                var sortType = SortType[ProdListParam.linetype];
                self.pkgTravelsListModel.param =
                {
                    "productCategory": !!productCategory ? productCategory : 1, //产品类型（1--套餐 2--旅行）
                    "cityID": !!ProdListParam.destCtyId ? ProdListParam.destCtyId : -1, //目的地ID
                    "startCityID": !!ProdListParam.departCtyId ? ProdListParam.departCtyId : -1, //出发城市ID 必选
                    "sortType": sortType, //排序类型（D-默认  P-价格  T-游玩天数）
                    "sortDirection": "DESC", //排序方向，大写DESC，ASC
                    "pageIndex": 1,  //页码 从1开始
                    "pageSize": onceCount //每页大小
                };
                self.pkgTravelsListModel.execute(function (data) {
                    //TODO TEST DATA data = testData;//
                    renderData.products = data.tourProducts;
                    renderData.linetype = linetype;
                    renderData.destCtyId = self.pkgTravelsListModel.param.cityID;
                    renderData.departCtyId = self.pkgTravelsListModel.param.startCityID;
                    renderData.productCategory = self.pkgTravelsListModel.param.productCategory;
                    renderData.isInApp = isInApp;
                    renderData.isAndroid = isAndroid;
                    renderData.scrollproductHeight = document.body.offsetHeight - 48;
                    vStoreData[currGolfType] = renderData; //TYPE DATA STORED
                    //TODO temporary
                    self.headerShow();
                }, function () {
                    self.hideLoading();
                    self.render({ isInApp: isInApp });
                    $(".wireless_failure").show();
                    $(".error").hide();
                }, false, this);

            },
            /* Locating: function () {
            geoLocation = GeoLocationStore.get() || {};
            geoLocation.startLocating = 1;
            var getLocation = false;
            GeoLocationStore.set(geoLocation);
            GeoLocationWidget = cWidgetFactory.create('Geolocation');
            GeoLocationWidget.requestCityInfo(function (jsonData) {
            for (var i = 0, len = cityList.length; i < len; i++) {
            if (jsonData.city.indexOf(cityList[i].name) > -1) {
            geoLocation = { name: cityList[i].name, id: cityList[i].id };
            getLocation = 1;
            if(productCategory == 2){
            ProdListParam.departCtyName = geoLocation.name;
            ProdListParam.departCtyId = geoLocation.id;
            }else{
            ProdListParam.destCtyName = geoLocation.name;
            ProdListParam.destCtyId = geoLocation.id;
            }

            ProdListParamStore.set(ProdListParam);
            break;
            }
            }
            if (!getLocation) {
            geoLocation = { fail: 1 };
            getLocation = 1;
            if(productCategory == 2){
            ProdListParam.departCtyName = defaultDepartCity;
            ProdListParam.departCtyId = defaultDepartCityId;
            }else{
            ProdListParam.destCtyName = defaultDepartCity;
            ProdListParam.destCtyId = defaultDepartCityId;
            }

            ProdListParamStore.set(ProdListParam);
            }
            GeoLocationStore.set(geoLocation);
            }, function (err) {
            geoLocation = { fail: 1 };
            GeoLocationStore.set(geoLocation);
            if(productCategory == 2){
            ProdListParam.departCtyName = defaultDepartCity;
            ProdListParam.departCtyId = defaultDepartCityId;
            }else{
            ProdListParam.destCtyName = defaultDepartCity;
            ProdListParam.destCtyId = defaultDepartCityId;
            }
            ProdListParamStore.set(ProdListParam);
            });
            },*/
            checkImgPos: function () {
                var self = this;
                var $productList = this.$el.find('.product_list');
                if ($productList.find('img').length) {
                    var ULs = $productList.find('ul');
                    ULs.each(function (index, element) {
                        if ((document.body.scrollTop + document.body.offsetHeight) > ($(element).offset().top)) {
                            self.loadImgsInDom($(element));
                            //console.log($(element).find('.content').text());
                        }
                    });
                }
            },
            loadImgsInDom: function ($dom) {
                if ($dom.length < 1) return;

                //$dom参数可接受zepto选择器或者原生JS节点
                if ($.type($dom) != 'array') { $dom = $($dom); }

                var $imgs = $("img", $dom);
                $imgs.each(function (index, element) {
                    var $this = $(element);
                    var dataSrc = $this.attr("data-src");
                    if ($this.attr("src") != dataSrc) {
                        $this.css("display", "none");
                        element.onload = function () { $this.show(); };
                        // 增加error判断，当图片加载错误时，显示元素，alt文字会替代图片
                        element.onerror = function () { $this.show(); };
                        // 交换src和onload加载的顺序，避免图片加载过快不执行onload事件
                        $this.attr("src", dataSrc);
                    }

                })
            },

            /*重试网络不好*/
            tryAgain: function () {
                this.onLoad();
            },

            onShow: function () {
                this.onLoad(); //lizard 2.0 
                //lazyload image
                if (this.$el.find('.product_list').length) {
                    $(window).bind('scroll', this._checkImgPos);
                    $(window).bind('touchmove', this._checkImgPos);
                }
                this.checkImgPos();
                var self = this;
                this.correctImage($(".product_list"));
            },
            onHide: function () {
            }
        });
        return groupView;
    });
