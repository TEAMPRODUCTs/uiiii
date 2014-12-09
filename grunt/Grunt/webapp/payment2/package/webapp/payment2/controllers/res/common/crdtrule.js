define(['c', 'cWidgetFactory', 'PayModel', 'PayStore', 'CommonStore', 'cUtility', 'paymentPipe','Business',"CommRule"],
		function (c, widgetFactory, payModel, payStore, CommonStore, cUtility, paymentPipe,Business,CommRule) {
	var rules = new CommRule();   
	
	//1:cvv;2:持卡人名称; 4：证件；8：证件号码；16：手机；32：验证码；64：有效期；128：卡号
	rules[1] = function(args){
		var obj = args.obj,wrapObj = args.wrapObj;
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
	        	self.clearErrClass(obj,wrapObj);
	        }
	    } else if (obj.val().trim().length < 3) {
	    	self.addErrClass(obj, wrapObj);
	        self.showToast("请输入正确的信用卡验证码，卡背面3位数字", 1.2);
	    }
	};
	//128：卡号
	rules[128] = function(args){//self表示的ruleMng的作用域
		var obj = args.obj,wrapObj = args.wrapObj;
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
	                self.clearErrClass(obj,wrapObj);
	            } else {
	            	self.addErrClass(obj, wrapObj);
	            	self.showToast("请输入正确的信用卡卡号，或更换其他的信用卡", 1.2);
	            }
	        }
	    }
	};
	
	return rules;
});
