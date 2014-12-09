define(['c', 'cWidgetFactory', 'PayStore', 'CommonStore', 'cUtility', 'paymentPipe', 'Util'],
		function (c, widgetFactory, payStore, CommonStore, cUtility, paymentPipe, Util) {
		    /**
		    * @author lh_sun@ctrip.com
		    * @namespace 共用的业务逻辑代码
		    */
		    var paymentcard = payStore.PayMentCardParamStore.getInstance(); //存放礼品卡支付的信息5.4
		    //订单详细信息
		    var orderDetailStore = payStore.OrderDetailStore.getInstance();
		    var extendParamsStore = payStore.ExtendInfoStore.getInstance(); //扩展参数
		    var payMentOtherInfo = payStore.PayMentOtherInfo.getInstance(); //扩展参数
		    var AliReStore = payStore.Ali_ReStore.getInstance(); //支付宝跳转链接
		    var ToAliFlagStore = payStore.ToAliFlagStore.getInstance();
		    var tktErrorStore = payStore.tktErrorStore.getInstance();   //保存礼品卡金额异常状态store
		    var paymentWayStore = payStore.PaymentWayStore.getInstance();   //支付方式store
		    var selectBankStore = payStore.SelectBankStore.getInstance(); //选择银行store
		    var lipinCardEInfo = payStore.lipinCardEInfo.getInstance(); //礼品卡信息
		    var cashPayInfoStore = payStore.CashPayInfoStore.getInstance(); //现金支付store
		    var cBase = c.base, cDate = cBase.Date;
		    //保存BU传过来的token参数  lh_sun
		    var paramUrlTokenStore = payStore.ParamUrlTokenStore.getInstance();
		    //model请求header信息
		    var headerStore = CommonStore.HeadStore.getInstance();
		    var Guider = widgetFactory.create('Guider');
		    var payWay = "";


		    var ret = {
		        alertArr: [],
		        /**
		        * @author jianggd@ctrip.com
		        * @namespace 礼品卡ajax成功回调的函数
		        */
		        lipinCardExcuteCallback: function (json) {     //return false 表示礼品卡支付金额和实际金额不相符
		            //是礼品卡支付
		            //if (pmcard.tktinfo && pmcard.tktinfo.tktamount > 0) {
		            if (json && json.rc && json.rc == 5) {
		                return false;
		            }
		            return true;
		        },
		        matchModuleFn: function (str) {
		            var value = "",
                    arr = [],
                    tmpStr = "";

		            if (/webapp.+[^\/]/gi.test(str)) {
		                tmpStr = str.match(/webapp.+[^\/]/gi)[0];
		                arr = tmpStr.split("/");
		                if (arr.length > 1) {
		                    value = arr[1];
		                }
		            }
		            return value;
		        },
		        jump2App: function (href) {
		            //href = decodeURIComponent(href);
		            if (href) {
		                //alert(href);
		                var arr = href.split("#");
		                //alert(JSON.stringify(arr));
		                if (arr.length > 1) {
		                    var path = ret.matchModuleFn(arr[0]);
		                    var param = arr[1];
		                    if (path && param) {
		                        //alert(path + ":" + param);
		                        Guider.cross({
		                            path: path,
		                            param: "index.html#" + param
		                        });
		                    }
		                }
		            }
		        },
		        getAppPath: function (href) {
		            if (href) {
		                var arr = href.split("#");
		                if (arr.length > 1) {
		                    var path = ret.matchModuleFn(arr[0]);
		                    var param = arr[1];
		                    if (path && param) {
		                        return path + "/index.html#" + param;
		                    }
		                }
		            }
		            return "";
		        },

		        appendQuery: function (url, query) {
		            var urlquery = (url + '&' + query) || '';
		            return urlquery.replace(/[&?]{1,2}/, '?');
		        },

		        getJump2SuccessPageQueryStr: function (data) {
		            var extno = "";
		            var bilno = "";
		            var paytype = "";
		            var oid = "";
		            var bustype = "";
		            var price = "";
		            var orderDetail = orderDetailStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
		            orderDetail.extno && (extno = orderDetail.extno);
		            data["bilno"] && (bilno = data["bilno"]);
		            orderDetail.realpaytype && (paytype = orderDetail.realpaytype);

		            if (payMentOtherInfo.get() && payMentOtherInfo.getAttr('realoid') != 0) {
		                oid = payMentOtherInfo.getAttr('realoid');
		            } else {
		                oid = orderDetail.oid;
		            }

		            orderDetail.bustype && (bustype = orderDetail.bustype);
		            orderDetail.totalamount && (price = orderDetail.totalamount);

		            var querystr = ""
                .concat('externalNo=' + extno)
                .concat('&')
                .concat('billNo=' + bilno)
                .concat('&')
                .concat('payType=' + paytype)
                .concat('&')
                .concat('busType=' + bustype)
                .concat('&')
                .concat('price=' + price)
                .concat('&')
                .concat('orderID=' + oid);
		            return querystr;
		        },

		        getJump2FailPageQueryStr: function (data) {
		            var extno = "";
		            var bilno = "";
		            var oid = "";
		            var errorCode = "";
		            var errorMsg = "";
		            var bustype = "";
		            var price = "";
		            var orderDetail = orderDetailStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
		            orderDetail.extno && (extno = orderDetail.extno);
		            data["bilno"] && (bilno = data["bilno"]);

		            if (payMentOtherInfo.get() && payMentOtherInfo.getAttr('realoid') != 0) {
		                oid = payMentOtherInfo.getAttr('realoid');
		            } else {
		                oid = orderDetail.oid;
		            }

		            errorCode = data["rc"];
		            errorMsg = data["rmsg"];
		            orderDetail.bustype && (bustype = orderDetail.bustype);
		            orderDetail.totalamount && (price = orderDetail.totalamount);

		            var querystr = ""
                .concat('externalNo=' + extno)
                .concat('&')
                .concat('billNo=' + bilno)
                .concat('&')
                .concat('orderID=' + oid)
                .concat('&')
                .concat('ErrorCode=' + errorCode)
                .concat('&')
                .concat('busType=' + bustype)
                .concat('&')
                .concat('price=' + price)
                .concat('&')
                .concat('ErrorMessage=' + errorMsg);
		            return querystr;
		        },


		        jump2AppPage: function (isSuccess, data, href) {
		            // "http://waptest.ctrip.com/webapp/lipin/#booking.success?onum=000053814"
		            if (href && data) {
		                if (isSuccess) {
		                    var querystr = ret.getJump2SuccessPageQueryStr(data);
		                } else {
		                    var querystr = ret.getJump2FailPageQueryStr(data);
		                }

		                href = ret.appendQuery(href, querystr);
		                ret.jump2App(href);
		            }
		        },

		        jump2H5Page: function (isSuccess, data, href) {

		            href = decodeURIComponent(href);
		            if (isSuccess) {
		                var querystr = ret.getJump2SuccessPageQueryStr(data);
		            } else {
		                var querystr = ret.getJump2FailPageQueryStr(data);
		            }

		            var _href = ret.appendQuery(href, querystr);
		            location.href = _href;

		        },


		        /**
		        * @author jianggd@ctrip.com
		        * @namespace 第三方支付h5逻辑
		        */
		        H5Pay: function (result, sback, pback) {
		            var self = this;
		            var item = result;

		            //系统错误，直接抛出网络不给力,请稍候重试
		            if (typeof item.res != 'undefined' && item.res) {
		                self.hideLoading();
		                self.showToast("网络不给力,请稍候重试");
		                return;
		            }
		            if (result && result["rc"] == 0) {
		                var paymentwayid = result["paymentwayid"];
		                //alipay
		                if (paymentwayid == "EB_MobileAlipay") {
		                    var href = result["thirdpartyinfo"] && result["thirdpartyinfo"]["sig"];
		                    //Add by sqsun 20141024支付H5极简需要对服务端下发的href参数做encodeURL处理
		                    if (self.AliMclient) {
		                        href = href.replace(/\"/g, "").split("&");
		                        var tmp = null, tmpstr = '';
		                        for (var i = 0, l = href.length; i < l; i++) {
		                            tmp = href[i].split("=");
		                            if (tmp[0] == "sign") {
		                                tmpstr += tmp[0] + "=" + tmp[1] + "&"
		                            } else {
		                                tmpstr += tmp[0] + "=" + encodeURIComponent(tmp[1]) + "&"
		                            }
		                        }
		                        href = tmpstr.substr(0, tmpstr.length - 1);
		                        i = l = tmp = tmpstr = self.AliMclient = null;
		                    } //Add End
		                    window.location.href = href;
		                    return; //Add by sqsun 20141024
		                };

		                //weichatpay（只能在微信浏览器调起）
		                if (paymentwayid == "WechatScanCode") {
		                    var param = result["thirdpartyinfo"]["sig"];
		                    //------------------微信给的返回---------------------//
		                    var paraJSON = JSON.parse(param);

		                    if (typeof WeixinJSBridge == "undefined") {
		                        self.showToast("请通过微信访问");
		                    } else {
		                        // alert("调起微信JS API");
		                        WeixinJSBridge.invoke('getBrandWCPayRequest', paraJSON, function (res) {
		                            WeixinJSBridge.log(res.err_msg);

		                            if (res.err_msg == "get_brand_wcpay_request:ok") {
		                                location.href = sback;
		                            } else {
		                                try {
		                                    //收集异常信息
		                                    Business.exceptionInfoCollect({
		                                        bustype: orderDetailStore.getAttr('bustype'),
		                                        excode: 3,
		                                        extype: 3,
		                                        exdesc: '微信报错,错误信息为：' + res.err_msg + ',orderid:' + orderDetailStore.getAttr('oid')
		                                    });
		                                } catch (e) {

		                                }
		                                location.href = pback;
		                            }
		                        });
		                    }
		                    //------------------微信给的返回---------------------//
		                };
		            } else if (item.rc < 100) {
		                AliReStore.setAttr("requestid", ""); //第三方支付调起失败，清空ali_requestid，用户可以选择别的支付方式，不进行跳转 Add by sqsun 20141112
		                //重复提交订单处理逻辑
		                if (item.rc == 4) {
		                    var MyAlert = new c.ui.Alert({
		                        title: '提示信息',
		                        message: item.rmsg || "网络不给力,请稍候重试",
		                        buttons: [{
		                            text: '好的',
		                            click: function () {
		                                //ret.jump2H5Page(true, item, sback_url);
		                                ret.jump2H5Page(true, item, sback); //解决sback_url 报错未定义
		                            },
		                            type: c.ui.Alert.STYLE_CONFIRM
		                        }]
		                    });
		                    MyAlert.show();
		                    ret.alertArr.push(MyAlert);
		                } else if (item.rc == 7) {
		                    var MyAlert = new c.ui.Alert({
		                        title: '提示信息',
		                        message: item.rmsg || "网络不给力,请稍候重试",
		                        buttons: [
                                {
                                    text: "确定",
                                    click: function () {
                                        MyAlert.hide();
                                        //清空已经过风控标记
                                        paymentWayStore.setAttr("verifiedPhone", null);
                                        //0 为h5 第三方支付
                                        ret.PostCheck.call(self, 0, result, sback, pback);
                                    },
                                    type: c.ui.Alert.STYLE_CONFIRM
                                }
		                        ]
		                    });
		                    MyAlert.show();
		                    ret.alertArr.push(MyAlert);
		                } else {
		                    //支付错误跳转页面
		                    self.hideLoading();
		                    self.showToast(item.rmsg || "网络不给力,请稍候重试");
		                }
		            } else {
		                //ret.jump2H5Page(false, item, eback_url);
		                ret.jump2H5Page(false, item, pback); //解决eback_url 报错未定义
		            }
		        },

		        /**
		        * @author jianggd@ctrip.com
		        * @namespace 第三方支付app逻辑
		        */
		        AppPay: function (result, sback, rback, eback, payWayName, payWayId, subPayId) {
		            //alert("sback:" + sback + '\n' + "rback:" + rback + "\neback:" + eback);
		            var self = this;
		            //系统错误，直接抛出网络不给力,请稍候重试
		            if (typeof result.res != 'undefined' && result.res) {
		                self.showToast("网络不给力,请稍候重试");
		                return;
		            }
		            var surl = ret.getAppPath(sback);
		            var rurl = "";
		            var eurl = ret.getAppPath(eback);

		            if (rback) {
		                rurl = ret.getAppPath(rback);
		            }

		            var resultBody;
		            var isHasBody = result && result["resultBody"] && (resultBody = JSON.parse(result["resultBody"]));
		            var item = resultBody;

		            if (isHasBody && resultBody["rc"] == 0) {
		                //debug
		                payAppName = payWayName;

		                var payURL = resultBody["thirdpartyinfo"]["sig"];
		                Guider.pay.payOut({
		                    payAppName: payAppName,
		                    payURL: payURL,
		                    successRelativeURL: surl,
		                    detailRelativeURL: rurl
		                });
		            } else if (item.rc < 100) {
		                //重复提交订单处理逻辑
		                if (item.rc == 4) {
		                    var MyAlert = new c.ui.Alert({
		                        title: '提示信息',
		                        message: item.rmsg || "网络不给力,请稍候重试",
		                        buttons: [{
		                            text: '好的',
		                            click: function () {
		                                var sback_url = decodeURIComponent(orderDetailStore.getAttr("sback"));
		                                ret.jump2AppPage(true, item, sback_url);
		                            },
		                            type: c.ui.Alert.STYLE_CONFIRM
		                        }]
		                    });
		                    MyAlert.show();
		                    ret.alertArr.push(MyAlert);
		                } else if (item.rc == 7) {
		                    var MyAlert = new c.ui.Alert({
		                        title: '提示信息',
		                        message: item.rmsg || "网络不给力,请稍候重试",
		                        buttons: [
                                {
                                    text: "确定",
                                    click: function () {
                                        MyAlert.hide();
                                        //清空已经过风控标记
                                        paymentWayStore.setAttr("verifiedPhone", null);
                                        //1 为hybrid 第三方支付
                                        ret.PostCheck.call(self, 1, result, sback, rback, eback, payWayName, payWayId, subPayId);
                                    },
                                    type: c.ui.Alert.STYLE_CONFIRM
                                }
		                        ]
		                    });
		                    MyAlert.show();
		                    ret.alertArr.push(MyAlert);
		                } else {
		                    //支付错误跳转页面
		                    self.hideLoading();
		                    self.showToast(item.rmsg || "网络不给力,请稍候重试");
		                }
		            } else {
		                var eback_url = decodeURIComponent(orderDetailStore.getAttr("eback"));
		                ret.jump2AppPage(false, item, eback_url);
		            }
		        },
		        jumpToAlipay: function () {
		            payWay = "Alipay";
		            var self = this;
		            var _this = ret;
		            if (!!cUtility.isInApp()) { // hybrid 环境
		                lipinCardEInfo.setAttr('flag_lipincard', '');

		                ret.checkAppCallBack.call(self, []);

		                //  验证是否安装 支付钱包 
		                //-----------------------------//
		                //		            Guider.pay.checkStatus({
		                //		                callback: $.proxy(ret.checkAppCallBack, self)  //修复bind过来this上下文改变
		                //		            });

		                //-----------------------------//
		            } else { // H5 环境
		                if (orderDetailStore && orderDetailStore.get()) {
		                    self.showLoading();
		                    self.AliMclient = 0; //Add by sqsun 20141024标记是否调用支付宝H5极简收银
		                    var headobj = ret.getRequestHeader();
		                    var errHandler = function () {
		                        self.hideLoading();
		                        self.showToast("网络不给力,请稍后再试试吧");
		                    };
		                    var successCallBack = function (data) {
		                        self.hideLoading();
		                        if (data != null) {
		                            if (!ret.lipinCardExcuteCallback.call(null, data)) { //判断礼品卡实际支付和余额是否匹配，如不匹配则跳转至首页
		                                //保存钱包金额异常状态，重新101拉取最新礼品卡金额
		                                tktErrorStore.setAttr("tktUsed", 1);
		                                var MyAlert = new c.ui.Alert({
		                                    title: '提示信息',
		                                    message: '支付失败，请重新尝试',
		                                    buttons: [{
		                                        text: '确定',
		                                        click: function () {
		                                            var curHash = location.hash.split("?")[0].replace("#", "");  //获取当前场景名称
		                                            if (curHash != 'index') {
		                                                ret.removePayCardStore();
		                                                ret.goHome.call(self);   //跳转至首页
		                                            } else {
		                                                window.location.reload()
		                                            }
		                                        },
		                                        type: c.ui.Alert.STYLE_CONFIRM
		                                    }]
		                                });
		                                MyAlert.show();
		                                ret.alertArr.push(MyAlert);
		                                return; //屏蔽其他msg跳出
		                            }

		                            //设置单号
		                            //billl
		                            ret.setTempOid(data);

		                            //保存bilno唯一订单号
		                            if (data.bilno) {
		                                orderDetailStore.setAttr("bilno", data.bilno);
		                            }
		                            //如果有errormsg或者errorcode则保存
		                            if (data.ErrorCode) {
		                                orderDetailStore.setAttr("ErrorCode", data.rc);
		                            }
		                            if (data.ErrorMessage) {
		                                orderDetailStore.setAttr("ErrorMessage", data.rmsg);
		                            }

		                            //支付成功
		                            data.paymentwayid = "EB_MobileAlipay";
		                            var sback = decodeURIComponent(orderDetailStore.getAttr("sback")),
                                        eback = decodeURIComponent(orderDetailStore.getAttr("eback"));
		                            ret.H5Pay.call(self, data, sback, eback);

		                        } else {
		                            self.showToast("网络不给力,请稍后再试试吧");
		                        }
		                    };
		                    var curHash = self.getViewHash(); //location.hash.split("?")[0].replace("#", ""),//获取当前场景名称 Add by sqsun 20141024
		                    aliTypeid = 3;  //默认走支付宝WAP版
		                    if (curHash == "index" || curHash == 'selectpayment') {
		                        aliTypeid = 4; //支付宝H5极简
		                        self.AliMclient = 1; //标记支付宝调用H5极简
		                    } //Add End
		                    var dataParam = {
		                        "opttype": 1,
		                        "paytype": 4,
		                        "thirdpartyinfo": {
		                            "paymentwayid": "EB_MobileAlipay",
		                            "typeid": 0,
		                            "subtypeid": aliTypeid, //3为H5 wap，4为H5极简 Edit by sqsun 20141023
		                            "typecode": ToAliFlagStore.getAttr("bankcode") || "",
		                            "thirdcardnum": ToAliFlagStore.getAttr("thirdcardnum") || "", //卡bin识别的支付宝外列卡号
		                            "amount": orderDetailStore.getAttr("amount")
		                        }
		                    };
		                    _this.handlePay(dataParam, successCallBack, JSON.stringify(headobj), errHandler);
		                    //paymentPipe.pay(dataParam, successCallBack, JSON.stringify(headobj), errHandler, errHandler);
		                } else {
		                    self.showToast("网络不给力,请稍后再试试吧");
		                }
		            }

		        },
		        checkAppCallBack: function (result) {

		            var payFlag = false;
		            var self = this;
		            var typeid = 0;
		            var errHandler = function () {
		                self.hideLoading();
		                self.showToast("网络不给力,请稍后再试试吧");
		            };

		            var successCallBack = function (_data) {
		                _data = _data || {}; //Add by sqsun 20141023 数据做容错处理
		                var data = null;
		                self.hideLoading();

		                //这个一定要放到item = JSON.parse(item.resultBody);的前面
		                if (_data && _data.errorInformation) {
		                    //提示具体的管道错误信息
		                    self.showToast(_data.errorInformation);
		                    return;
		                }

		                if (!cUtility.isInApp()) { //in web
		                    data = _data;
		                } else { //in app
		                    data = _data.resultBody;
		                    data = $.parseJSON(data);
		                }
		                //添加礼品卡金额不足的问题(rc == 5)  by Jianggd 20141120
		                if (!ret.lipinCardExcuteCallback.call(null, data)) { //判断礼品卡实际支付和余额是否匹配，如不匹配则跳转至首页
		                    //保存钱包金额异常状态，重新101拉取最新礼品卡金额
		                    tktErrorStore.setAttr("tktUsed", 1);
		                    var MyAlert = new c.ui.Alert({
		                        title: '提示信息',
		                        message: '支付失败，请重新尝试',
		                        buttons: [{
		                            text: '确定',
		                            click: function () {
		                                var curHash = location.hash.split("?")[0].replace("#", "");  //获取当前场景名称
		                                if (curHash != 'index') {
		                                    ret.removePayCardStore();
		                                    ret.goHome.call(self);   //跳转至首页
		                                } else {
		                                    window.location.reload()
		                                }

		                            },
		                            type: c.ui.Alert.STYLE_CONFIRM
		                        }]
		                    });
		                    MyAlert.show();
		                    ret.alertArr.push(MyAlert);
		                    return; //屏蔽其他msg跳出
		                }

		                //设置单号
		                ret.setTempOid(data);

		                if (data != null) {
		                    //bybrid第三方跳转逻辑,
		                    var sback = decodeURIComponent(orderDetailStore.getAttr("sback")),
                                rback = decodeURIComponent(orderDetailStore.getAttr("rback")),
                                eback = decodeURIComponent(orderDetailStore.getAttr("eback"));

		                    var successQueryStr = ret.getJump2SuccessPageQueryStr(data);
		                    var errorQueryStr = ret.getJump2FailPageQueryStr(data);

		                    sback = ret.appendQuery(sback, successQueryStr);
		                    eback = ret.appendQuery(eback, errorQueryStr);

		                    ret.AppPay.call(self, _data, sback, rback, eback, payWayName, payWayId, subPayId);
		                } else {
		                    self.showToast("网络不给力,请稍后再试试吧");
		                }
		            };

		            if (result != null) {
		                if (payWay == "Alipay") {
		                    //储蓄卡外列统统走支付宝wap支付
		                    var _iswap = ToAliFlagStore.getAttr("is_wap");

		                    //		                    if (result["aliWalet"] == true && !_iswap) { //支付钱包
		                    //		                        payWayName = "aliWalet";
		                    //		                        payWayId = "EB_MobileAlipay";
		                    //		                        subPayId = 1;
		                    //		                        typeid = 0;
		                    //		                    } else if (result["aliQuickPay"] == true && !_iswap) { //快捷支付
		                    //		                        payWayId = "EB_MobileAlipay";
		                    //		                        payWayName = "aliQuickPay";
		                    //		                        subPayId = 2;
		                    //		                        typeid = 0;
		                    //		                    } else { //上面2个都没装 转 wap
		                    //		                        payWayId = "EB_MobileAlipay";
		                    //		                        payWayName = "wapAliPay";
		                    //		                        subPayId = 0;
		                    //		                        typeid = 0;
		                    //		                    }
		                    //5.10版本以后 走sdk
		                    //不是从卡bin和新增储蓄卡走储蓄卡外列 使用极简支付 hybrid

		                    if (!_iswap) {
		                        payWayName = "aliCounter";
		                        subPayId = 4;
		                        payWayId = "EB_MobileAlipay";
		                        typeid = 0;
		                    } else {
		                        payWayId = "EB_MobileAlipay";
		                        payWayName = "wapAliPay";
		                        subPayId = 0;
		                        typeid = 0;
		                    }

		                    /**
		                    else {
		                    payWayId = "EB_MobileAlipay";
		                    payWayName = "wapAliPay";
		                    subPayId = 0;
		                    typeid = 0;
		                    }
		                    **/
		                    payFlag = true;
		                }
		                if (payWay == "weixinPay") {
		                    if (result["weixinPay"] == true) { //已安装微信
		                        payWayId = "WechatScanCode";
		                        payWayName = "weixinPay";
		                        subPayId = 0; //native
		                        payFlag = true;
		                        typeid = 0;
		                    } else { //未装微信
		                        var MyAlert = new c.ui.Alert({
		                            title: '提示信息',
		                            message: '您尚未安装微信，是否现在下载安装？',
		                            buttons: [{
		                                text: '取消',
		                                click: function () {
		                                    this.hide();
		                                },
		                                type: c.ui.Alert.STYLE_CANCEL
		                            }, {
		                                text: '确定',
		                                click: function () {
		                                    var newWindUrl = "";
		                                    if ((result["platform"]).toUpperCase() == "IOS") {
		                                        newWindUrl = "http://itunes.apple.com/cn/app/id414478124";
		                                    } else if ((result["platform"]).toUpperCase() == "ANDROID") {
		                                        newWindUrl = "http://weixin.qq.com/m";
		                                    }

		                                    if (newWindUrl != "") {
		                                        Guider.jump({
		                                            url: newWindUrl,
		                                            targetModel: "browser"
		                                        });
		                                    }
		                                    this.hide();
		                                },
		                                type: c.ui.Alert.STYLE_CONFIRM
		                            }]
		                        });
		                        MyAlert.show();
		                        ret.alertArr.push(MyAlert);
		                    }
		                }

		                if (payFlag) {
		                    if (orderDetailStore && orderDetailStore.get()) {
		                        var headobj = ret.getRequestHeader();
		                        var dataParam = {
		                            "opttype": 1,
		                            "paytype": 4,
		                            "thirdpartyinfo": {
		                                "paymentwayid": payWayId,
		                                "typeid": typeid,
		                                "subtypeid": subPayId,
		                                "typecode": ToAliFlagStore.getAttr("bankcode") || "",
		                                "thirdcardnum": ToAliFlagStore.getAttr("thirdcardnum") || "", //卡bin识别的支付宝外列卡号
		                                "amount": orderDetailStore.getAttr("amount")
		                            }
		                        }
		                        self.showLoading();

		                        try {
		                            ret.handlePay(dataParam, successCallBack, JSON.stringify(headobj), errHandler);
		                        } catch (e) {

		                        }

		                        //paymentPipe.pay(dataParam,successCallBack,JSON.stringify(headobj),errHandler,errHandler);
		                    } else {
		                        self.showToast("网络不给力,请稍后再试试吧");
		                    }
		                }
		            }
		        },
		        jumpToWeiXinpay: function () {
		            payWay = "weixinPay";
		            var self = this;
		            if (cUtility.isInApp()) { // hybrid 环境
		                lipinCardEInfo.setAttr('flag_lipincard', '');
		                //  验证是否安装 微信 
		                //-----------------------------//
		                Guider.pay.checkStatus({
		                    callback: $.proxy(ret.checkAppCallBack, self)
		                });
		                //-----------------------------//
		            } else {
		                if (Util.isInWeichat()) { //微信公众
		                    if (orderDetailStore && orderDetailStore.get()) {
		                        self.showLoading();
		                        var headobj = ret.getRequestHeader();

		                        var dataParam = {
		                            "opttype": 1,
		                            "paytype": 4,
		                            "thirdpartyinfo": {
		                                "paymentwayid": "WechatScanCode", //微信
		                                "typeid": 0,
		                                "subtypeid": 1, //  JS API(H5)
		                                "typecode": "",
		                                "amount": orderDetailStore.getAttr("amount")
		                            }
		                        };

		                        var successHandler = function (data) {
		                            self.hideLoading();
		                            if (data != null) {
		                                if (!ret.lipinCardExcuteCallback.call(null, data)) { //判断礼品卡实际支付和余额是否匹配，如不匹配则跳转至首页
		                                    //保存钱包金额异常状态，重新101拉取最新礼品卡金额
		                                    tktErrorStore.setAttr("tktUsed", 1);
		                                    var MyAlert = new c.ui.Alert({
		                                        title: '提示信息',
		                                        message: '支付失败，请重新尝试',
		                                        buttons: [{
		                                            text: '确定',
		                                            click: function () {
		                                                var curHash = self.getViewHash(); //location.hash.split("?")[0].replace("#", "");  //获取当前场景名称
		                                                if (curHash != 'index') {
		                                                    ret.removePayCardStore();
		                                                    ret.goHome.call(self);   //跳转至首页
		                                                } else {
		                                                    window.location.reload()
		                                                }

		                                            },
		                                            type: c.ui.Alert.STYLE_CONFIRM
		                                        }]
		                                    });
		                                    MyAlert.show();
		                                    ret.alertArr.push(MyAlert);
		                                    return; //屏蔽其他msg跳出
		                                }
		                                //设置单号
		                                //billl
		                                ret.setTempOid(data);
		                                //保存bilno唯一订单号
		                                if (data.bilno) {
		                                    orderDetailStore.setAttr("bilno", data.bilno);
		                                }
		                                //如果有errormsg或者errorcode则保存
		                                if (data.ErrorCode) {
		                                    orderDetailStore.setAttr("ErrorCode", data.rc);
		                                }
		                                if (data.ErrorMessage) {
		                                    orderDetailStore.setAttr("ErrorMessage", data.rmsg);
		                                }
		                                //第三方微信支付处理逻辑
		                                data.paymentwayid = "WechatScanCode";
		                                var sback = decodeURIComponent(orderDetailStore.getAttr("sback")),
                                            eback = decodeURIComponent(orderDetailStore.getAttr("eback"));

		                                ret.H5Pay.call(self, data, sback, eback);
		                            } else {
		                                self.showToast("网络不给力,请稍后再试试吧");
		                            }
		                        };

		                        var errHandler = function () {
		                            self.hideLoading();
		                            self.showToast("网络不给力,请稍后再试试吧");
		                        };


		                        ret.handlePay(dataParam, successHandler, JSON.stringify(headobj), errHandler);
		                        //paymentPipe.pay(dataParam, successHandler, JSON.stringify(headobj), errHandler, errHandler);
		                    } else {
		                        self.showToast("网络不给力,请稍后再试试吧");
		                    }
		                }
		            }
		        },
		        //处理积分担保
		        toJiFenPay: function () {
		            var that = this;
		            var _this = ret;
		            var extParam = extendParamsStore && extendParamsStore.get() || {};

		            var textVal = "您确认使用<span class='corange'>" + extParam.integralGuranteeAmount + "</span>积分用于此订单担保（担保积分将被暂时冻结）？";

		            //创建积分担保提示框
		            var layer = new c.ui.Layer({
		                onCreate: function () {
		                    this.contentDom.html('<div class="cui-pop-box"><div class="cui-hd">积分担保<div id="jifen-grayload-close" class="cui-grayload-close" ></div></div>'
                                    + '<div class="cui-bd"><div class="p10">' + textVal + '</div><button class="paybtn w100" id="jiFenPayBtn">确认使用积分担保</button></div>');
		                    var closeBtn = this.contentDom.find("#jifen-grayload-close");
		                    closeBtn.click(function () {
		                        layer.remove();
		                    });
		                    var submitBtn = this.contentDom.find("#jiFenPayBtn");
		                    submitBtn.click(function () {
		                        layer.remove();
		                        jiFenPaySubmit();
		                    });
		                },
		                onShow: function () {
		                },
		                onHide: function () {
		                }
		            });
		            layer.show();

		            //积分担保 submit(积分担保不会与钱包模组混付)
		            var jiFenPaySubmit = function () {
		                var _param = null;
		                var orderdetail = orderDetailStore.get() || {}, //Edit by sqsun 20141023 数据做容错处理
                            sback_url = decodeURIComponent(orderdetail.sback),
                            extParamsObj = extendParamsStore && extendParamsStore.get(); //扩展store
		                var eback_url = decodeURIComponent(orderdetail.eback);
		                var paymentstore = paymentWayStore.get() || {};
		                var paymentwayid = paymentstore.guarantee && paymentstore.guarantee.length && paymentstore.guarantee[0].paymentwayid;
		                var jifenAmount = extParamsObj.integralGuranteeAmount || 0;
		                that.showLoading();
		                _param = {
		                    "opttype": 1,
		                    "paytype": 64,
		                    "guarantee": [{
		                        "paymentwayid": paymentwayid,
		                        "amount": jifenAmount
		                    }]
		                };

		                _param.payrestrict = extParamsObj["payrestrict"];

		                var headobj = _this.getRequestHeader();
		                var headstring = JSON.stringify(headobj);

		                var _callback = function (item) {
		                    item = item || {}; //Add by sqsun 20141023 数据做容错处理
		                    if (cUtility.isInApp()) {
		                        //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
		                        if (item.resultBody) {
		                            item = JSON.parse(item.resultBody);
		                        } else {
		                            //错误的时候，弹出网络不给力提示
		                            that.hideLoading();
		                            that.showToast("网络不给力,请稍候重试");
		                            return;
		                        }
		                    }

		                    //系统错误，直接抛出网络不给力,请稍候重试
		                    if (typeof item.res != 'undefined' && item.res) {
		                        that.hideLoading();
		                        that.showToast("网络不给力,请稍候重试");
		                        return;
		                    }

		                    if (item.rc == 0) {
		                        if (cUtility.isInApp()) {
		                            //jump2AppSuccessPage 第一个参数为true时 跳转sback成功页面
		                            _this.jump2AppPage(true, item, sback_url);
		                        } else {
		                            _this.jump2H5Page(true, item, sback_url);
		                        }
		                    } else if (item.rc < 100) {
		                        //支付错误跳转页面
		                        that.hideLoading();
		                        that.showToast(item.rmsg || "网络不给力,请稍候重试");
		                    } else {
		                        if (cUtility.isInApp()) {
		                            //jump2AppSuccessPage 第一个参数为false时 跳转eback支付失败页面
		                            _this.jump2AppPage(false, item, eback_url);
		                        } else {
		                            _this.jump2H5Page(false, item, eback_url);
		                        }
		                    }
		                };

		                _this.handlePay(_param, _callback, headstring, function () {
		                    that.hideLoading();
		                    that.showToast("网络不给力,请稍候重试");
		                });
		            }
		        },
		        /**
		        * @author sqsun@ctrip.com
		        * @description 处理现金支付
		        * @param e
		        * @constructor
		        */
		        toCashPayFn: function (e) {
		            var that = this,
                        _this = ret,
                        payInfo = cashPayInfoStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
		            //服务端下发失败做容错提示
		            if (!payInfo) {
		                that.showToast("提交失败！请稍后再试");
		                return;
		            }

		            //现金支付下发提交Function
		            function cashPaySubmit() {
		                var _param = null;
		                var orderdetail = orderDetailStore.get() || {},  //Edit by sqsun 20141023 数据做容错处理
                            sback_url = decodeURIComponent(orderdetail.sback),
                            extParamsObj = extendParamsStore && extendParamsStore.get() || {}; //扩展store //Edit by sqsun 20141023 数据做容错处理
		                var eback_url = decodeURIComponent(orderdetail.eback);
		                that.showLoading();
		                _param = {
		                    "opttype": 1,
		                    "paytype": 16,
		                    "cashinfo": [{
		                        "amount": orderdetail.amount
		                    }]
		                };

		                _param.payrestrict = extParamsObj["payrestrict"];

		                var headobj = _this.getRequestHeader();
		                var headstring = JSON.stringify(headobj);
		                var _callback = function (item) {
		                    item = item || {}; //Add by sqsun 20141023 数据做容错处理
		                    if (cUtility.isInApp()) {
		                        //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
		                        if (item.resultBody) {
		                            item = JSON.parse(item.resultBody);
		                        } else {
		                            //错误的时候，弹出网络不给力提示
		                            that.hideLoading();
		                            that.showToast("网络不给力,请稍候重试");
		                            return;
		                        }
		                    }

		                    //系统错误，直接抛出网络不给力,请稍候重试
		                    if (typeof item.res != 'undefined' && item.res) {
		                        that.hideLoading();
		                        that.showToast("网络不给力,请稍候重试");
		                        return;
		                    }

		                    if (item.rc == 0) {
		                        if (cUtility.isInApp()) {
		                            //jump2AppSuccessPage 第一个参数为true时 跳转sback成功页面
		                            _this.jump2AppPage(true, item, sback_url);
		                        } else {
		                            _this.jump2H5Page(true, item, sback_url);
		                        }
		                    } else if (item.rc < 100) {
		                        //支付错误跳转页面
		                        that.hideLoading();
		                        that.showToast(item.rmsg || "网络不给力,请稍候重试");
		                    } else {
		                        if (cUtility.isInApp()) {
		                            //jump2AppSuccessPage 第一个参数为false时 跳转eback支付失败页面
		                            _this.jump2AppPage(false, item, eback_url);
		                        } else {
		                            _this.jump2H5Page(false, item, eback_url);
		                        }
		                    }
		                };
		                _this.handlePay(_param, _callback, headstring, function () {
		                    that.hideLoading();
		                    that.showToast("网络不给力,请稍候重试");
		                });
		                /*paymentPipe.pay(_param, _callback, headstring, function () {
		                that.hideLoading();
		                that.showToast("网络不给力,请稍候重试");
		                });*/
		            }

		            var infoList = payInfo["dsettings"];
		            var infoObj = _.find(infoList, function (obj) {
		                return obj.type == 2;
		            });

		            if (infoObj && infoObj.value && infoObj.value.trim().length > 0) {  //现金支付dsetting不为空的情况下显示现金提示支付弹窗
		                var layer = new c.ui.Layer({
		                    onCreate: function () {
		                        var val = infoObj.value || '';
		                        //替换换行符
		                        val = val.replace(/\u000a/img, '<br />');
		                        //显示1101服务下发的现金支付文案
		                        this.contentDom.html('<div class="cui-pop-box"><div class="cui-hd">现金支付<div class="cui-grayload-close" ></div></div>'
                                    + '<div class="cui-bd"><div class="p10"><h3>注意事项</h3>' + val + '<button class="paybtn w100" id="cashPayBtn">确认使用现金支付</button></div></div>');
		                        var closeBtn = this.contentDom.find(".cui-grayload-close");
		                        closeBtn.click(function () {
		                            layer.remove();
		                        });
		                        var submitBtn = this.contentDom.find("#cashPayBtn");
		                        submitBtn.click(function () {
		                            console.log("使用现金支付");
		                            layer.remove();
		                            cashPaySubmit();
		                        });
		                    },
		                    onShow: function () {
		                    },
		                    onHide: function () {
		                    }
		                });
		                layer.show();
		            } else {
		                //Add by sqsun 20141031 服务下发错误做容错处理
		                try {
		                    var MyAlert = new c.ui.Alert({
		                        title: '',
		                        message: infoList[0].value,
		                        buttons: [
                                    {
                                        text: '取消',
                                        click: function () {
                                            console.log("取消");
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '确定',
                                        click: function () {
                                            console.log("确定");
                                            this.hide();
                                            cashPaySubmit();
                                        },
                                        type: c.ui.Alert.STYLE_CONFIRM
                                    }
		                        ]
		                    });
		                    MyAlert.show();
		                    that.alertArr.push(MyAlert);
		                } catch (e) {
		                    var MyAlert = new c.ui.Alert({
		                        title: '提示信息',
		                        message: '系统异常，请重新提交订单(700)',
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
		                            exdesc: '现金支付服务下发错误' + "ErrorCode:700" + "_token:" + JSON.stringify(odtStore) + ',目前现金支付服务下发的报文为：' + JSON.stringify(item)
		                        });
		                    } catch (e) {

		                    }
		                }
		            }
		        },
		        /**
		        * @author sqsun@ctrip.com
		        * @description 跳转支付宝之前function
		        * @param e
		        * @constructor
		        */
		        toAlipayBefore: function () {
		            var that = this,
                        _this = ret;
		            //重置支付宝wap支付的store
		            ToAliFlagStore.setAttr("is_wap", null);
		            var paymentstore = paymentWayStore.get() || {}, //支付localstore
                        serverPayEntry = paymentstore["rusetype"] || 1; //支付宝支付 担保（2） 或 预付（1）
		            extendParamsStore.setAttr('serverPayEntry', serverPayEntry);
		            if (serverPayEntry == 2) {
		                var MyAlert = new c.ui.Alert({
		                    title: '',
		                    message: '担保金额将预先扣除，订单成交后3个工作日内返还至您的担保账户。',
		                    buttons: [{
		                        text: '取消',
		                        click: function () {
		                            this.hide();
		                        }
		                    }, {
		                        text: '确定',
		                        click: function () {
		                            this.hide();
		                            //支付宝支付重置跳转wap的指示
		                            AliReStore.setAttr("requestid", orderDetailStore.getAttr("requestid"));
		                            ToAliFlagStore.setAttr("jump_ali", 1);
		                            //一下代码仅适用于H5
		                            if (!cUtility.isInApp()) {
		                                window.onpageshow = function () {
		                                    //Edit sqsun 20141009
		                                    _this.jumpDetailFn.call(that);
		                                };
		                            }
		                            _this.jumpToAlipay.call(that);
		                        },
		                        type: c.ui.Alert.STYLE_CONFIRM
		                    }]
		                });
		                MyAlert.show();
		                that.alertArr.push(MyAlert);
		            } else {
		                //支付宝支付重置跳转wap的指示
		                AliReStore.setAttr("requestid", orderDetailStore.getAttr("requestid"));
		                ToAliFlagStore.setAttr("jump_ali", 1);
		                //一下代码仅适用于H5
		                if (!cUtility.isInApp()) {
		                    window.onpageshow = function () {
		                        //Edit sqsun 20141009
		                        _this.jumpDetailFn.call(that);
		                    };
		                }
		                _this.jumpToAlipay.call(that);
		            }
		        },
		        /**
		        * @author sqsun@ctrip.com
		        * @description 处理建行APP支付业务
		        */
		        JianhangAppPay: function (e) { //跳转到建行APP支付
		            Util.stopEvent(e);
		            var self = this;
		            if (orderDetailStore && orderDetailStore.get()) {
		                self.showLoading();
		                var headobj = ret.getRequestHeader();
		                headobj = JSON.stringify(headobj); //Add by sqsun 解决header为JSON对象时进入JSON.parse()转义错误
		                var errHandler = function () {
		                    self.hideLoading();
		                    self.showToast("网络不给力,请稍后再试试吧");
		                };
		                var orderdetail = orderDetailStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
		                var sback_url = decodeURIComponent(orderdetail.sback);

		                var successCallBack = function (data) {
		                    console.log(data);
		                    self.hideLoading();
		                    if (data != null && data.rc === 0) {
		                        //设置单号
		                        //billl
		                        ret.setTempOid(data);
		                        //保存bilno唯一订单号
		                        if (data.bilno) {
		                            orderDetailStore.setAttr("bilno", data.bilno);
		                        }

		                        //获取APP运行环境
		                        var osType = extendParamsStore.getAttr("osType");
		                        if (osType == 1) { //IOS环境
		                            window.MBC_PAYINFO = function () {
		                                return "{" + data.thirdpartyinfo['sig'] + "}";
		                            };
		                            window.location = "/mbcpay.b2c";
		                        } else if (osType == 2) {  //android环境
		                            window.mbcpay.b2c(data.thirdpartyinfo['sig']);
		                        }
		                    } else if (data.rc === 4) { //重复提交定单提醒
		                        var MyAlert = new c.ui.Alert({
		                            title: '提示信息',
		                            message: data.rmsg || "网络不给力,请稍候重试",
		                            buttons: [{
		                                text: '好的',
		                                click: function () {
		                                    ret.jump2H5Page(true, data, sback_url);
		                                },
		                                type: c.ui.Alert.STYLE_CONFIRM
		                            }]
		                        });
		                        MyAlert.show();
		                        self.alertArr.push(MyAlert)
		                    } else {
		                        self.showToast("网络不给力,请稍后再试试吧");
		                    }
		                };

		                var dataParam = {
		                    "opttype": 1,
		                    "paytype": 4,
		                    "thirdpartyinfo": {
		                        "paymentwayid": "EB_CCB",
		                        "typeid": 0,
		                        "subtypeid": 0, //H5 wap
		                        "typecode": 0,
		                        "amount": orderDetailStore.getAttr("amount")
		                    }
		                };
		                ret.handlePay(dataParam, successCallBack, headobj, errHandler);

		            } else {
		                self.showToast("网络不给力,请稍后再试试吧");
		            }
		        },
		        handlePay: function (dataParam, successCallBack, headobj, errHandler) {
		            paymentPipe.pay(dataParam, successCallBack, headobj, errHandler, errHandler);
		        }
		    };

		    /**
		    * @author lh_sun@ctrip.com
		    * @description 获取model request head信息
		    */

		    ret.getRequestHeader = function () {
		        var header = headerStore.get() || {};
		        //syscode hybrid:32  h5:09
		        var syscode = "09";
		        var cver = '1.0';

		        if (cUtility.isInApp()) {
		            //syscode = localStorage.APPINFO && localStorage.APPINFO.platform && localStorage.APPINFO.platform == 1 ? "12" : "32"
		            var deviceInfo = JSON.parse(localStorage.DEVICEINFO);
		            syscode = deviceInfo.syscode;
		            cver = '600';
		        }
		        //解决报系统异常时候，发送1401时候，auth没传问题  lh_sun
		        var auth = orderDetailStore.getAttr("auth") || paramUrlTokenStore.getAttr("auth") || "";
		        $.extend(header, {
		            cid: '63528842641978287800',
		            syscode: syscode,
		            //当前的app版本，每次版本迭代，必需改
		            cver: cver,
		            auth: auth
		        });


		        //hybrid下 clientid动态获取  lh_sun
		        if (cUtility.isInApp()) {
		            header.cid = localStorage.GUID || '63528842641978287800';
		        }


		        return header;
		    };

		    /**
		    * @author lh_sun@ctrip.com
		    * @description 返回首页
		    */

		    ret.goHome = function () {
		        var self = this;
		        var link = orderDetailStore.getAttr("indexurl");
		        setTimeout(function () {
		            self.back(link);
		        }, 0)
		    };

		    /**
		    * @author lh_sun@ctrip.com
		    * @description 清空礼品卡store
		    */

		    ret.removePayCardStore = function () {
		        paymentcard.resetParam();
		    };

		    /**
		    * @author lh_sun@ctrip.com
		    * @description 设置oid
		    */

		    ret.setTempOid = function (data) {
		        //门票刚进支付的时候，传的是临时单号，301返回的是正式单号
		        if (data["oidex"] && data["oidex"] != 0) {
		            payMentOtherInfo.setAttr('requestid', orderDetailStore.getAttr("requestid"));
		            payMentOtherInfo.setAttr('realoid', data["oidex"]);
		        }

		    };


		    /**
		    * @author lh_sun@ctrip.com
		    * @description 是否支持预授权
		    */

		    ret.isPreAuth = function () {
		        var result = false,
	        		paramObj = extendParamsStore && extendParamsStore.get();
		        if (paramObj && paramObj.IsNeedPreAuth) {
		            result = true;
		        }

		        return result;
		    };



		    /**
		    * @author lh_sun@ctrip.com
		    * @description 异常信息收集
		    */

		    ret.exceptionInfoCollect = function (options) {

		        options = $.extend({
		            bustype: '',
		            excode: '',
		            extype: 1,
		            exdesc: ''
		        }, options || {});

		        var headobj = ret.getRequestHeader();
		        var errHandler = function () { };

		        paymentPipe.exceptionInfoCollect(options, function () { }, JSON.stringify(headobj), errHandler,
                errHandler);
		    };

		    //判断101下发的是否担保 1.支付|预授权 2.担保
		    ret.getPayMeth = function () {
		        var result = 1; //result: 1:支付，预授权 ；2：担保；
		        var extParamsObj = paymentWayStore.get();
		        if (extParamsObj) {
		            if (extParamsObj.rusetype & 4) {
		                result = 1;
		            } else if (extParamsObj.rusetype & 2) {
		                result = 2;
		            }
		        }
		        return result;
		    };

		    //担保情景下  有效期必须晚于当前月+1
		    ret.isAfterCurDate = function (valiDate) {
		        var flag = true;
		        if (!valiDate) {
		            return flag;
		        }
		        var month = cDate.parse(valiDate).format('m'),
                year = cDate.parse(valiDate).format('Y');
		        var date = new Date(), currMon = date.getMonth() + 1,
                currYear = date.getFullYear() ? date.getFullYear() : 2014;
		        //担保+1月 大于12月年+1 月变成1
		        if (currMon + 1 > 12) {
		            currMon = 1;
		            currYear += 1;
		        } else {
		            currMon += 1;
		        }

		        if (year < currYear) {
		            flag = false;
		        } else if (year == currYear) {
		            if (month < currMon) {
		                flag = false;
		            }
		        }

		        return flag;
		    };

		    //是否超出业务指定时间 true 有效期大于业务
		    ret.isBeforeGuranteeDay = function (expTimeStr) {
		        //###只需要将 expTimeStr  转换为201407的格式就好  其它转换不需要
		        var extStore = extendParamsStore, result = false;
		        var buExpTimeStr = extStore.getAttr("lastGuranteeDay");
		        //不存在业务指定时间时 默认不会超出业务指定时间
		        if (!buExpTimeStr) {
		            return true;
		        }
		        var _buExpTimeStr = cDate.parse("" + buExpTimeStr).format("Ym");
		        var buExpTime = _buExpTimeStr ? parseInt(_buExpTimeStr) : 0;

		        var mmStr = cDate.parse(expTimeStr).format('m'),
                yyStr = cDate.parse(expTimeStr).format('Y');
		        var expTime = yyStr + mmStr;

		        if (expTime >= buExpTime) {
		            result = true;
		        }
		        return result;
		    };

		    ret.getRiskCtrl = function () {
		        var result = 0;
		        if (extendParamsStore && extendParamsStore.get()) {
		            result = extendParamsStore.get().IsNeedCardRisk ? 1 : 0;
		        }
		        return result;
		    };

		    //第三方支付模组封装
		    ret.unionPayCollection = function (boxobj) {
		        var _this = ret,
                    that = this;
		        var paymentstore = paymentWayStore.get() || {}, //支付localstore
                    extParam = extendParamsStore && extendParamsStore.get() || {}, //BU第三方扩展localstore
                    useEType = extParam["useEType"], //支付或担保 2担保 1支付
                    isAlicardtxt = 0, //是否还原储蓄卡默认文案
                    setAlicardtxt = ''; //限卡但支持支付宝时，储蓄卡显示为默认文案

		        var payTypeListCard = 0,   //| 储蓄卡信用卡
                    payTypeListThird = 0,  //| 第三方支付
                    payalipayWailie = 0,   //| 支付宝钱包支付/表示储蓄卡外列
                    payTypeListCash = 0;   //| 现金支付
		        payTypeListJifen = 0;  //积分担保
		        /*
		        == 1 可以支付 == 0 未在白名单中不能用于支付
		        */

		        var cardlist = paymentstore["cards"] || [], //银行卡集合 //Edit by sqsun 20141023 数据做容错处理
                    payTypeList = paymentstore["paytype"] || [], //读取localstorage中的paytype//Edit by sqsun 20141023 数据做容错处理
                    cashinfo = orderDetailStore.getAttr("CashInfo"), //读取localstorage中的CashInfo
                    thirdpartylist = paymentstore["thirdpartylist"], //读取localstorage中的第三方支付列表
                    thirdExno = extParam["osType"]; //获取BU传过来的建行os类型,第三方合作支付必传字段

		        var oldcardlist = [], //曾用卡列表
                    haveDC = 0, //支付方式包含储蓄卡
                    haveCD = 0, //支付方式包含信用卡
                    oldcardtext = '', //是否有曾用卡时设置“新增文案”
                    finalPayWay = 0, //当前支付方式页的支付方式，1 -> 信用卡/储蓄卡 2 -> 微信 3 -> 支付宝 4 -> 现金支付
                    afterText = "支付", //担保，支付 扩展文字
                    curHash = that.getViewHash(); //location.hash.split("?")[0].replace("#", "");  //获取当前场景名称

		        //验证101下发的银行卡，做交集
		        if (payTypeList) {
		            if (payTypeList & 2) {
		                payTypeListCard = 1; //储蓄卡信用卡可用
		            }
		            if (payTypeList & 4) {
		                payTypeListThird = 1; //第三方支付可用
		            }
		            if (payTypeList & 8) {
		                payalipayWailie = 1; //支付宝钱包支付/表示储蓄卡外列可用
		            }
		            if (payTypeList & 16) {
		                payTypeListCash = 1; //现金支付可用
		            }
		        }

		        //是否显示积分担保(依赖101接口返回 而不是Bu传入的参数)
		        //H5 不支持积分担保
		        if (cUtility.isInApp() && paymentstore["paytype"] && (paymentstore["paytype"] & 64)) {
		            payTypeListJifen = 1;
		        }
		        /**
		        * 验证储蓄卡信用卡可用时 显示并设置 担保，支付文案
		        */
		        if (payTypeListCard) {
		            //位运算出曾用卡列表
		            for (var i = 0, l = cardlist.length; i < l; i++) {
		                var _cardlist = cardlist[i];
		                //status支持位运算
		                if (_cardlist.status & 1 == 1) {
		                    oldcardlist.push(_cardlist);
		                }
		                if (_cardlist.category == 3) {
		                    haveDC = 1;
		                } else {
		                    haveCD = 1;
		                }
		            }

		            if (oldcardlist.length > 0) {
		                oldcardtext = '新增'
		            }

		            //验证担保与支付文案
		            if (useEType == 2) {
		                afterText = "担保";
		            }

		            //限卡且只有一张卡时，修改文案
		            if (_this.isSameCards()) {
		                that.els.c_payment_paymentnote.show(); //显示限卡文案提示
		                isAlicardtxt = 2; //有第三方或现金支付
		                if (payalipayWailie) { //支持支付宝支付，还原储蓄卡默认文案
		                    isAlicardtxt = 1; //支付宝储蓄卡
		                    setAlicardtxt = '<li id="c_payment_global_bankcard"><i class="pay_2"></i><div class="valign">' + oldcardtext + '储蓄卡' + afterText + '</div></li>';
		                }
		                oldcardtext = oldcardtext + cardlist[0].typename;
		            }
		        }

		        //验证并创建第三方支付DOM节点对象
		        var _creditcardObj = $("#c_payment_global_creditcard"), //新增信用卡支付
                    _bankcardObj = $("#c_payment_global_bankcard"), //新增储蓄卡支付
                    _wechatscanObj = $("#c_payment_global_wechatscan"), //微信支付
                    _mobilealiObj = $("#c_payment_global_mobileali"), //支付宝支付
                    _cashpayObj = $("#c_payment_global_cashpay"), //现金支付
                    _jianhangappObj = $("#c_payment_global_jianhangapp"), //现金支付
                    _jifenObj = $("#c_payment_global_jifen"), //现金支付
                    _viewTemp = [
                        '<li id="c_payment_global_wechatscan"><i class="pay_3"></i><div class="valign">微信' + afterText + '</div></li>',
                        '<li id="c_payment_global_creditcard"><i class="pay_1"></i><div class="valign">' + oldcardtext + '信用卡' + afterText + '</div></li>',
                        '<li id="c_payment_global_bankcard"><i class="pay_2"></i><div class="valign">' + oldcardtext + '储蓄卡' + afterText + '</div></li>',
                        '<li id="c_payment_global_mobileali"><i class="pay_4"></i><div class="valign">支付宝' + afterText + '<p class="cgray">支持各大银行信用卡和储蓄卡</p></div></li>',
                        '<li id="c_payment_global_cashpay"><i class="pay_5"></i><div class="valign">现金' + afterText + '</div></li>',
                        '<li id="c_payment_global_jianhangapp"><i class="pay_6"></i><div class="valign">建行APP支付</div></li>',
                        '<li id="c_payment_global_jifen"><i class="pay_7"></i><div class="valign">积分担保</div></li>'
                    ], //支付按钮HTML
                    _showItemArr = []; //需要显示的支付按钮引索号

		        //如果限卡时，支持多个支付方式，去除被限银行的支付文案,同时还原储蓄卡文案
		        if (isAlicardtxt === 1) {
		            _viewTemp[1] = _viewTemp[1].replace(afterText, "");
		            _viewTemp[2] = setAlicardtxt;
		            setAlicardtxt = null;
		        } else if (isAlicardtxt === 2) {
		            _viewTemp[1] = _viewTemp[1].replace(afterText, "");
		            _viewTemp[2] = _viewTemp[2].replace(afterText, "");
		        }

		        //验证是否有微信支付
		        if (_wechatscanObj.length > 0) {
		            _showItemArr.push(_wechatscanObj)
		        }

		        //验证是否有新增信用卡支付
		        if (_creditcardObj.length > 0) {
		            _showItemArr.push(_creditcardObj)
		        }

		        //验证是否有新增储蓄卡支付
		        if (_bankcardObj.length > 0) {
		            _showItemArr.push(_bankcardObj)
		        }

		        //验证是否有支付宝支付
		        if (_mobilealiObj.length > 0) {
		            _showItemArr.push(_mobilealiObj)
		        }

		        //验证是否有现金支付
		        if (_cashpayObj.length > 0) {
		            _showItemArr.push(_cashpayObj)
		        }

		        //验证是否有建行APP支付
		        if (_jianhangappObj.length > 0) {
		            _showItemArr.push(_jianhangappObj)
		        }

		        //验证是否有积分担保
		        if (_jifenObj.length > 0) {
		            _showItemArr.push(_jifenObj)
		        }
		        //如果已经创建了支付对象，直接移动拷贝
		        if (_showItemArr.length > 0) {
		            var _objParent = _showItemArr[0].parent();
		            boxobj.html(_objParent.html());
		            _objParent.html("")
		            return
		        }

		        //获取微信文案方法
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

		        //显示信用卡
		        if (haveCD) {
		            _showItemArr[1] = 1
		        }
		        //显示储蓄卡
		        //payalipayWailie表示储蓄卡外列
		        if (haveDC || payalipayWailie) {
		            _showItemArr[2] = 2
		        }

		        //payTypeListThird 白名单不支持第三方支付时隐藏第三方支付模块
		        if (thirdpartylist && thirdpartylist.length > 0 && payTypeListThird) {
		            //微信返现的文本
		            var weixinInfo = getWeiXinInfo(paymentstore["dsettings"]);
		            //是否显示微信返现
		            var isDisplayWXFX = !_.isEmpty(weixinInfo) && weixinInfo["5"] && weixinInfo["6"];
		            //有促销文案更新微信支付文案
		            if (isDisplayWXFX) {
		                weixinInfo["5"] = _.escape(weixinInfo["5"].substring(0, 6));
		                weixinInfo["6"] = _.escape(weixinInfo["6"].substring(0, 12));
		                _viewTemp[0] = _viewTemp[0].replace('微信' + afterText, '微信' + afterText + ' <em class="payicon_tips c_payment_index_weixin_title">' + weixinInfo["5"] + '</em><p class="corange c_payment_index_weixin_content">' + weixinInfo["6"] + '</p>');
		            }
		            for (var i = 0, j = thirdpartylist.length; i < j; i++) {
		                var _paywayid = thirdpartylist[i].paymentwayid;
		                if (cUtility.isInApp()) { // hybrid 环境
		                    //在微信公众环境下，显示微信
		                    if (_paywayid == "WechatScanCode") {
		                        //修改数字键盘问题  slh
		                        var ugSystemVer = Util.getSystemVer();
		                        //ios hybird 
		                        if (ugSystemVer.platform == 3) {
		                            //检查手机是否安装微信
		                            Guider.pay.checkStatus({
		                                callback: function (result) {
		                                    //result.weixinPay为true表示安装了微信，否则不显示
		                                    //alert('result:' + JSON.stringify(result));
		                                    if (result.weixinPay) {
		                                        _showItemArr[0] = 0;
		                                    }
		                                }
		                            });
		                        } else {
		                            _showItemArr[0] = 0;
		                        }
		                    } else {
		                        if (_paywayid == "OGP_Alipay" || _paywayid == "EB_MobileAlipay") {
		                            //第三方担保显示支付宝支付
		                            _showItemArr[3] = 3;
		                        }
		                    }
		                } else { // H5
		                    if (thirdExno) { //验证是否是第三方合作支付
		                        if (_paywayid == "EB_CCB") {
		                            //建行APP支付显示
		                            _showItemArr[5] = 5;
		                            break;
		                        }
		                    } else {
		                        if (_paywayid == "WechatScanCode") {
		                            //在微信公众环境下，显示微信
		                            if (Util.isInWeichat()) {
		                                _showItemArr[0] = 0;
		                            }
		                        } else {
		                            if (_paywayid == "OGP_Alipay" || _paywayid == "EB_MobileAlipay") {
		                                //第三方担保显示支付宝支付
		                                _showItemArr[3] = 3;
		                            }
		                        }
		                    }
		                }
		            }
		            if (!thirdExno) {
		                //服务端下发了建行APP支付，但不是APP过来的BU
		                _showItemArr.splice(5, 1);
		            }
		        } else {
		            //下发无第三方支付时隐藏第三方支付模块
		            //所有第三方现金支付和新增信用卡储蓄卡模块只有在没有上一次支付方式并且没有常用卡的情况下显示
		            if (payTypeList & 8 && finalPayWay == 0 && oldcardlist.length < 1) {
		                _showItemArr[3] = 3;
		            }
		            _showItemArr.splice(0, 1);
		        }

		        //判断是否显示现金支付
		        if (payTypeListCash && cashinfo) {
		            _showItemArr[4] = 4;
		        }

		        //判断是否显示积分担保
		        if (payTypeListJifen) {
		            _showItemArr[6] = 6;
		        }

		        //如果没有其它支付 隐藏其BOX对象
		        if (_showItemArr.length < 1) {
		            boxobj.hide();
		            return
		        } else {
		            var _showItems = '',
                        _Itemtemp = '';
		            _showItemArr.sort(function (a, b) { return a - b });
		            for (var i = 0, len = _showItemArr.length; i < len; i++) {
		                _Itemtemp = _viewTemp[_showItemArr[i]];
		                if (_Itemtemp) {
		                    _showItems += _Itemtemp
		                }
		            }
		            boxobj.html(_showItems);
		            _showItems = null;
		            _Itemtemp = null;
		        }

		        var _parenteObj = $("div#main");
		        //新增信用卡事件
		        _parenteObj.on("click", "#c_payment_global_creditcard", function (e) {
		            Util.stopEvent(e);
		            var curHash = that.getViewHash(); //location.hash.split("?")[0].replace("#", "");
		            var _subPayType = extParam["subPayType"];
		            var _isPayRestrict = extParam["isPayRestrict"];

		            if (!_subPayType && !_isPayRestrict) {
		                that.forward("cardbin?from=" + curHash);
		            } else {
		                that.forward("selectbank?from=" + curHash);
		            }
		        });

		        //新增储蓄卡支付事件
		        _parenteObj.on("click", "#c_payment_global_bankcard", function (e) {
		            Util.stopEvent(e);
		            var curHash = that.getViewHash(); // location.hash.split("?")[0].replace("#", "");
		            if (cUtility.isInApp()) {
		                AliReStore.setAttr("requestid", "");
		            }
		            that.forward("selectdpstcard?from=" + curHash);
		        });

		        //微信支付事件
		        _parenteObj.on("click", "#c_payment_global_wechatscan", function (e) {
		            Util.stopEvent(e);
		            _this.showPromptMask.call(that, 2, function () {
		                var ownself = this;
		                //支付宝支付重置跳转wap的指示
		                AliReStore.setAttr("requestid", orderDetailStore.getAttr("requestid"));
		                ToAliFlagStore.setAttr("jump_ali", 1);
		                //一下代码仅适用于H5
		                if (!cUtility.isInApp()) {
		                    window.onpageshow = function () {
		                        //Edit sqsun 20141009
		                        ret.jumpDetailFn.call(ownself);
		                    };
		                }
		                ret.jumpToWeiXinpay.call(ownself);
		            });

		        });

		        //支付宝事件
		        _parenteObj.on("click", "#c_payment_global_mobileali", function (e) {
		            Util.stopEvent(e);
		            _this.showPromptMask.call(that, 1, function () {
		                ret.toAlipayBefore.call(this);
		            });
		        });

		        //现金支付事件
		        _parenteObj.on("click", "#c_payment_global_cashpay", function (e) {
		            Util.stopEvent(e);
		            _this.toCashPayFn.call(that);
		        });

		        //建行APP支付事件
		        _parenteObj.on("click", "#c_payment_global_jianhangapp", function (e) {
		            Util.stopEvent(e);
		            _this.JianhangAppPay.call(that, e)
		        });
		        //积分担保 支付事件
		        _parenteObj.on("click", "#c_payment_global_jifen", function (e) {
		            e.preventDefault();
		            e.stopPropagation();
		            _this.toJiFenPay.call(that, e)
		        });
		        return
		    };

		    /**
		    * @author zhang_zc
		    * @description 第三方支付回退 
		    * 3.H5跳转也是由BU来决定，如果BU支持第三方支付放弃支付后能再次提交，则在URL中对应的rback传值空字符串，H5在前端进行判断下，如果rback为空，则跳转支付方式页。
		    * 从第三方返回使用gohome方法不行（已测试确认）
		    */
		    ret.jumpDetailFn = function () {
		        //var backurl = orderDetailStore.getAttr('indexUrl') || "";
		        if (ret.isThirdPayBack()) {

		            AliReStore.setAttr("requestid", "");
		            if (!cUtility.isInApp()) {
		                //rback为空就不跳转了
		                var rback = orderDetailStore.getAttr('rback');
		                if (rback) {
		                    window.location.href = rback;
		                } else {
		                    ret.removePayCardStore();
		                    ret.goHome.call(this);   //跳转至首页
		                }
		            }
		        }
		    };

		    //判断是否第三方回退
		    ret.isThirdPayBack = function () {
		        var orderdetail = orderDetailStore.get() || {}; //Edit by sqsun 20141023 数据做容错处理
		        var ali_requestId = AliReStore.getAttr("requestid");
		        if (ali_requestId && ali_requestId == orderdetail.requestid) {
		            return true;
		        }
		        return false;
		    };

		    /*
		    * Author: JGD  
		    * Deccription: 风控手机验证
		    * Version: 5.10
		    */
		    ret.VerifyPhone = function (fromurl) {
		        //需要过风控跳转手机验证页面
		        this.forward("verifyphone?from=" + fromurl);
		    };
		    /**
		    * Author sqsun@ctrip.com
		    * 获取风控手机号
		    **/
		    ret.CheckPhoneNum = function (cback) {
		        var self = this;
		        var orderinfo = orderDetailStore.get() || {};
		        var _param = {
		            "opbitmap": 1, //1=获取风控手机号, 2=获取是否设置交易密码, 4=获取是否开通指纹支付
		            "bustype": orderinfo.bustype,
		            "oid": orderinfo.oid,
		            "requestid": orderinfo.requestid
		        };
		        if (paymentWayStore.getAttr('verifiedPhone')) {
		            return cback(false)
		        }

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
		            //var item = { "result": 0, "resultmesg": "11111", "phone": "13888885555" };
		            //系统错误，直接抛出网络不给力,请稍候重试
		            if (typeof item.res != 'undefined' && item.res) {
		                self.hideLoading();
		                self.showToast("网络不给力,请稍候重试");
		                return;
		            }
		            self.hideLoading();
		            //获取手机号码
		            if (item.result == 0) {
		                if (item.accountinfo && item.accountinfo.phone) {
		                    return cback(item.accountinfo.phone);
		                }
		            } else {
		                self.hideLoading();
		                self.showToast(item.resultmesg || "网络不给力,请稍候重试");
		            }
		        };

		        self.showLoading();
		        var header = ret.getRequestHeader();
		        var headstring = JSON.stringify(header);
		        paymentPipe.getPhoneNum(_param, _callback, headstring, function () {
		            self.hideLoading();
		            self.showToast("网络不给力,请稍候重试");
		        });
		        //_callback();
		    };

		    /**
		    * Author sqsun
		    * 验证是全额支付，还是混付
		    **/
		    //isApp区分是h5第三方支付还是hybrid第三放支付
		    ret.PostCheck = function (isApp, result, sback, rback, eback, payWayName, payWayId, subPayId) {
		        var self = this;
		        ret.CheckPhoneNum.call(this, function (phonenum) {
		            if (phonenum) {
		                paymentWayStore.setAttr("verifyMobile", phonenum);
		                paymentWayStore.setAttr("isGetPassWordfrom1501", 1); //1501字段设置 防止用户绕过风控验证 sq_xu
		                paymentWayStore.setAttr("seniortype", 1); //礼品卡风控 sq_xu
		                ret.VerifyPhone.call(self, "index");
		            } else {
		                paymentWayStore.setAttr("isGetPassWordfrom1501", 0);
		                if (isApp) {
		                    ret.AppPay.call(self, result, sback, rback, eback, payWayName, payWayId, subPayId);
		                } else {
		                    ret.H5Pay.call(self, result, sback, rback);
		                }
		            }
		        })
		    };

		    //支持小数的Bu 业务类型
		    ret.supportDecimalBu = function () {
		        //团购 火车票 汽车票 高端商户 机场巴士 礼品卡商城 游e购
		        var array = [4, 3001, 14, 11, 141, 2002, 5001];
		        return array;
		    }
		    //判断下发的多张卡是否是同一张卡
		    ret.isSameCards = function () {
		        var paymentstore = paymentWayStore.get() || {}, //支付localstore
		            _cards = paymentstore["cards"] || [], //银行卡集合 //Edit by sqsun 20141023 数据做容错处理
                    _len = _cards.length,
                    _result = 1;
		        if (_len < 1) {
		            return 0;
		        }
		        for (var i = 0; i < _len; i++) {
		            if (_cards[i].paymentwayid != _cards[0].paymentwayid) {
		                _result = 0;
		                break;
		            }
		        }
		        return _result;
		    }

		    //支付宝 微信 混付时，混付提示蒙版
		    ret.showPromptMask = function (source, fnName_callback) {
		        var self = this;
		        //判断是否混付
		        var paycard = paymentcard.get() || {};
		        var payinfo = paycard.paymentdetail ? paycard.paymentdetail : null;
		        if (paycard && paycard.orderid != -1 && payinfo && (payinfo.cardamount + payinfo.qbamount) > 0) {
		            //获取混付金额
		            var totalAmount = payinfo.cardamount + payinfo.qbamount;
		            var titeText = "";
		            var btnText = "";
		            var contentText = "";
		            //区分入口
		            if (source == 1) {
		                //支付宝支付
		                titeText = "支付宝支付";
		                btnText = "确认使用支付宝支付";
		            } else if (source == 2) {
		                //微信支付
		                titeText = "微信支付";
		                btnText = "确认使用微信支付";
		            } else {
		                //储蓄卡支付(卡bin和新增储蓄卡)
		                titeText = "储蓄卡支付";
		                btnText = "确认支付";
		            }
		            //文案从101接口中获取
		            var dsetList = paymentWayStore.getAttr("dsettings");
		            var tempTitle = "";
		            var tempContent = "";
		            for (var i = 0; i < dsetList.length; i++) {
		                if (dsetList[i].type == 11) {
		                    tempTitle = dsetList[i].value || "";
		                }
		                if (dsetList[i].type == 12) {
		                    tempContent = dsetList[i].value || "";
		                }
		            }
		            //替换title中的金额
		            tempTitle = tempTitle.replace(/\{0\}/ig, ("<span class='corange'>" + totalAmount + "</span>"));
		            contentText = tempTitle + "<br/>" + tempContent;
		            //弹出提示框
		            var layer = new c.ui.Layer({
		                onCreate: function () {
		                    this.contentDom.html('<div class="cui-pop-box"><div class="cui-hd">' + titeText + '<div id="mb_grayload_close" class="cui-grayload-close" ></div></div>'
                                    + '<div class="cui-bd"><div class="p10">' + contentText + '</div><button class="paybtn w100" id="mbPayBtn">' + btnText + '</button></div>');
		                    var closeBtn = this.contentDom.find("#mb_grayload_close");
		                    closeBtn.click(function () {
		                        layer.remove();
		                    });
		                    var submitBtn = this.contentDom.find("#mbPayBtn");
		                    submitBtn.click(function () {
		                        layer.remove();
		                        //继续调用301接口
		                        fnName_callback.call(self);
		                    });
		                },
		                onShow: function () {
		                },
		                onHide: function () {
		                }
		            });
		            layer.show();
		        } else {
		            fnName_callback.call(self);
		        }

		    }

		    return ret;
		});
