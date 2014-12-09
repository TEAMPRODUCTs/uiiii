define(['libs', 'c', 'CommonStore', 'PayStore', 'PayModel', 'cBasePageView', 'alipayresult_html', 'cUtility',
    'cWidgetFactory', 'paymentPipe', 'cUIInputClear', 'cUtilityCrypt', 'cUICore'
], function (libs, c, commonStore, payStore, payModel, basePageView, html,
    cUtility, widgetFactory, paymentPipe, cUIInputClear, Crypt, cui) {
    var orderDetailStore = payStore.OrderDetailStore.getInstance();
    var View = basePageView.extend({
        pageid: '215373',
        tpl: html,
        onHide: function () {
        },
        onCreate: function () {
        },
        onShow: function () {
        },
        onLoad: function () {
            var orderinfo = orderDetailStore.get();
            var fromurl = self.request.query["result"] || "";
            var hybrid_sback_url = "index.html" + orderinfo.sback.match("#.*")[0];
            var hybrid_pback_url = "index.html" + orderinfo.pback.match("#.*")[0];
            var _prams = {};
            var addUrl = "";
            var bu_name = this.matchModuleFn(orderinfo.sback.split("#")[0]);

            if (fromurl == "success") {
                //第三方成功页面rul传值的参数
                _prams = {
                    orderID: orderinfo.oid,
                    externalNo: orderinfo.extno,
                    billNo: orderinfo.bilno,
                    payType: orderinfo.payType,
                    busType: orderinfo.busType,
                    price: orderinfo.totalamount
                };

                if (cUtility.isInApp()) {
                    addUrl = this.bulidUrl(hybrid_sback_url, _prams);
                    Guider.cross({
                        path: bu_name,
                        param: hybrid_sback_url + addUrl
                    })
                }
                else {
                    addUrl = this.bulidUrl(orderinfo.sback, _prams);
                    location.href = orderinfo.sback + addUrl;
                }
            }
            else {
                //第三方返回页面rul传值的参数
                _prams = {
                    orderID: orderinfo.oid,
                    externalNo: orderinfo.extno,
                    billNo: orderinfo.bilno,
                    busType: orderinfo.busType,
                    price: orderinfo.totalamount,
                    ErrorCode: orderinfo.ErrorCode || "",
                    ErrorMessage: orderinfo.ErrorMessage || ""
                };
                if (cUtility.isInApp()) {
                    addUrl = this.bulidUrl(hybrid_pback_url, _prams);
                    Guider.cross({
                        path: bu_name,
                        param: hybrid_pback_url + addUrl
                    })
                }
                else {
                    addUrl = this.bulidUrl(orderinfo.pback, _prams);
                    location.href = orderinfo.pback + addUrl;
                }
            }
        },
        bulidUrl: function (url, parms) {
            var tag = "";
            var querystr = "";
            if (/\?/.test(url)) {
                tag = "&";
            } else {
                tag = "?";
            }
            querystr += tag;
            for (var p in parms) {
                querystr += (p + '=' + parms[p]).concat('&');
            }

            querystr = querystr.substring(0, querystr.length - 1);
            return querystr;
        },
        matchModuleFn: function (str) {
            var value = "",
                arr = [],
                tmpStr = "";

            if (/webapp.+[^\/]/gi.test(str)) {

                tmpStr = str.match(/webapp.+[^\/]/gi)[0];

                arr = tmpStr.split("/");

                if (arr.length > 1) {
                    value = arr[1];
                }
            }

            return value;
        }

    });
    return View;
});