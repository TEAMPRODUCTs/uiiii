define(["underscore", "easyui", "../js/component/add_dlg_component","../js/component/database_op","../js/component/tab_comp","../js/component/datatable_comp","../js/component/draggable_comp"],
    function (_,easyui, dlg_component , databse_op, Tab, Datatable, Draggable) {
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
                if(id !=0 && !id){
                    return;
                }
                Tab.setActiveTab(id, e);
                var tabdata =  _.filter(vm.data_all.tabs.$model, function(data){ return data.tabid === id; });//设置当前tab
                vm.data =tabdata ? tabdata[0].tabcontent : initial_data;
                vm.$fire("data.selected_den",vm.data.selected_den);//刷新table
            },
            closeTab:function(id, e){
                var data_all = vm.data_all;
                var index = $(e).data("index");
                if(id == data_all.current_tabid){//若删除的是当前tab， 则
                    if(index < data_all.tabs.length -1){
                        data_all.current_tabid = data_all.tabs[index + 1].tabid;
                    }else if(index > 0){
                        data_all.current_tabid = data_all.tabs[index - 1].tabid;
                    }else{
                        data_all.current_tabid = null;
                    }
                    var tabdata =  _.filter(vm.data_all.tabs.$model, function(data){ return data.tabid === data_all.current_tabid; });//设置当前tab
                    vm.data =tabdata ? tabdata[0].tabcontent : initial_data;
                    vm.$fire("data.selected_den",vm.data.selected_den);//刷新table
                }
                // vm.data_all.tabs.removeAt(index);
/*                var temp = data_all.tabs.$model.splice(index, 1 );
                data_all.tabs.clear();
                data_all.tabs =temp;*/
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
            vm.$watch("data.selected_den",function(){
                console.log("刷新table");//TODO 请求后台 刷新table
              //  renderTable();
                Datatable.renderTable( vm.data);
            });
        }

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
            var tabdata =  _.filter(vm.data_all.tabs, function(data){ return data.tabid === id; });//设置当前tab
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