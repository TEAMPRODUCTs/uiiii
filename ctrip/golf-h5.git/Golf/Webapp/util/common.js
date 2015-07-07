/**
 * Created by sq_xu on 2015/7/6.
 */
define('cBase',[], function(){
    var n = function (){};
    n.Class = (function(){
        /**
         * Inherits function
         */
        var inherits = function(ctor, superCtor) {
            // 显式的指定父类
            ctor.super_ = superCtor;

            // ECMAScript 5  原型式继承并解除引用
            if (Object.create) {
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
            } else {
                // 无Object.create方法的平稳退化
                function F() {};
                F.prototype = superCtor.prototype;
                ctor.prototype = new F();
                ctor.prototype.constructor = ctor;
            }
        };

        /**
         * Class function.
         */
        return function() {
            // 最后一个参数是新类方法、属性和构造函数声明
            var subClazz = arguments[arguments.length - 1] || {};
            // initialize是构造函数，否构造函数就是一个空函数
            var fn = subClazz.initialize == null ? function() {} : subClazz.initialize;
            // 继承除最一个参数以的类，多继承，也可以用作扩展方法
            for (var index = 0; index < arguments.length - 1; index++) {
                inherits(fn, arguments[index]);
            }
            // 实现新类的方法
            for (var prop in subClazz) {
                if (subClazz.hasOwnProperty(prop)){
                    if (prop == "initialize") {
                        continue;
                    }

                    fn.prototype[prop] = subClazz[prop];
                }
            }

            return fn;
        }
    })();

    return n;
})
