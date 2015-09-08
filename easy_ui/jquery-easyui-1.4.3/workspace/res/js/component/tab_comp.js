/**
 * Created by fiona.xu on 2015/9/8.
 */
define([], function () {
    var tab = {
        elemid:"mytab",
        content:"tab_content",
        idPrefix:"tab_pane_",
        addTab: function(){
            var timestamp=new Date().getTime();//获取当前时间戳 生成id
            var id = this.idPrefix + timestamp;
            return id;
        },
        deleteTab: function(){

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
