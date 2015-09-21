/**
 * Created by fiona.xu on 2015/9/17.
 */
define(["../util"], function (util) {
    var constant = {
        getInitial_data: function(){
            return util.cloneObject(this.initial_data, true);
        },
        getDimension: function(){
            return util.cloneObject(this.dimension, true);
        },

        getMagnanimity: function(){
            return util.cloneObject(this.magnanimity, true);
        },

        initial_data  : {
            selected_den:{
                "column":[],
                "row":[],
                "magnanimity":[],
                "filter":[]//{name:"访问日期", id:"date", value:{},title:"2014-1-1~2015-6-5"},{name:"访问日期1", id:"date1", value:{},title:"2014-11-1~2015-16-5"}
            },
            dimension:[//维度
             /*   {label:"日期", id:"date",detail:"日期", data:[2011,2012,2013,2014,2015]},
                {label:"平台",id:"platform", detail:"平台",data:["Android","IOS","PAD","PCS"]},
                {label:"城市",id:"address", detail:"城市", data:["上海","北京","广州","成都","武汉"]}*/
            ],
            dimension_new:[//新增维度
               /* {label:"日期1", id:"date1",detail:"日期1", data:[2011,2012,2013,2014,2015]},
                {label:"平台1",id:"platform1",detail:"平台1", data:["Android","IOS","PAD","PCS"]},
                {label:"城市1",id:"address1",detail:"城市1", data:["上海","北京","广州","成都","武汉"]}*/
            ],
            magnanimity : [//度量
               /* {label:"PV", id:"pv",detail:"PV"},
                {label:"新访客", id:"visitor",detail:"新访客"},
                {label:"访客数", id:"visitorNum",detail:"访客数"}*/
            ],
            magnanimity_new : [//新增度量
               /* {label:"PV1", id:"pv1",detail:"PV1"},
                {label:"新访客1", id:"visitior1",detail:"新访客1"},
                {label:"访客数1", id:"visitiorNum1",detail:"访客数1"}*/
            ]
        },
        dimension:[//维度
            {label:"日期", id:"date",detail:"日期", data:[2011,2012,2013,2014,2015]},
            {label:"平台",id:"platform", detail:"平台",data:["Android","IOS","PAD","PCS"]},
            {label:"城市",id:"address", detail:"城市", data:["上海","北京","广州","成都","武汉"]}],
        magnanimity: [//度量
            {label:"PV", id:"pv",detail:"PV"},
            {label:"新访客", id:"visitor",detail:"新访客"},
            {label:"访客数", id:"visitorNum",detail:"访客数"}
        ]
    };

    return constant;
});

