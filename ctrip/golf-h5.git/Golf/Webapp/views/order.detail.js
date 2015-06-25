/**
 * Created by sq_xu on 14-7-8.
 */

define(['libs', 'c', 'VaBaseView', 'GolfModel', 'GolfStore','CommonStore', 'cUtilityCrypt','cUtility','cWidgetFactory','text!templates/loading.html'],
    function (libs, c, pageview, model, store, CommonStore, Crypt, cUtility, cWidgetFactory, pageTemplate) {
    var Guider = cWidgetFactory.create('Guider');

    var groupView = pageview.extend({
        render: function () {
            this.$el.html(pageTemplate);
        },
        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },
        events: {},

        onLoad: function () {

            this.headerview.set({
                title: '',
                back: true,
                view: this,
                events: {
                    returnHandler: function () {
                        this.back();
                    }
                }
            });
            this.headerview.show();
            this.updatePage();
            this.turning();
        },
        updatePage: function (cb) {
            var oid  = this.getQueryString("oid");
            if(!!oid){
                IWanUtil.app_goto_order_detail(oid, "nopage");
            }else{
                IWanUtil.app_back_to_home();
            }
        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            if(window.location.hash.split('?').length > 1){
                var r = window.location.hash.split('?')[1].match(reg);
                if (r != null) return unescape(r[2]); return null;
            }
            return null;
        },
        onShow: function () {

        },
        onHide: function () {

        }
    });
    return groupView;
});


