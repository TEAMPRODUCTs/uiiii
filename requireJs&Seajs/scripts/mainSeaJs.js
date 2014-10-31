//CMD依赖就近
define(function(require,exports,module){
	var start = Date.now();
	 var mod1 = require('./mod1');
    mod1.hello();
    var mod2 = require('./mod2_seaJS');
    console.log("test");
    mod2.hello();
    var pinyin = require('../data/pinyin-dict');
    var end = Date.now();
     console.log(end + "after require pinyin" + "用时：" + ((end - start)/1000) + "秒");
});