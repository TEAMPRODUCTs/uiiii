//AMD 依赖前置
define("mainJs", ["mod1", "mod2"],function(mod1,mod2){
	console.log("require module: main");
    mod1.hello();
    console.log("test");
    mod2.hello();
    return{
    	hello: function(){
    		console.log("hello main");
    	}
    }
});