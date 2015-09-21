/**
 * Created by fiona.xu on 2015/9/15.
 */
define([], function() {
/*define(["libs/avalon","libs/avalonHelper"], function(avalon,avalonHelper) {*/
    //    必须 在avalon.ui上注册一个函数，它有三个参数，分别为容器元素，data， vmodels
    avalon.ui["ui"] = function(element, data, vmodels) {
        //将它内部作为模板，或者使用文档碎片进行处理，那么你就需要用appendChild方法添加回去
        var innerHTML = element.innerHTML
        //由于innerHTML要依赖许多widget后来添加的新属性，这时如果被扫描肯定报“不存在”错误
        //因此先将它清空
        avalon.clearHTML(element)
        var model = avalon.define(data.uiId, function(vm) {
           // avalon.mix(vm, data.uiOptions)//优先添加用户的配置，防止它覆盖掉widget的一些方法与属性
            avalon.mix(vm, data.uiOptions)//优先添加用户的配置，防止它覆盖掉widget的一些方法与属性
            vm.$init= function(){/*alert("test")*/};
        });
        avalon.nextTick(function() {
            //widget的VM已经生成，可以添加回去让它被扫描
            element.innerHTML = innerHTML
            avalon.scan(element, [model].concat(vmodels))
        })
        return model//必须返回新VM
    }
    return avalon//必须返回avalon
})