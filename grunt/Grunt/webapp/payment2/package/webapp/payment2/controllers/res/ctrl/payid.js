define(['libs', 'c', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', "payid_html", 'cUtility', 'cWidgetFactory', 'Business'], function (libs, c, commonStore, payStore, payModel, PayParentView, html, cUtility, widgetFactory, Business) {
    var urlTo = null,

     SelectIdStore = payStore.SelectIdStore.getInstance();
    var View = PayParentView.extend({
        pageid: '',
        sourAddress: "",
        tpl: html,
        onHide: function () { this.hideLoading(); urlTo = null; },
        onCreate: function () {
            //this.injectHeaderView();
            this.render();
        },
        onShow: function () {
            this.setTitle('选择证件');
            this.pageid = (cUtility.isInApp() ? "215416" : "214416");
            //高亮已选择项
            $("#js_idlist>dd").removeClass("ok_crt");
            var idName = (SelectIdStore.get() ? SelectIdStore.get().idname : "身份证");
            var activeEle = _.find($("#js_idlist>dd"), function (e) { return $(e).text() == idName });
            if (activeEle) {
                $(activeEle).addClass("ok_crt");
            }
        },
        onLoad: function () {
            var self = this;
            this.updatePage();
            try {
                self.turning();
            } catch (e) {

            }
            SelectIdStore.setAttr('changcard', 0);
        },
        render: function () {
            this.$el.html(this.tpl);
            this.els = {
                "creditCards": this.$el.find("#creditCardList"),
                "dpstCards": this.$el.find("#dpstCardList"),
                "cardList": this.$el.find("#cardList")
            };
            //this.sourAddress = this.request.path && this.request.path[0];
            if (this.sourAddress == "dpstcard") {
                this.els.cardList.html(this.els.dpstCards.html());
            } else {
                this.els.cardList.html(this.els.creditCards.html());
            }
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
                'title': '证件类型',
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
        chooseID: function (e) {
            var idName = $(e.target).text(),
            typeName = SelectIdStore.getAttr('idname') || '身份证',
            cardTypeId = parseInt($(e.target).data("value"));
            SelectIdStore.setAttr('idname', idName);
            SelectIdStore.setAttr('dcard', cardTypeId);

            if (typeName == SelectIdStore.getAttr('idname')) {
                SelectIdStore.setAttr('changcard', 0)
            } else {
                SelectIdStore.setAttr('changcard', 1)
            }

            this.backAction();

        },
        backAction: function () {
            var fromUrl = this.getQuery("from") || '';
            if (fromUrl.indexOf('index') >= 0) {
                Business.goHome.call(this);   //跳转至首页
            } else {
                fromUrl = decodeURIComponent(fromUrl);
                this.back(fromUrl)
            }
        }


    });
    return View;
});