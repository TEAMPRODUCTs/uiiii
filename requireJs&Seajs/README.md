======10/14/2015============
1. 文档丰富程度上，requireJS远远好于seaJS，就拿最简单的加载jQuery和jQuery插件这回事，虽然两者的实现方法相差无几，但requireJS就有可以直接拿来用的Demo，seaJS要读文档自己慢慢折腾 https://github.com/seajs/seajs/issues/286

2. 从实用性来讲，requireJS让我最难受的地方是没有把CSS作为模块的一部分来看待，只给了一个开放式的解决方法。 http://requirejs.org/docs/faq-advanced.html#css

从原理上来讲我认同这样的说法，但事实上很多项目中CSS是必不可少的，而且也是存在依赖关系的。个人认为JS模块加载器同样应该兼顾CSS的加载才能算是一个好用的项目。这一点上SeaJs做的相对好一些，不过SeaJs如何处理复杂的CSS依赖关系没有做过调查。

3. 我最终选择了requireJS，然后在尝试用Assetic更好的自动化部署，就我而言功能相差不多时，丰富的文档至关重要。