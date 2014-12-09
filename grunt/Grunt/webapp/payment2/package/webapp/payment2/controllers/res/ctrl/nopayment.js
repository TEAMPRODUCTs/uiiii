define(['libs', 'c', 'PayStore', 'PayModel', 'PayParentView', "nopayment_html", 'cUtility', 'cWidgetFactory', 'cWidgetGuider'],
    function (libs, c, payStore, payModel, PayParentView, html, cUtility, widgetFactory) {
    var urlTo = null;
    var Guider = widgetFactory.create('Guider');
    var orderDetailStore = payStore.OrderDetailStore.getInstance();
    var View = PayParentView.extend({
        tpl: html,
        onHide: function () { this.hideLoading(); urlTo = null; },
        onCreate: function () {
            this.render();
        },
        onShow: function () { },
        onLoad: function () {
            var self = this;
            this.headerview.set({
                title: '支付',
                view: this,
                back: true,
                tel: {
                    number: 4000086666
                },
                events: {
                    returnHandler: function () {
                        var backurl = orderDetailStore.getAttr('from') || "";
                        if (backurl) {
                            window.location.href = backurl;
                        } else {
                            window.history.back();
                        }
                    },
                    homeHandler: function () {
                    }
                }
            });
            this.headerview.show();
            try {
                self.turning();
            } catch (e) {

            }
        },
        render: function () {
            var PDTitle = orderDetailStore.getAttr('title') || '';
            this.$el.html(_.template(this.tpl, { PDName: PDTitle }));
            return this;
        },
        events: {
            'click #c_payment_nopayment_homebtn': 'backHome' //返回首页
        },
        backHome: function () {

            var url = orderDetailStore.getAttr('from');

            var urlArr = /^http\:\/\/([\w-\.]+)+\//ig.exec(url);

            if (cUtility.isInApp()) {
                Guider.home();
            } else {
                window.location.href = "http://" + urlArr[1]; ;
            }
        }
    });
    return View;
});