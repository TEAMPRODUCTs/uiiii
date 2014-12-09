define(['c', 'cWidgetFactory', 'PayModel', 'PayStore', 'CommonStore', 'cUtility', 'paymentPipe','Business',"CommRule"],
		function (c, widgetFactory, payModel, payStore, CommonStore, cUtility, paymentPipe,Business,CommRule) {
	var rules = new CommRule(); 
	
	rules[128] = function(args){//128:表示卡号
		var obj = args.obj,wrapObj = args.wrapObj;
		var value = obj.val();
		var self = this;
        if (self.isNull(value)) {
        	self.addErrClass(obj, wrapObj);
            self.showToast("请输入储蓄卡卡号码", 1.2);
        } else {
            value = value.trim().replace(/\s/g, "");
            if (/\D/gi.test(value)) {
            	self.addErrClass(obj, wrapObj);
                self.showToast("请输入正确的储蓄卡卡号，或更换其他的储蓄卡", 1.2);
            } else { //是数字
                if (value.length >= 12 && value.length <= 19) {
                	self.clearErrClass(obj,wrapObj);
                } else {
                	self.addErrClass(obj, wrapObj);
                    self.showToast("请输入正确的储蓄卡卡号，或更换其他的储蓄卡", 1.2);
                }
            }
        }
	};
	
	return rules;
});
