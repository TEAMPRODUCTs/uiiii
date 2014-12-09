define(['c', 'cWidgetFactory', 'PayModel', 'PayStore', 'cUtility', 'Util',"Config"], 
		function (c, widgetFactory, payModel, PayStore, Util, pUtil,Config) {
    /**
    * @author wjxiong@ctrip.com
    * @namespace paymentPipe
    */
    var paymentWayModel = payModel.PaymentWayModel.getInstance();
    var payMentModel = payModel.PayMentModel.getInstance();
    
    var PayMentV3Model = payModel.PayMentV3Model.getInstance();
    var dpstCardModel = payModel.GetValCode.getInstance(); //获取验证码
    var updatePrePhoneModel = payModel.UpdatePrePhoneModel.getInstance(); //修改手机号
    //var PayMentModel4ThirdPaySig = payModel.PayMentModel4ThirdPaySig.getInstance();   //获取第三方签名store已删除
    var isloadModel = payModel.CashMessModel.getInstance();
    //1301 post server
    var cardBinQuery = payModel.cardBinQuery.getInstance();
    //1501 post server
    var getPhoneNumQuery = payModel.getPhoneNumQuery.getInstance();
    //1601 post server
    var verifyPhoneCodeQuery = payModel.verifyPhoneCodeQuery.getInstance();
    //1701 post server
    var verifyPhoneNumQuery = payModel.verifyPhoneNumQuery.getInstance();
    //1801 post server sq_xu
    var verifyUnionPayStatusQuery = payModel.verifyUnionPayStatusQuery.getInstance();
    //32009507
    var bankListModel = payModel.BankListModel.getInstance();
    var orderDetailStore = PayStore.OrderDetailStore.getInstance();
    var transAccoutInfoModel = payModel.TransAccoutInfoModel.getInstance();
    var verifyPassword = payModel.VerifyPassword.getInstance();
    var extendParamsStore = PayStore.ExtendInfoStore.getInstance(); //扩展参数
    //异常信息收集
    var exceptionInfoCollect = payModel.ExceptionInfoCollect.getInstance();


    //获取共公Ver和platform 参数
    var ugSystemVer = pUtil.getSystemVer();

    var Guider = widgetFactory.create('Guider');
    var pipe = {};
    /*
     * param对象参数 param,header,callback,serCode,model,errback
     */
    pipe.exec = function(params){
    	var _param = params.param, _callback = params.callback,
    	_errback = params.errback,_abtback = params.abtback,
    	serCode = params.serCode,model = params.model,header = params.header;
    	
    	if(Config.MOCK_SERVICE_CALL){//mock 本地数据
    	    if (!window.pay_data) {
    	        function setData() {
    	            for (var per in payModel) {
    	                if (!payModel[per].prototype.localData) {
    	                    payModel[per].prototype.localData = window.pay_data[per];
    	                }
    	            }
    	        }

    	        if (Config.IS_INAPP) {
    	            _url = "mockdata.js?ver=11";
    	        } else {
    	            _url = "Res/models/mockdata.js?ver=11";
    	        }
    	        var mscript = document.createElement("script");
    	        document.getElementsByTagName("head")[0].appendChild(mscript);
    	        mscript.type = "text/javascript";
    	        mscript.src = _url;
    	        mscript.onload = function () {
    	            setData();
    	            if (Config.IS_INAPP) {
    	                _callback.call(model, { resultBody: JSON.stringify(model.localData) });
    	            } else {
    	                _callback.call(model, model.localData);
    	            }
    	        };
    		}
    		
    	}else if (Config.IS_INAPP) {
            _param = JSON.stringify(_param);
            Guider.pipe.socketRequest({
                callback: _callback,
                serviceCode: serCode,
                data: _param,
                header: header
            });
        }else {
        	model.setParam(_param);
        	model.headinfo = JSON.parse(header);
        	model.exec(_callback, _errback, true,model, _abtback ||function(){console.log("service abort");});
        }
    };
    pipe.getpaymentway = function (_param, _callback, header, errback) {
        _param.subpay = _param.subpay || 0;
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID
        this.exec({model: paymentWayModel,param: _param,callback:_callback,errback:errback, header: header, serCode: "31000101"});
    }
    pipe.pay = function (_param, _callback, header, errback, abortback) {
        //补全公共参数
        _param = pUtil.getPublicParams(_param);

        //设置信息返回的paytype
        orderDetailStore.setAttr("realpaytype", _param.paytype);

        //301提交的时候错误为0，需要收集下
        try {
            if (typeof _param.oinfo.oamount == 'undefined' || !_param.oinfo.oamount) {
                var descArr = [];
                descArr.push('支付方式为：' + _param.paytype);
                descArr.push('ordetail：' + localStorage.ORDER_DETAIL);
                descArr.push('BU_EXTEND_INFO：' + localStorage.BU_EXTEND_INFO);

                var options = {
                    bustype: _param.bustype,
                    excode: 1,
                    extype: 1,
                    exdesc: '301请求BU金额为0,'
                };

                options.exdesc += descArr.join();

                var errHandler = function () { };
                var successHandler = function () { };

                pipe.exceptionInfoCollect(options, successHandler, header, errHandler, errHandler);

            }
        } catch (e) {

        }

        this.exec({model: payMentModel,param: _param,callback:_callback,errback:errback, header: header, serCode: "31000301"});
    }

    pipe.payV3 = function (_param, _callback, header, errback, abortback) {
        //补全公共参数
        _param = pUtil.getPublicParams(_param);

        //设置信息返回的paytype
        orderDetailStore.setAttr("realpaytype", _param.paytype);

        //303提交的时候错误为0，需要收集下
        try {
            if (typeof _param.oinfo.oamount == 'undefined' || !_param.oinfo.oamount) {
                var descArr = [];
                descArr.push('支付方式为：' + _param.paytype);
                descArr.push('ordetail：' + localStorage.ORDER_DETAIL);
                descArr.push('BU_EXTEND_INFO：' + localStorage.BU_EXTEND_INFO);

                var options = {
                    bustype: _param.bustype,
                    excode: '',
                    extype: 1,
                    exdesc: '303请求BU金额为0,'
                };

                options.exdesc += descArr.join();

                var errHandler = function () { };
                var successHandler = function () { };

                pipe.exceptionInfoCollect(options, successHandler, header, errHandler, errHandler);

            }
        } catch (e) {

        }
        this.exec({model: PayMentV3Model,param: _param,callback:_callback,errback:errback, header: header, serCode: "31000303"});
    }

    //获取第三方支付的签名
    pipe.thirdPay = function (_param, _callback, header, errback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: PayMentModel4ThirdPaySig,param: _param,callback:_callback,errback:errback, header: header, serCode: "31001002"});
    }
    //获取验证码（储蓄卡）
    pipe.getValCode = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: dpstCardModel,param: _param,callback:_callback,errback:errback, header: header, serCode: "31000401"});
    };

    //获取现金支付信息
    pipe.getCashMess = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: isloadModel,param: _param,callback:_callback,errback:errback, header: header, serCode: "31001101"});
    };

    //查询用户账户信息
    pipe.transAccoutInfo = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: transAccoutInfoModel,param: _param,callback:_callback,errback:errback, header: header, serCode: "95004801"});
    };

    //验证支付密码
    pipe.verifyPassword = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: verifyPassword,param: _param,callback:_callback,errback:errback, header: header, serCode: "90200401"});
    };


    pipe.updateprephone = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: updatePrePhoneModel,param: _param,callback:_callback,errback:errback, header: header, serCode: "31000501"});
    };

    /*
    Author: JGD
    Description: 卡bin识别
    */

    pipe.verifyCardBin = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: cardBinQuery,param: _param,callback:_callback,errback:errback, header: header, serCode: "31001301"});
    };


    /**
    * @description: 异常信息收集服务
    * @author lh_sun
    */

    pipe.exceptionInfoCollect = function (_param, _callback, header, errback, abortback) {
        _param.svr = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        if (Util.isInApp()) {
            _param.exdesc += ',机器信息为：' + localStorage.DEVICEINFO;
        } else {
            _param.exdesc += ',浏览器头部信息为：' + navigator.userAgent;
        }

        this.exec({model: exceptionInfoCollect,param: _param,callback:_callback,errback:errback, header: header, serCode: "31001401"});
    };

    /*
    Author: JGD
    Description: 获取用户验证手机号码
    Version: 5.10
    */

    pipe.getPhoneNum = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: getPhoneNumQuery,param: _param,callback:_callback,errback:errback, header: header, serCode: "31001501"});
    };

    /*
    Author: JGD
    Description: 发送用户验证手机验证码
    Version: 5.10
    */

    pipe.verifyPhoneCode = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: verifyPhoneCodeQuery,param: _param,callback:_callback,errback:errback, header: header, serCode: "31001601"});
    };

        /*
     Author: JGD
     Description: 验证用户手机号码
     Version: 5.10
     */
    pipe.verifyPhoneNum = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: verifyPhoneNumQuery,param: _param,callback:_callback,errback:errback, header: header, serCode: "31001701"});
    };

    /*
     Author: sq_xu
     Description: 行用卡风控开通银联，验证手机号是否跟银行预留手机号一样
     Version: 6.0
     */
    pipe.verifyUnionPayStatus = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({model: verifyUnionPayStatusQuery,param: _param,callback:_callback,errback:errback, header: header, serCode: "31001801"});
    };

	/*
    Author: sqsun
    Description: 银行增量获取
    Version: 6.1
    */
    pipe.getBanklist = function (_param, _callback, header, errback, abortback) {
        _param.ver = ugSystemVer.ver; //添加公共ver版本号
        _param.plat = ugSystemVer.platform; //添加公共platform ID

        this.exec({ model: bankListModel, param: _param, callback: _callback, errback: errback, header: header, serCode: "32009507" });
    };

    pipe.getRiskCtrl = function () {
        var result = 0;
        if (extendParamsStore && extendParamsStore.get()) {
            result = extendParamsStore.get().IsNeedCardRisk ? 1 : 0;
        }
        return result;
    };

    return pipe;
});