define(function(require, exports, module) {
    console.log('require module: mod1');

   /* var mod1 = require('./mod1');
    mod1.hello();
    var mod2 = require('./mod2');
    mod2.hello();
*/
    return {
        hello: function() {
            console.log('hello mod1');
        }
    };
});