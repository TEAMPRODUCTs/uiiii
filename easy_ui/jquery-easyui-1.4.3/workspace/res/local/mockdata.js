/**
 * Created by fiona.xu on 2015/8/26.
 */
window.Mockdata ={
    current_tabid: 0,
    tabs: [
        {
            tabid:0,
            tabname:"访问1",
            tabcontent:{
                selected_den:{
                    "column":[{"id": "address", "name": "城市11",data:["上海","北京","广州","成都","武汉"]},{"id": "platform", "name": "平台",data:["Android","IOS","PAD","PCS"]}],// TODO
                    "row":[{"id": "date", "name": "日期",data:[2011,2012,2013,2014,2015]}],
                    "magnanimity":[{"id": "pv", "name": "PV"}], //度量
                    "filter":[{name:"访问日期", id:"date", value:{}}]
                },
                dimension:[//维度
                    {label:"日期", id:"date", data:[2011,2012,2013,2014,2015]},
                    {label:"平台",id:"platform", data:["Android","IOS","PAD","PCS"]},
                    {label:"城市",id:"address", data:["上海","北京","广州","成都","武汉"]}
                ],
                dimension_new:[//新增维度
                    {label:"日期1", id:"date1", data:[2011,2012,2013,2014,2015]},
                    {label:"平台1",id:"platform1", data:["Android","IOS","PAD","PCS"]},
                    {label:"城市1",id:"address1", data:["上海","北京","广州","成都","武汉"]}
                ],
                magnanimity : [//度量
                    {label:"PV", id:"pv"},
                    {label:"新访客", id:"visitor"},
                    {label:"访客数", id:"visitorNum"}
                ],
                magnanimity_new : [//新增度量
                    {label:"PV1", id:"pv1"},
                    {label:"新访客1", id:"visitior1"},
                    {label:"访客数1", id:"visitiorNum1"}
                ],
                data:{
                    //mockdata 行， 列 度量
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

                    platformaddress_date_pv:{
                        "total":4,
                        "column_selected":[{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":5},{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]}],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015]}],//用户选择的行
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
                    addressplatform_date_pv:{
                        "total":4,
                        "column_selected":[{"id": "address", "name": "城市11","data":["上海","北京","广州","成都","武汉"], "colspan":4,
                        },{"id": "platform", "name": "平台","data":["Android","IOS","PAD","PCS"], "colspan":1,
                            "field": ["上海_Android","北京_Android", "广州_Android","成都_Android","武汉_Android" , "上海_IOS", "北京_IOS", "广州_IOS","成都_IOS" , "武汉_IOS", "上海_PAD", "北京_PAD", "广州_PAD","成都_PAD", "武汉_PAD",
                                "上海_PCS", "北京_PCS","广州_PCS","成都_PCS","武汉_PCS"]
                        }],// TODO
                        "row_selected":[ {label:"日期", id:"date", data:[2011,2012,2013,2014,2015]}],//用户选择的行
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
                    "column":[{"id": "address", "name": "城市"}],
                    "row":[{"id": "address", "name": "城市"}],
                    "magnanimity":[{"id": "address", "name": "城市"}] //度量
                },
                dimension:[//维度
                    {label:"日期_1", id:"date", data:[2011,2012,2013,2014,2015]},
                    {label:"平台1",id:"platform", data:["Android","IOS","PAD","PCS"]},
                    {label:"城市1",id:"address", data:["上海","北京","广州","成都","武汉"]}
                ],
                dimension_new:[//新增维度
                    {label:"日期21", id:"date1", data:[2011,2012,2013,2014,2015]},
                    {label:"平台21",id:"platform1", data:["Android","IOS","PAD","PCS"]},
                    {label:"城市21",id:"address1", data:["上海","北京","广州","成都","武汉"]}
                ],
                magnanimity : [//度量
                    {label:"PV", id:"pv"},
                    {label:"新访客", id:"visitor"},
                    {label:"访客数", id:"visitorNum"}
                ],
                magnanimity_new : [//新增度量
                    {label:"PV1", id:"pv1"},
                    {label:"新访客1", id:"visitior1"},
                    {label:"访客数1", id:"visitiorNum1"}
                ]
            }
        }
    ]
};