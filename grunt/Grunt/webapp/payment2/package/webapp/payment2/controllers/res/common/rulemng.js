define(['c', 'cUICore', 'cWidgetFactory', 'PayModel', 'PayStore', 'CommonStore', 'cUtility', 'paymentPipe', 'CrdtRule', "DeptRule"],
		function (c, cui, widgetFactory, payModel, payStore, CommonStore, cUtility, paymentPipe, CrdtRule, DeptRule) {

		    var valiRulesFn = function (params) {
		        params = params || {};
		        this.view = params.view;
		        this.module = params.module;
		        this.valHash = {};
		        this.isLayerShow = false; //true表示已经显示toast 或alert
		        this.isReRender = true;
		        var userCrtCardStore = payStore.SelectIdStore.getInstance(); //用户证件类型
		        var focused = 1;  //判断错误后第一个错误对象是否获取焦点

		        this.addRule = function (item) {
		            if (item && item.policyId && !this.valHash[item.policyId]) {
		                this.valHash[item.policyId] = item.valFn;
		            }
		        };

		        this.removeRule = function (policyId) {
		            if (policyId && this.valHash[policyId]) {
		                delete this.valHash[policyId];
		            }
		        };
		        this.updateRule = function (item) {
		            if (item && item.policyId && this.valHash[item.policyId]) {
		                this.valHash[item.policyId] = item.valFn;
		            }
		        };

		        this.updateModule = function () {
		            if (this.module == "deposit") {
		                this.valHash = DeptRule;
		            } else if (this.module == "credit") {
		                this.valHash = CrdtRule;
		            }
		        };
		        this.init = function () {
		            var self = this;

		            this.updateModule();
		        };
		        this.setReRender = function (bool) {
		            var _bool = !!bool;
		            this.isReRender = bool;
		        };
		        this.setModule = function (module) {
		            this.module = module;
		            this.updateModule();
		        };
		        this.setLayerShow = function (bool) {
		            var booln = !!bool;
		            if (typeof bool == "boolean") {
		                this.isLayerShow = bool;
		            }
		        };

		        this.showToast = function (mess, time, fn) {
		            var self = this.view;
		            if (!this.isLayerShow) {
		                self.showToast(mess, time, fn);
		                this.setLayerShow(true);
		            }
		        };

		        this.initErrAlert = function (title, message) {
		            var self = this.view,
				    _title = "",
				    msg = "";
		            if (arguments.length == 1) {
		                msg = arguments[0];
		            } else if (arguments.length == 2) {
		                _title = title;
		                msg = message;
		            }
		            if (!this.isLayerShow) {
		                var alert = new cui.Alert({
		                    title: _title || "",
		                    message: msg || "",
		                    buttons: [{
		                        text: '确认',
		                        type: "confirm",
		                        click: function () {
		                            this.hide();
		                        }
		                    }]
		                });
		                alert.show();
		                this.setLayerShow(true);
		            }
		        }

		        this.addErrClass = function (obj, wrapObj) {
		            if (focused) {
		                obj.focus();
		                focused = 0;
		            }
		            obj && obj.addClass("cui-input-error");
		            wrapObj && wrapObj.addClass("cui-input-error");
		        };

		        this.clearErrClass = function (obj, wrapObj) {
		            focused = 1;
		            obj && obj.removeClass("cui-input-error");
		            wrapObj && wrapObj.removeClass("cui-input-error");
		        };

		        this.isNull = function (value) {//是否为空， true：表示为空，反之，不为空
		            var value = value,
    		result = true;
		            if (typeof value == "string") {
		                value = value.trim();
		            } else if (typeof value == "number") {
		                value = value.toString().trim();
		            }

		            if (value) {
		                result = false;
		            }
		            return result;
		        };

		        /*
		        * @author sqsun@ctrip.com
		        * @description 转换到选择证件类型场景
		        */
		        this.showCardType = function () {
		            var self = this.view;
		            this.setReRender(false);
		            self.forward("payid?from=" + encodeURIComponent(self.getViewUrl()/*window.location.hash*/));
		        };
		        /*
		        * @author sqsun@ctrip.com
		        * @description 回调显示设置证件类型的值
		        */
		        this.showCardTypeFn = function (cardType, idNum) {
		            var store = userCrtCardStore;
		            if (store && store.get()) {
		                if (store.getAttr("idname") && store.getAttr("dcard")) {
		                    cardType.attr("data-value", store.getAttr("dcard"));
		                    cardType.html(store.getAttr("idname"));
		                }
		            } else {
		                cardType.attr("data-value", "1");
		                cardType.html("身份证");
		            }

		            //清空证件号
		            if (store.getAttr("changcard")) {
		                idNum.val("")
		            }

		            if (this.getCardTypeId() == 1) {
		                idNum.attr("maxlength", "18");
		            } else {
		                idNum.attr("maxlength", "40");
		            }
		        };
		        /*
		        * @author sqsun@ctrip.com
		        * @description 获取证件类型ID
		        */
		        this.getCardTypeId = function () {
		            var num = 0;
		            if (userCrtCardStore && userCrtCardStore.getAttr("dcard")) {
		                num = userCrtCardStore.getAttr("dcard");
		            } else {
		                num = 1;
		            }
		            return num;
		        };

		        /*
		        * @author sqsun@ctrip.com
		        * @description 获取输入正确的卡有效期
		        */
		        this.getDatePeriod = function (obj) {
		            var re = /^[0-9]*$/,
                        val = obj.val(),
                        fval = val.substr(0, 1),
                        objDom = obj[0];
		            if (!re.test(val)) {
		                val = val.replace(/[^0-9]/ig, "");
		                obj.val(val)
		            } else {
		                if (parseInt(fval) > 1) {
		                    setTimeout(function () {
		                        obj.val("");
		                        obj.val('0' + fval);
		                    }, 50)
		                }
		            }
		        };

		        this.init();
		    };

		    return valiRulesFn;
		});
