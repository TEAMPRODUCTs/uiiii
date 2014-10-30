define("mainJs", ["mod1", "mod2"],function(mod1,mod2){
	// var mod1 = require('./mod1');
    mod1.hello();
   // var mod2 = require('./mod2');
   console.log("test");
    mod2.hello();

});