define(['cModel', 'cBase', 'PayStore', 'cUtility', 'c', 'Util', "Config"],
    function (AbstractModel, cBase, PayStore, cUtility, c, util, Config) {

    //业务Model,此类作用是重写url指向
    var BusinessModel = new cBase.Class(AbstractModel, { 
        //refactored by sq_xu 把公共代碼挪到基类 避免过多重复代码
        __propertys__: function () {
            this.protocol = 'https';
            this.method = 'POST';
            this.param = {};
            this.usehead = false;

        },
        initialize: function ($super, options) {
        },


        buildurl: function () {
            var baseurl = this.baseurl();
            var tempUrl = this.protocol + '://' + (baseurl.domain) + '/' + (baseurl.path) + (typeof this.url === 'function' ? this.url() : this.url);
            tempUrl += Config.HZ_PARAM[Config.ENV];
            return tempUrl;
        },

        baseurl: function (protocol) {
            var domain = 'gateway.secure.ctrip.com';
            var path = 'restful/soa2/10289';

            domain = Config.DOMAINARR[Config.ENV]["domain"];
            path = Config.DOMAINARR[Config.ENV]["path"];

            return {
                'domain': domain,
                'path': path
            }
        },
        exec: function (sucFn, errFn, bool, scope, abortFn) {
            this.excute(sucFn, errFn, bool, scope, abortFn);
        }
    });

   
    return BusinessModel;
});

