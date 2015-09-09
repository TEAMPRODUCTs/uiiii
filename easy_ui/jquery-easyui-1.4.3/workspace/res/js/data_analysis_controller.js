define(["underscore", "easyui","../js/util", "../js/component/add_dlg_component","../js/component/database_op","../js/component/tab_comp","../js/component/datatable_comp","../js/component/draggable_comp"],
    function (_,easyui, util, dlg_component , databse_op, Tab, Datatable, Draggable) {
        var initial_data = {
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
        };
        var vm = avalon.define({
            $id:   "test",
            right_click_tabid:"",//记录右击tab
            right_click_demid:"",//记录右击维度 id
            right_click_metricid:"",//记录右击度量id
            data_all :{
                current_tabid:"",//当前的tab
                tabs:[]
            },
            data:{
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
            addtab:function(e){
            },
            drag: function(ev){
                Draggable.drag(ev);
            },
            drop : function (ev) {
                Draggable.drop(ev, vm);
            },
            allowDrop: function(ev){
                ev.preventDefault();
            },
            clear:function(e){
               var type =  $(e.currentTarget).parent().prev().data("type");
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
                var data_all = vm.data_all;
                var index = $(e).data("index");
                var id_active = null;
                if(id == data_all.current_tabid){//若删除的是当前tab， 则
                    if(index < data_all.tabs.length -1){
                        id_active = data_all.tabs[index + 1].tabid;
                    }else if(index > 0){
                        id_active = data_all.tabs[index - 1].tabid;
                    }
                    vm.setActive(id_active);
                }
                 vm.data_all.tabs.removeAt(index);
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
                var  obj = e.currentTarget;
                var id = $(obj).data("id"); //维度id
                if(e.button == 2){
                    vm.right_click_demid = id;
                    vm.showDropdown("dropdown-dimension", obj);
                }
            },

            rightClickMetric:function(e){
                var  obj = e.currentTarget;
                var id = $(obj).data("id"); //维度id
                if(e.button == 2){
                    vm.right_click_metricid = id;

                }
            },
            createDimension:function(e){//创建维度
                var option = {
                    title:"创建维度字段",
                    container: "new_analysis_dlg",
                    content:"create_dimension",
                    buttons:[{text: "确定", handler:newDimension}]
                }
                dlg_component.showDlg(option);
            },
            createMetric: function(e){//创建度量

            },
            copyDimen: function(e){//复制维度

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
            //tabInit(); tab generated
            avalon.nextTick(function() {
                //renderTable();
                Datatable.renderTable( vm.data);
            });
            vm.$watch("data", function(){
                console.log("test111")
            });
            vm.$watch("data.selected_den",function(){
                console.log("刷新table");//TODO 请求后台 刷新table
              //  renderTable();
                Datatable.renderTable( vm.data);
            });
        }

        //创建维度
        var newDimension = function(){

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
                tabcontent:window.Mockdata.tabs[0].tabcontent//TODO 初始化initial_data
            };
            vm.data_all.current_tabid = id;
            vm.data_all.tabs.push(tab);
            var tabdata =  _.filter(vm.data_all.tabs.$model, function(data){ return data.tabid === id; });//设置当前tab
            vm.data =tabdata ? tabdata[0].tabcontent : initial_data;
            vm.$fire("data.selected_den",vm.data.selected_den);//刷新table
        };

        var dlgDateInit = function(){
            $('#from_date').datebox({
                required:true,
                width:"110px"
            });

            $('#to_date').datebox({
                required:true,
                width:"110px"
            });
        };

        avalon.scan(); //初始化数据
        return vm;
});