define(['libs', 'c', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', "verifyphone_html", 'cUtility', 'cUIInputClear', 'cUtilityCrypt', 'cUICore', 'Business', 'paymentPipe', 'Util', 'RuleManager', 'cWidgetFactory', 'cHybridFacade'],
    function (libs, c, commonStore, payStore, payModel, PayParentView, html, cUtility, cUIInputClear, Crypt, cui, Business, paymentPipe, Util, RuleManager, widgetFactory, Facade) {

        //仅供调试时使用
        var ISDEBUG = false;
        var payMentStore = payStore.PaymentWayStore.getInstance();
        var orderDetailStore = payStore.OrderDetailStore.getInstance();
        var extendParamsStore = payStore.ExtendInfoStore.getInstance(); //扩展参数
        var selectBankStore = payStore.SelectBankStore.getInstance(); //选择银行store
        var paymentcard = payStore.PayMentCardParamStore.getInstance();
        var cBase = c.base;
        var cDate = cBase.Date;
        var RuleMng = new RuleManager();   //实例一个公共验证函数对象
        var TELNUMER = '10106666';
        var seniortype = 1; //sq_xu 风控场景类型 1=礼品卡发送风控手机验证码 2=信用卡发送风控手机验证码
        //获取BU传过来的建行os类型
        var thirdExno = extendParamsStore.getAttr("osType");
        var guider = widgetFactory.create('Guider');

        var View = PayParentView.extend({
            pageid: '232003',
            hpageid: '232003',
            noticeFlag: "pay",
            verifyControl: null,
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
                var self = this;
                //初始化短信模组
                self.verifyControl = Util.verifyCodeControl.call(self)
                this.render();
            },

            onShow: function () {
                this.setHeaderView();
                this.setTitle('验证手机');
                //this.pageid = (cUtility.isInApp() ? "215415" : "214415");
                //cUIInputClear(this.els.lastno);
            },

            //设置当前场景HeaderView对象
            setHeaderView: function (title) {
                var self = this;
                var title = title || '验证手机';
                var option = self.getHeaderViewOption(title, self) || {};
                //对HeaderView设置数据
                self.headerview.set(option);
                self.headerview.show();
                self.eventRegister();
            },

            onLoad: function (refer) {
                var self = this;

                //信用卡风控验证跟钱包风控验证文案不一样  sq_xu
                var _phone;
                seniortype = payMentStore.getAttr("seniortype") ? payMentStore.getAttr("seniortype") : 1;
                if (seniortype == 1) {
                    self.els.c_pay_verifyphone_credit_verify_text.hide();
                    self.els.c_pay_verifyphone_wallet_verify_text.show();
                    _phone = payMentStore.getAttr("verifyMobile"); //礼品卡验证手机号sq_xu
                } else {
                    self.els.c_pay_verifyphone_credit_verify_text.show();
                    self.els.c_pay_verifyphone_wallet_verify_text.hide();
                    _phone = payMentStore.getAttr("creditVerifyMobile"); //信用卡验证手机号sq_xu
                }
                var defMobile = _phone && _phone.toString().replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                self.els.c_pay_verifyphone_i_prePhone.html(defMobile);
                self.els.c_pay_verifyphone_prephone.val(_phone);
                self.els.c_pay_verifyphone_check_code.val("");
                self.updatePage();
            },

            render: function () {
                this.$el.html(this.tpl);
                this.els = {
                    c_pay_verifyphone_i_prePhone: this.$el.find('#c_pay_verifyphone_i_prePhone'),
                    c_pay_verifyphone_prephone: this.$el.find('#c_pay_verifyphone_prephone'),
                    c_pay_verifyphone_get_code: this.$el.find('#c_pay_verifyphone_get_code'),
                    c_pay_verifyphone_count_down_clock: this.$el.find('#c_pay_verifyphone_count_down_clock'),
                    c_pay_verifyphone_check_code: this.$el.find('#c_pay_verifyphone_check_code'),
                    c_pay_verifyphone_submit: this.$el.find('#c_pay_verifyphone_submit'),
                    c_pay_verifyphone_li_prePhone: this.$el.find('#c_pay_verifyphone_li_prePhone'),
                    c_pay_verifyphone_wallet_verify_text: this.$el.find('.c_pay_verifyphone_wallet_verify_text'),
                    c_pay_verifyphone_credit_verify_text: this.$el.find('.c_pay_verifyphone_credit_verify_text')
                }
            },

            goBack: function () {
                var self = this;
                var url = orderDetailStore.getAttr('indexurl');
                var from = Util.geturlQuery('from');
                if (from && from != 'index') {
                    self.back("#" + from);
                } else {
                    self.back(url);
                }
            },

            events: {
                "input #c_payment_cardbin": 'showClearBtn',
                "click #c_pay_verifyphone_submit": 'verifyPhone',
                "click #c_pay_verifyphone_get_code": 'CodeValFn'
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
                var option = self.getHeaderViewOption(viewinfo.title, self) || {};
                //对HeaderView设置数据
                this.headerview.set(
                    option
                );

                // 将HeaderView显示出来
                this.headerview.show();
                self.eventRegister();
            },

            /**
            * @auther sq_xu
            * 头部电话按钮事件注册
            */
            eventRegister: function () {
                if (!!cUtility.isInApp()) {
                    guider.register({
                        tagname: Facade.METHOD_PHONE, callback: function () {
                            guider.callPhone({
                                tel: TELNUMER
                            });
                        }
                    });
                }
            },

            /**
            * @auther
            * header option set
            * @constructor
            */
            getHeaderViewOption: function (title, context) {
                var option = {
                    'title': title,
                    'back': true,
                    'view': context,
                    'events': {
                        returnHandler: function () {
                            //取消风控验证
                            payMentStore.setAttr("cancelWindControl", 1);
                            //回退礼品卡页
                            context.goBack()
                        }
                    }
                };
                if (!!cUtility.isInApp()) {
                    option.phone = true;
                } else {
                    option.tel = { number: TELNUMER };
                }
                return option;
            },

            //获取短信验证码
            CodeValFn: function () {
                var self = this;
                var orderDtlStore = orderDetailStore;
                var cardinfomation = selectBankStore.get();
                var prephoneVal = self.els.c_pay_verifyphone_prephone.val(); //获取最新输入的手机号码
                var _cardInfo = paymentcard.getAttr("cardInfo") && paymentcard.getAttr("cardInfo");
                var _amount = 0;

                if (!prephoneVal) {
                    self.showToast("请填写手机号码", 1.2);
                    RuleMng.addErrClass(self.els.c_pay_verifyphone_prephone, self.els.c_pay_verifyphone_li_prePhone);
                    return;
                }
                RuleMng.clearErrClass(self.els.c_pay_verifyphone_prephone, self.els.c_pay_verifyphone_li_prePhone); //清除错误样式

                if (seniortype == 1) {
                    //礼品卡全额支付
                    if (_cardInfo.isPay) {
                        _amount = orderDetailStore.getAttr("totalamount");
                    } else {
                        var cardlist = _cardInfo.cardlist ? _cardInfo.cardlist : {};
                        var walletlist = _cardInfo.walletlist ? _cardInfo.walletlist : {};
                        for (var i = 0; i < cardlist.length; i++) {
                            _amount += cardlist[i].useamoumt;
                        }
                        for (var i = 0; i < walletlist.length; i++) {
                            _amount += walletlist[i].useamoumt;
                        }
                        _amount = !_amount ? orderDetailStore.getAttr("totalamount") : _amount; //如果amount为0 强制设成totalamount
                    }
                } else {
                    //从首页信用卡风控验证过来的时是信用卡全额支付 sq_xu
                    _amount = orderDetailStore.getAttr("totalamount");
                }
                //加载获取验证码loading图标
                self.verifyControl.showLoading("c_pay_verifyphone_count_down_clock", "c_pay_verifyphone_get_code");
                var dataParam = {
                    "phone": prephoneVal,
                    "amount": _amount,
                    "seniortype": seniortype
                };

                var header = Business.getRequestHeader();

                var _callback = function (_data) {
                    var data = null;
                    self.els.c_pay_verifyphone_get_code.attr("id", "c_pay_verifyphone_get_code");
                    self.hideLoading();
                    if (!cUtility.isInApp()) { //in web
                        data = _data;
                    } else { //in app
                        //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
                        if (_data.resultBody) {
                            data = JSON.parse(_data.resultBody);
                        } else {
                            //错误的时候，弹出网络不给力提示  
                            self.hideLoading();
                            //提示具体的管道错误信息
                            self.showToast(_data.errorInformation || "网络不给力,请稍候重试");
                            self.verifyControl.hideLoading("c_pay_verifyphone_count_down_clock", "c_pay_verifyphone_get_code");
                            //self.showToast("网络不给力,请稍候重试");
                            return;
                        }
                    }
                    //var data = { "result": 0, "resultmesg": "111133331" };
                    //系统错误，直接抛出网络不给力,请稍候重试
                    if (typeof data.res != 'undefined' && data.res) {
                        self.hideLoading();
                        self.showToast("网络不给力,请稍候重试");
                        self.verifyControl.hideLoading("c_pay_verifyphone_count_down_clock", "c_pay_verifyphone_get_code");
                        return;
                    }

                    if (data.result == 0) {
                        self.refidCode = data.refid;
                        c.storage.localStorage.set('VALIDATETIMEOUT', new Date().valueOf(), new cDate().addDay(1));
                        self.els.c_pay_verifyphone_get_code.hide();
                        self.els.c_pay_verifyphone_count_down_clock.show(); // 倒计时
                        self.verifyControl.runVerifyCode("c_pay_verifyphone_count_down_clock", "c_pay_verifyphone_get_code", true);
                    } else {
                        self.refidCode = "";
                        self.showToast(data.resultmesg || "提交失败！请稍后再试");
                        self.verifyControl.hideLoading("c_pay_verifyphone_count_down_clock", "c_pay_verifyphone_get_code");
                    }
                }
                paymentPipe.verifyPhoneCode(dataParam, _callback, JSON.stringify(header), function (error) { //error
                    self.refidCode = "";
                    self.hideLoading();
                    self.showToast(error.msg);
                    self.verifyControl.hideLoading("c_pay_verifyphone_count_down_clock", "c_pay_verifyphone_get_code");
                });
                //_callback();
                //防止多次发送请求
                self.els.c_pay_verifyphone_get_code.attr("id", "");
            },
            verifyPhone: function () {
                var self = this, vcode = self.els.c_pay_verifyphone_check_code.val() || "";

                if (vcode.length < 1) {
                    self.showToast("请填写验证码");
                    return;
                }
                var dataParam = {
                    "vercode": vcode,
                    "seniortype": seniortype
                };
                //debug
                //return;
                //selectBankStore.set(payMentStore.get().cards[0]);
                //this.back("bank");
                var _callback = function (item) {
                    if (cUtility.isInApp()) {
                        //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
                        if (item.resultBody) {
                            item = JSON.parse(item.resultBody);
                        } else {
                            //错误的时候，弹出网络不给力提示  
                            self.hideLoading();
                            self.showToast(item.errorInformation || "网络不给力,请稍候重试");
                            return;
                        }
                    }
                    //var item = { "result": 0, "resultmesg": "33333333" };
                    //系统错误，直接抛出网络不给力,请稍候重试
                    if (typeof item.res != 'undefined' && item.res) {
                        self.hideLoading();
                        self.showToast("网络不给力,请稍候重试");
                        return;
                    }
                    self.hideLoading();
                    //获取手机号码
                    if (item.result == 0) {
                        payMentStore.setAttr("verifiedPhone", 1);
                        payMentStore.setAttr("vcode", vcode);
                        if (seniortype == 2) {//信用卡风控的时候 记录风控信用卡 卡号 sq_xu
                            payMentStore.setAttr("verifiedCardNo", payMentStore.getAttr("verifyingCardNo"));
                        }
                        //告诉要风控的页面自动提交301支付 在来源页面自动支付后清除该缓存
                        payMentStore.setAttr("autoPay", 1);
                        self.goBack();

                    } else {
                        self.hideLoading();
                        self.showToast(item.resultmesg || "网络不给力,请稍候重试");
                    }
                };

                self.showLoading();
                var header = Business.getRequestHeader();
                var headstring = JSON.stringify(header);
                paymentPipe.verifyPhoneNum(dataParam, _callback, headstring, function () {
                    self.hideLoading();
                    self.showToast("网络不给力,请稍候重试");
                });
                //_callback();
            }


        });
        return View;
    });
