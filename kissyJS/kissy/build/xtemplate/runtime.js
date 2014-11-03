modulex.add("xtemplate/runtime",[],function(n,t,r){var e,i,a,o,s;e=function(n){function t(){var n="";for(var t in e)n+=t+"|";return n=n.slice(0,-1),a=new RegExp(n,"g")}var r,e={"&":"&amp;",">":"&gt;","<":"&lt;","`":"&#x60;","/":"&#x2F;",'"':"&quot;","'":"&#x27;"},i=/[&<>"'`]/,a=t(),o=/\\?\{([^{}]+)\}/g,s="undefined"!=typeof global?global:window,f=Object.prototype.toString;return n=r={isArray:Array.isArray||function(n){return"[object Array]"===f.call(n)},keys:Object.keys||function(n){var t,r=[];for(t in n)n.hasOwnProperty(t)&&r.push(t);return r},each:function(n,t,e){if(n){var i,a,o,s=0,f=n&&n.length,u=void 0===f||"[object Function]"===Object.prototype.toString.call(n);if(e=e||null,u)for(o=r.keys(n);s<o.length&&(i=o[s],t.call(e,n[i],i,n)!==!1);s++);else for(a=n[0];f>s&&t.call(e,a,s,n)!==!1;a=n[++s]);}return n},mix:function(n,t){for(var r in t)n[r]=t[r];return n},globalEval:function(n){s.execScript?s.execScript(n):!function(n){s.eval.call(s,n)}(n)},substitute:function(n,t,r){return"string"==typeof n&&t?n.replace(r||o,function(n,r){return"\\"===n.charAt(0)?n.slice(1):void 0===t[r]?"":t[r]}):n},escapeHtml:function(n){return n=""+n,i.test(n)?(n+"").replace(a,function(n){return e[n]}):n},merge:function(){for(var n=0,t=arguments.length,e={};t>n;n++){var i=arguments[n];i&&r.mix(e,i)}return e}}}(),i=function(n){function t(n,t,r){this.data=void 0!==n?n:{},r?(this.parent=r,this.root=r.root):(this.parent=void 0,this.root=this),this.affix=t||{},this.ready=!1}return t.prototype={isScope:1,constructor:t,setParent:function(n){this.parent=n,this.root=n.root},set:function(n,t){this.affix[n]=t},setData:function(n){this.data=n},getData:function(){return this.data},mix:function(n){var t=this.affix;for(var r in n)t[r]=n[r]},get:function(n){var t,r=this.data,e=this.affix;return null!=r&&(t=r[n]),void 0!==t?t:e[n]},resolveInternalOuter:function(n){var t,r=n[0],e=this,i=e;if("this"===r)t=e.data;else if("root"===r)i=i.root,t=i.data;else{if(!r)return[i.data];do t=i.get(r);while(void 0===t&&(i=i.parent))}return[void 0,t]},resolveInternal:function(n){var t=this.resolveInternalOuter(n);if(1===t.length)return t[0];var r,e=n.length,i=t[1];for(r=1;e>r;r++)i=i[n[r]];return i},resolveLooseInternal:function(n){var t=this.resolveInternalOuter(n);if(1===t.length)return t[0];var r,e=n.length,i=t[1];for(r=1;null!=i&&e>r;r++)i=i[n[r]];return i},resolveUp:function(n){return this.parent&&this.parent.resolveInternal(n)},resolveLooseUp:function(n){return this.parent&&this.parent.resolveLooseInternal(n)},resolveOuter:function(n,t){var r,e=this,i=e;if(!t&&1===n.length){if(r=e.get(n[0]),void 0!==r)return[r];t=1}if(t)for(;i&&t--;)i=i.parent;return i?[void 0,i]:[void 0]},resolveLoose:function(n,t){var r=this.resolveOuter(n,t);return 1===r.length?r[0]:r[1].resolveLooseInternal(n)},resolve:function(n,t){var r=this.resolveOuter(n,t);return 1===r.length?r[0]:r[1].resolveInternal(n)}},n=t}(),a=function(n){function t(n,t,r){this.list=n,this.init(),this.next=t,this.ready=!1,this.tpl=r}function r(n,r){var e=this;e.config=r,e.head=new t(e,void 0),e.callback=n,this.init()}var i=e;return t.prototype={constructor:t,isBuffer:1,init:function(){this.data=""},append:function(n){return this.data+=n,this},write:function(n){if(null!=n){if(n.isBuffer)return n;this.data+=n}return this},writeEscaped:function(n){if(null!=n){if(n.isBuffer)return n;this.data+=i.escapeHtml(n)}return this},insert:function(){var n=this,r=n.list,e=n.tpl,i=new t(r,n.next,e),a=new t(r,i,e);return n.next=a,n.ready=!0,a},async:function(n){var t=this.insert(),r=t.next;return n(t),r},error:function(n){var t=this.list.callback;if(t){var r=this.tpl;if(r){n instanceof Error||(n=new Error(n));var e=r.name,i=r.pos.line,a="At "+e+":"+i+": ";n.stack=a+n.stack,n.message=a+n.message,n.xtpl={pos:{line:i},name:e}}this.list.callback=null,t(n,void 0)}},end:function(){var n=this;return n.list.callback&&(n.ready=!0,n.list.flush()),n}},r.prototype={constructor:r,init:function(){this.data=""},append:function(n){this.data+=n},end:function(){this.callback(null,this.data),this.callback=null},flush:function(){for(var n=this,t=n.head;t;){if(!t.ready)return n.head=t,void 0;this.data+=t.data,t=t.next}n.end()}},r.Buffer=t,n=r}(),o=function(n){var t=i,r=e,a={range:function(n,t){var r=t.params,e=r[0],i=r[1],a=r[2];a?(e>i&&a>0||i>e&&0>a)&&(a=-a):a=e>i?-1:1;for(var o=[],s=e;i>e?i>s:s>i;s+=a)o.push(s);return o},foreach:function(n,r,e){var i,a,o,s,f=r.params,u=f[0],l=f[2]||"xindex",c=f[1];if(u)for(i=u.length,s=0;i>s;s++)a=new t(u[s],{xcount:i,xindex:s},n),o=a.affix,"xindex"!==l&&(o[l]=s,o.xindex=void 0),c&&(o[c]=u[s]),e=r.fn(a,e);return e},forin:function(n,r,e){var i,a,o,s=r.params,f=s[0],u=s[2]||"xindex",l=s[1];if(f)for(o in f)i=new t(f[o],{xindex:o},n),a=i.affix,"xindex"!==u&&(a[u]=o,a.xindex=void 0),l&&(a[l]=f[o]),e=r.fn(i,e);return e},each:function(n,t,e){var i=t.params,o=i[0];return o?r.isArray(o)?a.foreach(n,t,e):a.forin(n,t,e):e},"with":function(n,r,e){var i=r.params,a=i[0];if(a){var o=new t(a,void 0,n);e=r.fn(o,e)}return e},"if":function(n,t,r){var e=t.params,i=e[0];if(i){var a=t.fn;a&&(r=a(n,r))}else{var o=!1,s=t.elseIfs,f=t.inverse;if(s)for(var u=0,l=s.length;l>u;u++){var c=s[u];if(o=c.test(n)){r=c.fn(n,r);break}}!o&&f&&(r=f(n,r))}return r},set:function(n,t,r){return n.mix(t.hash),r},include:1,parse:1,extend:1,block:function(n,t,r){var e,i=this,a=i.runtime,o=t.params,s=o[0];2===o.length&&(e=o[0],s=o[1]);var f,u=a.blocks=a.blocks||{},l=u[s],c={fn:t.fn,type:e};if(l){if(l.type)if("append"===l.type)c.next=l,u[s]=c;else if("prepend"===l.type){var h;for(f=l;f&&"prepend"===f.type;)h=f,f=f.next;c.next=f,h.next=c}}else u[s]=c;if(!a.extendTplName)for(f=u[s];f;)f.fn&&(r=f.fn.call(i,n,r)),f=f.next;return r},macro:function(n,r,e){var i=r.hash,a=r.params,o=a[0],s=a.slice(1),f=this,u=f.runtime,l=u.macros=u.macros||{};if(r.fn)l[o]={paramNames:s,hash:i,fn:r.fn};else{var c,h=l[o],v=h.hash||{};if(h&&(c=h.paramNames)){for(var d=0,p=c.length;p>d;d++){var m=c[d];v[m]=s[d]}if(i)for(var g in i)v[g]=i[g];var x=new t(v);e=h.fn.call(f,x,e)}else{var y="can not find macro: "+name;e.error(y)}}return e}};return a["debugger"]=function(){},n=a}(),s=function(n){function t(n,t,r,e,i,a,o){this.name=n,this.originalName=a||n,this.runtime=t,this.root=r,this.pos={line:1},this.scope=e,this.buffer=i,this.fn=o}function r(n,t,r){var e=r[0],i=n&&n[e]||t&&t[e]||g[e];if(1===r.length)return i;if(i)for(var a=r.length,o=1;a>o;o++)if(i=i[r[o]],!i)return!1;return i}function s(n,t){var r=n.split("/"),e=t.split("/");r.pop();for(var i=0,a=e.length;a>i;i++){var o=e[i];"."===o||(".."===o?r.pop():r.push(o))}return r.join("/")}function f(n,t,e,i,a,o){var s,f,u;return o||(u=r(n.runtime.commands,n.root.config.commands,a)),u?u.call(n,t,e,i):u!==!1&&(s=t.resolve(a.slice(0,-1),o),f=s[a[a.length-1]])?f.apply(s,e.params):(i.error("Command Not Found: "+a.join(".")),i)}function u(n,t){var r=this;r.fn=n,r.config=p.merge(u.globalConfig,t),this.subNameResolveCache={}}function l(n,t,r){if("."!==t.charAt(0))return t;var e=r+"_ks_"+t,i=n.subNameResolveCache,a=i[e];return a?a:t=i[e]=s(r,t)}function c(n,t,r,e,i,a){var o=l(n,a,i.name),s=e.insert(),f=s.next;return v(n,o,i.runtime,t,s,a,r),f}function h(n,r,e,i,a){var o=e.insert(),s=o.next,f=new t(a.TPL_NAME,i.runtime,n,r,o,void 0,a);return o.tpl=f,d(f),s}function v(n,r,e,i,a,o,s){var f=new t(r,e,n,i,a,o);a.tpl=f,n.config.loader.load(f,function(n,t){"function"==typeof t?(f.fn=t,d(f)):n?a.error(n):t&&(s?a.writeEscaped(t):a.data+=t,a.end())})}function d(n){var t=n.fn();if(t){var r=n.runtime,e=r.extendTplName,i=r.extendTplFn;return i?(r.extendTplName=null,r.extendTplFn=null,t=h(n.root,n.scope,t,n,i)):e&&(r.extendTplName=null,t=c(n.root,n.scope,0,t,n,e)),t.end()}}var p=e,m=o,g={},x=i,y=a,b={callFn:f,callCommand:function(n,t,r,e,i){return f(n,t,r,e,i)}};return p.mix(u,{config:function(n,t){var r=this.globalConfig=this.globalConfig||{};return arguments.length?(void 0!==t?r[n]=t:p.mix(r,n),void 0):r},version:"3.3.0",nativeCommands:m,utils:b,util:p,addCommand:function(n,t){g[n]=t},removeCommand:function(n){delete g[n]}}),u.prototype={constructor:u,Scope:x,nativeCommands:m,utils:b,removeCommand:function(n){var t=this.config;t.commands&&delete t.commands[n]},addCommand:function(n,t){var r=this.config;r.commands=r.commands||{},r.commands[n]=t},include:function(n,t,r,e){var i,a=t.params;i=n;var o=t.hash,s=t&&t.escape;return o&&(i=new x(o,void 0,n)),r=c(this,i,s,r,e,a[0])},includeModule:function(n,t,r,e){var i,a=t.params;i=n;var o=t.hash;return o&&(i=new x(o,void 0,n)),r=h(this,i,r,e,a[0])},render:function(n,r,e){var i="",a=this,o=a.fn,s=a.config;"function"==typeof r&&(e=r,r=null),r=r||{},e=e||function(n,t){if(n)throw n instanceof Error||(n=new Error(n)),n;i=t};var f=a.config.name;!f&&o&&o.TPL_NAME&&(f=o.TPL_NAME);var l=new x(n),c=new u.LinkedBuffer(e,s).head,h=new t(f,{commands:r.commands},a,l,c,f,o);return c.tpl=h,o?(d(h),i):(s.loader.load(h,function(n,t){t?(h.fn=a.fn=t,d(h)):n&&c.error(n)}),i)}},u.Scope=x,u.LinkedBuffer=y,n=u}(),r.exports=s});