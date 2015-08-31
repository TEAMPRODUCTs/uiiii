/**
 * Created by fiona.xu on 2015/8/26.
 */
window.Mockdata =
    [
        {
            tabid:0,
            tabcontent:{
                selected_den:{
                    "column":[{"id": "address", "name": "城市11"}],
                    "row":[{"id": "address", "name": "城市"}]
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
                    {label:"新访客", id:"visitior"},
                    {label:"访客数", id:"visitiorNum"}
                ],
                magnanimity_new : [//新增度量
                    {label:"PV1", id:"pv1"},
                    {label:"新访客1", id:"visitior1"},
                    {label:"访客数1", id:"visitiorNum1"}
                ]
            }
        },
        {
            tabid:1,
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
                    {label:"新访客", id:"visitior"},
                    {label:"访客数", id:"visitiorNum"}
                ],
                magnanimity_new : [//新增度量
                    {label:"PV1", id:"pv1"},
                    {label:"新访客1", id:"visitior1"},
                    {label:"访客数1", id:"visitiorNum1"}
                ]
            }
        }
    ];