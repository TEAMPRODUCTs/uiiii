define(['c', 'PayStore', 'Util', 'bankincrement', 'Business'], function (c, payStore, Util, bankincrement, Business) {

    var paymentcard = payStore.PayMentCardParamStore.getInstance(); //存放礼品卡支付的信息5.4
    var orderDetailStore = payStore.OrderDetailStore.getInstance();
    var bankListStore = payStore.BankListStore.getInstance();
    var ret = {};

    /*
    * @author jianggd@ctrip.com
    * @description 根据增量替换下发卡typename
    */
    ret.repalceCardType = function (cards) {
        var newlist = [];
        //add Sqsun 20141020 获取银行数据
        var self = this;
        if (bankListStore && bankListStore.get && !bankListStore.get()) {
            //初始化101全部银行增量
            Bankincrement.intBankCrement();
        } //add End

        //Edit by sqsun 20141020 捕获银行错误数据
        try {
            var banklistData = bankListStore.get().origindatas || []; //Edit by sqsun 20141023 数据做容错处理
            cards = cards || [];
            for (var i = 0; i < cards.length; i++) {
                var item = cards[i];
                for (var j = 0; j < banklistData.length; j++) {
                    var subobj = _.find((banklistData[j].subDatas || []), function (obj) {
                        return obj.itembCode == item.typeid;
                    });
                    if (subobj) {
                        item.typename = banklistData[j].name;
                        newlist.push(item);
                        break;
                    }
                }
            }
            return newlist;
        } catch (e) {
            //银行增量数据异常，清空bankListStore银行增量
            bankListStore.remove();
            var MyAlert = new c.ui.Alert({
                title: '提示信息',
                message: '系统异常，请重新提交订单(500)',
                buttons: [
                {
                    text: '确定',
                    click: function () {
                        this.hide();
                        var burl = orderDetailStore.getAttr('from');
                        if (!cUtility.isInApp()) {
                            window.location.href = burl;
                        } else {
                            Business.jump2App(burl);
                        }
                    },
                    type: c.ui.Alert.STYLE_CONFIRM
                }
                ]
            });
            MyAlert.show();
            self.alertArr.push(MyAlert);
            //收集异常信息
            try {
                var odtStore = orderDetailStore.get();
                Business.exceptionInfoCollect({
                    bustype: odtStore.bustype,
                    excode: 3,
                    extype: 1,
                    exdesc: '银行增量数据' + "ErrorCode:500" + "_token:" + JSON.stringify(odtStore)
                });
            } catch (e) {

            }
        }

    }

    //匹配当前卡在增量中 
    ret.getBankCardType = function (card) {
        //add Sqsun 20141020 获取银行数据
        var self = this;
        if (bankListStore && bankListStore.get && !bankListStore.get()) {
            //初始化101全部银行增量
            Bankincrement.intBankCrement();
        } //add End
        //Edit by sqsun 20141020 捕获银行数据错误
        try {
            var banklistData = bankListStore.get().origindatas || [], typeid = "", card, subDatas = ["", "CCD", "CCY", "DC"]; //Edit by sqsun 20141023 数据做容错处理
            for (var i = 0; i < banklistData.length; i++) {
                typeid = _.find(banklistData[i].subDatas, function (obj) {
                    return obj.itemName == subDatas[card.category];
                });
                if (card.typeid == Number(typeid.itembCode)) {
                    return banklistData[i];
                }
            }
        } catch (e) {
            //银行增量数据异常，清空bankListStore银行增量
            bankListStore.remove();
            var MyAlert = new c.ui.Alert({
                title: '提示信息',
                message: '系统异常，请重新提交订单(503)',
                buttons: [
                {
                    text: '确定',
                    click: function () {
                        this.hide();
                        var burl = orderDetailStore.getAttr('from');
                        if (!cUtility.isInApp()) {
                            window.location.href = burl;
                        } else {
                            Business.jump2App(burl);
                        }
                    },
                    type: c.ui.Alert.STYLE_CONFIRM
                }
                ]
            });
            MyAlert.show();
            self.alertArr.push(MyAlert);
            //收集异常信息
            try {
                var odtStore = orderDetailStore.get();
                Business.exceptionInfoCollect({
                    bustype: odtStore.bustype,
                    excode: 3,
                    extype: 1,
                    exdesc: '银行增量数据' + "ErrorCode:503" + "_token:" + JSON.stringify(odtStore)
                });
            } catch (e) {

            }
        }

    }

    return ret;
});
