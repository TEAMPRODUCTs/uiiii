define(['c', 'cWidgetFactory', 'PayModel', 'PayStore', 'CommonStore', 'cUtility', 'paymentPipe', 'Business'],
		function (c, widgetFactory, payModel, payStore, CommonStore, cUtility, paymentPipe, Business) {
		    var userCrtCardStore = payStore.SelectIdStore.getInstance(); //用户证件类型
		    var extendParamsStore = payStore.ExtendInfoStore.getInstance();
		    var payMentStore = payStore.PaymentWayStore.getInstance();
		    var cBase = c.base, cDate = cBase.Date;
		    var validates = c.utility.validate;
		    var getPayMeth = Business.getPayMeth;
		    //是否超出业务指定时间 true 有效期大于业务
		    var isBeforeGuranteeDay = function (expTimeStr) {
		        //###只需要将 expTimeStr  转换为201407的格式就好  其它转换不需要
		        var extStore = extendParamsStore, result = false;
		        var buExpTimeStr = extStore.getAttr("lastGuranteeDay");
		        //不存在业务指定时间时 默认不会超出业务指定时间
		        if (!buExpTimeStr) {
		            return true;
		        }
		        var _buExpTimeStr = cDate.parse("" + buExpTimeStr).format("Ym");
		        var buExpTime = _buExpTimeStr ? parseInt(_buExpTimeStr) : 0;
		        var yyStr = expTimeStr.substring(2, 4);
		        var mmStr = expTimeStr.substring(0, 2);
		        var expTime = '20' + yyStr + mmStr;
		        if (expTime >= buExpTime) {
		            result = true;
		        }
		        return result;
		    }


		    var showErrOnCrdt = function (_params) {
		        var num = 0;
		        if (userCrtCardStore && userCrtCardStore.getAttr("dcard")) {
		            num = userCrtCardStore.getAttr("dcard");
		        } else {
		            num = 1;
		        }
		        var cardTypeId = num;
		        var valHash = _params.params.valHash, value = _params.value, self = _params._scope;
		        var obj = _params.params.obj, wrapObj = _params.params.wrapObj;
		        if (!valHash[4]) {
		            if (value.length <= 40) {
		                if (/[^\(\)\d a-z]/gi.test(value)) {
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("请输入正确的证件号码");
		                } else {
		                    self.clearErrClass(obj, wrapObj);
		                }
		            } else { //超过40字符
		                self.addErrClass(obj, wrapObj);
		                self.showToast("请输入正确的证件号码");
		            }
		        } else { //证件类型显示
		            if (cardTypeId == 1) { //身份证
		                if (value.length == 18) {
		                    if (/[^\dx]/gi.test(value)) {
		                        self.addErrClass(obj, wrapObj);
		                        self.showToast("请输入正确的证件号码");
		                    } else if (validates.isIdCard(value)) {
		                        self.clearErrClass(obj, wrapObj);
		                    } else {
		                        self.addErrClass(obj, wrapObj);
		                        self.showToast("请输入正确的证件号码");
		                    }
		                } else if (value.length == 15) { //15位
		                    self.addErrClass(obj, wrapObj);
		                    self.initErrAlert("根据国家规定，2013年1月起一代身份证停用。请填写二代身份证号。");
		                } else {
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("请输入正确的证件号码");
		                }
		            } else if (cardTypeId == 4) { //军人证
		                if (value.length <= 40) {
		                    if (/[^\{\d\u4e00-\u9fa5 a-z]/gi.test(value)) {
		                        self.addErrClass(obj, wrapObj);
		                        self.showToast("请输入正确的证件号码");
		                    } else {
		                        self.clearErrClass(obj, wrapObj);
		                    }
		                } else { //超过40字符
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("请输入正确的证件号码");
		                }
		            } else { //除去 身份证，军人证
		                if (value.length <= 40) {
		                    if (/[^\(\)\d a-z]/gi.test(value)) {
		                        self.addErrClass(obj, wrapObj);
		                        self.showToast("请输入正确的证件号码");
		                    } else {
		                        self.clearErrClass(obj, wrapObj);
		                    }
		                } else { //超过40字符
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("请输入正确的证件号码");
		                }
		            }
		        }
		    };

		    var ruleFn = function () { };

		    //1:cvv;2:持卡人名称; 4：证件；8：证件号码；16：手机；32：验证码；64：有效期；128：卡号
		    ruleFn.prototype[1] = function (args) {
		        var obj = args.obj, wrapObj = args.wrapObj;
		        var value = obj.val();
		        var self = this;
		        if (self.isNull(obj.val())) {
		            self.addErrClass(obj, wrapObj);
		            self.showToast("请输入信用卡验证码，卡背面3位数字", 1.2);
		        } else if (obj.val().trim().length >= 3 && obj.val().trim().length <= 4) {
		            value = value.trim();
		            if (/\D/gi.test(value)) {
		                self.addErrClass(obj, wrapObj);
		                self.showToast("请输入正确的信用卡验证码，卡背面3位数字", 1.2);
		            } else {
		                self.clearErrClass(obj, wrapObj);
		            }
		        } else if (obj.val().trim().length < 3) {
		            self.addErrClass(obj, wrapObj);
		            self.showToast("请输入正确的信用卡验证码，卡背面3位数字", 1.2);
		        }
		    };
		    ruleFn.prototype[2] = function (args) {//2:持卡人名称; 
		        var obj = args.obj, wrapObj = args.wrapObj;
		        var self = this;
		        var value = obj.val(),
		engText = "",
		otherText = "",
		contentLen = 0;
		        if (self.isNull(value)) {
		            self.addErrClass(obj, wrapObj);
		            self.showToast("请输入持卡人姓名", 1.2);
		        } else { //输入框有值
		            value = value.trim();
		            engText = value.match(/[a-z]/gi) || [];
		            otherText = value.match(/[^a-z]/gi) || [];
		            contentLen = engText.length + otherText.length * 2;
		            if (/[^\s\/\u4e00-\u9fa5 a-z]/gi.test(value)) {
		                self.addErrClass(obj, wrapObj);
		                self.showToast("请输入正确的持卡人姓名，只能包含汉字、英文字母、斜杠", 1.2);
		            } else {
		                if (contentLen >= 4 && contentLen <= 40) {
		                    self.clearErrClass(obj, wrapObj);
		                } else {
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("请输入正确的持卡人姓名，只能包含汉字、英文字母、斜杠", 1.2);
		                }
		            }
		        }
		    };
		    //4：证件；
		    ruleFn.prototype[4] = function () { };
		    //8：证件号码；
		    ruleFn.prototype[8] = function (args) {
		        var obj = args.obj, wrapObj = args.wrapObj;
		        var self = this;
		        var value = obj.val();
		        if (self.isNull(value)) {
		            self.addErrClass(obj, wrapObj);
		            self.showToast("请输入证件号码", 1.2);
		        } else { //证件号码存在
		            value = value.trim();
		            showErrOnCrdt({
		                value: value,
		                _scope: self,
		                params: args
		            });
		        }
		    };
		    //16：手机；
		    ruleFn.prototype[16] = function (args) {
		        var obj = args.obj, wrapObj = args.wrapObj;
		        var self = this;
		        var value = obj.val();
		        if (self.isNull(value)) {
		            self.addErrClass(obj, wrapObj);
		            self.showToast("请填写手机号码", 1.2);
		        } else {
		            value = value.trim();
		            if (value.length == 11) {
		                if (/\D/gi.test(value)) {
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("请填写正确的手机号码", 1.2);
		                } else if (/\d{11}/g.test(value)) {
		                    self.clearErrClass(obj, wrapObj);
		                }
		            } else {
		                self.addErrClass(obj, wrapObj);
		                self.showToast("请填写正确的手机号码", 1.2);
		            }
		        }
		    };
		    //32：验证码；
		    ruleFn.prototype[32] = function (args) {
		        var obj = args.obj, wrapObj = args.wrapObj;
		        var self = this;
		        var value = obj.val().trim();

		        if (self.isNull(value)) {
		            self.addErrClass(obj, wrapObj);
		            self.showToast("请输入短信验证码", 1.2);
		        } else {
		            value = value.trim();
		            if (value.length == 6) {
		                if (/\d{6}/g.test(value)) {
		                    self.clearErrClass(obj, wrapObj);
		                } else {
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("验证码错误,请重试", 1.2);
		                }
		            } else {
		                self.addErrClass(obj, wrapObj);
		                self.showToast("验证码错误,请重试", 1.2);
		            }
		        }
		    };
		    //64：有效期；
		    ruleFn.prototype[64] = function (args) {
		        var obj = args.obj, wrapObj = args.wrapObj;
		        var value = obj.val(),
                    reg = /\d{4}/gi;
		        var self = this;
		        if (self.isNull(value)) {
		            self.addErrClass(obj, wrapObj);
		            self.showToast("有效期填写错误，请检查", 1.2);
		        } else {
		            value = value.trim();
		            if (reg.test(value)) {
		                var month = Number(value.substr(0, 2)), year = Number(value.substr(2));
		                var date = new Date(), currMon = date.getMonth() + 1, currYear = date.getFullYear() ? date.getFullYear() : 2014;
		                var tempStr = "";
		                if (month < 1) {
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("有效期填写错误，请检查", 1.2);
		                    return
		                }
		                if (currYear) {
		                    tempStr = currYear.toString();
		                    if (tempStr.length == 4) {
		                        currYear = parseInt(tempStr.slice(2));
		                    }
		                }
		                if (month > 12) {
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("有效期填写错误，请检查", 1.2);
		                } else if ((year < currYear ? true : (year == currYear && month < currMon ? true : false))) {
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("信用卡已过期，请重新填写或更换新卡", 1.2);
		                } else {
		                    var hasvalid = false;
		                    if (getPayMeth() == 1) {
		                        if (year < currYear) {
		                            hasvalid = true;
		                            self.addErrClass(obj, wrapObj);
		                            self.showToast("有效期填写错误，请检查", 1.2);
		                        } else if (year == currYear) {
		                            if (month >= currMon) {
		                                self.clearErrClass(obj, wrapObj);
		                            } else {
		                                hasvalid = true;
		                                self.addErrClass(obj, wrapObj);
		                                self.showToast("信用卡即将过期，请重新填写或更换新卡", 1.2);
		                            }
		                        } else {
		                            self.clearErrClass(obj, wrapObj);
		                        }
		                    } else if (getPayMeth() == 2) {//担保
		                        //担保+1月 大于12月年+1 月变成1
		                        if (month + 1 > 12) {
		                            month = 1;
		                            year += 1;
		                        } else {
		                            month += 1;
		                        }
		                        if (year < currYear) {
		                            hasvalid = true;
		                            self.addErrClass(obj, wrapObj);
		                            self.showToast("有效期填写错误，请检查", 1.2);
		                        } else if (year == currYear) {

		                            if (month > currMon + 1) {
		                                self.clearErrClass(obj, wrapObj);
		                            } else {
		                                hasvalid = true;
		                                self.addErrClass(obj, wrapObj);
		                                self.showToast("信用卡即将过期，请重新填写或更换新卡", 1.2);
		                            }
		                        } else {
		                            self.clearErrClass(obj, wrapObj);
		                        }
		                    }
		                    //只有担保 才判断业务时间
		                    //if (!hasvalid && (getPayMeth() == 2)) {
		                    if (!hasvalid) {
		                        if (!isBeforeGuranteeDay(value)) {
		                            self.addErrClass(obj, wrapObj);
		                            self.showToast("信用卡即将过期，请重新填写或更换新卡", 1.2);
		                        } else {
		                            self.clearErrClass(obj, wrapObj);
		                        }
		                    }
		                }
		            } else {
		                self.addErrClass(obj, wrapObj);
		                self.showToast("有效期填写错误，请检查", 1.2);
		            }
		        }
		    };
		    //128：卡号
		    ruleFn.prototype[128] = function (args) {//self表示的ruleMng的作用域
		        var obj = args.obj, wrapObj = args.wrapObj;
		        var value = obj.val();
		        var self = this;
		        if (self.isNull(value)) {
		            self.addErrClass(obj, wrapObj);
		            self.showToast("请输入信用卡号码", 1.2);
		        } else {
		            value = value.trim().replace(/\s/g, "");
		            if (/\D/gi.test(value)) {
		                self.addErrClass(obj, wrapObj);
		                self.showToast("请输入正确的信用卡卡号，或更换其他的信用卡", 1.2);
		            } else { //是数字
		                if (value.length >= 14 && value.length <= 16) {
		                    self.clearErrClass(obj, wrapObj);
		                } else {
		                    self.addErrClass(obj, wrapObj);
		                    self.showToast("请输入正确的信用卡卡号，或更换其他的信用卡", 1.2);
		                }
		            }
		        }
		    };

		    return ruleFn;
		});
