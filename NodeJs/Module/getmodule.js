var myModule = require('./module');
myModule.setName("Fish");
myModule.sayHello();

/*
require 不会重复加载模块，也就是说无论调用多少次 require，获得的模块都是同一个。
*/

console.log('require 不会重复加载模块，也就是说无论调用多少次 require，获得的模块都是同一个。');
var myModule1 = require('./module');
myModule1.setName("Fish11");
myModule1.sayHello();

myModule.sayHello();
