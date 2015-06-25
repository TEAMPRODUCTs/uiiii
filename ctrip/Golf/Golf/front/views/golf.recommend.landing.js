/**
 * Created by sq_xu on 14-7-16.
 */
/**
 * Created by sq_xu on 14-7-16.
 */
define(['libs', 'c', 'cBasePageView', 'text!templates/golf.recommend.landing.html', 'cUtilityCrypt','cWidgetFactory','cWidgetGuider'],
    function (libs, c, pageview,  pageTemplate,  Crypt, cWidgetFactory ) {
        "use strict";
        var testData = {
            "recommendcode":"6sv6j",
            "award" : 60,
            "username":"user"
        };
        var Guider = cWidgetFactory.create('Guider');
        var groupView = pageview.extend({
            pageid : '275008',
            hpageid : '276008',
            initTemplate: function () {
                return _.template(pageTemplate);
            },
            render: function (data) {
                var tpl = this.initTemplate();
                this.$el.html(tpl({
                    "data": data
                }));
            },
            onCreate: function () {
                this.injectHeaderView();
            },
            events: {
                'click .download_btn':"downloadIWan"
            },
            onLoad: function () {
                var param = this.getQuery("param");
                param = JSON.parse(decodeURIComponent(param));

    /*            this.headerview.set({
                    title: '邀请朋友一起打高尔夫啦！',
                    back: true,
                    view: this,
                    events: {
                        returnHandler: function () {
                            this.back();
                        }
                    }
                });*/
                $("title").html("邀请朋友一起打高尔夫啦!");
                //this.headerview.show();
                this.render(param);
                this.turning();
            },
            downloadIWan: function(){
                this.forward("download");
            },
            onShow: function () {},
            onHide: function () {}
        });
        return groupView;
    });


