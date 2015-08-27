define([], function () {
        var vm = avalon.define({
            $id:   "test",
            test1: "点击测试按钮没反应 绑定失败",
            test:[2,3,4,5],
            data: window.Mockdata,
            one:function(){
                vm.test1 = "绑定成功";
            }
        });
        vm.one = function() {
            vm.test1 = "绑定成功111";
        };
        vm.init = function(){
            tabInit()
           // inputInit();
            vm.one();
        }

       function droppableInit(){
           //TODO 维度 进度接受栏
           $('.textbox-input').droppable({
               onDragEnter:function(e,source){
                   $(source).draggable('options').cursor='auto';
               },
               onDragLeave:function(e,source){
                   $(source).draggable('options').cursor='not-allowed';
               },
               onDrop:function(e,source){
                   var name = $(source).find('p:eq(0)').html();
                   var price = $(source).find('p:eq(1)').html();
                   addProduct(name, parseFloat(price.split('$')[1]));
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
                    }
                }
            });
        }

        avalon.scan();
        return vm;
});