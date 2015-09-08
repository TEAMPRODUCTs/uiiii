require(["easyui","../js/data_analysis_controller", "../js/analysis_tab","ready!"/*,"jquery.droppable""easyui"*/],function(easyui, analysis_controller){
    resizeLayout();
    avalon.ready(function() {
        analysis_controller.init();
    });


    //监控window高度变化 设置左栏高度
    $(window).resize(function() {
        resizeLayout();
    });

    function resizeLayout(){
        $('.leftbar').css("height", window.innerHeight);
        $(".input-content").width($(".input-div").width()-108);
    }

});
