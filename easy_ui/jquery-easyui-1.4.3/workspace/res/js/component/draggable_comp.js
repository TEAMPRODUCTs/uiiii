/**
 * Created by fiona.xu on 2015/9/8.
 */
define([], function () {
    var draggable = {
        drag: function(ev){
            ev.dataTransfer.effectAllowed = "move";
            var elem = ev.target
            ev.dataTransfer.setData("typede",$(elem).data("typede"));//维度度量 大类分
            ev.dataTransfer.setData("type", $(elem).parent(".input-content").data("type")); //行列分类
            ev.dataTransfer.setData("id",$(elem).data("id"));
            ev.dataTransfer.setData("index",$(elem).data("index"));
            ev.dataTransfer.setData("name",ev.target.innerHTML);
            ev.dataTransfer.setData("isMagnanmity",ev.target.innerHTML);
        },
        drop : function (ev, vm) {
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
    }

    return draggable;
});