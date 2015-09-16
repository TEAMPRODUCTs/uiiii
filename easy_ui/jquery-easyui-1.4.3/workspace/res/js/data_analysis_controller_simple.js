define(["underscore", "easyui","../js/util", "../js/component/add_dlg_component","../js/component/database_op","../js/component/tab_comp","../js/component/datatable_comp","../js/component/draggable_comp","avalon.ui"],
    function (_,easyui, util, dlg_component , databse_op, Tab, Datatable, Draggable) {
        var initial_data = {
            filter:{
                "visitdate":{"fromdate":"2014-01-13", "todate":"2014-02-13"}
            },
            selected_den:{
                "column":[],
                "row":[],
                "magnanimity":[],
                "filter":[{name:"访问日期", id:"date", value:{}}]
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
            ]
        };
        var vm = avalon.define({
            $id:   "test",
            type:1, //1：维度 2：新增维度 3：度量 4：新增度量
            right_click_tabid:"",//记录右击tab
            right_click_demid:"",//记录右击维度 id
            right_click_metricid:"",//记录右击度量id
            opts:{ fromdate:"2015-02-09",  todate:"2015-06-08"},
            data_all :{
                current_tabid:"",//当前的tab
                tabs:[]
            },
            data:{
                filter:{},
                //column , row , magnanimity
                selected_den:{
                    "column":[],
                    "row":[]
                },
                dimension:[//维度
                ],
                dimension_new:[//新增维度
                ],
                magnanimity : [//度量
                ],
                magnanimity_new : [//新增度量
                ]
            },
            remove: function(type, id){
                var obj =  _.find(vm.data.selected_den[type],function(data){return data.id == id});
                vm.data.selected_den[type].remove(obj);
                vm.$fire("data.selected_den",vm.data.selected_den);//刷新table
            },
            drag: function(ev){
                Draggable.drag(ev);
            },
            drop : function (ev) {
                Draggable.drop(ev, vm);
            },
            dragenter : function(ev){
                Draggable.dragenter(ev, vm);
            },
            allowDrop: function(ev){
                Draggable.dragover(ev, vm);
                ev.preventDefault();//dropEffect默认设置为none  无法触发drop 事件 需要阻止默认事件触发后续drop事件
            },
            clear:function(e){
               var type =  $(e.currentTarget).parent().prev().find(".input-content").data("type");
                vm.data.selected_den[type].clear();//TODO 同步记录态
                vm.$fire("data.selected_den",vm.data.selected_den);
            },
            setActiveTab: function(id, e){
                if((id !=0 && !id) || id == vm.data_all.current_tabid){
                    return;
                }
                Tab.setActiveTab(id, e);
                vm.setActive(id);
            },
            setActive: function(id){
                vm.data_all.current_tabid = id; //设置当前tab
                var tabdata =  vm.getTabdataById(id);//设置当前tab
                vm.data =tabdata ? tabdata.tabcontent : initial_data;
                vm.$fire("data.selected_den",vm.data.selected_den);//刷新table
            },

            getTabdataById: function(id){
                var tabdata =  _.filter(vm.data_all.tabs.$model, function(data){ return data.tabid === id; });//设置当前tab
                return tabdata[0];
            },

            closeTab:function(id, e){
                var index = $(e).data("index");
                Tab.deleteTab(index, vm);
            },
            showDlg:function(){
                var option = {
                    title:"新建分析主题",
                    container: "new_analysis_dlg",
                    content:"tpl",
                    initHandlers:[dlgDateInit],
                    buttons:[{text: "新建分析主题", handler:newAnaylsis}]
                }
                dlg_component.showDlg(option);
            },
            bodyClick: function(e){
                console.log("body click");
                $(".dropdown-menu").hide();
            },
            rightClickTab: function(e, id){ //event tabid
                var  obj = e.currentTarget;
                if(e.button == 2){
                    vm.right_click_tabid = id;
                    vm.showDropdown("dropdown-tab", obj);
                }
            },
            showDropdown: function(cls , obj){//class object
                var left = obj.offsetWidth/3 + obj.offsetLeft;
                var top =obj.offsetTop + obj.offsetHeight;
                var elem = $("." + cls);
                elem.css("left", left);
                elem.css("top", top );
                elem.show();
            },

            rightClickDem:function(e){
               /* var  obj = e.currentTarget;
                var id = $(obj).data("id"); //维度id
                if(e.button == 2){
                    vm.right_click_demid = id;
                    vm.type = $(obj).data("type");
                    vm.showDropdown("dropdown-dimension", obj);
                }*/
            },

            rightClickMetric:function(e){
               /* var  obj = e.currentTarget;
                var id = $(obj).data("id"); //维度id
                if(e.button == 2){
                    vm.right_click_metricid = id;
                    vm.type = $(obj).data("type");
                    vm.showDropdown("dropdown-dimension", obj);
                }*/
            },
            createDimension:function(e){//创建维度
            /*    var option = {
                    title:"创建维度字段",
                    content:"create_dimension",
                    buttons:[{text: "确定", handler:newDimension},{text: "取消", handler:dlg_component.closeDlg}]
                }
                dlg_component.showDlg(option);*/
            },
            createMetric: function(e){//创建度量
                /*var option = {
                    title:"创建度量字段",
                    content:"create_metric",
                    buttons:[{text: "确定", handler:newMetric},{text: "取消", handler:dlg_component.closeDlg}]
                }
                dlg_component.showDlg(option);*/
            },
            copy: function(e){//复制维度
              /*  Draggable.copy(vm);*/
            },
            editfilter: function(e){
                var option = {
                    title:"视图筛选器",
                    content:"date_filter",
                    //initHandlers:[dlgDateFilterInit],
                    buttons:[/*{text: "确定", handler:dateFilterCallback},*/{text: "取消", handler:dlg_component.closeDlg}]
                }
                dlg_component.showDlg(option);

                avalon.define({
                    $id: "datefilter",
                    opts:vm.opts
                })
                avalon.scan(); //初始化数据
            },
            getFilterObj: function(type,vm){
                switch (type) {
                    case 2:
                        var fileterobj = _.find(vm.data.dimension_new, function (data) {
                            return data.id == vm.right_click_demid
                        });
                        break;
                    case 4://delete
                        var fileterobj = _.find(vm.data.magnanimity_new, function (data) {
                            return data.id == vm.right_click_demid
                        });
                        break;
                }
                return this.fileterobj;
            },

            updateDiemen: function(){//TODO 调用后端
                var type = parseInt(vm.type, 10);
                var filterObj = vm.getFilterObj(type,vm);
                filterObj.label = $(".edit-name").val();
            },

            edit : function(e){
                Draggable.edit(vm);
            },
            deleteitem: function(e){
                Draggable.delete(vm);
            },
            editTab: function(){//右键编辑tab功能
                var  tabdata = vm.getTabdataById(vm.right_click_tabid);
                //TODO Dlg show
            },
            copyTab: function(){//右键copy tab
                var  tabdata = util.cloneObject(vm.getTabdataById(vm.right_click_tabid), true); //deep copy tabcontent
                tabdata.tabid = Tab.addTab();
                vm.data_all.current_tabid = tabdata.tabid;
                vm.data_all.tabs.push(tabdata);
                vm.data =tabdata ? tabdata.tabcontent : initial_data;
            },
            addPanel: function(){
                console.log("add");
            },
            removePanel:function(){

            },
            selected_column: []//所选维度列
        });

        vm.init = function(){
            var tabdata  = _.filter(window.Mockdata.tabs, function(data){ return data.tabid === 0; });//TODO 初始化是空
            vm.data =tabdata ? tabdata[0].tabcontent : vm.data; //TODO REMOVE
            vm.data_all = window.Mockdata;
            initDateRange();
            avalon.nextTick(function() {
                Datatable.renderTable( vm.data);
            });
            vm.$watch("data.selected_den", function(){
                console.log("test111")
            });
            vm.$watch("data.selected_den",function(){
                console.log("刷新table");//TODO 请求后台 刷新table
              //  renderTable();
                Datatable.renderTable( vm.data);
            });
        }

        function initDateRange(){
            var today = new Date();
            vm.opts.todate = util.formateDate(today, "yyyy-MM-dd");
            var  fromdate = new Date();
            fromdate.setDate(fromdate.getDate() - 30);
            vm.opts.fromdate = util.formateDate(fromdate,"yyyy-MM-dd" );
        }

        //创建维度
        var newDimension = function(){
            var dimension = $("#dimen_name").val();
            vm.data.dimension_new.push({"label":dimension, "id": util.generateId("dimension_"),"detail": dimension});
        };

        //创建量度
        var newMetric = function(){
            var metric = $("#metric_name").val();
            vm.data.magnanimity_new.push({"label":metric, "id": util.generateId("metric_"),"detail": metric});
        };

        //创建分析主题
        var  newAnaylsis = function(){
            var id = Tab.addTab();//tabid generated
            var name = $("#anlysis_theme").val(),
                fromdate = $('#from_date').datebox("getValue"),//TODO
                todate = $("#to_date").datebox("getValue");
            var tab = {
                tabid: id,
                tabname: name,
                tabcontent:initial_data//window.Mockdata.tabs[0].tabcontent//TODO 初始化initial_data
            };
            vm.data_all.current_tabid = id;
            vm.data_all.tabs.push(tab);
            var tabdata =  _.filter(vm.data_all.tabs.$model, function(data){ return data.tabid === id; });//设置当前tab
            vm.data =tabdata ? tabdata[0].tabcontent : initial_data;
            vm.$fire("data.selected_den",vm.data.selected_den);//刷新table
        };

        var dlgDateFilterInit = function(){
            $('#from_date_filter').datebox({
                required:true,
                width:"110px"
            });

            $('#to_date_filter').datebox({
                required:true,
                width:"110px"
            });
        }

        //TODO 初始化化日期
        var dlgDateInit = function(){
            $('#from_date').datebox({
                required:true,
                width:"110px"
            });

            $('#to_date').datebox({
                required:true,
                width:"110px"
            });

          /*  var today = new Date();*/
           // $('#to_date').datebox('setValue', "2015-9-10");
        };

        avalon.scan(); //初始化数据
        return vm;
});