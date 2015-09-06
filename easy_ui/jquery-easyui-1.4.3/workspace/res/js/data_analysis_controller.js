define(["underscore", "easyui", "../js/component/add_dlg_component","../js/component/database_op"], function (_,easyui, dlg_component , databse_op) {
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
                ev.dataTransfer.effectAllowed = "move";
                var elem = ev.target
                ev.dataTransfer.setData("typede",$(elem).data("typede"));//维度度量 大类分
                ev.dataTransfer.setData("type", $(elem).parent(".input-content").data("type")); //行列分类
                ev.dataTransfer.setData("id",$(elem).data("id"));
                ev.dataTransfer.setData("index",$(elem).data("index"));
                ev.dataTransfer.setData("name",ev.target.innerHTML);
                ev.dataTransfer.setData("isMagnanmity",ev.target.innerHTML);
                var data = {"id" : 1, "name":"test"};
                ev.dataTransfer.setData("data",data);
            },
            drop : function (ev) {
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
                        vm.data.selected_den[type_from].splice(index, 1);
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
                var arr = _.findWhere( vm.data.selected_den[type], {"id": id});

                target_index = target_index === null ? selectedElem.length  : target_index;
                if(!(isNaN(index) && !!arr)){
                    vm.data.selected_den[type].splice(target_index, 0 , {"id": id, "name": name});
                }else{
                    return;
                }
                if(!!arr && !isNaN(index)){
                    //内部调位置
                    if(target_index <= index){
                        index += 1;
                    }
                    vm.data.selected_den[type].splice(index , 1);
                }

                vm.$fire("data.selected_den",vm.data.selected_den);
            },
            allowDrop: function(ev){
                ev.preventDefault();
            },
            clear:function(e){
               var type =  $(e.currentTarget).parent().prev().data("type");
                vm.data.selected_den[type].clear();//TODO 同步记录态
            },
            selected_column: []//所选维度列
        });

        vm.init = function(){
            var tabdata  = _.filter(window.Mockdata, function(data){ return data.tabid === 0; });//TODO 初始化是空
            vm.data =tabdata ? tabdata[0].tabcontent : vm.data;
            tabInit();
            avalon.nextTick(function() {
               //console.log($("#tpl").html());
            });
            databse_op.select();
            vm.$watch("data.selected_den",function(){
                console.log("刷新table");//TODO 请求后台 刷新table
            });
        }

       function draggableh5init(){

       }

        var  newAnaylsis = function(){
            alert("new anyaysis");
        };

        var dlgDateInit = function(){
            console.log("data init");
            $('#from_date').datebox({
                required:true,
                width:"110px"
            });

            $('#to_date').datebox({
                required:true,
                width:"110px"
            });

        };

        function tabInit(){
            $('#tt').tabs({
                border:false,
                tools:'#tab-tools',
                content:"content:'Tab Body',",
                onSelect:function(title, index){
                    if(title == '+'){
                        var option = {
                            title:"新建分析主题",
                            container: "new_analysis_dlg",
                            content:"tpl",
                            initHandlers:[dlgDateInit],
                            buttons:[{text: "新建分析主题", handler:newAnaylsis}]
                        }
                        dlg_component.showDlg(option);
                    }else{//tab切换数据同步
                        //TODO replace mockdata with real data
                        var tabdata  = _.filter(window.Mockdata, function(data){ return data.tabid === index; });//TODO
                        vm.data = (tabdata && tabdata.length )? tabdata[0].tabcontent :initial_data;
                    }
                }
            });
        }
        avalon.scan(); //初始化数据
        return vm;
});