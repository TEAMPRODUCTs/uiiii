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