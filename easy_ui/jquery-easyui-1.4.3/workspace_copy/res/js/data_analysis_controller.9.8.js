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
           /* data:{
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
            },*/
            addtab:function(e){
            },
            drag: function(ev){
               // Draggable.drag(ev);
                ev.dataTransfer.effectAllowed = "move";
                var elem = ev.target
                ev.dataTransfer.setData("typede",$(elem).data("typede"));//维度度量 大类分
                ev.dataTransfer.setData("type", $(elem).parent(".input-content").data("type")); //行列分类
                ev.dataTransfer.setData("id",$(elem).data("id"));
                ev.dataTransfer.setData("index",$(elem).data("index"));
                ev.dataTransfer.setData("name",ev.target.innerHTML);
                ev.dataTransfer.setData("isMagnanmity",ev.target.innerHTML);
            },
            drop : function (ev) {
                //Draggable.drop(ev, vm);
                console.log("dsds");
                var id = ev.dataTransfer.getData("id");
                var name = ev.dataTransfer.getData("name");
                var typede_from = ev.dataTransfer.getData("typede");
                var elem = $(ev.currentTarget);
                var type = elem.data("type");
                var typede = elem.data("typede");
                var data = ev.dataTransfer.getData("data");
                if(typede_from != typede){//维度 度量大类需一致
                    return;
                }
                var type_from = ev.dataTransfer.getData("type");
                var index = NaN;
                if(!!type && type_from != 'null'){ //行列小类判断
                    if(type === type_from){
                        index = parseInt(ev.dataTransfer.getData("index"), 10);
                    }else{
                        var index = parseInt(ev.dataTransfer.getData("index"), 10);
                        this.getCurrentTabData().selected_den[type_from].splice(index, 1);
                    }
                }
                if(!id || !name){
                    return;
                }
                var xpos = ev.offsetX;
                var target_index = null;

                var selectedElem = elem.find(".selected-" + typede);
                for(var i = 0 ; i < selectedElem.length ; i++){
                    var elem_i = selectedElem[i];
                    var left = elem_i.offsetLeft  + elem_i.offsetWidth/2; //通过坐标判断位置 只判一层
                    if(xpos < left){
                        target_index = i;
                        break;
                    }
                }
                var type = elem.data("type");
                var arr = _.findWhere( this.getCurrentTabData().selected_den[type], {"id": id});//vm.data

                target_index = target_index === null ? selectedElem.length  : target_index;
                if(!(isNaN(index) && !!arr)){
                    this.getCurrentTabData().selected_den[type].splice(target_index, 0 , {"id": id, "name": name});
                }else{
                    return;
                }
                if(!!arr && !isNaN(index)){
                    //内部调位置
                    if(target_index <= index){
                        index += 1;
                    }
                    this.getCurrentTabData().selected_den[type].splice(index , 1);
                }

                //vm.$fire("data.selected_den",vm.data.selected_den);
            },
            allowDrop: function(ev){
                ev.preventDefault();
            },
            clear:function(e){
               var type =  $(e.currentTarget).parent().prev().data("type");
                vm.getCurrentTabData().selected_den[type] = [];
               // vm.data.selected_den[type].clear();//TODO 同步记录态
              //  vm.$fire("data.selected_den",vm.data.selected_den);
            },
            setActiveTab: function(id, e){
                Tab.setActiveTab(id, e);
                vm.data_all.current_tabid = id;
               // var tabdata =  _.filter(vm.data_all.tabs.$model, function(data){ return data.tabid === id; });//设置当前tab
               // vm.data =tabdata ? getCurrentTabData(id).tabcontent : initial_data;
               // vm.$fire("data.selected_den",vm.data.selected_den);//刷新table
            },

            getCurrentTabData: function(id){
                var tabdata =  _.filter(vm.data_all.tabs.$model, function(data){ return data.tabid === vm.data_all.current_tabid; });//设置当前tab
                return tabdata[0].tabcontent;
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
            selected_column: []//所选维度列
        });

        vm.init = function(){
            //var tabdata  = _.filter(window.Mockdata.tabs, function(data){ return data.tabid === 0; });//TODO 初始化是空
            //vm.data =tabdata ? tabdata[0].tabcontent : this.getCurrentTabData(); //TODO REMOVE
            vm.data_all = window.Mockdata;
            //tabInit(); tab generated
            avalon.nextTick(function() {
                $("#main_container").layout();
                Datatable.renderTable( vm.getCurrentTabData());
            });
            vm.$watch("data_all",function(){
                console.log("刷新table");//TODO 请求后台 刷新table
                Datatable.renderTable( this.getCurrentTabData());
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
           // vm.data =tabdata ? tabdata[0].tabcontent : initial_data;
            //vm.$fire("data.selected_den",vm.data.selected_den);//刷新table
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