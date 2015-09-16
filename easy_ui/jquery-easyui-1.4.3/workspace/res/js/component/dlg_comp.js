/**
 * Created by fiona.xu on 2015/9/16.
 */
define(["text!../../template/addSubjectDlg.html","avalpn.testui","avalonHelper"], function ( addSubjectDlghtml,ui, avalonHelper) {
    var close = function(){
        $("#" + dlg.opts.container).hide();
    }
    var dlg ={
        opts:{
            title:"hello",
            container: "dlg_container",//容器 id
            include_tpl:"date_filter114", //
            close:close,
            okBtnClick:function(){console.log("ok");},
            cacenlBtnClick:function(){console.log("cancel");},
            footerBtns:[{"label":"确定", "handler":"okBtnClick"},{"label":"取消", "handler":"cacenlBtnClick"}]
        },
        init:function(opts){
            avalon.mix(this.opts, opts)//优先添加用户的配置，防止它覆盖掉widget的一些方法与属性
            $("#" + this.opts.container).show();
            avalon.define({
                $id: "test13",
                opts:this.opts
            })

            avalon.nextTick(function() {
                //widget的VM已经生成，可以添加回去让它被扫描
                avalon.scan(); //初始化数据
            })


        }
    };


    return dlg;
});
