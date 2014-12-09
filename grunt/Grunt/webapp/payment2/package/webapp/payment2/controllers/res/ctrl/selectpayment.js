define(['libs', 'c', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', "selectpayment_html", 'cUtility',
    'cWidgetFactory', 'paymentPipe', 'cUIInputClear', 'cUtilityCrypt', 'cUICore', 'Business', 'Util', 'PayValidate', 'RuleManager', 'Bankmap', 'bankincrement'], function (libs, c, commonStore, payStore, payModel, PayParentView, html,
    cUtility, widgetFactory, paymentPipe, cUIInputClear, Crypt, cui, Business, Util, PayValidate, RuleManager, Bankmap, Bankincrement) {

        var payMentStore = payStore.PaymentWayStore.getInstance();
        var orderDetailStore = payStore.OrderDetailStore.getInstance();
        var extendParamsStore = payStore.ExtendInfoStore.getInstance(); //扩展参数
        var selectBankStore = payStore.SelectBankStore.getInstance(); //选择银行store
        var Guider = widgetFactory.create('Guider');
        var bankListStore = payStore.BankListStore.getInstance();
        var oldCardsStore = payStore.oldCardsStore.getInstance();   //保存所有常用卡
        var oldcardlist = []; //曾用卡初始化
        var refer = "";
        //支付方式小类白名单 1=银联信用卡 2=直连信用卡 4=银联储蓄卡8=支付宝储蓄卡外列 16= 任我游礼品卡 32=任我行礼品卡 64 = 钱包余额 128 = 第三方支付宝支付 256 = 第三方微信支付
        var subPayTypeList = "";
        var isPayRestrict = 0; //判断业务端是否限卡  限卡规则 payWayWhiteList || PayWayBlackList 任一有值为限卡
        var View = PayParentView.extend({
            pageid: '232002',
            hpageid: '232002',
            noticeFlag: "pay",
            alertArr: [],
            tpl: html,
            payMethFlag: 1, //1:支付；2：担保 4 预售权 服务端下发
            onHide: function () {
                this.hideLoading();
                //隐藏弹框
                this.alertArr.forEach(function (item, index) {
                    item && item.hide && item.hide();
                });

                if (Business) {
                    Business.alertArr.forEach(function (item, index) {
                        item && item.hide && item.hide();
                    });
                }
            },
            onCreate: function () {
                //Edit sqsun 20141009
                Business.jumpDetailFn.call(this);
                this.render();
                //更新选择支付页面
                this.updatePage();
            },
            onShow: function () {
                this.showTitleByBu(); //根据不同bu显示不同的文字，如title
            },
            onLoad: function (refer) {
                var self = this;
                try {
                    self.turning();
                } catch (e) {

                }
            },
            render: function () {
                this.$el.html(this.tpl);
                this.els = {
                    used_list: this.$el.find('#c_payment_selectpayment_used_list'), //曾用卡closest对象
                    list_bank: this.$el.find('#c_payment_selectpay_bank_lists'), //曾用卡列表对象
                    cardtop: this.$el.find('#c_payment_selectpay_cardtop'), //默认显示第一个曾用卡对象
                    used_list_bank_tpl: this.$el.find('#c_payment_selectpay_list_bank_tpl'), //曾用卡列表模板对象
                    c_payment_paymentnote: this.$el.find('#c_payment_paymentnote'), //限卡提示对象
                    cardlist_arrow: this.$el.find('#c_payment_selectpay_arrow'), //常用卡选择符
                    unionpay_box: this.$el.find('#c_payment_selectpay_paywaylist_ul'),//其它支付方式BOX对象
                    contentText: this.$el.find(".valign")
                }
                this.templateBankList = _.template(this.els.used_list_bank_tpl.html());
            },
            events: {
                //选择常用
                "click .c_payment_selectpay_bankitem": 'chosebank'
            },
            //选择常用卡
            chosebank: function (e) {
                var ele = $(e.currentTarget),
                    sn = ele.attr("banksn");
                //ele.siblings().removeClass("ok_crt");
                //ele.addClass("ok_crt");
                oldcardlist[sn].isnewcard = false;
                selectBankStore.set(oldcardlist[sn]);
                payMentStore.setAttr("finalPayWay", -1);
                this.goIndex();
            },
            //设置当前场景HeaderView对象
            setHeaderView: function (title) {
                var self = this;
                var hasClick = 0;
                //对HeaderView设置数据
                self.headerview.set({
                    'title': title || '选择支付方式',
                    'back': true,
                    'view': self,
                    'events': {
                        returnHandler: function () {
                            self.goIndex()
                        }
                    }
                });
                self.headerview.show();
            },
            //返回支付页
            goIndex: function () {
                var url = orderDetailStore.getAttr('indexurl');
                this.back(url);
            },
            updatePage: function () {
                var self = this;
                var orderinfo = orderDetailStore.get() || {}, //订单localstore
                    paymentstore = payMentStore.get() || {}, //支付localstore
                    extParam = extendParamsStore && extendParamsStore.get() || {}, //BU第三方扩展localstore
                    useEType = extParam["useEType"]; //支付或担保 2担保 1支付
                var payTypeListCard = 0;   //| 储蓄卡信用卡
                /*
                == 1 可以支付 == 0 未在白名单中不能用于支付
                */
                var cardlist = oldCardsStore.get() || [], //银行卡集合
                    payTypeList = paymentstore["paytype"]; //读取localstorage中的paytype

                if (payTypeList) {
                    if (payTypeList & 2) {
                        payTypeListCard = 1;
                    }
                }

                //判断白名单是否包含信用卡和储蓄卡
                if (payTypeListCard) {
                    //位运算出曾用卡列表
                    for (var i = 0, l = cardlist.length; i < l; i++) {
                        var _cardlist = cardlist[i];
                        //status支持位运算
                        if (_cardlist.status & 1 == 1) {
                            oldcardlist.push(_cardlist);
                        }
                    }
                    //设置曾用卡列表
                    if (oldcardlist.length > 0) {
                        //限卡并且有常用卡时显示限卡文案
                        if (extParam["isPayRestrict"]) {
                            self.els.c_payment_paymentnote.show();
                        }
                        //渲染曾用卡
                        var html = this.templateBankList({ "cardlist": oldcardlist });
                        this.els.list_bank.html(html);
                        //常用卡 不需要打勾
                        //this.els.list_bank.children().eq(0).addClass("ok_crt");

                    } else {
                        //无曾用卡列表时
                        self.els.used_list.hide();
                    }
                } else {
                    self.els.used_list.hide();
                }
                Business.unionPayCollection.call(this, this.els.unionpay_box); //显示其它支付方式

            },
            //更新BU传过来的header标题
            showTitleByBu: function () {
                var extParamStore = extendParamsStore,
        		useEType = extParamStore && extParamStore.get() && extParamStore.get().useEType;
                if (useEType) {
                    if (useEType == "1") {
                        this.setHeaderView();
                        //this.$el.find("#crtpay_info").html('信用卡支付须知<i class="pos_r ml20"><i class="arr2"></i></i>');
                        this.noticeFlag = "pay";
                    } else if (useEType == "2") {
                        this.setHeaderView('选择担保方式');
                        //this.$el.find("#crtpay_info").html('信用卡担保说明<i class="pos_r ml20"><i class="arr2"></i></i>');
                        this.noticeFlag = "ensure";
                    }
                } else {
                    this.setHeaderView();
                }
            },
            
            /*
            * @author sqsun@ctrip.com
            * @description 获取卡类型
            */
            getCardtype: function (sn) {
                var cardtypelist = {
                    "1": "信用卡",
                    "2": "信用卡",
                    "3": "储蓄卡"
                }
                return cardtypelist[sn];
            },
            //回退
            goBack: function (url) {
                var self = this;
                var url = orderDetailStore.getAttr('indexurl');
                self.back(url);
            },
            //获取银行图标
            get_bankicon: function (bankobj) {
                //add Sqsun 20141020 获取银行数据
                var self = this;
                if (bankListStore && bankListStore.get && !bankListStore.get()) {
                    //初始化101全部银行增量
                    Bankincrement.intBankCrement();
                }//add End
                //Edit by sqsun 20141020 捕获银行错误数据
                try {
                    var banklistData = bankListStore.get().origindatas || {}, typeid = "", subDatas = ["", "CCD", "CCY", "DC"];//Edit by sqsun 20141023 数据做容错处理
                    for (var i = 0; i < banklistData.length; i++) {
                        typeid = _.find(banklistData[i].subDatas, function (obj) { return obj.itemName == subDatas[bankobj.category]; });
                        if (bankobj.typeid == Number(typeid.itembCode)) {
                            return Bankmap.getBankClass(banklistData[i]) || "bank_index";
                        }
                    }
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
                            exdesc: '银行增量数据' + "ErrorCode:505" + "_token:" + JSON.stringify(odtStore)
                        });
                    } catch (e) {
                    }
                }
            }
        });
        return View;
    });
