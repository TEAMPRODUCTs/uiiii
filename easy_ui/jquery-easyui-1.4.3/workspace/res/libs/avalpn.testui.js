/**
 * Created by fiona.xu on 2015/9/15.
 */
define(["avalon","avalonHelper"], function(avalon, avalonHelper) {
    //    必须 在avalon.ui上注册一个函数，它有三个参数，分别为容器元素，data， vmodels
    avalon.ui["testui"] = function(element, data, vmodels) {
        //将它内部作为模板，或者使用文档碎片进行处理，那么你就需要用appendChild方法添加回去
        var innerHTML = element.innerHTML
        //由于innerHTML要依赖许多widget后来添加的新属性，这时如果被扫描肯定报“不存在”错误
        //因此先将它清空
        avalon.clearHTML(element)
        var model = avalon.define(data.testuiId, function(vm) {
            vm.data=[];
            vm.value = 0; // 给input一个个默认的数值
            vm.plus = function(e) { // 只添加了这个plus
                model.value++;
                vm.test(); //调用传进来的参数
            }
            vm.$init = function(){
               // avalon.mix( vm, data.testuiOptions)//优先添加用户的配置，防止它覆盖掉widget的一些方法与属性
                //savalonHelper.access( data.testuiOptions.data,vmodels)()
                avalonHelper.watch( data.testuiOptions.data,vmodels,function(){
                    model.data=avalonHelper.access( data.testuiOptions.data,vmodels)();
                    console.log("data changed");
                })
            },
            vm.clickBind = function(el){
                var fn = vm[el.handler];
                if(fn && typeof fn === 'function'){
                    fn();
                }
            }
        })
        avalon.nextTick(function() {
            //widget的VM已经生成，可以添加回去让它被扫描
            element.innerHTML = innerHTML
            avalon.scan(element, [model].concat(vmodels))
        })
        return model//必须返回新VM
    }
    avalon.ui["testui"].defaults = {
        aaa: "aaa",
        bbb: "bbb",
        ccc: "ccc"
    }
    return avalon//必须返回avalon
})