define(['libs', 'c', 'cBasePageView', 'text!templates/city.html', 'cWidgetFactory', 'cWidgetGeolocation', 'cUICitylist', 'GolfModel','GolfStore', 'text!templates/destinationSearch.html'],
    function (libs, c, pageview, vacationcityTemplate, cWidgetFactory, cWidgetGeolocation, cUICitylist, golfModel, golfStore, destinationSearchTemplate) {
        var GeoLocation, curCity, prodListParam, isInApp, isAndroid, delayClick, productCategory;
        var GeoLocationStore = golfStore.GeoLocationStore.getInstance();
        var cityHistoryStore, ProdListParamStore , cityListStore ,cityHistory, cityListRender;

        var cityList = {}, renderData = { hasHistory: 0 }, fromSearch;
        var vacationCityView = pageview.extend({
            pageid : '275003',
            cityListModel: golfModel.CityListModel.getInstance(),
            render: function (data) {
                var tpl = this.initTemplate();
                this.$el.html(tpl({ "data": data }));
            },
            onCreate: function () {
                this.injectHeaderView();
            },
            events: {
                "click .associate": "citySelect",
                "click .area_title": "showCity",
                "click .item_select": "citySelect",
                "click #keyword": "doClick",
                "focus #keyword": "doFocus",
                "input #keyword": "placeSearch",
                "click .search_history": "cityChoose",
                "click .re_history": "resetHistory",
                "click .cancel": "backFun",
                "click .clear_input2": "clearInput",
                "touchstart .search_content": "mouseInSearchContent"
            },
            onLoad: function () {
                var self = this;
                isInApp = c.utility.isInApp();
                isAndroid = $.os && $.os.android;
                productCategory = !!this.getQuery('prdcategory') && !isNaN(this.getQuery('prdcategory')) ? this.getQuery('prdcategory') : 1; //productCategory: 1套餐 2旅行
                var _title;
                if(productCategory == 1){
                    cityHistoryStore = golfStore.PkgCityHistoryStore.getInstance();
                    ProdListParamStore = golfStore.PkgProdListParamStore.getInstance();
                    cityListStore = golfStore.PkgCityListStore.getInstance();
                    _title = "选择目的地";
                    this.pageid = '275003';
                    this.hpageid = '276003';
                } else{
                    cityHistoryStore = golfStore.TravelCityHistoryStore.getInstance();
                    ProdListParamStore = golfStore.TravelProdListParamStore.getInstance();
                    cityListStore = golfStore.TravelCityListStore.getInstance();
                    _title = "选择出发地";
                    this.pageid = '275005';
                    this.hpageid = '276005'
                }
                cityHistory = cityHistoryStore.get() || {};
                cityListRender = cityListStore.get() || {};

                self.showLoading();
                this.headerview.set({
                    title: _title,
                    back: true,
                    view: this,
                    tel: null,
                    events: {
                        returnHandler: function () {
                            this.back();
                        }
                    }
                });
                cityHistory = cityHistoryStore.get() || {};
                prodListParam = ProdListParamStore.get() || {  'departCtyName': '', 'departCtyId': '','destCtyName':'','destCtyId':'', 'renew': 1, 'vGlobal': {}, 'vPrice': {}, 'vDays': {} };
                //cityList = this.cityDataFormat(testData);//TODO TEST
                if(!!cityListRender && !!cityListRender.zimu && cityListRender.zimu.length){
                    self.render(cityListRender);
                    self.hideLoading();
                    this.headerview.show();
                    !fromSearch && this.turning();
                    !!fromSearch && (fromSearch = 0);
                }else{
                    this.getCityList();
                }
            },

            initTemplate: function () {
                return _.template(vacationcityTemplate);
            },
            getCityList: function () {
                var self = this;
                var geoLocation = GeoLocationStore.get() || {};
                self.cityListModel.param = {
                    "productCategory" : !!productCategory ? productCategory : 1 //产品类型（1--套餐 2--旅行）
                };

                self.cityListModel.execute(function (data) {
                    if(!!data && !!data.cities){
                        cityList = data.cities;
                        self.Locating();
                        cityList_format = self.cityDataFormat(data);

                        var cityData = {  cities:data,  zimu: cityList_format, hideCurrent: 0, selectedDepart: document.selectedDepart || {} };

                        if (!!geoLocation.name) {
                            cityData.geoLocation = geoLocation;
                            cityData.hideCurrent = 0;
                        }
                        else if (!geoLocation.fail) {
                            cityData.geoLocation = { name: "定位中...", id: 0 };
                            // 定位失败及海外定位时不显示当前城市section
                            setTimeout(function () {
                                geoLocation = GeoLocationStore.get() || {};
                                if(!!geoLocation.fail){
                                    $(".currentcity").hide();
                                }
                                cityListRender.geoLocation = geoLocation;
                                cityListRender.hideCurrent = geoLocation.fail;
                                cityListStore.set(cityListRender);
                            }, 20000);
                        }

                        if (!!cityHistory.destinationSeleHistory && !!cityHistory.destinationSeleHistory.length) {
                            cityData.destinationSeleHistory = cityHistory.destinationSeleHistory;
                        }
                        else {
                            cityData.destinationSeleHistory = undefined;
                        }
                        cityHistoryStore.set(cityHistory);
                        cityListRender = cityData;
                        cityListStore.set(cityListRender);//set cityDate to the store
                        self.render(cityData);
                        self.hideLoading();
                        //setTimeout(function(){$(".scrollalphabet")[0] && window.scroll(0, $(".scrollalphabet")[0].offsetTop)},0);
                        setTimeout(function () { self.hideLoading(); }, 0);
                        self.headerview.show();
                        !fromSearch && self.turning();
                        !!fromSearch && (fromSearch = 0);
                    }
                },function(errorInfo){
                    self.hideLoading();
                },false , this);
            },
            //TODO
            citySelect: function (e) {
                var _target = e.target || e.srcElement;
                this.setProdListParm(_target);
            },
            showCity: function (e) {
                var $currTarget = $(e.currentTarget);
                $currTarget.toggleClass("area_cur");
                $currTarget.next(".item_select").toggleClass("hidden");
                if ($currTarget.hasClass("alphabet")) { $currTarget.siblings(".alphabet").removeClass("area_cur").next(".item_select").addClass("hidden"); }
                if ($currTarget.hasClass("area_cur")) { window.scroll(0, $currTarget[0].offsetTop); }
            },
            searchresult: function (event) {
                var self = this;
                event && event.stopImmediatePropagation();
                $(".cancel").show();
                $("#destinationSearch").attr("class", "search_header");
                // WinPhone上只能靠隐藏了
                !isInApp && $("#headerview").hide();
                $(".city_box").hide();
                $(".search_content").removeClass("hidden");
                self.showDestSearch();
            },
            doFocus: function (event) {
                var self = this;
                //安卓设备不能触发focus事件，否则会有点透现象
                //IOS则必须使用focus，IOS中的input没有click事件
                if (isAndroid) { delayClick = setTimeout(function () { self.searchresult(event); }, 500); }
                else { this.searchresult(event); }
            },
            doClick: function (event) {
                clearTimeout(delayClick);
                this.searchresult(event);
            },
            onShow: function () {
            },
            onHide: function () {
                !isInApp && $("#headerview").show();
            },
            showDestSearch: function () {
                var self = this;
                // 隐藏标题栏。这里不使用this.headerview.hide(), 因为会有布局问题
                this.headerview.set({});
                this.headerview.html = '';
                this.headerview.show();
            },
            renderDestinationSearch: function (data) {
                var tpl = _.template(destinationSearchTemplate);
                this.$el.html(tpl({
                    "data": data
                }));
            },
            placeSearch: function (e) {
                $(".associate").html('');
                var values = $(e.currentTarget).val().toLowerCase();
                if (values && values.trim().length) { $(".sub_box").hide(); $(".clear_input2").show(); }
                else { this.clearInput(); }
                var theCity, cityJson = [], cityNameList = [];
                var cities = !!cityListRender && !!cityListRender.cities && !!cityListRender.cities.cities ? cityListRender.cities.cities : {};
                if (!!values && values.trim().length) {
                    for (var i = 0, l = cities.length; i < l; i++) {
                        theCity = cities[i];
                        if ($.inArray(theCity.cityName, cityNameList) < 0 && (theCity.cityName.indexOf(values) > -1 || theCity.pinYin.indexOf(values) == 0)) {
                            cityNameList.push(theCity.cityName);
                            cityJson.push('<li class="cityitem" data-ruler="item" data-id="' + theCity.cityID + '">' + theCity.cityName + '</li>');
                        }
                    }
                    if (cityJson.length) { $(".no_result").hide(); $(".associate").html(cityJson.join('')); }
                    else { $(".no_result").show(); }
                }
            },
            setProdListParm : function(_target){
                if (!!$(_target).data("id")) {
                    prodListParam.departCtyName = $(_target).text();//出发城市名
                    prodListParam.departCtyId = $(_target).data("id");//出发城市id
                    prodListParam.destCtyId = $(_target).data("id");
                    prodListParam.destCtyName  = $(_target).text();
                    ProdListParamStore.set(prodListParam);
                    // 添加搜索记录
                    //if (!cityHistory.departSearHistory) { cityHistory.departSearHistory = []; }
                    //cityHistory.departSearHistory = setHistoryArray(cityHistory.departSearHistory, { city: $(_target).text(), id: $(_target).data("id") }, 10);
                    if (!cityHistory.destinationSeleHistory) { cityHistory.destinationSeleHistory = []; }
                    cityHistory.destinationSeleHistory = setHistoryArray(cityHistory.destinationSeleHistory, { city: $(_target).text(), id: $(_target).data("id") }, 3);
                    cityListRender.destinationSeleHistory = cityHistory.destinationSeleHistory;
                    cityListStore.set(cityListRender);
                    cityHistoryStore.set(cityHistory);
                    //TODO BACK TO LIST PAGE
                    this.forward("#golf.list?prdcategory="+ productCategory + "&destctyid="+ prodListParam.destCtyId + "&destctyname=" + prodListParam.destCtyName +
                        "&salecity=" + prodListParam.departCtyId + "&sname=" + prodListParam.departCtyName + "&from=" + "/webapp/golf/index.html#golf.city");
                    //this.back();
                }
            },
            cityChoose: function (e) {
                !isInApp && $("#headerview").show();
                var _target = e.target || e.srcElement;
                this.setProdListParm(_target);
            },
            resetHistory: function () {
                cityHistory.departSearHistory = undefined;
                cityHistoryStore.set(cityHistory);
                this.onLoad();
            },
            backFun: function (e) {
                !isInApp && $("#headerview").show();

                if(productCategory == 1){
                    _title = "选择目的地";
                } else{
                    _title = "选择出发地";
                }

                this.headerview.set({
                    title: _title,
                    back: true,
                    view: this,
                    tel: null,
                    events: {
                        returnHandler: function () {
                            this.back();
                        }
                    }
                });
                this.headerview.show();
                e.preventDefault();
                $(".search_text").blur();
                $(".city_box").show();
                $(".search_content").addClass("hidden");
                $(".cancel").hide();
                $("#destinationSearch").attr("class", "top_box destination_search starting_top");
            },
            clearInput: function () {
                $(".no_result").hide();
                $(".associate").html('');
                $(".search_text").val('');
                !isInApp && $(".search_text").focus();
                $(".clear_input2").hide();
            },
            mouseInSearchContent: function () {
                $(".search_text").blur();
            },
            cityDataFormat: function(testData){
                var alphabetCities = [];
                if(!!testData){
                    var cities = _.groupBy(testData.cities,function(data){
                        var temp = data.pinYin.toLowerCase();
                        return temp.substring(0,1);
                    });
                    _.each(cities, function(v, k){
                        alphabetCities.push({"initial": (k.toUpperCase()), "data":v});
                    });

                    alphabetCities = _.sortBy(alphabetCities,function(data){
                        return data.initial;
                    });
                }
                return alphabetCities;
            },
            Locating: function () {
                geoLocation = GeoLocationStore.get() || {};
                if(!geoLocation.name){
                    geoLocation.startLocating = 1;
                    var getLocation = false;
                    GeoLocationStore.set(geoLocation);
                    GeoLocationWidget = cWidgetFactory.create('Geolocation');
                    GeoLocationWidget.requestCityInfo(function (jsonData) {
                        for (var i = 0, len = cityList.length; i < len; i++) {
                            if (jsonData.city.indexOf(cityList[i].cityName) > -1) {
                                geoLocation = { name: cityList[i].cityName, id: cityList[i].cityID };
                                getLocation = 1;
                                $("#curcity").text(geoLocation.name);
                                $("#curcity").data("id", geoLocation.id);
                                break;
                            }
                        }
                        if (!getLocation) {
                            geoLocation = { fail: 1 };
                            getLocation = 1;
                        }
                        GeoLocationStore.set(geoLocation);
                    }, function (err) {
                        geoLocation = { fail: 1 };
                        GeoLocationStore.set(geoLocation);
                    });
                }
            }
        });
        function setHistoryArray(currArray, newItem, total) {
            for (var i = 0, length = currArray.length; i < length; i++) {
                if (newItem.city == currArray[i].city) {
                    currArray.splice(i, 1);
                    break;
                }
            }
            currArray.unshift(newItem);
            while (currArray.length > total) {
                currArray.pop();
            }
            return currArray;
        }
        return vacationCityView;
    });