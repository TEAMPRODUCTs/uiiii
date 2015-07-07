define(['BaseModel', 'cBase'],
    function (BaseModel, cBase) {
        var M = {};

        /**
         @module
         @name PayMentModel
         @description 支付Model
         @author lh_sun@ctrip.com
         @memberof paymentmodels
         @version 6.2
         */
        M.PayMentModel =new  cBase.Class(BaseModel, {
            __propertys__: function () {
                this.url = '/json/ListSearch'; //store.LeaderBoardSummaryStore.getInstance();
                this.result = null;
                this.method = "GET";
                this.protocol = 'http';
            },
            initialize: function ($super, options) {
                $super(options);
            }
        });

        return M;
    });
