define(['libs', 'c', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', "cardbin_html", 'cUtility',
    'cWidgetFactory', 'paymentPipe', 'cUIInputClear', 'cUtilityCrypt', 'cUICore', 'Business', 'Util', 'bankincrement'], function (libs, c, commonStore, payStore, payModel, basePageView, html,
    cUtility, widgetFactory, paymentPipe, cUIInputClear, Crypt, cui, Business, Util, Bankincrement) {

        //仅供调试时使用
        var ISDEBUG = false;

        var payMentOtherInfo = payStore.PayMentOtherInfo.getInstance(); //扩展参数

        var paymentWayModel = payModel.PaymentWayModel.getInstance();
        var payMentModel = payModel.PayMentModel.getInstance();
        var payMentStore = payStore.PaymentWayStore.getInstance();
        var orderDetailStore = payStore.OrderDetailStore.getInstance();
        var extendParamsStore = payStore.ExtendInfoStore.getInstance(); //扩展参数
        var selectBankStore = payStore.SelectBankStore.getInstance(); //选择银行store
        var Guider = widgetFactory.create('Guider');
        var HeadStore = commonStore.HeadStore.getInstance();
        var ToAliFlagStore = payStore.ToAliFlagStore.getInstance();
        var AliReStore = payStore.Ali_ReStore.getInstance(); //支付宝跳转链接
        var bankListStore = payStore.BankListStore.getInstance(); //增量卡列表
        var refer = "";


        //获取BU传过来的建行os类型
        var thirdExno = extendParamsStore.getAttr("osType");

        var View = basePageView.extend({
            pageid: '232003',
            hpageid: '232003',
            noticeFlag: "pay",
            alertArr: [],
            tpl: html,
            refidCode: "", //短信验证凭证
            payMethFlag: 1, //1:支付；2：担保 4 预售权 服务端下发
            onHide: function () {
                this.hideLoading();
                this.hideWarning404();
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
                // this.injectHeaderView();
                this.render();
            },

            onShow: function () {
                // this.setHeaderView();
                this.setTitle('新增银行卡');
                //this.pageid = (cUtility.isInApp() ? "215415" : "214415");
                //cUIInputClear(this.els.lastno);
            },

            onLoad: function (refer) {
                var self = this;
                //Edit sqsun 20141009
                Business.jumpDetailFn.call(self);
                if (self.filterOverSeaCard()) {
                    self.els.c_payment_cardDesc.show();
                }
                //清空卡bin输入框中的卡号
                self.els.c_payment_cardbin.val("");
                self.els.c_payment_clear.hide();

                self.updatePage();
                //默认弹起数字键盘
                var ugSystemVer = Util.getSystemVer();
                //ios hybird 礼品卡弹起数字键盘代理
                if (ugSystemVer.platform == 4) {
                    self.els.c_payment_cardbin.focus();
                }

            },

            render: function () {
                this.$el.html(this.tpl);
                this.els = {
                    c_payment_cardbin: this.$el.find('#c_payment_cardbin'),
                    clearBankNum: this.$el.find('#clearBankNum'),
                    clearIconBtn: this.$el.find('#clearIconBtn'),
                    c_payment_cardbin_button: this.$el.find('#c_payment_cardbin_button'),
                    c_payment_cardDesc: this.$el.find('#c_payment_cardDesc'),
                    c_payment_clear: this.$el.find('#c_payment_clear')
                }
            },

            goBack: function () {
                var self = this;
                var url = orderDetailStore.getAttr('indexurl');
                var from = Util.geturlQuery('from');
                if (from && from != 'index') {
                    //self.back("#" + from); TODO
                    self.back(from);
                } else {
                    self.back(url);
                }
            },

            events: {
                "input #c_payment_cardbin": 'showClearBtn',
                "click #c_payment_cardbin_button": 'toBank',
                "click #c_payment_clear": 'clearInput',
                'blur #c_payment_cardbin': 'cutByFourNum',
                'focus #c_payment_cardbin': 'resetMaxLength'
            },
            updatePage: function () {
                var self = this;
                var viewinfo = {};
                viewinfo.title = "新增银行卡";
                self.initHeadView(viewinfo);
                try {
                    self.turning();
                } catch (e) {

                }
            },
            initHeadView: function (viewinfo) {
                var self = this;
                //对HeaderView设置数据
                this.headerview.set({
                    title: viewinfo.title,
                    back: true,
                    view: self,
                    events: {
                        returnHandler: self.goBack
                    }
                });

                // 将HeaderView显示出来
                this.headerview.show();
            },
            showClearBtn: function (e) {
                var target = $(e.target);
                if (target.val()) {
                    this.els.c_payment_clear.show();
                } else {
                    this.els.c_payment_clear.hide();
                }

                //根据输入值的长度 切换字体大小
                if (target.val().length > 16) {
                    //target.addClass('font14');
                    target.css('font-size', '14px');
                } else {
                    //target.removeClass('font14');
                    target.css('font-size', '');
                }

            },
            toBank: function () {
                var self = this;
                var orderinfo = orderDetailStore.get() || {};
                var extParamStore = extendParamsStore.get() || {},
                    useEType = extParamStore.useEType;
                //31001301 参数添加 sq_xu ver:6.0
                var _param = {
                    "cardno": self.els.c_payment_cardbin && self.els.c_payment_cardbin.val().replace(/\s/g, ""),
                    "bustype": orderinfo.bustype,
                    "oid": orderinfo.oid,
                    "usetype": useEType ? useEType : 1, //  //1=Pay=支付 2=Guarantee=担保
                    "subusetype": Business.isPreAuth() ? 1 : 0
                };
                //用户未输入错误文案
                if (_param.cardno.trim().length < 1) {
                    self.showToast("请输入信用卡号码");
                    var ugSystemVer = Util.getSystemVer();
                    //ios hybird 礼品卡弹起数字键盘代理
                    if (ugSystemVer.platform == 4) {
                        self.els.c_payment_cardbin.focus();
                    }
                    return;
                }

                //selectBankStore.set(payMentStore.get().cards[0]);
                //this.back("bank");
                var _callback = function (item) {
                    item = item || {}; //Add by sqsun 20141023 数据容错处理
                    if (cUtility.isInApp()) {
                        //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
                        if (item.resultBody) {
                            item = JSON.parse(item.resultBody);
                        } else {
                            //错误的时候，弹出网络不给力提示  
                            self.hideLoading();
                            //提示具体的管道错误信息
                            self.showToast(item.errorInformation || "网络不给力,请稍候重试");
                            return;
                        }
                    }

                    //系统错误，直接抛出网络不给力,请稍候重试
                    if (typeof item.res != 'undefined' && item.res) {
                        self.hideLoading();
                        self.showToast("网络不给力,请稍候重试");
                        return;
                    }

                    var ispass = 0;
                    self.hideLoading();
                    //item = {"ResponseStatus":{"Timestamp":"/Date(1406030033508+0800)/","Ack":"Success","Errors":[],"Extension":[{"Id":"ServiceCode","Value":"31001301"}]},"rc":0,"msglist":[{"type":1,"value":"卡号错误，请检查您填写的银行卡卡号"},{"type":2,"value":"抱歉，该卡暂未支持，请尝试更换其他银行卡"}],"cardtype":1,"typeid":11};
                    if (item.rc == 0) {
                        var _url = orderDetailStore.getAttr('indexurl');

                        for (var i = 0; i < item.cardinfolist.length; i++) {
                            var _item = item.cardinfolist[i];
                            var pmStore = payMentStore.get() || {}; //Add by sqsun 20141023 数据容错处理
                            var selectBankData = _.find(pmStore.cards, function (data) { return data.typeid == _item.typeid; });
                            if (selectBankData) {
                                //selectBankData.policylist = [{"policytype":1, "policysub":127}];
                                //去101和增量交集银行集合
                                selectBankData.cardnum = self.els.c_payment_cardbin.val();
                                selectBankData.isnewcard = true;
                                selectBankStore.set(selectBankData);
                                payMentStore.setAttr("finalPayWay", -1);
                                if (_item.cardtype & 1 && selectBankData) {
                                    ispass = 1;
                                    self.back(_url);
                                    return;
                                } else if (_item.cardtype & 2 && selectBankData) {
                                    ispass = 1;
                                    self.back(_url);
                                    return;
                                } else if (_item.cardtype & 4 && selectBankData) {
                                    ispass = 1;
                                    self.back(_url);
                                    return;
                                }
                            }
                        }
                        //应该就101下发的paytype为准
                        //if (extendParamsStore.getAttr("payTypeList") & 8) {
                        if (payMentStore.getAttr("paytype") & 8) {
                            //add Sqsun 20141020 获取银行数据
                            if (bankListStore && bankListStore.get && !bankListStore.get()) {
                                //初始化101全部银行增量
                                Bankincrement.intBankCrement();
                            } //add End
                            //Edit by sqsun 20141020 捕获银行错误数据
                            try {
                                //银行卡没匹配到，去增量找储蓄卡外列
                                var banklistData = bankListStore.get().origindatas || []; //Edit by sqsun 20141023 数据容错处理
                                for (var i = 0; i < item.cardinfolist.length; i++) {
                                    var ali;
                                    var _item = item.cardinfolist[i];
                                    if (_item.cardtype & 8) {
                                        for (var j = 0; j < banklistData.length; j++) {
                                            var ali = _.find((banklistData[j].subDatas || []), function (obj) { return obj.itembCode == _item.bankcode; });
                                            if (ali) {
                                                //储蓄卡外列 蒙版提示
                                                Business.showPromptMask.call(self, 3, function () {
                                                    ispass = 1;
                                                    AliReStore.setAttr("requestid", orderDetailStore.getAttr("requestid"));
                                                    ToAliFlagStore.setAttr("jump_ali", 1);
                                                    ToAliFlagStore.setAttr("is_wap", 1);
                                                    ToAliFlagStore.setAttr("bankcode", _item.bankcode); //储蓄卡外列传bankcode到支付宝
                                                    //一下代码仅适用于H5
                                                    if (!cUtility.isInApp()) {
                                                        window.onpageshow = function () {
                                                            //Edit sqsun 20141009
                                                            Business.jumpDetailFn.call(self);
                                                        };
                                                    }

                                                    ToAliFlagStore.setAttr("thirdcardnum", self.els.c_payment_cardbin.val().replace(/\s/g, ""));
                                                    _.bind(Business.jumpToAlipay, self)();
                                                })
                                                return;
                                            }
                                        }
                                    }
                                }
                            } catch (e) {
                                //银行增量数据异常，清空bankListStore银行增量
                                bankListStore.remove();
                                var MyAlert = new c.ui.Alert({
                                    title: '提示信息',
                                    message: '系统异常，请重新提交订单(502)',
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
                                        exdesc: '银行增量数据' + "ErrorCode:502" + "_token:" + JSON.stringify(odtStore)
                                    });
                                } catch (e) {

                                }
                            }

                        }
                        if (!ispass) {
                            var msg = (_.find(item.msglist, function (obj) { return Number(obj.type) == 2; }) || {}).value || "抱歉，该卡暂未支持，请尝试更换其他银行卡";

                            self.showToast(msg);
                        }
                    } else {
                        var msg = (_.find(item.msglist, function (obj) { return Number(obj.type) == item.rc; }) || {}).value || "抱歉，该卡暂未支持，请尝试更换其他银行卡";
                        self.showToast(msg);
                    }

                };
                var ugSystemVer = Util.getSystemVer();
                //ios hybird 礼品卡弹起数字键盘代理
                if (ugSystemVer.platform == 4) {
                    self.els.c_payment_cardbin.focus();
                }
                self.showLoading();
                var header = Business.getRequestHeader();
                var headstring = JSON.stringify(header);
                paymentPipe.verifyCardBin(_param, _callback, headstring, function () {
                    self.hideLoading();
                    self.showToast("网络不给力,请稍候重试");
                });
            },
            filterOverSeaCard: function () {
                var cards = payMentStore.getAttr("cards");
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].status & 2) {
                        return 1;
                    }
                }
                return 0;
            },
            clearInput: function () {
                this.els.c_payment_clear.hide();
                this.els.c_payment_cardbin.val("").focus();


            },
            /*
            * @author jianggd@ctrip.com
            * @description 根据增量替换下发卡typename
            */
            filterAliCard: function (item) {
                var banklistData = bankListStore.get() && bankListStore.get().origindatas, typeid = ""; //Edit by sqsun 20141023 数据容错处理
                for (var i = 0; i < banklistData.length; i++) {
                    typeid = _.find(banklistData[i].subDatas, function (obj) { return obj.itembCode == item.bankcode; });
                    if (typeid) {
                        return 1;
                    }
                }
                return 0;
            },
            cutByFourNum: function (e) {
                var value = e.target.value,
					arr = [];
                if (/\D/gi.test(value)) { //非数字
                    arr = value.match(/\d/g);
                    if (arr && arr.length > 0) {
                        setTimeout(function () {
                            e.target.value = "";
                            e.target.value = arr.join("").replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                        },
                        60);


                    } else {
                        e.target.value = "";
                        this.hideDelIcon();
                    }
                } else {
                    e.target.value = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                }
            },
            resetMaxLength: function (e) {
                e.target.value = e.target.value.replace(/\s/g, "");
            },
            hideDelIcon: function () {
                this.els.c_payment_clear.hide();
            }
        });
        return View;
    });
