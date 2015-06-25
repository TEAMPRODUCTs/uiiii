/**
 * Created by sq_xu on 14-7-12.
 */

define(['libs', 'c', 'VaBaseView', 'text!templates/loading.html'],
    function (libs, c, pageview,  pageTemplate) {

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
            IWanUtil.app_back_to_home();
        },
        onShow: function () {

        },
        onHide: function () {

        }
    });
    return groupView;
});


