define(['libs', 'c', 'cBasePageView', 'GolfModel', 'GolfStore','CommonStore', 'text!templates/golf.order.sback.html','cWidgetFactory', 'cWidgetGuider'], function (libs, c, pageview, model, store, CommonStore, html, WidgetFactory) {
    var orderParam = store.OrderParamStore.getInstance();
    var submitModel = model.SubmitOrderModel.getInstance();
    var headStore = CommonStore.HeadStore.getInstance();
    var headInfo = headStore.get();
    var isInApp = c.utility.isInApp();
    var Guider = WidgetFactory.create('Guider');

    var bookingconfirm = store.BookingConfirmParam.getInstance(),
    bookingtemp = store.BookingConfirmTemp.getInstance(),
    userStore = CommonStore.UserStore.getInstance();
    bookingtemp.setURLParamsToStore();

    var groupView = pageview.extend({
        pageid : '275006',
        hpageid : '276006',
        render: function (tpl) {
            this.$el.html(tpl);
        },
        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },
        events: {
            'click .ticket_borderbox': 'toDetail',
            'click .try_again': 'tryAgain',
            'click .back_to_home_box': 'backToHome'
        },
        onLoad: function () {
            this.getData();
            //TODO TEST
/*            this.submit(function (data) {
                this.render(_.template(html)(data));
            });*/
            if (userStore.isLogin()) {
                this.submit(function (data) {
                    this.render(_.template(html)(data));
                });
            }else{

            }
            this.turning();
        },

        /*重试网络不好*/
        tryAgain: function () {
            this.onLoad();
        },

        //加工数据
        getData: function () {
            var temp = bookingtemp.get();
            //temp.paytype 支付方式大类，支持位运算1=礼品卡 2=信用卡 4=第三方
            var param = {};
            param.tempoid = temp.orderid;
            // param.amt = bookingdata.amt;
            param.payinfo = {
                "paytype" : temp.paytype == 4 ? 1 : 0, //1第三方支付 0非第三方支付
                "paymode" : 1, //0=bill模式 1=LPT模式
                "extno" : temp.externalno,
                "billno" : temp.billno
            };
            bookingconfirm.setParam(param);
        },

        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            if(window.location.hash.split('?').length > 1){
                var r = window.location.hash.split('?')[1].match(reg);
                if (r != null) return unescape(r[2]); return null;
            }
            return null;
        },
        goThrid: function(data){
            var tsback, tpback, host, url, urls =[];
            data = JSON.parse(data);
            tsback = "/webapp/golf/#golf.order.sback?ordID=" + data.orderNo;
            tpback = "/webapp/golf/#order.detail?oid=" + data.orderNo;
            host = isInApp ? "" : "http://" + location.host;
            tsback = encodeURIComponent(host + tsback);
            tpback = encodeURIComponent(host +tpback);
            var temp = bookingtemp.get();
            var confirmdata = bookingconfirm.get();
            var param = {
                saveID : temp.saveid, //缓存ID
                orderID : data.orderNo, //订单号
                billNo : confirmdata.payinfo.billno, //服务端收款单号（Bill模式必须）
                externalNo : confirmdata.payinfo.extno,//第三方流水号（LTP必须必须）
                errorCode : "",//   String  错误代码(预留)
                auth : headInfo.auth,//  登陆后服务端下发的auth
                tsBack :  tsback,//第三方支付支付完成跳转页面URL，如需要其他参数，可在URL后面拼接
                tpBack :  tpback//第三方支付取消后跳转页面URL，如需要其他参数，可在URL后面拼接
            };
            for (var key in param) {
                urls.push(key + '=' + param[key]);
            };
            url = urls.join('&');
            if (url.indexOf("?") < 0) {
                url = "?" + url
            }

            if (isInApp) {
                temp.backurl = temp.backurl.replace("file:///webapp/","");
                var path = temp.backurl.split("/");
                //TODO TEST alert(path[0] + " temp.backurl: " + temp.backurl);
                Guider.cross({ path: path[0], param: path[1] + url });
                return;
            }
            window.location.href = temp.backurl + url;
        },
        goSelf: function(cb, data){
            cb.call(this, JSON.parse(data));
        },
        submit: function (cb) {
            var self = this;
            //orderParam.setAttr('forder',$.extend( {"amount": 200.00, "onPayAmount": 0.00, "payMode":"P", "prePayAmount":200.00, "orderNo":1038062062, "orderName":"订场", "totalAmount":200.00, "actualAmount":200.00, "prePayCardAmount":0.00, "currency":"CNY"},{ orderName:"套餐", totalAmount:66 }));
/*            var data = {"amount": 200.00, "onPayAmount": 0.00, "payMode":"P",  "prePayAmount":200.00, "orderName":"订场", "totalAmount":200.00, "actualAmount":200.00, "prePayCardAmount":0.00, "currency":"CNY"};
            orderParam.setAttr('forder',$.extend(data,{orderNo:'2'}));
            cb.call(this, data);
            return;*/
            var param = orderParam.get();
            var tmpOrdID = this.getQueryString('ordID');
            var payType = this.getQueryString('payType');//payType -1
            var isThird = payType==4 ? 1:0;
            if (!tmpOrdID) {
                this.showToast('数据出错');
                return;
            }
            //如果返回的时候/*TODO **/
            if (param && param.forder && param.forder.orderNo == tmpOrdID) {
                this.orderid = param.forder.orderNo;
                self.headerReset();
                cb.call(this, param.forder);
                return;
            }
            self.showLoading();
            //TODO TEST
           // submitModel.setParameter("35A75304F527F719F25499F2F04E19DA00830D75D158D4F9B275C3DE59E1D52B", parseInt(tmpOrdID),  isThird);
            submitModel.setParameter(headInfo.auth, parseInt(tmpOrdID),  isThird);
            submitModel.execute(function (data) {
                self.hideLoading();
                var bookingconfirmdata = bookingconfirm.get();
                //CtripUtil.app_log("submitModel", data.orderNo);
                if(data.orderNo){
                    self.orderid = data.orderNo;
                    data = JSON.stringify(data);
                    orderParam.setAttr('forder',$.extend(data,{orderNo:self.orderid }));
                    if (bookingconfirmdata.payinfo.paytype == 1) {
                        self.goThrid(data);
                        return;
                    };
                    //self.showToast("提交订单成功");
                    self.headerReset();
                    self.goSelf(cb, data);
                    //cb.call(self, JSON.parse(data));
                }else{
                    self.showToast(data.message || '出错', 3, function(){
                        IWanUtil.app_goto_order();
                    });
                }
            }, function () {
                //CtripUtil.app_log("submitModel", "订单失败");
                self.hideLoading();
                self.headerview.set({
                    title: '订单失败',
                    back: true,
                    home: true,
                    view: this,
                    events: {
                        returnHandler: function () {
                            IWanUtil.app_back_to_home();
                        },
                        homeHandler: function () {
                            IWanUtil.app_back_to_home();
                        }
                    }
                });
                self.headerview.show();
                orderParam.setAttr('forder',$.extend({},{orderNo:''}));
                cb.call(self, orderParam.get().forder);
            }, false, this);
        },
        headerReset: function(){
            var self = this;
            self.headerview.reset({
                title: '订单完成',
                back: true,
                home: true,
                view: this,
                events: {
                    returnHandler: function () {
                        IWanUtil.app_back_to_home();
                    },
                    homeHandler: function () {
                        IWanUtil.app_back_to_home();
                    }
                }
            });
            self.headerview.show();
        },
        toDetail: function () {
            IWanUtil.app_goto_order_detail(this.orderid);
        },
        backToHome: function(){
            IWanUtil.app_back_to_home();
        },
        onShow: function () {

        },
        onHide: function () {

        }
    });
    return groupView;
});