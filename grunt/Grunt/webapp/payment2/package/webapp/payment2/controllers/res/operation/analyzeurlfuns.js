define(['c', 'cWidgetFactory', 'PayModel', 'PayStore', 'CommonStore', 'cUtility', 'Util', 'Business', 'cUtilityCrypt', 'PayStore'], function (c, widgetFactory, payModel, payStore, CommonStore, cUtility, Util,
Business, Crypt, payStore) {
    var result = {};
    var paramUrlTokenStore = payStore.ParamUrlTokenStore.getInstance();
    var orderDetailStore = payStore.OrderDetailStore.getInstance();
    var extendParamsStore = payStore.ExtendInfoStore.getInstance(); //扩展参数
    var payMentOtherInfo = payStore.PayMentOtherInfo.getInstance(); //扩展参数
    var tktErrorStore = payStore.tktErrorStore.getInstance();   //保存礼品卡金额异常状态store
    var paymentcard = payStore.PayMentCardParamStore.getInstance(); //存放礼品卡支付的信息5.4
    var lipinCardEInfo = payStore.lipinCardEInfo.getInstance();
    //解析Url参数 token
    result.getOrderDetail = function () {
        var self = this;
        //保存url token值
        var token;
        var urlToken = Util.geturlQuery('token') || '';
        urlToken = decodeURIComponent(urlToken);
        var decodeUrlToken;
        var order_obj = {};
        var tokenError = false;
        try {
            decodeUrlToken = Crypt.Base64.decode(urlToken);
            //判断BU过来之后是否传token
            if (decodeUrlToken.length > 0) {
                token = JSON.parse(decodeUrlToken);
            }

            $.each(token, function (key, value) {
                //过滤bu传递参数的头尾空格
                if (value && _.isString(value)) {
                    value = $.trim(value);
                }
                order_obj[key] = value;
            });

            //选填字段，设置默认值
            typeof (order_obj.currency) == "undefined" && (order_obj.currency = "CNY");
            typeof (order_obj.displayCurrency) == "undefined" && (order_obj.displayCurrency = "");
            typeof (order_obj.displayAmount) == "undefined" && (order_obj.displayAmount = "");
            typeof (order_obj.recall) == "undefined" && (order_obj.recall = "");
            typeof (order_obj.extno) == "undefined" && (order_obj.extno = "");
            typeof (order_obj.needInvoice) == "undefined" && (order_obj.needInvoice = false);
            typeof (order_obj.invoiceDeliveryFee) == "undefined" && (order_obj.invoiceDeliveryFee = 0);
            typeof (order_obj.includeInTotalPrice) == "undefined" && (order_obj.includeInTotalPrice = false);

            order_obj["indexurl"] = self.getViewUrl(); //location.hash;
            order_obj["indexUrl"] = location.href;  //保存支付首页url地址用于逻辑跳转
            order_obj["totalamount"] = order_obj.amount;
            order_obj["origamount"] = order_obj.amount;
        } catch (e) {
            Business.exceptionInfoCollect({
                bustype: order_obj.bustype || '',
                excode: 3,
                extype: 1,
                exdesc: 'Bu传递url解析异常' + e + 'BU传过来的token参数：' + urlToken
            });
            console.warn('Bu传递url解析异常' + e);
            var str = '系统异常，请重新提交订单！！！';
            var MyAlert = new c.ui.Alert({
                title: '提示信息',
                message: str,
                buttons: [
                        {
                            text: '确定',
                            click: function () {
                                this.hide();
                                window.history.back();
                            },
                            type: c.ui.Alert.STYLE_CONFIRM
                        }
                        ]
            });
            MyAlert.show();
            tokenError = true;
            return;
        }

        if (tokenError) {
            return;
        }

        //解决报系统异常时候，发送1401时候，auth没传问题  lh_sun
        paramUrlTokenStore.set(order_obj);

        //其他必填字段为空/错误
        if (!order_obj.oid || !order_obj.bustype || !order_obj.sback || !order_obj.title || !order_obj.amount) {
            self.hideLoading();
            var str = '系统异常，请重新提交订单！！';
            if (!_.isUndefined(order_obj.amount) && order_obj.amount == 0) {
                str = '系统异常，请重新提交订单！';
            }
            var MyAlert = new c.ui.Alert({
                title: '提示信息',
                message: str,
                buttons: [
                        {
                            text: '确定',
                            click: function () {
                                this.hide();
                                self.goBack(order_obj.from);
                            },
                            type: c.ui.Alert.STYLE_CONFIRM
                        }
                    ]
            });
            MyAlert.show();

            //收集异常信息
            try {
                Business.exceptionInfoCollect({
                    bustype: order_obj.bustype || '',
                    excode: 3,
                    extype: 1,
                    exdesc: msgArr.join(',') + ',BU传过来的参数：' + JSON.stringify(order_obj)
                });
            } catch (e) {

            }
            this.otherInfoFlag = true;
            return;
        }

        //判断是否是会员  新增卡用到
        order_obj.isload = order_obj.islogin ? 0 : 1;

        orderDetailStore.set(order_obj);

        //设置extend扩展参数
        //extend参数错误返回true
        if (result.setExtendParams(order_obj)) {
            return;
        }

        order_obj["indexurl"] = self.getViewUrl(); //location.hash;
        order_obj["indexUrl"] = location.href;  //保存支付首页url地址用于逻辑跳转
        order_obj["totalamount"] = order_obj.amount;

        if (cUtility.isInApp()) {
            var lipincard_flag = lipinCardEInfo.getAttr('flag_lipincard');
            lipinCardEInfo.setAttr('flag_lipincard', '');
            if (!lipincard_flag) {
                //hybrid里面不用JS控制跳转
                //Business.jumpDetailFn();
            }
        } else {
            //Edit sqsun 20141009
            Business.jumpDetailFn.call(this);
        }

        var _requestid = payMentOtherInfo.getAttr('requestid');

        if (_requestid && _requestid != order_obj.requestid) {
            payMentOtherInfo.remove();
            payMentStore.setAttr("verifiedPhone", null);
        }

        tktErrorStore && tktErrorStore.remove();

        //********  c_dong   ******************
        //看订单id是否和礼品卡store里面的id一样，如果不一样，那么store初始为默认的。调用resetParam()
        // 不保存状态
        paymentcard.resetParam();
        return true;
    }
    //解析Url参数 extend
    result.setExtendParams = function (order_obj) {
        var self = this;
        var extendObj = {}, extendError = false;
        try {
            var extOrigin = decodeURIComponent(Util.geturlQuery('extend') || ""),
                    extParams = "";
            if (Crypt.Base64.decode(extOrigin).length > 0) {
                extParams = JSON.parse(Crypt.Base64.decode(extOrigin));
                $.each(extParams, function (key, value) {
                    var val = value;
                    if (val == 'null' || val == 'undefined') {
                        val = '';
                    }
                    extendObj[key] = val;
                });
                console.log(JSON.stringify(extendObj));

                extendParamsStore.set(extendObj);
            } else {
                extendParamsStore.set({});
            }
        } catch (e) {
            Business.exceptionInfoCollect({
                bustype: order_obj.bustype || '',
                excode: 3,
                extype: 1,
                exdesc: 'Bu传递url解析异常' + e + 'BU传过来的extend参数：' + extOrigin
            });
            console.warn('Bu传递url解析异常' + e);
            var str = '系统异常，请重新提交订单！！！';
            var MyAlert = new c.ui.Alert({
                title: '提示信息',
                message: str,
                buttons: [
                        {
                            text: '确定',
                            click: function () {
                                this.hide();
                                window.history.back();
                            },
                            type: c.ui.Alert.STYLE_CONFIRM
                        }
                        ]
            });
            MyAlert.show();
            extendError = true;

        }
        return extendError;
    }

    //验证Url参数 格式
    result.verifyUrl = function () {

    }
    return result;
});