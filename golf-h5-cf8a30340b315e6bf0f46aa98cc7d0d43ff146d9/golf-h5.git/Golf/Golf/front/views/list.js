define(['libs', 'c', 'cBasePageView', 'text!templates/list.html', 'cWidgetFactory', 'cWidgetGeolocation', 'GolfStore',  'GolfModel',  'res/scripts/widget/c.ui.imageSlider','cUtilityCrypt', 'cWidgetGuider'],
    function (libs, c, pageview, listTemplate, cWidgetFactory, cWidgetGeolocation, golfStore, golfModel, cslide, Crypt) {
        "use strict";
        var GeoLocationWidget, getLocation, geoLocation,  $g_depart, $g_dest, prodListParam, imgsData;
        var defaultDepartCity = "上海", defaultDepartCityId = "2";
        var Guider = cWidgetFactory.create('Guider');
        var isInApp = c.utility.isInApp();
        var ProdListParamStore = golfStore.ProdListParamStore.getInstance();

        var ProdListParam = ProdListParamStore.get() || {vGlobal: {}, vPrice: {}, vDays: {}};
        var golfType = ['', 'vGlobal', 'vPrice', 'vDays'];
        var selfView = null;
        var groupView = pageview.extend({
            pageid: '220001',
            render: function () {
                this.$el.html(listTemplate);
            },
            onCreate: function () {
                this.injectHeaderView();
                this.render();
            },
            events: {
                'click .hot_vacation .feature span': "showOrHideFeature"
            },
            onLoad: function () {
                var self = this;
                selfView = this;


                var testData = {"count":2,"cities":[
                    {"cityID":17,"cityName":"苏州","pinYin":"su zhou","count":1},
                    {"cityID":14,"cityName":"杭州","pinYin":"hang zhou","count":1},
                    {"cityID":15,"cityName":"广州","pinYin":"guang zhou","count":1},
                    {"cityID":16,"cityName":"包头","pinYin":"bao tou","count":1},
                    {"cityID":2,"cityName":"上海","pinYin":"shang hai","count":1}]};
                var alphabetCities = [];
                if(!!testData){
                    var cities = _.groupBy(testData.cities,function(data){
                        return data.pinYin.substring(0,1);
                    });

                    _.each(cities, function(v, k){
                        alphabetCities.push({"initial":k, "data":v});
                    });
                    alphabetCities = _.sortBy(alphabetCities,function(data){
                        return data.initial;
                    });
                    return alphabetCities;
                }


                this.headerview.set({
                    customtitle:'球场',
                    back: true,
                    view: this,
                    tel: null,
                    citybtn: 'city',
                    btn: {title: "所有目的地>", id: 'confirmBtn', classname: 'header_r'},
                    home: false,
                    events: {
                        returnHandler: function () {
                           // this.back("/tour/index.html");
                           /* if (shareSource) {//如果有分享则跳首页
                                this.back('index');
                            }else if (fromPage == 'nopage') {
                                isInApp ? Guider.backToLastPage({}) : self.back()
                            }
                            else if (/\/webapp\/(\S+)\/(\S+)/.test(fromPage)) {
                                var _fromParams = fromPage.match(/\/webapp\/(\S+)\/(\S+)/);
                                isInApp ? Guider.cross({ path: _fromParams[1], param: _fromParams[2] }) : window.location = _fromParams[0];
                            }
                            else {
                                this.back((fromPage || '#vacationslist'));
                            }*/
/*
                            alert("testtest");
                            Guider.apply({ callback: function () { alert("#ubdex");self.jump('#index') }, hybridCallback: function () { alert("/tour/index.html");this.back("/tour/index.html") ;} });*/
                        }
                    }
                });
                this.headerview.show();
                this.turning();

            },
            showOrHideFeature: function(){
                this.forward("leaderboard.summary?game_id=" + this.getQuery("game_id"));
                $(event.target).closest('.hot_list_tab').toggleClass("feature_show");
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

            onShow: function () {

            },
            onHide: function () {
            },
            Locating: function () {
                geoLocation = GeoLocationStore.get() || {};
                geoLocation.startLocating = 1;
                GeoLocationStore.set(geoLocation);
                GeoLocationWidget = cWidgetFactory.create('Geolocation');
            }
        });
        selfView = groupView;
        return groupView;
    });