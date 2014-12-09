define(['libs', 'c', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', 'creditcardnotice_html', 'cUtility', 'cWidgetFactory', 'Business'],
    function (libs, c, commonStore, payStore, payModel, basePageView, html, cUtility, widgetFactory, Business) {
    var urlTo = null;
    var extendParamsStore = payStore.ExtendInfoStore.getInstance(); //扩展参数
    var Guider = widgetFactory.create('Guider');
    var View = basePageView.extend({
        pageid: '',
        tpl: html,
        noticeFlag: "pay",
        onHide: function () { this.hideLoading(); urlTo = null; },
        onCreate: function () {
            //this.injectHeaderView();
            this.render();

        },
        onShow: function () {
            this.setTitle('信用卡支付须知');
            this.pageid = (cUtility.isInApp() ? "215416" : "214416");
        },
        onLoad: function () {
            var self = this;
            this.noticeFlag = this.getQuery('noticeflag'); // TODO TEST Lizard.P('noticeflag');
            this.updatePage();
            try {
                self.turning();
            } catch (e) {

            }
        },
        render: function () {
            var content = extendParamsStore.getAttr("creditCardUseExplain") || '';
            this.$el.html($(this.tpl).find(".js_content").html(content));
        },
        events: {
            'click #js_return': 'backAction', //返回
            'click #js_idlist>dd': 'chooseID'

        },
        updatePage: function () {
            this.turning();
            var self = this;
            //对HeaderView设置数据
            self.headerview.set({
                'title': self.noticeFlag == "pay" ? '信用卡支付须知' : (self.noticeFlag == "ensure" ? "信用卡担保说明" : "信用卡支付须知"),
                'home': false,
                'back': true,
                'view': self,
                'events': {
                    returnHandler: $.proxy(function () {
                        this.backAction();
                    }, this),
                    homeHandler: $.proxy(function () {
                        this.jump('/html5/');
                    }, this)
                }
            });
            this.headerview.show();
            this.hideLoading();
        },
        setHeaderView: function () {

        },
        backAction: function () {
            var self = this;
            if (cUtility.isInApp() && window.location.href.indexOf('from_native_page') > -1) {
                Guider.backToLastPage();
            }
            var from = this.getQuery('from'); // TODO sq_xu Lizard.P('from');
            if (from === 'index') {
                Business.goHome.call(self);
            } else {
                var from = decodeURIComponent(from || '');
                this.back(from);
            }
        }
    });
    return View;
});