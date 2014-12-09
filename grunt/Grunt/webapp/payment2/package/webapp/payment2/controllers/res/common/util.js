define(['c', 'cWidgetFactory', 'PayModel', 'PayStore', 'CommonStore', 'cUtility', "Config"], function (c, widgetFactory, payModel, payStore, CommonStore, cUtility, Config) {

    var Guider = widgetFactory.create('Guider');
    var paymentcard = payStore.PayMentCardParamStore.getInstance(); //存放礼品卡支付的信息5.4
    var touchPayStore = payStore.touchPayStore.getInstance();
    var payMentStore = payStore.PaymentWayStore.getInstance();
    var orderDetailStore = payStore.OrderDetailStore.getInstance();
    var extendParamsStore = payStore.ExtendInfoStore.getInstance(); //扩展参数
    var selectBankStore = payStore.SelectBankStore.getInstance(); //选择银行store
    var ret = {};


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
    ret.getRiskCtrl = function () {
        var result = 0;
        if (extendParamsStore && extendParamsStore.get()) {
            result = extendParamsStore.get().IsNeedCardRisk ? 1 : 0;
        }
        return result;
    };

    //301接口公共参数的提取 业务关联的仍需要传入
    ret.getPublicParams = function (param) {
        param = param || {};
        var ugSystemVer = this.getSystemVer();
        var orderDetail = orderDetailStore.get();
        var extendParam = extendParamsStore.get() || {};
        var bankStore = selectBankStore.get() || {};
        var hasLastPay = orderDetail.hasLastPayWay;
        //Add sqsun 20141012 手机风控用户前端跳过，需再次做验证处理
        var payMstore = payMentStore.get(),
            vcode = parseInt(Math.random() * 100000); //Add End

        param.ver = ugSystemVer.ver; //添加公共ver版本号
        param.plat = ugSystemVer.platform; //添加公共platform ID
        param.requestid = orderDetail.requestid;
        //param.statistic = param.statistic;
        param.opttype = param.opttype;
        param.bustype = orderDetail.bustype
        //useEType默认为支付 1
        param.usetype = extendParam.useEType || 1;
        param.subusetype = this.isPreAuth() ? 1 : 0;
        //subPayType默认为到携程 0
        param.subpay = extendParam.subPayType || 0;
        if (param.opadbitmp) {
            param.opadbitmp += this.getRiskCtrl();
        } else {
            param.opadbitmp = this.getRiskCtrl();
        }
        param.forcardfee = param.forcardfee || null;
        param.forcardcharg = param.forcardcharg || 0;
        param.stype = param.stype || 0;
        param.paytype = param.paytype;
        //支付限制
        param.payrestrict = extendParam.payrestrict || {};
        //订单信息
        param.oinfo = {
            "oid": orderDetail.oid,
            "oidex": orderDetail.oid,
            "odesc": orderDetail.title,
            "currency": orderDetail.currency || "CNY",
            "oamount": orderDetail.totalamount,
            "displayCurrency": orderDetail.displayCurrency || "CNY",
            "displayAmount": orderDetail.displayAmount,
            "extno": orderDetail.extno,
            "recall": orderDetail.recall
        }
        //指紋支付傳值 edit by jianggd@ctrip.com
        if (touchPayStore.getAttr("touchPaySubmit")) {
            param.opadbitmp += 16;
        }
        //银行卡支付
        if (param.cardinfo) {
            param.cardinfo.paymentwayid = bankStore.paymentwayid;
            param.cardinfo.opttype = param.cardinfo.opttype || "1";
            param.cardinfo.cardamount = param.cardinfo.cardamount;
            param.cardinfo.status = bankStore.status;

            //所选卡需要手机验证码验证 sq_xu
            var card_vcode = null;
            if ((param.cardinfo.status & 256) && payMentStore.getAttr("isGetPassWordfrom1801")) {
                card_vcode = payMentStore.getAttr("vcode") ? payMentStore.getAttr("vcode") : vcode; //手机风控验证码
                param.opadbitmp += 8; //手机风控验证
            }

            //2=有上次成功支付方式，但是支付没有使用上次成功支付方式  3 = 没有上次成功支付方式
            param.statistic = (bankStore.status & 128) ? 1 : hasLastPay ? 2 : 3;

            if (param.cardinfo.addinfo) {
                var addinfo = param.cardinfo.addinfo;
                param.cardinfo.addinfo = {
                    "typemain": bankStore.typemain,
                    "typeid": bankStore.typeid,
                    "cardno": addinfo.cardno,
                    "cvv2": addinfo.cvv2,
                    "expire": addinfo.expire, //有效期
                    "holder": addinfo.holder,
                    "idcardtype": addinfo.idcardtype,
                    "idcardno": addinfo.idcardno,
                    "islast4": addinfo.islast4,
                    "category": bankStore.category,
                    "mobile": addinfo.mobile,
                    "refid": addinfo.refid,
                    "vcode": card_vcode ? card_vcode : addinfo.vcode //走信用卡分控下 传信用卡风控验证码
                }
            } else {
                param.cardinfo.addinfo = null;
            }

            if (param.cardinfo.checkinfo) {
                var checkinfo = param.cardinfo.checkinfo;
                param.cardinfo.checkinfo = {
                    "typemain": bankStore.typemain,
                    "typeid": bankStore.typeid,
                    "cardnumfl": bankStore.cardnumfl,
                    "last4": bankStore.lastcode,
                    "cvv2": checkinfo.cvv2,
                    "cardinfoid": bankStore.cardinfoid,
                    "expire": checkinfo.expire,
                    "category": bankStore.category,
                    "mobile": checkinfo.mobile,
                    "refid": checkinfo.refid,
                    "vcode": card_vcode ? card_vcode : checkinfo.vcode, //走信用卡分控下 传信用卡风控验证码
                    "islast4": checkinfo.islast4,
                    "cardno": checkinfo.cardno,
                    "holder": checkinfo.holder,
                    "idcardtype": checkinfo.idcardtype,
                    "idcardno": checkinfo.idcardno
                }
            } else {
                param.cardinfo.checkinfo = null;
            }

            if (param.cardinfo.updateinfo) {
                var updateinfo = param.cardinfo.updateinfo;
                param.cardinfo.updateinfo = {
                    "typemain": bankStore.typemain,
                    "typeid": bankStore.typeid,
                    "cardnumfl": bankStore.cardnumfl,
                    "last4": bankStore.lastcode,
                    "cvv2": updateinfo.cvv2,
                    "cardinfoid": bankStore.cardinfoid,
                    "expire": updateinfo.expire,
                    "category": bankStore.category,
                    "mobile": updateinfo.mobile,
                    "refid": updateinfo.refid,
                    "vcode": card_vcode ? card_vcode : updateinfo.vcode, //走信用卡分控下 传信用卡风控验证码
                    "islast4": updateinfo.islast4,
                    "cardno": updateinfo.cardno,
                    "cardinfoid": bankStore.cardinfoid,
                    "holder": updateinfo.holder,
                    "idcardtype": updateinfo.idcardtype,
                    "idcardno": updateinfo.idcardno
                }
            } else {
                param.cardinfo.updateinfo = null;
            }
        } else {
            param.cardinfo = null;
        }

        //第三方支付
        if (param.thirdpartyinfo) {
            var thirdpartyinfo = param.thirdpartyinfo;
            param.thirdpartyinfo = {
                "paymentwayid": thirdpartyinfo.paymentwayid,
                "typeid": thirdpartyinfo.typeid,
                "subtypeid": thirdpartyinfo.subtypeid, //H5 wap
                "typecode": thirdpartyinfo.typecode,
                "thirdcardnum": thirdpartyinfo.thirdcardnum,
                "amount": thirdpartyinfo.amount
            }
            //2=有上次成功支付方式，但是支付没有使用上次成功支付方式  3 = 没有上次成功支付方式
            param.statistic = bankStore.thirdstatus ? 1 : hasLastPay ? 2 : 3;
        } else {
            param.thirdpartyinfo = null;
        }
        //现金支付
        if (param.cashinfo && param.cashinfo.length > 0) {
            var cashlist = param.cashinfo;
            param.cashinfo = [{
                "paymentwayid": orderDetail.CashInfo[0]["paymentwayid"],
                "amount": cashlist[0].amount,
                "receivebranch": extendParam.CashReceiveBranch,
                "receivesite": extendParam.CashReceiveSite
            }]
            //2=有上次成功支付方式，但是支付没有使用上次成功支付方式  3 = 没有上次成功支付方式
            param.statistic = bankStore.cashstatus ? 1 : hasLastPay ? 2 : 3;
        } else {
            param.cashinfo = null;
        }
        //钱包支付

        //礼品卡支付
        var paycard = paymentcard.get();
        var payinfo = paycard ? paycard.paymentdetail : null;
        if (paycard && paycard.orderid != -1 && payinfo && (payinfo.cardamount + payinfo.qbamount) > 0) {
            if (payinfo.cardpay) {
                var tktis = payMstore.tktinfo.tkts; //获取礼品卡 Add sqsun 20141012
                param.tktinfo = payinfo.tktinfo;

                if (payMentStore.getAttr("isGetPassWordfrom1501")) {
                    if (payMentStore.getAttr("vcode")) {
                        for (var i = 0; i < param.tktinfo.tkts.length; i++) {
                            param.tktinfo.tkts[i].vcode = payMentStore.getAttr("vcode");
                        }
                    } else {//如果用户手动跳过风控，这里需要再次验证处量 Add sqsun 20141012
                        for (var j = 0; j < tktis.length; j++) {
                            for (var l = 0; l < param.tktinfo.tkts.length; l++) {
                                if (param.tktinfo.tkts[l].tkttype == tktis[j].tkttype && tktis[j].ticketstatus == 2 && payMentStore.getAttr("isGetPassWordfrom1501")) {
                                    param.tktinfo.tkts[l].vcode = vcode;
                                };
                            }
                        } //Add End
                    }
                }

            }
            if (payinfo.qbpay) {
                param.walletpayinfo = payinfo.walletpayinfo;
                //var isvfPhone = payMentStore.getAttr("verifiedPhone");
                if (payMentStore.getAttr("isGetPassWordfrom1501")) {
                    if (payMentStore.getAttr("vcode")) {
                        param.walletpayinfo[0].vcode = payMentStore.getAttr("vcode");
                    } else {//如果用户手动跳过风控，这里需要再次验证处量 Add sqsun 20141012
                        if (payMstore.walletlist[0].walletstatus == 2 && payMentStore.getAttr("isGetPassWordfrom1501")) {
                            param.walletpayinfo[0].vcode = vcode;
                        } //Add End
                    }
                }

            }
            param.paytype = param.paytype * 1 + payinfo.paytype;
        }

        //必需是在hybrid里面运行   lh_sun
        if (cUtility.isInApp()) {
            //如果是指纹支付增加指纹支付参数
            if (touchPayStore.getAttr('touchPaySubmit')) {
                var touchPayInfo = touchPayStore.get();
                var deviceGUID = touchPayInfo.deviceGUID || "",
                deviceInfo = touchPayInfo.deviceInfo || "",
                wifi_mac = touchPayInfo.wifi_mac || "",
                imei = touchPayInfo.imei || "",
                vendorid = touchPayInfo.vendorid || "",
                secretKeyGUID = touchPayInfo.secretKeyGUID || "",
                RSAToken = touchPayInfo.RSAToken || "";
                param.touchpay = {
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
            }

        }
        //添加经纬度坐标
        var coordInfo = ret.getCoordinate();
        if (coordInfo && coordInfo.latitude) {
            param.geos = [{
                "type": '1', //坐标类型
                "lat": coordInfo.latitude,
                "lon": coordInfo.longitude
            }];
        }
        //是否参加优惠活动
        if (extendParam.ActivityKey) {
            param.actkey = extendParam.ActivityKey;
            param.actcount = extendParam.MaxActivityCount || 0;
        }
        if (param.statistic) {
            //统计用户是否使用指纹支付
            var statisticPay = paymentcard.getAttr("statisticPay");
            if (statisticPay) {
                param.statistic += "|" + statisticPay;
            } else {
                param.statistic = statisticPay;
            }
        }
        return param;
    }

    /**
    * 获取用户经纬度坐标
    */
    ret.getCoordinate = function () {
        var coordinateInfo = null;
        if (cUtility.isInApp()) {
            coordinateInfo = window.localStorage.getItem('APPINFO_FOR_COORDINATE');
        }
        return coordinateInfo;
    }


    /**
    * @author lh_sun@ctrip.com
    * @description 浮点运算
    *              
    */
    ret.folatcount = function (arg1, arg2, operators) {
        var hasPoint1 = arg1.toString().indexOf('.'),
            hasPoint2 = arg2.toString().indexOf('.');

        if (hasPoint1 < 0 && hasPoint2 < 0) {
            if (operators == "-") {
                return parseInt(arg1, 10) - parseInt(arg2, 10);
            }
            else {
                return parseInt(arg1, 10) + parseInt(arg2, 10);
            }
        }
        else {
            var r1 = hasPoint1 > 0 ? arg1.toString().split(".")[1].length : 0,
                r2 = hasPoint2 > 0 ? arg2.toString().split(".")[1].length : 0;
            //需区分是否在hybrid
            if (cUtility.isInApp()) {
                //之前hybrid里面出过问题，改成1000就没问题了
                var m = 1000;
                if (operators == "-") {
                    return (arg1 * m - arg2 * m) / m;
                }
                else {
                    return (arg1 * m + arg2 * m) / m;
                }
            } else {
                //H5
                var m = 1000;
                var param1 = parseInt(arg1 * m, 10);
                var param2 = parseInt(arg2 * m, 10);
                if (operators == "-") {
                    return (param1 - param2) / m;
                }
                else {
                    return (param1 + param2) / m;
                }
            }


        }
    };

    //获取URL参数函数
    ret.geturlQuery = function (name) {
        var url = location.href;
        if (Config.MOCK_SERVICE_CALL) {
            if (/%/gi.test(url)) { url = decodeURIComponent(url); } //在浏览器本地文件调试，会出现encode之后的地址
        }
        var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
        if (reg.test(url)) return unescape(RegExp.$2);
        return "";
    };

    /**
    * @author lh_sun@ctrip.com
    * @description 获取系统信息
    */

    ret.getSystemVer = function () {
        /* platform取值
        * 1 = IOS_Native
        * 2 = Android_Native
        * 3 = IOS_Hybrid
        * 4 = Android_Hybrid
        * 5 = H5
        */

        var rets = {
            'platform': 5,
            'ver': 600
        };


        if (cUtility.isInApp()) {
            var appInfo = JSON.parse(localStorage.APPINFO);
            rets.platform = appInfo.platform && appInfo.platform == 1 ? 3 : 4;
        }
        return rets;
    };

    /**
    * @author lh_sun@ctrip.com
    * @description 保留两位小数
    *              
    */
    ret.remain2Num = function (val) {
        val += '';
        var reg = /([0-9]+\.[0-9]{2})[0-9]*/;
        return parseFloat(val.replace(reg, "$1"));
    };

    /**
    * @author zhang_zc@ctrip.com
    * @param obj  JSON对象
    * @description 往cookie中添加信息
    */
    ret.addCookie = function (obj) {
        var tempStr = "";
        $.each(obj, function (key, val) {
            tempStr = key + '=' + val;
            document.cookie = tempStr;
        })
    };

    /**
    * @author zhang_zc@ctrip.com
    * @return obj JSON对象
    * @description 获取cookie中的信息
    */
    ret.getCookie = function () {
        var tempStr = document.cookie || '';
        var tempArray = tempStr.split(';');
        if (tempArray.length <= 0) {
            return null;
        }
        var obj = {};
        $.each(tempArray, function (index, val) {
            var aray = val.split('=');
            if (aray.length > 2) {
                obj[aray[0]] = aray[1];
            }
        });
        return obj;
    };
    /**
    * @author zhang_zc@ctrip.com
    * @return obj JSON对象
    * @description 区分判断当前是什么环境（生产 测试 堡垒）
    */
    ret.getEnvironment = function () {
        var host = location.host;
        if (cUtility.isInApp()) {
            if (cUtility.isPreProduction() == '1') { // 定义堡垒环境
                return 'BL_APP';
            } else if (cUtility.isPreProduction() == '0') { // 定义测试环境
                return 'CS_APP';
            } else if (cUtility.isPreProduction() == '2') { //UAT环境
                return 'UAT_APP';
            } else {
                return 'BL_APP';
            }
        } else if (host.match(/^m\.ctrip\.com/i) || host.match(/^secure\.ctrip\.com/i)) {
            //生产环境
            return 'SC_WEB';
        } else if (host.match(/^(localhost|172\.16|127\.0)/i)) {
            //本地环境
            return 'BD_WEB';
        } else if (host.match(/^10\.8\.2\.111/i) || host.match(/^10\.8\.5\.10/i)) {
            //堡垒环境
            return 'BL_WEB';
        } else if (host.match(/^secure\.(fws|fat19)\.qa\.nt\.ctripcorp\.com|^210\.13\.100\.191/i)) {
            //测试环境
            return 'CS_WEB';
        } else if (/^secure\.uat\.sh\.ctriptravel\.com/i.test(host)) {
            //测试环境 uat
            return 'UAT_WEB';
        } else if (host.match(/^secure\.(fws|fat18)\.qa\.nt\.ctripcorp\.com|^140\.20\.228\.101/i)) {
            //测试环境
            return 'CS_WEB';
        } else {
            //生产
            return 'SC_WEB';
        }
    };

    //设置Hybrid下placeholder不完全兼容问题
    ret.placeholder = function (objs) {
        //获取共公Ver和platform 参数
        var ugSystemVer = this.getSystemVer();
        var self = this;
        //在 android hybrid中
        if (ugSystemVer.platform == 4) {
            var _win = window,
                _windH = $(_win).height(), //窗体的高度
                _timer = null; //延迟计时器

            //自定义placehoder
            objs.each(function (i, el) {
                var _placetemp = $('<span style="position:absolute;top:0px" class="c_global_holder"></span>'), //创建placehoder HTML对象
                    $el = $(el);
                //追加placehoder对象到输入框后面
                setTimeout(function () {
                    var _ofsleft = $el.offset().left - 5;
                    _placetemp.css({ "left": _ofsleft + "px", "color": "#A9A9A9" }).text(el.getAttribute("placeholder"));
                    $el.removeAttr("placeholder").after(_placetemp);
                }, 0);

                _placetemp.click(function (e) {
                    self.stopEvent(e);
                    el.focus();
                });

                $el.on("focus", function (e) {
                    self.stopEvent(e);
                    var _el = $(this);
                    if (this.value != "") {
                        _placetemp.hide()
                    }

                    if (_timer) { clearTimeout(_timer) }

                    //修正获取焦点自动向上滚动，防止键盘挡住支付按钮
                    _timer = setTimeout(function () {
                        var _parsectionH = _el.closest("section#c_payment_index_used_list").height(), //计算当前对象section父对象的高
                            _parentH = _parsectionH + 118 + $("#c_pay_index_lpk").height(), //计算加上标题，礼品卡等高度
                            _viewH = _windH - (_windH - $(_win).height()), //键盘弹出后可视高度
                            _eloffsetTop = _el.offset().top, //当前对象的offset集合的高
                            _focusH = (_parentH - _eloffsetTop), //焦点区
                            _scrollTo = _eloffsetTop - (_viewH - (_parentH - _eloffsetTop)); //滚动条高度

                        if (_viewH >= _focusH) { //判断当前对象总高是否大于半屏 并且对象的offset在第一个下面
                            _win.scrollTo(0, _scrollTo);
                        }
                        _el = null
                    }, 700)
                });

                $el.on("input", function () {
                    var elval = this.value;
                    if (elval.length > 0) {
                        _placetemp.hide()
                    } else {
                        _placetemp.show()
                    }
                });
            });
        }
    };

    /**
    * @author lh_sun@ctrip.com
    * @return obj JSON对象
    * @description 判断是否在微信浏览器里面
    */
    ret.isInWeichat = function () {
        /** 首先检查UserAgent是不是含有了ctripwireless */
        var useragent = window.navigator.userAgent;
        if (useragent.indexOf('MicroMessenger') > -1) {
            return true;
        }
        return false;
    };

    /**
    * @author  sq_xu@ctrip.com
    * @param e  event对象
    * @return  no
    * @description 同时阻止事件默认行为和冒泡
    */
    ret.stopEvent = function (e) {
        if (e && e.stopPropagation && e.preventDefault) {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    /**
    * @author  zhang_zc@ctrip.com
    * @description 获取短信验证码  公共部分的提取
    * @params timingDom:self.els.getCode  loadingDom:self.els.CountDownClock
    */
    ret.verifyCodeControl = function () {
        var countdownTimer = 60;
        var timeroutObj = null;
        var _timerOut = null; //全局倒计时变量
        var self = this;
        //展示获取验证码loading图标
        var showVerrifyCodeLoading = function (loadingDomId, timingDomId) {
            var loadingDom = self.$el.find("#" + loadingDomId);
            var timingDom = self.$el.find("#" + timingDomId);
            //清空计时器
            if (timeroutObj) {
                clearTimeout(_timerOut);
                _timerOut = timeroutObj = null;
                countdownTimer = 60;
                //loadingDom.html('<span style="line-height:15px; display:inline-block; padding-top:6px;">60秒后<br/>重新获取</span>');
            }
            timingDom.hide();
            loadingDom.html('<div class="greyload-icon">&nbsp;<span class="cui-pro-radius"></span><span class="greylogo"></span></div>');
            loadingDom.show(); // 倒计时
        }
        //隐藏获取验证码loading图标
        var hideVerrifyCodeLoading = function (loadingDomId, timingDomId) {
            var loadingDom = self.$el.find("#" + loadingDomId);
            var timingDom = self.$el.find("#" + timingDomId);
            loadingDom.text('获取验证码');
            loadingDom.hide();
            timingDom.show();
        }
        //verify code Countdown
        var runVerifyCode = function (loadingDomId, timingDomId, getcode) {
            var loadingDom = self.$el.find("#" + loadingDomId);
            var timingDom = self.$el.find("#" + timingDomId);
            loadingDom.html('<span style="line-height:15px; display:inline-block; padding-top:6px;">60秒后<br/>重新获取</span>');
            if (!timeroutObj) {
                timeroutObj = (function () {
                    var loadingDom = self.$el.find("#" + loadingDomId);
                    var timingDom = self.$el.find("#" + timingDomId);
                    if (countdownTimer >= 0) {
                        loadingDom.html('<span style="line-height:15px; display:inline-block; padding-top:6px;">' + countdownTimer + '秒后<br>重新获取' + '</span>');
                        countdownTimer--;
                    } else {
                        _timerOut = timeroutObj = null;
                        countdownTimer = 60;
                        loadingDom.text('获取验证码');
                        loadingDom.hide();
                        timingDom.show();
                        return 1;
                    }
                    if (getcode) {
                        _timerOut = setTimeout(arguments.callee, 1000);
                    } else {
                        clearTimeout(_timerOut);
                        _timerOut = timeroutObj = null;
                        countdownTimer = 60;
                    }
                    return 1
                } ());
            } else {
                clearTimeout(_timerOut);
                _timerOut = timeroutObj = null;
                countdownTimer = 60;
            }
        }

        return {
            showLoading: showVerrifyCodeLoading,
            hideLoading: hideVerrifyCodeLoading,
            runVerifyCode: runVerifyCode
        }
    };
    //
    ret.transNumToFixedArray = function (num, maxlength, currency) {
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
        return array;
    }
    return ret;
});
