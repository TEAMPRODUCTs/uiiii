define(["underscore", "easyui","../js/util", "../js/component/add_dlg_component","../js/component/tab_comp","../js/component/datatable_comp",
        "../js/component/draggable_comp","../js/common/constant","avalon.ui"],
/*define(["underscore-min", "easyui","../js/util", "../js/component/add_dlg_component","../js/component/tab_comp","../js/component/datatable_comp",
        "js/component/draggable_comp","js/common/constant","libs/avalon.ui"],*/
    function (_,easyui, util, dlg_component , Tab, Datatable, Draggable, constant) {
        var initial_data = constant.getInitial_data();
        var vm = avalon.define({
            $id:   "test",
            type:1, //1：维度 2：新增维度 3：度量 4：新增度量
            right_click_tabid:"",//记录右击tab
            right_click_demid:"",//记录右击维度 id
            right_click_metricid:"",//记录右击度量id
            initialdate:{ fromdate:"2015-02-09",  todate:"2015-06-08"},
            data_all :{
                current_tabid:"",//当前的tab
                tabs:[]
            },
            initialdate:{fromdate:"", todate:""},
            data:{
                //column , row , magnanimity
                selected_den:{
                    "column":[],
                    "row":[],
                    "magnanimity":[],
                    "filter":[{name:"", id:"", fromdate:"", todate:"", value:{},title:""}]
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
               // Tab.setActiveTab(id, e);
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
                dateControllerInit("new_date",vm.initialdate);//初始化date
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
                    buttons:[{text: "确定", handler:dateFilterCallback},{text: "取消", handler:dlg_component.closeDlg}]
                }
                dlg_component.showDlg(option);
                var date = getDateFilterObj();
                dateControllerInit("datefilter", date);
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
            render:function(){
              console.log("render");
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
        function dateControllerInit(id, date){
           // var date = getDateFilterObj();
            avalon.define({
                $id: id,
                opts: date
            })
            avalon.scan(); //初始化数据
        }
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
            var  fromdate = new Date();
            fromdate.setDate(fromdate.getDate() - 30);
            //TODO
            vm.initialdate.todate = util.formateDate(today, "yyyy-MM-dd");
            vm.initialdate.fromdate = util.formateDate(fromdate,"yyyy-MM-dd" );
            var date = getDateFilterObj();//返回日期对象
            setDateRange(fromdate, today, date);
        }

        function getDateFilterObj(){
            var date = _.find(vm.data.selected_den.filter,function(data){return data.id == "date"});
            return date;
        }
        function setDateRange(fromdate, todate, date){
            if(!date){
                return;
            }
            date.todate = util.formateDate(todate, "yyyy-MM-dd");
            date.fromdate = util.formateDate(fromdate,"yyyy-MM-dd" );
            date.title =  date.fromdate + " ~ " + date.todate;
            date.name = "访问日期";
            date.id = "date";
        }

        //TODO datefilter obj
        var dateFilterCallback = function(){
            var date =getDateFilterObj();
            date.todate = $("#to_date_filter").val();
            date.fromdate = $("#from_date_filter").val();
            date.title =  date.fromdate + " ~ " + date.todate;
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
                fromdate = $('#from_date').val(),//TODO
                todate = $("#to_date").val();

            var newnitial_data = util.cloneObject(initial_data,true);//深度copy出来
            var date = _.find(newnitial_data.selected_den.filter,function(data){return data.id == "date"}) ;
            if(!date){ //若默认没date push
                date = {};
                newnitial_data.selected_den.filter.push(date) ;
            }
            date.todate = todate;
            date.fromdate = fromdate;
            date.title =  date.fromdate + " ~ " + date.todate;
            date.name = "访问日期";
            date.id = "date";
            newnitial_data.dimension = constant.getDimension();
            newnitial_data.magnanimity = constant.getMagnanimity();
            var tab = {
                tabid: id,
                tabname: name,
                tabcontent:newnitial_data
            };
            vm.data_all.current_tabid = id;
            vm.data_all.tabs.push(tab);
            var tabdata =  _.filter(vm.data_all.tabs.$model, function(data){ return data.tabid === id; });//设置当前tab
            vm.data =tabdata ? tabdata[0].tabcontent : newnitial_data;
            vm.$fire("data.selected_den",vm.data.selected_den);//刷新table
        };

        var dlgDateFilterInit = function(){
        }

        //TODO 初始化化日期
        var dlgDateInit = function(){
        };

        avalon.scan(); //初始化数据
        return vm;
});