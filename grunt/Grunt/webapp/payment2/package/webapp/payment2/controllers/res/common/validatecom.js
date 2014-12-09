define(['c', 'cWidgetFactory', 'PayModel', 'PayStore', 'CommonStore', 'cUtility', 'paymentPipe', 'RuleManager'],
		function (c, widgetFactory, payModel, payStore, CommonStore, cUtility, paymentPipe, RuleManager) {

		    /*function valiComItem(obj){
		    this.id = obj.id;
		    this.policyId = obj.policyId;
		    this.wrapId = obj.wrapId;
		    this.isVali = obj.isVali;
		    this.valFn = obj.valFn;
		    this.tpl = obj.tpl;
		    }*/

		    function valCom(params) {
		        this.prefix = params.prefix;
		        this.container = params.container;
		        this.initViewEle = params.initViewEle || null;
		        this.view = params.view;
		        this.module = params.module;
		        this.cacheArr = [];
		        this.policyIds = []; //实例化对象时，验证policy数组的policyid集合
		        this.rules = null;

		        this.valHash = {};
		        this.valiArr = [];
		        this.oriArr = [];
		        this.add = function (item) {
		            var self = this;
		            if (item) {
		                if (item instanceof Array) {
		                    _.each(item, function (ele, index) {
		                        if (ele && ele.policyId && !self.valHash[ele.policyId]) {
		                            self.valiArr.push(ele);
		                            self.container.append(ele.tpl());
		                            self.valHash[ele.policyId] = ele;
		                        }
		                    });
		                } else if (typeof item == "object") {
		                    if (ele && ele.policyId && !this.valHash[item.policyId]) {
		                        this.valiArr.push(item);
		                        this.container.append(item.tpl());
		                        this.valHash[item.policyId] = item;
		                    }
		                }
		            }
		        };

		        this.setModule = function (module) {
		            this.module = module;
		            this.rules.setModule(module);
		        };

		        this.beforeInit = function () {
		            var obj = params;
		            var self = this;
		            var arr = [];
		            if (obj && obj.valiArr) {
		                if (!!obj.valiArr) {
		                    this.oriArr = obj.valiArr;
		                } else {
		                    this.oriArr = [];
		                }
		                arr = _.pluck(obj.valiArr, 'policyId');
		            }
		            this.policyIds = arr;
		            this.rules = new RuleManager({
		                view: self.view,
		                module: self.module
		            });
		        };

		        this.beforeInit();
		        this.render = function (policyId) {
		            var num = 1;
		            if (policyId && typeof policyId == "number") {
		                for (var i = 0; i < 8; i++) {
		                    num = Math.pow(2, i);
		                    if ((policyId & num) > 0) {
		                        this.switchPolicy(num);
		                    }
		                }
		            }
		            this.flush(this.getSortArr());
		            this.initViewEle && this.initViewEle();
		        };
		        this.initValiCom = function (policyId, isOld) { //初始化
		            var self = this;
		            console.log("isReRender: " + this.rules.isReRender);
		            if (!!this.rules.isReRender) {
		                this.setOrigin();
		                this.render(policyId);
		            }
		        };

		        /*this.addErrClass = function(obj){
		        this.container.find("#"+obj.id).addClass("cui-input-error");
		        this.container.find("#"+obj.wrapId).addClass("cui-input-error");
		        };
		
		        this.clearErrClass = function(obj){
		        this.container.find("#"+obj.id).removeClass("cui-input-error");
		        this.container.find("#"+obj.wrapId).removeClass("cui-input-error");
		        };*/

		        /*this.needVali = function(num){
		        var temp = null;
		        temp = _.find(this.valiArr,function(item){return item.policyId == num;}); 
		        if(temp){ temp.isVali = true;}
		        };*/

		        this.setPolicyFn = function (policyObj, isforce) {
		            var self = this;
		            if (this.valiArr instanceof Array && this.valiArr.length > 0) {
		                _.each(this.valiArr, function (ele, index) {
		                    if (ele.policyId == policyObj.policyId) {
		                        if (isforce) {
		                            self.valiArr.splice(index, 1, policyObj);
		                        } else {
		                            for (var per in policyObj) {
		                                ele[per] = policyObj[per];
		                            }
		                        }
		                    }
		                });
		            }
		        };

		        this.validate = function (succFn) {
		            var self = this;
		            var rules = this.rules;
		            rules.setLayerShow(false); //重置isLayerShow 为false
		            _.each(this.valiArr, function (item, index) {
		                if (item && item.isVali) {
		                    if (item.valFn && typeof item.valFn == "function") {
		                        item.valFn({
		                            obj: self.container.find("." + item.id),
		                            wrapObj: self.container.find("." + item.wrapId),
		                            valHash: self.valHash,
		                            policyId: item.policyId
		                        });
		                    } else {
		                        rules && rules.valHash[item.policyId] && _.bind(rules.valHash[item.policyId], rules)({
		                            obj: self.container.find("." + item.id),
		                            wrapObj: self.container.find("." + item.wrapId),
		                            valHash: self.valHash,
		                            policyId: item.policyId
		                        });
		                    }
		                }
		            });

		            if (!!this.getErrResult()) {
		                succFn && succFn();
		            }
		        };

		    }

		    valCom.prototype.getErrResult = function () {
		        var result = true, firstInput = 1;
		        var eleArr = this.container.find(".cui-input-error");
		        if (eleArr) {
		            eleArr.each(function (index, item) {
		                if ($(item).hasClass("cui-input-error")) {
		                    result = false;
		                    //第一个错误的提示点获取焦点
		                    if ($(item).find('input').length > 0) {
		                        if (firstInput) {
		                            firstInput = 0;
		                            $(item).find('input').focus();
		                        }
                                //清空所有错误字段的值
		                        $(item).find('input').val("");
		                    }

		                }
		            });
		        }
		        return result;
		    };

		    valCom.prototype.setOrigin = function () {
		        this.container.html("");
		        this.valHash = {};
		        this.valiArr = [];
		        this.cacheArr = [];  //缓存数组

		    };

		    valCom.prototype.getSortArr = function () {
		        var tempArr = [];
		        var self = this;
		        var tempObj = null;
		        if (this.policyIds instanceof Array && this.policyIds.length > 0) {
		            _.each(this.policyIds, function (ele, index) {
		                tempObj = _.find(self.cacheArr, function (item) { return item.policyId == ele; });
		                if (tempObj) {
		                    tempArr.push(tempObj);
		                }
		            });
		        }
		        return tempArr;
		    };

		    valCom.prototype.flush = function (arr) {
		        if (arr instanceof Array && arr.length > 0) {
		            this.add(arr);
		        }
		    };
		    valCom.prototype.switchPolicy = function (num) {
		        var self = this;
		        var policyObj = null;
		        policyObj = _.find(this.oriArr, function (item) { return item.policyId == num; });
		        if (policyObj) {
		            this.cacheArr.push(policyObj);
		        }
		    };
		    return valCom;
		});
