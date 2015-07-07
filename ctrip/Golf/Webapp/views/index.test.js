define(['text!templates/index.html','cBase','BusinessModel'],
    function (indexTemplate, cBase, BusinessModel) {
    "use strict";
    var GeoLocationWidget, getLocation, geoLocation,  $g_depart, $g_dest, prodListParam, imgsData;
    var defaultDepartCity = "上海", defaultDepartCityId = "2";
    var groupView = Backbone.View.extend({
        el: $('#main'),
        payMentModel: BusinessModel.PayMentModel.getInstance(),
        render: function () {
            this.$el.html(indexTemplate);
            this.testModel();
        },
        testModel : function(){
            this.payMentModel.excute(function (data) {
               console.log(JSON.stringify(data));
            });
        },
        initialize: function() {
            this.render();
            //
            var Cat =new  cBase.Class({
                initialize: function($super , name) {
                    this.name = name;
                },
                eat: function() {
                    console.log(this.name + " is eating fish.");
                }
            });

            var BlackCat = new cBase.Class(Cat, {
                initialize: function($super, name, age) {
                    // call the constructor of super class.
                    //BlackCat.super_.call(this, name);
                    $super(name, age);
                    this.age = age;


                }/*,
                 eat: function() {
                 console.log(this.name + "(" + this.age + ") is eating dog.");
                 }*/
            });

            var ccBlackCat =new cBase.Class(BlackCat, {
                initialize: function($super, name, age) {
                    // call the constructor of super class.
                    $super(name, age);
                    //ccBlackCat.super_.call(this, name);
                }
            });

            var c = new Cat('Mao');
            c.eat();

            var bc = new BlackCat('Hei Mao', 5);
            bc.eat();


            var dd = new ccBlackCat('ccBlackCat',88);
            dd.eat();

            console.log(c instanceof Cat);
            console.log(bc instanceof Cat);
            console.log(bc instanceof BlackCat);

        },
        events: {
            "click .golf_tab":"goToGolfLst",
            "click .golf_product a":"goToGolfLst"
        },
        onLoad: function () {
            var self = this;
            /*TODO*/
            imgsData = [{name:"name1",imgUrls:[{key:"s500*280",value:"http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/banner1.png",onClick:function(){self.goToDetailById(1652269)}}]},
                {name:"name2",imgUrls:[{key:"s500*280",value:"http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/banner2.png",onClick:function(){self.goToDetailById(1789418)}}]},
                {name:"name3",imgUrls:[{key:"s500*280",value:	"http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/banner3.png",onClick:function(){self.goToDetailById(1757584)}}]}];
            this.slide();
            this.turning();
        },
        showToast: function (msg, fun) {
            if (!fun) {
                fun = function () { }
            }
            
            this.toast.show(msg, 2, fun, true);
        },
        goToLst: function(prdcategory){
            if(isInApp){
                Guider.cross({
                    path:"golf",
                    param:"index.html#golf.list?prdcategory=" + prdcategory + "&from=/webapp/golf/index.html"
                });
            }else{
                this.forward("golf.list?prdcategory=" + prdcategory + "&from=/webapp/golf/index.html");
            }

        },
        goToGolfLst: function(){
            /*TODO*/
            window.location.href = ("#golf.recommend.test").replace(/^#+/, "#");
        },


        onShow: function () {

        },
        onHide: function () {
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
                    onClick:imgsData[v].imgUrls[0].onClick
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