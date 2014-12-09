define(['libs', 'CommonStore', 'cWidgetFactory', 'PayParentView', "paymode_html", 'cWidgetGuider'],
    function (libs, commonStore, widgetFactory, PayParentView, html) {
    
    var userStore = commonStore.UserStore.getInstance(), userInfo = userStore.getUser();

    var Guider = widgetFactory.create('Guider');

    var View = PayParentView.extend({
        pageid: '214362',
        tpl: html,      
        onHide: function () { this.hideLoading(); },
        onCreate: function () {
        },
        onLoad: function () {
           var self = this;
           //this.injectHeaderView();
           self.headerview.set({
                'title': '管理交易密码',
                'back': true,
                'view': self,
                'events': {
                    returnHandler: function () {
                        self.hideLoading();
                        Guider.apply({
                            hybridCallback: function () {
                                AccountTool.gotobackUrl(self);
                            },
                            callback: function () {
                                self.back();
                            }
                        });
                    }
                }
            });
            self.headerview.show();
            try {
                self.turning();
            } catch (e) {

            }
//            this.isHasPass(function () {
//                self.loadPage(self);
//                AccountTool.validatLogin(self, userStore);
//                self.updatePage();
//            });
        }
    });
    return View;
});