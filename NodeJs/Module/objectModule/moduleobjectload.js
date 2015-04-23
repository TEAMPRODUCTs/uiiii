var Hello = require('./singleobject').Hello;

var helll = new Hello();
helll.setName("jack");
helll.sayHello();


var defaulHell = require('./defaultsingleobject');


var defaulthh = new defaulHell();

defaulthh.setName("ddjj");
defaulthh.sayHello();


var defaulthh1 = new defaulHell();

defaulthh1.setName("ddjj111");
defaulthh1.sayHello();


defaulthh.sayHello();



