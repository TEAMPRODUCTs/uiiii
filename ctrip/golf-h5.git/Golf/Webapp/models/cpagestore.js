define(['cStore', 'cBase', 'cUtility'], function (AbstractStore, cBase, cUtility) {
    var Store = {};


    /******************************************
    * @description:  酒店信息Store
    * @author:       caof@Ctrip.com
    */
    Store.HotelInfoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'HOTEL_INFO';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /******************************************
    * @description:  酒店信息查询参数Store
    * @author:       caof@Ctrip.com
    */
    Store.HotelInfoParamStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'HOTEL_INFO_PARAM';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    Store.CommentListParamStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'COMMENTLIST_PARAM';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /******************************************
    * @description:  团购详情列表Store
    * @author:       mxma@Ctrip.com
    */
    Store.ExplainPageStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'EXPLAIN_PAGE';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    /*机票编辑登机人信息*/
    Store.passengerEditStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'FLIGHT_PASSENGEREDIT'; //与国内机票通用
            this.lifeTime = '1H';

        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
	
	
	/*是否booking页内是否可编辑常旅*/
    Store.isBookingEditStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'FLIGHT_ISBOOKINGEDIT'; //与国内机票通用
            this.lifeTime = '60M';

        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /*机票常用登机人列表信息*/
    Store.passengerQueryStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'FLIGHT_PASSENGERRESULT';
            this.lifeTime = '1D';

        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    /*机票登机人选择信息*/
    Store.passengerChooseStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'FLIGHT_PASSENGERCHOOSE';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    Store.passPageTypeStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'FLIGHT_PAGETYPE'; //与国内机票通用
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    Store.CountryDataStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'FLTINT_COUNTRYDATA';
            this.lifeTime = '15D';

        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    /**
    * 页面间回调抽象store
    */
    var AbstractPageCall = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.CONST_TAG = 'tag';
            this.CONST_BACKURL = 'backurl';
            this.CONST_CALLBACK = 'callback';
            this.CONST_CURVALUE = 'curvalue';
        },
        initialize: function ($super, options) {
            $super(options);
        },
        //保存的用户选中的值
        save: function (data,loadback) {
            var obj = this.get(), self = this,num = 0;
            if ($.isArray(obj.callback)) {
                $.each(obj.callback, function (i, v) {
                    self._callFunByStr(v, data,null,function(){
						num++;
						if(num === obj.callback.length){
							loadback && loadback();
						}
					});
					
                });
            } else {
                this._callFunByStr(obj.callback, data,null,function(){
					loadback && loadback();
				});
            }
        },
        /** 
        * 设置当前的配置
        * @param backurl  返回地址
        * @param callback 取到的数据传给那个方法
        * @param curvalue  
        */
        setCurrent: function (tag, backurl, callback, curvalue) {
            var obj = {};
            obj[this.CONST_TAG] = tag;
            obj[this.CONST_BACKURL] = backurl;
            obj[this.CONST_CALLBACK] = callback;
            obj[this.CONST_CURVALUE] = curvalue;
            this.set(obj);
        },
        /**
        * 获得当前的配置
        */
        getCurrent: function () {
            return this.get();
        },
        /**
        * 获得当前的值
        */
        getValue: function (loadback) {
            var obj = this.get();
            return this._callFunByStr(obj.curvalue, null, null, loadback);
        },
        //通过字符串调用某个类的方法
        _callFunByStr: function (str, data, scope, loadback) {
            scope = scope || Store;
            var minfo = /^(?:(\w*)::)?(\w*):(\w*)$/i.exec(str), Cls, Fun;
            if (minfo && minfo.length === 4) {
                if (minfo[1]) {
                    require([minfo[1]], function (namespace) {
                        var Cls = namespace[minfo[2]];
                        var Fun = minfo[3];
                        if (Cls && Cls.getInstance) {
                            var result = (Cls.getInstance()[Fun])(data);
                            loadback && loadback(result);
                        }
                    });
                } else {
                    Cls = scope[minfo[2]];
                    Fun = minfo[3];
                    if (Cls && Cls.getInstance) {
                        var result = (Cls.getInstance()[Fun])(data);
                        loadback && loadback(result);
                        return result;
                    }
                }
            }
            return false;
        }
    });

    /**
    * ==============常用地址列表Store
    */
    Store.CustomerAddrListStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'CAR_CUSTOMER_ADDR_LIST';
            this.lifeTime = '15D';
        },

        initialize: function ($super, options) {
            $super(options);
        },
        addAddr: function (addr, tag) {
            var data = this.get();
            if (!data) {
                data = {
                    'count': 0,
                    'addrs': []
                }
            }
            if (addr.inforId == 0) {
                addr.inforId = data.addrs.length + 1;
            }
            data.addrs.unshift(addr);
            data.count++;
            this.set(data, tag);
            return addr.inforId;
        },
        removeAddr: function (inforId, tag) {
            var data = this.get();
            var as = data.addrs;
            var idx = -1;
            for (var i = 0, ln = as.length; i < ln; i++) {
                if (as[i].inforId == inforId) {
                    idx = i;
                    break;
                }
            }
            if (idx > -1) {
                as.splice(idx, 1);
                data.count--;
            }
            this.set(data, tag);
        }
    });	
	
	/**
    * =================客户使用地址,单条
    */
    Store.CustomerAddrStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'CAR_CUSTOMER_ADDR';
            this.lifeTime = '30M';
            this.defaultData = {
                "addr": "",
                "addrId": 1,
                "cty": "",
                "destCtyId": 1,
                "dstr": "",
                "dstrId": 1,
                "edTime": "",
                "fee": 0,
                "gua": false,
                "ldTime": "",
                "mphone": "",
                "phone": "",
                "port": "",
                "prvn": "",
                "recipient": "",
                "rmk": "",
                "type": 1,
                "zip": "",
                'prvnId': '',
                'inforId': 0,
                "ctyName": "",
                "dstrName": "",
                "prvnName": ""
            };
        },
        initialize: function ($super, options) {
            $super(options);
        },
		setAddr: function (data) {
            this.set(data, Store.AddressStore.getInstance().getCurrent().tag);
        },
    });
	

    Store.AddressStore = new cBase.Class(AbstractPageCall, {
        __propertys__: function () {
            this.key = 'CAR_ADDRESS';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
	
	
	//选择城市
    Store.SelectAddrStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'CAR_SELECT_ADDR';
            this.lifeTime = '30M';
            this.rollbackEnabled = true;
            this.defaultData = {
                "addr": "",
                "addrId": 1,
                "cty": "",
                "destCtyId": 1,
                "dstr": "",
                "dstrId": 1,
                "edTime": "",
                "fee": 0,
                "gua": false,
                "ldTime": "",
                "mphone": "",
                "phone": "",
                "port": "",
                "prvn": "",
                "recipient": "",
                "rmk": "",
                "type": 1,
                "zip": "",
                'prvnId': '',
                'inforId': 0,
                "ctyName": "",
                "dstrName": "",
                "prvnName": ""
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

	//城市
    Store.PostCityStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'CAR_POST_CITY_DATA';
            this.lifeTime = '30D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

	//常用地址编辑model中请求parm
	Store.OperAddrStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'CAR_OPER_ADDR';
            this.lifeTime = '30M';
            this.defaultData = {
                'recipient': '',
                'addr': '',
                'zip': '',
                'prvnId': '',
                'prvnName': '',
                'ctyName': '',
                'dstrName': '',
                'inforId': 0
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    return Store;
});
