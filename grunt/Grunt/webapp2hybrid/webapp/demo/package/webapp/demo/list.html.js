define(function(){return ("<html><head><base href=\"../../..\"><script type=\"text/javascript\" src=\"package/lizardlocalroute.js\"></script><title></title><meta charset=\"utf-8\"><meta name=\"description\" content=\"携程全局搜索\"><meta name=\"keywords\" content=\"携程全局搜索\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui\"><link rel=\"apple-touch-startup-image\" href=\"../lizard/res/html5/content/images/640.png\" sizes=\"320x460\"><link rel=\"apple-touch-startup-image\" href=\"../lizard/res/html5/content/images/940.png\" sizes=\"640x920\"><link rel=\"apple-touch-startup-image\" href=\"../lizard/res/html5/content/images/1004.png\" sizes=\"768x1004\"><link rel=\"apple-touch-icon-precomposed\" sizes=\"57x57\" href=\"../lizard/res/html5/content/images/57.png\"><link rel=\"apple-touch-icon-precomposed\" sizes=\"72x72\" href=\"../lizard/res/html5/content/images/72.png\"><link rel=\"apple-touch-icon-precomposed\" sizes=\"114x114\" href=\"../lizard/res/html5/content/images/114.png\"><link rel=\"apple-touch-icon-precomposed\" sizes=\"144x144\" href=\"../lizard/res/html5/content/images/144.png\"><link rel=\"stylesheet\" href=\"../lizard/webresource/styles/h5/common/main.css\"><link rel=\"stylesheet\" href=\"package/webapp/demo/webresource/style/style.css\"><meta name=\"appBaseUrl\" content=\"/webapp/demo/\"><meta name=\"restfullApi\" content=\"localhost\"></head><body><div id=\"headerview\" style=\"height:48px\"><header></header></div><div id=\"main\"><div class=\"main-frame\"><div class=\"main-viewport\"></div><div class=\"main-state\"></div></div></div><div id=\"footer\"></div><script type=\"text/lizard-config\">{url_schema:\"/list\",model:{apis:[],filter:function(){var e=parseInt(Lizard.P(\"cityid\"),10)-1,t=[[{title:\"北京酒店1\"},{title:\"北京酒店2\"}],[{title:\"上海酒店1\"},{title:\"上海酒店2\"}]];return{list:t[e]}},setTDK:function(){return{title:\"title\",description:\"description\",keywords:\"keywords\"}}},view:{header:Lizard.T(\"headTmpl\"),viewport:Lizard.T(\"viewportTmpl\")},controller:\"package/webapp/demo/webresource/controllers/list.js\"}</script><script id=\"headTmpl\" type=\"text/lizard-template\"><div>list</div></script><script id=\"viewportTmpl\" type=\"text/lizard-template\"><h2>list page</h2><ul class=\"list\"><% _.each(list, function(item) { %><li class=\"js-hotel\"><%= item.title %> <% }); %></li></ul><button href=\"http://m.ctrip.com/html5/\" class=\"js-ctrip\">ctrip</button> <button class=\"js-model\">model</button><h3>localStorage, 只有一个值的</h3><div class=\"border\"><button class=\"js-localstore1-set\">set</button> <button class=\"js-localstore1-get\">get</button> <button class=\"js-localstore1-remove\">remove</button></div><h3>localStorage, 值是一个对象</h3><div class=\"border\"><button class=\"js-localstore2-set\">set</button> <button class=\"js-localstore2-setAttr\">setAttr</button> <button class=\"js-localstore2-add\">add</button> <button class=\"js-localstore2-get\">get</button> <button class=\"js-localstore2-getAttr\">getAttr</button></div></script> <input type=\"hidden\" id=\"page_id\"><script>  var __SERVERDATE__ = {server:new Date(Date.parse('2014/9/2 11:27:16'.replace(/-/g,'/'))),local: new Date()}</script><script src=\"../lizard/webresource/code/lizard/2.0/webapporigin/lizard.seed.js\" pdconfig=\"package/webapp/demo/webresource/democonfig.js\"></script><div id=\"log\" style=\"border:1px solid red;height:40px;position:fixed;left:0;right:0;bottom:20px\"></div><script>var log=function(){var n=0;return function(r){var a=$(\"#log\");n++>5?(n=0,a.html(r)):a.append(r)}}();</script></body></html>");});