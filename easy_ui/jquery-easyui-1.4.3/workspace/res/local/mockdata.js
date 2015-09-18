/**
 * Created by fiona.xu on 2015/8/26.
 */
window.Mockdata ={
    current_tabid: 0,
    func:[{"label": "+", id:"add", "sample":"不同度量值相加 <br/>示例:<br/> sales1 + sales2"},
          {"label": "-", id:"minus", "sample":"不同度量值相减 <br/>示例:<br/> sales1 - sales2"},
        ],
    tabs: [
        {
            tabid:0,
            tabname:"访问1",
            tabcontent:{
                filter:{
                    "visitdate":{"fromdate":"2014-01-13", "todate":"2014-02-13"}
                },
                selected_den:{
                    "column":[{"id": "platform", "name": "平台",data:["Android","IOS","PAD","PCS"]},{"id": "address", "name": "城市",data:["上海","北京","广州","成都","武汉"]}],// TODO {"id": "address", "name": "城市",data:["上海","北京","广州","成都","武汉"]},{"id": "platform", "name": "平台",data:["Android","IOS","PAD","PCS"]}
                    "row":[{"id": "date", "name": "日期",data:[2011,2012,2013,2014,2015]}],//{"id": "date", "name": "日期",data:[2011,2012,2013,2014,2015]}
                    "magnanimity":[{"id": "pv", "name": "PV"}], //度量{"id": "pv", "name": "PV"}
                    "filter":[{name:"访问日期", id:"date",fromdate:"2014-1-1", todate:"2015-6-5", value:{},title:"2014-1-1~2015-6-5"}]
                },
                dimension:[//维度
                    {label:"日期", id:"date",detail:"日期", data:[2011,2012,2013,2014,2015]},
                    {label:"平台",id:"platform", detail:"平台",data:["Android","IOS","PAD","PCS"]},
                    {label:"城市",id:"address", detail:"城市", data:["上海","北京","广州","成都","武汉"]}
                ],
                dimension_new:[//新增维度
                    {label:"日期1", id:"date1",detail:"日期1", data:[2011,2012,2013,2014,2015]},
                    {label:"平台1",id:"platform1",detail:"平台1", data:["Android","IOS","PAD","PCS"]},
                    {label:"城市1",id:"address1",detail:"城市1", data:["上海","北京","广州","成都","武汉"]}
                ],
                magnanimity : [//度量
                    {label:"PV", id:"pv",detail:"PV"},
                    {label:"新访客", id:"visitor",detail:"新访客"},
                    {label:"访客数", id:"visitorNum",detail:"访客数"}
                ],
                magnanimity_new : [//新增度量
                    {label:"PV1", id:"pv1",detail:"PV1"},
                    {label:"新访客1", id:"visitior1",detail:"新访客1"},
                    {label:"访客数1", id:"visitiorNum1",detail:"访客数1"}
                ],
                data:{

                    platform__:{
                        "total":1,
                        "column_selected":[{"field":["Android","IOS","PAD","PCS"],"data":["Android","IOS","PAD","PCS"]}],// TODO{"field":["address"],"data":["address"]}
                        "row_selected":[/*{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}*/],//用户选择的行
                        "rows": [

                        ]
                    },

                    platform__pv:{
                        "total":1,
                        "column_selected":[{"field":["Android","IOS","PAD","PCS"],"data":["Android","IOS","PAD","PCS"]}],// TODO{"field":["address"],"data":["address"]}
                        "row_selected":[/*{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}*/],//用户选择的行
                        "rows": [
                            {
                                "Android":1,
                                "IOS":2,
                                "PAD":3,
                                "PCS":4
                            }
                        ]
                    },


                    platform__visitor:{
                        "total":1,
                        "column_selected":[{"field":["Android","IOS","PAD","PCS"],"data":["Android","IOS","PAD","PCS"]}],// TODO{"field":["address"],"data":["address"]}
                        "row_selected":[/*{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}*/],//用户选择的行
                        "rows": [
                            {
                                "Android":1,
                                "IOS":2,
                                "PAD":3,
                                "PCS":4
                            }
                        ]
                    },

                    address__:{
                        "total":1,
                        "column_selected":[{"field":["上海","北京","广州","成都","武汉"],"data":["上海","北京","广州","成都","武汉"]}],// TODO{"field":["address"],"data":["address"]}
                        "row_selected":[/*{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}*/],//用户选择的行
                        "rows": [
                        ]
                    },

                    date__:{
                        "total":1,
                        "column_selected":[{"field":[[2011, 2012, 2013, 2014, 2015]],"data":[[2011, 2012, 2013, 2014, 2015]]}],// TODO{"field":["address"],"data":["address"]}
                        "row_selected":[/*{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}*/],//用户选择的行
                        "rows": [
                        ]
                    },

                    //TODO
                    addressplatform__:{
                        "total":1,
                        "column_selected":[{"data":["上海","北京","广州","成都","武汉"],colspan:"4"},
                            {"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]}],// TODO{"field":["address"],"data":["address"]}
                        "row_selected":[/*{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}*/],//用户选择的行
                        "rows": [
                            /* {
                             "上海": "上海",
                             "北京": "北京",
                             "广州": "广州",
                             "成都": "成都",
                             "武汉": "武汉"
                             }*/
                        ]
                    },

                    platformaddress__: {
                        "total": 4,
                        "column_selected": [{
                            "id": "platform",
                            "name": "平台",
                            "data": ["Android", "IOS", "PAD", "PCS"],
                            "colspan": 5
                        }, {
                            "id": "address", "name": "城市11", "data": ["上海", "北京", "广州", "成都", "武汉"], "colspan": 1,
                            "field": ["上海_Android", "北京_Android", "广州_Android", "成都_Android", "武汉_Android", "上海_IOS", "北京_IOS", "广州_IOS", "成都_IOS", "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD", "成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS", "广州_PCS", "成都_PCS", "武汉_PCS"]
                        }],// TODO
                        "row_selected": [/*{label: "日期", id: "date", data: [2011, 2012, 2013, 2014, 2015]}*/],//用户选择的行
                        "rows": [
                            {}]
                    },

                    _address_:{
                        "total":4,
                        "column_selected":[{"field":["address"],"data":["城市"]}],// TODO{"field":["address"],"data":["address"]}
                        "row_selected":[/*{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}*/],//用户选择的行
                        "rows": [
                            {
                                "address": "上海"
                            },
                            {
                                "address": "北京"
                            },
                            {
                                "address": "广州"
                            },
                            {
                                "address": "成都"
                            },
                            {
                                "address": "武汉"
                            }

                            ]
                    },

                    _addressplatform_:{
                        "total":4,
                        "column_selected":[{"field":["address","platform"],"data":["城市","平台"]}],// TODO{"field":["address"],"data":["address"]}
                        "row_selected":[/*{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}*/],//用户选择的行
                        "rows": [
                            {
                                "address": "上海fdsfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkERWRIWOERIWIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOEWUIRWURUWIRUEIERWU",
                                "platform":"Android",
                            },
                            {
                                "address": "上海",
                                "platform":"IOS",
                            },
                            {
                                "address": "上海",
                                "platform":"PAD",
                            },
                            {
                                "address": "上海",
                                "platform":"PC"
                            },
                            {
                                "address": "北京",
                                "platform":"Android",
                            },
                            {
                                "address": "北京",
                                "platform":"IOS",
                            },
                            {
                                "address": "北京",
                                "platform":"PAD",
                            },
                            {
                                "address": "北京",
                                "platform": "PC"
                            },
                            {
                                "address": "广州",
                                "platform":"Android",
                            },
                            {
                                "address": "广州",
                                "platform":"IOS",
                            },
                            {
                                "address": "广州",
                                "platform":"PAD",
                            },
                            {
                                "address": "广州",
                                "platform":"PC"
                            },
                            {
                                "address": "成都",
                                "platform":"Android",
                            },
                            {
                                "address": "成都",
                                "platform":"IOS",
                            },
                            {
                                "address": "武汉",
                                "platform":"PAD",
                            },
                            {
                                "address": "武汉",
                                "platform": "PC"
                            },

                            {
                                "address": "武汉",
                                "platform":"PAD",
                            },
                            {
                                "address": "武汉",
                                "platform":"PC"
                            }
                        ]
                    },

                    _platformaddress_:{
                        "total":4,
                        "column_selected":[{"field":["platform","address"],"data":["平台","城市"]}],// TODO{"field":["address"],"data":["address"]}
                        "row_selected":[/*{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}*/],//用户选择的行
                        "rows": [
                            {
                                "platform":"Android",
                                "address": "上海",
                            },
                            {
                                "platform":"Android",
                                "address": "北京",
                            },
                            {
                                "platform":"Android",
                                "address": "广州",
                            },
                            {
                                "platform":"Android",
                                "address": "成都",
                            },
                            {
                                "platform":"IOS",
                                "address": "上海",
                            },
                            {
                                "platform":"IOS",
                                "address": "北京",
                            },
                            {
                                "platform":"IOS",
                                "address": "广州",
                            },
                            {
                                "platform":"IOS",
                                "address": "成都",
                            },
                            {
                                "platform":"PAD",
                                "address": "上海",
                            },
                            {
                                "platform":"PAD",
                                "address": "北京",
                            },
                            {
                                "platform":"PAD",
                                "address": "广州",
                            },
                            {
                                "platform":"PAD",
                                "address": "武汉",
                            },
                            {
                                "platform":"PC",
                                "address": "上海",
                            },
                            {
                                "platform": "PC",
                                "address": "北京",
                            },
                            {
                                "platform":"PC",
                                "address": "广州",
                            },
                            {
                                "address": "武汉",
                                "platform":"PAD",
                            },
                            {
                                "address": "武汉",
                                "platform": "PC"
                            },
                            {
                                "platform":"PC",
                                "address": "武汉",

                            }
                        ]
                    },

                    //mockdata 行， 列 度量
                    _address_pv:{
                        "total":4,
                        "column_selected":[{"field":["pv"],"data":["pv"]}],// TODO
                        "row_selected":[{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"]}],//用户选择的行
                        "rows": [
                            {
                                "address": "上海",
                                "pv": "924"
                            },
                            {
                                "address": "北京",
                                "pv": "843"
                            },
                            {
                                "address": "广州",
                                "pv": "280"
                            },
                            {
                                "address": "成都",
                                "pv": "836"
                            },
                            {
                                "address": "武汉",
                                "pv": "655"
                            }
                        ]
                    },

                    address__pv:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市","data":["上海","北京","广州","成都","武汉"],"field":["上海","北京","广州","成都","武汉"]}],// TODO
                        "row_selected":[],//用户选择的行
                        "rows": [
                            {
                                "上海": "924",
                                "北京": "843",
                                "广州": "924",
                                "成都": "836",
                                "武汉":"655"
                            }
                        ]
                    },

                    platform_address_:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"],"field":["Android","IOS","PAD","PCS"]}],// TODO
                        "row_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"]}],//用户选择的行
                        "rows": [
                            {
                                "address": "上海",
                            },
                            {
                                "address": "北京",
                            },
                            {
                                "address": "广州",
                            },
                            {
                                "address": "成都",
                            },
                            {
                                "address": "武汉",
                            }
                        ]
                    },


                    platform_address_pv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"],"field":["Android","IOS","PAD","PCS"]}],// TODO
                        "row_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"]}],//用户选择的行
                        "rows": [
                            {
                                "address": "上海",
                                "Android": "FD83274827482748278437284378274374378247832924",
                                "IOS": "554",
                                "PAD": "617",
                                "PCS": "520"
                            },
                            {
                                "address": "北京",
                                "Android": "657",
                                "IOS": "591",
                                "PAD": "144",
                                "PCS": "843"
                            },
                            {
                                "address": "广州",
                                "Android": "88",
                                "IOS": "875",
                                "PAD": "689",
                                "PCS": "280"
                            },
                            {
                                "address": "成都",
                                "Android": "76",
                                "IOS": "86",
                                "PAD": "655",
                                "PCS": "836"
                            },
                            {
                                "address": "武汉",
                                "Android": "76",
                                "IOS": "76",
                                "PAD": "86",
                                "PCS": "655"
                            }
                        ]
                    },

                    platform_address_visitor:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"],"field":["Android","IOS","PAD","PCS"]}],// TODO
                        "row_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"]}],//用户选择的行
                        "rows": [
                            {
                                "address": "上海",
                                "Android": "FD83274827482748278437284378274374378247832924",
                                "IOS": "554",
                                "PAD": "617",
                                "PCS": "520"
                            },
                            {
                                "address": "北京",
                                "Android": "657",
                                "IOS": "591",
                                "PAD": "144",
                                "PCS": "843"
                            },
                            {
                                "address": "广州",
                                "Android": "88",
                                "IOS": "875",
                                "PAD": "689",
                                "PCS": "280"
                            },
                            {
                                "address": "成都",
                                "Android": "76",
                                "IOS": "86",
                                "PAD": "655",
                                "PCS": "836"
                            },
                            {
                                "address": "武汉",
                                "Android": "76",
                                "IOS": "76",
                                "PAD": "86",
                                "PCS": "655"
                            }
                        ]
                    },

                    //ok
                    platform_address_pvvisitor:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"],colspan:2, "field":["Android","IOS","PAD","PCS"]},
                            {"id": "platform", "name": "平台","data":["PV","新访客"],colspan:1, "field":["Android_PV","Android_visotor","IOS_PV","IOS_visotor","PAD_PV","PAD_visotor","PC_PV","PC_visotor"]}],// TODO
                        "row_selected":[{"id": "address", "name": "城市11","label":"城市","data":["上海","北京","广州","成都","武汉"],"rowspan":"2"}],//用户选择的行
                        "rows": [
                            {
                                "address": "上海",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            },
                            {
                                "address": "北京",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            },
                            {
                                "address": "广州",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            },
                            {
                                "address": "成都",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            },
                            {
                                "address": "武汉",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            }
                        ]
                    },

                    address_platform_pvvisitor:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市11","label":"城市","data":["上海","北京","广州","成都","武汉"],colspan:2},
                            {"id": "platform", "name": "平台","data":["PV","新访客"],colspan:1, "field":["Android_PV","Android_visotor","IOS_PV","IOS_visotor","PAD_PV","PAD_visotor","PC_PV","PC_visotor","shanghai_PV","shanghai_visotor"]}],// TODO
                        "row_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"],"rowspan":"2"}],//用户选择的行
                        "rows": [
                            {
                                "platform": "Android",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                                "shanghai_PV": "924",
                                "shanghai_visotor": "921",
                            },
                            {
                                "platform": "IOS",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                                "shanghai_PV": "924",
                                "shanghai_visotor": "921",
                            },
                            {
                                "platform": "PAD",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                                "shanghai_PV": "924",
                                "shanghai_visotor": "921",
                            },
                            {
                                "platform": "PCS",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                                "shanghai_PV": "924",
                                "shanghai_visotor": "921",
                            }
                        ]
                    },

                    address_platform_visitorpv:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市11","label":"城市","data":["上海","北京","广州","成都","武汉"],colspan:2},
                            {"id": "platform", "name": "平台","data":["新访客","PV"],colspan:1, "field":["Android_PV","Android_visotor","IOS_PV","IOS_visotor","PAD_PV","PAD_visotor","PC_PV","PC_visotor","shanghai_PV","shanghai_visotor"]}],// TODO
                        "row_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"],"rowspan":"2"}],//用户选择的行
                        "rows": [
                            {
                                "platform": "Android",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                                "shanghai_PV": "924",
                                "shanghai_visotor": "921",
                            },
                            {
                                "platform": "IOS",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                                "shanghai_PV": "924",
                                "shanghai_visotor": "921",
                            },
                            {
                                "platform": "PAD",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                                "shanghai_PV": "924",
                                "shanghai_visotor": "921",
                            },
                            {
                                "platform": "PCS",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                                "shanghai_PV": "924",
                                "shanghai_visotor": "921",
                            }
                        ]
                    },

                    //ok
                    platform_address_visitorpv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"],colspan:2, "field":["Android","IOS","PAD","PCS"]},
                            {"id": "platform", "name": "平台","data":["新访客","PV"],colspan:1, "field":["Android_PV","Android_visotor","IOS_PV","IOS_visotor","PAD_PV","PAD_visotor","PC_PV","PC_visotor"]}],// TODO
                        "row_selected":[{"id": "address", "name": "城市11","label":"城市","data":["上海","北京","广州","成都","武汉"],"rowspan":"2"}],//用户选择的行
                        "rows": [
                            {
                                "address": "上海",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            },
                            {
                                "address": "北京",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            },
                            {
                                "address": "广州",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            },
                            {
                                "address": "成都",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            },
                            {
                                "address": "武汉",
                                "Android_PV": "924",
                                "Android_visotor": "921",
                                "IOS_PV": "924",
                                "IOS_visotor": "921",
                                "PAD_PV": "924",
                                "PAD_visotor": "921",
                                "PC_PV": "924",
                                "PC_visotor": "921",
                            }
                        ]
                    },


                    address_platform_:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"],"field":["上海","北京","广州","成都","武汉"]}],// TODO
                        "row_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"]}],//用户选择的行
                        "rows": [
                            {
                                "platform": "Android",
                            },
                            {
                                "platform": "IOS",

                            },
                            {
                                "platform": "PAD",

                            },
                            {
                                "platform": "PCS",

                            }
                        ]
                    },

                    address_platform_pv:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"],"field":["上海","北京","广州","成都","武汉"]}],// TODO
                        "row_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"]}],//用户选择的行
                        "rows": [
                            {
                                "platform": "Android",
                                "上海": "924",
                                "北京": "554",
                                "广州": "617",
                                "成都": "520",
                                "武汉": "107"
                            },
                            {
                                "platform": "IOS",
                                "上海": "657",
                                "北京": "591",
                                "广州": "144",
                                "成都": "843",
                                "武汉": "564"
                            },
                            {
                                "platform": "PAD",
                                "上海": "88",
                                "北京": "875",
                                "广州": "689",
                                "成都": "280",
                                "武汉": "715"
                            },
                            {
                                "platform": "PCS",
                                "上海": "76",
                                "北京": "86",
                                "广州": "655",
                                "成都": "836",
                                "武汉": "20"
                            }
                        ]
                    },

                    _platformdate_pv:{ //{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1},
                        "total":20,
                        "column_selected":[{"id": "pv", "name": "PV", "data":["PV"],"colspan":1,
                            "field": ["pv" ]}],// TODO
                        "row_selected":[ {label:"平台", id:"date_forms", data:["Android","IOS","PAD","PCS"],"rowspan":5},{label:"日期", id:"date", data:[2011,2012,2013,2014,2015]}],//用户选择的行
                        "rows": [
                            {
                                "date_forms": "Android",
                                "date":"2011",
                                "pv": "924"
                            },
                            {
                                "date_forms": "Android",
                                "date":"2012",
                                "pv": "924"
                            },
                            {
                                "date_forms": "Android",
                                "date":"2013",
                                "pv": "924"
                            },
                            {
                                "date_forms": "Android",
                                "date":"2014",
                                "pv": "107"
                            },
                            {
                                "date_forms": "Android",
                                "date":"2015",
                                "pv":"107"
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2011",
                                "pv": "107",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2012",
                                "pv": "107"
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2013",
                                "pv": "107"
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2014",
                                "pv": "107",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2015",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2011",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2012",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2013",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2014",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2015",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PCS",
                                "date":"2011",
                                "pv": "107"
                            },

                            {
                                "date_forms": "PCS",
                                "date":"2012",
                                "pv": "107"
                            },

                            {
                                "date_forms": "PCS",
                                "date":"2013",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PCS",
                                "date":"2014",
                                "pv": "107"
                            },

                            {
                                "date_forms": "PCS",
                                "date":"2015",
                                "pv": "107"
                            }
                        ]
                    },

                    //平台城市 行
                    _platformaddress_pv:{ //{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1},
                        "total":20,
                        "column_selected":[{"id": "pv", "name": "PV", "data":["PV"],"colspan":1,
                            "field": ["pv" ]}],// TODO
                        "row_selected":[ {label:"平台", id:"date_forms", data:["Android","IOS","PAD","PCS"],"rowspan":1},{label:"城市", id:"address","name":  "城市",  "data":["上海","北京","广州","成都","武汉"]}],//用户选择的行
                        "rows": [
                            {
                                "date_forms": "Android",
                                "address":"上海",
                                "pv": "924"
                            },
                            {
                                "date_forms": "Android",
                                "address":"北京",
                                "pv": "924"
                            },
                            {
                                "date_forms": "Android",
                                "address":"广州",
                                "pv": "924"
                            },
                            {
                                "date_forms": "Android",
                                "address":"成都",
                                "pv": "107"
                            },
                            {
                                "date_forms": "Android",
                                "address":"武汉",
                                "pv":"107"
                            },
                            {
                                "date_forms": "IOS",
                                "address":"上海",
                                "pv": "107",
                            },
                            {
                                "date_forms": "IOS",
                                "address":"北京",
                                "pv": "107"
                            },
                            {
                                "date_forms": "IOS",
                                "address":"广州",
                                "pv": "107"
                            },
                            {
                                "date_forms": "IOS",
                                "address":"成都",
                                "pv": "107",
                            },
                            {
                                "date_forms": "IOS",
                                "address":"武汉",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "address":"上海",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "address":"北京",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "address":"广州",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "address":"成都",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PAD",
                                "address":"武汉",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PCS",
                                "address":"上海",
                                "pv": "107"
                            },

                            {
                                "date_forms": "PCS",
                                "address":"北京",
                                "pv": "107"
                            },

                            {
                                "date_forms": "PCS",
                                "address":"广州",
                                "pv": "107"
                            },
                            {
                                "date_forms": "PCS",
                                "address":"成都",
                                "pv": "107"
                            },

                            {
                                "date_forms": "PCS",
                                "address":"武汉",
                                "pv": "107"
                            }
                        ]
                    },

                    //城市平台 行
                    _addressplatform_pv:{ //{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1},
                        "total":20,
                        "column_selected":[{"id": "pv", "name": "PV", "data":["PV"],"colspan":1,
                            "field": ["pv" ]}],// TODO
                        "row_selected":[ {label:"城市", id:"address","name":  "城市",  "data":["上海","北京","广州","成都","武汉"],"rowspan":4},{label:"平台", id:"date_forms", data:["Android","IOS","PAD","PCS"]},],//用户选择的行
                        "rows": [
                            {
                                "address":"上海",
                                "date_forms": "Android",
                                "pv": "924"
                            },
                            {
                                "address":"上海",
                                "date_forms": "IOS",
                                "pv": "107",
                            },
                            {
                                "address":"上海",
                                "date_forms": "PAD",
                                "pv": "107"
                            },
                            {
                                "address":"上海",
                                "date_forms": "PCS",
                                "pv": "107"
                            },

                            {
                                "address":"北京",
                                "date_forms": "Android",
                                "pv": "924"
                            },
                            {
                                "address":"北京",
                                "date_forms": "IOS",
                                "pv": "107"
                            },
                            {
                                "address":"北京",
                                "date_forms": "PAD",
                                "pv": "107"
                            },
                            {
                                "address":"北京",
                                "date_forms": "PCS",
                                "pv": "107"
                            },
                            {
                                "address":"广州",
                                "date_forms": "Android",
                                "pv": "924"
                            },
                            {
                                "address":"广州",
                                "date_forms": "IOS",
                                "pv": "107"
                            },
                            {
                                "address":"广州",
                                "date_forms": "PAD",
                                "pv": "107"
                            },
                            {
                                "address":"广州",
                                "date_forms": "PCS",
                                "pv": "107"
                            },
                            {
                                "address":"成都",
                                "date_forms": "Android",
                                "pv": "107"
                            },
                            {
                                "address":"成都",
                                "date_forms": "IOS",
                                "pv": "107",
                            },
                            {
                                "address":"成都",
                                "date_forms": "PAD",
                                "pv": "107"
                            },
                            {
                                "address":"成都",
                                "date_forms": "PCS",
                                "pv": "107"
                            },
                            {
                                "address":"武汉",
                                "date_forms": "Android",
                                "pv":"107"
                            },
                            {
                                "address":"武汉",
                                "date_forms": "IOS",
                                "pv": "107"
                            },
                            {
                                "address":"武汉",
                                "date_forms": "PAD",
                                "pv": "107"
                            },
                            {
                                "address":"武汉",
                                "date_forms": "PCS",
                                "pv": "107"
                            }

                        ]
                    },



                    address_platformdate_pv:{ //{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1},
                        "total":20,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" ]}],// TODO
                        "row_selected":[ {label:"平台", id:"date_forms", data:["Android","IOS","PAD","PCS"],"rowspan":1},{label:"日期", id:"date", data:[2011,2012,2013,2014,2015]}],//用户选择的行
                        "rows": [
                            {
                                "date_forms": "Android",
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "Android",
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "Android",
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "Android",
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "Android",
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "PCS",
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },

                            {
                                "date_forms": "PCS",
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },

                            {
                                "date_forms": "PCS",
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date_forms": "PCS",
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },

                            {
                                "date_forms": "PCS",
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            }
                        ]
                    },

                    address_platformdate_:{ //{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1},
                        "total":20,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" ]}],// TODO
                        "row_selected":[ {label:"平台", id:"date_forms", data:["Android","IOS","PAD","PCS"],"rowspan":1},{label:"日期", id:"date", data:[2011,2012,2013,2014,2015]}],//用户选择的行
                        "rows": [
                            {
                                "date_forms": "Android",
                                "date":"2011",
                            },
                            {
                                "date_forms": "Android",
                                "date":"2012",
                            },
                            {
                                "date_forms": "Android",
                                "date":"2013",
                            },
                            {
                                "date_forms": "Android",
                                "date":"2014",
                            },
                            {
                                "date_forms": "Android",
                                "date":"2015",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2011",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2012",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2013",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2014",
                            },
                            {
                                "date_forms": "IOS",
                                "date":"2015",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2011",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2012",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2013",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2014",
                            },
                            {
                                "date_forms": "PAD",
                                "date":"2015",
                            },
                            {
                                "date_forms": "PCS",
                                "date":"2011",
                            },

                            {
                                "date_forms": "PCS",
                                "date":"2012",
                            },

                            {
                                "date_forms": "PCS",
                                "date":"2013",
                            },
                            {
                                "date_forms": "PCS",
                                "date":"2014",
                            },

                            {
                                "date_forms": "PCS",
                                "date":"2015",
                            }
                        ]
                    },

                    address_dateplatform_:{ //{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1},
                        "total":20,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" ]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015]},{label:"平台", id:"date_forms", data:["Android","IOS","PAD","PCS"],"rowspan":1}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "date_forms": "Android",

                            },
                            {
                                "date":"2011",
                                "date_forms": "IOS",
                            },
                            {
                                "date":"2011",
                                "date_forms": "PAD",
                            },
                            {
                                "date":"2011",
                                "date_forms": "PCS",
                            },
                            {
                                "date":"2012",
                                "date_forms": "Android",

                            },
                            {
                                "date":"2012",
                                "date_forms": "IOS",
                            },
                            {
                                "date":"2012",
                                "date_forms": "PAD",
                            },
                            {
                                "date":"2012",
                                "date_forms": "PCS",
                            },
                            {
                                "date":"2013",
                                "date_forms": "Android",
                            },
                            {
                                "date":"2013",
                                "date_forms": "IOS",
                            },
                            {
                                "date":"2013",
                                "date_forms": "PAD",
                            },
                            {
                                "date":"2013",
                                "date_forms": "PCS",
                            },
                            {
                                "date":"2014",
                                "date_forms": "Android",
                            },
                            {
                                "date":"2014",
                                "date_forms": "IOS",
                            },
                            {
                                "date":"2014",
                                "date_forms": "PAD",
                            },
                            {
                                "date":"2014",
                                "date_forms": "PCS",
                            },
                            {
                                "date":"2015",
                                "date_forms": "Android",
                            },
                            {
                                "date":"2015",
                                "date_forms": "IOS",
                            },
                            {
                                "date":"2015",
                                "date_forms": "PAD",
                            },
                            {
                                "date":"2015",
                                "date_forms": "PCS",
                            }
                        ]
                    },

                    address_dateplatform_pv:{ //{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1},
                        "total":20,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" ]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":1},{label:"平台", id:"date_forms", data:["Android","IOS","PAD","PCS"]}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "date_forms": "Android",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2011",
                                "date_forms": "IOS",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2011",
                                "date_forms": "PAD",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2011",
                                "date_forms": "PCS",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2012",
                                "date_forms": "Android",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2012",
                                "date_forms": "IOS",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2012",
                                "date_forms": "PAD",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2012",
                                "date_forms": "PCS",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2013",
                                "date_forms": "Android",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2013",
                                "date_forms": "IOS",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2013",
                                "date_forms": "PAD",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2013",
                                "date_forms": "PCS",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2014",
                                "date_forms": "Android",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2014",
                                "date_forms": "IOS",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2014",
                                "date_forms": "PAD",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2014",
                                "date_forms": "PCS",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2015",
                                "date_forms": "Android",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2015",
                                "date_forms": "IOS",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2015",
                                "date_forms": "PAD",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            },
                            {
                                "date":"2015",
                                "date_forms": "PCS",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",
                            }
                        ]
                    },
                    platformaddress_date_:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":5},{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                            },
                            {
                                "date":"2012",
                            },
                            {
                                "date":"2013",
                            },
                            {
                                "date":"2014",
                            },
                            {
                                "date":"2015",
                            }
                        ]
                    },

                    platform_addressdate_pv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1, "field": [ "成都_Android_pv", "成都_Android_visitor",
                            "武汉_Android_pv" , "武汉_Android_vistor"]
                        }],// TODO
                        "row_selected":[{label:"城市", id:"address", data:[2011,2012,2013,2014,2015],"rowspan":1}, {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":1}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2014",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2011",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2012",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2013",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2011",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2012",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },


                            {
                                "date":"2012",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2014",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2015",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            }
                        ]
                    },
                    platform_dateaddress_pv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1, "field": [ "成都_Android_pv", "成都_Android_visitor",
                            "武汉_Android_pv" , "武汉_Android_vistor"]
                        }],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":1},{label:"城市", id:"address", data:[2011,2012,2013,2014,2015],"rowspan":1}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "上海",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "北京",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "广州",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "成都",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "武汉",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            }
                        ]
                    },


                    platform_addressdate_:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1, "field": [ "成都_Android_pv", "成都_Android_visitor",
                            "武汉_Android_pv" , "武汉_Android_vistor"]
                        }],// TODO
                        "row_selected":[{label:"城市", id:"address", data:[2011,2012,2013,2014,2015],"rowspan":1}, {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":1}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "address": "上海",
                            },
                            {
                                "date":"2012",
                                "address": "上海",
                            },
                            {
                                "date":"2013",
                                "address": "上海",
                            },

                            {
                                "date":"2014",
                                "address": "上海",
                            },
                            {
                                "date":"2015",
                                "address": "上海",
                            },

                            {
                                "date":"2011",
                                "address": "北京",
                            },

                            {
                                "date":"2012",
                                "address": "北京",
                            },

                            {
                                "date":"2013",
                                "address": "北京",
                            },
                            {
                                "date":"2014",
                                "address": "北京",
                            },
                            {
                                "date":"2015",
                                "address": "北京",
                            },
                            {
                                "date":"2011",
                                "address": "广州",
                            },
                            {
                                "date":"2012",
                                "address": "广州",
                            },
                            {
                                "date":"2013",
                                "address": "广州",
                            },
                            {
                                "date":"2014",
                                "address": "广州",
                            },
                            {
                                "date":"2015",
                                "address": "广州",
                            },

                            {
                                "date":"2011",
                                "address": "成都",
                            },

                            {
                                "date":"2012",
                                "address": "成都",
                            },
                            {
                                "date":"2013",
                                "address": "成都",
                            },
                            {
                                "date":"2014",
                                "address": "成都",
                            },
                            {
                                "date":"2015",
                                "address": "成都",
                            },
                            {
                                "date":"2011",
                                "address": "武汉",
                            },


                            {
                                "date":"2012",
                                "address": "武汉",
                            },
                            {
                                "date":"2013",
                                "address": "武汉",
                            },

                            {
                                "date":"2014",
                                "address": "武汉",
                            },

                            {
                                "date":"2015",
                                "address": "武汉",
                            }
                        ]
                    },
                    platform_dateaddress_:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1, "field": [ "成都_Android_pv", "成都_Android_visitor",
                            "武汉_Android_pv" , "武汉_Android_vistor"]
                        }],// TODO
                        "row_selected":[{label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":1}, {label:"城市", id:"address", data:[2011,2012,2013,2014,2015],"rowspan":1}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "address": "上海",
                            },
                            {
                                "date":"2012",
                                "address": "上海",
                            },
                            {
                                "date":"2013",
                                "address": "上海",
                            },

                            {
                                "date":"2014",
                                "address": "上海",
                            },
                            {
                                "date":"2015",
                                "address": "上海",
                            },

                            {
                                "date":"2011",
                                "address": "北京",
                            },

                            {
                                "date":"2012",
                                "address": "北京",
                            },

                            {
                                "date":"2013",
                                "address": "北京",
                            },
                            {
                                "date":"2014",
                                "address": "北京",
                            },
                            {
                                "date":"2015",
                                "address": "北京",
                            },
                            {
                                "date":"2011",
                                "address": "广州",
                            },
                            {
                                "date":"2012",
                                "address": "广州",
                            },
                            {
                                "date":"2013",
                                "address": "广州",
                            },
                            {
                                "date":"2014",
                                "address": "广州",
                            },
                            {
                                "date":"2015",
                                "address": "广州",
                            },

                            {
                                "date":"2011",
                                "address": "成都",
                            },

                            {
                                "date":"2012",
                                "address": "成都",
                            },
                            {
                                "date":"2013",
                                "address": "成都",
                            },
                            {
                                "date":"2014",
                                "address": "成都",
                            },
                            {
                                "date":"2015",
                                "address": "成都",
                            },
                            {
                                "date":"2011",
                                "address": "武汉",
                            },


                            {
                                "date":"2012",
                                "address": "武汉",
                            },
                            {
                                "date":"2013",
                                "address": "武汉",
                            },

                            {
                                "date":"2014",
                                "address": "武汉",
                            },

                            {
                                "date":"2015",
                                "address": "武汉",
                            }
                        ]
                    },

                   platform_dateaddress_pvvisitor:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":2
                        },
                            {"id": "platform", "name": "平台","data":["PV","新访客"], "colspan":1,
                                "field": [ "北京_Android_pv","北京_Android_vistor","广州_Android_pv" , "广州_Android_visitor", "成都_Android_pv", "成都_Android_visitor",
                                    "武汉_Android_pv" , "武汉_Android_vistor"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":2},{label:"城市", id:"address", data:[2011,2012,2013,2014,2015],"rowspan":2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "address": "上海",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "北京",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            }
                        ]
                    },

                    platform_dateaddress_visitorpv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":2
                        },
                            {"id": "platform", "name": "平台","data":["新访客","PV"], "colspan":1,
                                "field": [ "北京_Android_pv","北京_Android_vistor","广州_Android_pv" , "广州_Android_visitor", "成都_Android_pv", "成都_Android_visitor",
                                    "武汉_Android_pv" , "武汉_Android_vistor"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":2},{label:"城市", id:"address", data:[2011,2012,2013,2014,2015],"rowspan":2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "address": "上海",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "北京",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            }
                        ]
                    },

                    platform_addressdate_pvvisitor:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":2
                        },
                            {"id": "platform", "name": "平台","data":["PV","新访客"], "colspan":1,
                                "field": [ "北京_Android_pv","北京_Android_vistor","广州_Android_pv" , "广州_Android_visitor", "成都_Android_pv", "成都_Android_visitor",
                                    "武汉_Android_pv" , "武汉_Android_vistor"]}],// TODO
                        "row_selected":[ {label:"城市", id:"address", data:[2011,2012,2013,2014,2015],"rowspan":2},{label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "address": "上海",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2011",
                                "address": "北京",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2011",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2014",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2015",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            }
                        ]
                    },


                    platform_addressplatform_pvvisitor:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":2
                        },
                            {"id": "platform", "name": "平台","data":["PV","新访客"], "colspan":1,
                                "field": [ "上海_Android_pv", "上海_Android_vistor", "北京_Android_pv","北京_Android_vistor","广州_Android_pv" , "广州_Android_visitor", "成都_Android_pv", "成都_Android_visitor"
                                  ]}],// TODO
                        "row_selected":[ {label:"城市", id:"address", data:[2011,2012,2013,2014,2015],"rowspan":2},{label:"平台", id:"platform", data:["Android","IOS","PAD","PCS"],"rowspan":2}],//用户选择的行
                        "rows": [
                            {
                                "platform":"Android",
                                "address": "上海",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"IOS",
                                "address": "上海",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"PAD",
                                "address": "上海",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"PCS",
                                "address": "上海",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },


                            {
                                "platform":"Android",
                                "address": "北京",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"IOS",
                                "address": "北京",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"PAD",
                                "address": "北京",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"PCS",
                                "address": "北京",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },

                            {
                                "platform":"Android",
                                "address": "广州",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"IOS",
                                "address": "广州",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"PAD",
                                "address": "广州",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"PCS",
                                "address": "广州",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },

                            {
                                "platform":"Android",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"IOS",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"PAD",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },

                            {
                                "platform":"PCS",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },

                            {
                                "platform":"Android",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"IOS",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"PAD",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            },
                            {
                                "platform":"PCS",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                            }

                        ]
                    },

                    platform_addressdate_visitorpv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":2
                        },
                            {"id": "platform", "name": "平台","data":["新访客","PV"], "colspan":1,
                                "field": [ "北京_Android_pv","北京_Android_vistor","广州_Android_pv" , "广州_Android_visitor", "成都_Android_pv", "成都_Android_visitor",
                                    "武汉_Android_pv" , "武汉_Android_vistor"]}],// TODO
                        "row_selected":[ {label:"城市", id:"address", data:[2011,2012,2013,2014,2015],"rowspan":2},{label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "address": "上海",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "上海",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2011",
                                "address": "北京",
                                "上海_Android_pv":"34",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "北京",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "广州",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2011",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2014",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2015",
                                "address": "成都",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2011",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2012",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2013",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },
                            {
                                "date":"2014",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            },

                            {
                                "date":"2015",
                                "address": "武汉",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",
                            }
                        ]
                    },

                    addressplatform_date_visitorpv:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":4},{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":2
                        },
                            {"id": "platform", "name": "平台","data":["新访客","PV"], "colspan":1,
                                "field": ["上海_Android_pv","上海_Android_vistor", "北京_Android_pv","北京_Android_vistor","广州_Android_pv" , "广州_Android_visitor", "成都_Android_pv", "成都_Android_visitor",
                                    "武汉_Android_pv" , "武汉_Android_vistor", "上海_IOS_pv", "上海_IOS_visitor", "北京_IOS_pv","北京_IOS_visitor", "广州_IOS_pv",
                                    "广州_IOS_visitor", "成都_IOS_pv","成都_IOS_visitor","武汉_IOS_pv","武汉_IOS_visitor","上海_PCS_pv","上海_PCS_vistor", "北京_PCS_pv","北京_PCS_vistor","广州_PCS_pv" , "广州_PCS_visitor", "成都_PCS_pv", "成都_PCS_visitor",
                                    "武汉_PCS_pv" , "武汉_PCS_vistor", "上海_PAD_pv", "上海_PAD_visitor", "北京_PAD_pv","北京_PAD_visitor", "广州_PAD_pv",
                                    "广州_PAD_visitor", "成都_PAD_pv","成都_PAD_visitor","武汉_PAD_pv","武汉_PAD_visitor"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":3}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2012",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2013",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2014",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2015",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            }
                        ]
                    },
                    addressplatform_date_pvvisitor:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":4},{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":2
                        },
                            {"id": "platform", "name": "平台","data":["PV","新访客"], "colspan":1,
                                "field": ["上海_Android_pv","上海_Android_vistor", "北京_Android_pv","北京_Android_vistor","广州_Android_pv" , "广州_Android_visitor", "成都_Android_pv", "成都_Android_visitor",
                                    "武汉_Android_pv" , "武汉_Android_vistor", "上海_IOS_pv", "上海_IOS_visitor", "北京_IOS_pv","北京_IOS_visitor", "广州_IOS_pv",
                                    "广州_IOS_visitor", "成都_IOS_pv","成都_IOS_visitor","武汉_IOS_pv","武汉_IOS_visitor","上海_PCS_pv","上海_PCS_vistor", "北京_PCS_pv","北京_PCS_vistor","广州_PCS_pv" , "广州_PCS_visitor", "成都_PCS_pv", "成都_PCS_visitor",
                                    "武汉_PCS_pv" , "武汉_PCS_vistor", "上海_PAD_pv", "上海_PAD_visitor", "北京_PAD_pv","北京_PAD_visitor", "广州_PAD_pv",
                                    "广州_PAD_visitor", "成都_PAD_pv","成都_PAD_visitor","武汉_PAD_pv","武汉_PAD_visitor"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":3}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2012",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2013",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2014",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2015",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            }
                        ]
                    },
                    platformaddress_date_visitorpv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":5},{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":2
                        },
                            {"id": "platform", "name": "平台","data":["新访客","PV"], "colspan":1,
                                "field": ["上海_Android_pv","上海_Android_vistor", "北京_Android_pv","北京_Android_vistor","广州_Android_pv" , "广州_Android_visitor", "成都_Android_pv", "成都_Android_visitor",
                                    "武汉_Android_pv" , "武汉_Android_vistor", "上海_IOS_pv", "上海_IOS_visitor", "北京_IOS_pv","北京_IOS_visitor", "广州_IOS_pv",
                                    "广州_IOS_visitor", "成都_IOS_pv","成都_IOS_visitor","武汉_IOS_pv","武汉_IOS_visitor","上海_PCS_pv","上海_PCS_vistor", "北京_PCS_pv","北京_PCS_vistor","广州_PCS_pv" , "广州_PCS_visitor", "成都_PCS_pv", "成都_PCS_visitor",
                                    "武汉_PCS_pv" , "武汉_PCS_vistor", "上海_PAD_pv", "上海_PAD_visitor", "北京_PAD_pv","北京_PAD_visitor", "广州_PAD_pv",
                                    "广州_PAD_visitor", "成都_PAD_pv","成都_PAD_visitor","武汉_PAD_pv","武汉_PAD_visitor"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":3}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2012",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2013",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2014",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2015",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            }
                        ]
                    },

                    platformaddress_date_pvvisitor:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":5},{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":2
                            },
                            {"id": "platform", "name": "平台","data":["PV","新访客"], "colspan":1,
                                "field": ["上海_Android_pv","上海_Android_vistor", "北京_Android_pv","北京_Android_vistor","广州_Android_pv" , "广州_Android_visitor", "成都_Android_pv", "成都_Android_visitor",
                                    "武汉_Android_pv" , "武汉_Android_vistor", "上海_IOS_pv", "上海_IOS_visitor", "北京_IOS_pv","北京_IOS_visitor", "广州_IOS_pv",
                                "广州_IOS_visitor", "成都_IOS_pv","成都_IOS_visitor","武汉_IOS_pv","武汉_IOS_visitor","上海_PCS_pv","上海_PCS_vistor", "北京_PCS_pv","北京_PCS_vistor","广州_PCS_pv" , "广州_PCS_visitor", "成都_PCS_pv", "成都_PCS_visitor",
                                    "武汉_PCS_pv" , "武汉_PCS_vistor", "上海_PAD_pv", "上海_PAD_visitor", "北京_PAD_pv","北京_PAD_visitor", "广州_PAD_pv",
                                    "广州_PAD_visitor", "成都_PAD_pv","成都_PAD_visitor","武汉_PAD_pv","武汉_PAD_visitor"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":3}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2012",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2013",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2014",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            },
                            {
                                "date":"2015",
                                "上海_Android_pv": "924",
                                "上海_Android_vistor": "94",
                                "北京_Android_pv": "554",
                                "北京_Android_vistor": "554",
                                "广州_Android_pv": "617",
                                "广州_Android_visitor": "617",
                                "成都_Android_pv": "520",
                                "成都_Android_visitor": "520",
                                "武汉_Android_pv": "107",
                                "武汉_Android_vistor": "107",

                                "上海_IOS_pv": "657",
                                "上海_IOS_visitor": "657",
                                "北京_IOS_pv": "591",
                                "北京_IOS_visitor": "591",
                                "广州_IOS_pv": "591",
                                "广州_IOS_visitor": "591",
                                "成都_IOS_pv": "591",
                                "成都_IOS_visitor": "591",
                                "武汉_IOS_pv": "591",
                                "武汉_IOS_visitor": "591",

                                "上海_PAD_pv": "657",
                                "上海_PAD_visitor": "657",
                                "北京_PAD_pv": "591",
                                "北京_PAD_visitor": "591",
                                "广州_PAD_pv": "591",
                                "广州_PAD_visitor": "591",
                                "成都_PAD_pv": "591",
                                "成都_PAD_visitor": "591",
                                "武汉_PAD_pv": "591",
                                "武汉_PAD_visitor": "591",

                                "上海_PCS_pv": "657",
                                "上海_PCS_visitor": "657",
                                "北京_PCS_pv": "591",
                                "北京_PCS_visitor": "591",
                                "广州_PCS_pv": "591",
                                "广州_PCS_visitor": "591",
                                "成都_PCS_pv": "591",
                                "成都_PCS_visitor": "591",
                                "武汉_PCS_pv": "591",
                                "武汉_PCS_visitor": "591",
                            }
                        ]
                    },
                    addressplatform_date_:{
                        "total":5,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":4,
                        },{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]
                        }],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],rowspan:2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                            },
                            {
                                "date":"2012",
                            },
                            {
                                "date":"2013",
                            },
                            {
                                "date":"2014",
                            },
                            {
                                "date":"2015",
                            }
                        ]
                    },

                    addressplatform_date_pv:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":4,
                        },{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]
                        }],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],rowspan:2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            }
                        ]
                    },

                    platformaddress_date_:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":5},{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                            },
                            {
                                "date":"2012",
                            },
                            {
                                "date":"2013",
                            },
                            {
                                "date":"2014",
                            },
                            {
                                "date":"2015",
                            }
                        ]
                    },

                    platformaddress_date_pv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":5},{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015,2011,2012,2013,2014,2015,2011,2012,2013,2014,2015,2011,2012,2013,2014,2015,2011,2012,2013,2014,2015,2011,2012,2013,2014,2015,2011,2012,2013,2014,2015,2011,2012,2013,2014,2015],"rowspan":2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },{
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },{
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },{
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },{
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            }
                        ]
                    },

                    platformaddress_date_pv_5:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":5},{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015],"rowspan":2}],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            }
                        ]
                    },



                    platformaddress__pv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], colspan:5},{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]}],// TODO
                        "row_selected":[],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            }
                        ]
                    },
                    addressplatform__pv:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":4,
                        },{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]
                        }],// TODO
                        "row_selected":[],//用户选择的行
                        "rows": [
                            {
                                "date":"2011",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2012",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2013",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2014",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            },
                            {
                                "date":"2015",
                                "上海_Android": "924",
                                "北京_Android": "554",
                                "广州_Android": "617",
                                "成都_Android": "520",
                                "武汉_Android": "107",

                                "上海_IOS": "657",
                                "北京_IOS": "591",
                                "广州_IOS": "144",
                                "成都_IOS": "843",
                                "武汉_IOS": "564",

                                "上海_PAD": "924",
                                "北京_PAD": "554",
                                "广州_PAD": "617",
                                "成都_PAD": "520",
                                "武汉_PAD": "107",

                                "上海_PCS": "924",
                                "北京_PCS": "554",
                                "广州_PCS": "617",
                                "成都_PCS": "520",
                                "武汉_PCS": "107"
                            }
                        ]
                    }
                }
            }
        },
        {
            tabid:1,
            tabname:"访问2",
            tabcontent:{
                selected_den:{
                    "column":[],
                    "row":[],
                    "magnanimity":[] //度量
                },
                dimension:[//维度
                    {label:"日期_1", id:"date",detail:"日期_1", data:[2011,2012,2013,2014,2015]},
                    {label:"平台1",id:"platform",detail:"平台1", data:["Android","IOS","PAD","PCS"]},
                    {label:"城市1",id:"address", detail:"城市1",data:["上海","北京","广州","成都","武汉"]}
                ],
                dimension_new:[//新增维度
                    {label:"日期21", id:"date1", detail:"日期21",data:[2011,2012,2013,2014,2015]},
                    {label:"平台21",id:"platform1",detail:"平台21", data:["Android","IOS","PAD","PCS"]},
                    {label:"城市21",id:"address1",detail:"城市21", data:["上海","北京","广州","成都","武汉"]}
                ],
                magnanimity : [//度量
                    {label:"PV",detail:"PV", id:"pv"},
                    {label:"新访客",detail:"新访客", id:"visitor"},
                    {label:"访客数",detail:"访客数", id:"visitorNum"}
                ],
                magnanimity_new : [//新增度量
                    {label:"PV1", detail:"PV1",id:"pv1"},
                    {label:"新访客1",detail:"新访客1", id:"visitior1"},
                    {label:"访客数1", detail:"访客数1",id:"visitiorNum1"}
                ]
            }
        }
    ]
};