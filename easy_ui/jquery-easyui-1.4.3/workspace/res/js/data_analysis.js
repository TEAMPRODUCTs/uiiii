require(["jquery","easyui"],function($){
    alert($("#new_metric_sec").length);
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

    //TODO 维度 进度接受栏
    $('.cart').droppable({
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

    //监控window高度变化 设置左栏高度
    $(window).resize(function() {
        console.log(window.innerHeight);
        $('.leftbar').css("height", window.innerHeight);
    });

});
