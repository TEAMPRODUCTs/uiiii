======10/14/2015============
js面向对象编程 --- JSObject_Share
js设计模式  ====JS Design Pattern

======11/5/2014============
今天项目里冒泡出现一个很奇葩的问题。 
点击子节点， 先触发父节点的事件。
调整事件注册顺序就好啦。 不知道是因为backbone低版本的bug还是 项目这边又封了一层。
自己写了个backbone_eventBind_Trigger.html页面 一切正常。。 囧。。。
======11/5/2014============

======11/6/2014============
继续跟进事件执行顺序跟事件注册顺序有关相关问题
发现这边用了FastClick.js 来提升手机端用户体验， 原生click一般浏览器会有300ms的延迟来
确定是单击还是双击。 
fastclick优化了这个 具体看 
fastclick_envetBind_Trigger.html
eventBind_Trigger.html
backbone_eventBind_Trigger.html
======11/6/2014============