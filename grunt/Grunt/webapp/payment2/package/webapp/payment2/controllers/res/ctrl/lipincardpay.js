define(['libs', 'c', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', 'lipincardpay_html', 'cUtility', 'cWidgetFactory', 'paymentPipe', 'cUIInputClear', 'cUtilityCrypt', 'cUICore', 'Business', 'Util', 'cHybridFacade'/*, 'cHybridShell'*/],
function (libs, c, commonStore, payStore, payModel, basePageView, html, cUtility, widgetFactory, paymentPipe, cUIInputClear, Crypt, cui, Business, util, Facade/*, cHybridShell*/) {

    var cardInfo = {
        hassubmit: false
    };
    var isVerifyMobile = 0; //是否需要手机风控验证
    var Guider = widgetFactory.create('Guider');
    var isTouchId = 0, //判断是否支持指纹验证 [1支持，0不支持] Add By sqsun 20141002
        openTouchId = 0, // 判断是否开通指纹支付 [1支持，0不支持] Add By jianggd 20141024
        isSupportTouchId = 0, //判断设备是否支持指纹验证 [1支持，0不支持] Add By jianggd 20141024
        phonenum, //风控手机号码
        deviceInfo = "",
        wifi_mac = "",
        imei = "",
        vendorid = "",
        RSAToken = "",
        secretKeyGUID = "",
        deviceGUID = "",
        paytoken = "",
        isInput; //判断用户是否选择输入密码IOS 1为输入密码
    var isTouching = false;

    var View = basePageView.extend({
        pageid: '232006',
        hpageid: '232006',
        cardpay: payStore.PaymentWayStore.getInstance(),
        orderpay: payStore.OrderDetailStore.getInstance(),
        paymentcard: payStore.PayMentCardParamStore.getInstance(),
        touchPayStore: payStore.touchPayStore.getInstance(),
        extendParamsStore: payStore.ExtendInfoStore.getInstance(), //扩展参数
        tktErrorStore: payStore.tktErrorStore.getInstance(),   //保存礼品卡金额异常状态store
        alertArr: [],
        tpl: html,
        isSetPassWord: false,
        totalAmount: 0,

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
            var self = this;
            //self.injectHeaderView();
            self.render();
        },
        render: function () {
            this.$el.html(this.tpl);
            this.els = {
                c_payment_index_amount: this.$el.find('#c_payment_index_amount'),
                c_lpk_password_set: this.$el.find('#c_lpk_password_set'),
                c_lpk_password_forget: this.$el.find('#c_lpk_password_forget'),
                cardlist: this.$el.find('#artic_list'),
                se_textDetail: this.$el.find('#se_textDetail'),
                numinput: this.$el.find("#c_payment_numinput")
            };
            this.cardlisttpl = _.template(this.$el.find('#cardlist').html());
        },
        events: {
            // pay事件替换为TouchPay判断事件 Edit By sqsun 20141002
            "click #useBtn": 'TouchPay',
            "click #payBtn": 'TouchPay',
            "click #confirmBtn": 'TouchPay',
            "click [target='li-target']": 'changecard',
            //"click .checkbox-input-c": 'changecard',
            "click .catxt": 'goto'//去设置支付密码
        },
        onShow: function () {
            this.setTitle('携程钱包支付');
        },
        onLoad: function () {
            var self = this;
            isTouching = false;
            //验证手机风控成功后返回时执行301提交
            if (self.cardpay.getAttr("autoPay")) {
                //展示延迟加载图标 避免从风控页返回后 提交301接口时 页面无响应的现象
                isVerifyMobile = 0;
                self.showLoading();
                self.PostCheck(cardInfo.isPay);
                self.cardpay.setAttr("autoPay", 0);
                //
                self.cardpay.setAttr("cancelWindControl", 0);
            } else {
                //self.hybridBridgeRender();
                self.showView();
            }

            //验证密码成功后无缝对接上次逻辑操作
            if (self.cardpay.getAttr("checkpwd")) {
                var checkJson = self.cardpay.getAttr("checkJson");
                self.cardpay.setAttr("checkJson", null);
                self.pwdCallSubmit(checkJson)
            }
        },

        showOrderAmount: function () {
            var self = this;
            var fnum = null;
            var famount = self.orderpay.getAttr("displayAmount") || 0;
            var znum = self.transNumToFixedStr(self.orderpay.getAttr("origamount") || 0);

            var arrayStr = new Array();
            arrayStr.push("<span class='pay-c666'>订单应付总额：</span>");
            arrayStr.push("<span class='ft18'>");
            arrayStr.push(znum);
            arrayStr.push("</span>")
            return arrayStr.join('');
        },
        updatePage: function () {
            var self = this;
            //Add by sqsun 20141003
            if (cUtility.isInApp()) {
                isTouchId = self.touchPayStore.getAttr('isTouchId') || 0;
                //验证用户设备是否支持指纹验证 Add sqsun 20141002
                self.CheckTouchId({ "bussinessType": 1000 }, function (result) {
                    if (result && result.resultCode == 0) { //支持指纹验证
                        //保存native回传的参数 Add by jianggd@Ctrip.com 20141002
                        isInput = 0;
                        isSupportTouchId = 1;
                        deviceInfo = result.deviceInfo;
                        //保存指纹支付信息用于混付
                        wifi_mac = result.wifi_mac;
                        //保存指纹支付信息用于混付
                        imei = result.imei;
                        //保存指纹支付信息用于混付
                        vendorid = result.vendorid;
                        //保存指纹支付信息用于混付
                        self.touchPayStore.setAttr("vendorid", vendorid);
                        self.touchPayStore.setAttr("deviceInfo", deviceInfo);
                        self.touchPayStore.setAttr("wifi_mac", wifi_mac);
                        self.touchPayStore.setAttr("imei", imei);
                    } else {//不支持指纹验证
                        isSupportTouchId = 0;
                    }
                    //获取指纹支付token
                    //同步处理1501服务，避免异步数据还未获取到
                    self.showLoading();
                    self.isHasPass(self.initpage);
                    //self.initpage();
                });
            } else {
                //判断该用户时候设置了交易密码 
                self.showLoading();
                self.isHasPass(self.initpage);
            }
        },
        initpage: function (callback) {
            var self = this;
            self.orderinfo = self.orderpay.get();
            self.cardpayment = self.paymentcard.get();
            if (self.orderinfo && self.cardpayment) {
                if (self.orderinfo.oid == self.cardpayment.orderid) {
                    //提交后 再次进入钱包支付页面
                    cardInfo = self.cardpayment.cardInfo;
                    self.filltpldata(1);
                } else {
                    //首次跳转礼品卡页面
                    cardInfo.hassubmit = false;
                    self.paymentcard.resetParam();
                    self.paymentcard.setAttr('orderid', self.orderinfo.oid);
                    self.loadData();
                }
            } else {
                self.goBack();
            }

            if (self.isSetPassWord) {
                //已设置支付密码
                //$pswtxt.text('忘记支付密码');
                self.$el.find('#c_lpk_password_set').hide();
                //self.$el.find('#c_lpk_password_forget').show();
                //密码框可见性
                //self.setinput(true);
            } else {
                //未设置支付密码
                //$pswtxt.text('设置支付密码');
                //self.$el.find('#c_lpk_password_forget').hide();
                self.$el.find('#c_lpk_password_set').show();
                //密码框可见性
                //self.setinput(false);
            }
            //使用指纹支付隐藏忘记密码连接 by guodong 20141110 edit by sqsun 20141124
            /*if (isTouchId) {
                self.$el.find("#c_pay_lpk_forget").hide();
            }*/
        },
        /*判断是否走指纹密码验证
        *Add By sqsun 20141002
        */
        TouchPay: function (e) {
            var self = this;
            var tkinfoObj = self.cardpay.getAttr("tktinfo") || {}; //获取礼品卡101下发字段 Edit by sqsun 20141023 数据容错处理
            var walletlistObj = self.cardpay.getAttr("walletlist")[0]; //获取钱包101下发字段
            var tktsArr = tkinfoObj.tkts; //获取101所下发的礼品卡对象数组集
            var rwy_ck = self.$el.find('[data-name="rwy"]'); //获取任我游DOM
            var rwx_ck = self.$el.find('[data-name="rwx"]'); //获取任我行DOM
            var qb_ck = self.$el.find('[data-name="qb"]'); //获取钱包DOM
            var selectCard = [],  //当前所选择的礼品卡集
                cards = []; //所选择的钱包卡集
            isVerifyMobile = 0; //还原分控初始值 add sqsun 2014-10-02

            //按钮置灰 点击无响应
            var domtarget = self.$(e.target);
            if (domtarget && domtarget.hasClass('btndisabled')) {
                return;
            }

            if (rwx_ck.length > 0 && rwx_ck.hasClass('yes')) {
                cards.push(1);
                selectCard.push(1)
            }
            if (rwy_ck.length > 0 && rwy_ck.hasClass('yes')) {
                cards.push(2);
                selectCard.push(2)
            }

            //判断钱包是否需要手机风控
            if (qb_ck.length > 0 && qb_ck.hasClass('yes')) {
                cards.push(3);
                if (walletlistObj.walletstatus == 2) {
                    isVerifyMobile = 1;
                }
            }

            //判断有没有选择礼品卡 直接返回提交为不使用
            if (cards.length < 1) {
                //this.showToast('请选择要使用的礼品卡', 3, function () { }, true);
                self.paymentcard.setAttr('orderid', -1);
                isInput = 1; //走常规密码支付
                //密码支付成功清除指纹支付
                isTouchId = 0;
                self.touchPayStore.setAttr('isTouchId', 0);
                var ckarray = self.$el.find('#allcardList span[data-name]');
                var flag = true;
                if (ckarray && ckarray.length > 0) {
                    _.each(ckarray, function (obj, index) {
                        if ($(obj).hasClass('yes')) {
                            flag = false;
                        }
                    })
                }
                if (flag) {
                    self.touchPayStore.setAttr('touchpaysubmit', 0);
                }
                self.orderpay.setAttr('amount', self.orderpay.getAttr("origamount"));
                var yeamount = self.orderpay.getAttr("origamount");
                self.goBack();
                return;
            }

            //判断是否需要手机风控
            var t = selectCard.length, tktTmp = null;
            for (var i = 0, l = tktsArr.length; i < l; i++) {
                tktTmp = tktsArr[i];
                for (var j = 0; j < t; j++) {
                    if (tktTmp.tkttype == selectCard[j] && tktTmp.ticketstatus == 2) {
                        isVerifyMobile = 1;
                        break
                    }
                }
            }

            //验证指纹支付
            if (cUtility.isInApp() && isTouchId && isInput === 0) {
                if (!isTouching) {
                    isTouching = true;
                } else {
                    return;
                }
                var paymentcard = self.paymentcard;
                //调起指纹支付
                self.CheckTouchId({ "bussinessType": 1001 }, function (result) {
                    //防止用户二次点击触发多次native的指纹调起
                    setTimeout(function () {
                        if (isTouching) {
                            isTouching = false;
                        }
                    }, 100);
                    //setTimeout(function () { alert(JSON.stringify(result)); },1);
                    if (result.resultCode == 0) {
                        self.touchPayStore.setAttr('touchPaySubmit', 1);
                        //指纹验证成功  
                        isVerifyMobile = 0; //指纹通过后不走风控

                        self.cardpay.setAttr("verifiedPhone", 1); //指纹通过后 不走信用卡礼品卡风控 sq_xu
                        self.CheckTouchId({ "bussinessType": 1003, "token": paytoken }, function (result) {
                            //setTimeout(function () { alert(JSON.stringify(result)); }, 1);
                            //保存native加密的token
                            RSAToken = result.RSAToken;
                            //保存指纹支付信息用于混付
                            self.touchPayStore.setAttr("RSAToken", RSAToken);
                            self.CheckTouchId({ "bussinessType": 1004 }, function (result) {
                                //setTimeout(function () { alert(JSON.stringify(result)); }, 1);
                                //保存native加密的GUID
                                secretKeyGUID = result.secretKeyGUID;
                                //保存指纹支付信息用于混付
                                self.touchPayStore.setAttr("secretKeyGUID", secretKeyGUID);
                                deviceGUID = result.deviceGUID;
                                //保存指纹支付信息用于混付
                                self.touchPayStore.setAttr("deviceGUID", deviceGUID);
                                self.pay();

                            });

                        });
                    } else if (result.resultCode == 1) {
                        var MyAlert = new c.ui.Alert({
                            title: '提示信息',
                            message: '无法验证指纹，请使用支付密码完成支付',
                            buttons: [
                                {
                                    text: '确认',
                                    click: function () {
                                        //重置为密码支付
                                        MyAlert.hide();
                                        self.pwdPay();
                                    },
                                    type: c.ui.Alert.STYLE_CONFIRM
                                }
                            ]
                        });
                        MyAlert.show();
                        self.alertArr.push(MyAlert);
                    } else if (result.resultCode == 101) {
                        //指纹验证点击输入密码输入密码  
                        //重置为密码支付
                        self.pwdPay();
                    } else {
                        //指纹验证点击取消android充值为密码支付输入密码 | ios什么都不做
                        if (util.getSystemVer() && util.getSystemVer().platform == 4) {
                            //重置为密码支付
                            self.pwdPay();
                        }
                    }
                })

            } else {
                self.pay();
            }
        },
        pwdPay: function () {
            var self = this;
            isInput = 1; //走常规密码支付
            //密码支付成功清除指纹支付
            isTouchId = 0;
            self.touchPayStore.setAttr('isTouchId', 0);
            //Edit by sqsun 20141124
            self.choosepwd();
        },
        //支付
        pay: function (e) {
            var self = this;
            //Edit By sqsun 20141002
            if (isTouchId) {
                self.showLoading();
            }
            //常规密码与指纹验证路由判断
            if (isInput) {
                self.choosepwd(); //验证环境判断 add by sqsun 20141124
            } else {//指纹验证提交
                //Add by sqsun 20141104
                //是否钱包礼品卡全部支付
                if (cardInfo.isPay) {
                    //是否礼品卡全额支付
                    var specialMsg = "";
                    if (cardInfo.noBill) {
                        //如果需要发票
                        if (self.orderinfo.needInvoice.toString() == "true") {
                            if (self.orderinfo.bustype == 101 || self.orderinfo.bustype == 102 || self.orderinfo.bustype == 8 || self.orderinfo.bustype == 301 || self.orderinfo.bustype == 303 || self.orderinfo.bustype == 302) {
                                if (self.orderinfo.includeInTotalPrice.toString() == "true") {
                                    var realamount = util.folatcount(self.orderinfo.origamount, self.orderinfo.invoiceDeliveryFee, '-');
                                    //self.orderinfo.totalamount_nobill = realamount;
                                    self.paymentcard.setAttr('totalamount_nobill', realamount);
                                    specialMsg = "礼品卡全额支付不提供报销凭证，扣除配送费后，应付￥" + realamount;
                                }
                                else {
                                    specialMsg = "由于你选择礼品卡支付，我们将不提供报销凭证";
                                }
                            }
                            else if (self.orderinfo.bustype == 11 || self.orderinfo.bustype == 1002) {
                                specialMsg = "由于你选择礼品卡支付，我们将不提供报销凭证";
                            }
                        }
                    }

                    if (specialMsg != "") {
                        self.showAlert(specialMsg, self.orderinfo.bustype);
                    } else {
                        //self.showLoading();
                        self.savecardinfo(1);
                        //支付完成
                        //判断是否需要手机风控做路由跳转
                        self.PostCheck(1)
                    }
                } else {
                    //判断是否已提交 成功
                    cardInfo.hassubmit = true;
                    //支付未完成（还需支付）
                    //self.showLoading();
                    self.savecardinfo(1);
                    self.getPaymentDetail(true);
                    //礼品卡混付返回首页需要重新调用101服务计算余额 
                    self.cardpay.setAttr("tktuse", 1);

                    //判断是否需要手机风控做路由跳转
                    self.PostCheck(0)
                }
            }

        },
        //全额支付 提示框
        showAlert: function (msg, bustype) {
            var self = this;
            this.promptAlert = new c.ui.Alert({
                title: '提示信息',
                message: msg,
                buttons: [{
                    text: '取消',
                    click: function () { this.hide(); self.hideLoading(); },
                    type: c.ui.Alert.STYLE_CANCEL
                },
                {
                    text: '确认',
                    click: function () {
                        this.hide();
                        if (bustype == 301 || bustype == 302) {
                            self.orderpay.setAttr('needInvoice', false);
                        }
                        else if (bustype == 101 || bustype == 102) {
                            self.orderpay.setAttr('needInvoice', false);


                            //不能直接减，存在经度问题
                            //var realamount = self.orderinfo.totalamount - self.orderinfo.invoiceDeliveryFee;

                            var realamount = util.folatcount(self.orderinfo.origamount, self.orderinfo.invoiceDeliveryFee, '-');

                            self.orderpay.setAttr('totalamount', realamount);
                        }
                        self.showLoading();
                        self.savecardinfo(1);
                        self.PostCheck(1); //走分控提交 add sqsun 20140929
                    },
                    type: 'confirm'
                }]
            });
            this.promptAlert.show();
            self.alertArr.push(this.promptAlert);
        },
        //获取支付详情（礼品卡 支付多少  钱包 支付多少）
        getPaymentDetail: function (flag, curnum) {
            var self = this;
            //Edit by sqsun 20141124
            var pwd = self.cardpay.getAttr("checkpwd");
            self.cardpay.setAttr("checkpwd", null); // Edit end
            /*Edit by sqsun 20141124
            if (!this.paymentcard.getAttr('cardInfo') || !this.paymentcard.getAttr('cardInfo').pwd) {
                pwd = this.$el.find('#c_payment_fadekey').val();
                //礼品卡密码采用base64加密
                pwd = Crypt.Base64.encode(pwd);
            } else {
                pwd = this.paymentcard.getAttr('cardInfo').pwd;
            }*/

            var rwy_ck = self.$el.find('[data-name="rwy"]');
            var rwx_ck = self.$el.find('[data-name="rwx"]');
            var qb_ck = self.$el.find('[data-name="qb"]');
            var rwydata = cardInfo.cardlist[0] || {}; //Edit by sqsun 20141023 数据容错处理
            var rwxdata = cardInfo.cardlist[1] || {}; //Edit by sqsun 20141023 数据容错处理
            var qbdata = cardInfo.walletlist[0] || {}; //Edit by sqsun 20141023 数据容错处理
            var myRWY = null;
            var myRWX = null;
            var myQB = null;
            var payinfo = {};
            var kdnum = 0;
            if (curnum) {
                kdnum = self.orderinfo.invoiceDeliveryFee || 0;
            }
            payinfo.cardamount = 0; //礼品卡支付金额
            payinfo.qbamount = 0;  //钱包支付金额
            payinfo.paytype = 0; //支付方式
            payinfo.cardpay = false;
            payinfo.qbpay = false;
            var array = new Array();
            var tkinfo_ser = self.cardpay.getAttr("tktinfo") || {}; //Edit by sqsun 20141023 数据容错处理
            var wallinfo_ser = self.cardpay.getAttr("walletlist") || []; //Edit by sqsun 20141023 数据容错处理

            var qbarray = [];
            if (qb_ck.length > 0 && qb_ck.hasClass('yes')) {
                //礼品卡全额支付时  肯定不会使用钱包余额
                payinfo.qbamount += qbdata.useamoumt;
                payinfo.qbpay = true;
                myQB = {};
                myQB.paymentwayid = wallinfo_ser[0].paymentwayid;
                myQB.amount = payinfo.qbamount;
                myQB.pwd = pwd;
                qbarray.push(myQB);
            }



            if (rwx_ck.length > 0 && rwx_ck.hasClass('yes')) {
                if (kdnum > 0) {
                    if (rwxdata.useamoumt > kdnum) {
                        rwxdata.useamoumt = util.folatcount(rwxdata.useamoumt, kdnum, '-');
                        payinfo.cardamount = payinfo.cardamount + rwxdata.useamoumt;
                        payinfo.cardpay = true;
                        kdnum = 0;
                    } else {
                        kdnum = util.folatcount(kdnum, rwxdata.useamoumt, '-');
                        rwxdata.useamoumt = 0;
                        payinfo.cardpay = false;
                    }
                } else {
                    payinfo.cardamount += rwxdata.useamoumt;
                    payinfo.cardpay = true;
                }


                myRWX = {};
                myRWX.tkttype = rwxdata.tkttype;
                myRWX.pwd = pwd;
                myRWX.amt = rwxdata.useamoumt;
                myRWX.tktid = rwxdata.tktid;
            }
            if (myRWX) {
                array.push(myRWX);
            }

            if (rwy_ck.length > 0 && rwy_ck.hasClass('yes')) {
                if (kdnum > 0) {
                    if (rwydata.useamoumt > kdnum) {
                        rwydata.useamoumt = util.folatcount(rwydata.useamoumt, kdnum, '-');
                        payinfo.cardamount = payinfo.cardamount + rwydata.useamoumt;
                        payinfo.cardpay = true;
                        kdnum = 0;
                    } else {
                        kdnum = util.folatcount(kdnum, rwydata.useamoumt, '-');
                        rwydata.useamoumt = 0;
                        payinfo.cardpay = false;
                    }
                } else {
                    payinfo.cardamount += rwydata.useamoumt;
                    payinfo.cardpay = true;
                }


                myRWY = {};
                myRWY.tkttype = rwydata.tkttype;
                myRWY.pwd = pwd;
                myRWY.amt = rwydata.useamoumt;
                myRWY.tktid = rwydata.tktid;
            }
            if (myRWY) {
                array.push(myRWY);
            }


            //支付方式
            if (payinfo.cardpay) {
                payinfo.paytype += 1;
            }
            if (payinfo.qbpay) {
                payinfo.paytype += 32;
            }
            payinfo.tktinfo = {
                "paymentwayid": tkinfo_ser.paymentwayid,
                "tktamount": payinfo.cardamount,
                "pwd": pwd,
                "tkts": array
            };


            payinfo.walletpayinfo = qbarray;
            if (flag) {
                this.paymentcard.setAttr('paymentdetail', payinfo);
                //解决礼品卡支付/混合支付时金额变化导致支付失败，应该点击确定返回到支付方式页面并刷新礼品卡金额 问题
                this.paymentcard.setAttr('tktinfo', payinfo.tktinfo);
            }

            return payinfo;
        },
        //直接支付
        gopay: function () {
            var self = this;
            //获取支付详情 礼品卡全额支付 退回礼品卡运费
            var payinfo = self.getPaymentDetail(true, self.paymentcard.getAttr('totalamount_nobill')) || {}; //Edit by sqsun 20141023 数据容错处理
            var tktinfo = null;
            var walletpayinfo = null;
            var _code = self.cardpay.getAttr("vcode");

            if (payinfo.cardpay) {
                tktinfo = payinfo.tktinfo;
                for (var i = 0; i < tktinfo.tkts.length; i++) {
                    tktinfo.tkts[i].vcode = _code;
                }
            }
            if (payinfo.qbpay) {
                walletpayinfo = payinfo.walletpayinfo;
                walletpayinfo[0].vcode = _code;
            }

            var _param = {
                "opttype": 1,
                "paytype": 0,
                "tktinfo": tktinfo,
                "walletpayinfo": walletpayinfo
            }

            //指纹支付的参数
            var paymentcard = self.paymentcard;
            if (isTouchId) {
                _param.touchpay = {
                    deviceinfo: {
                        devguid: deviceGUID,
                        devmod: deviceInfo,
                        wifimac: wifi_mac,
                        imei: imei,
                        vendorid: vendorid
                    },
                    keyguid: secretKeyGUID,
                    token: RSAToken
                };
                //statistic统计用 statisticPay = 5用户使用指纹支付，并且使用了的情况
                self.paymentcard.setAttr('statisticPay', 5);
            }
            //_param.tktinfo = this.paymentcard.get().tktinfo;

            var header = {};

            if (this.orderpay && this.orderpay.get()) {
                header = Business.getRequestHeader();
            }
            _param.head = header;
            var sback_url = decodeURIComponent(this.orderinfo.sback);
            var _callback = function (item) {
                item = item || {}; //Edit by sqsun 20141023 数据容错处理
                if (cUtility.isInApp()) {
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
                    self.tktErrorStore.setAttr("tktUsed", 1);
                    var MyAlert = new c.ui.Alert({
                        title: '提示信息',
                        message: '支付失败，请重新尝试',
                        buttons: [{
                            text: '确定',
                            click: function () {
                                Business.removePayCardStore();
                                Business.goHome.call(self);   //跳转至首页
                            },
                            type: c.ui.Alert.STYLE_CONFIRM
                        }]
                    });
                    MyAlert.show();
                    self.alertArr.push(MyAlert);
                    return; //屏蔽其他msg跳出
                }

                //设置单号
                //billl
                Business.setTempOid(item);

                //系统错误，直接抛出网络不给力,请稍候重试
                if (typeof item.res != 'undefined' && item.res) {
                    self.hideLoading();
                    self.showToast("网络不给力,请稍候重试");
                    return;
                }

                if (item.rc == 0) {
                    if (cUtility.isInApp()) {
                        //jump2AppSuccessPage 第一个参数为true时 跳转sback成功页面
                        Business.jump2AppPage(true, item, sback_url);
                    } else {
                        Business.jump2H5Page(true, item, sback_url);
                    }
                } else if (item.rc < 100) {
                    //判断是否已提交 成功
                    cardInfo.hassubmit = false;
                    //支付错误跳转页面
                    self.hideLoading();
                    //重复提交订单处理逻辑
                    if (item.rc == 4) {
                        var MyAlert = new c.ui.Alert({
                            title: '提示信息',
                            message: item.rmsg || "网络不给力,请稍候重试",
                            buttons: [{
                                text: '好的',
                                click: function () {
                                    if (cUtility.isInApp()) {
                                        //jump2AppSuccessPage 第一个参数为true时 跳转sback成功页面
                                        Business.jump2AppPage(true, item, sback_url);
                                    } else {
                                        Business.jump2H5Page(true, item, sback_url);
                                    }
                                },
                                type: c.ui.Alert.STYLE_CONFIRM
                            }]
                        });
                        MyAlert.show();
                        self.alertArr.push(MyAlert);
                    } else if (item.rc == 7 || item.rc == 10) {
                        //Edit by sqsun 20141013
                        isVerifyMobile = 1; //强制设置为走风控
                        var MyAlert = new c.ui.Alert({
                            title: '提示信息',
                            message: item.rmsg || "网络不给力,请稍候重试",
                            buttons: [
                            {
                                text: "确定",
                                click: function () {
                                    MyAlert.hide();
                                    //清空已经过风控标记
                                    self.cardpay.setAttr("verifiedPhone", null);
                                    //风控过期再次验证手机风控
                                    self.PostCheck(cardInfo.isPay);
                                },
                                type: c.ui.Alert.STYLE_CONFIRM
                            }
                            ]
                        });
                        MyAlert.show();
                        self.alertArr.push(MyAlert);
                    } else if (item.rc == 9) {
                        //指纹支付验证失败，显示密码输入

                        self.showToast(item.rmsg || "网络不给力,请稍候重试");
                        self.pwdPay();
                    } else {
                        self.showToast(item.rmsg || "网络不给力,请稍候重试");
                    }

                } else {
                    //判断是否已提交 成功
                    cardInfo.hassubmit = false;
                    var eback_url = decodeURIComponent((self.orderinfo.eback || ''));
                    if (cUtility.isInApp()) {
                        //jump2AppSuccessPage 第一个参数为false时 跳转eback支付失败页面
                        Business.jump2AppPage(false, item, eback_url);
                    } else {
                        Business.jump2H5Page(false, item, eback_url);
                    }
                }
            }
            var headobj = Business.getRequestHeader();

            var headstring = JSON.stringify(headobj);
            if (self.extendParamsStore.getAttr("isRealTimePay")) {
                _param.opadbitmp = 4;
                paymentPipe.payV3(_param, _callback, headstring, function () {
                    self.hideLoading();
                    //判断是否已提交 成功
                    cardInfo.hassubmit = false;
                    self.showToast("网络不给力,请稍候重试");

                });
            } else {
                paymentPipe.pay(_param, _callback, headstring, function () {
                    self.hideLoading();
                    //判断是否已提交 成功
                    cardInfo.hassubmit = false;
                    self.showToast("网络不给力,请稍候重试");

                });
            }

        },

        //保存支付方式的信息
        savecardinfo: function (signal) {
            //Edit by sqsun 20141124
            var pwd = this.cardpay.getAttr('checkpwd');
            cardInfo.pwd = pwd; //Edit end
            var _code = this.cardpay.getAttr("vcode");
            //点击支付或者使用 再保存选择礼品卡的结果
            if (cardInfo.walletlist && cardInfo.walletlist.length > 0) {
                cardInfo.walletlist[0].vcode = _code;
            }
            if (cardInfo.cardlist && cardInfo.cardlist.length > 0) {
                for (var i = 0; i < cardInfo.cardlist.length; i++) {
                    cardInfo.cardlist[i].vcode = _code;
                }

            }
            this.paymentcard.setAttr('cardInfo', cardInfo);
            signal && this.orderpay.setAttr('amount', cardInfo.laveamount);
        },

        //是否全额支付
        isAllPay: function (num) {
            num = num || 0;
            if (num >= this.orderinfo.totalamount) {
                return true;
            }
            return false;
        },
        //刷新礼品卡 钱包
        freshCard: function (data) {
            var self = this;
            //更新使用金额 选中状态
            if (data) {
                //状态不可用时 不刷新可用余额
                if ((data.ename == 'qb' && data.status != 2) || (data.ename != 'qb' && data.status != 1)) {
                    this.$el.find('.span-' + data.ename).text(self.transNumToFixedStr(data.useamoumt));
                    var ckdom = self.$el.find('[data-name="' + data.ename + '"]');
                    //使用金额大于零 选择框为选中状态 (选中状态时 金额为橙色)
                    if (ckdom.length > 0 && data.ischecked) {
                        ckdom.addClass('yes');
                        //self.$el.find('.span-' + data.ename).addClass('corange');
                    } else {
                        //self.$el.find('.span-' + data.ename).removeClass('corange');
                    }
                }
            }

            //置灰(需区分钱包(1 可用 2 不可用) 礼品卡(0 可用 1不可用))
            if (data.unable || (data.ename != 'qb' && data.status == 1) || (data.ename == 'qb' && data.status == 2)) {
                this.$el.find('.li-' + data.ename).addClass('invalidate');
            } else if (!data.unable && ((data.ename != 'qb' && data.status == 0) || (data.ename == 'qb' && data.status == 1))) {
                this.$el.find('.li-' + data.ename).removeClass('invalidate');
            }
        },

        //根据还需支付的金额 更新页面
        freshByLeavaAmount: function () {
            var num = cardInfo.laveamount || 0.00;
            if (cardInfo.isPay) {
                //全额支付 隐藏还需支付div 改变按钮文字
                this.$el.find("#span_leavaamount").hide();
                this.$el.find("#confirmBtn").hide();
                this.$el.find("#useBtn").hide();
                this.$el.find("#payBtn").show();

            } else {
                //非全额支付 
                this.$el.find('.laveamount').text(this.transNumToFixedStr(num));
                this.$el.find("#payBtn").hide();
                this.$el.find("#confirmBtn").hide();
                this.$el.find("#span_leavaamount").show();

                this.$el.find("#useBtn").show();
            }

            if (cardInfo.isPay) {
                //this.$el.find("#se_textDetail").show();
                this.$el.find("#isAllPay_div").show();
                this.$el.find("#se_textDetail").show();
            } else {
                //this.$el.find("#se_textDetail").hide();
                this.$el.find("#isAllPay_div").hide();
                if (this.$el.find('#c_payment_lipincard_text1').css('display') == 'none') {
                    this.$el.find("#se_textDetail").hide();
                }
            }
        },
        //更新列表
        renderList: function () {
            var self = this;
            var rwydata = cardInfo.cardlist[0];
            var rwxdata = cardInfo.cardlist[1];
            var qbdata = cardInfo.walletlist[0];

            self.freshCard(rwydata);
            self.freshCard(rwxdata);
            self.freshCard(qbdata);
        },

        //判断Bu是否支持小数 同时处理小数的计算
        decimalByBu: function (money, flag) {
            var self = this;
            flag = flag || false;
            var je = money + "",
            reg,
            bustype = this.orderinfo.bustype;

            if (self.disTingByBust() || flag) {
                reg = /([0-9]+\.[0-9]{2})[0-9]*/;
                return parseFloat(je.replace(reg, "$1"));
            } else {
                return parseInt(je, 10);
            }
        },
        disTingByBust: function () {
            var self = this;
            var array = Business.supportDecimalBu();
            var bustype = self.orderinfo.bustype;
            var result = false;
            for (var i = 0; i < array.length; i++) {
                if (array[i] == bustype) {
                    result = true;
                    break;
                }
            }
            return result;
        },
        //更改选择礼品卡 事件源为li
        changecard: function (e) {
            e.preventDefault();
            var self = this;
            var targetli = $(e.currentTarget);
            //置灰的选项点击无效
            if (targetli.length == 0 || targetli.hasClass('invalidate')) {
                return;
            }

            //未设置支付密码时 触发事件
            if (!this.isSetPassWord) {
                //弹出提示框
                var MyAlert = new c.ui.Alert({
                    title: '提示信息',
                    message: '请先设置支付密码，才能使用携程钱包支付',
                    buttons: [{
                        text: '取消',
                        click: function () {
                            this.hide();
                        },
                        type: c.ui.Alert.STYLE_CANCEL
                    }, {
                        text: '去设置',
                        click: function () {
                            this.hide();
                            self.goto();

                        },
                        type: c.ui.Alert.STYLE_CONFIRM
                    }]
                });
                MyAlert.show();
                self.alertArr.push(MyAlert);
                return;
            }

            //添加点击效果
            var ckdomel = targetli.find('span[data-name]');
            if (ckdomel && ckdomel.length > 0) {
                ckdomel.toggleClass('yes');
            } else {
                console.log('元素缺失');
                return;
            }

            //缓存数据
            var rwydata = cardInfo.cardlist[0];
            var rwxdata = cardInfo.cardlist[1];
            var qbdata = cardInfo.walletlist[0];
            //复选框
            var rwy_ck = self.$el.find('[data-name="rwy"]');
            var rwx_ck = self.$el.find('[data-name="rwx"]');
            var qb_ck = self.$el.find('[data-name="qb"]');



            //数据初始化
            cardInfo.noBill = false;
            cardInfo.isPay = false;
            cardInfo.laveamount = this.orderinfo.totalamount;
            rwydata.useamoumt = 0.00;
            rwxdata.useamoumt = 0.00;
            qbdata.useamoumt = 0.00;

            rwydata.unable = false;
            rwxdata.unable = false;
            qbdata.unable = false;


            if (rwy_ck.length > 0) {
                if (rwy_ck.hasClass('yes')) {
                    if (self.isAllPay(rwydata.ableamount)) {
                        rwydata.useamoumt = self.decimalByBu(this.orderinfo.totalamount);
                        cardInfo.isPay = true; //是否全额支付
                        cardInfo.noBill = true;
                        cardInfo.laveamount = 0.00;

                    } else {
                        //非全额支付
                        rwydata.useamoumt = self.decimalByBu(rwydata.ableamount);
                        cardInfo.isPay = false;

                        //不能直接减，存在经度问题
                        //cardInfo.laveamount = self.decimalByBu(cardInfo.laveamount - rwydata.useamoumt);

                        var laveamount = util.folatcount(cardInfo.laveamount, rwydata.useamoumt, '-');

                        cardInfo.laveamount = self.decimalByBu(laveamount);


                    }
                }
                //获取缓存选中状态
                rwydata.ischecked = rwy_ck.hasClass('yes');
            }


            if (rwx_ck.length > 0) {
                if (rwx_ck.hasClass('yes')) {
                    if (cardInfo.isPay) {
                        rwxdata.unable = true;
                        rwx_ck.removeClass('yes');
                        cardInfo.noBill = true;
                    } else if (rwxdata.ableamount >= cardInfo.laveamount) {
                        rwxdata.useamoumt = self.decimalByBu(cardInfo.laveamount);
                        cardInfo.isPay = true;
                        cardInfo.laveamount = 0.00;
                        cardInfo.noBill = true;
                    } else {
                        rwxdata.useamoumt = self.decimalByBu(rwxdata.ableamount);
                        cardInfo.isPay = false;

                        //不能直接减，存在经度问题
                        //cardInfo.laveamount = self.decimalByBu(cardInfo.laveamount - rwxdata.useamoumt);;

                        var laveamount = util.folatcount(cardInfo.laveamount, rwxdata.useamoumt, '-');

                        cardInfo.laveamount = self.decimalByBu(laveamount);




                    }
                } else {
                    if (cardInfo.isPay) {
                        rwxdata.unable = true;
                        cardInfo.noBill = true;
                    }
                }
                //获取缓存选中状态
                rwxdata.ischecked = rwx_ck.hasClass('yes');
            }


            if (qb_ck.length > 0) {
                if (qb_ck.hasClass('yes')) {
                    if (cardInfo.isPay) {
                        cardInfo.noBill = true; //判断是否礼品卡全额支付(不包含钱包)
                        qbdata.unable = true;
                        qb_ck.removeClass('yes');
                    } else if (qbdata.ableamount >= cardInfo.laveamount) {
                        qbdata.useamoumt = self.decimalByBu(cardInfo.laveamount);
                        cardInfo.isPay = true;
                        cardInfo.laveamount = 0.00;
                    } else {
                        qbdata.useamoumt = self.decimalByBu(qbdata.ableamount);
                        cardInfo.isPay = false;
                        //cardInfo.laveamount = self.decimalByBu(cardInfo.laveamount - qbdata.useamoumt);
                        var laveamount = util.folatcount(cardInfo.laveamount, qbdata.useamoumt, '-');

                        cardInfo.laveamount = self.decimalByBu(laveamount);
                    }
                } else {
                    if (cardInfo.isPay) {
                        qbdata.unable = true;
                        cardInfo.noBill = true; //判断是否礼品卡全额支付
                    }
                }
                //获取缓存选中状态
                qbdata.ischecked = qb_ck.hasClass('yes');
            }


            //整体更新金额
            cardInfo.cardlist[0] = rwydata;
            cardInfo.cardlist[1] = rwxdata;
            cardInfo.walletlist[0] = qbdata;
            self.renderList();

            //钱包 礼品卡可以全额支付
            self.freshByLeavaAmount();

            //取消全部勾选(过滤所有的单选框)
            var ckarray = self.$el.find('#allcardList span[data-name]');
            if (ckarray) {
                var flag = true;
                _.each(ckarray, function (obj) {
                    if ($(obj).hasClass('yes')) {
                        flag = false;
                    }
                })

                if (flag) {
                    //按钮显示 确认
                    self.$el.find("#useBtn").hide();
                    self.$el.find("#payBtn").hide();
                    self.$el.find("#confirmBtn").show();

                    //隐藏密码输入框 还需要支付
                    this.$el.find("#span_leavaamount").hide();
                }
            }
        },
        //加载页面数据
        loadData: function () {
            var self = this;
            var cardlist = this.cardpay.get();
            var rwx = {}, rwy = {};
            rwx.isshow = false;
            rwy.isshow = false;
            if (cardlist && cardlist.tktinfo && cardlist.tktinfo.tkts) {
                var tkts = cardlist.tktinfo.tkts;
                for (var i = 0; i < tkts.length; i++) {
                    //可用金额
                    tkts[i].amount = this.handlemoney(tkts[i].amount, true);
                    if (tkts[i].tkttype == 1) {
                        rwx = tkts[i];
                        rwx.name = "任我行";
                        rwx.ename = "rwx";
                        rwx.ableamount = this.handlemoney(rwx.amount, true); //可用余额
                        rwx.useamoumt = 0.00; //已用金额
                        rwx.isshow = true;
                    } else if (tkts[i].tkttype == 2) {
                        rwy = tkts[i];
                        rwy.name = "任我游";
                        rwy.ename = "rwy";
                        rwy.ableamount = this.handlemoney(rwy.amount, true); //可用余额
                        rwy.useamoumt = 0.00;
                        rwy.isshow = true;
                    }
                }
                cardInfo.cardlist = [];
                cardInfo.laveamount = this.orderinfo.totalamount; //初始还需支付金额等于总额
                cardInfo.cardlist.push(rwy);
                cardInfo.cardlist.push(rwx);
            }

            //判断钱包余额是否使用
            cardInfo.walletlist = [];
            var tempobj = {};
            tempobj.isshow = false; //是否可见
            if (cardlist.walletlist && cardlist.walletlist.length > 0) {
                tempobj = cardlist.walletlist[0];
                tempobj.ename = "qb";
                tempobj.ableamount = self.handlemoney(tempobj.cashbalance, true); //可用余额
                tempobj.useamoumt = 0.00;
                tempobj.isshow = true;
            }
            cardInfo.walletlist.push(tempobj);

            if (cardInfo.cardlist.length > 0 || cardInfo.walletlist.length > 0) {
                this.paymentcard.setAttr('cardInfo', cardInfo);
                this.filltpldata();
            }
        },
        //填充模板数据
        filltpldata: function (type) {
            var self = this;
            var data = this.paymentcard.get() && this.paymentcard.get().cardInfo; //Edit by sqsun 20141023 数据容错处理
            this.els.cardlist.html(this.cardlisttpl(data));
            this.els.fadekey = this.els.cardlist.find("#c_payment_fadekey"); //密码框
            this.els.numinput = this.els.cardlist.find("#c_payment_numinput"); //数字框
            //没有设置密码时 改变按钮
            if (!self.isSetPassWord) {
                self.$el.find('#payBtn').hide();
                self.$el.find('#confirmBtn').hide();
                //Edit by sqsun 20141124
                //this.$el.find("#li_password input").attr('disabled', 'disabled');
                //self.$el.find('#li_password').show();

                self.$el.find('#useBtn button').addClass('btndisabled');
                this.els.fadekey.parent().addClass('btndisabled');
                self.$el.find('#useBtn').show();
            }

            var ugSystemVer = util.getSystemVer();
            //ios hybird 礼品卡弹起数字键盘代理
            if (ugSystemVer.platform == 3) {
                self.$el.find("#c_payment_numinput").show();
            }

            this.hideLoading();
            //区分是首次加载 还是提交后 再次进入
            if (type) {
                self.renderList();
                self.freshByLeavaAmount();
                //获取当前选中状态 用于判断是否修改了选中状态
                self.setCurState();
            }
            //根据服务端下发显示提示文案
            var bustype = this.orderpay.get().bustype;

            var dsettings = this.cardpay.get().dsettings;
            for (var i in dsettings) {
                //如果是高端美食显示A文案
                if (dsettings[i].type == 10 && dsettings[i].value) {
                    var valueStr = dsettings[i].value;
                    //替换换行
                    valueStr = valueStr.replace(/\u000a/img, '<br />');
                    this.$el.find('#c_payment_lipincard_text1').html(valueStr);
                    this.$el.find('#c_payment_lipincard_text1').show();
                    self.$el.find("#artic_list").css({ "height": "100%" });
                    //后载入高度重新计算，不然在mobile下拖动有问题
                    setTimeout(function () { self.$el.find("#artic_list").height(self.$el.find("#artic_list").height() + 48) }, 0);
                    this.$el.find("#se_textDetail").show();
                } else {
                    if (this.$el.find("#isAllPay_div").css('display') == 'none') {
                        this.$el.find("#se_textDetail").hide();
                    }
                }
            }
        },

        //判断是否设置交易密码
        isHasPass: function (callback) {
            var self = this;
            var header = {};
            var _callback = function (_json) {
                var $pswtxt = self.$el.find('.catxt');
                var json = _json || {}; //Edit by sqsun 20141023 数据容错处理
                if (cUtility.isInApp()) {
                    //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
                    if (_json.resultBody) {
                        json = JSON.parse(_json.resultBody);
                    } else {

                        //错误的时候，弹出网络不给力提示  
                        self.hideLoading();
                        self.showToast("网络不给力,请稍候重试");
                        self.goBack();

                        try {
                            //收集异常信息
                            Business.exceptionInfoCollect({
                                bustype: 2,
                                excode: 3,
                                extype: 2,
                                exdesc: '设置密码错误'
                            });
                        } catch (e) {

                        }

                        Business.removePayCardStore();
                        Business.goHome.call(self);   //跳转至首页
                        return;
                    }
                }
                //json = { result: 0, resultmesg: "", paytoken: "111111", accountinfo: { phone: 13811118888, stabitmap: 3} };
                if (json && json.result == 0) {
                    self.hideLoading();
                    //是否设置支付密码
                    if (json.accountinfo) {
                        //获取用户手机风控号码
                        phonenum = json.accountinfo.phone;
                        if (json.accountinfo.stabitmap & 1) {
                            //h5 未开通指纹走密码支付 by guodong 20141118
                            isInput = 1;
                            self.isSetPassWord = 1;
                        }
                        if (json.accountinfo.stabitmap & 2) {
                            //h5 开通指纹充值密码支付标记 by guodong 20141119
                            isInput = 0;
                            openTouchId = 1;  //用户已开通指纹支付
                            paytoken = json.paytoken;
                            if (openTouchId && isSupportTouchId) {
                                isTouchId = 1;
                                self.touchPayStore.setAttr('isTouchId', 1);
                            }
                        } else {
                            //statistic统计用 statisticPay = 6表示用户未开启指纹支付的情况
                            isTouchId = 0;
                            self.touchPayStore.setAttr('isTouchId', 0);
                            self.paymentcard.setAttr('statisticPay', 6);
                        }
                    }


                    callback && callback.call(self);
                } else {
                    self.hideLoading();
                    self.showToast(json.resultmesg || "网络不给力,请稍候重试");
                    return;
                }


            };

            if (this.orderpay && this.orderpay.get()) {
                header = Business.getRequestHeader();
            }
            var headstring = JSON.stringify(header);
            var orderinfo = self.orderpay.get() || {};
            var paymentcard = self.paymentcard.get() || {};
            var _params = {
                "svr": 0,
                "bustype": orderinfo.bustype,
                "oid": orderinfo.oid,
                "requestid": orderinfo.requestid,
                "opbitmap": 3 //2=获取是否设置交易密码
            };
            if (isSupportTouchId && cUtility.isInApp()) {
                _params.deviceinfo = {
                    "devguid": deviceGUID,
                    "devmod": deviceInfo,
                    "wifimac": wifi_mac,
                    "imei": imei,
                    "vendorid": vendorid
                }
                //4 = 获取是否开通指纹支付
                _params.opbitmap = _params.opbitmap + 4;
            }
            //测试指纹支付用，务必改回去
            paymentPipe.getPhoneNum(_params, _callback, headstring, function () {
                //错误的时候，弹出网络不给力提示  
                self.hideLoading();
                //self.showToast("网络不给力,请稍候重试");
                //self.goBack();

                try {
                    //收集异常信息
                    Business.exceptionInfoCollect({
                        bustype: 2,
                        excode: 3,
                        extype: 2,
                        exdesc: '设置密码错误'
                    });
                } catch (e) {

                }

                Business.removePayCardStore();
                Business.goHome.call(self);   //跳转至首页
            });

            //_callback();

        },

        //设置支付密码
        goto: function () {
            var self = this;
            //设置状态 标示进入礼品卡支付页 是否首次进入
            self.paymentcard.setAttr('orderid', -1);
            //业务端必须传入from参数
            var url = self.orderpay.getAttr('from');
            var txt = this.$el.find('.catxt').text();
            var gopage = 'chgpwd';
            var origUrl = location.href;
            var logininfo = {
                islogin: self.orderpay.getAttr('isload'),
                auth: self.orderpay.getAttr('auth'),
                time: '2099/01/01 00:00:00', //H5获取不到auth失效的时间
                isuser: self.orderpay.getAttr('isload')
            };

            var token_str = encodeURIComponent(Crypt.Base64.encode(JSON.stringify(logininfo)));
            var obj = {
                "WALLET_AUTH_INFO": token_str
            }
            util.addCookie(obj);
            localStorage.setItem("WALLET_AUTH_INFO", token_str);

            var token = {
                from: "",
                eback: ""
            }

            if (cUtility.isInApp()) {
                var _url = this.getRoot() + '#lipincardpay';
                token.eback = token.from = _url;
                var tempStr = encodeURIComponent(Crypt.Base64.encode(JSON.stringify(token)));
                Guider.cross({
                    path: 'wallet',
                    param: "index.html#" + gopage + "?token=" + tempStr
                })
            } else {
                //H5设置支付密码 需要根据不同的环境跳转不同的地址
                //url = self.getWalletUrl();
                url = 'https://' + location.host; //支付和钱包在同一个域下
                token.eback = token.from = origUrl;
                var tempStr = encodeURIComponent(Crypt.Base64.encode(JSON.stringify(token)));
                this.jump(url + "/webapp/wallet/index.html#" + gopage + "?token=" + tempStr);
            }

        },
        //返回支付页 不清空缓存localstore 
        goBack: function () {
            var self = this;
            var url = self.orderpay.getAttr('indexurl');
            Lizard.goBack();
            //self.back(url);
        },
        //处理金额  isuse  true:可用金额  false:使用金额
        handlemoney: function (money, isuse) {
            var je = money + "",
                reg,
                bustype = this.orderinfo.bustype;
            if (isuse) {
                reg = /([0-9]+\.[0-9]{2})[0-9]*/;
                return parseFloat(je.replace(reg, "$1"));
            } else {
                //火车票和商户和汽车票 支持支付后2位小数
                if (bustype == 4 || bustype == 3001 || bustype == 14) {
                    reg = /([0-9]+\.[0-9]{1})[0-9]*/;
                    return parseFloat(je.replace(reg, "$1"));
                } else {
                    return parseInt(je, 10);
                }
            }
        },

        setCurState: function () {
            var self = this;
            var ckarray = self.$el.find('#allcardList span[data-name]');
            var array = new Array();
            if (ckarray) {
                _.each(ckarray, function (obj) {
                    array.push($(obj).hasClass('yes'));
                })
            }
            self.paymentcard.setAttr('curstate', array);
        },
        //
        backChangeWarn: function () {
            var self = this;
            //取消风控返回 
            if (self.cardpay.getAttr("cancelWindControl")) {
                //没有提交
                cardInfo.hassubmit = false;
                //取消缓存
                self.orderpay.setAttr('amount', self.orderpay.getAttr("origamount"));
                self.paymentcard.setAttr('cardInfo', null);
            }
            //提交后再次进入 1.选项发生变化 2.全部取消选中
            if (cardInfo.hassubmit) {
                var temparray = self.paymentcard.getAttr('curstate');
                //全部取消选中
                var ckarray = self.$el.find('#allcardList span[data-name]');
                var flag = true;
                var hasChange = false;
                if (ckarray && ckarray.length > 0) {
                    _.each(ckarray, function (obj, index) {
                        if (temparray[index] != $(obj).hasClass('yes')) {
                            hasChange = true;
                        }
                        if ($(obj).hasClass('yes')) {
                            flag = false;
                        }
                    })
                }
                if (flag) {
                    var MyAlert = new c.ui.Alert({
                        title: '提示信息',
                        message: '确认不使用携程钱包的金额？',
                        buttons: [{
                            text: '再想想',
                            click: function () {
                                this.hide();
                                //self.goBack();
                            },
                            type: c.ui.Alert.STYLE_CANCEL
                        }, {
                            text: '不使用',
                            click: function () {
                                //放弃使用钱包 返回支付页（不使用）
                                this.hide();
                                self.paymentcard.setAttr('orderid', -1);
                                //取消指纹支付
                                isInput = 1;
                                isTouchId = 0;
                                self.touchPayStore.setAttr('isTouchId', 0);
                                self.touchPayStore.setAttr('touchPaySubmit', 0);
                                self.orderpay.setAttr('amount', self.orderpay.getAttr("origamount"));
                                self.goBack();
                            },
                            type: c.ui.Alert.STYLE_CONFIRM
                        }]
                    });
                    MyAlert.show();
                    self.alertArr.push(MyAlert);
                } else if (!flag && hasChange) {
                    //发生改变
                    var MyAlert = new c.ui.Alert({
                        title: '提示信息',
                        message: '您修改了使用选项 请重新确认您使用的钱包金额',
                        buttons: [{
                            text: '放弃修改',
                            click: function () {
                                //放弃修改 返回支付方式页 维持原始选中结果
                                //取消指纹支付
                                isInput = 1;
                                isTouchId = 0;
                                self.touchPayStore.setAttr('isTouchId', 0);
                                self.touchPayStore.setAttr('touchPaySubmit', 0);
                                this.hide();
                                self.goBack();
                            },
                            type: c.ui.Alert.STYLE_CANCEL
                        }, {
                            text: '确定',
                            click: function () {
                                //停留在原页面 
                                this.hide();
                            },
                            type: c.ui.Alert.STYLE_CONFIRM
                        }]
                    });
                    MyAlert.show();
                    self.alertArr.push(MyAlert);
                } else {

                    self.goBack();
                }
            } else {
                //没有提交 无选中直接返回   有选中给出提示
                var ckarray = self.$el.find('#allcardList span[data-name]');
                if (ckarray && ckarray.length > 0) {
                    var hasChecked = false;
                    _.each(ckarray, function (obj, index) {
                        if ($(obj).hasClass('yes')) {
                            hasChecked = true;
                        }
                    })
                    //给出提示
                    if (hasChecked) {
                        var MyAlert = new c.ui.Alert({
                            title: '提示信息',
                            message: '您修改了使用选项 请重新确认您使用的钱包金额',
                            buttons: [{
                                text: '放弃修改',
                                click: function () {
                                    this.hide();
                                    self.paymentcard.setAttr('orderid', -1);
                                    //取消指纹支付
                                    isInput = 1;
                                    isTouchId = 0;
                                    self.touchPayStore.setAttr('isTouchId', 0);
                                    if (flag) {
                                        self.touchPayStore.setAttr('touchPaySubmit', 0);
                                    }
                                    self.goBack();
                                },
                                type: c.ui.Alert.STYLE_CANCEL
                            }, {
                                text: '确定',
                                click: function () {
                                    //停留在原页面 
                                    this.hide();
                                },
                                type: c.ui.Alert.STYLE_CONFIRM
                            }]
                        });
                        MyAlert.show();
                        self.alertArr.push(MyAlert);
                    } else {
                        self.paymentcard.setAttr('orderid', -1);
                        self.goBack();
                    }

                } else {
                    self.paymentcard.setAttr('orderid', -1);
                    self.goBack();
                }
            }

        },
        //将数字转换为字符串  ‘￥0.40’
        transNumToFixedStr: function (num, maxlength, currency) {
            num = num + '';
            if (!num) {
                return '';
            }
            //判断num是否是数字字符串
            var reg = /^\d*\.*\d+$/;
            if (!reg.test(num)) {
                return num;
            }
            maxlength = maxlength || 2;
            currency = currency || '￥';

            var array = num.split('.');
            var hzStr = '';
            var curlength = 0;
            if (array.length > 1) {
                curlength = array[1].length;
                hzStr = array[1];
            }

            for (var i = 0; i < (maxlength - curlength); i++) {
                hzStr += '0';
            }
            array[1] = hzStr;
            return (currency + array.join('.'));
        },
        showView: function () {
            var self = this;
            this.headerview.set({
                title: '携程钱包支付',
                view: this,
                openAds: true,
                back: true,
                home: false,
                events: {
                    returnHandler: function () {
                        //self.goBack();
                        self.backChangeWarn();
                        return true;
                    }
                }
            });
            this.headerview.show();
            try {
                self.turning();
            } catch (e) {

            }
            //初始化是否走输入密码Add sqsun 20141003
            isInput = 1;

            self.updatePage();

        },

        /**
        * Author sqsun
        * 验证是全额支付，还是混付
        **/
        PostCheck: function (router) {
            var self = this;
            //判断是否需要手机风控
            if (isVerifyMobile) {
                //验证是否有手机号码或已经通过了手机风控
                if (phonenum) {
                    //1501必须下发手机号才走风控验证
                    self.cardpay.setAttr("isGetPassWordfrom1501", 1);
                    self.cardpay.setAttr("verifyMobile", phonenum);
                    self.cardpay.setAttr("seniortype", 1); //礼品卡风控 sq_xu
                    Business.VerifyPhone.call(self, "lipincardpay");
                } else {
                    self.cardpay.setAttr("isGetPassWordfrom1501", 0);
                    if (router) {
                        self.gopay()
                    } else {
                        self.goBack();
                    }
                }
            } else {
                if (router) {
                    self.gopay()
                } else {
                    self.goBack();
                }
            }
        },
        /**
        * FUN CheckTouchId
        * Author sqsun
        * PARMAS cback 验证完成后回调函数，checkstatus 判断是否是查询调用 类型为INT型，1为查询，0为调用
        * 验证指纹钱包密码
        **/
        CheckTouchId: function (type, cback) {
            //callback不能调用alert，不然会阻塞native的系统alert
            /*
            *接收native回调需要先Facade.register注册
            *Editor: JGD
            *Version: 6.0
            */
            /*Facade['METHOD_APP_FINGER_IDENTIFY'] = 'METHOD_APP_FINGER_IDENTIFY';
            Facade.registerOne(Facade['METHOD_APP_FINGER_IDENTIFY'], 'app_finger_identify');
            Facade.register({
            tagname: Facade.METHOD_APP_FINGER_IDENTIFY, callback: function (jsonobj) {
            /**
            * _rc == 0 指纹识别成功
            * _rc == 1 指纹识别失败
            * _rc == 2 指纹识别用户取消
            * _rc == 3 设备不支持指纹识别
            * _rc == 4 设备支持指纹识别
            * _rc == 101 点击输入密码
            */
            /*return cback(jsonobj);
            }
            });*/


            /*
            * 调用bridge.js中指纹验证函数
            * checkstatus,callback 为必填参数
            */
            var _params = {
                reason: "",
                businessType: type.bussinessType,
                token: type.token
            };
            var fn = new cHybridShell.Fn('do_business_job', function (jsonobj) {
                /**
                * _rc == 0 指纹识别成功
                * _rc == 1 指纹识别失败
                * _rc == 2 指纹识别用户取消
                * _rc == 3 设备不支持指纹识别
                * _rc == 4 设备支持指纹识别
                * _rc == 101 点击输入密码
                */
                return cback(jsonobj);
            });
            //params@1: businessType: 4 支付用通道
            //params@2: businessCode: 11000 指纹支付通道
            //params@3: _params: 指纹支付参数
            fn.run(4, 11000, _params);
        },
        //验证密码成功后处理方法，与6.0无缝对接
        pwdCallSubmit: function (json) {
            var self = this;
            //设置单号
            //billl
            Business.setTempOid(json);
            //清空避免全额支付 取消后出错
            //self.orderinfo.totalamount_nobill = null;
            self.paymentcard.setAttr('totalamount_nobill', null);

            //statistic统计用 statisticPay = 4表示用户开启了指纹支付，但是使用支付密码的情况
            if (isTouchId) {
                self.paymentcard.setAttr('statisticPay', 4);
                //密码支付成功清除指纹支付
                isTouchId = 0;
            }
            
            self.touchPayStore.setAttr('isTouchId', 0);
            self.touchPayStore.setAttr('touchPaySubmit', 0);
            //是否钱包礼品卡全部支付
            if (cardInfo.isPay) {
                //是否礼品卡全额支付
                var specialMsg = "";
                if (cardInfo.noBill) {
                    //如果需要发票
                    if (self.orderinfo.needInvoice.toString() == "true") {
                        if (self.orderinfo.bustype == 101 || self.orderinfo.bustype == 102 || self.orderinfo.bustype == 8 || self.orderinfo.bustype == 301 || self.orderinfo.bustype == 303 || self.orderinfo.bustype == 302) {
                            if (self.orderinfo.includeInTotalPrice.toString() == "true") {
                                var realamount = util.folatcount(self.orderinfo.origamount, self.orderinfo.invoiceDeliveryFee, '-');
                                //self.orderinfo.totalamount_nobill = realamount;
                                self.paymentcard.setAttr('totalamount_nobill', realamount);
                                specialMsg = "礼品卡全额支付不提供报销凭证，扣除配送费后，应付￥" + realamount;
                            }
                            else {
                                specialMsg = "由于你选择礼品卡支付，我们将不提供报销凭证";
                            }
                        }
                        else if (self.orderinfo.bustype == 11 || self.orderinfo.bustype == 1002) {
                            specialMsg = "由于你选择礼品卡支付，我们将不提供报销凭证";
                        }
                    }
                }

                if (specialMsg != "") {
                    self.showAlert(specialMsg, self.orderinfo.bustype);
                } else {
                    //self.showLoading();
                    self.savecardinfo(1);
                    //支付完成
                    //判断是否需要手机风控做路由跳转
                    self.PostCheck(1)
                }
            } else {
                //判断是否已提交 成功
                cardInfo.hassubmit = true;
                //支付未完成（还需支付）
                //self.showLoading();
                self.savecardinfo(1);
                self.getPaymentDetail(true);
                //礼品卡混付返回首页需要重新调用101服务计算余额 
                self.cardpay.setAttr("tktuse", 1);

                //判断是否需要手机风控做路由跳转
                self.PostCheck(0)
            }
        },
        //数字密码环境判断
        choosepwd: function () {
            var self = this;
            if (cUtility.isInApp()) {
                self.CheckTouchId({ "bussinessType": 12000 }, function (result) {
                    if (result.resultCode == 0) { //验证成功
                        var _pwd = result.pwd || ''; //获取到当前的base64密码
                        self.cardpay.setAttr("checkpwd", _pwd);
                        self.pwdCallSubmit({ "res": true, "msg": "验证成功!" });
                    } else if (result.resultCode == 2) {//忘记密码
                        self.goto();
                    }
                })
            } else {
                //跳转到H5密码验证模组
                self.forward("verfiedpsd?from=lipincardpay");
            }
        }
    });

    return View;
});
