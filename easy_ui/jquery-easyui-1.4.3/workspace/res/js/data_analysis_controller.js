define(["underscore", "easyui"], function (_,easyui) {
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
                registerEvent();
            })
        }

      function registerEvent(){
          $(document).ready(function(){
              draggableInit();
              droppableInit();
          });
      }



       function  draggableInit(){
           $(".section_ul li").draggable({
               proxy:'clone',
               revert:true,
               onStartDrag:function(){
                   $(this).draggable('options').cursor = 'not-allowed';
                   $(this).draggable('proxy').css('z-index',10);
               },
               onStopDrag:function(){
                   $(this).draggable('options').cursor='move';
               }
           });

           $(".dimension-content .selected-dimension").draggable({
               proxy:'clone',
               revert:true,
               onStartDrag:function(){
                   $(this).draggable('options').cursor = 'not-allowed';
                   $(this).draggable('proxy').css('z-index',10);
               },
               onStopDrag:function(){
                   $(this).draggable('options').cursor='move';
               }
           });

       }

       function droppableInit(){
           //TODO 维度 进度接受栏
           $('.input-content').droppable({
               accept:'.section_ul li',
               onDragEnter:function(e,source){
                   $(source).draggable('options').cursor='auto';
               },
               onDragLeave:function(e,source){
                   console.log("dragLeave")
                   $(source).draggable('options').cursor='not-allowed';
               },
               onDrop:function(e,source){
                   var id = $(source).attr("id");
                   var name =  $(source).html();
                   var elem = $(e.currentTarget);
                   var type = elem.data("type");
                   var arr = _.findWhere( vm.data.selected_den[type], {"id": id});
                   if(!arr){
                       vm.data.selected_den[type].push({"id": id, "name": name});
                   }
               }
           });
       }

        /*维度 度量 **/
        function inputInit(){
            $(".textbox-input").textbox({
                icons: [{
                    iconCls:'icon-clear',
                    handler: function(e){
                        $(e.data.target).textbox('setValue', '');//清楚input框
                    }
                }]
            });
        }

        function tabInit(){
            $('#tt').tabs({
                border:false,
                tools:'#tab-tools',
                content:"content:'Tab Body',",
                onSelect:function(title, index){
                    if(title == '+'){
                        $('#tt').tabs('add',{
                            title:'New Tab',
                            content:'Tab Body',
                            index : 0,
                            closable:true,
                            tools:[{
                                iconCls:'icon-mini-refresh',
                                handler:function(){
                                    alert('refresh');
                                }
                            },
                            {
                                iconCls: 'icon-save',
                                handler: function () {
                                    alert('save')
                                }
                            }
                            ]
                        });
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