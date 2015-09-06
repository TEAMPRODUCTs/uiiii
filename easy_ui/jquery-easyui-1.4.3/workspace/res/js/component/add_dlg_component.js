/**
 * Created by fiona.xu on 2015/9/6.
 */
define(["underscore", "easyui","text!../../template/addSubjectDlg.html"], function (_,easyui, addSubjectDlghtml) {
    var dlg = {
        title:"Dlg", //dlg
        container: "",//容器 id
        content:"",//content html id
        width:'500px',
        css:[],//css 设置
        initHandlers:[],
        buttons:[{text: "确定", handler:"okHandler"}, {text: "取消",  handler:"cancleHandler"}],//自定义按钮
        init:function( container, content){
            $("#" + container).html(content);
        },

        showDlg: function(option){
            var self = this;
            avalon.mix(self, option);//优先使用用户的配置
            var bg = "<div class='modal-bg'></div>";//添加遮罩层
            $("body").append(bg);
            $("#" + self.container).show();
            var dlgDiv = $("<div class='alertDiv dlg-div'></div>");
            dlgDiv.css("width",this.width);
            dlgDiv.css("height", this.height);
            var head = $("<div class='dlg_header'>"+ self.title +"</div>");
            var closeI = $("<i class='fa fa-times-circle'>X</i>");

            closeI.appendTo(head);
            var body = "<div class='dlg_body'>" + $("#" + self.content).html() + "</div>";

            closeI.on("click",function(){
                self.closeDlg();
            });

            var foot = $("<div class='alert_foot'></div>");
            var buttons = self.buttons;
            for(var i = 0 ; i < buttons.length; i ++){
                var btn = $("<em>"　+ buttons[i].text + "</em>");
                clickEvent(i);
                foot.append(btn);
            }

            function clickEvent(i){
                btn.unbind().on("click", function () {
                    var fn = buttons[i].handler;
                    if(fn && typeof fn === 'function'){
                        fn();
                    }
                });
            }
            dlgDiv.append(head).append(body).append(foot).appendTo($("#" + self.container));

            var initHandlers = self.initHandlers;
            for(var i = 0 ; i < initHandlers.length; i ++){
                var fn =  initHandlers[i];
                if(fn && typeof fn === 'function'){
                    fn();
                }
            }
        },

        closeDlg: function(){
            var self = this;
            $(".modal-bg").remove();
            $("#" +self.container).hide();
        },



        showAlter: function (mes,headerMes,isconfirm,fn,cancel_fn){
            var alertDiv = $("<div class='alertDiv'></div>");
            alertDiv.css("width",this.width);
            alertDiv.css("height", this.height);
            var head = $("<div class='alert_header'></div>");
            var closeI = $("<i class='fa fa-times-circle'>X</i>");
            closeI.on("click",function(){
                hideAlert();
            });
            closeI.appendTo(head);
            var body = "<div class='alert_body'>" + $("#" + mes).html() + "</div>";
            var bg = "<div class='modal-bg'></div>"
            $("body").append(bg);
            if(isconfirm){
                var foot = $("<div class='alert_foot'></div>");
                var sure = $("<em>确定</em>");
                var cancel = $("<em>取消</em>");
                sure.on("click",function(){
                    hideAlert();
                    if(fn && typeof fn === 'function'){
                        fn();
                    }
                });
                cancel.on("click",function(){
                    hideAlert();
                    if(cancel_fn && typeof cancel_fn === 'function'){
                        cancel_fn();
                    }

                });
                foot.append(sure).append(cancel);
                alertDiv.append(head).append(body).append(foot).appendTo($("body"));
            }else{
                alertDiv.append(head).append(body).appendTo($("body"));
            }

            $('#from_date').datebox({
                required:true
            });

            $('#to_date').datebox({
                required:true
            });

            function hideAlert(){
                $(".modal-bg").remove();
                var allAlertDiv = $(".alertDiv");
                allAlertDiv.remove();
            }
        }
    };

    return dlg;
});