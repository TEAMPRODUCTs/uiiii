2015/7/1
单页显示ok

========TODO=====
页面跳转 ，回退  --- 
grunt打包  ---- 

imageslider ---


==========继承类封装================
var Cat = cBase.Class({
                initialize: function(name) {
                    this.name = name;
                },
                eat: function() {
                    console.log(this.name + " is eating fish.");
                }
            });

            var BlackCat = cBase.Class(Cat, {
                initialize: function(name, age) {
                    // call the constructor of super class.
                    BlackCat.super_.call(this, name);
                    this.age = age;

                },
                eat: function() {
                    console.log(this.name + "(" + this.age + ") is eating dog.");
                }
            });

            var c = new Cat('Mao');
            c.eat();

            var bc = new BlackCat('Hei Mao', 5);
            bc.eat();

            console.log(c instanceof Cat);
            console.log(bc instanceof Cat);
            console.log(bc instanceof BlackCat);
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 new T.CLASS --- (做什么)
 Store完善