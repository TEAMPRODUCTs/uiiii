define(['libs', 'c', 'VaBaseView', 'GolfModel', 'GolfStore'], function (libs, c, pageview, model, store) {
    var orderParam = store.OrderParamStore.getInstance();
    var codeMap = {
        301:'保存订单失败',
        302:'单选项库存不足',
        303:'可选项库存不足',
        304:'酒店订单下单失败',
        305:'机票订单下单失败',
        306:'游轮订单下单失败',
        307:'生成销货单及明细失败',
        308:'优惠券使用消费券错误',
        309:'暂存单已过期',
        310:'该订单已提交'
    };

    /**TODO*/
    var errmsg = {
        "err2002": "用户信息不能为空",
        "err2003": "联系人信息不能为空",
        "err2004": "门票信息不能为空",
        "err2005": "门票份数不在正确范围之内",
        "err2006": "支付类型只能为现付或者预付",
        "err2007": "门票使用日期不正确"
    };
    var groupView = pageview.extend({
        render: function () {
        },
        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },
        events: {},
        onLoad: function () {
            this.headerview.set({
                title: '订单出错',
                back: true,
               /* home: true,*/
                view: this,
                tel: {
                    number: 4000086666
                },
                events: {
                    returnHandler: function () {
                        this.back();
                    }/*,
                    homeHandler: function () {
                        this.jump('/html5/')
            }*/
                }
            });
            this.headerview.show();
            this.updatePage();
            this.turning();
        },
        updatePage: function (cb) {
            var self = this;
            var code = +this.getQuery('code');
            var orderid = this.getQuery('orderid');
            var pid = this.getQuery('pid');

            self.showToast(errmsg["err"+code] || "网络不给力，请稍后重试");
            IWanUtil.app_goto_order();
            /*if (code === 302 || code === 303 || code === 304 || code === 305 || code === 306 || code === 307) {
                this.showToast('库存不足，请重新选择', 3, function () {
                    if (self.vaStorage && self.vaStorage.get('booking.step2')) {
                        self.forward('booking.step2');
                    } else {
                        self.forward('detail?pid=' + pid);
                    }
                });
            } else if(code === 308) {
                this.showToast(codeMap[code], 3, function () {
                    self.forward('order?orderid=' + orderid);
                });
            } else {
                this.showToast(codeMap[code], 3, function () {
                    self.forward('detail?pid='+pid);
                });
            }*/
        },
        onShow: function () {

        },
        onHide: function () {

        }
    });
    return groupView;
});