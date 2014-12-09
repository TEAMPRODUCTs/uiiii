define(['PayBaseModel', 'cBase', 'PayStore', 'cUtility', 'c', 'Util', "Config"],
    function (BusinessModel, cBase, PayStore, cUtility, c, util, Config) {
    var M = {};

    /********************************
    * @description:  支付Model
    * @author:       rhhu
    */
    M.PayMentModel = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.url = '/paymentinfo/submit';
            this.result = PayStore.PayMentResponseStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    /********************************
    * @description:  银行列表增量数据查询Model
    * @author:       zhang_f@Ctrip.com
    */
    M.BankListModel = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.method = 'get';
            this.protocol = "https";
            this.param = {
                type: 11,
                dataVer: 0, //后端通知修改
                ver: util.getSystemVer().ver //获取共公Ver
            };

            this.buildurl = function () {
                var domain = "gateway.secure.ctrip.com", path = "restful/soa2/10289", url = "/bankinfo/get";
                /*domain = Config.DOMAINARR[Config.ENV]["domain"];
                path = Config.DOMAINARR[Config.ENV]["path"];*/
                if (Config.isInApp) {
                    url = "http://m.ctrip.com/restapi/Data/Base";
                } else {
                    url = this.protocol + '://' + domain + "/" + path+ url;
//                    url += Config.HZ_PARAM[Config.ENV];
                }
                return url;
            };

            this.result = PayStore.bankCrement.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    //支付方式
    M.PaymentWayModel = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.url = '/paymentlist/query';
            this.param = {
                "ver": 0
            };

           // this.usehead = false;
            this.result = PayStore.PaymentWayStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    //获取现金支付信息
    M.CashMessModel = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.url = '/subpayinfo/query';
            this.param = {
                "ver": 0
            };
            this.result = PayStore.CashPayInfoStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    //验证支付密码
    M.VerifyPassword = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.url = '/customerticket/verify';
            this.param = {
                "ver": 1
            };
            this.usehead = false;
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    //获取验证码
    M.GetValCode = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.url = '/paymentsms/query';
            this.param = {
                "ver": 1,
                "oid": 0,
                "amount": 0,
                "mobphone": "",
                "isnewcard": true,
                "cardno": "",
                "typid": 0,
                "category": 3
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @description: 交易账户信息查询
    * @author zh.xu
    */
    M.TransAccoutInfoModel = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.url = '/Account/Check';
            this.param = {
                "svr": 0
            };
            this.isUserData = true;
            this.result = PayStore.TransAccountInfoStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @description: 卡bin识别服务查询
    * @author JGD
    */
    M.cardBinQuery = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            var self = this;
            this.param = {
                "ver": 0
            };
            this.isUserData = true;
            this.url = '/cardtypeinfo/query';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @description: 修改预留手机号
    * @author wjxiong
    */
    M.UpdatePrePhoneModel = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.url = '/paymentcreditcard/update';
            this.param = {
                "ver": 0
            };
            this.isUserData = true;
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @description: 异常信息收集服务
    * @author lh_sun
    */
    M.ExceptionInfoCollect = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            var self = this;
            this.param = {
                "ver": 0
            };
            this.isUserData = true;
            this.url = '/exceptioninfo/update';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @description: 获取用户验证手机号码
    * @author JGD
    * @version 5.10
    */
    M.getPhoneNumQuery = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            var self = this;
            this.param = {
                "ver": 0
            };
            this.isUserData = true;
            this.url = '/TransAccount/Search';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @description: 发送用户验证手机验证码
    * @author JGD
    * @version 5.10
    */
    M.verifyPhoneCodeQuery = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.param = {
                "ver": 0
            };
            this.isUserData = true;
            this.url =  '/VerificationCode/Send';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @description: 验证用户手机号码
    * @author JGD
    * @version 5.10
    */
    M.verifyPhoneNumQuery = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            var self = this;
            this.param = {
                "ver": 0
            };
            this.isUserData = true;
            this.url = '/VerificationCode/Check';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
     * @description: 信用卡风控场景开通银联，验证信用卡手机号码是否跟信用卡银行预留手机号一致
     * @author sq_xu
     * @version 6.0
     */
    M.verifyUnionPayStatusQuery = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            this.param = {
                "ver": 0
            };
            this.isUserData = true;
            this.url = '/Upop/Activate';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @description: 实时支付303接口
    * @author JGD
    * @version 5.10
    */
    M.PayMentV3Model = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            var self = this;
            this.url =  '/paymentinfo/submitv3';
            this.result = PayStore.PayMentResponseStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    return M;
});

