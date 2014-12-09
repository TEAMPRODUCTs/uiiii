define(['libs', 'c', 'PayModel', 'PayStore', 'PayParentView', "selectbank_html", 'cUtility', 'cWidgetFactory', "Business", 'Util', 'bankincrement'],
    function (libs, c, M, S, PayParentView, html, cUtility, widgetFactory, Business, Util, Bankincrement) {
    var keycode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var selectBankStore = S.SelectBankStore.getInstance();
    var paymentWayStore = S.PaymentWayStore.getInstance();
    var orderDetailStore = S.OrderDetailStore.getInstance();
    var bankListStore = S.BankListStore.getInstance();
    var iSDiffSelBankStore = S.CrdtCardDiffStore.getInstance(); //信用卡区分是否相同
    /*
    *@Description: 获取业务端是否限卡
    *@Author: jgd
    */
    var extendParamsStore = S.ExtendInfoStore.getInstance(); //扩展参数
    var View = PayParentView.extend({
        tpl: html,

        pagetype: null,
        pageid: '232004',
        hpageid: '232004',

        render: function () {
            this.$el.html(this.tpl);
            this.els = {
                xkTitle: this.$el.find('#xkTitle'),
                ul_tabCheck: this.$el.find('#ul_tabCheck'),
                li_neicard: this.$el.find('#li_neicard'),
                li_waicard: this.$el.find('#li_waicard'),
                neicardList: this.$el.find('#neicardList'),
                waicardList: this.$el.find('#waicardList'),

                citybox: this.$el.find('.city_box'),
                citylisttpl: this.$el.find('#citylisttpl'),
                keyword: this.$el.find('#keyword'),
                currentcity: this.$el.find('.currentcity'),
                elassociate: this.$el.find('.associate'),
                paymentnote: this.$el.find('#paymentnote')
            };
            this.templateCityList = _.template(this.els.citylisttpl.html());
            c.ui.InputClear(this.els.keyword);
        },
        events: {
            'click #li_neicard': 'turnneicard',
            'click #li_waicard': 'turnwaicard',
            'click #js_return': 'goBack',
            'click #city_list': 'selCity',
            'click .city_box .grouptitle': 'GroupTitleClick',
            'click .cityitem': 'TapCityItemAction',

            'click #curcity': 'curcityOnClick',
            'input #keyword': 'keywordOnInput',
            'blur #keyword': 'keywordOnBlur',
            'focus #keyword': 'keywordOnFocus',
            'click .history_close': 'clearKeyword',
            'click .c-payment-selectbank-cl dt': 'toggleListFn'
        },
        //内卡tab页
        turnneicard: function () {
            this.pageid = 232004;
            this.hpageid = 232004;
            this.els.li_waicard.removeClass('cui-tab-current');
            this.els.li_neicard.addClass('cui-tab-current');

            this.els.waicardList.hide();
            this.els.neicardList.show();
        },
        //外卡tab页
        turnwaicard: function () {
            this.pageid = 232008;
            this.hpageid = 232008;
            this.els.li_neicard.removeClass('cui-tab-current');
            this.els.li_waicard.addClass('cui-tab-current');

            this.els.neicardList.hide();
            this.els.waicardList.show();
        },
        toggleListFn: function (e) {
            var target = $(e.currentTarget),
        		data_class = target.attr("data-class");
            if (data_class) {
                $("." + data_class).toggleClass("none");
                if (!$("." + data_class).hasClass('none')) {
                    target.find('i').removeClass('arr_down arr_up').addClass('arr_down');
                } else {
                    target.find('i').removeClass('arr_down arr_up').addClass('arr_up');
                }
            }
        },
        curcityOnClick: function (e) {
            var el = $(e.currentTarget),
                poscity = el.attr('data-city'),
                poscityid = el.attr('data-cityid');
            if (el.hasClass('ispos') && poscity && poscityid) {
                this.searchParam.setAttr({
                    "dCtyName": poscity,
                    "dCtyId": poscityid
                });
                this.goBack();
            }
        },
        clearKeyword: function () {
            this.els.keyword.val('');
            this.els.keyword.trigger('input');
        },
        keywordOnInput: function (e) {
            var input = $(e.currentTarget),
                key = input.val().toLowerCase();
            var list = this.els.citybox.find('[data-filter*="' + key + '"]'), clist, hit = {};
            if (key.length) {
                this.els.citybox.hide();
                this.els.elassociate.hide();
                this.els.elassociate.empty();
                var list = $.grep(list, function (item) {
                    var $item = $(item),
                        filter = $.trim($item.attr('data-filter')).split(' ');
                    for (var i = 0; i < filter.length; i++) {
                        if (filter[i].indexOf(key) === 0) return true;
                    }
                    return false;
                });
                _.each(list, $.proxy(function (el, index) {
                    var $el = $(el.cloneNode(true));
                    if (!hit[$el.attr('data-id')]) {
                        this.els.elassociate.append($el);
                    }
                    hit[$el.attr('data-id')] = true;
                }, this));
                if (!list.length) {
                    this.els.elassociate.html('<dd class="hm">没有结果</dd>');
                }
                this.els.elassociate.show();
            } else {
                this.els.citybox.show();
                this.els.elassociate.hide();
            }
        },
        keywordOnBlur: function () {

        },
        keywordOnFocus: function () {

        },
        TapCityItemAction: function (e) {
            var dom = $(e.currentTarget),
                cityname = dom.attr('data-name'),
                cityid = dom.attr('data-id');

            var selectBankData = _.find(this.filtePaymentType(0), function (data) { return data.typeid == cityid; });
            this.setIsDiffFn(selectBankData, selectBankStore.get());
            if (selectBankData) {
                selectBankData.isnewcard = true;
                selectBankData.cardnum = ""; //新增银行卡选择时，清空cardnum
                selectBankStore.set(selectBankData);
                paymentWayStore.setAttr("finalPayWay", -1);
                var url = orderDetailStore.getAttr('indexurl');
                this.back(url);
            }
        },
        setIsDiffFn: function (currData, preData) {
            var isDiff = 1; //不同
            if (currData && preData) {
                if (currData.typeid == preData.typeid) {
                    isDiff = 2;
                } else {
                    isDiff = 1;
                }
            }
            iSDiffSelBankStore.set({
                isDiff: isDiff
            });
        },
        GroupTitleClick: function (e) {
            var title = $(e.currentTarget),
                clist = title.next('.clist');
            if (clist.css('display') === 'none') {
                this.$el.find('.clist').hide();
                clist.show();
                this.scrollToEl(title[0], { left: 0, top: -60 });
            } else {
                clist.hide();
            }
        },

        scrollToEl: function (el, offset) {
            var pos = c.ui.Tools.getElementPos(el);
            offset = offset || { left: 0, top: 0 };
            window.scrollTo(pos.left + offset.left, pos.top + offset.top);
        },
        updatePage: function (callback) {
            this.showLoading();
            //add Sqsun 20141020 获取银行数据
            if (bankListStore && bankListStore.get && !bankListStore.get()) {
                //初始化101全部银行增量
                Bankincrement.intBankCrement();
            }//add End
            this.banklistData = bankListStore.get();
            this.randerList(this.banklistData);
            this.renderWkList();
            //判断是否限卡 
            if (extendParamsStore.getAttr('isPayRestrict')) {
                //显示限卡支付titile
                this.els.xkTitle.show();
                //去掉首字线
                this.els.citybox.find("dt").remove();
                //去掉输入框
                this.$el.find(".js_search_box").remove();
                //去掉热门银行
                this.els.citybox.find(".js_hot").remove();
            }
            //判断是否只支持国内或海外卡
            var supportType = this.isSupportOne();

            callback && callback.call(this);
        },
        //判断是否只支持一种卡
        isSupportOne: function () {
            var self = this;
            var wklist = self.filtePaymentType(2);
            if (!wklist || wklist.length <= 0) {
                this.els.ul_tabCheck.hide();
                //显示内卡页
                this.els.waicardList.hide();
                this.els.neicardList.show();
                return;
            }
            var nklist = self.filtePaymentType(1);
            if (!nklist || nklist.length <= 0) {
                this.els.ul_tabCheck.hide();
                //显示外卡页
                this.els.neicardList.hide();
                this.els.waicardList.show();
                return;
            }

            //支持两种卡时  显示相应的tab页(存在选中的值)
            var status_cur = selectBankStore.get() ? selectBankStore.get().status : 0;
            if ((status_cur & 2) == 2) {
                this.turnwaicard();
            }
        },
        //渲染生成外卡页面
        renderWkList: function () {
            var self = this;
            var oglist = this.filtePaymentType(2);
            if (oglist && oglist.length > 0) {
                _.each(oglist, function (obj, index) {
                    if (self.$el.find("#li" + obj.typeid).length > 0) {
                        self.$el.find("#li" + obj.typeid).show();
                        self.$el.find("#li" + obj.typeid).attr('data-id', obj.typeid);
                    } else {
                        self.$el.find("li[value='" + obj.typeid + "']").show();
                        self.$el.find("li[value='" + obj.typeid + "']").attr('data-id', obj.typeid);
                    }
                });
            }

            var typeid_cur = selectBankStore.get() ? selectBankStore.get().typeid : 0;
            //去除存在的样式
            self.$el.find("#waicardList li").removeClass('ok_crt');
            //为已选中的卡组织添加样式 
            if (typeid_cur) {
                self.$el.find("#li" + typeid_cur).addClass('ok_crt');
                self.$el.find("li[value='" + typeid_cur + "']").addClass('ok_crt');
            }


            //
            /*var _startX, _distanceX;
            $(document).on("touchstart", function (event) {
            var event = event.originalEvent;
            _startX = event.touches[0].pageX;
            });

            $(document).on("touchend", function (event) {
            var event = event.originalEvent;
            _distanceX = event.touches[0].pageX - _startX;
            _distanceX = _distanceX > 0 ? _distanceX - 10 : _distanceX + 10;
            if (_distanceX > 0) {
            self.turnwaicard();
            } else {
            self.turnneicard();
            }
            });*/
        },
        //渲染生成内卡列表页
        randerList: function (data) {
            //Edit by sqsun 20141020 捕获银行错误数据
            var self = this;
            try {
                var viewdata = {
                    keycode: keycode,
                    list: data.list,
                    hots: data.hots,
                    paymentList: this.filtePaymentType(1),
                    curCityId: (selectBankStore.get() ? selectBankStore.get().typeid : 0),
                    curCityName: ""
                };
            } catch (e) {
                //银行增量数据异常，清空bankListStore银行增量
                bankListStore.remove();
                var MyAlert = new c.ui.Alert({
                    title: '提示信息',
                    message: '系统异常，请重新提交订单(505)',
                    buttons: [
                    {
                        text: '确定',
                        click: function () {
                            var burl = orderDetailStore.getAttr('from');
                            if (!cUtility.isInApp()) {
                                window.location.href = burl;
                            } else {
                                Business.jump2App(burl);
                            }
                        },
                        type: c.ui.Alert.STYLE_CONFIRM
                    }
                    ]
                });
                MyAlert.show();
                self.alertArr.push(MyAlert);
                //收集异常信息
                try {
                    var odtStore = orderDetailStore.get();
                    Business.exceptionInfoCollect({
                        bustype: odtStore.bustype,
                        excode: 3,
                        extype: 1,
                        exdesc: '银行增量数据' + "ErrorCode:503" + "_token:" + JSON.stringify(odtStore)
                    });
                } catch (e) {

                }
            }
            window.viewdata = viewdata;
            var html = this.templateCityList(viewdata);
            this.els.citybox.html(html);

            //移除下面为0的首字母
            this.els.citybox.find(".js_hidden_initial").prev("dt").hide();
            //如果里面不包含银联API，则隐藏元素
            this.isOnlyDirect = (_.find(viewdata.paymentList, function (d) { return d.category == 2; }) ? false : true);
            if (this.isOnlyDirect) {
                //去掉首字线
                this.els.citybox.find("dt").remove();
                //去掉输入框
                this.$el.find(".js_search_box").remove();
                //去掉热门银行
                this.els.citybox.find(".js_hot").remove();

            }
        },
        //过滤出101接口的下发的 内卡信用卡（直连信用卡 银联非标准信用卡）和 外卡
        filtePaymentType: function (type) {
            if (paymentWayStore.get()) {
                if (type == 0) {
                    //过滤信用卡
                    return _.filter(paymentWayStore.get().cards, function (card) { return (card.category != 3) });
                } else if (type == 1) {
                    //过滤 内卡信用卡
                    return _.filter(paymentWayStore.get().cards, function (card) { return ((card.status & 2) != 2) && (card.category != 3) });
                } else {
                    //过滤 外卡信用卡
                    return _.filter(paymentWayStore.get().cards, function (card) { return ((card.status & 2) == 2) });
                }
            } else {
                var indexUrl = orderDetailStore.get().indexurl;
                this.forward(indexUrl.substring(1));
            }

        },
        detectIsInBankList: function (bankData, paymentList) {

            //检测是否是在银行列表中
            //直联CCD
            var bankCCDSubData = _.find(bankData.subDatas, function (data) { return data.itemName == "CCD" });
            //银联API CCY
            var bankCCYSubData = _.find(bankData.subDatas, function (data) { return data.itemName == "CCY" });
            var bankId = null;
            if (bankCCDSubData || bankCCYSubData) {

                return _.find(paymentList, function (data) { return data.typeid == bankCCDSubData.itembCode; }) || (_.find(paymentList, function (data) { return data.typeid == bankCCYSubData.itembCode; }));
            } else {
                return false;
            }


        },
        showAfter: function () {
            this.selectCurrentCity();
            this.els.elcurcity = this.els.citybox.find('#curcity');
        },
        onCreate: function () {
            //this.injectHeaderView();
            this.render();
            this.showLoading();
        },
        selectCurrentCity: function () {
            if (this.searchParam) {
                var isselect = this.searchParam.getAttr('isselect'),
                cityid = this.searchParam.getAttr('dCtyId');
                if (isselect) this.els.citybox.find('[data-id="' + cityid + '"]').addClass('citylistcrt');
                var selectedItem = this.els.citybox.find('.citylistcrt');
                if (selectedItem.length > 1 || selectedItem.length < 1) {
                    this.els.citybox.find('.hotcitys .clist').css('display', 'block');
                } else {
                    selectedItem.parent().css('display', 'block');
                    var topbox = selectedItem.parent().parent()[0];
                    this.scrollToEl(topbox, { left: 0, top: -60 });
                }
            }

        },
        //数据加载阶段
        onLoad: function () {
            var pagetype = this.getPath(0);
            var self = this;

            //对HeaderView设置数据
            self.headerview.set({
                'title': '选择信用卡银行',
                'back': true,
                'home': false,
                'view': self,
                'events': {
                    returnHandler: $.proxy(function () {
                        $("#keyword").val("");
                        this.goBack();
                    }, this),
                    homeHandler: $.proxy(function () {
                        this.jump('/html5/');
                    }, this)
                }
            });

            //this.pageid = (cUtility.isInApp() ? "215419" : "214419");
            var urlFrom = this.getQuery('from');
            if (urlFrom && urlFrom.length > 0) {
                urlFrom = decodeURIComponent(urlFrom);
                this.urlFrom = urlFrom.substr(urlFrom.indexOf("#") + 1);
            }
            this.headerview.show();
            this.showLoading();
            this.updatePage(function () {
                this.hideLoading();
                try {
                    self.turning();
                } catch (e) {

                }
            });
        },
        //调用turning方法时触发
        onShow: function () {
            this.showAfter();

        },
        getUrlParama: function () {

            var link = "";
            if (orderDetailStore.get()) {
                link = orderDetailStore.getAttr("indexurl");
                link = link.substr(1);
            }
            return link;
        },
        goBack: function () {
            var self = this;
            var link = this.getUrlParama();
            var from = Util.geturlQuery('from');
            if (from && from != 'index') {
                self.back("#" + from);
            } else {
                self.back(link);
            }
        },
        //隐藏
        onHide: function () {
            this.els.citybox.show();
            this.els.elassociate.hide();

        },
        //选中城市
        selCity: function () {
            //this.back('index');
        }


    });
    return View;
});
