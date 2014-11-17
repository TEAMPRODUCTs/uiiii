﻿======10/14/2015============
js面向对象编程 --- JSObject_Share
js设计模式  ====JS Design Pattern

======11/5/2014 tricks============
今天项目里冒泡出现一个很奇葩的问题。 
点击子节点， 先触发父节点的事件。
调整事件注册顺序就好啦。 不知道是因为backbone低版本的bug还是 项目这边又封了一层。
自己写了个backbone_eventBind_Trigger.html页面 一切正常。。 囧。。。
======11/5/2014============

======11/6/2014 tricks============
继续跟进事件执行顺序跟事件注册顺序有关相关问题
发现这边用了FastClick.js 来提升手机端用户体验， 原生click一般浏览器会有300ms的延迟来
确定是单击还是双击。 
fastclick优化了这个 具体看 
fastclick_envetBind_Trigger.html
eventBind_Trigger.html
backbone_eventBind_Trigger.html
======11/6/2014============

======11/7/2014============
跨站点脚本
跨站点请求伪造
失效的访问控制
SQL 注入
文件包含
操作系统命令注入
脚本语言注入
任意文件创建
======11/7/2014============

======11/10/2014============
渐进增强：针对更现代的浏览器做相应的增强，并且不影响旧浏览器的正常运行。
优雅降级：正确地体现HTMl标签的语义，符合“浏览器的预期”。 让网页在各种情况下--包括降级（javascript被
禁用，css传输失败等等）的情形下都可以运作良好。 

减少页面加载时间的方法：1）减少http重复请求；2）js放在文件尾 3）css放在文件头 4）*****ajax缓存机制调用 带参数请求
5）css js压缩 6）*****服务器开启gzip压缩（会增加服务器负担）7）减少dom元素的数量 8）******多域名负载网页内的多个文件和图片

EditorConfig 代码编写规范标准插件： 1）安装插件 2）将.editorconfig 放入相应目录  （读取规则从外到内。 内部会覆盖外部）
*********************************
root = true

[*]
charset = utf-8

[*.java]
indent_style = space
indent_size = 4
trim_trailing_whitespace = true
*********************************
======11/10/2014============

======11/11/2014 ============
一直不知道怎么把本地分支通过命令初始化生成到远程主机（以前一直是在github上直接建分支）
 今天终于搞清楚啦。。 

$ git remote rename <原主机名> <新主机名>
$ git remote add tools git@github.com:shuiqin/tools.git


浏览器并发请求数：同一时间针对同一域名的请求有一定数量限制，超过限制数目的请求会被阻止。（浏览器的并发数目一般限制在10以内）
  所以利用多个域名来提供网站资源会更有效。

======11/11/2014============


======11/12/2014 ============
HTML语言的词法解析： （把字符流解析成正确的dom结构）
词法分析：把字符流初步解析成可理解的“词”， token
语法分析：把开始结束标签配对，属性赋值好、父子关系连接好、构成dom树
======11/12/2014 ============

======11/13/2014 ============
被蘖心的电面后 填坑：
***封装****
封装： 隐藏对象的属性和实现细节，仅对外公开接口，控制在程序中属性的读和修改的访问级别。
封装的目的：增加安全性和简化编程，使用者不必了解具体的实现细节，只是通过外部接口，一特定的访问权限来使用类的成员。
封装的原则： 1）把尽可能多的东西藏起来，对外提供简洁的接口， 2）把所有属性藏起来。


****跨域****
Access-Control-Allow-Origin 
只有当目标页面的response中包含了Access-Control-Allow-Origin 这个header，并且它的值
里有我们自己的域名是，浏览器才允许我们拿到页面的数据进行下一步处理
Access-Control-Allow-Origin: http://run.jsbin.io

如果它的值设为 * ，则表示谁都可以用：
Access-Control-Allow-Origin: *


****Doctype***** http://www.ibm.com/developerworks/cn/web/1310_shatao_quirks/index.html
浏览器 标准模式 (document.compatMode  "CSS1Compat")，怪异模式 (document.compatMode  "BackCompat")
若文档正确定义了Doctype浏览器会进入标准模式，否则会进入怪异模式或混杂模式（Quirks mode）

浏览器开发初期W3C倡导的网页标准并不流行，因此浏览器有独特的对网页标签或属性的解析模式，
随着日后网页标准的流行，浏览器增加了对新标准的支持（Standards Mode），但又没有放弃对原有模式的兼容（Quirks mode），这就是浏览器多种表现模式的来源。
可以避免辛苦写出的标准代码被怪异残害

浏览器决定文档模式
浏览器在渲染页面之前会检查两个内容，一个是页面是否有 doctype 信息，另外一个是页面是否有 x-ua-compatible 信息。

Doctype 检测
对于一个 HTML 页面，<!DOCTYP >声明位于其中最前面的位置，处于<html>标签之前，这个<!DOCTYP >可以告知浏览器使用哪种 HTML 规范，针对每种规范浏览器同样也会选择对应的文档模式。平时最常见的三种 doctype 信息对应的文档模式如下。
当 doctype 信息如下时，表明该页面是遵守了 HTML5 规范的，浏览器会选择 Standards Mode，这种 doctype 是最推荐的一种，我们平时设计页面都应该加上这一个 doctype。
<!DOCTYPE html>
当 doctype 如下时，浏览器同样会选择 Standards Mode，虽然和第一种 doctype 有一些区别，但是几乎可以认为是一样的。
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
当 doctype 如下时，浏览器会选择 Almost Standards Mode，需要注意的是如果今后需要把这个页面改为 HTML5 规范，那么上文讨论的<table>中的分割图片问题可能会错乱。
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
当 doctype 缺失的时候，浏览器会选择 Quirks Mode，这是非常不推荐的方式，我们应该尽量避免 Quirks Mode，这对一个 web 应用是非常不利的地方。

x-ua-compatible 信息
除了上一节提到的 doctype 检测，HTML 页面的开发者可以在页面的<head>标签中加入 x-ua-compatible 信息来影响文档类型的判定，具体如下表所示。
表 3 x-ua-compatible 影响文档类型
x-ua-compatible	doctype	Document Mode
<meta http-equiv="X-UA-Compatible" content="IE=5" >	无影响	IE5 quirks
<meta http-equiv="X-UA-Compatible" content="IE=7/8/9/10" >	无影响	IE7/8/9/10 Standards
<meta http-equiv="X-UA-Compatible" content="IE=Edge" >	无影响	IE 最新版本的 Standards
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7/8/9" >	<!DOCTYPE html>	IE7/8/9 Standards
不存在	IE5 quirks
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10" >	<!DOCTYPE html>	IE10 Standards
不存在	IE10 quirks
=====11/13/2014 ============


=====11/14/2014 QuirksMode_StandardsMode============
QuirksMode_StandardsMode/baseline_bottomnline.html

该页面实现 1)块级元素文字居中（height, line-height, vertical-align） 
2） inline元素和table-cell元素默认对齐方式 （standard mode: baseline）(quirks mode: bottomline)


************link和@import区别********
区别1：link是xhtml标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS
区别2: link引用css时，在页面载入时同时加载； @import需要页面网页加载入以后加载（会闪现）
区别3：link是XHTML标签，无兼容问题； @import是在css2.1提出，低版本的浏览器不支持
区别4: link支持使用javascript控制dom去改变样式 ； @import不支持

@import 'style.css' //Windows IE4/ NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别
@import "style.css" //Windows IE4/ NS4, Macintosh IE4/NS4不识别
@import url(style.css) //Windows NS4, Macintosh NS4不识别
@import url('style.css') //Windows NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别
@import url("style.css") //Windows NS4, Macintosh NS4不识别
=====11/14/2014 ============