define(['libs', 'c', 'cPageView', 'text!templates/index.html', 'cWidgetFactory', 'cWidgetGeolocation', 'GolfStore', 'GolfModel', 'ImageSlider', 'cWidgetGuider'],
    function (libs, c, pageview, indexTemplate, cWidgetFactory, cWidgetGeolocation, golfStore, golfModel, cslide) {
        var GeoLocationWidget, getLocation, geoLocation, $g_depart, $g_dest, prodListParam, imgsData;
        var defaultDepartCity = "上海", defaultDepartCityId = "2";
        var Guider = cWidgetFactory.create('Guider');
        var isInApp = c.utility.isInApp(); //Internal.isInApp;
        var groupView = pageview.extend({
            pageid: '275001',
            hpageid: '276001',
            render: function () {
                this.$el.html(indexTemplate);
            },
            onCreate: function () {
                this.render();
            },
            events: {
                "click .golf_tab": "goToGolfLst",
                "click .golf_product a": "goToDetail"
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
            goToLst: function (prdcategory) {
                if (isInApp) {
                    Guider.cross({
                        path: "golf",
                        param: "index.html#golf.list?prdcategory=" + prdcategory + "&from=/webapp/golf/index.html"
                    });
                } else {
                    this.forward("golf.list?prdcategory=" + prdcategory + "&from=/webapp/golf/index.html");
                }

            },
            goToGolfLst: function () {
                /*TODO*/
                var tabName = $(event.target).closest('.golf_tab').data("name");
                console.log(tabName);
                switch (tabName) {
                    case "booking":
                        IWanUtil.app_goto_booking();
                        break;
                    case "package":
                        this.goToLst(1);
                        break;
                    case "travel":
                        this.goToLst(2);
                        break;
                    default:
                        IWanUtil.app_goto_booking();
                }
            },
            goToDetailById: function (productId) {
                var QueryString = "productid=" + productId + "&salecityid=2&departcityid=2&from=/webapp/golf/index.html";
                var host = "http://m.ctrip.com/";
                if (isInApp) {
                    Guider.cross({
                        path: "tour",
                        param: "index.html#detail?" + QueryString
                    });
                } else {
                    //this.jump(host + 'webapp/tour/index.html#detail?'+QueryString);
                    window.location.href = host + 'webapp/tour/index.html#detail?' + QueryString;
                }
            },
            goToDetail: function () {
                var productId = $(event.target).closest('a').data("id");
                this.goToDetailById(productId);
            },

            onShow: function () {
                var self = this;
                /*TODO*/
                imgsData = [{ name: "name1", imgUrls: [{ key: "s500*280", value: "http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/banner1.png", onClick: function () { self.goToDetailById(1652269) } }] },
                { name: "name2", imgUrls: [{ key: "s500*280", value: "http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/banner2.png", onClick: function () { self.goToDetailById(1789418) } }] },
                { name: "name3", imgUrls: [{ key: "s500*280", value: "http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/banner3.png", onClick: function () { self.goToDetailById(1757584) } }]}];
                this.slide();
                //this.turning();
            },
            onHide: function () {
            },
            Locating: function () {
                geoLocation = GeoLocationStore.get() || {};
                geoLocation.startLocating = 1;
                GeoLocationStore.set(geoLocation);
                GeoLocationWidget = cWidgetFactory.create('Geolocation');
            },
            slide: function () {
                var imgs = [],
                imgsArry = [],
                container = this.$el.find('#js_detail_pic_slide');
                //根据imgsData刷选轮播图片src
                _.each(imgsData, function (index, i) {
                    imgsArry.push(imgsData[i].imgUrls[0].value);
                });
                _.each(imgsArry, function (k, v) {
                    imgs.push({
                        title: imgsData[v].imgName,
                        src: k,
                        link: '',
                        onClick: imgsData[v].imgUrls[0].onClick
                    });
                });
                if (!imageSlide) {
                    var imageSlide = new cslide({
                        container: container,
                        images: imgs,
                        autoPlay: true,
                        loop: true,
                        imageSize: { width: 500, height: 280 },
                        defaultImageUrl: 'http://pic.c-ctrip.com/vacation_v2/h5/group_travel/pic_none.png'
                    });
                    imageSlide.play();
                }
            }
        });
        return groupView;
    });