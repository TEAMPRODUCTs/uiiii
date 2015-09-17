/**
 * Created by fiona.xu on 2015/9/8.
 */
define(["../common/constant"], function (constant) {
    var tab = {
        elemid:"mytab",
        content:"tab_content",
        idPrefix:"tab_pane_",
        addTab: function(){
            var timestamp=new Date().getTime();//获取当前时间戳 生成id
            var id = this.idPrefix + timestamp;
            return id;
        },
        deleteTab: function(index, vm){
            var data_all = vm.data_all;
            var id_active = null;
            var deleteId = data_all.tabs[index ].tabid;
            if(deleteId == data_all.current_tabid){//若删除的是当前tab， 则
                if(index < data_all.tabs.length -1){
                    id_active = data_all.tabs[index + 1].tabid;
                }else if(index > 0){
                    id_active = data_all.tabs[index - 1].tabid;
                }
                if(!id_active){
                    vm.data = constant.getInitial_data();
                }else{
                    vm.setActive(id_active);
                }
            }
            vm.data_all.tabs.removeAt(index);
        },

        setActiveTab:function(id ,e){
            var self = this;
            $("#" + self.elemid).find(".active").removeClass("active");
            $("#" + self.content).find(".active").removeClass("active");
            $("#" + id).addClass("active");
            $(e).parent().addClass("active");
        }

    }
    return tab;
});
