﻿define(['libs', 'c', 'AnalyzeUrl', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', "text!index_html", 'cUtility',
    'cWidgetFactory', 'paymentPipe', 'cUIInputClear', 'cUtilityCrypt', 'cUICore', 'Business', 'Util', 'PayValidate', 'RuleManager', 'Bankmap', 'bankincrement', 'IndexLiPinCard', 'IndexBankList', 'cHybridShell'],
    function (libs, c, AnalyzeUrl, commonStore, payStore, payModel, basePageView, html, cUtility, widgetFactory, paymentPipe, cUIInputClear, Crypt, cui, Business, Util, PayValidate, RuleManager, Bankmap, Bankincrement, IndexLiPinCard, IndexBankList, cHybridShell) {

        var payMentOtherInfo = payStore.PayMentOtherInfo.getInstance(); //扩展参数
        var payMentStore = payStore.PaymentWayStore.getInstance();
        var orderDetailStore = payStore.OrderDetailStore.getInstance();
        var oldCardStore = payStore.PayOldCardInfoStore.getInstance();
        var paymentcard = payStore.PayMentCardParamStore.getInstance(); //存放礼品卡支付的信息5.4
        var extendParamsStore = payStore.ExtendInfoStore.getInstance(); //扩展参数
        var selectBankStore = payStore.SelectBankStore.getInstance(); //选择银行store
        var Guider = widgetFactory.create('Guider');
        var cashPayInfoStore = payStore.CashPayInfoStore.getInstance(); //现金支付store
        var HeadStore = commonStore.HeadStore.getInstance();
        var AliReStore = payStore.Ali_ReStore.getInstance();
        var lipinCardEInfo = payStore.lipinCardEInfo.getInstance();
        var bankListStore = payStore.BankListStore.getInstance();
        var tktErrorStore = payStore.tktErrorStore.getInstance();   //保存礼品卡金额异常状态store
        var ToAliFlagStore = payStore.ToAliFlagStore.getInstance();
        var IsDiffSelBankStore = payStore.ISDiffSelectBankStore.getInstance(); //选择银行是否相同
        var SelectIdStore = payStore.SelectIdStore.getInstance();
        var oldCardsStore = payStore.oldCardsStore.getInstance();   //保存所有常用卡
        var touchPayStore = payStore.touchPayStore.getInstance();

        //保存BU传过来的token参数  lh_sun
        var paramUrlTokenStore = payStore.ParamUrlTokenStore.getInstance();
        var cBase = c.base;
        var cDate = cBase.Date;
        var policytypeControl = 2;
        var haveCD = ""; //支付方式包含信用卡
        var MyAlert, //是否已有弹窗
            Vgetcode = 1; //是否显示获取验证码
        var RuleMng = new RuleManager();   //实例一个公共验证函数对象
        var timeroutObj = null, //全局倒计时对象
            countdownTimer = 60; //全局倒计默认时间
        var isVerifyMobile = 0; //是否需要手机风控验证

        var View = basePageView.extend({
            pageid: '232001',
            hpageid: '232001',
            noticeFlag: "pay",
            alertArr: [],
            tpl: html,
            verifyControl: null,
            Vgetcode: Vgetcode,
            otherInfoFlag: false,
            refidCode: "", //短信验证凭证
            payMethFlag: 1, //1:支付；2：担保 4 预售权 服务端下发
            isnewcard: false, //是否是新增卡
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
                self.verifyControl = Util.verifyCodeControl.call(self)
                self.clearStore();
                //this.injectHeaderView();
                //在create时创建lcoalstorage
                //如果token参数不正确return
                if (!AnalyzeUrl.getOrderDetail.call(self)) {
                    self.analyzeUrlError = true;
                    return;
                }

                //其他必填字段为空 / 错误 就不向下执行了
                if (this.otherInfoFlag) {
                    self.hideLoading();
                    return;
                }
                this.render();
                var self = this;
                this.showLoading();
                //初始化101全部银行增量
                Bankincrement.intBankCrement();
                //发起101下发请求
                this.getPayway(function () {
                    self.els.cont_wrapnew.show();
                    self.updatePage();
                });
            },

            onShow: function () {
                var self = this;
                //getorderdetail解析异常时  指在oncreat中返回 onload依然会执行报错 ，所以添加判断返回
                if (self.analyzeUrlError) {
                    return;
                }
                //同一礼品卡多人使用时，服务报错，重载支付页面                
                var tktused = tktErrorStore.getAttr("tktUsed");
                if (tktused) {
                    window.location.reload();
                    return;
                }

                this.showTitleByBu(); //根据不同bu显示不同的文字，如title
                //this.pageid = (cUtility.isInApp() ? "215415" : "214415");
                if (this.els.cardType) {
                    RuleMng.showCardTypeFn(this.els.cardType, this.els.idNum)   //切换证件类型
                }
            },

            onLoad: function (refer) {
                var self = this, _finalPayWay = payMentStore.getAttr("finalPayWay");
                //验证过风控，自动提交301
                //验证手机风控成功后返回时执行301提交
                if (payMentStore.getAttr("autoPay")) {
                    self.distingPayWay();
                    payMentStore.setAttr("autoPay", 0);
                }
                //如果页面带参数hybridpayment2=refresh强刷页面
                //只有在hybrid中
                /*if (cUtility.isInApp()) {
                if (window.location.href.indexOf("hybridpayment2=refresh") > -1) {
                window.location.href = orderDetailStore.getAttr("indexUrl");
                window.location.reload(true);
                //Business.jump2App(orderDetailStore.getAttr("indexUrl"));
                }
                }*/
                try {
                    self.turning();
                } catch (e) {

                }
                //getorderdetail解析异常时  指在oncreat中返回 onload依然会执行报错 ，所以添加判断返回
                if (self.analyzeUrlError) {
                    return;
                }
                /**
                *初始化上次支付记录
                */
                /**
                *   重置切换支付方式的行为
                */
                if (!self.isOldCard()) {

                    //代码优化，当dom节点存在的时候，才调用dom节点的方法。  lh_sun@ctrip.com 2014-10-21
                    this.$el.find('#lastFCode') && this.$el.find('#lastFCode').text(""); //清空银行卡号
                    this.$el.find('#bankNum') && this.$el.find('#bankNum').show();
                    this.$el.find('#bankNum') && this.$el.find('#bankNum').val("");
                    self.els.c_payment_index_snList_content && self.els.c_payment_index_snList_content.removeClass('bor_b_blue');

                    self.els.savecardbox && self.els.savecardbox.hide();
                    self.els.c_payment_index_cardTop && self.els.c_payment_index_cardTop.find("li").hide();
                    //初始化policy height 为 0
                    self.els.c_payment_index_snList_content && self.els.c_payment_index_snList_content.height(0);
                    self.els.c_payment_index_snList_content && self.els.c_payment_index_snList_content.addClass("snList_content");
                    SelectIdStore.remove();
                }
                //其他必填字段为空 / 错误 就不向下执行了
                if (this.otherInfoFlag) {
                    self.hideLoading();
                    return;
                }

                //需要混付  tktErrorStore
                if (tktErrorStore.getAttr("tktUsed")) {
                    self.getPayway(function () {
                        self.els.cont_wrapnew.show();
                        self.updatePage();
                    });
                } else {
                    var result = payMentStore.get();
                    if (result && result.paytype) {
                        IndexLiPinCard.setLIPINCard.call(self, result);
                    }
                }
                //切换支付方式 并且是切换卡支付
                //只有卡片才走下边的逻辑
                if (selectBankStore.get() && (_finalPayWay == 1 || _finalPayWay == -1)) {
                    var _catogary = "", _card = selectBankStore.get(),
                    _typename = _card.typename, _cardAction;
                    //切换卡需要显示上一次支付卡模块
                    self.els.c_payment_index_lastCard && self.els.c_payment_index_lastCard.show();
                    //切换卡需要隐藏第三方模块
                    self.els.paywaylist_ul && self.els.paywaylist_ul.hide();
                    self.els.cseltxt && self.els.cseltxt.text(_typename);

                    if (!_card.isnewcard) {
                        _cardAction = 2;
                        //20141021 jianggd@Ctrip.com 
                        //将值存在localstore里
                        extendParamsStore.setAttr('policytypeControl', 2);
                        policytypeControl = extendParamsStore.getAttr('policytypeControl');
                    } else {
                        _cardAction = 1;
                        //20141021 jianggd@Ctrip.com 
                        //将值存在localstore里
                        extendParamsStore.setAttr('policytypeControl', 1);
                        policytypeControl = extendParamsStore.getAttr('policytypeControl');
                    }

                    //显示必填项 policy type 2 为曾用卡
                    if (!self.isOldCard()) {
                        self.getisexpired(_card);
                        self.vali && self.vali.rules.setReRender(true);
                        self.showpolicy(_card, _cardAction);
                    } else {
                        self.vali.rules.setReRender(false);
                        //self.showpolicy(_card, _cardAction);
                    }
                    //新卡画蓝线
                    if (_card.isnewcard) {
                        self.showNewCard();
                    }
                    //显示卡号前4位需加空格
                    if (_card.cardnumfl && !_card.isnewcard) {
                        self.els.lastFCode && self.els.lastFCode.text(_card.cardnumfl.substr(0, 4) + " " + _card.cardnumfl.substr(4, _card.cardnumfl.length - 1));
                    } else if (_card.cardnum && _card.isnewcard) {

                        self.showNewCard();
                        self.els.lastFCode && self.els.lastFCode.text(_card.cardnum);
                        this.$el.find('#li_bankNum') && this.$el.find('#li_bankNum').hide();
                        this.$el.find('#bankNum') && this.$el.find('#bankNum').val(_card.cardnum);
                    }
                    self.setBankCardIcon();
                    self.els.used_list.show();

                    //如果切换的是新卡并且已经登录，显示保存至常用卡
                    if (orderDetailStore.getAttr("isload") == 1 && _card.isnewcard) {
                        self.els.savecardbox && self.els.savecardbox.show();
                        self.$el.find('#saveCrtInfo') && self.$el.find('#saveCrtInfo').addClass("checked");
                    }
                    //保存上一次切换的卡，用于判断是否切换银行卡了，没有切换不重新渲染policy
                    oldCardStore.set(selectBankStore.get());
                }
                //显示上一次支付方式模块
                if (_finalPayWay) {
                    if (_finalPayWay == 2) {
                        self.getWeiXinContent();
                        self.els.c_payment_index_lastWeixin.show();
                    } else if (_finalPayWay == 3) {
                        self.els.c_payment_index_lastAlipay.show();
                    } else if (_finalPayWay == 4) {
                        self.els.c_payment_index_cash.show();
                    }
                }

            },

            clearStore: function () {
                //刷新支付方式页等同重新获取支付方式需要清除selectBankStore 和 IsDiffSelBankStore
                selectBankStore.remove();
                IsDiffSelBankStore.remove();
                payMentStore.remove();
                payMentOtherInfo.remove();
                tktErrorStore.remove();
                payMentStore.remove();

                oldCardStore.remove();
                paymentcard.remove();
                extendParamsStore.remove();
                selectBankStore.remove();
                cashPayInfoStore.remove();
                HeadStore.remove();
                touchPayStore.remove();

                //删除BU传过来的token参数
                paramUrlTokenStore && paramUrlTokenStore.remove && paramUrlTokenStore.remove();
                //AliReStore、ToAliFlagStore、orderDetailStore是支付宝回退时候用的，不能删除 lh_sun
                //orderDetailStore.remove();
                //AliReStore.remove();
                //ToAliFlagStore.remove();
                ToAliFlagStore.setAttr("thirdcardnum", "");
                ToAliFlagStore.setAttr("is_wap", "");
                ToAliFlagStore.setAttr("bankcode", "");
                lipinCardEInfo.remove();

                IsDiffSelBankStore.remove();
                SelectIdStore.remove();
            },

            render: function () {
                this.$el.html(this.tpl);
                this.els = {
                    order_title: this.$el.find('#order_title'),
                    used_list: this.$el.find('#c_payment_index_used_list'),
                    //new_creditcard: this.$el.find('#new_creditcard'),
                    //new_bankcard: this.$el.find('#new_bankcard'),
                    cseltxt: this.$el.find('#c_payment_index_cyBank'),
                    lastFCode: this.$el.find('#lastFCode'),
                    listinput: this.$el.find('.listinput'),
                    order_title: this.$el.find('#order_title'),
                    order_amount: this.$el.find('#order_amount'),
                    cvv: this.$el.find('#cvv'),
                    prephone: this.$el.find('#prephone'),
                    safe_intro: this.$el.find('#safe_intro'),
                    //lastno: this.$el.find('#lastno'),
                    //paymentnote: this.$el.find('#paymentnote'),
                    cardnotice: this.$el.find('#cardnotice'),
                    changephone: this.$el.find("#changephone"),
                    iPrePhone: this.$el.find("#i_prePhone"),
                    li_checkCode: this.$el.find("#li_checkCode"),
                    //礼品卡
                    lipinCard: this.$el.find('#c_pay_index_lpk'),
                    lipinCardTpl: this.$el.find('#c_pay_index_lpk_tpl'),
                    //------------------------------------------//
                    check_code: this.$el.find("#check_code"),
                    contentText: this.$el.find(".js_text"),
                    payBtn: this.$el.find("#c_payment_index_payBtn"),

                    savecardbox: this.$el.find("#savecardbox"),
                    saveCrtInfo: this.$el.find("#saveCrtInfo"),

                    //常用卡文字显示
                    //cykWord: this.$el.find('#c_payment_index_cyk'),

                    //信用卡有效期快过期提示
                    PeriodEnding: this.$el.find('#c_payment_index_periodEnd'),
                    c_payment_paymentnote: this.$el.find('#c_payment_paymentnote'),
                    police_lists: this.$el.find('#c_payment_index_SnList'),

                    //更换支付方式按钮
                    c_payment_index_amount: this.$el.find('#c_payment_index_amount'),
                    c_payment_index_changeBtn: this.$el.find('#c_payment_index_changeBtn'),
                    c_payment_index_cardTop: this.$el.find('#c_payment_index_cardTop'),
                    c_payment_index_bankIcon: this.$el.find('#c_payment_index_bankIcon'),
                    c_payment_index_lastCard: this.$el.find('#c_payment_index_lastCard'),
                    c_payment_index_lastWeixin: this.$el.find('#c_payment_index_lastWeixin'),
                    c_payment_index_lastAlipay: this.$el.find('#c_payment_index_lastAlipay'),
                    c_payment_index_cash: this.$el.find('#c_payment_index_cash'),
                    paywaylist_ul: this.$el.find('#paywaylist_ul'),
                    cont_wrapnew: this.$el.find('.cont_wrapnew'),

                    c_payment_index_snList_content: this.$el.find('#c_payment_index_snList_content'),
                    c_payment_index_weixinContent: this.$el.find('#c_payment_index_weixinContent')
                }
                this.templateLipinCard = _.template(this.els.lipinCardTpl.html());
            },

            events: {
                'click #saveCrtInfoHotSpc': 'saveCrtInfoFn',
                "click #safe_intro": 'show_safeintro',
                "click .credit_btn": 'distingPayWay',
                'click #periodQue': 'showPeriodQue',
                'click #get_code': 'CodeValFn',
                'click #count_down_clock': 'countDownFn',
                //'click #changephone': 'changephonefn',
                'click #li_prePhone': 'changephone',
                //礼品卡
                'click #c_pay_index_lpk_btn': 'lipinCardAction',
                'click #crtpay_info': 'showCrtInfo',
                //信用卡即将过期，填写卡信息事件
                'click #c_payment_index_periodEnd': 'updateCardInfo',
                //转换证件类型场景
                'click #c_payment_li_cardType': 'showCardTypeLayer',
                //绑定卡有效期输入验证非数字判断
                'input #bankPeriod': 'inputPeriod',
                //选择支付方式页
                'click #c_payment_index_cardTop': 'selectPayment',
                //跳转文字说明   lh_sun
                'click .c_payment_index_wordtip': 'paytipsAction',
                //首页操作热区调整  sq_xu
                'click .c_payment_index_hotspace_region': 'hotspaceRegionAction'
            },

            //首页操作热区调整  sq_xu
            hotspaceRegionAction: function (e) {
                var $this = $(e.currentTarget);
                var $input = $this.find(".listinput");
                if ($input && $input.focus) {
                    $input.focus();
                }
            },

            //跳转文字说明  lh_sun
            paytipsAction: function (e) {
                var $this = $(e.currentTarget); //页面调整--常用卡操作热区调整 sq_xu
                var hash = $this.attr('data-hash');
                if (!hash) {
                    return;
                }
                this.forwardUnCache(hash + "&from=" + encodeURIComponent(this.getViewUrl()/*TODO TEST window.location.hash*/));
                Util.stopEvent(e);
                e.stopImmediatePropagation(); //防止冒泡  sq_xu
            },
            saveCrtInfoFn: function (e) {
                $("#saveCrtInfo").toggleClass("checked"); //页面调整--常用卡操作热区调整 sq_xu
            },
            showCrtInfo: function () {
                this.forward("creditcardnotice" + '?from=index&noticeflag=' + this.noticeFlag);
            },
            showPeriodQue: function () { //有效期
                //this.saveCardStore();
                this.forwardUnCache("paytips!tips_3?from=index");
            },

            saveCardStore: function () {
                var self = this;
                var store = this.payCrtCardStore;
                store.setAttr("bankInfo", { //选择银行信息
                    bankName: self.els.bankName.attr("data-name") || "",
                    typeId: self.els.bankName.attr("data-typeid") || "",
                    paymentwayId: self.els.bankName.attr("data-paymentwayid") || ""
                });
                store.setAttr("bankNum", this.els.bankNum.val());
                store.setAttr("bankCvv", this.els.bankCvv.val());
                store.setAttr("userName", this.els.userName.val());
                //store.setAttr("bankPeriod", this.els.bankPeriod.html());
                store.setAttr("bankPeriod", this.els.bankPeriod.attr("data-validate"));
                store.setAttr("cardId", this.els.cardType.attr("data-value")); //证件类型
                store.setAttr("cardTypeName", this.els.cardType.html());
                store.setAttr("idNum", this.els.idNum.val());
                store.setAttr("userTel", this.els.userTel.val());
                store.setAttr("saveCrtInfo", this.els.saveCrtInfo.hasClass("open"));
            },
            countDownFn: function (e) {
                Util.stopEvent(e); //防止冒泡 sq_xu
                e.stopImmediatePropagation(); //防止冒泡 sq_xu
            },
            CodeValFn: function (e) {
                var self = this;
                Util.stopEvent(e); //防止冒泡 sq_xu
                e.stopImmediatePropagation(); //防止冒泡 sq_xu
                var orderDtlStore = orderDetailStore;
                var cardinfomation = selectBankStore.get() || {}; //Edit by sqsun 20141023 对象做容错降级处理
                var val = orderDtlStore.getAttr("mobile") || self.els.prephone.val();
                var defMobile = val.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
                prephoneVal = self.els.prephone.val(), //获取最新输入的手机号码
                cardNum = ""; //获取输入的卡号

                if (cardinfomation.isnewcard) {  //新增储蓄卡时判断储蓄卡卡号
                    cardNum = self.els.banknum.val().replace(/\s/g, "");
                    if (!/\d/gi.test(cardNum)) {
                        self.showToast("请输入正确的储蓄卡卡号", 1.2);
                        RuleMng.addErrClass(self.els.banknum, self.els.li_banknum);
                        return;
                    } else {
                        RuleMng.clearErrClass(self.els.banknum, self.els.li_banknum); //清除错误样式
                    }
                }

                if (!val) {
                    self.showToast("请填写手机号码", 1.2);
                    RuleMng.addErrClass(self.els.prephone, self.els.li_prePhone);
                    return;
                } else if (prephoneVal != defMobile) { //判断是否修改了默认下发的手机号码
                    val = prephoneVal;
                }

                if (!/\d{11}/g.test(val)) {
                    self.showToast("请填写正确的手机号码", 1.2);
                    RuleMng.addErrClass(self.els.prephone, self.els.li_prePhone);
                    return;
                }

                RuleMng.clearErrClass(self.els.prephone, self.els.li_prePhone); //清除错误样式


                var dataParam = {
                    "ver": 1,
                    "oid": orderDtlStore.getAttr("oid"),
                    "amount": orderDtlStore.getAttr("amount"),
                    "mobphone": val,
                    "isnewcard": cardinfomation.isnewcard,
                    "cardno": cardNum,
                    "cardinfoid": cardinfomation.cardinfoid,
                    "typid": cardinfomation.typeid,
                    "category": 3
                };

                var header = Business.getRequestHeader();
                //获取验证码时 展示loading图标                
                self.verifyControl.showLoading("count_down_clock", "get_code");
                paymentPipe.getValCode(dataParam, function (_data) {
                    var data = null;
                    self.els.getCode.attr("id", "get_code");
                    self.hideLoading();
                    if (!Util.isInApp()) { //in web
                        data = _data;
                    } else { //in app
                        //data = _data.resultBody;
                        //data = $.parseJSON(data);

                        //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
                        if (_data.resultBody) {
                            data = JSON.parse(_data.resultBody);
                        } else {
                            //错误的时候，弹出网络不给力提示  
                            self.hideLoading();
                            //提示具体的管道错误信息
                            self.showToast(_data.errorInformation || "网络不给力,请稍候重试");
                            self.verifyControl.hideLoading("count_down_clock", "get_code");
                            //self.showToast("网络不给力,请稍候重试");
                            return;
                        }
                    }
                    if (data.rc == 0) {
                        self.refidCode = data.refid;
                        c.storage.localStorage.set('VALIDATETIMEOUT', new Date().valueOf(), new cDate().addDay(1));
                        self.verifyControl.runVerifyCode("count_down_clock", "get_code", self.Vgetcode);
                    } else {
                        self.refidCode = "";
                        self.showToast(data.rmsg || "提交失败！请稍后再试");
                        //服务异常 恢复为获取验证码
                        self.verifyControl.hideLoading("count_down_clock", "get_code");
                    }
                }, JSON.stringify(header), function (error) { //error
                    self.refidCode = "";
                    self.hideLoading();
                    if (!Util.isInApp()) {
                        if (error && error.msg) {
                            self.showToast(error.msg);
                        }
                    }
                }, function () { //abort
                    self.hideLoading();
                });
                //防止多次发送请求
                self.els.getCode.attr("id", "");
            },

            //信用卡过期处理
            getisexpired: function (card) {
                var cardlist = payMentStore.getAttr("cards");
                var cardinfo = card;
                //隐藏常用卡重置即将过期文案
                this.periodEndingHide();
                if (!cardinfo.expire) {
                    cardinfo = cardlist[0];
                }
                var _policy = this.fillPolicyType(cardinfo, 2);
                if (cardinfo.status & 64 && !(_policy & 64)) {
                    this.periodEndingShow();
                }

            },
            periodEndingShow: function () {
                //列表去除圆角
                this.els.c_payment_index_snList_content.addClass('noBorderRadius');
                //
                this.els.PeriodEnding.show();
            },
            periodEndingHide: function () {
                //列表添加圆角
                this.els.c_payment_index_snList_content.removeClass('noBorderRadius');
                //
                this.els.PeriodEnding.hide();
            },
            //判断信用卡是否过期/即将过期  1/2
            //Add Comments by sqsun 该方法本页无引用，本模板页也无引用，是否可以删除，待定
            isexpiredByDate: function (cardinfo) {
                var cardex = c.base.Date.parse(cardinfo.expire); //卡有效期
                var nowdata = new Date();
                var yeardiff = cardex.date.getTime() - nowdata.getTime();
                var time = parseInt(yeardiff / (1000 * 60 * 60 * 24));
                var isable = (cardex.date.getYear() == nowdata.getYear() && cardex.date.getMonth() == nowdata.getMonth());
                if (cardinfo.category != 3 && isable && cardinfo.isexpired) {
                    return 2;
                } else if (cardinfo.category != 3 && cardinfo.isexpired) {
                    return 1;
                } else {
                    return 0;
                }
                return 0;
            },
            //显示必填项
            showpolicy: function (card, policyType) {
                //card.policylist = [{ policytype: 1, policysub: 193 }, { policytype: 2, policysub: 65 }, { policytype: 3, policysub: 65}];
                var self = this;
                var cardlist = payMentStore.getAttr("cards");
                var defaultMobile = ''; //默认手机号码
                var cardinfo = card || {}; //Edit by sqsun 20141023 对象做容错降级处理
                //if (!self.vali) {
                self.vali = new PayValidate({
                    container: self.els.police_lists,
                    prefix: "dep",
                    view: self,       //self为view作用域
                    valiArr: [
                        {
                            policyId: 128,
                            id: "bankNum",
                            wrapId: "li_bankNum",
                            isVali: true,
                            tpl: function () {
                                return self.$el.find("#li_banknum_tpl").html();
                            }
                        },
                        {
                            policyId: 64,
                            id: "bankPeriod",
                            wrapId: "li_bankPeriod",
                            isVali: true,
                            tpl: function () {
                                return self.$el.find("#li_bankperiod_tpl").html();
                            }
                        },
                        {
                            policyId: 1,
                            id: "cvv",
                            wrapId: "li_Cvv",
                            isVali: true,
                            tpl: function () {
                                return self.$el.find("#li_cvv_tpl").html();
                            }
                        },
                        {
                            policyId: 2,
                            id: "c_payment_userName",
                            wrapId: "li_userName",
                            isVali: true,
                            tpl: function () {
                                return self.$el.find("#li_username_tpl").html();
                            }
                        },
                        {
                            policyId: 4,
                            id: "c_payment_cardType",
                            wrapId: "c_payment_li_cardType",
                            isVali: false,
                            tpl: function () {
                                return self.$el.find("#c_payment_li_cardType_tpl").html();
                            }
                        },
                        {
                            policyId: 8,
                            id: "c_payment_idNum",
                            wrapId: "li_idNum",
                            isVali: true,
                            tpl: function () {
                                return self.$el.find("#c_payment_idNum_tpl").html();
                            }
                        },
                        {
                            policyId: 16,
                            id: "prephone",
                            wrapId: "li_prePhone",
                            isVali: true,
                            valFn: function (item) {
                                var obj = item.obj.eq(0),   //手机输入框对象
                                    value = obj.val(); //手机号码
                                if (value !== defaultMobile || defaultMobile == '') {
                                    if (RuleMng.isNull(value)) {
                                        RuleMng.addErrClass(item.obj, item.wrapObj);
                                        self.showToast("请填写手机号码", 1.2);
                                    } else {
                                        value = value.trim();
                                        if (value.length == 11) {
                                            if (/\D/gi.test(value)) {
                                                RuleMng.addErrClass(item.obj, item.wrapObj);
                                                self.showToast("请填写正确的手机号码", 1.2);
                                            } else if (/\d{11}/g.test(value)) {
                                                RuleMng.clearErrClass(item.obj, item.wrapObj);
                                            }
                                        } else {
                                            RuleMng.addErrClass(item.obj, item.wrapObj);
                                            self.showToast("请填写正确的手机号码", 1.2);
                                        }
                                    }
                                } else {
                                    RuleMng.clearErrClass(item.obj, item.wrapObj);
                                }
                            },
                            tpl: function () {
                                return self.$el.find("#li_prePhone_tpl").html();
                            }
                        },
                        {
                            policyId: 32,
                            id: "check_code",
                            wrapId: "li_checkCode",
                            isVali: true,
                            tpl: function () {
                                return self.$el.find("#li_checkCode_tpl").html();
                            }
                        }
                    ],
                    initViewEle: _.bind(function () {
                        var _els = this.els;
                        _els.cvv = this.$el.find('#cvv'); //CVV码
                        _els.userName = this.$el.find('#c_payment_userName'); //持卡人姓名
                        _els.cardType = this.$el.find('#c_payment_cardType'); //证件类型
                        _els.idNum = this.$el.find('#c_payment_idNum'); //证件号码
                        _els.prephone = this.$el.find('#prephone'); //预留手机
                        _els.iPrePhone = this.$el.find('#i_prePhone'); //预留手机号码不可填写解决input disabled 不完全兼容问题
                        _els.li_prePhone = this.$el.find('#li_prePhone'); //预留手机li对象
                        _els.getCode = this.$el.find("#get_code");  //获取验证码
                        _els.CountDownClock = this.$el.find("#count_down_clock"); //短信获取倒计时
                        _els.check_code = this.$el.find("#check_code"); //短信验证码
                        _els.bankPeriod = this.$el.find('#bankPeriod'); //有效期
                        _els.banknum = this.$el.find('#bankNum'); //卡号
                        _els.li_banknum = this.$el.find('#li_bankNum'); //卡号li对象
                        _els.cseltxt = this.$el.find('#c_payment_index_cyBank');
                        //Hybrid下修正placeholder文字消失
                        Util.placeholder(this.$el.find("input"));
                    }, self)
                });
                self.els.c_payment_index_snList_content.show();

                //信用卡和储蓄卡验证切换
                if (cardinfo.category < 3) {
                    this.vali.setModule("credit"); //信用卡验证模块
                } else {
                    this.vali.setModule("deposit"); //储蓄卡验证模块
                }
                //判断卡是否过期，已过期policytype 3 更新
                if (cardinfo.status & 32) {
                    policyType = 3;
                }
                var _policy = self.fillPolicyType(cardinfo, policyType);
                if (_policy || _policy == 0) {
                    this.vali.initValiCom(_policy);
                    if (self.getPolicyCounts(_policy) > 3) {
                        setTimeout(function () {
                            var height = self.els.police_lists.height();
                            self.els.c_payment_index_snList_content.removeClass("snList_content");
                            self.els.c_payment_index_snList_content.animate({

                                height: height
                            }, 300);
                        }, 600);
                    } else {
                        self.els.c_payment_index_snList_content.removeClass("snList_content");
                        self.els.c_payment_index_snList_content.css({ "height": "auto" });
                    }

                    //判断该卡是否需要手机验证码输入，如不需要则隐藏获取验证码按钮
                    if (!(_policy & 32) && (_policy & 16)) {
                        this.$el.find("#get_code").hide();
                        this.$el.find("#changephone").removeClass("right90");
                        self.Vgetcode = 0; //隐藏验证码
                    } else {
                        self.Vgetcode = 1; //显示验证码
                    }
                }
                if (cardinfo.mobile && !cardinfo.isnewcard) {
                    var reg = /(\d{3})\d{4}(\d{4})/;
                    orderDetailStore.setAttr("mobile", cardinfo.mobile);
                    cardinfo.mobile = cardinfo.mobile.toString();
                    defaultMobile = cardinfo.mobile.replace(reg, "$1****$2");

                    this.els.iPrePhone.html(defaultMobile);
                    this.els.prephone.val(defaultMobile).hide();
                    setTimeout(function () {
                        self.els.prephone.parent().find("span.c_global_holder").hide()
                    }, 0)

                } else {
                    //如果是新增卡不显示更换预留手机号
                    this.$el.find('#changephone').hide();
                }

                //美国运通卡 改变卡验证码提示文案
                if (cardinfo && cardinfo.typeid && (cardinfo.typeid == 8 || cardinfo.typeid == 58)) {
                    self.els.cvv.attr('placeholder', '4位信用卡验证码');
                    self.els.cvv.attr('maxlength', '4');  //修改运通卡时输入4位验证码 add sqsun 20141112
                }

            },
            fillPolicyType: function (cardinfo, type) {
                cardinfo["policylist"] = cardinfo["policylist"] || [];
                for (var i = 0; i < cardinfo["policylist"].length; i++) {
                    if (cardinfo["policylist"][i]["policytype"] && cardinfo["policylist"][i]["policytype"] == type) {
                        return cardinfo["policylist"][i]["policysub"];
                    }
                }
                return null;
            },
            setHeaderView: function (title) {
                var self = this;
                var hasClick = 0;
                //对HeaderView设置数据
                self.headerview.set({
                    'title': title || '支付方式',
                    'back': true,
                    'view': self,
                    'events': {
                        returnHandler: function () {
                            if (!hasClick) {
                                var MyAlert = new c.ui.Alert({
                                    title: '提示信息',
                                    message: '您的支付尚未完成，是否取消支付？',
                                    buttons: [{
                                        text: '取消支付',
                                        click: function () {
                                            this.hide();
                                            self.goBack();
                                        },
                                        type: c.ui.Alert.STYLE_CONFIRM
                                    }, {
                                        text: '继续支付',
                                        click: function () {
                                            this.hide();
                                            hasClick = 0;
                                        },
                                        type: c.ui.Alert.STYLE_CANCEL
                                    }
                                ]
                                });
                                hasClick = 1;
                                MyAlert.show();

                                //Add by sqsun 解决Hybrid不失去焦点问题
                                self.$el.find("input").blur();

                                self.alertArr.push(MyAlert);
                            }
                        }
                    }
                });
                self.headerview.show();
            },
            updatePage: function () {
                var self = this;
                var orderinfo = orderDetailStore.get() || {}; //Edit by sqsun 20141023 对象做容错降级处理
                self.optInfoTag();
                self.els.order_title.html();
                //this.els.order_title.html(orderinfo.title); 
                this.els.order_title.html(_.escape(orderinfo.title)); //过滤HTML标签

                if (!orderinfo.totalamount) {
                    self.hideLoading();
                    //var str = _.isNull(orderinfo.totalamount) ? "金额不能为空" : "金额不能为0";
                    var str = '系统异常，请重新提交订单！';
                    var MyAlert = new c.ui.Alert({
                        title: '提示信息',
                        message: str,
                        buttons: [
                        {
                            text: '确定',
                            click: function () {
                                this.hide();
                                self.goBack();
                            },
                            type: c.ui.Alert.STYLE_CONFIRM
                        }
                    ]
                    });
                    MyAlert.show();

                    //收集异常信息
                    try {
                        Business.exceptionInfoCollect({
                            bustype: orderinfo.bustype,
                            excode: 3,
                            extype: 1,
                            exdesc: '读取localstorage中【totalamount】异常, token:' + JSON.stringify(orderinfo)
                        });
                    } catch (e) {

                    }

                    return;
                }

                self.showOrderAmount();
                //清空礼品卡金额异常状态store
                tktErrorStore.remove();
                var _param = {
                    svr: 0,
                    bustype: orderinfo.bustype,
                    ath: orderinfo.auth,
                    "optype": 3,
                    "currency": "",
                    "amount": orderinfo.amount,
                    "fee": 0,
                    "cardno": "",
                    "expire": "2014/06/09 00:00:00",
                    "cardinfoid": -1,
                    "merchsupport": -1
                }

                var _callback = function (item) {
                    if (Util.isInApp()) {
                        item = JSON.parse(item.resultBody);
                        cashPayInfoStore.set(item);
                    }
                }
                var header = Business.getRequestHeader();
                var headstring = JSON.stringify(header);

                paymentPipe.getCashMess(_param, _callback, headstring, function (err) {
                    self.hideLoading();
                });

                //去101拉取最新的银行增量
                Bankincrement.getLastBankCrement();
            },
            //显示金额
            showOrderAmount: function () {
                var self = this;
                var fnum = null;
                var famount = orderDetailStore.getAttr("displayAmount") || 0;
                var znumArray = Util.transNumToFixedArray(orderDetailStore.getAttr("origamount") || 0);
                var currency = currency || (orderDetailStore.getAttr('currency') || '￥');
                if (currency == 'CNY') {
                    currency = '￥';
                }
                var arrayStr = new Array();
                arrayStr.push("应付总额：<div style='display:inline'><i class='corange'>");
                arrayStr.push(currency);
                arrayStr.push("<span class='ft18'>");
                arrayStr.push(znumArray[0]);
                arrayStr.push("</span>");
                if (znumArray && znumArray.length > 1) {
                    arrayStr.push(".");
                    arrayStr.push(znumArray[1]);
                }
                arrayStr.push("</i>");

                if (famount) {
                    var fcurent = orderDetailStore.getAttr("displayCurrency") || '';
                    fnum = Util.transNumToFixedArray(famount, 2, fcurent);
                    arrayStr.push("<br/><span style='padding-left: 70px;'>");
                    arrayStr.push("约");
                    arrayStr.push(fcurent);
                    arrayStr.push(fnum.join('.'));
                    arrayStr.push("</span>");
                }
                arrayStr.push("</div>");

                this.els.c_payment_index_amount.html(arrayStr.join(''));
            },

            //回退
            goBack: function (url) {
                //回退到bu页清空钱包混付状态
                if (payMentStore.getAttr("tktuse")) {
                    payMentStore.setAttr("tktuse", null);
                }

                //礼品卡金额变动标志位删除
                tktErrorStore && tktErrorStore.remove();

                var backurl = url || orderDetailStore.getAttr('from');

                if (!Util.isInApp()) {
                    //离开页面的时候，清楚缓存
                    orderDetailStore.remove();
                    window.location.href = backurl;
                } else {
                    //离开页面的时候，清楚缓存
                    orderDetailStore.remove();
                    Business.jump2App(backurl);
                }
            },

            //设置礼品卡模块
            getRWY: function (list) {
                var ret = {};
                for (var i = 0, item = null, len = list.length; i < len; i++) {
                    item = list[i];
                    if (item.tkttype == 2 && item.amount > 0) {
                        ret = item;
                        break
                    }
                }
                return ret;
            },

            //设置礼品卡模块
            lipinCardAction: function () {
                if (Util.isInApp()) {
                    lipinCardEInfo.setAttr('flag_lipincard', 1);
                }
                //this.forward('lipincardpay');
                Lizard.goTo("lipincardpay", {
                    viewName: "lipincardpay"
                });
            },
            //如果钱包余额小于1元 同时bu不支持小数 设置余额为0
            filterRemainAmount: function (items) {
                var bustype = orderDetailStore.getAttr('bustype') || 0;
                if (this.disTingByBust()) {
                    return;
                }
                var wallertlist = items.walletlist || [];
                for (var i = 0; i < wallertlist.length; i++) {
                    if (wallertlist[i].cashbalance * 1 < 1) {
                        wallertlist[i].cashbalance = 0;
                    }
                }

                var tkts = (items.tktinfo && items.tktinfo.tkts) || [];
                for (var i = 0; i < tkts.length; i++) {
                    if (tkts[i].amount * 1 < 1) {
                        tkts[i].amount = 0;
                    }
                }
            },
            disTingByBust: function () {
                var array = Business.supportDecimalBu();
                var bustype = orderDetailStore.getAttr('bustype') || 0;
                var result = false;
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == bustype) {
                        result = true;
                        break;
                    }
                }
                return result;
            },

            //设置礼品卡模块
            optInfoTag: function () {
                var extStore = extendParamsStore,
                crtSaveInfo = this.$el.find("#safe_intro"),
                crtInfo = this.$el.find("#crtpay_info"); //支付须知
                if (!(extendParamsStore.getAttr('haveCD') || '')) {
                    return;
                }
                if (!extStore.getAttr("creditCardUseExplain")) {
                    crtInfo.hide();
                    crtInfo.addClass("fl");
                    crtSaveInfo.removeClass("plr_15");
                    crtSaveInfo.removeClass("fl");
                } else {
                    crtInfo.show();
                    crtInfo.removeClass("fl");
                    crtSaveInfo.addClass("plr_15");
                    crtSaveInfo.addClass("fl");
                }
            },
            showTitleByBu: function () {
                var extParamStore = extendParamsStore,
                useEType = extParamStore && extParamStore.get() && extParamStore.get().useEType;
                if (useEType) {
                    if (useEType == "1") {
                        this.setHeaderView();
                        this.els.contentText.each(function (index, ele) {
                            $(ele).html($(ele).html().replace("担保", "支付"));
                        });
                        this.els.payBtn.html("支付");
                        this.$el.find("#crtpay_info").html('信用卡支付须知<i class="pos_r ml20"><i class="arr2"></i></i>');
                        //this.els.cykWord.html('常用卡支付');
                        this.noticeFlag = "pay";
                    } else if (useEType == "2") {
                        this.setHeaderView('担保方式');
                        this.els.contentText.each(function (index, ele) {
                            $(ele).html($(ele).html().replace("支付", "担保"));
                        });
                        this.els.payBtn.html("担保");
                        this.$el.find("#crtpay_info").html('信用卡担保说明<i class="pos_r ml20"><i class="arr2"></i></i>');
                        this.noticeFlag = "ensure";
                        //this.els.cykWord.html('常用卡担保');
                    }
                } else {
                    this.setHeaderView();
                    this.els.contentText.each(function (index, ele) {
                        $(ele).html($(ele).html().replace("担保", "支付"));
                    });
                    //this.els.cykWord.html('常用卡支付');
                }

            },
            //判断是否 全部不可用（礼品卡 钱包）
            isAllUnable: function (items) {
                var wallertlist = items.walletlist || [];
                for (var i = 0; i < wallertlist.length; i++) {
                    if (wallertlist[i].status == 1) {
                        return false;
                    }
                }

                var tkts = (items.tktinfo && items.tktinfo.tkts) || [];
                for (var i = 0; i < tkts.length; i++) {
                    if (tkts[i].status == 0) {
                        return false;
                    }
                }

                return true;
            },
            getPayway: function (callback) {
                var self = this;
                var orderdetail = orderDetailStore.get() || {};
                var header = Business.getRequestHeader();
                var headstring = JSON.stringify(header);

                if (!orderdetail.totalamount) {
                    self.hideLoading();
                    //var str = _.isNull(orderdetail.totalamount) ? "金额不能为空" : "金额不能为0";
                    var str = '系统异常，请重新提交订单！';
                    var MyAlert = new c.ui.Alert({
                        title: '提示信息',
                        message: str,
                        buttons: [
                        {
                            text: '确定',
                            click: function () {
                                this.hide();
                                self.goBack();
                            },
                            type: c.ui.Alert.STYLE_CONFIRM
                        }
                    ]
                    });
                    MyAlert.show();

                    //收集异常信息
                    try {
                        Business.exceptionInfoCollect({
                            bustype: orderdetail.bustype,
                            excode: 3,
                            extype: 1,
                            exdesc: '读取localstorage中【totalamount】异常, token：' + JSON.stringify(orderdetail)
                        });
                    } catch (e) {

                    }
                    return;
                }

                //url extend
                var extParamStore = extendParamsStore,
                useEType = extParamStore && extParamStore.get() && extParamStore.get().useEType;

                var extParam = extParamStore && extParamStore.get() || {};

                //获取BU传过来的建行os类型
                var thirdExno = extendParamsStore.getAttr("osType");

                var _param = {
                    "subpay": extParam.subPayType,
                    "bustype": orderdetail.bustype,
                    "oid": orderdetail.oid,
                    "requestid": orderdetail.requestid,
                    "oidex": orderdetail.oid,
                    "odesc": orderdetail.title,
                    "oamount": orderdetail.amount,
                    "searchmap": 0,
                    //1=Pay=支付 2=Guarantee=担保
                    "usetype": useEType ? useEType : 1,
                    "subusetype": Business.isPreAuth() ? 1 : 0,
                    "ver": 0
                };

                //Bu是否支持积分担保(Bu传入)
                if (extParam.isIntegralGurantee && extParam.integralGuranteeAmount) {
                    _param.subusetype = _param.subusetype + 2;
                }

                //解析封装白名单 向服务端传递 
                var payrestrict = {};
                if (extParam.payTypeList) {
                    payrestrict.paytypelist = extParam.payTypeList;
                }
                if (extParam.subPayTypeList) {
                    payrestrict.subpaytypelist = extParam.subPayTypeList;
                }
                if (extParam.payWayWhiteList) {
                    var array = new Array();
                    var list = extParam.payWayWhiteList.split(',');
                    for (var i = 0; i < list.length; i++) {
                        var obj = {}
                        obj.whiteid = list[i];
                        array.push(obj);
                    }
                    payrestrict.whitelist = array;
                }
                if (extParam.PayWayBlackList) {
                    var array = new Array();
                    var list = extParam.PayWayBlackList.split(',');
                    for (var i = 0; i < list.length; i++) {
                        var obj = {}
                        obj.blackid = list[i];
                        array.push(obj);
                    }
                    payrestrict.blacklist = array;
                }
                //卡号段 格式:PaymentWayID1-XXXXXX-XXXXXX
                if (extParam.CardNumSegmentList) {
                    var array = new Array();
                    var list = extParam.CardNumSegmentList.split(',');
                    for (var i = 0; i < list.length; i++) {
                        var templist = list[i].split('-');
                        var obj = {}
                        if (templist.length >= 3) {
                            obj.cnid = templist[0];
                            obj.startnum = templist[1];
                            obj.endnum = templist[2];
                            array.push(obj);
                        }
                    }
                    payrestrict.cardnumseglist = array;
                }

                //判断业务端是否限卡，保存后新增卡页面使用 产品限卡定义为只有黑白名单才算限卡
                if (extParam.PayWayBlackList || extParam.payWayWhiteList) {
                    extendParamsStore.setAttr('isPayRestrict', 1);
                }

                _param.payrestrict = payrestrict;

                //保存限卡支付
                extendParamsStore.setAttr('payrestrict', payrestrict);

                var _callback = function (item) {
                    var payTypeList;
                    var payTypeListCard = 0;    //信用卡&储蓄卡 in 白名单中
                    var isOnlyOneNewCard;
                    var finalPayWay; //当前支付方式页的支付方式，1 -> 信用卡/储蓄卡 2 -> 微信 3 -> 支付宝 4 -> 现金支付
                    var _routeKey = "payment_route_" + orderDetailStore.getAttr("bustype");
                    var _routeParams = {};
                    //console.timeEnd("testtime")
                    //item = { "ResponseStatus": { "Timestamp": "2014-10-27 15:24:05", "Ack": "Success", "Errors": [], "Extension": [{ "Id": "Auth", "Value": "E5B29DFDF28B97E22F685D1258750623D34AA1A39A59EAE3BB6B6A3DBD57CBF2" }, { "Id": "ServiceCode", "Value": "31000101" }, { "Id": "CLOGGING_TRACE_ID", "Value": "4475200081839322485" }, { "Id": "auth", "Value": "4430BBFED9F6C57D1ABDDFC362741C291B7D2AA1DC7B551D1A6D3B9DBCEEB27C"}] }, "paytoute": 0, "rusetype": 1, "paytype": 47, "merchsupport": 0, "forcardcharg": 0, "tktinfo": { "paymentwayid": "TMPay", "amount": 1000.5, "tkts": [{ "faceval": 0, "amount": 0.5, "tkttype": 3, "status": 1, "ticketstatus": 0, "expire": "0001-01-01 00:00:00" }, { "faceval": 0, "amount": 0.9, "tkttype": 2, "status": 1, "ticketstatus": 0, "expire": "0001-01-01 00:00:00" }, { "faceval": 0, "amount": 0.5, "tkttype": 1, "status": 0, "ticketstatus": 0, "expire": "0001-01-01 00:00:00"}] }, "cards": [{ "paymentwayid": "CC_CMBC", "typeid": 16, "typemain": 16, "typename": "民生银行", "cardnumfl": "628258***05", "status": 129, "isexpired": false, "expire": "9999-12-31 23:59:59", "policy": 193, "policylist": [{ "policytype": 1, "policysub": 193 }, { "policytype": 2, "policysub": 1 }, { "policytype": 3, "policysub": 65}], "mobile": "", "cardinfoid": 29539310, "category": 1 }, { "paymentwayid": "CC_CIB2", "typeid": 564, "typemain": 500, "typename": "兴业银行", "cardnumfl": "622922***03", "status": 1, "isexpired": false, "expire": "9999-12-31 23:59:59", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211 }, { "policytype": 2, "policysub": 17 }, { "policytype": 3, "policysub": 81}], "mobile": "18526262626", "cardinfoid": 29539306, "category": 2 }, { "paymentwayid": "CC_CMB2", "typeid": 558, "typemain": 500, "typename": "招商银行", "cardnumfl": "439226***32", "status": 1, "isexpired": false, "expire": "9999-12-31 23:59:59", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211 }, { "policytype": 2, "policysub": 19 }, { "policytype": 3, "policysub": 83}], "mobile": "", "cardinfoid": 29537355, "category": 2 }, { "paymentwayid": "CC_CMB2", "typeid": 558, "typemain": 500, "typename": "招商银行", "cardnumfl": "439225***09", "status": 1, "isexpired": false, "expire": "9999-12-31 23:59:59", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211 }, { "policytype": 2, "policysub": 19 }, { "policytype": 3, "policysub": 83}], "mobile": "", "cardinfoid": 29533000, "category": 2 }, { "paymentwayid": "CC_CMB2", "typeid": 558, "typemain": 500, "typename": "招商银行", "cardnumfl": "439226***40", "status": 1, "isexpired": false, "expire": "9999-12-31 23:59:59", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211 }, { "policytype": 2, "policysub": 19 }, { "policytype": 3, "policysub": 83}], "mobile": "18515152659", "cardinfoid": 29532654, "category": 2 }, { "paymentwayid": "CC_CCB", "typeid": 5, "typemain": 5, "typename": "中国建设银行", "cardnumfl": "628266***31", "status": 1, "isexpired": false, "expire": "9999-12-31 23:59:59", "policy": 193, "policylist": [{ "policytype": 1, "policysub": 193 }, { "policytype": 2, "policysub": 1 }, { "policytype": 3, "policysub": 65}], "mobile": "", "cardinfoid": 29182874, "category": 1 }, { "paymentwayid": "DQ_CMB", "typeid": 1137, "typemain": 1000, "typename": "招商银行", "cardnumfl": "622588***91", "status": 1, "isexpired": false, "expire": "9999-12-31 00:00:00", "policy": 190, "policylist": [{ "policytype": 1, "policysub": 190 }, { "policytype": 2, "policysub": 48 }, { "policytype": 3, "policysub": 48}], "mobile": "18524252362", "cardinfoid": 29539120, "category": 3 }, { "paymentwayid": "DQ_CMB", "typeid": 1137, "typemain": 1000, "typename": "招商银行", "cardnumfl": "622588***01", "status": 1, "isexpired": false, "expire": "9999-12-31 00:00:00", "policy": 190, "policylist": [{ "policytype": 1, "policysub": 190 }, { "policytype": 2, "policysub": 48 }, { "policytype": 3, "policysub": 48}], "mobile": "13551342011", "cardinfoid": 29261411, "category": 3 }, { "paymentwayid": "CC_AmericanExpress", "typeid": 8, "typemain": 8, "typename": "运通(AMEX)", "cardnumfl": "", "lastcode": "", "status": 18, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 195, "policylist": [{ "policytype": 1, "policysub": 195}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_MasterCard", "typeid": 6, "typemain": 6, "typename": "万事达(Master)", "cardnumfl": "", "lastcode": "", "status": 18, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 194, "policylist": [{ "policytype": 1, "policysub": 194}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_ABC", "typeid": 4, "typemain": 4, "typename": "农业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 193, "policylist": [{ "policytype": 1, "policysub": 193}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_BANKOFDL", "typeid": 510, "typemain": 500, "typename": "大连银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_BEEB", "typeid": 549, "typemain": 500, "typename": "鄞州银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_BJBANK", "typeid": 27, "typemain": 27, "typename": "北京银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 195, "policylist": [{ "policytype": 1, "policysub": 195}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_BJRCB", "typeid": 502, "typemain": 500, "typename": "北京农商银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_BOC", "typeid": 1, "typemain": 1, "typename": "中国银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 193, "policylist": [{ "policytype": 1, "policysub": 193}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_BOJ", "typeid": 526, "typemain": 500, "typename": "锦州银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_BOL", "typeid": 530, "typemain": 500, "typename": "兰州银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_BOQ", "typeid": 533, "typemain": 500, "typename": "青海银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_BSB", "typeid": 503, "typemain": 500, "typename": "包商银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_CDB", "typeid": 508, "typemain": 500, "typename": "承德银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_CDRCB", "typeid": 504, "typemain": 500, "typename": "成都农村商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_CEBBANK", "typeid": 15, "typemain": 15, "typename": "光大银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 200, "policylist": [{ "policytype": 1, "policysub": 200}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_CITIC", "typeid": 17, "typemain": 17, "typename": "中信银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 204, "policylist": [{ "policytype": 1, "policysub": 204}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_CITYBANK", "typeid": 572, "typemain": 500, "typename": "花旗银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_COMM", "typeid": 3, "typemain": 3, "typename": "交通银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 192, "policylist": [{ "policytype": 1, "policysub": 192}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_CQCB", "typeid": 509, "typemain": 500, "typename": "重庆银行 ", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_CQRCB", "typeid": 505, "typemain": 500, "typename": "重庆农村商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_CSCB", "typeid": 507, "typemain": 500, "typename": "长沙银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_CSRCB", "typeid": 506, "typemain": 500, "typename": "常熟农村商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_CZCB", "typeid": 550, "typemain": 500, "typename": "浙江稠州商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_DYCCB", "typeid": 511, "typemain": 500, "typename": "东营银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_FDB", "typeid": 514, "typemain": 500, "typename": "富滇银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_FJNX", "typeid": 513, "typemain": 500, "typename": "福建省农村信用社", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_GDB", "typeid": 13, "typemain": 13, "typename": "广发银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 206, "policylist": [{ "policytype": 1, "policysub": 206}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_GRCB", "typeid": 516, "typemain": 500, "typename": "广州农村商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_GYCCB", "typeid": 518, "typemain": 500, "typename": "贵阳银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_GZCB", "typeid": 515, "typemain": 500, "typename": "广州银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_GZCCB", "typeid": 517, "typemain": 500, "typename": "赣州银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_HEB", "typeid": 520, "typemain": 500, "typename": "河北银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_HKBEA", "typeid": 26, "typemain": 26, "typename": "东亚银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 195, "policylist": [{ "policytype": 1, "policysub": 195}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_HNNXS", "typeid": 523, "typemain": 500, "typename": "湖南省农村信用社联合社", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_HRBCB", "typeid": 522, "typemain": 500, "typename": "哈尔滨银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_HSBank", "typeid": 521, "typemain": 500, "typename": "徽商银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_HZBANK", "typeid": 519, "typemain": 500, "typename": "杭州银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_ICBC", "typeid": 2, "typemain": 2, "typename": "工商银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 207, "policylist": [{ "policytype": 1, "policysub": 207}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_JJCCB", "typeid": 528, "typemain": 500, "typename": "九江银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_JNCCB", "typeid": 527, "typemain": 500, "typename": "金华银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_JPRCU", "typeid": 524, "typemain": 500, "typename": "江苏省农村信用社联合社", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_JSB", "typeid": 28, "typemain": 28, "typename": "江苏银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 193, "policylist": [{ "policytype": 1, "policysub": 193}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_JYRCB", "typeid": 525, "typemain": 500, "typename": "江阴农村商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_LJBC", "typeid": 529, "typemain": 500, "typename": "龙江银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_MTB", "typeid": 551, "typemain": 500, "typename": "浙江民泰商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_NBBANK", "typeid": 25, "typemain": 25, "typename": "宁波银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 194, "policylist": [{ "policytype": 1, "policysub": 194}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_NCCB", "typeid": 531, "typemain": 500, "typename": "南昌银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_NJCB", "typeid": 532, "typemain": 500, "typename": "南京银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_ORDOSBANK", "typeid": 512, "typemain": 500, "typename": "鄂尔多斯银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_PSBC", "typeid": 501, "typemain": 500, "typename": "邮政储蓄银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_QBCCB", "typeid": 535, "typemain": 500, "typename": "青岛银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_QLBC", "typeid": 534, "typemain": 500, "typename": "齐鲁银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_SDEB", "typeid": 538, "typemain": 500, "typename": "顺德农村商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_SHBANK", "typeid": 21, "typemain": 21, "typename": "上海银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 207, "policylist": [{ "policytype": 1, "policysub": 207}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_SPABANK", "typeid": 22, "typemain": 22, "typename": "平安银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 205, "policylist": [{ "policytype": 1, "policysub": 205}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_SPDB", "typeid": 18, "typemain": 18, "typename": "浦发银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 194, "policylist": [{ "policytype": 1, "policysub": 194}], "cardinfoid": 0, "category": 1 }, { "paymentwayid": "CC_SRB", "typeid": 537, "typemain": 500, "typename": "上饶银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_SRCB", "typeid": 536, "typemain": 500, "typename": "上海农商银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_TZB", "typeid": 540, "typemain": 500, "typename": "台州银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_UCCB", "typeid": 546, "typemain": 500, "typename": "乌鲁木齐市商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_WFCCB", "typeid": 541, "typemain": 500, "typename": "潍坊银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_WHCCB", "typeid": 542, "typemain": 500, "typename": "威海市商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_WJRCB", "typeid": 543, "typemain": 500, "typename": "吴江农商银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_WRCB", "typeid": 544, "typemain": 500, "typename": "无锡农村商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_WZCB", "typeid": 545, "typemain": 500, "typename": "温州银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_YCCB", "typeid": 547, "typemain": 500, "typename": "宜昌市商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_YCCCB", "typeid": 548, "typemain": 500, "typename": "银川市商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_YDRCB", "typeid": 539, "typemain": 500, "typename": "山西尧都农村商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "CC_ZJTLCB", "typeid": 552, "typemain": 500, "typename": "浙江泰隆商业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 211, "policylist": [{ "policytype": 1, "policysub": 211}], "cardinfoid": 0, "category": 2 }, { "paymentwayid": "DQ_CCB", "typeid": 1130, "typemain": 1000, "typename": "建设银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 190, "policylist": [{ "policytype": 1, "policysub": 190}], "cardinfoid": 0, "category": 3 }, { "paymentwayid": "DQ_CEBBANK", "typeid": 1133, "typemain": 1000, "typename": "光大银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 190, "policylist": [{ "policytype": 1, "policysub": 190}], "cardinfoid": 0, "category": 3 }, { "paymentwayid": "DQ_CIB", "typeid": 1138, "typemain": 1000, "typename": "兴业银行", "cardnumfl": "", "lastcode": "", "status": 0, "isexpired": false, "expire": "0001-01-01 00:00:00", "policy": 190, "policylist": [{ "policytype": 1, "policysub": 190}], "cardinfoid": 0, "category": 3}], "thirdpartylist": [{ "paymentwayid": "EB_CCB", "thirdstatus": 0, "typeid": 0, "typename": "中国建设银行" }, { "paymentwayid": "EB_MobileAlipay", "thirdstatus": 0, "typeid": 0, "typename": "移动版支付宝" }, { "paymentwayid": "WechatScanCode", "thirdstatus": 0, "typeid": 0, "typename": "微信支付 "}], "walletlist": [{ "paymentwayid": "CashAccountPay", "cashbalance": 0.6, "cashfrobalance": 99995000, "status": 1, "walletstatus": 0}], "cashinfolist": [], "guarantee": [], "prompt": "支付安全承诺：携程采用国际标准的加密算法来保证支付信息传输安全，并承诺保障用户在携程的信息安全，一旦由携程安全问题造成的资金损失，携程全额赔付。", "dsettings": [{ "type": 1 }, { "type": 2 }, { "type": 3 }, { "type": 4, "value": "此服务由银联提供" }, { "type": 5, "value": "<b>元素</b><br>元素</br>" }, { "type": 6, "value": "<b>元素</b><br>元素</br>" }, { "type": 7, "value": "支持各大银行信用卡和储蓄卡" }, { "type": 8, "value": "" }, { "type": 10, "value": "钱包支付提示文案1<b>元素</b><br>元素</br>后面是换行\n撒打扫打扫打扫大空格前             空格后大撒打扫打扫打扫"}] };
                    self.hideLoading();
                    //这个一定要放到item = JSON.parse(item.resultBody);的前面
                    if (item && item.errorInformation) {
                        //self.showToast("网络不给力，请稍候重试");
                        //提示具体的管道错误信息
                        self.showToast(item.errorInformation);
                        setTimeout(function () {
                            self.goBack();
                        }, 2 * 1000);
                        return;
                    }

                    if (Util.isInApp()) {
                        item = JSON.parse(item.resultBody);
                        //保存钱包余额 in payMentStore
                        //payMentStore.setAttr(item);
                        //payMentStore.setAttr("walletlist", item.walletlist);
                    }
                    //钱包余额小于1元 同时Bu不支持小数 默认把钱包余额设置为零
                    self.filterRemainAmount(item);

                    payMentStore.setAttr(item);


                    //hybrid 里面才执行下面的操作，lh_sun
                    if (Util.isInApp()) {
                        //传递101下发跳转native还是hybrid给native保存
                        var fn = new cHybridShell.Fn('do_business_job');
                        //params@1: businessType: 4 支付用通道
                        //params@2: businessCode: 10001 setPayDataToNative
                        //params@3: _params: 跳转native还是haybrid的参数
                        _routeParams[_routeKey] = item.paytoute;
                        fn.run(4, 10001, _routeParams);
                    }

                    //系统错误，直接抛出网络不给力,请稍候重试
                    if (typeof item.res != 'undefined' && item.res) {
                        self.showToast("网络不给力，请稍候重试");
                        setTimeout(function () {
                            self.goBack();
                        }, 2 * 1000);
                        return;
                    }

                    //101服务抛错，直接抛出网络不给力,请稍候重试
                    if (item.rc && item.rc == 1) {
                        self.showToast(item.rmsg || "网络不给力,请稍候重试");
                        setTimeout(function () {
                            self.goBack();
                        }, 2 * 1000);
                        return;
                    }

                    item.cards = IndexBankList.repalceCardType(item.cards);

                    //保存paytype到localstorage中
                    orderDetailStore.setAttr("paytype", item.paytype);

                    //为了解决h5&hybrid下发字段不统一
                    if (item.cashinfolist) {
                        orderDetailStore.setAttr("CashInfo", item.cashinfolist);
                    } else {
                        orderDetailStore.setAttr("CashInfo", item.cashinfo);
                    }

                    //根据101服务端下发payType确定
                    //payTypeList = item.paytype;
                    //20141021 jianggd@Ctrip.com 
                    //101下发的payTypeList
                    extendParamsStore.setAttr('payTypeListS', item.paytype);
                    payTypeList = extendParamsStore.getAttr('payTypeListS');
                    /*
                    payTypeListCard | 储蓄卡信用卡

                    == 1 可以支付 == 0 未在白名单中不能用于支付
                    */
                    if (payTypeList) {
                        if (payTypeList & 2) {
                            //20141021 jianggd@Ctrip.com 
                            //将值存在localstore里
                            extendParamsStore.setAttr('payTypeListCard', 1);
                            payTypeListCard = extendParamsStore.getAttr('payTypeListCard');
                        }

                    } else {
                        payTypeListCard = 0;
                    }
                    //礼品卡支付渠道是否为空
                    var emptyTkts = !(item.tktinfo && item.tktinfo.tkts) || (item.tktinfo && item.tktinfo.tkts.length <= 0) ? 1 : 0;
                    //信用卡支付渠道是否为空
                    var emptyCards = !item.cards || item.cards.length <= 0 ? 1 : 0;
                    //第三方支付渠道是否为空
                    var emptythird = !item.thirdpartylist || item.thirdpartylist.length <= 0 ? 1 : 0;
                    //现金支付渠道是否为空
                    var emptyCash = !item.cashinfolist || item.cashinfolist.length <= 0 ? 1 : 0;

                    //无任何支付渠道跳转无结果页
                    //再加上礼品卡、钱包都处于不能用状态时候  
                    if ((emptyTkts || self.isAllUnable(item)) && emptyCards && emptythird && emptyCash) {
                        self.forward("nopayment");
                    }
                    //支付平台 对应支付通道
                    self.serverPayEntry = item.rusetype || 1;
                    extendParamsStore.setAttr('serverPayEntry', self.serverPayEntry);
                    self.payMethFlag = self.serverPayEntry != 2 ? 1 : 2;

                    if (Business.isPreAuth()) {
                        self.payMethFlag = 1;
                    }

                    //设置礼品卡模块
                    IndexLiPinCard.setLIPINCard.call(self, item);
                    //
                    var oldcardlist = [];
                    //获取白名单过滤后的卡列表 5.8整合外卡  所以不需要过滤外卡
                    //var cardlist = self.getPaymentCardlist(item.cards);
                    var cardlist = item.cards;

                    payMentStore.setAttr("cards", cardlist);
                    payMentStore.setAttr("tktinfo", item.tktinfo);

                    //判断是否走上一次支付方式的逻辑
                    if (!extendParamsStore.getAttr('isPayRestrict')) {
                        //20141021 jianggd@Ctrip.com 
                        //将值存在localstore里
                        payMentStore.setAttr('finalPayWay', self.isHasLastPayWay(item));
                        finalPayWay = payMentStore.getAttr('finalPayWay');
                        //finalPayWay = -100表示上一次支付方式为微信，但不支持微信支付
                        //hasLastPayWay用于statistic数据统计
                        if (finalPayWay !== 0) {
                            orderDetailStore.setAttr("hasLastPayWay", 1);
                        } else {
                            orderDetailStore.setAttr("hasLastPayWay", 0);
                        }
                        if (finalPayWay == -100) {
                            //重置self.isHasLastPayWay结果
                            //20141021 jianggd@Ctrip.com 
                            //将值存在localstore里
                            payMentStore.setAttr('finalPayWay', 0);
                            finalPayWay = payMentStore.getAttr('finalPayWay');
                        }
                    }
                    //显示上一次支付方式模块
                    if (finalPayWay == 2) {
                        self.getWeiXinContent();
                        self.els.c_payment_index_lastWeixin.show();
                    } else if (finalPayWay == 3) {
                        self.els.c_payment_index_lastAlipay.show();
                    } else if (finalPayWay == 4) {
                        self.els.c_payment_index_cash.show();
                    } else {
                        self.els.c_payment_index_lastCard.show();
                    }

                    //判断白名单是否包含信用卡和储蓄卡
                    if (payTypeListCard) {
                        if (cardlist.length > 0) {

                            //限卡时显示限卡文案
                            if (extendParamsStore.getAttr("isPayRestrict")) {
                                self.els.c_payment_index_cardTop.addClass('noBorderRadius');
                                self.els.c_payment_paymentnote.show();
                            }
                            if (cardlist.length == 1) {
                                //只有一张银行卡且是曾用卡也需要显示曾用卡
                                //if (cardlist[0].status & 1 == 1) {
                                oldcardlist.push(cardlist[0]);
                                //}
                                //只有一张常用卡隐藏下拉箭头和解绑事件
                                if (cardlist[0].status & 1) {
                                    //通过设置id为空解绑事件
                                    //20141021 jianggd@Ctrip.com 
                                    //将值存在localstore里
                                    extendParamsStore.setAttr('onlyOneOldCard', 1);
                                    isOnlyOneOldCard = extendParamsStore.getAttr('onlyOneOldCard');
                                }
                                //只有一张卡并且为新卡时隐藏新增信用卡和储蓄卡
                                else {
                                    //20141021 jianggd@Ctrip.com 
                                    //将值存在localstore里
                                    extendParamsStore.setAttr('isOnlyOneNewCard', 1);
                                    isOnlyOneNewCard = extendParamsStore.getAttr('isOnlyOneNewCard');
                                    //20141021 jianggd@Ctrip.com 
                                    //将值存在localstore里
                                    extendParamsStore.setAttr('policytypeControl', 1);
                                    policytypeControl = extendParamsStore.getAttr('policytypeControl');
                                }
                                if (cardlist[0].category == 3) {
                                    _catogary = "储蓄卡";
                                } else {
                                    //5.8 prd需求一家银行一个卡种 储蓄卡外列不能用
                                    _catogary = "信用卡";
                                    //20141021 jianggd@Ctrip.com 
                                    //将值存在localstore里
                                    extendParamsStore.setAttr('haveCD', 1);
                                    payTypeListCard = extendParamsStore.getAttr('haveCD');
                                }

                                //如果只有1张新卡在当前页新增卡支付 
                                if (isOnlyOneNewCard) {
                                    if (emptythird && emptyCash) {
                                        self.els.c_payment_index_changeBtn.hide();
                                    }
                                }
                            } else if (cardlist.length > 1) {
                                for (var i = 0; i < cardlist.length; i++) {
                                    //status支持位运算
                                    if (cardlist[i].status & 1 == 1) {
                                        oldcardlist.push(cardlist[i]);
                                    }
                                    if (cardlist[i].category == 3) {
                                    } else {
                                        //20141021 jianggd@Ctrip.com 
                                        //将值存在localstore里
                                        extendParamsStore.setAttr('haveCD', 1);
                                        payTypeListCard = extendParamsStore.getAttr('haveCD');
                                    }
                                }

                            }
                            //把所有常用卡保存到store中
                            oldCardsStore.set(oldcardlist);
                            //判断是否显示支付方式的模块
                            if (oldcardlist.length > 0 && !finalPayWay) {
                                //finalPayWay == -1 表示只有1张新卡或有常用卡  但是没有上一次支付方式
                                finalPayWay = -1;
                                payMentStore.setAttr("finalPayWay", finalPayWay);
                                self.els.c_payment_index_lastCard.show();
                            }
                            //默认写入第一张信用/储蓄卡为支付卡
                            if (!selectBankStore.get()) {
                                selectBankStore.set(oldcardlist[0]);
                                oldCardStore.set(selectBankStore.get());
                            }
                            //判断当前卡是否新卡
                            if (selectBankStore.get() && !(selectBankStore.get().status & 1) && (finalPayWay == 1 || finalPayWay == -1)) {
                                selectBankStore.setAttr("isnewcard", true);  //支付页新增卡标识
                                self.showNewCard();
                            }
                            //显示下发一张卡和多张卡的共通逻辑
                            if ((finalPayWay == 1 || finalPayWay == -1)) {
                                self.setBankCardIcon();
                            }

                        } else {
                            //无下发银行卡信息 隐藏常用卡模块，隐藏常用卡列表
                            if (!finalPayWay && oldcardlist.length < 1) {
                                self.els.used_list.hide();
                                self.els.paywaylist_ul.show();
                            }
                        }
                    } else {
                        if (!finalPayWay && oldcardlist.length < 1) {
                            self.els.used_list.hide();
                            self.els.paywaylist_ul.show();
                        }
                    }

                    //判断常用卡是否为0并且没有上一次支付方式隐藏支付模块
                    if (!finalPayWay && oldcardlist.length < 1) {
                        self.els.used_list.hide();
                        self.els.paywaylist_ul.show();
                        Business.unionPayCollection.call(self, self.els.paywaylist_ul); //显示其它支付方式
                    }

                    //fixed bug 50600  sunlaohu
                    if (payTypeListCard) {
                        //显示信用卡安全说明

                        if ((extendParamsStore.getAttr('haveCD') || '')) {
                            self.els.safe_intro.show();
                        }

                        //初始化曾用卡
                        if (cardlist.length > 0 && (finalPayWay == 1 || finalPayWay == -1)) {
                            //如果新卡有上一次支付方式，则不判断isOnlyOneNewCard
                            var cardAction = isOnlyOneNewCard ? 1 : 2;
                            if (selectBankStore.get() && selectBankStore.get().status & 128) { //Edit by sqsun 20141023 对象做容错降级处理
                                if (selectBankStore.get().status & 1) {
                                    cardAction = 2;
                                } else {
                                    cardAction = 1;
                                }
                            }
                            self.getisexpired(selectBankStore.get());
                            //显示必填项 policy type 2 为曾用卡
                            self.showpolicy(selectBankStore.get(), cardAction);
                        }
                    }

                    callback && callback();
                };

                //console.time("testtime")
                paymentPipe.getpaymentway(_param, _callback, headstring, function (err) {
                    self.hideLoading();
                    /*@zh.xu 支付方式请求，error回调，隐藏loading； 且如果订单store的pback存在情况下，跳转*/
                    self.showToast("网络不给力，请稍候重试");
                    setTimeout(function () {
                        self.goBack();
                    }, 2 * 1000);
                });
                //_callback();
            },

            //判断是否存在上次支付方式 item 101返回结果
            isHasLastPayWay: function (item) {
                item = item || {}; //Add by sqsun 20141023 数据做容错处理
                var self = this;
                var paytype = item.paytype;
                var isSupportWeixin = 0;
                //判断银行卡是否存在上次支付方式
                if (paytype && (paytype & 2)) {
                    var cardlist = item.cards || [];
                    var card = null;
                    for (var i = 0; i < cardlist.length; i++) {
                        if (cardlist[i].status & 128) {
                            card = cardlist[i];
                            //如果是新卡，设置新卡标识
                            if (!(card.status & 1)) {
                                card.isnewcard = true;
                                //20141021 jianggd@Ctrip.com 
                                //将值存在localstore里
                                extendParamsStore.setAttr('policytypeControl', 1);
                                policytypeControl = extendParamsStore.getAttr('policytypeControl');
                            }
                            break;
                        }
                    }
                    if (card) {
                        //页面展示
                        selectBankStore.set(card);
                        //保存上一次切换的卡，用于判断是否切换银行卡了，没有切换不重新渲染policy
                        oldCardStore.set(selectBankStore.get());
                        return 1;
                    }
                }

                //判断第三方是否存在上次支付方式
                if (paytype && (paytype & 4)) {
                    var thirdpaylist = item.thirdpartylist || [];
                    var thirdpay = null;
                    for (var i = 0; i < thirdpaylist.length; i++) {

                        //thirdstatus支持位运算
                        if (thirdpaylist[i].thirdstatus & 1) {
                            thirdpay = thirdpaylist[i];
                            break;
                        }
                    }
                    if (thirdpay) {
                        selectBankStore.set(thirdpay);
                        if (thirdpay.paymentwayid == "EB_MobileAlipay" || thirdpay.paymentwayid == "OGP_Alipay") {
                            return 3;
                        } else if (thirdpay.paymentwayid == "WechatScanCode") {

                            //如果不在微信公众环境下不显示上一次微信支付 for h5
                            if (!Util.isInApp()) {
                                if (!Util.isInWeichat()) {
                                    selectBankStore.remove();
                                    return -100;
                                }
                            } else {
                                //修改数字键盘问题  slh
                                var ugSystemVer = Util.getSystemVer();
                                //ios hybird android不检查 weixin app是否安装
                                if (ugSystemVer.platform == 3) {
                                    //检查手机是否安装微信
                                    Guider.pay.checkStatus({
                                        callback: function (result) {
                                            //result.weixinPay为true表示安装了微信，否则不显示
                                            //未装weixin app 忽略上一次支付方式
                                            if (!result.weixinPay) {
                                                selectBankStore.remove();
                                                isSupportWeixin = 1;
                                            }
                                        }
                                    });
                                }
                            }
                            //如果不支持微信返回空
                            if (isSupportWeixin) {
                                return -100;
                            } else {
                                return 2;
                            }
                        }
                    }
                }

                //判断现金是否存在上次支付方式
                if (paytype && (paytype & 16)) {
                    var cashinfolist = item.cashinfolist || [];
                    var cashinfo = null;
                    for (var i = 0; i < cashinfolist.length; i++) {
                        //cashstatus支持位运算
                        if (cashinfolist[i].cashstatus & 1) {
                            cashinfo = cashinfolist[i];
                            break;
                        }
                    }
                    if (cashinfo) {
                        //页面展示
                        selectBankStore.set(cashinfo);
                        return 4;
                    }
                }
                return 0;
            },


            transNumToFixedStr: function (num) {
                var self = this;
                var currency = (orderDetailStore.getAttr('currency') || '￥');
                if (currency == 'CNY') {
                    currency = '￥';
                }
                var temparray = Util.transNumToFixedArray(num);
                if (typeof temparray == 'string') {
                    return temparray;
                } else if (temparray && temparray.length > 1) {
                    return currency + temparray.join('.');
                } else {
                    return '';
                }
            },


            //区分支付方式 根据当前支付方式判断
            distingPayWay: function () {
                var self = this;
                var bankStore = selectBankStore.get();
                //银行卡支付
                if (bankStore && bankStore.category) {
                    //跳转银行卡支付
                    this.submitpay();
                    return;
                }
                //第三方支付
                if (bankStore && (typeof bankStore.thirdstatus != 'undefined') && bankStore.thirdstatus != null) {
                    //支付宝支付重置跳转wap的指示
                    AliReStore.setAttr("requestid", orderDetailStore.getAttr("requestid"));
                    ToAliFlagStore.setAttr("jump_ali", 1);
                    //一下代码仅适用于H5
                    if (!Util.isInApp()) {
                        window.onpageshow = function () {
                            //Edit sqsun 20141009
                            Business.jumpDetailFn.call(self);
                        };
                    }
                    //微信支付
                    if (bankStore.paymentwayid == 'WechatScanCode') {
                        Business.showPromptMask.call(self, 2, function () {
                            Business.jumpToWeiXinpay.call(this);
                        })

                        return;
                    } else {
                        //支付宝支付
                        Business.showPromptMask.call(self, 1, function () {
                            Business.toAlipayBefore.call(this);
                        })

                        return;
                    }
                }

                //现金支付
                if (bankStore && (typeof bankStore.cashstatus != 'undefined') && bankStore.cashstatus != null) {
                    Business.toCashPayFn.call(self);
                    return;
                }
            },
            //银行卡支付
            submitpay: function () {
                var self = this;
                var orderdetail = orderDetailStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
                var paylist = payMentStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
                var card = selectBankStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
                var extParamsObj = extendParamsStore && extendParamsStore.get() || {}; //扩展store //Edit by sqsun 20141023 数据做容错处理
                var expireDate = '';  //卡有效期
                //用户填写信息的判断 
                var userinfo = self.getUserInput();

                this.vali.validate(function () {

                    var _isCheckPolicy = self.vali.getErrResult();
                    self.showLoading();
                    console.log(_isCheckPolicy)
                    if (_isCheckPolicy) {
                        if (self.els.bankPeriod && self.els.bankPeriod.length > 0) {
                            expireDate = self.els.bankPeriod.val();
                            var yyStr = expireDate.substring(2, 4);
                            var mmStr = expireDate.substring(0, 2);
                            expireDate = '20' + yyStr + mmStr + '01';
                            expireDate = cDate.parse(expireDate).format('Y/m/d H:i:s');
                        } else {
                            expireDate = card && card.expire;
                        }
                        if (!(expireDate && expireDate.length >= 4)) {
                            expireDate = "0001/01/01 00:00:00";
                        }

                        //验证有效期和BU的有效期比对是否过期(信用卡且担保情景下判定)
                        //如果需要填写有效期字段，不走下列逻辑
                        if (self.els.bankPeriod && self.els.bankPeriod.length < 1) {
                            if (card.category != 3 && Business.getPayMeth() == 2) {
                                //有效期大于当前月+1
                                if (!Business.isAfterCurDate(card.expire)) {
                                    self.showToast("此卡即将过期，请填写新的卡信息");
                                    self.hideLoading();
                                    return;
                                }
                                //有效期大于业务制定时间
                                if (!Business.isBeforeGuranteeDay(card.expire)) {
                                    self.showToast("此卡即将过期，请填写新的卡信息");
                                    self.hideLoading();
                                    return;
                                }
                            }
                        }

                        var _param = {
                            "opttype": 1,
                            "paytype": 2,
                            "cardinfo": {
                                "opttype": "5",
                                "cardamount": orderdetail.amount
                            }
                        }

                        //过期需更新卡片action update 
                        if (card.status & 32) {
                            //20141021 jianggd@Ctrip.com 
                            //将值存在localstore里
                            extendParamsStore.setAttr('policytypeControl', 3);
                            policytypeControl = extendParamsStore.getAttr('policytypeControl');
                        }

                        if (userinfo.prephone && userinfo.prephone.indexOf("****") > -1) {
                            var _mobile = card.mobile;
                        } else {
                            var _mobile = userinfo.prephone;
                        }

                        //检查不同卡操作，区分add, check, update  字段参照契约
                        if (policytypeControl == 1) {
                            //opttype 新增为1
                            _param.cardinfo.opttype = "1";
                            _param.cardinfo.addinfo = {
                                "cardno": userinfo.bankNum,
                                "cvv2": userinfo.cvv,
                                "expire": expireDate,
                                "holder": userinfo.userName,
                                "idcardtype": userinfo.cardType,
                                "idcardno": userinfo.idNum,
                                "islast4": self.$el.find('#saveCrtInfo').hasClass("checked"),
                                "mobile": _mobile,
                                "refid": self.refidCode ? self.refidCode : "",
                                "vcode": userinfo.check_code
                            };
                        } else if (policytypeControl == 2) {
                            //opttype check 为5
                            _param.cardinfo.checkinfo = {
                                "cvv2": userinfo.cvv,
                                "expire": expireDate,
                                "mobile": _mobile,
                                //"refid": "-1",
                                "refid": self.refidCode ? self.refidCode : "",
                                "vcode": userinfo.check_code,
                                "islast4": false,
                                "cardno": userinfo.bankNum,
                                "holder": userinfo.userName,
                                "idcardtype": userinfo.cardType,
                                "idcardno": userinfo.idNum
                            };
                        } else if (policytypeControl == 3) {
                            //opttype update 为4
                            _param.cardinfo.opttype = "4";
                            _param.cardinfo.updateinfo = {
                                "cvv2": userinfo.cvv,
                                "expire": expireDate,
                                "mobile": _mobile,
                                //"refid": "-1",
                                "refid": self.refidCode ? self.refidCode : "",
                                "vcode": userinfo.check_code,
                                "islast4": false,
                                "cardno": userinfo.bankNum,
                                "holder": userinfo.userName,
                                "idcardtype": userinfo.cardType,
                                "idcardno": userinfo.idNum
                            };
                        }

                        //限卡支付
                        _param.payrestrict = extParamsObj["payrestrict"];

                        var sback_url = decodeURIComponent(orderdetail.sback);
                        var eback_url = decodeURIComponent(orderdetail.eback);
                        var _callback = function (item) {
                            if (Util.isInApp()) {
                                //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
                                if (item.resultBody) {
                                    item = JSON.parse(item.resultBody);
                                } else {
                                    //错误的时候，弹出网络不给力提示  
                                    self.hideLoading();
                                    //提示具体的管道错误信息
                                    self.showToast(item.errorInformation || "网络不给力,请稍候重试");
                                    //self.showToast("网络不给力,请稍候重试");
                                    return;
                                }
                            }

                            if (!Business.lipinCardExcuteCallback.call(null, item)) { //判断礼品卡实际支付和余额是否匹配，如不匹配则跳转至首页
                                //保存钱包金额异常状态，重新101拉取最新礼品卡金额
                                tktErrorStore.setAttr("tktUsed", 1);
                                var MyAlert = new c.ui.Alert({
                                    title: '提示信息',
                                    message: '支付失败，请重新尝试',
                                    buttons: [
                                    {
                                        text: '确定',
                                        click: function () {
                                            this.hide();
                                            window.location.reload();   //刷新页面
                                        },
                                        type: c.ui.Alert.STYLE_CONFIRM
                                    }
                                ]
                                });
                                MyAlert.show();
                                self.alertArr.push(MyAlert);
                                return; //屏蔽其他msg跳出
                            }

                            //设置单号
                            //billl
                            Business.setTempOid(item);

                            //保存bilno唯一订单号
                            if (item.bilno) {
                                orderDetailStore.setAttr("bilno", item.bilno);
                            }

                            //系统错误，直接抛出网络不给力,请稍候重试
                            if (typeof item.res != 'undefined' && item.res) {
                                self.hideLoading();
                                self.showToast("网络不给力,请稍候重试");
                                return;
                            }

                            if (item.rc == 0) {
                                if (Util.isInApp()) {
                                    //jump2AppSuccessPage 第一个参数为true时 跳转sback成功页面
                                    Business.jump2AppPage(true, item, sback_url);
                                } else {
                                    Business.jump2H5Page(true, item, sback_url);
                                }
                            } else if (item.rc < 100) {
                                //重复提交订单处理逻辑
                                if (item.rc == 4) {
                                    var MyAlert = new c.ui.Alert({
                                        title: '提示信息',
                                        message: item.rmsg || "网络不给力,请稍候重试",
                                        buttons: [
                                        {
                                            text: '好的',
                                            click: function () {
                                                if (Util.isInApp()) {
                                                    MyAlert.hide();
                                                    //jump2AppSuccessPage 第一个参数为true时 跳转sback成功页面
                                                    Business.jump2AppPage(true, item, sback_url);
                                                } else {
                                                    this.hide();
                                                    Business.jump2H5Page(true, item, sback_url);
                                                }
                                            },
                                            type: c.ui.Alert.STYLE_CONFIRM
                                        }
                                    ]
                                    });
                                    MyAlert.show();
                                    self.alertArr.push(MyAlert);
                                } else if (item.rc == 6) {
                                    var MyAlert = new c.ui.Alert({
                                        title: '提示信息',
                                        message: '常用卡已失效，请重新填写卡信息进行支付',
                                        buttons: [
                                        {
                                            text: "好的",
                                            click: function () {
                                                //常用卡删除
                                                var _oldcards = _.filter(oldCardsStore.get(), function (_card) {
                                                    return card.typeid != _card.typeid;
                                                });
                                                oldCardsStore.set(_oldcards);
                                                self.els.paywaylist_ul.html("");
                                                var _cardAction = 1;
                                                //20141021 jianggd@Ctrip.com 
                                                //将值存在localstore里
                                                extendParamsStore.setAttr('policytypeControl', 1);
                                                policytypeControl = extendParamsStore.getAttr('policytypeControl');
                                                self.hideLoading();
                                                self.els.lastFCode.html("");
                                                card.isnewcard = true;
                                                //删除常用卡卡号
                                                card.cardnumfl = "";
                                                self.showpolicy(card, _cardAction);
                                                //添加当前新卡到selectBankStore
                                                selectBankStore.set(card);
                                                self.showNewCard();
                                                MyAlert.hide();
                                            },
                                            type: c.ui.Alert.STYLE_CONFIRM
                                        }
                                        ]
                                    });
                                    MyAlert.show();
                                    self.alertArr.push(MyAlert);
                                } else if (item.rc == 7) {
                                    var MyAlert = new c.ui.Alert({
                                        title: '提示信息',
                                        message: item.rmsg || "网络不给力,请稍候重试",
                                        buttons: [
                                        {
                                            text: "确定",
                                            click: function () {
                                                this.hide();
                                                //清空已经过风控标记
                                                payMentStore.setAttr("verifiedPhone", null);
                                                self.PostCheck();
                                            },
                                            type: c.ui.Alert.STYLE_CONFIRM
                                        }
                                        ]
                                    });
                                    MyAlert.show();
                                    self.alertArr.push(MyAlert);
                                } else if (item.rc == 8) {
                                    //实时支付已成功，重复提交
                                    var MyAlert = new c.ui.Alert({
                                        title: '提示信息',
                                        message: item.rmsg || "网络不给力,请稍候重试",
                                        buttons: [
                                        {
                                            text: '好的',
                                            click: function () {
                                                this.hide();
                                                if (Util.isInApp()) {
                                                    //jump2AppSuccessPage 第一个参数为true时 跳转sback成功页面
                                                    Business.jump2AppPage(true, item, sback_url);
                                                } else {
                                                    Business.jump2H5Page(true, item, sback_url);
                                                }
                                            },
                                            type: c.ui.Alert.STYLE_CONFIRM
                                        }
                                        ]
                                    });
                                    MyAlert.show();
                                    self.alertArr.push(MyAlert);
                                } else if (item.rc == 9) {
                                    //指纹支付验证失败,isTouchId设置为0不提交指纹参数
                                    self.showToast(item.rmsg || "网络不给力,请稍候重试");
                                    paymentcard.setAttr('isTouchId', 0);
                                    //清空已混付礼品卡
                                    //to do list....
                                    paymentcard.setAttr("orderid", -1);
                                    paymentcard.setAttr("cardInfo", {});
                                } else if (item.rc == 10) {//信用卡风控验证失效 sq_xu
                                    var MyAlert = new c.ui.Alert({
                                        title: '提示信息',
                                        message: item.rmsg || "网络不给力,请稍候重试",
                                        buttons: [
                                            {
                                                text: "确定",
                                                click: function () {
                                                    this.hide();
                                                    extendParamsStore.setAttr('isVerifyMobile', 1);
                                                    isVerifyMobile = extendParamsStore.getAttr('isVerifyMobile');
                                                    payMentStore.setAttr("verifiedPhone", null); //清空已经过风控标记 sq_xu
                                                    self.UnionPayStatusCheck(); //请求1801开银联通道 验证风控 sq_xu
                                                },
                                                type: c.ui.Alert.STYLE_CONFIRM
                                            }
                                        ]
                                    });
                                    MyAlert.show();
                                    self.alertArr.push(MyAlert);
                                }
                                else {
                                    //支付错误跳转页面
                                    self.hideLoading();
                                    self.showToast(item.rmsg || "网络不给力,请稍候重试");
                                }
                            } else {
                                if (Util.isInApp()) {
                                    //jump2AppSuccessPage 第一个参数为false时 跳转eback支付失败页面
                                    Business.jump2AppPage(false, item, eback_url);
                                } else {
                                    Business.jump2H5Page(false, item, eback_url);
                                }
                            }
                        }
                        var header = Business.getRequestHeader();
                        var headstring = JSON.stringify(header);
                        if (self.validate(card)) {
                            //所选卡需要手机验证码验证 sq_xu
                            if (card.status & 256) {
                                //20141021 jianggd@Ctrip.com
                                //将值存在localstore里
                                extendParamsStore.setAttr('isVerifyMobile', 1);
                                isVerifyMobile = extendParamsStore.getAttr('isVerifyMobile');
                            } else {
                                extendParamsStore.setAttr('isVerifyMobile', 0);
                                isVerifyMobile = extendParamsStore.getAttr('isVerifyMobile');
                            }
                            var verifiedPhone = payMentStore.getAttr('verifiedPhone');
                            //第一次验证手机， 需验证手机的情况下 走风控验证 sq_xu
                            //所选卡为信用卡且该信用卡(客户端不用强制判断当前支付方式为信用卡还是储蓄卡，服务端会进行判断后通过)
                            if (paymentcard.getAttr('orderid') == -1) {//信用卡全额付
                                if (isVerifyMobile) {
                                    var cardno = card.isnewcard ? self.els.banknum.val().replace(/\s/g, "") : card.cardinfoid;
                                    if (cardno != payMentStore.getAttr("verifiedCardNo")) {//现在选中的卡跟上次风控的信用卡是否同一个 sq_xu
                                        self.UnionPayStatusCheck();
                                        return;
                                    }
                                }
                            }
                            if (!verifiedPhone && isVerifyMobile) {
                                // self.PostCheck();
                                self.UnionPayStatusCheck(); //TODO 开通银联
                                return;
                            }
                            //实时支付
                            if (extParamsObj.isRealTimePay) {
                                _param.opadbitmp = 4;
                                paymentPipe.payV3(_param, _callback, headstring, function () {
                                    self.hideLoading();
                                    self.showToast("网络不给力,请稍候重试");
                                });
                            } else {
                                paymentPipe.pay(_param, _callback, headstring, function () {
                                    self.hideLoading();
                                    self.showToast("网络不给力,请稍候重试");
                                });
                            }

                        } else {
                            self.hideLoading();
                        }
                    }
                });
            },

            getUserInput: function () {
                var userinfo = {
                    bankNum: "",
                    bankPeriod: "",
                    cvv: "",
                    userName: "",
                    cardType: "",
                    idNum: "",
                    prephone: "",
                    check_code: ""
                };
                if (this.els.banknum) {
                    if (this.els.banknum && this.els.banknum.val()) {
                        userinfo.bankNum = this.els.banknum.val().replace(/\s/g, "");
                    }
                }
                if (this.els.bankPeriod) {
                    userinfo.bankPeriod = this.els.bankPeriod.val();
                }
                if (this.els.cvv) {
                    userinfo.cvv = this.els.cvv.val();
                }
                if (this.els.userName) {
                    userinfo.userName = this.els.userName.val();
                }
                if (this.els.cardType) {
                    userinfo.cardType = this.els.cardType.attr("data-value");
                }
                if (this.els.idNum) {
                    userinfo.idNum = this.els.idNum.val();
                }
                if (this.els.prephone) {
                    userinfo.prephone = this.els.prephone.val();
                }
                if (this.els.check_code) {
                    userinfo.check_code = this.els.check_code.val();
                }
                return userinfo;
            },

            validate: function (card) {
                //@守强，ppolicy判断逻辑放这
                return true;
            },

            /**
             * show_safeintro.
             * @constructor
             */
            show_safeintro: function () {
                this.forwardUnCache("paytips?pathid=tips_1&from=index");
            },

            /**
             * changephonefn.
             * @constructor
             */
            changephonefn: function () {
                var self = this;
                var card = selectBankStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
                var headobj = Business.getRequestHeader();
                var header = JSON.stringify(headobj);

                if (!MyAlertPhoneFn) {
                    var MyAlertPhoneFn = new c.ui.Alert({
                        title: '更新预留手机号',
                        showTitle: true,
                        message: '若您在银行修改了此卡的预留手机，请更新。</br><input class="aside-mobile-input" placeholder="请输入新预留手机号" type="text" id="c_payment_index_newphone" maxLength="11" />',
                        buttons: [
                        {
                            text: '取消',
                            click: function () {
                                self.hideLoading();
                                this.hide();
                            },
                            type: c.ui.Alert.STYLE_CANCEL
                        },
                        {
                            text: '确定',
                            click: function () {
                                //优化代码 lh_sun
                                var $newphone = $('#c_payment_index_newphone');
                                var card = selectBankStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
                                var val = ($newphone.val() || '').trim();
                                if (!val) {
                                    return;
                                } else if (val.length < 11) {
                                    self.showToast("请填写正确的手机号码");
                                    return;
                                }
                                if (card.category < 3) {
                                    this.hide();
                                    self.els.prephone.val(val);
                                    self.els.iPrePhone.html(val);
                                    orderDetailStore.setAttr("mobile", val);
                                } else {
                                    var _param = {
                                        "category": card.category,
                                        "cardinfoid": card.cardinfoid,
                                        "mobphone": val,
                                        "typid": card.typeid,
                                        "ver": 0
                                    }
                                    self.showLoading();
                                    var that = this;
                                    var _callback = function (item) {
                                        self.hideLoading();
                                        if (Util.isInApp()) {
                                            //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
                                            if (item.resultBody) {
                                                item = JSON.parse(item.resultBody);
                                            } else {
                                                //错误的时候，弹出网络不给力提示  
                                                self.hideLoading();
                                                //提示具体的管道错误信息
                                                self.showToast(item.errorInformation || "网络不给力,请稍候重试");
                                                //self.showToast("网络不给力,请稍候重试");
                                                return;
                                            }
                                        }
                                        if (item.rc == 0) {
                                            self.els.prephone.val(val);
                                            self.els.iPrePhone.html(val);
                                            orderDetailStore.setAttr("mobile", val);
                                            that.hide();
                                        }
                                        else {
                                            self.showToast(item.rsmsg || "您输入的号码与银行预留手机号不符，请重新输入");
                                        }

                                    }
                                    var errback = function (e) {
                                        self.hideLoading();
                                        self.showToast("网络不给力,请稍候重试");
                                    }
                                    paymentPipe.updateprephone(_param, _callback, header, errback, true);
                                }
                                self.els.CountDownClock.hide();
                                if (self.Vgetcode) {
                                    self.els.getCode.show();
                                }
                            },
                            type: c.ui.Alert.STYLE_CONFIRM
                        }
                    ]
                    });
                } else {
                    //清空myAlert的值
                    $('#c_payment_index_newphone').val("");
                }

                MyAlertPhoneFn.show();
                self.alertArr.push(MyAlertPhoneFn);
            },
            //过滤卡paymentType
            filtePaymentType: function () {
                if (payMentStore.get()) {
                    //status不要2和3，category只要1和2
                    return _.filter(payMentStore.get().cards, function (card) {
                        return (card.status != 2 || card.status != 3) && (card.category == 1 || card.category == 2)
                    });
                }
            },
            /**
            * @author sqsun@ctrip.com
            * @description 信用卡即将过期,更新必填字段
            */
            updateCardInfo: function (e) {
                var _ele = selectBankStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
                this.periodEndingHide();
                //即将过期 policytype 为 3 update
                //20141021 jianggd@Ctrip.com 
                //将值存在localstore里
                extendParamsStore.setAttr('policytypeControl', 3);
                policytypeControl = extendParamsStore.getAttr('policytypeControl');
                this.showpolicy(_ele, 3);
                this.els.police_lists.find("input").eq(0).focus();

            },
            /**
            * @author sqsun@ctrip.com
            * @description 切换证件类型到场景
            */
            showCardTypeLayer: function () {
                this.vali && this.vali.rules && this.vali.rules.showCardType();
            },
            /**
            * @author sqsun@ctrip.com
            * @description 绑定卡有效期input事件
            */
            inputPeriod: function (e) {
                this.vali && this.vali.rules && this.vali.rules.getDatePeriod(this.els.bankPeriod);
            },
            /**
            * @author sqsun@ctrip.com
            * @description 跳转到选择支付方式场景
            */
            selectPayment: function () {
                this.forward("selectpayment")
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
            setBankCardIcon: function () {
                var _catogary = "", zlcard, bankicon, card = selectBankStore.get() || {}, _typename = card.typename; //Edit by sqsun 20141023 数据做容错处理

                if (card.category == 3) {
                    _catogary = "储蓄卡";
                } else {
                    _catogary = "信用卡";
                }

                this.els.cseltxt.html("<div class='font17 fl'>" + _typename + "</div>" + "<span class='payicon_tips2 fl'>" + _catogary + "</span>");
                //显示卡号前4位需加空格
                if (card.cardnumfl && !card.isnewcard) {
                    this.els.lastFCode.text(card.cardnumfl.substr(0, 4) + " " + card.cardnumfl.substr(4, card.cardnumfl.length - 1));
                }

                zlcard = IndexBankList.getBankCardType(card);
                if (zlcard) {
                    bankicon = Bankmap.getBankClass(zlcard) || "bank_index";
                    this.els.c_payment_index_bankIcon.attr("class", bankicon);
                }
            },
            getPolicyCounts: function (policy) {
                var _policyList = [1, 2, 4, 8, 16, 32, 64, 128], _count = 0, _card = selectBankStore.get(), _len = _card.cardnum && _card.isnewcard ? _policyList.length - 1 : _policyList.length;
                for (var i = 0; i < _len; i++) {
                    if (policy & _policyList[i]) {
                        _count++;
                    }
                }
                return _count;
            },
            isOldCard: function () {
                if (oldCardStore.get() && selectBankStore.get()) {
                    //新卡判断cardnum是否一致
                    if (selectBankStore.get().isnewcard) {
                        if (oldCardStore.get().typeid == selectBankStore.get().typeid && oldCardStore.get().cardnum == selectBankStore.get().cardnum) {
                            return 1;
                        } else {
                            return 0;
                        }
                        //常用卡判断cardnumfl是否一致 1.看typeid是否相同，2.下发前6后2是否相同 3.是否都是常用卡
                    } else {
                        if (oldCardStore.get().typeid == selectBankStore.get().typeid && oldCardStore.get().cardnumfl == selectBankStore.get().cardnumfl && oldCardStore.get().isnewcard == selectBankStore.get().isnewcard) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                } else {
                    return 0;
                }
            },

            //曾用卡有预留手机号，点击手机号弹出更换号码BOX
            changephone: function (e) {
                var _prephone = this.els.li_prePhone.find("#i_prePhone").text();
                if (_prephone.length > 1) {
                    this.changephonefn()
                } else {
                    var $this = $(e.currentTarget);
                    var $input = $this.find(".listinput");
                    if ($input && $input.focus) {
                        $input.focus();
                    }
                }
            },
            //判断是否是新显示逻辑
            showNewCard: function () {
                var self = this;
                self.els.c_payment_index_snList_content.addClass('bor_b_blue');
                if (orderDetailStore.getAttr("isload") == 1) {
                    //this.els.cardDesc.html(cardDescText);
                    self.els.savecardbox.show();
                    self.$el.find('#saveCrtInfo').addClass("checked");
                }
                else {
                    self.els.savecardbox.hide();
                    self.$el.find('#saveCrtInfo').removeClass("checked");
                }
            },
            getWeiXinContent: function () {
                //微信返现的文本
                var weixinInfo = getWeiXinInfo(payMentStore.getAttr("dsettings")),
                    _weixinHtml = this.els.c_payment_index_weixinContent.html();

                var weixinHtml = "";
                //截取微信文案取前4个文字
                if (_weixinHtml.length > 3) {
                    weixinHtml = _weixinHtml.substring(0, 4);
                }
                //是否显示微信返现
                var isDisplayWXFX = !_.isEmpty(weixinInfo) && weixinInfo["5"] && weixinInfo["6"];
                //有促销文案更新微信支付文案
                if (isDisplayWXFX) {
                    weixinInfo["5"] = _.escape(weixinInfo["5"].substring(0, 6));
                    weixinInfo["6"] = _.escape(weixinInfo["6"].substring(0, 12));

                    this.els.c_payment_index_weixinContent.html(weixinHtml + '<em class="payicon_tips c_payment_index_weixin_title">' + weixinInfo["5"] + '</em><p class="corange c_payment_index_weixin_content">' + weixinInfo["6"] + '</p>');
                }

                function getWeiXinInfo(desettings) {
                    var ret = {};
                    var i = 0, len = desettings.length, item = null;
                    for (; i < len; i++) {
                        item = desettings[i];
                        if (item.type == 5 || item.type == 6) {
                            ret[item.type] = item.value || '';
                        }
                    }
                    return ret;
                }
            },

            /**
            * Author sqsun
            * 验证是全额支付，还是混付
            **/
            PostCheck: function () {
                var self = this;
                Business.CheckPhoneNum.call(this, function (phonenum) {
                    if (phonenum) {
                        //1501必须下发手机号才走风控验证
                        payMentStore.setAttr("isGetPassWordfrom1501", 1);
                        payMentStore.setAttr("verifyMobile", phonenum);
                        payMentStore.setAttr("seniortype", 1); //礼品卡风控 sq_xu
                        Business.VerifyPhone.call(self, "index");
                    } else {
                        payMentStore.setAttr("isGetPassWordfrom1501", 0);
                        self.distingPayWay();
                    }
                })
            },

            /*
            *  1801开通银联通道， 判断手机号是否与银联预留手机号相同 sq_xu
            */
            UnionPayStatusCheck: function () {
                var self = this;
                var bankStore = selectBankStore.get() || {};
                var orderinfo = orderDetailStore.get() || {};
                //用户填写信息的判断
                var userinfo = self.getUserInput();
                var cardinfo = {};
                var seniortype = 1,
                    expireDate = "0001/01/01 00:00:00";

                //有效期
                if (self.els.bankPeriod && self.els.bankPeriod.length > 0) {
                    expireDate = self.els.bankPeriod.val();
                    var yyStr = expireDate.substring(2, 4);
                    var mmStr = expireDate.substring(0, 2);
                    expireDate = '20' + yyStr + mmStr + '01';
                    expireDate = cDate.parse(expireDate).format('Y/m/d H:i:s');
                } else {
                    expireDate = bankStore && bankStore.expire;
                }
                if (!(expireDate && expireDate.length >= 4)) {
                    expireDate = "0001/01/01 00:00:00";
                }
                var _mobile;
                if (userinfo.prephone && userinfo.prephone.indexOf("****") > -1) {
                    _mobile = bankStore.mobile;
                } else {
                    _mobile = userinfo.prephone;
                }
                if (bankStore.isnewcard) {//新增卡
                    var cardno = self.els.banknum.val().replace(/\s/g, "");
                    cardinfo = {
                        "cardno": cardno, //卡号(新增卡) N
                        "cvv2": userinfo.cvv, //CVV Y
                        "expire": expireDate, //有效期 Y
                        "mobile": _mobile //银行预留手机号 Y
                    };
                    payMentStore.setAttr("verifyingCardNo", cardno); //设置将要验证风控的卡号sq_xu
                    seniortype = 1;
                } else {//常用卡
                    cardinfo = {
                        "cardinfoid": bankStore.cardinfoid, //曾用卡的CardInfoID N
                        "cvv2": userinfo.cvv, //CVV Y
                        "expire": expireDate, //有效期 Y
                        "mobile": _mobile //银行预留手机号 Y
                    };

                    payMentStore.setAttr("verifyingCardNo", bankStore.cardinfoid); //设置将要验证风控的卡号sq_xu
                    seniortype = 2;
                }
                var dataParam = {
                    "oid": orderinfo.oid, //契约新增参数 oid sq_xu
                    "category": bankStore.category, //契约新增参数 1 = CCD = 直连信用卡 2 = CCY = 银联非标准信用卡 3 = DC = 银联储蓄卡
                    "seniortype": seniortype, //1=新增卡开通银联  2=常用卡开通银联
                    "actcard": cardinfo  //开通卡信息
                };

                var _callback = function (_data) {
                    var data = {};
                    if (!Util.isInApp()) { //in h5
                        data = _data;
                    } else { //in hybrid
                        //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
                        if (_data.resultBody) {
                            data = JSON.parse(_data.resultBody);
                        } else {
                            //错误的时候，弹出网络不给力提示
                            self.hideLoading();
                            //提示具体的管道错误信息
                            self.showToast(_data.errorInformation || "网络不给力,请稍候重试");
                            return;
                        }
                    }
                    self.hideLoading();
                    if (data.result == 0) {//开通银联成功
                        payMentStore.setAttr("creditVerifyMobile", _mobile); //信用卡手机号
                        payMentStore.setAttr("isGetPassWordfrom1801", 1); //1801开通银联成功，记录风控验证标记  防止客户端认为绕过风控
                        payMentStore.setAttr("seniortype", 2); //信用卡风控
                        Business.VerifyPhone.call(self, "index"); //TODO 进验证手机页 验证手机号码 传手机号
                    } else if (data.result == 1) {//开通银联失败
                        payMentStore.setAttr("isGetPassWordfrom1801", 0);
                        self.showToast(data.resultmesg || "网络不给力,请稍候重试");
                    }
                };

                self.showLoading();
                var header = Business.getRequestHeader();
                paymentPipe.verifyUnionPayStatus(dataParam, _callback, JSON.stringify(header), function (error) { //error
                    self.hideLoading();
                    self.showToast(error.msg);
                });
            }
        });
        return View;
    });