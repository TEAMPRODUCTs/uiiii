define(function(require, exports, module) {//seaJs doesn't suppport "mod2"
    console.log('require module: mod2');

   /* var mod1 = require('./mod1');
    mod1.hello();
    var mod2 = require('./mod2');
    mod2.hello();
*/
    return {
        hello: function() {
            console.log('hello mod2');
        }
    };
});