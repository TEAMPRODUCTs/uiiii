define(['libs', 'c', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', "paytips_html", 'cUtility', 'cWidgetFactory', 'Business', 'cWidgetGuider'],
    function (libs, c, commonStore, payStore, payModel, PayParentView, html, cUtility, widgetFactory, Business) {
    var urlTo = null;
    var Guider = widgetFactory.create('Guider');
    var selectBankStore = payStore.SelectBankStore.getInstance(); //选择银行store
    var View = PayParentView.extend({
        pageid: '212054',
        tpl: html,
        onHide: function () { this.hideLoading(); urlTo = null; },
        onCreate: function () {
            this.render();
        },
        onShow: function () { },
        onLoad: function () {
            var self = this;
            this.updatePage();
            try {
                self.turning();
            } catch (e) {

            }

        },
        render: function () {
            this.$el.html(this.tpl);
            this.els = {
            		container: this.$el.find("#js_wrap")
            };
        },
        setPageId: function (pageid_H5, pageid_APP) {
            this.pageid = (cUtility.isInApp() ? pageid_APP : pageid_H5);
        },
        updatePage: function () {
            var self = this;
            try {
                self.turning();
            } catch (e) {

            }
            var tipsId = this.getQuery("pathid") ||"tips_1";
            if (tipsId && tipsId == 'tips_2') {
                //区分是否是美国运通卡 根据typeid判断
                var bank = selectBankStore.get();
                if (bank && bank.typeid && (bank.typeid == 8 || bank.typeid == 58)) {
                    tipsId = 'tips_5';
                }
            }
            var headTitle = "";
            //据参数设置头
            switch (tipsId) {
                case "tips_1":
                    this.setTitle(headTitle = "信用卡安全说明");
                    this.setPageId("214418", "215418");
                    break;
                case "tips_2":
                    this.setTitle(headTitle = "帮助");
                    this.setPageId("214414", "215414");
                    break;
                case "tips_3":
                    this.setTitle(headTitle = "卡有效期说明");
                    this.setPageId("214417", "215417");
                    break;
                case "tips_4":
                    this.setTitle(headTitle = "支付服务协议");
                    //this.setPageId("214417","215417");
                    break;
                case "tips_5":
                    this.setTitle(headTitle = "帮助");
                    this.setPageId("214414", "215414");
                    break;
            }
            //设置内容
            this.els.container.html(this.$el.find("#" + tipsId).html());
            //安全说明页,wrap的class会不同
            if (tipsId == "tips_1") {
            	this.els.container.attr("class", "p10 safety");
            } else {
            	this.els.container.attr("class", "p10 payinfo");
            }

            //对HeaderView设置数据
            self.headerview.set({
                'title': headTitle,
                'back': true,
                'home': false,
                'view': self,
                'events': {
                    returnHandler: $.proxy(function () {
                        this.backAction();
                    }, this),
                    homeHandler: $.proxy(function () {
                        self.back();
                    }, this)
                }
            });





            this.headerview.show();
            this.hideLoading();
        },
        backAction: function () {
            var self = this;
            if (cUtility.isInApp() && window.location.href.indexOf('from_native_page') > -1) {
                Guider.backToLastPage();
            }
            
            var path = this.getQuery("from");
            //如果是首页跳过来的话，用Business.goHome.call(self);方法
            if (path === 'index' || window.location.href.indexOf('index') > -1) {
                Business.goHome.call(self);
            } else {
                var from = decodeURIComponent(path);

                this.back(from);
            }
        }


    });
    return View;
});