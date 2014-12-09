define(['libs', 'c', 'PayStore', 'PayModel', 'Util'], function (libs, c, payStore, payModel, Util) {
    var orderDetailStore = payStore.OrderDetailStore.getInstance(),
        orderDetail = orderDetailStore.get() || {};
    var sback = decodeURIComponent(orderDetailStore.getAttr("sback")),
        eback = decodeURIComponent(orderDetailStore.getAttr("eback"));

    //获取返回success参数
    var backSuccessParmas = Util.geturlQuery("success") || '',
        backJumUrl = '';
    backSuccessParmas = backSuccessParmas.toLowerCase();

    //返回公共参数
    var querystr = 'externalNo=' + (orderDetail.extno || "") + '&' +
                   'billNo=' + (orderDetail.bilno || "") + '&' +
                   'payType=' + (orderDetail.realpaytype || "") + '&' +
                   'oid=' + (orderDetail.oid || "0") + '&' +
                   'busType=' + (orderDetail.bustype || "") + '&' +
                   'price=' + (orderDetail.totalamount || "");


    function appendQuery(url, query) {
        var urlquery = (url + '&' + query) || '';
        return urlquery.replace(/[&?]{1,2}/, '?');
    }

    //alert("建行跳转到支付的url:" + window.location.href);

    //验证建行APP支付成功后，返回跳转
    if (backSuccessParmas === "y") {
        backJumUrl = appendQuery(sback, querystr);
    } else {
        querystr = querystr + "&" + 'ErrorCode=&ErrorMessage=';
        backJumUrl = appendQuery(eback, querystr);
    }

    //alert("要跳转的BU的url:" + backJumUrl);

    //跳转到订单返回页
    location.href = backJumUrl;

});