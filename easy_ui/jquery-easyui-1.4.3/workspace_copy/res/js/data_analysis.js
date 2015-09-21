require(["../js/data_analysis_controller_simple"/*, "domReady!","jquery.droppable""easyui"*/],function( analysis_controller){
/*require(["libs/easyui","js/data_analysis_controller_simple","domReady!"/!*,"jquery.droppable""easyui"*!/],function(easyui, analysis_controller){*/
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

        console.log('nnih' +( $(".input-div").width()-158));
        $(".input-content").width($(".input-div").width()-188);
        $(".selected-container-div").width($(".input-div").width()-168);
    }

});
