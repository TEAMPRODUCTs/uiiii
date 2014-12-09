define(['c', 'PayStore', 'Util'], function (c, payStore, Util) {

    var paymentcard = payStore.PayMentCardParamStore.getInstance(); //存放礼品卡支付的信息5.4
    var orderDetailStore = payStore.OrderDetailStore.getInstance();
    var ret = {};

    ret.setLIPINCard = function(json) {
        var self = ret;
        var that = this;
        var myObj = orderDetailStore.get() || {}, //Edit by sqsun 20141023 对象做容错降级处理
        html,
        viewData = {},
        reg = /([0-9]+\.[0-9]{2})[0-9]*/;
        var _walletlist = json.walletlist || [];
        var _tkts = json.tktinfo && json.tktinfo.tkts || [];
        //去掉任我住
        if (json.tktinfo && json.tktinfo.tkts) {
            json.tktinfo.tkts = _tkts = self.filterRWZ(_tkts);
        }

        //有辅助币种的时候 钱包不可用
        if (myObj && myObj.displayCurrency && myObj.displayAmount) {
            that.els.lipinCard.empty().hide();
            return;
        }

        //判断是否显示礼品卡模块
        if (self.isAllNoMoney(json)) {
            that.els.lipinCard.empty().hide();
            return;
        }

        //钱包余额不可用和礼品卡不可用或没有下发则显示5.7.1钱包状态 - 4 本单不可使用携程钱包支付文案
        if (self.isAllUnable(json)) {
            viewData.type = 3;
            html = that.templateLipinCard(viewData);
            that.els.lipinCard.html(html).show();
            return;

        }

        //拉取用户账户信息检查有没有设置礼品卡交易密码
        //if (!orderDetailStore.getAttr("haspass")) {
        //self.isHasPass();
        //}


        if (self.isQbAble(json)) {
            viewData.type = 1;
            viewData.laveamount = myObj.totalamount;
            viewData.useamount = 0;
            //钱包支付可用金额=余额可用金额+礼品卡可用金额
            viewData.amount = self.getRemain(_walletlist) + self.getRemainCard(_tkts);
            //保留2位小数
            viewData.amount = viewData.amount + "";
            viewData.amount = parseFloat(viewData.amount.replace(reg, "$1"));

            //礼品卡页面 回退支付页面 钱包余额非全额支付
            if (paymentcard.getAttr('orderid') !== -1) {
                //继续未完成的支付
                if (paymentcard.get().cardInfo && paymentcard.get().cardInfo.laveamount) {
                    viewData.laveamount = paymentcard.get().cardInfo.laveamount;
                    viewData.useamount = Util.folatcount(myObj.totalamount, paymentcard.get().cardInfo.laveamount, "-");
                    //修复使用金额会为很多小数的问题
                    viewData.useamount = Util.remain2Num(viewData.useamount);
                }
                console.log('继续未完成的支付');
            }
            if (viewData.useamount > 0) {
                //钱包余额非全额支付
                viewData.useamount = viewData.useamount;
            } else {
                //钱包余额模组默认不使用，点击进入余额界面
                viewData.useamount = "去使用";
            }
            viewData.laveamount = viewData.laveamount; //还需支付金额

            html = that.templateLipinCard(viewData);
            that.els.lipinCard.html(html).show();
            //不使用礼品卡时 不出现还需支付金额
            if (viewData.useamount > 0) {
                that.$el.find('#order_leaveamount_p').html(self.showStillAmount(parseFloat(viewData.laveamount)));
                that.$el.find('#order_leaveamount_p').show();
            } else {
                that.$el.find('#order_leaveamount_p').hide();
            }
            return;
        }

        if (json && json.paytype && (((json.paytype & 32) == 32) || ((json.paytype & 1) == 1))) {
            //钱包余额为0
            if (!(_walletlist[0].cashbalance > 0) && self.isAllTktUnable(json) && !self.isAllTktNoMoney(_tkts)) {
                viewData.type = 4;
                html = that.templateLipinCard(viewData);
                that.els.lipinCard.html(html).show();
                return;
            }
            //礼品卡可用余额为0，不可能有余额
            viewData.type = 2;
            viewData.wallertlist = _walletlist;
            viewData.tkts = _tkts;

            html = that.templateLipinCard(viewData);
            that.els.lipinCard.html(html).show();

        } else {
            //不支持钱包模组
            this.els.lipinCard.empty().hide();
        }
    }

    ret.filterRWZ = function (tkts) {
        var _tkts = [];
        for (var i = 0; i < tkts.length; i++) {
            if (tkts[i].tkttype < 3) {
                _tkts.push(tkts[i]);
            }
        }
        return _tkts;
    }

    //判断是否 全部金额为0（礼品卡 钱包）
    ret.isAllNoMoney = function (items) {
        var wallertlist = items.walletlist || [];
        for (var i = 0; i < wallertlist.length; i++) {
            if (wallertlist[i].cashbalance > 0) {
                return false;
            }
        }

        var tkts = (items.tktinfo && items.tktinfo.tkts) || [];
        for (var i = 0; i < tkts.length; i++) {
            if (tkts[i].amount > 0) {
                return false;
            }
        }

        return true;
    },
    //判断是否 全部不可用（礼品卡 钱包）
    ret.isAllUnable = function (items) {
        var wallertlist = items.walletlist || [];
        for (var i = 0; i < wallertlist.length; i++) {
            if (wallertlist[i].status == 1) {
                return false;
            }
        }

        var tkts = (items.tktinfo && items.tktinfo.tkts) || [];
        for (var i = 0; i < tkts.length; i++) {
            if (tkts[i].status == 0) {
                return false;
            }
        }

        return true;
    },
    //判断是否 有至少一张可用（礼品卡 钱包）
    ret.isQbAble = function (items) {
        var wallertlist = items.walletlist || [];
        for (var i = 0; i < wallertlist.length; i++) {
            if (wallertlist[i].status == 1 && wallertlist[i].cashbalance > 0) {
                return true;
            }
        }

        var tkts = (items.tktinfo && items.tktinfo.tkts) || [];
        for (var i = 0; i < tkts.length; i++) {
            if (tkts[i].status == 0 && tkts[i].amount > 0) {
                return true;
            }
        }

        return false;
    },
    //获取钱包余额(可用 白名单支持)
    ret.getRemain = function (list) {
        list = list || [];
        var total = 0;
        _.each(list, function (obj) {
            if (obj.status == 1) {
                total += obj.cashbalance * 1;
            }
        })
        return total;
    },
    //获取礼品卡余额（可用 白名单支持）
    ret.getRemainCard = function (list) {
        list = list || [];
        var total = 0;
        _.each(list, function (obj) {
            if (obj.status == 0) {
                total += obj.amount * 1;
            }
        })
        return total;
    },
    ret.showStillAmount = function (mnum) {
        var znumArray = Util.transNumToFixedArray(mnum);
        var currency = (orderDetailStore.getAttr('currency') || '￥');
        if (currency == 'CNY') {
            currency = '￥';
        }
        var arrayStr = new Array();
        arrayStr.push("还需支付：<i class='corange'>");
        arrayStr.push(currency);
        arrayStr.push("<span class='ft18'>");
        arrayStr.push(znumArray[0]);
        arrayStr.push("</span>");
        if (znumArray && znumArray.length > 1) {
            arrayStr.push(".");
            arrayStr.push(znumArray[1]);
        }
        arrayStr.push("</i>");

        return arrayStr.join('');
    },
    //计算礼品卡 钱包的总金额
    ret.isAllTktUnable = function (item) {
        //钱包模组无数据
        var tkslist = item.tktinfo && item.tktinfo.tkts || [];
        for (var i = 0; i < tkslist.length; i++) {
            if (tkslist[i].status < 1) {
                return false;
            }
        }
        return true;
    },
    //判断是否 全部金额为0（礼品卡）
    ret.isAllTktNoMoney = function (tkts) {
        for (var i = 0; i < tkts.length; i++) {
            if (tkts[i].amount > 0) {
                return false;
            }
        }

        return true;
    }

    return ret;
});
