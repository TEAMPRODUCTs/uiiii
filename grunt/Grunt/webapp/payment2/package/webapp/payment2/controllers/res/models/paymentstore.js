define(['cStore', 'cBase'], function (AbstractStore, cBase) {
    var S = {};
    /********************************
    * @description:  支付存储额外的信息
    * @author:       rhhu
    */
    S.PayMentOtherInfo = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_PAY_MENT_OTHER_INFO';
            this.lifeTime = '1D';
            this.isUserData = true;
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  存储礼品卡标志位
    * @author:       lh_sun
    */
    S.lipinCardEInfo = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_LIPINCARD_EINFO';
            this.lifeTime = '1D';
            this.isUserData = true;
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  礼品卡支付5.5 param Store
    * @author:       c_dong
    */
    S.PayMentCardParamStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_PAY_CARD_PARAM_STORE';
            this.lifeTime = '1D';
            this.isUserData = true;
            this.defaultData = {
                orderid: -1,
                tkts: [],
                useamount: 0,
                cardInfo: {}
            };
        },
        initialize: function ($super, options) {
            $super(options);
        },
        resetParam: function () {
            this.set({
                orderid: -1,
                tktinfo: {},
                useamount: 0,
                cardInfo: {}
            });
        }
    });

    /********************************
    * @description:  指纹支付6.0 param Store
    * @author:       jianggd@ctrip.com
    */
    S.touchPayStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_TOUCH_PAY_STORE';
            this.lifeTime = '1D';
            this.isUserData = true;
            this.defaultData = {
                deviceGUID: "",
                deviceInfo: "",
                wifi_mac: "",
                imei: "",
                vendorid: "",
                secretKeyGUID: "",
                RSAToken: ""
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  支付response Store
    * @author:       rhhu
    */
    S.PayMentResponseStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_PAY_RESPONSE_STORE';
            this.lifeTime = '1D';
            this.isUserData = true;
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    //选择证件
    S.SelectIdStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_PAY_ADDCREDITCARD';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    //选中银行卡的数据
    S.SelectBankStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_SELECT_BANK';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

  //对比选择银行是否相同
    S.ISDiffSelectBankStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_SELECT_BANK_ISDIFF';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    
    //储蓄卡列表--增量
    S.BankListStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_PAY_BANK_LIST';
            this.lifeTime = '100D';
        },
        initialize: function ($super, options) {
            $super(options);
        },
        getCityInfoByName: function (Name) {
            var data = this.get(), result = null;
            if (!Name || !data || !data.cities) return result;
            for (var i = 0, len = data.cities.length; i < len; i++) {
                if (Name === data.cities[i].name) {
                    result = data.cities[i];
                    break;
                }
            }
            return result;
        }
    });

    //订单详情
    S.OrderDetailStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_ORDER_DETAIL';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    //支付方式Store
    S.PaymentWayStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_PAYMENT_WAY';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @author 
    * @desc: 曾用信用卡支付信息
    */
    S.PayOldCardInfoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_PAY_OLDCARDINFO';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @author zh.xu
    * @desc: 新增信用卡支付信息
    */
    S.PayCrtCardInfoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_PAY_CRTCARDINFO';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @description: 交易账户信息
    * @author zh.xu
    */
    S.TransAccountInfoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_TRANS_ACCOUNT_INFO';
            this.lifeTime = '1D';
            this.isUserData = true; //若用户更换帐号后，自动清除 
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * @desc: 存放extend相关字段
    * @author: zh.xu
    */
    S.ExtendInfoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_BU_EXTEND_INFO';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });    

    S.DictDataStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_DICT_DATA';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
     * @desc: 现金支付提示信息或注意事项
     * @author zh.xu
     */
    S.CashPayInfoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_CASH_PAYINFO';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    S.Ali_ReStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_Ali_Return_From';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /*
     * @desc: 信用卡不同银行切换store
     */
    S.CrdtCardDiffStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_SELECT_CRDT_CARD_DIFF';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    S.ToAliFlagStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_To_Ali_Flag';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /*
    * @author: Jgd
    * @desc: 保存礼品卡金额异常状态store
    */
    S.tktErrorStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_TKT_AMOUNT_ERROR';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /*
    * @author: Jgd
    * @desc: 保存常用卡
    */
    S.oldCardsStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_OLD_CARD_LIST';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /*
    * @author: sqsun
    * @desc: 101增量服务请求
    */
    S.bankCrement = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_BANK_CREMENT';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    /*
    * @author: lh_sun@ctrip.com
    * @desc: 保存BU传过来的token参数
    */
    S.ParamUrlTokenStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'PAYMENT2_PARAM_URL_TOKEN';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    
    return S;
});
