/**
 * Created by sq_xu on 2015/4/20.
 */
var util = require('util');

function Person(){
    this.name = 'byvoid';

    this.toString = function(){
        return this.name;
    };
}

/*
* 特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对象定义了 toString 方法也不会调用
* */
var obj = new Person();

console.log(util.inspect(obj));

console.log(util.inspect(obj, true));

console.log(util.isDate(Date()));

console.log(util.format('%s:%s', "hello", "fish"));