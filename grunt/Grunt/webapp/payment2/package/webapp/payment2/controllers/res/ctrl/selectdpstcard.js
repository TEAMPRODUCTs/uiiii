define(['libs', 'c', 'CommonStore', 'PayModel', 'PayStore', 'PayParentView', 'paymentPipe', "selectdpstcard_html", 'cUtility', 'cWidgetFactory', "Business", "Util",  'bankincrement'],
		function (libs, c, commonStore, M, S, PayParentView, paymentPipe, html, cUtility, widgetFactory, Business, Util,  Bankincrement) {
		    var keycode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		    var selectBankStore = S.SelectBankStore.getInstance();
		    var paymentWayStore = S.PaymentWayStore.getInstance();
		    var orderDetailStore = S.OrderDetailStore.getInstance();
		    var AliReStore = S.Ali_ReStore.getInstance();
		    var ToAliFlagStore = S.ToAliFlagStore.getInstance();
		    var bankListStore = S.BankListStore.getInstance();
		    var iSDiffSelBankStore = S.ISDiffSelectBankStore.getInstance();

		    /*
		    *@Description: 获取业务端是否限卡
		    *@Author: jgd
		    */
		    var extendParamsStore = S.ExtendInfoStore.getInstance(); //扩展参数
		    var Guider = widgetFactory.create('Guider');
		    var HeadStore = commonStore.HeadStore.getInstance();
		    var View = PayParentView.extend({
		        tpl: html,
		        Business: Business,
		        alertArr: [],
		        pagetype: null,
		        pageid: '232005',
		        hpageid: '232005',
		        render: function () {
		            this.$el.html(this.tpl);
		            this.els = {
		                citybox: this.$el.find('.city_box'),
		                citylisttpl: this.$el.find('#citylisttpl'),
		                keyword: this.$el.find('#keyword'),
		                currentcity: this.$el.find('.currentcity'),
		                elassociate: this.$el.find('.associate'),
		                cancelSearchBtn: this.$el.find("#cancel_searchBtn"),
		                paymentnote: this.$el.find('#paymentnote')
		            };
		            this.templateCityList = _.template(this.els.citylisttpl.html());
		            c.ui.InputClear(this.els.keyword);
		        },
		        events: {
		            'click #js_return': 'goBack',
		            'click #city_list': 'selCity',
		            'click .city_box .grouptitle': 'GroupTitleClick',
		            'click .cityitem': 'TapCityItemAction',
		            'click #curcity': 'curcityOnClick',
		            'input #keyword': 'keywordOnInput',
		            'blur #keyword': 'keywordOnBlur',
		            'focus #keyword': 'keywordOnFocus',
		            'click .history_close': 'clearKeyword',
		            'click .c-payment-spc-cl dt': 'toggleListFn',
		            'click #cancel_searchBtn': 'cancelSearchFn'
		        },
		        cancelSearchFn: function (e) {
		            var target = $(e.target);
		            console.log("cancel search");
		            this.els.keyword.val("");
		            this.els.citybox.show();
		            this.els.elassociate.hide();
		            this.els.elassociate.empty();
		            if (!target.hasClass("none")) {
		                target.addClass("none");
		            }
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
		                self.back("#"+from);
		            } else {
		                self.back(link);
		            }

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
		                        $el.removeClass("none");
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
		            this.els.cancelSearchBtn.removeClass("none");
		        },
		        TapCityItemAction: function (e) {
		            var dom = $(e.currentTarget),
		            Business = this.Business,
                    self = this, //Add sqsun 20141009
            	aliFlag = dom.attr("data-ali"),
                cityname = dom.attr('data-name'),
                cityid = dom.attr('data-id');
		            ToAliFlagStore.setAttr("thirdcardnum", "");
		            var selectBankData = _.find(this.filtePaymentType(), function (data) { return data.typeid == cityid; });

		            this.setIsDiffFn(selectBankData, selectBankStore.get());
		            if (selectBankData) {
		                selectBankData.isnewcard = true;
		                selectBankData.cardnum = ""; //新增银行卡选择时，清空cardnum
		                selectBankStore.set(selectBankData);
		                paymentWayStore.setAttr("finalPayWay", -1);
		            }
		            //category = 1直联信用卡; category = 2银联信用卡;category = 3储蓄卡;
		            if (aliFlag == "ALI") {
		                //储蓄卡外列 混付蒙版提示
		                Business.showPromptMask.call(self, 3, function () {
		                    AliReStore.setAttr("requestid", orderDetailStore.getAttr("requestid"));
		                    ToAliFlagStore.setAttr("jump_ali", 1);
		                    ToAliFlagStore.setAttr("is_wap", 1);
		                    ToAliFlagStore.setAttr("bankcode", dom.attr("data-id")); //储蓄卡外列传bankcode到支付宝
		                    //一下代码仅适用于H5
		                    if (!cUtility.isInApp()) {
		                        window.onpageshow = function () {
		                            //Edit sqsun 20141009
		                            Business.jumpDetailFn.call(self);
		                        };
		                    }
		                    _.bind(Business.jumpToAlipay, self)();
		                })
		            } else if (selectBankData.category == 3) {
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
		            callback && callback.call(this);
		        },
		        randerList: function (data) {
		            //Edit by sqsun 20141020 捕获银行错误数据
		            var self = this;
		            try {
		                var viewdata = {
		                    keycode: keycode,
		                    list: data.list,
		                    hots: data.hots,
		                    paymentList: this.filtePaymentType(),
		                    curCityId: (selectBankStore.get() ? selectBankStore.get().typeid : 0),
		                    curCityName: ""
		                };
		            } catch (e) {
		                //银行增量数据异常，清空bankListStore银行增量
		                bankListStore.remove();
		                var MyAlert = new c.ui.Alert({
		                    title: '提示信息',
		                    message: '系统异常，请重新提交订单(504)',
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
		                        exdesc: '银行增量数据' + "ErrorCode:504" + "_token:" + JSON.stringify(odtStore)
		                    });
		                } catch (e) {

		                }
		            }
		            window.viewdata = viewdata;
		            var html = this.templateCityList(viewdata);
		            this.els.citybox.html(html);
		            console.log($(".js_hidden_initial"));
		            //移除下面为0的首字母
		            this.els.citybox.find(".js_hidden_initial").prev("dt").hide();
		            //下发paytype不包括储蓄卡外列时隐藏增量银行
		            if (!(orderDetailStore.getAttr("paytype") & 8)) {
		                this.els.citybox.find("dd").hide();
		                this.els.citybox.find("dt").hide();
		                for (var i = 0; i < viewdata.paymentList.length; i++) {
		                    var _banklist = this.els.citybox.find("dd");
		                    for (var j = 0; j < _banklist.length; j++) {
		                        if (_banklist[j].getAttribute("data-id") == viewdata.paymentList[i]["typeid"]) {
		                            $(_banklist[j]).show();
		                            this.els.citybox.find("dt[data-class=" + _banklist[j].className.split(" ")[0] + "]").show();
		                        }
		                    }

		                }
		            }

		            //如果里面不包含银联API，则隐藏元素
		            /*this.isOnlyDirect = (_.find(viewdata.paymentList, function (d) { return d.category == 2; }) ? false : true);
		            if (this.isOnlyDirect) {
		            //去掉首字线
		            this.els.citybox.find("dt").remove();
		            //去掉输入框
		            this.$el.find(".js_search_box").remove();
		            //去掉热门银行
		            this.els.citybox.find(".js_hot").remove();

		            }*/

		        },
		        filtePaymentType: function () {
		            var dpstList = [];
		            if (paymentWayStore.get()) {
		                //status不要2和3，category只要3(储蓄卡)
		                dpstList = _.filter(paymentWayStore.get().cards, function (card) { return (card.status != 2 || card.status != 3) && (card.category == 3) });
		                return dpstList;
		            } else {
		                var indexUrl = orderDetailStore.get().indexurl;
		                this.back(indexUrl.substring(1));
		            }

		        },
		        detectIsInBankList: function (bankData, paymentList, index) {
		            var result = null;
		            //检测是否是在银行列表中
		            /*//直联CCD
		            var bankCCDSubData = _.find(bankData.subDatas, function (data) { return data.itemName == "CCD" });
		            //银联API CCY
		            var bankCCYSubData = _.find(bankData.subDatas, function (data) { return data.itemName == "CCY" });*/
		            //储蓄卡
		            var dpstCardData = _.find(bankData.subDatas, function (data) { return data.itemName == "DC"; });
		            var aliCardData = _.find(bankData.subDatas, function (data) { return data.itemName == "ALI"; }); //支付宝储蓄卡
		            var bankId = null;
		            var listArr = bankData.subDatas || [];
		            var bankObj = this.getBankIds(paymentList);
		            if (dpstCardData) {
		                if (bankObj[dpstCardData.itembCode]) {
		                    result = bankObj[dpstCardData.itembCode];
		                } else if (aliCardData) {
		                    if (aliCardData.itembCode == "0") {
		                        result = null;
		                    } else {
		                        result = aliCardData;
                            }
		                }

		            } else {
		                result = null;
		            }
		            return result;

		        },
		        getBankIds: function (list) {
		            var obj = {};
		            _.each(list, function (item) {
		                obj[item.typeid] = item;
		            });
		            return obj;
		        },
		        showAfter: function () {
		            //this.selectCurrentCity();
		            this.els.elcurcity = this.els.citybox.find('#curcity');
		        },
		        onCreate: function () {
		            //this.injectHeaderView();
		            //Edit sqsun 20141009
		            Business.jumpDetailFn.call(this);
		            this.render();
		            this.showLoading();
		        },
		        selectCurrentCity: function () {
                    /*
		            var isselect = this.searchParam.getAttr('isselect'),
                cityid = this.searchParam.getAttr('dCtyId');
		            if (isselect) this.els.citybox.find('[data-id="' + cityid + '"]').addClass('citylistcrt');*/
		            var selectedItem = this.els.citybox.find('.citylistcrt');
		            if (selectedItem.length > 1 || selectedItem.length < 1) {
		                this.els.citybox.find('.hotcitys .clist').css('display', 'block');
		            } else {
		                selectedItem.parent().css('display', 'block');
		                var topbox = selectedItem.parent().parent()[0];
		                this.scrollToEl(topbox, { left: 0, top: -60 });
		            }
		        },
		        //数据加载阶段
		        onLoad: function () {
//		            var pagetype = this.getPath(0);
		            var self = this;
		            //对HeaderView设置数据
		            self.headerview.set({
		                'title': '选择储蓄卡银行',
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

		                /*
		                *@Description: 判断业务端是否限卡，限卡状态隐藏搜索栏，热门银行，首字母线
		                *@Author: jgd
		                */
		                if (extendParamsStore.getAttr('isPayRestrict')) {
		                    this.pageid = 232007;
		                    this.hpageid = 232007;
		                    this.els.paymentnote.show();
		                    //去掉首字线
		                    this.els.citybox.find("dt").remove();
		                    //去掉输入框
		                    this.$el.find(".js_search_box").remove();
		                    //去掉热门银行
		                    this.els.citybox.find(".js_hot").remove();
		                }
		            });
		        },
		        //调用turning方法时触发
		        onShow: function () {
		            this.showAfter();

		        },
		        //隐藏
		        onHide: function () {
		            this.els.citybox.show();
		            this.els.elassociate.hide();
		            if (Business) {
		                Business.alertArr.forEach(function (item, index) {
		                    item && item.hide && item.hide();
		                });
		            }
		        },
		        //选中城市
		        selCity: function () {
		            //this.back('index');
		        }


		    });
		    return View;
		});
