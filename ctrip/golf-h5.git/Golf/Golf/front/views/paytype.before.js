/**
 * Created by sq_xu on 14-6-19.
 */

define(['libs', 'c', 'VaBaseView', 'GolfModel', 'GolfStore','CommonStore', 'cUtilityCrypt','cUtility','cWidgetFactory','text!templates/paytype.before.html'],
    function (libs, c, pageview, model, store, CommonStore, Crypt, cUtility, cWidgetFactory, pageTemplate) {
    var Guider = cWidgetFactory.create('Guider');
    var orderParam = store.OrderParamStore.getInstance();
    var headStore = CommonStore.HeadStore.getInstance();
    var headInfo = headStore.get();

    var groupView = pageview.extend({
        render: function () {
            this.$el.html(pageTemplate);
        },
        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },
        events: {},

        onLoad: function () {

            this.headerview.set({
                title: '',
                back: true,
                view: this,
                events: {
                    returnHandler: function () {
                        IWanUtil.app_goto_order_detail(orderParam.getAttr("tempOrderId"));
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
            this.pay();
        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.hash.split('?')[1].match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        pay: function() {
            var isInApp = c.utility.isInApp();
            var hostcode = this.util.getEnvCode(cUtility);
            var self = this;
            var host, payhost, sback, pback, QueryString;
            var paymentUrl = ["secure.fws.qa.nt.ctripcorp.com","10.8.5.10","secure.ctrip.com"];
            host = location.protocol + '//' + location.host;
            var param  = this.getQueryString("param");

            param = JSON.parse(decodeURIComponent(param));
            var orderid = param.orderNo;
            var tempOrderId = orderParam.getAttr("tempOrderId");

            if(orderid === tempOrderId){

                if(isInApp){
                    //IWanUtil.app_goto_order();
                   Guider.backToLastPage({});
                }else{
                    //TODO
                }
                return;
            }
            orderParam.setAttr('tempOrderId', orderid);
            if (isInApp) {
                //hybrid环境下跳转地址
                sback = "golf/#golf.order.sback?ordID=" + orderid;
                pback = 'golf/#golf.order.sback?ordID=' + orderid;
            } else {
                //Web APP环境下跳转地址
                sback = host + '/webapp/golf/#golf.order.sback?ordID=' + orderid;
                pback = host + '/webapp/golf/#golf.order.sback?ordID=' + orderid;
            }

            if (hostcode === '0') {
                payhost = 'https://secure.fws.qa.nt.ctripcorp.com';
            }else if(hostcode === '1'){
                payhost = 'https://10.8.5.10';
            } else {
                payhost = 'https://secure.ctrip.com';
            }
            var token = {
                oid: orderid,
                bustype: param.busType,
                needInvoice:param.needInvoice,
                sback: sback,
                thirdback: pback,
                auth:  headInfo.auth ,
                title: param.orderName,
                amount: param.amount,
                recall: param.recall,
                currency: param.currency,
                displayCurrency: param.displayCurrency,
                displayAmount:param.displayAmount,
                extno: param.externalNo,
                invoiceDeliveryFee:param.invoiceDeliveryFee,
                includeInTotalPrice: param.includeInTotalPrice
            };

            var extend = {
                useEType: param.useEType,
                subPayType: param.subPayType,
                IsNeedPreAuth: param.isNeedPreAuth,
                payTypeList: param.payTypeList,
                IsNeedCardRisk: param.isNeedCardRisk
            };

            token = encodeURIComponent(Crypt.Base64.encode(JSON.stringify(token)));
            extend  = encodeURIComponent(Crypt.Base64.encode(JSON.stringify(extend)));

            QueryString = ['oid=',orderid, '&bustype=', param.busType,'&token=', token, '&extend=',extend].join('');
            if (isInApp) {
                Guider.cross({
                    path: 'payment',
                    param: 'index.html#index?' + QueryString
                });
            } else {
                window.location.href  = payhost + '/webapp/payment/index.html#?' + QueryString;
               // this.jump(payhost + '/webapp/payment/index.html#?' + QueryString);
            }
        },
        onShow: function () {

        },
        onHide: function () {

        }
    });
    return groupView;
});


