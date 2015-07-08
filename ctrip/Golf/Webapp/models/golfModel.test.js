define(['BaseModel', 'cBase', 'GolfStore'],
    function (BaseModel, cBase, store) {
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
                this.result = store.LeaderBoardSummaryStore.getInstance();
                this.method = "GET";
                this.protocol = 'http';
            },
            initialize: function ($super, options) {
                $super(options);
              /*  M.PayMentModel.super_.call(this, options);
                M.PayMentModel.__propertys__.call(this);*/
            }
        });

        return M;
    });
