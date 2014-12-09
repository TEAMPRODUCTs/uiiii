var colors=require('colors');
var vm=require('vm');
// var fs=require('fs');
var fs=require('graceful-fs');

var http=require('http');
var url=require('url');
var path=require('path');
var mkdirp=require('mkdirp');
var jsdom=require('jsdom');
var CSSOM=require('CSSOM');
var util=require('util');
var esprima=require('esprima');



/*
创建虚拟文件夹
创建iis express配置项
启动iis express 
关闭iis express 
*/
//iis express start


function iisExpress(opts){
	this.init(opts)
}
iisExpress.prototype = {
	init:function(opts){
		this.channel = opts.channel||"ticket";
		this.applicationRoot = path.join(__dirname,"busbuchannels");
		this.busbuPhysicalPath = opts.busbuPhysicalPath;//||"D:\\mobile1\\TicketSEO";
		this.port = opts.port||7776;
		this.configTemplate= path.join(__dirname,"applicationhost.config");
		this.cmd = opts.cmd||path.join("IISExpress","iisexpress.exe");
		this.callback = opts.callback||function(){};
		this.mkdirChannel();
	},
	uninit:function(){
		
	},
	mkdirChannel:function(){
		var self = this;
		var applicationRoot = this.applicationRoot;
		var channel = this.channel;
		var fileDir = path.join(applicationRoot,"webapp",channel);
		var isExist = fs.existsSync(fileDir);
		if(isExist){
			self.mkdirConfig(fileDir);
		}else{
			mkdirp(fileDir,function(err){
				if (err){
					throw(new Error('Create path error: '+fileDir));
				}else{
					self.mkdirConfig(fileDir);
				}
			})
		}
	},
	mkdirConfig:function(fileDir){
		var self =this;
		var channel = this.channel;
		var applicationRoot = this.applicationRoot;
		var busbuPhysicalPath = this.busbuPhysicalPath;
		var filePath = path.join(fileDir,"applicationhost.config");
		var port = this.port;
		var configTemplate = fs.readFileSync(this.configTemplate,'utf-8');
	
		var applicationStr = [
			'<site name="TicketSEO" id="5">',
			'	<application path="/" applicationPool="Clr4IntegratedAppPool">',
			'		<virtualDirectory path="/" physicalPath="'+applicationRoot+'" userName="" />',
			'	</application>',
			'	<application path="/webapp/ticket" applicationPool="Clr4IntegratedAppPool">',
			'		<virtualDirectory path="/" physicalPath="'+busbuPhysicalPath+'" />',
			'	</application>',
			'	<bindings>',
			'		<binding protocol="http" bindingInformation=":'+port+':localhost" />',
			'	</bindings>',
			'</site>'].join("\n");
		var data = configTemplate.replace("{{@application@}}",applicationStr);
		fs.writeFile(filePath, data, 'utf-8', function(err){ 
			if(err){ 
				throw(new Error('写入文件失败: '+filePath));
			}else{ 
				console.log('写入文件成功：'+filePath); 
				self.start(filePath);
			} 
		})
	},
	start:function(config){
		var config = config;
		var cmd =  this.cmd;
		var args = ["/site:TicketSEO","/config:"+config];
		var cp = require('child_process');
		var ls = cp.spawn(cmd,args, { 
			cwd: __dirname,
			env: null
		});
		ls.stdout.setEncoding('utf8');
		ls.stdout.on('data', function (data) {
			console.log('stdout: ' + data);
		});

		ls.stderr.on('data', function (data) {
			console.log('stderr: ' + data);
		});
		ls.on('exit', function (code) {
			console.log('child process exited with code ' + code);
		});
		this.ls = ls;
		this.callback();
	},
	end:function(){
		this.ls.kill();
	}
}


//iis express end


console.log((new Date))
function htmlNode(parser,parent,tagName,plainText,plainComment){
	this.parser=parser;
	if (tagName){
		this._tagName=tagName;
		this._attrs={};
		this._children=[];
	}
	if (plainText){
		this._plainText=plainText;
	}
	if (plainComment){
		this._plainComment=plainComment;
	}
	if (tagName||plainComment){
		this._htmlStart=-1;
		this._htmlEnd=-1;
		this._ohtmlStart=-1;
		this._ohtmlEnd=-1;
	}
	this._parent=parent;
	if (parent){
		parent._children.push(this);
	}
}
htmlNode.prototype.children=function(){
	return this._children||null;
};
htmlNode.prototype.parent=function(){
	return this._parent||null;
};
htmlNode.prototype.tagName=function(){
	return this._tagName||null;
};
htmlNode.prototype.find=function(tagName,attrs){
	tagName=(tagName||'*').toLowerCase();
	if (this._type(attrs)!='object'){
		attrs={};
	}
	var ret=null;
	if (this._tagName){
		for (var i=0;i<this._children.length;i++){
			if (this._children[i]._tagName){
				if (tagName=='*'||this._children[i]._tagName==tagName){
					if (this._compareAttr(this._children[i]._attrs,attrs)){
						ret=this._children[i];
						break;
					}
				}
				ret=this._children[i].find(tagName,attrs);
				if (ret){
					break;
				}
			}
		}
	}
	return ret;
};
htmlNode.prototype.findAll=function(tagName,attrs){
	tagName=(tagName||'*').toLowerCase();
	if (this._type(attrs)!='object'){
		attrs={};
	}
	var ret=[];
	if (this._tagName){
		for (var i=0;i<this._children.length;i++){
			if (this._children[i]._tagName){
				if (tagName=='*'||this._children[i]._tagName==tagName){
					if (this._compareAttr(this._children[i]._attrs,attrs)){
						ret.push(this._children[i]);
					}
				}
				ret=ret.concat(this._children[i].findAll(tagName,attrs));
			}
		}
	}
	return ret;
};
htmlNode.prototype.comment=function(){
	var ret=[];
	if (this._tagName){
		for (var i=0;i<this._children.length;i++){
			if (this._children[i]._plainComment){
				ret.push(this._children[i]);
			}
			if (this._children[i]._tagName){
				ret=ret.concat(this._children[i].comment());
			}
		}
	}
	return ret;
};
htmlNode.prototype._compareAttr=function(nodeAttrs,attrs){
	for (var key in attrs){
		if (attrs.hasOwnProperty(key)){
			if (nodeAttrs.hasOwnProperty(key)){
				switch (this._type(attrs[key])){
					case 'string':
						if (attrs[key]!=nodeAttrs[key]){
							return false;
						}
						break;
					case 'regexp':
						if (nodeAttrs[key].test(atts[key])){
							return false;
						}
						break;
				}
			}else{
				return false;
			}
		}
	}
	return true;
};
htmlNode.prototype._type=function(obj){
	if(typeof obj=="undefined")return "undefined";
	if(obj===null)return "object";
	var arr=Object.prototype.toString.call(obj).match(/^\[object (.+)\]$/);
	return arr?arr[1].toLowerCase():'';
};
htmlNode.prototype.html=function(){
	var ret='';
	if (this._htmlStart!=-1){
		ret=this.parser._html.substring(this._htmlStart,this._htmlEnd+1);
	}
	return ret;
};
htmlNode.prototype.ohtml=function(){
	var ret='';
	if (this._ohtmlStart!=-1){
		ret=this.parser._html.substring(this._ohtmlStart,this._ohtmlEnd+1);
	}
	return ret;
};
htmlNode.prototype.text=function(){
	var ret=[];
	if (this._plainText){
		ret.push(this._plainText);
	}else if (this._tagName){
		for (var i=0;i<this._children.length;i++){
			ret.push(this._children[i].text());
		}
	}
	return ret.join(' ');
};
htmlNode.prototype.attr=function(attrKey,attrValue){
	if (this._type(attrValue)=='undefined'){
		var ret=null;
		if (this._attrs&&this._attrs.hasOwnProperty(attrKey)){
			ret=this._attrs[attrKey];
		}
		return ret;
	}else{
		this._attrs[attrKey]=attrValue;
		return this;
	}
};
htmlNode.prototype.remove=function(){
	if (this==this.parser.root){
		for (var i=node._children.length;i>=0;i--){
			node._children[i].remove();
		}
		return;
	}
	if (this._ohtmlStart==-1||this._ohtmlEnd==-1){
		return;
	}
	// calc position
	var p1=this._ohtmlStart,p2=this._ohtmlEnd+1;
	var start=this._ohtmlEnd;
	var len=this._ohtmlStart-this._ohtmlEnd-1;
	// remove node
	var children=this._parent._children;
	for (var i=0;i<children.length;i++){
		if (children[i]==this){
			children.splice(i,1);
			break;
		}
	}
	this._parent=null;
	// fix this node postion
	this.parser.root._fixPosition(start,len);
	this._fixPosition(0,-start);
	// fix html
	this.parser._html=this.parser._html.slice(0,p1)+this.parser._html.slice(p2);
	// add flag
	this._remove=true;
	return this.parser.root;
};
htmlNode.prototype._fixPosition=function(start,len){
	var arr=['_htmlStart','_htmlEnd','_ohtmlStart','_ohtmlEnd'];
	for (var i=0;i<arr.length;i++){
		if (this[arr[i]]>=start){
			this[arr[i]]+=len;
		}
	}
	if (this._tagName){
		for (var i=0;i<this._children.length;i++){
			this._children[i]._fixPosition(start,len);
		}
	}
};


function htmlParse(html){
	this._html='';
	this._parse(html);
};
htmlParse.prototype._autoCloseTag=(function(){
	var tagArr='!DOCTYPE,input,br,hr,area,base,img,meta,link'.split(',');
	var tagHash={};
	for (var i=0;i<tagArr.length;i++){
		tagHash[tagArr[i]]=1;
	}
	return tagHash;
})();
htmlParse.prototype._ignoreTag=(function(){
	var tagArr='script,textarea,pre'.split(',');
	var tagHash={};
	for (var i=0;i<tagArr.length;i++){
		tagHash[tagArr[i]]=1;
	}
	return tagHash;
})();
htmlParse.prototype._parse=function(html){
	if (htmlNode.prototype._type(html)=='string'){
		this._html=html||'';
	}
	var commentStart='<!--',commentEnd='-->';
	var commentStartChar=commentStart.substr(0,1);
	var commentEndChar=commentEnd.substr(0,1);
	var codeArr=this._html.split("");
	var curNode=this.root=new htmlNode(this,null,'root',null,null);
	curNode._htmlStart=curNode._ohtmlStart=0;
	curNode._htmlEnd=curNode._ohtmlEnd=this._html.length-1;
	var s='text',isIgnore=false,isClose,tagName,start,attrKey,attrValue,plainText='',plainComment='',isQuote='',isError=false;
	for (var i=0;i<codeArr.length;i++){
		var t=codeArr[i],pt=codeArr[i-1],nt=codeArr[i+1];
		var isLast=i==codeArr.length-1;
		switch (s){
			case 'text':
				if (!isIgnore&&t==commentStartChar&&codeArr.slice(i,i+commentStart.length).join('')==commentStart){
					start=i;
					plainComment=commentStart;
					s='comment';
					i+=commentStart.length-1;
				}else if (isLast||!isIgnore&&t=='<'&&nt&&!/^\s$/.test(nt)
					||isIgnore&&t=='<'&&codeArr.slice(i,i+tagName.length+2).join('')=='</'+tagName&&/^[>\/\s]$/.test(codeArr[i+tagName.length+2])){
						if (this._trim(plainText)){
							new htmlNode(this,curNode,null,plainText,null);
						}
						tagName='';
						start=i;
						s='tagName';
						isIgnore=false;
						if (nt=='/'){
							isClose=true;
							i++;
						}else{
							isClose=false;
						}
				}else{
					plainText+=t;
				}
				break;
			case 'comment':
				if (isLast||t==commentEndChar&&codeArr.slice(i,i+commentEnd.length).join('')==commentEnd){
					s='text';
					var node=new htmlNode(this,curNode,null,null,plainComment+commentEnd);
					node._ohtmlStart=start;
					node._htmlStart=start+commentStart.length;
					node._htmlEnd=i-1;
					i+=commentEnd.length-1;
					node._ohtmlEnd=i;
				}else{
					plainComment+=t;
				}
				break;
			case 'tagName':
				if (/^[>\/\s]$/.test(t)){
					if (!isClose){
						curNode=new htmlNode(this,curNode,tagName,null,null);
						isIgnore=this._ignoreTag.hasOwnProperty(tagName);
						curNode._ohtmlStart=start;
					}
					attrKey='';
					attrValue='';
					s='attrKey';
					if (t=='>'){
						i--;
					}
				}else{
					tagName+=t.toLowerCase();
				}
				break;
			case 'attrKey':
				if (t=='>'){
					if (isClose){
						var t=curNode;
						var wfcArr=[];
						while (t){
							if (t._tagName==tagName){
								for (var j=0;j<wfcArr.length;j++){
									wfcArr[j]._htmlEnd=wfcArr[j]._ohtmlEnd=start-1;
								}
								t._htmlEnd=start-1;
								t._ohtmlEnd=i;
								curNode=t._parent;
								break;
							}else{
								wfcArr.push(t);
							}
							t=t._parent;
						}
					}else{
						if (this._autoCloseTag.hasOwnProperty(tagName)){
							curNode._ohtmlEnd=i;
							curNode=curNode._parent;
						}else{
							curNode._htmlStart=i+1;
						}
					}
					plainText='';
					s='text';
				}else if (attrKey&&t=='='){
					attrValue='';
					s='attrValue';
				}else if (/^[\/\s]$/.test(t)){
					if (!isClose){
						this._addAttr(curNode,attrKey,attrValue);
					}
				}else{
					attrKey+=t;
				}
				break;
			case 'attrValue':
				if (isQuote){
					if (t==isQuote){
						isQuote=false;
						if (!isClose){
							this._addAttr(curNode,attrKey,attrValue);
						}
						//update weixj start
						attrKey='';
						attrValue='';
						//update weixj end
						s='attrKey';
					}else{
						attrValue+=t;
					}
				}else if (!attrValue&&/^[\'\"]$/.test(t)){
					isQuote=t;
				}else if (attrValue&&/^\s$/.test(t)||t=='>'){
					if (!isClose){
						this._addAttr(curNode,attrKey,attrValue);
					}
					attrKey='';
					attrValue='';
					s='attrKey';
					if (t=='>'){
						i--;
					}
				}else{
					if (attrValue||/^\s$/.test(t)){
						attrValue+=t;
					}
				}
				break;
		}
	}
	switch (s){
		case 'text':
		case 'comment':
		case 'tagName':
			break;
		case 'attrKey':
		case 'attrValue':
			curNode._parent.pop();
			break;
	}
	while (curNode!=this.root){
		t._htmlEnd=t._ohtmlEnd=codeArr.length-1;
		curNode=curNode._parent;
	}
};
htmlParse.prototype._addAttr=function(node,attrKey,attrValue){
	if (attrKey&&!node._attrs.hasOwnProperty(node)){
		node._attrs[attrKey]=attrValue;
	}
};
htmlParse.prototype._trim=function(str){
	return str.replace(/^\s+|\s+$/g,'');
};

function logDir(){
	fs.open('./webapp2hybrid.log', 'a', 0666, function(e, id) {
		fs.write(id, (new Date())+"\n"+logger.datas.join("\n"), null, 'utf8', function() {
			fs.close(id, function() {
				logger.datas = [];
			});
		});
	});
	return "日志查看地址："+path.join(__dirname,"webapp2hybrid.log");
}

var logger = require('tracer').console({
	format : [
			  "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
			  {
				  error : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
			  } 
	],
	dateformat : "HH:MM:ss.L",
	preprocess :  function(data){
		data.title = data.title.toUpperCase();
	},
    transport : function(data) {
		var msg = data.message;
		if(config.isLog){
			var filter = [
				"[ copy]",
				"[src]",
				"[Message]",
				"[  Map  ]",
				"[  AMD  ]",
				"[ replace",
				"[ readFile ]",
				"[ created ]"
			];
			var flag = true;
			for(var i=0;i<filter.length;i++){
				if(msg.indexOf(filter[i])!=-1){
					flag = false;
					break;
				}
			}
			if(flag)console.log(msg);
		}
        logger.datas.push(msg);
       
    }
});
logger.datas = [];






var os = require('os');
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
//css
var CleanCSS = require('clean-css');
 
function cssMinifier(data) {
	if(config.cssMini){
		return minimized = new CleanCSS().minify(data);
	}else {
		return data;
	}
	
}
var minify = require('html-minifier').minify;
function htmlMinifier(data){
	if(config.htmlMini){
		return minify(data,{removeComments: true,collapseWhitespace: true,minifyJS:true, minifyCSS:true})
	}else {
		return data;
	}
	
}
//uglify压缩js的公用函数
function uglifyOne(orig_code) {
	// console.log('///////////////////////////')
	// console.log(orig_code)
	if(config.jsMini){
		
		var ast = jsp.parse(orig_code); // parse code and get the initial AST
		ast = pro.ast_mangle(ast,{
			"except": ['$super','require']
		}); // get a new AST with mangled names
		ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
		var final_code = pro.gen_code(ast); 
		// console.log(final_code)
		
		return final_code;		
	}else {
		return orig_code;
	}
}



var networkInterfacess = os.networkInterfaces()["本地连接"]||os.networkInterfaces()["无线网络连接"];
var ip = null;
var platform = os.platform();
if ('win32' == platform) { 
	for(var i=0;i<networkInterfacess.length;i++){  
		var networkInterfaces = networkInterfacess[i]
		if(networkInterfaces.family=='IPv4'){  
			ip=networkInterfaces.address;  
		}  
	}
}else if ('linux' == platform){
	for(var i=0;i<os.networkInterfaces().eth0.length;i++){  
		if(os.networkInterfaces().eth0[i].family=='IPv4'){  
			ip=os.networkInterfaces().eth0[i].address;  
		}  
	}  
}



//配置环境
var config={
	"isLog":true,
	"cssMini":true,
	"jsMini":true,
	"htmlMini":false,
	"isDeleteHtml":true,
	/*需要打包的页面*/
	"views":{
		// "http://127.0.0.1:8082/webapp/tour/index":1,
		// "http://127.0.0.1:8082/webapp/tour/VacationList/2/2/%E4%B8%8A%E6%B5%B7/mobi/1/nopage":1,
		// "http://127.0.0.1:8082/webapp/tour/Detail/1666873/2/2/nopage":1
	},
	/*进来的首页*/
	// "defaultView":"http://127.0.0.1:8082/webapp/tour/VacationList/2/2/%E4%B8%8A%E6%B5%B7/mobi/1/nopage",
	"defaultView":"",//"/webapp/tour/VacationList/2/2/上海/mobi/1/nopage",

	/*需要打包的资源，框架资源不需要处理，框架默认添加*/
	"resource":{
		// "127.0.0.1:8082":1
	},
	/*--lizardEnv 框架代码环境*/
	"lizardEnv":"pro",
	/*--channel 频道名称*/
	"channel":"tour",
	// /*--path 指定目录(config文件) */
	// "path":"busbu.json",
	// /*是否进行本地weinre调试*/
	"weinre":false,
	/**/
	"include":{
//		"http://webresource.ctrip.com/code/lizard/2.0/webapporigin/lizard.seed.js":0,
//		"http://webresource.ctrip.com/code/lizard/2.0/web/lizard.seed.js":0
	},
	
	/*生产包的根目录*/
	"root":"webapp/",
	"level":1,
	"srcDebug":{
		"libs":[
				"3rdlibs/bridge.js",
				"3rdlibs/require.js",
				"3rdlibs/underscore.js",
				"3rdlibs/zepto.js",
				"3rdlibs/backbone.js",
				"3rdlibs/fastclick.js"
				],
		"srcDir":"../Dev/WebAppOrigin",
		"open":false
	},
	switch:{
		web:false,
		hybrid:true
	},
	force:true
};
//用来替换域名的
/*
	框架资源，不同环境的配置
*/


var host={
	"local":{	
		"webresource.ctrip.com":"webresource.local.sh.ctriptravel.com",
		"webresource.c-ctrip.com":"webresource.local.sh.ctriptravel.com",
		"pic.ctrip.com":"pic.local.sh.ctriptravel.com",
		"pic.c-ctrip.com":"pic.local.sh.ctriptravel.com",
		"res.m.ctrip.com":"res.m.ctrip.com",
	},
	"ui":{
		"webresource.ctrip.com":"webresource.ui.sh.ctriptravel.com",
		"webresource.c-ctrip.com":"webresource.ui.sh.ctriptravel.com",
		 "pic.ctrip.com":"pic.fws.qa.nt.ctripcorp.com",
		 "pic.c-ctrip.com":"pic.fws.qa.nt.ctripcorp.com",
		//"pic.ctrip.com":"pic.ui.sh.ctriptravel.com",
		//"pic.c-ctrip.com":"pic.ui.sh.ctriptravel.com",
		"res.m.ctrip.com":"res.m.ctrip.com"
	},
	"fws":{ 						  
		"webresource.ctrip.com":"webresource.fws.qa.nt.ctripcorp.com",
		"webresource.c-ctrip.com":"webresource.fws.qa.nt.ctripcorp.com",
		"pic.ctrip.com":"pic.fws.qa.nt.ctripcorp.com",
		"pic.c-ctrip.com":"pic.fws.qa.nt.ctripcorp.com",
		"res.m.ctrip.com":"res.m.ctrip.com"
	},
	"uat":{
		"webresource.ctrip.com":"webresource.uat.qa.nt.ctripcorp.com",
		"webresource.c-ctrip.com":"webresource.uat.qa.nt.ctripcorp.com",
		"pic.ctrip.com":"pic.uat.qa.nt.ctripcorp.com",
		"pic.c-ctrip.com":"pic.uat.qa.nt.ctripcorp.com",
		"res.m.ctrip.com":"res.m.ctrip.com"
	},
	"pro":{
		"webresource.ctrip.com":"webresource.ctrip.com",
		"webresource.c-ctrip.com":"webresource.c-ctrip.com",
		"pic.ctrip.com":"pic.ctrip.com",
		"pic.c-ctrip.com":"pic.c-ctrip.com",
		"res.m.ctrip.com":"res.m.ctrip.com"
	}
};



{
	for(var key in host){
		var val = host[key];
		for(var key1 in val){
			var val1 = val[key1]
			val[val1] = key1;
		}
	}
};


{
	var hostMaps = {};
	for(var key in host){
		var val = host[key];
		for(var key1 in val){
			var val1 = val[key1]
			if(key1.indexOf('webresource')!=-1){
				hostMaps[key1] = 'webresource';
			}else if(key1.indexOf('pic')!=-1){
				hostMaps[key1] = 'pic';
			}else if(key1.indexOf('res')!=-1){
				hostMaps[key1] = 'res';
			}
			if(val1.indexOf('webresource')!=-1){
				hostMaps[val1] = 'webresource';
			}else if(val1.indexOf('pic')!=-1){
				hostMaps[val1] = 'pic';
			}else if(val1.indexOf('res')!=-1){
				hostMaps[val1] = 'res';
			}
		}
	}
};



/*
删除文件夹子
*/
var deleteFolderRecursive = (function(){
    function iterator(url,dirs){
        var stat = fs.statSync(url);
        if(stat.isDirectory()){
            dirs.unshift(url);//收集目录
            inner(url,dirs);
        }else if(stat.isFile()){
            fs.unlinkSync(url);//直接删除文件
        }
    }
    function inner(path,dirs){
        var arr = fs.readdirSync(path);
        for(var i = 0, el ; el = arr[i++];){
            iterator(path+"/"+el,dirs);
        }
    }
    return function(dir,cb){
        cb = cb || function(){};
        var dirs = [];

        try{
            iterator(dir,dirs);
            for(var i = 0, el ; el = dirs[i++];){
                fs.rmdirSync(el);//一次性删除所有收集到的目录
            }
            cb()
        }catch(e){//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
            e.code === "ENOENT" ? cb() : cb(e);
        }
    }
})();
// parse config
var root = "./";

function error(Error){
	if(config.force){
		console.log(Error);
	}else {
		throw(Error);
	}
}
// load config in vm sandbox
function loadConfig(fn){
	var str='';
	try{
		str=fs.readFileSync(fn).toString();
	}catch (e){
		throw(new Error('Load config file error'));
	}

	if (str){
		try{
			
			
			var ret=new Function('return (' + str + ')')();
			config=extend(config,ret);
		}catch (e){
			logger.log(e.message);
			throw(new Error('Error config file format'));
		}
	}
}


// base utility
String.prototype.toReString=function(){
	var h={
		'\r':'\\r',
		'\n':'\\n',
		'\t':'\\t'
	};
	return this.replace(/([\.\\\/\+\*\?\[\]\{\}\(\)\^\$\|])/g,"\\$1").replace(/[\r\t\n]/g,function(a){
		return h[a];
	});
};

function extend(obj){
	var argv=Array.prototype.slice.call(arguments,1);
	for (var i=0;i<argv.length;i++){
		for (var key in argv[i]){
			if (key in obj && typeof obj[key]=='object'){
				extend(obj[key],argv[i][key]);
			}else{
				obj[key]=argv[i][key];
			}
		}
	}
	return obj;
}


function LowerCase(str){
	return str.toLowerCase();
}
function UpperCase(str){
	return str.toUpperCase();
}
function replaceToLowerCase(fileDir,type){
	var type = type||"file";
	var tp = LowerCase(fileDir)
	if(tp!=fileDir){
		logger.log("[ replace "+type+"] "+fileDir+" ==>"+tp);
	}
	return tp;
}

//获取config的路径

;(function(){
	var argv=process.argv.slice(2);
	
	var configPath="busbu.json";
	var re=/^--(\w+)=(.+)$/;
	for (var i=0;i<argv.length;i++){
		var arr=argv[i].match(re);
		if (arr){
			switch (arr[1]){
				case 'path':
					configPath=arr[2];
					break;
				default:
					break;
			}
		}
	}
	logger.log('configPath::'+configPath)
	
	/*加载配置项*/
	loadConfig(configPath);
	
	if(!config.switch.web&&!config.switch.hybrid){
		logger.log("请开启switch属性");
		return;
	}
	if(config.switch.web&&!config.switch.hybrid){
		web();
	}else if(!config.switch.web&&config.switch.hybrid){
		
		if(!config.channel){
			throw "请添加channel名称";
		}
		/*
			处理iisExpress start
		*/
		var busbuPhysicalPath = path.dirname(configPath)
		busbuPhysicalPath.replace('/\\/g','\\');
		if((busbuPhysicalPath==".")||!config.croller){
			//busbuPhysicalPath = "D:\\mobile1\\TicketSEO";
			hybrid();
		}else{
			console.log("busbuPhysicalPath::",busbuPhysicalPath);
			var port = 5678;
			config.hostname = "localhost:"+port;
			var insiisExpress = new iisExpress({
				channel:config.channel,
				port:port,
				busbuPhysicalPath:busbuPhysicalPath,
				callback:function(){
					setTimeout(function(){
						hybrid(insiisExpress)
					},1000);
				}
			})
		}
		
		
		
		
	}else {
		web(hybrid);	
	}
	
	
})();


function web(callback){
	logger.log("-----------------build web start----------------------------------------------")
	;(function(){
		//配置项的判断
		if(!config.pdConfig){
			logger.log("请指定pdConfig路径");
			return ;
		}
		if(!config.appBaseUrl){
			logger.log("请指定appBaseUrl路径");
			return ;
		}
		
		
		var pdConfig = config.pdConfig;//'../TicketSEO/webresource/ticket/ticketConfig.js';
		var appBaseUrl = config.appBaseUrl;//"../TicketSEO/";
		var dir = appBaseUrl;//"./Scripts-Build/";
		
		var content=fs.readFileSync(pdConfig,"utf8").toString();

		var context = {};
		var sandbox = {
			require:{
				_config:{},
				config:function(cfg){
					this._config = cfg;
				}
			},
			context:{},
			define:function (name, deps, callback) {
				if (typeof name !== 'string') {
					//Adjust args appropriately
					callback = deps;
					deps = name;
					name = null;
				}
				//This module may not have dependencies
				if (!deps.splice) {
					//deps is not an array, so probably means
					//an object literal or factory function for
					//the value. Adjust args.
					callback = deps;
					deps = [];
				}
				if (!deps && (typeof callback=='function')) {
					deps = [];
				}	
				context = {
					name:name,
					deps:deps,
					callback:callback					
				}
			},
			Lizard:{
				appBaseUrl:appBaseUrl
			}
		}
		vm.runInNewContext(content,sandbox);

		

		var requireConfig = sandbox.require._config;
		logger.log("[ pdConfig ]"+pdConfig);
		logger.log("[ appBaseUrl ]"+appBaseUrl);
		logger.log("[ requireConfig ]"+JSON.stringify(requireConfig));
		var paths = requireConfig.paths;
		var pathsClone = {};
		for(var key in paths){
			pathsClone[key] = 0;
		}
		var modules = requireConfig.modules||[];
		var len = modules.length;
		var suffix = ".lizard.js";
		for(var i=0;i<len;i++){
			var mod = modules[i];
			var includes = mod.include;
			var outfilePath = mod.name;
			var len2 = includes.length;
			var contents = [];
			for(var j=0;j<len2;j++){
				var include = includes[j];
				var infilePath = paths[include];
				pathsClone[include]=1;
				if (!/\.html$/i.test(infilePath)&&!/\.js$/i.test(infilePath)){
					infilePath=infilePath+'.js';
				}
				logger.log("[ readFile ]"+infilePath);
				var content = fs.readFileSync(infilePath,"utf8").toString();
				context = {};
				vm.runInNewContext(content,sandbox);
				context.name = include;
				contents.push("define('"+context.name+"',['"+context.deps.join("','")+"'],"+context.callback.toString()+")");
				context = {};
			}
			
			if (!/\.js$/i.test(outfilePath)){
				outfilePath=outfilePath+'.js';
			}
			logger.log("[ readFile ]"+outfilePath);
			var outfilePathOrigin = fs.readFileSync(outfilePath,"utf8").toString();
			//将自己的内容保留
			contents.push(outfilePathOrigin);
			outfilePath = outfilePath.replace(appBaseUrl,dir);
			outfilePath = outfilePath.replace(".js",suffix);
		
			var fileDir=path.dirname(outfilePath);
			;(function(fileDir,outfilePath,contents){
				mkdirp(fileDir,function(err){
					if (err){
						throw(new Error('Create path error: '+fileDir));
					}else{
						
						fs.writeFileSync(outfilePath,uglifyOne(contents.join(";")));
						logger.log("[ created ]"+outfilePath);
					}
				});
			})(fileDir,outfilePath,contents);
		}
		;(function(){
			var contents = [];
			var outfilePath = pdConfig;
			for(var key in paths){
				if(!pathsClone[key]){
					var infilePath = paths[key];
					if (!/\.html$/i.test(infilePath)&&!/\.js$/i.test(infilePath)){
						infilePath=infilePath+'.js';
					}
					logger.log("[ readFile ]"+infilePath);
					var content = fs.readFileSync(infilePath,"utf8").toString();
					
					if(/\.html$/i.test(infilePath)){
						contents.push("define('"+key+"',[],"+JSON.stringify(content)+")");
					}else{
						context = {};
						vm.runInNewContext(content,sandbox);
						context.name = key;
						contents.push("define('"+context.name+"',['"+context.deps.join("','")+"'],"+context.callback.toString()+")");
						context = {};
					}
				}
			}
			if (!/\.js$/i.test(outfilePath)){
				outfilePath=outfilePath+suffix;
			}
			logger.log("[ readFile ]"+outfilePath);
			var outfilePathOrigin = fs.readFileSync(outfilePath,"utf8").toString();
			outfilePath = outfilePath.replace(appBaseUrl,dir);
			outfilePath = outfilePath.replace(".js",suffix);

			//将自己的内容保留
			contents.push(outfilePathOrigin);
			var fileDir=path.dirname(outfilePath);
			;(function(fileDir,outfilePath,contents){
				mkdirp(fileDir,function(err){
					if (err){
						throw(new Error('Create path error: '+fileDir));
					}else{
						var ret = contents.join(";");
						fs.writeFileSync(outfilePath,uglifyOne(ret));
						logger.log("[ created ]"+outfilePath);
						logger.log("-----------------build web end----------------------------------------------")
						logger.log(logDir());
						callback&&callback();
						//(ret)
					}
				});
			})(fileDir,outfilePath,contents);

		})();
	})();
}
function hybrid(insiisExpress){
	logger.log("-----------------build hybrid start----------------------------------------------")
	/*
		处理iisExpress end
	*/
	
	if(config.level==3){
		config.srcDebug.open = true;
	}
	
	// fix config
	/*添加hostname域内的内容进入打包范围*/
	config.resource[config.hostname]={};
	
	/*设置views的url为绝对url*/
	for (var n in config.views){
		config.views['http://'+config.hostname+n] = config.views[n];
		delete config.views[n];
	}
	
	/*
		设置框架允许的访问路径
	*/
	
	var framworkHostPaths = {
		"webresource.":{
			"/code":1,
			"/styles/h5/common":1
		},
		"pic.":{
			"/h5/common":1
		},
		"res.":{
		
		}
	}
	var defaultsPath = extend({},framworkHostPaths);
	function incluePath(url){
		var ret = {};
		for(var key in defaultsPath){
			if(url.indexOf(key)!=-1){
				for(var n in defaultsPath[key]){
					ret[n] = defaultsPath[key][n];
				}
				return ret;
			}
		}
		return ret;
	}
	
	/*将host对象中，当前环境下的站点添加到config.resource对象中，使其可以被打包*/
	if (config.lizardEnv in host){
		/*
			先将host[config.lizardEnv]上的属性copy给config.resource
		*/
		var curHost = host[config.lizardEnv];
		
		for (var h1 in curHost){
		
			config.resource[h1]=(function(){
				if(config.resource[h1]){
					if(typeof config.resource[h1]!='object'){
						config.resource[h1] = {};
					}
					return extend(incluePath(h1),config.resource[h1]);
				}else{
					return incluePath(h1);
				}
			})();
			config.resource[curHost[h1]]=(function(){
				if(config.resource[curHost[h1]]){
					if(typeof config.resource[curHost[h1]]!='object'){
						config.resource[curHost[h1]] = {};
					}
					return extend(incluePath(curHost[h1]),config.resource[curHost[h1]]);
				}else{
					return incluePath(curHost[h1]);
				}
			})();
			
		}
		/*
			将框架运行访问的不同环境的域名进行同步扩张
		*/
		for (var hh in curHost){
			var res = config.resource[hh];
			for(var key in defaultsPath){
				if(hh.indexOf(key)!=-1){
					defaultsPath[key] = extend({},defaultsPath[key],res)
				}
			}
		}
		for(var hh in config.resource){
			for(var key in defaultsPath){
				if(hh.indexOf(key)!=-1){
					config.resource[hh] = extend({},config.resource[hh],defaultsPath[key])
				}
			}
		}
		// console.log(config.resource);
		
		
		
		/*
			将host[config.lizardEnv]中的key 、value都合并到config.resource对象中
			矫正host上的值
		*/
		
		// for (var h1 in curHost){
			// var h2=curHost[h1];
			// for (var h in config.resource){
				// if (h1==h && !(h2 in config.resource)){
					// config.resource[h2]=config.resource[h];
				// }
				
				// if (h2==h && !(h1 in config.resource)){
					// config.resource[h1]=config.resource[h];
				// }
			// }
			// for (var iUrl in config.include){
				// var urlObj=url.parse(iUrl);
				// var h=urlObj.hostname;
				// if (h1==h){
					// urlObj.hostname=h2;
					// urlObj.host=h2+(urlObj.port?':'+urlObj.port:'');
					// var tUrl=url.format(urlObj);
					// if (!(tUrl in config.include)){
						// config.include[tUrl]=config.include[iUrl];
					// }
				// }
				// if (h2==h && !(h1 in config.resource)){
					// urlObj.hostname=h1;
					// urlObj.host=h1+(urlObj.port?':'+urlObj.port:'');
					// var tUrl=url.format(urlObj);
					// if (!(tUrl in config.include)){
						// config.include[tUrl]=config.include[iUrl];
					// }
				// }
			// }
		// }
	}
	
	// if (!config.root){
		// config.root=path.basename(configFile,path.extname(configFile));
	// }
	
	if(!config.hostnameShim)config.hostnameShim='package';
	deleteFolderRecursive(config.root,function(e){
		if(e)logger.log("!!!"+e);
		else logger.log("删除"+config.root+"目录以及子目录成功")
	});
	root = path.join(config.root,config.channel);
	mkdirp.sync(root);
	config.absRoot=fs.realpathSync(root);
	

	
	
	
	

	

	function copy(val){
		var ret;
		switch (typeof val){
			case 'object':
				ret={};
				for (var key in val){
					ret[key]=copy(val[key]);
				}
				break;
			case 'array':
				ret=[];
				for (var i=0;i<val.length;i++){
					ret.push(copy(val[i]));
				}
				break;
			default:
				ret=val;
				break;
		}
		return ret;
	}

	function concatBuff(buff1,buff2){
		var buff=new Buffer(buff1.length+buff2.length);
		buff1.copy(buff,0);
		buff2.copy(buff,buff1.length);
		return buff;
	}

	function urlResolve(){
		var args=Array.prototype.slice.call(arguments,0);
		var u1=args.shift(),u2;
		while (u2=args.shift()){
			var urlObj=url.parse(u1);
			if (urlObj.protocol){
				urlObj.protocol='http:';
				u1=url.format(urlObj);
			}
			if (/^\/\//.test(u2)){
				u2=urlObj.protocol+u2;
			}
			u1=url.resolve(u1,u2);
		}
		return u1;
	}

	// async task
	function task(callback){
		var _this=this;
		this.enabled=true;
		this.remain=0;
		this.hash={};
		this.callback=callback;
		setTimeout(function(){
			_this.check();
		});
	}
	task.prototype.uid=function(){
		return 'uid_'+new Date().getTime()+(Math.random()*1e10).toFixed(0);
	};
	task.prototype.add=function(flag){
		if (!this.enabled){
			throw(new Error('Add task error, instance is disabled'));
		}
		if (!flag){
			flag=this.uid();
		}
		this.hash[flag]=0;
		this.check();
		return flag;
	};
	task.prototype.remove=function(flag){
		if (!this.enabled){
			throw(new Error('Remove task error, instance is disabled'));
		}
		if (!flag||!(flag in this.hash)){
			throw(new Error('Remove task error, can\'t find task flag'));
		}
		this.hash[flag]=1;
		this.check();
		return flag;
	};
	task.prototype.check=function(){
		if (!this.enabled){
			throw(new Error('Add task error, instance is disabled'));
		}
		this.remain=0;
		for (var flag in this.hash){
			if (!this.hash[flag]){
				this.remain++;
			}
		}
		if (!this.remain){
			this.callback();
			this.enabled=false;
		}
	};

	// app entry
	var map={},fetched={};

	// app start
	(function(){

		var views=[];
		for (var oUrl in config.views){
			if (config.views.hasOwnProperty(oUrl)){
				views.push(oUrl);
			}
		}
			

		
		fetchViews(function(){
		
			mapLinks();

		
			convertViews();
		
			convertReqHtmls();
			createLocalRoute();
			
			createIndexPage();
			
			// copySource(path.resolve(__dirname,'source'),config.absRoot);
			
			// saveInfo();
			logger.log('[Message]'.grey+' Package Completed');
			logger.log("-----------------build hybrid end----------------------------------------------")
			logger.log(logDir());
			insiisExpress&&insiisExpress.end();
		});
		//创建首页  by wxj 
		function createIndexPage(){
			
		
			for (var oUrl in config.views){
				var lUrl = map[oUrl].filePath;
				var mimeType = map[oUrl].mimeType;
				if (mimeType=='text/html'){
					// var tUrl=lUrl+'.js';
					var content=fs.readFileSync(lUrl).toString();
					// content='define(function(){return ('+JSON.stringify(content)+');});';
					content=content.replace(/<base\b.*?>/g,'');
					content=content.replace(/<div id="headerview" style="height: 48px;">/g,'<div id="headerview" style="height: 48px;display:none;">');
					
					
					var parser=new htmlParse(content);
					var node;
					while (node=parser.root.find('script',{
						type:'text/lizard-config'
					})){
						
						node.remove();
					};
					while (node=parser.root.find('script',{
						type:'text/lizard-template'
					})){
						
						node.remove();
					};
					while (node=parser.root.find('input',{
						id:'page_id'
					})){
						
						node.remove();
					};
					
					
					

					
					// fs.writeFileSync(path.resolve(__dirname,'source','index.html'),content);
					// console.log(parser.root.html())
					content = parser.root.html();
					content=content.replace("</body>",'<input type="hidden" id="page_id" value="wait"/></body>');
					
					content = htmlMinifier(content);
					content = "<!DOCTYPE html>"+content;
					fs.writeFileSync(replaceToLowerCase(path.resolve(config.absRoot,'index.html')),content);
					
					break;
				}
			}
		}
		
		// fetch views
		function fetchViews(callback){
			var view=views.shift();
			if (view){
				var tIns=new task(function(){
					logger.log('[Message]'.grey+' Fetch View End: '+view);
					fetchViews(callback);
				});
				logger.log('[Message]'.grey+' Fetch View Start: '+view);
				fetchFile(view,tIns);
			}else{
				callback&&callback();
			}
		}

		// map links
		function mapLinks(){
			for (var oUrl in map){
				replaceLinks(map[oUrl].filePath,map[oUrl].mimeType);
			}
		}

		// convert views
		function convertViews(){
			for (var oUrl in config.views){
				convertHtmlToAmd(map[oUrl].filePath,map[oUrl].mimeType);
			}
		}

		// convert require htmls
		function convertReqHtmls(){
			for (var i=0;i<reqs.converts.length;i++){
				var oUrl=reqs.converts[i];
				convertHtmlToAmd(map[oUrl].filePath,map[oUrl].mimeType);
			}
		}

		// create local route
		function createLocalRoute(){
			var localRoute={};
			for (var oUrl in config.views){
				var urlSchema=map[oUrl].urlSchema;
				
				
				if (urlSchema){
					if (typeof urlSchema == 'string'){
						urlSchema = [urlSchema];
					}
					// console.log(urlSchema)
					for(var i=0;i<urlSchema.length;i++){
						var us = urlSchema[i];
						var filePath=path.relative(config.absRoot,map[oUrl].filePath).replace(/\\/g,'/');
						localRoute[us]=filePath;
						/*
							处理"defaultView":"http://127.0.0.1:8082/webapp/tour/index"这样的情况
						*/
						// if(config.defaultView==oUrl){
							
							// localRoute["defaultView"]=urlSchema;
						// };
						logger.log('[ Route ]'.yellow+' '+us+' : '+map[oUrl].filePath);
					}
					
				}else{
					logger.log('[ Warn  ]'.red+' Miss UrlSchema :'+oUrl);
				}
			}
			/*
				处理"defaultView":"/index///"这样的情况
			*/
			if(!localRoute["defaultView"]){
				localRoute["defaultView"]=config.defaultView;
			}
			
			// var content='Hybrid.localRoute.addConfig('+JSON.stringify(localRoute)+');';
			var content='window.LizardLocalroute = '+JSON.stringify(localRoute)+';';
			fs.writeFileSync(replaceToLowerCase(path.resolve(config.absRoot,config.hostnameShim,'LizardLocalroute.js')),content);
		}

		// copy source
		function copySource(oDir,tDir){
			var arr=fs.readdirSync(oDir);
			for (var i=0;i<arr.length;i++){
				if (arr[i]!='.' && arr[i]!='..'){
					var oFile=path.resolve(oDir,arr[i]);
					var tFile=path.resolve(tDir,arr[i]);
					var stat=fs.statSync(oFile);
					if (stat.isFile()){
						fs.createReadStream(oFile).pipe(fs.createWriteStream(tFile));
						logger.log('[ Copy  ]'.yellow+' '+tFile);
					}
					if (stat.isDirectory()){
						copySource(oFile,tFile);
					}
				}
			}
		}

		// save info
		function saveInfo(){
			var info={
				config:config,
				map:map,
				require:{
					baseUrl:reqs.require.baseUrl,
					paths:reqs.paths,
					converts:reqs.converts,
				},
				Lizard:reqs.Lizard
			};
			var infoFile=config.absRoot+'/info.json';
			logger.log('[Message]'.grey+' Save Info: '+infoFile);
			fs.writeFileSync(infoFile,JSON.stringify(info));
		}
	})();
	function copyLizardSrc(lizardFileDir){
		//如果不需要本地debug则直接返回
		var srcDebug = config.srcDebug;
		if(!srcDebug.open||!lizardFileDir)return false;
		srcDebug.lizardFileDir = lizardFileDir;
		var stat = fs.stat;
		/*
		 * 复制目录中的所有文件包括子目录
		 * @param{ String } 需要复制的目录
		 * @param{ String } 复制到指定的目录
		 */
		var copy = function( src, dst ){
			logger.log(" [ copy] ")
			logger.log(" [src] ",src)
			logger.log(" [dst] ",dst)
			
			// 读取目录中的所有文件/目录
			fs.readdir( src, function( err, paths ){
				if( err ){
					throw err;
				}

				paths.forEach(function( path ){
					var _src = src + '/' + path,
						_dst = dst + '/' + path,
						readable, writable;        

					stat( _src, function( err, st ){
						if( err ){
							throw err;
						}

						// 判断是否为文件
						if( st.isFile() ){
							// 创建读取流
							readable = fs.createReadStream( _src );
							// 创建写入流
							writable = fs.createWriteStream( _dst ,{flag:"r"});   
							// 通过管道来传输流
							readable.pipe( writable );
						}
						// 如果是目录则递归调用自身
						else if( st.isDirectory() ){
							exists( _src, _dst, copy );
						}
					});
				});
			});
		};

		// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
		var exists = function( src, dst, callback ){
			fs.exists( dst, function( exists ){
				// 已存在
				if( exists ){
					callback( src, dst );
				}
				// 不存在
				else{
					fs.mkdir( dst, function(){
						callback( src, dst );
					});
				}
			});
		};
		deleteFolderRecursive(lizardFileDir);
		exists( path.join(__dirname,srcDebug.srcDir),lizardFileDir, copy );
	}
	/*
		人为的创建libs对应的maps
	*/
	function createLibsMap(oUrl){
		var isView=oUrl in config.views;
		var oUrlObj=url.parse(oUrl);
		var specFlag=getSpecFlag(oUrl);
		
		if (!specFlag.exclude && (specFlag.include || isView || oUrlObj.host in config.resource)){
			var hostname = "";
			var oUrlObj=url.parse(oUrl);
			if (config.lizardEnv in host && oUrlObj.hostname in host[config.lizardEnv]){
				hostname = oUrlObj.hostname;
				oUrlObj.hostname=host[config.lizardEnv][oUrlObj.hostname];
				oUrlObj.host=oUrlObj.hostname+(oUrlObj.port?':'+oUrlObj.port:'');
			}
			
			map[oUrl]={};
			if(hostname){
				var filePath=path.resolve(root,"../lizard",(hostMaps[hostname]?hostMaps[hostname]:hostname),oUrlObj.pathname.replace(/^\//,'').replace(/[^\w\.\/\\]/g,'_'))+(isView?'.html':'');
				var fileDir=path.dirname(filePath);
				map[oUrl].filePath=replaceToLowerCase(filePath,"file");//filePath;filePath;
			}else{
				if(oUrlObj.hostname&&(config.hostname.indexOf(oUrlObj.hostname)!=-1)&&config.hostnameShim){
					
					var filePath=path.resolve(root,config.hostnameShim,oUrlObj.pathname.replace(/^\//,'').replace(/[^\w\.\/\\]/g,'_'))+(isView?'.html':'');
					
					var fileDir=path.dirname(filePath);
					
					
					map[oUrl].filePath=replaceToLowerCase(filePath,"file");//filePath;filePath;
				}else{
					var filePath=path.resolve(root,oUrlObj.hostname,oUrlObj.pathname.replace(/^\//,'').replace(/[^\w\.\/\\]/g,'_'))+(isView?'.html':'');
					var fileDir=path.dirname(filePath);
					map[oUrl].filePath=replaceToLowerCase(filePath,"file");//filePath;filePath;
				}
				// var filePath=path.resolve(root,oUrlObj.hostname,oUrlObj.pathname.replace(/^\//,'').replace(/[^\w\.\/\\]/g,'_'))+(isView?'.html':'');
				// var fileDir=path.dirname(filePath);
				// map[oUrl].filePath=filePath;
			}
			map[oUrl].mimeType='application/x-javascript';
		}else{
			logger.log(('[ Skip  ] '+oUrl).grey);
		}	
	}
	/*
		判断path是否在resource允许范围内
	*/
	function isInResourcePaths(oUrlObj){
		if(oUrlObj.host in config.resource){
			var paths = config.resource[oUrlObj.host];
			for(var key in paths){
				var flag = paths[key];
				var re=new RegExp(key.toReString(),'g');
				if(flag){
					if(re.test(oUrlObj.path)){
						return true;
					}
				}else{
					if(re.test(oUrlObj.path)){
						return false;
					}
				}
			}
			return true;
		}else{
			return false;
		}
	}
	/*
		判断path是否在框架host和path允许范围内
	*/
	function isInFramworkHostPaths(oUrlObj){
		// var framworkHostPaths = {
			// "webresource.":{
				// "/code":1
			// },
			// "pic.":{
				// "/h5/common":1
			// },
			// "res.":{
			
			// }
		// }
		for(var key in framworkHostPaths){
			// console.log(0,oUrlObj.hostname,key);
			if(oUrlObj.hostname.indexOf(key)!=-1){
				
				var paths = framworkHostPaths[key];
				var n=0;
				for(var pat in paths){
					n=1;
					var flag = paths[pat];
					var re=new RegExp(pat.toReString(),'g');
					if(flag){
						if(re.test(oUrlObj.path)){
							// console.log(1,flag,re,oUrlObj.path)
							return true;
						}
					}else{
						if(re.test(oUrlObj.path)){
							// console.log(2,flag,re,oUrlObj.path)
							return false;
						}
					}
				}
				if(!n){
					// console.log(3,oUrlObj.path)
					return true;
				}
				
			}
		}
		// console.log(4,oUrlObj.path)
		return false;
	}
	// logic fn
	function fetchFile(oUrl,tIns,callback){
		
		
		var isView=oUrl in config.views;
		var oUrlObj=url.parse(oUrl);
		var specFlag=getSpecFlag(oUrl);
		
		// return;
		
		if (/*!specFlag.exclude && */(/*specFlag.include ||  */isView ||isInResourcePaths(oUrlObj)/*oUrlObj.host in config.resource*/)){
			var hostname1 = "";//判断打包到lizard文件夹中框架站点对应的url
			var hostname2 = "";//判断打包到pd文件夹中框架站点对应的url
		
			
			if (config.lizardEnv in host && oUrlObj.hostname in host[config.lizardEnv]){
				
				if(isInFramworkHostPaths(oUrlObj)){
					hostname1 = oUrlObj.hostname;
				}
				hostname2 = oUrlObj.hostname;
				oUrlObj.hostname=host[config.lizardEnv][oUrlObj.hostname];
				oUrlObj.host=oUrlObj.hostname+(oUrlObj.port?':'+oUrlObj.port:'');
			}
			
			var tUrl=url.format(oUrlObj);
			
			if (tUrl in fetched){
				setTimeout(function(){
					map[oUrl]=map[fetched[tUrl]];
					callback&&callback();
				});
				return;
			}

			fetched[tUrl]=oUrl;
			map[oUrl]={};
		
			// webapp\tour\pic.local.sh.ctriptravel.com\vacation_v2\h5\group_travel
			/*处理BU 的hostname的别名*/
			
		
			
				
			/*
				处理fileDir和filePath
			*/
			var filePath,fileDir;
			if(hostname1){
				 filePath=path.resolve(root,"../lizard",(hostMaps[hostname1]?hostMaps[hostname1]:hostname1),oUrlObj.pathname.replace(/^\//,'').replace(/[^\w\.\/\\]/g,'_'))+(isView?'.html':'');
				 fileDir=path.dirname(filePath);
				
			
			}else if(hostname2){
				filePath=path.resolve(root,"./",(hostMaps[hostname2]?hostMaps[hostname2]:hostname2),oUrlObj.pathname.replace(/^\//,'').replace(/[^\w\.\/\\]/g,'_'))+(isView?'.html':'');
				fileDir=path.dirname(filePath);
			}else{
				
				if(oUrlObj.hostname&&(config.hostname.indexOf(oUrlObj.hostname)!=-1)&&config.hostnameShim){
					
					 filePath=path.resolve(root,config.hostnameShim,oUrlObj.pathname.replace(/^\//,'').replace(/[^\w\.\/\\]/g,'_'))+(isView?'.html':'');
					
					 fileDir=path.dirname(filePath);
					
					
					// map[oUrl].filePath=filePath;
				}else{
					 filePath=path.resolve(root,oUrlObj.hostname,oUrlObj.pathname.replace(/^\//,'').replace(/[^\w\.\/\\]/g,'_'))+(isView?'.html':'');
					 fileDir=path.dirname(filePath);
					// map[oUrl].filePath=filePath;
				}
			}
			fileDir = replaceToLowerCase(fileDir,"dir");
			filePath = replaceToLowerCase(filePath,"file");
			map[oUrl].filePath=filePath;//filePath;
			
			tIns.add(oUrl);
			// [ Fetch ] http://webresource.ui.sh.ctriptravel.com/code/lizard/2.0/web/lizard.seed.js
			logger.log('[ Fetch ]'.green+' '+tUrl);
			var lizardFileDir = null;
			var lizardFileUrl = null;
			
			if(config.level==1){
				if(tUrl.indexOf('web/lizard.seed')!=-1){
					tUrl = tUrl.replace('web/lizard.seed.js','hybrid/lizard.seed.js');
					tUrl = tUrl.replace('web/lizard.seed.src.js','hybrid/lizard.seed.js');
					lizardFileDir = fileDir
					lizardFileUrl = oUrl;
				}else if (tUrl.indexOf('webapporigin/lizard.seed')!=-1){
					tUrl = tUrl.replace('webapporigin/lizard.seed.js','hybrid/lizard.seed.js');
					tUrl = tUrl.replace('webapporigin/lizard.seed.src.js','hybrid/lizard.seed.js');
					lizardFileDir = fileDir
					lizardFileUrl = oUrl;
				}
			}else if(config.level==2||config.level==3){
				
				if(tUrl.indexOf('web/lizard.seed')!=-1){
					tUrl = tUrl.replace('web/lizard.seed.js','hybrid/lizard.seed.src.js');
					tUrl = tUrl.replace('web/lizard.seed.src.js','hybrid/lizard.seed.src.js');
					lizardFileDir = fileDir
					lizardFileUrl = oUrl;
				}else if (tUrl.indexOf('webapporigin/lizard.seed')!=-1){
					tUrl = tUrl.replace('webapporigin/lizard.seed.js','hybrid/lizard.seed.src.js');
					tUrl = tUrl.replace('webapporigin/lizard.seed.src.js','hybrid/lizard.seed.src.js');
					lizardFileDir = fileDir
					lizardFileUrl = oUrl;
				}
				
			}
			
			
			
			var opts=url.parse(tUrl);
			// opts.agent=null;
			
			opts.agent = new http.Agent({
				maxSockets:1000
			})
			if(!opts.headers)opts.headers = {};
			opts.headers['User-Agent'] = 'Hybird';
			
			var req=http.get(opts,function(res){
				
				if (res.statusCode==200){
					var mimeType=(res.headers['content-type']||'').split(';')[0].trim();
					map[oUrl].mimeType=mimeType;
						
					var buff=new Buffer(0);
					res.on('data',function(tBuff){
						buff=concatBuff(buff,tBuff);
					});
					res.on('end',function(){
						getResource(oUrl,mimeType,buff,tIns,function(buff){
							
							mkdirp(fileDir,function(err){
								if (err){
									error(new Error('Create path error: '+fileDir));
								}else{
									
									// filePath = replaceToLowerCase(filePath,"file");
									//console.log('---------')
									// console.log(filePath)
									fs.writeFileSync(filePath,buff);
									
									copyLizardSrc(lizardFileDir);
									callback&&callback(buff);
									tIns.remove(oUrl);
								}
							});
						});
					});
					res.on('error',function(err){
						setTimeout(function(){
							throw(err);
							// error(err)
						});
						// error('Error fetch url: '+tUrl)
						throw(new Error('Error fetch url: '+tUrl));
					});
				}else{
					// error('Error fetch url: '+tUrl)
					throw(new Error('Error fetch url: '+tUrl));
				}
			});
			req.on('error',function(){
				// error('Fetch url error: '+tUrl)
				throw(new Error('Fetch url error: '+tUrl));
			});
		}else{
			logger.log(('[ Skip  ] '+oUrl).grey);
		}
	}

	function getSpecFlag(oUrl){
		var ret={
			include:false,
			exclude:false
		};
		var len=0;
		for (var key in config.include){
			if (key.length>len && oUrl.slice(0,key.length)==key){
				len=key.length;
				if (config.include[key]){
					ret.include=true;
				}else{
					ret.exclude=true;
				}
			}
		}
		return ret;
	}

	function getResource(oUrl,mimeType,buff,tIns,callback){
		
		
		var resource={};
		if (mimeType=='text/html'){
			// console.log("======getResource======",oUrl)
			htmlResource(oUrl,buff,tIns,callback);
		}else if (mimeType=='text/css'){
			cssResource(oUrl,buff,tIns,callback);
		}else if (mimeType=='text/javascript' || mimeType=='application/x-javascript'){
			// callback&&callback(buff);
			jsResource(oUrl,buff,tIns,callback);
		}else if (/^image\/\w+$/.test(mimeType)){
			callback&&callback(buff);
		}else{
			callback&&callback(buff);
		}
	}

	function htmlResource(oUrl,buff,tIns,callback){
	
		
		var content=buff.toString();
		
		var isTmpl=!/text\/lizard-template/.test(content) && /<%[\s\S]*%>/.test(content);
		// console.log("======htmlResource======\n",isTmpl)
		if (isTmpl){
			var fullTmplObj=tmplPreConvert(content);
			content=fullTmplObj.tmpl;
		}
		
		jsdom.env({
			url:oUrl,
			html:content,
			features:{
				FetchExternalResources:false,
				ProcessExternalResources:false,
				SkipExternalResources:false
			},
			done:function(errs,window){
				
				if (errs){
					for (var i=0;i<errs.length;i++){
						(function(i){
							setTimeout(function(){
								throw(errs[i]);
							});
						})(i);
					}
					throw(new Error('Html parse error: '+oUrl));
				}

				var aFlag=tIns.add();
				var aIns=new task(function(){
					content=/<\/body>/.test(content)?
						window.document.documentElement.outerHTML:
						window.document.body.innerHTML;
					if (isTmpl){
						content=fullTmplObj.restore(content);
					}
					content = htmlMinifier(content);
					callback&&callback(new Buffer(content));
					tIns.remove(aFlag);
				});

				// add base script
				var head=(window.document.getElementsByTagName('head')||[])[0];
				if (head){
					var baseTag=window.document.createElement('base');
					baseTag.href=path.relative(path.dirname(map[oUrl].filePath),config.absRoot).replace(/\\/g,'/');
					if (head.firstChild){
						head.insertBefore(baseTag,head.firstChild);
					}else{
						head.appendChild(baseTag);
					}
				}

				// meta tags
				var els=window.document.getElementsByTagName('meta');
				for (var i=0;i<els.length;i++){
					if (els[i].name){
						reqs.Lizard[els[i].name]=els[i].content;
					}
				}

				// link tags
				var els=window.document.getElementsByTagName('link');
				for (var i=0;i<els.length;i++){
					var rUrl=urlResolve(oUrl,els[i].href);
					els[i].href=rUrl;
					fetchFile(rUrl,tIns);
				}
				// style tags
				var els=window.document.getElementsByTagName('style');
				for (var i=0;i<els.length;i++){
					(function(el){
						var flag=aIns.add();
						cssResource(oUrl,new Buffer(els[i].innerHTML),tIns,function(buff){
							el.innerHTML=buff.toString();
							aIns.remove(flag);
						});
					})(el);
				}
				// inline style
				
				// script
				var els=window.document.getElementsByTagName('script');
				
				for (var i=0;i<els.length;i++){
					
					
					if (els[i].src){
						var rUrl=urlResolve(oUrl,els[i].src);
						var reg = /lizard\.seed\.(src\.)*js.*$/ig;
						if (reg.test(rUrl)) {
							reqs.Lizard["dir"] = rUrl.replace(reg, '');
							
						}
						
						els[i].src=rUrl;
						fetchFile(rUrl,tIns);
						// pdConfig
						var pdConfig=els[i].getAttribute('pdconfig');
							
						if (pdConfig){
							
							
							;(function(oUrl){
								var rUrl=urlResolve(oUrl,pdConfig);
								els[i].setAttribute('pdconfig',rUrl);
								fetchFile(rUrl,tIns,function(){
									reqs.parse(oUrl,rUrl,tIns,function(tUrl){
										map[rUrl].require=tUrl;
									});
								});	
							})(oUrl);
						}
					}else if (els[i].type=='text/lizard-config'){
						// get urlschema
						// els[i].text.replace(/([\'\"]?)url_schema\1\s*:\s*([\'\"])(.*?)\2/g,function(a,b,c,d){
							// map[oUrl].urlSchema=d;
						// });
						var configStr = els[i].text;
						var arr=configStr.match(/([\'\"])?url_schema\1\s*:\s*([\'\"])(.*?)\2/) || configStr.match(/([\'\"])?url_schema\1\s*:\s*\[\s*([\'\"])((.|\s)*?)\2(\s*|,)]/);
						if (arr){
							map[oUrl].urlSchema=eval('ret = {' + arr[0] + '}[\'url_schema\']');
							
						}
						
						// get controller
						els[i].text=els[i].text.replace(/([\'\"]?)controller\1\s*:\s*([\'\"])(.*?)\2/g,function(a,b,c,d){
							var ret='';
							if (d){
								var rUrl=urlResolve(oUrl,d);
								fetchFile(rUrl,tIns);
								ret=b+'controller'+b+':'+c+rUrl+c;
							}else{
								ret=a;
							}
							return ret;
						});
					}else if (els[i].type=='text/lizard-template'){
						(function(el){
							if(el.text){
								var tmplObj=tmplPreConvert(el.text);
								var flag=aIns.add();
								// console.log("======text/lizard-template======",oUrl)
								htmlResource(oUrl,new Buffer(tmplObj.tmpl),tIns,function(buff){
									el.text=tmplObj.restore(buff.toString());
									aIns.remove(flag);
								});
							}
						})(els[i]);
					}else{
						
					}
				}

				// add local source
				/* 调整顺序 by wxj start*/
				var sources=[
					config.hostnameShim+'/lizardlocalroute.js'
					// ,
					// 'hybrid.js'
				];
				var srcDebug = config.srcDebug;
				
				if(srcDebug.open&&reqs.Lizard["dir"]){	
					
					var libs = srcDebug.libs;
					var len = libs.length;
					for (var i=0;i<len-1;i++){
						var lib = libs[i];
						
						sources.push(reqs.Lizard["dir"]+lib);
						createLibsMap(reqs.Lizard["dir"]+lib);
					}
				}
				if(config.weinre){
					sources.push("http://"+ip+":5389/target/target-script-min.js#anonymous");
				}
				
				
				/* 调整顺序 by wxj end*/
				if (baseTag){
					for(var i=sources.length-1;i>=0;i--){
						var sourceTag=window.document.createElement('script');
						sourceTag.type='text/javascript';
						if(!i&&config.weinre){
							sourceTag.setAttribute("LizardWeinre",config.weinre);
							sourceTag.setAttribute("id","LizardLocalroute");
							sourceTag.setAttribute("LizardIP",ip);
							sourceTag.setAttribute("LizardChanal",config.channel);
							
						}
						sourceTag.src=sources[i];
						if (baseTag.nextSibling){
							head.insertBefore(sourceTag,baseTag.nextSibling);
						}else{
							head.appendChild(sourceTag);
						}
					}
				}
			}
		});
	}

	function tmplPreConvert(tmpl){
		var hash={};
		var guid='';
		var re;
		while (1){
			guid=(Math.random()*10000).toFixed(0);
			re=new RegExp('lizard_'+guid+'_\\d+','g');
			if (!re.test(tmpl)){
				break;
			}
		}
		var i=0;
		tmpl=tmpl.replace(/<%[\s\S]*?%>/g,function(a){
			var id='/*lizard_'+guid+'_'+i+'*/';
			hash[i]=a;
			i++;
			return id;
		});

		return {
			tmpl:tmpl,
			restore:function(tmpl){
				var re=new RegExp('\\/?\\*lizard_'+guid+'_(\\d+)\\*\\/?','g');
				return tmpl.replace(re,function(a,b){
					return hash[b]||'';
				});
			}
		};
	}

	function cssResource(oUrl,buff,tIns,callback){
		var content=buff.toString();
		var modifyArr=[];
		var rules=CSSOM.parse(content).cssRules;
		for (var i=0;i<rules.length;i++){
			var styles=rules[i].style;
			if (styles){
				// handle backgournd
				var keys=['background','background-image','-webkit-border-image','border-image'];
				for (var j=0;j<keys.length;j++){
					var style=styles[keys[j]];
					if (style){
						style.replace(/url\s*\(\s*([\'\"]?)(.+?)\1\s*\)/,function(a,b,c){
							var rUrl=c.trim();
							if (!/^data/.test(rUrl)){
								rUrl=urlResolve(oUrl,rUrl);
								fetchFile(rUrl,tIns);
								modifyArr.push({
									start:styles.__starts,
									end:rules[i].__ends,
									find:a,
									replacement:'url("'+rUrl+'")'
								});
								return 'url("'+rUrl+'")';
							}
						});
					}
				}
			}
		}
		for (var i=modifyArr.length-1;i>=0;i--){
			content=content.slice(0,modifyArr[i].start)+content.slice(modifyArr[i].start,modifyArr[i].end).replace(modifyArr[i].find,modifyArr[i].replacement)+content.slice(modifyArr[i].end);
		}
		content = cssMinifier(content);
		// buff=new Buffer(el.innerHTML);
		buff=new Buffer(content);
		callback&&callback(buff);
	}

	var reqs={
		paths:{},
		converts:[],
		require:{
			_config:{},
			baseUrl:'',
			config:function(opts){
				extend(this._config,opts);
			}
		},
		Lizard:{
			dir:'',
			appBaseUrl:'',
			webresourceBaseUrl:''
		},
		sandbox:function(){
			return {
				require:copy(this.require),
				Lizard:copy(this.Lizard),
				define:function(){
				
				}
			};
		},
	//	add:function(mod,path){
	//		
	//	},
	//	fetch:function(mod){
	//		if (!(mod in this.maps)){
	//			
	//		}
	//	},
		_parsed:{},
		parse:function(pUrl,oUrl,tIns,callback){
			logger.log('[ PdCfg ]'.cyan+' '+oUrl);

			var filePath=map[oUrl].filePath;
			// console.log(filePath)
			
			if (oUrl in this._parsed){
				setTimeout(function(){
					callback && callback(filePath);
				});
				return;
			}else{
				this._parsed[oUrl]=true;
			}
			
			var content=fs.readFileSync(filePath).toString();
			var sandbox=this.sandbox();
			console.log("----------")
			console.log(sandbox)
			try{
				vm.runInNewContext(content,sandbox);
			}catch (e){
				throw(new Error('Error pdConfig: '+oUrl));
			}
			logger.log('----------------')
			for(var n in sandbox){
				logger.log(n)
			}
			logger.log(sandbox.toString());
			
			sandbox.require.baseUrl=sandbox.require._config.baseUrl||'';
			
			if (sandbox.require.baseUrl){
				logger.log('[ Warn  ]'.red+' Found Require Base Url: '+sandbox.require.baseUrl);
			}
			
			var rIns=new task(function(){
				if (paths){
					extend(reqs.paths,paths);
				}
				/*
					由于hybrid将路径都已替换，故需删除baseurl
				*/
				delete sandbox.require._config.baseUrl;
				
				
				
				var copy_config = {};         
				for (var attr in sandbox.require._config) {             
					if (sandbox.require._config.hasOwnProperty(attr)){
						 copy_config[attr] = sandbox.require._config[attr];         
					}
				}   
				for(var p in copy_config.paths){
					if (copy_config.paths.hasOwnProperty(p)){
						 copy_config.paths[p] = replaceToLowerCase(copy_config.paths[p]);         
					}
				}
				
				
				var content='require.config('+JSON.stringify(copy_config)+');';
				
				
				content = uglifyOne(content);
				filePath = replaceToLowerCase(filePath);         
				fs.writeFileSync(filePath,content);
				callback && callback(filePath);
			});

		
		
			var paths=sandbox.require._config.paths;
			
			if (paths){
				for (var key in paths){
					var oUrl=paths[key];
					var tUrl=oUrl;
					if (!/\.html$/i.test(oUrl)&&!/\.js$/i.test(oUrl)){
						tUrl=oUrl+'.js';
					}
					if (/^[a-z]+:\/\//.test(tUrl)){
						// nothing to do
					}else if (/^\//.test(tUrl)){
						tUrl=urlResolve(pUrl,tUrl);
					}else{
						tUrl=sandbox.require.baseUrl+tUrl;
						tUrl=urlResolve(pUrl,tUrl);
					}
					if (/\.html$/i.test(oUrl)){
						this.converts.push(tUrl);
					}
					(function(key,oUrl,tUrl){
						rIns.add(tUrl);
						fetchFile(tUrl,tIns,function(){
							   
							paths[key]=map[tUrl].filePath;
							paths[key]=paths[key].replace(/\.js$/,'');
							paths[key]=path.relative(config.absRoot,paths[key]).replace(/\\/g,'/');
							rIns.remove(tUrl);
						});
					})(key,oUrl,tUrl);
				}
			}
		}
	};

	function jsResource(oUrl,buff,tIns,callback){
		
		var content=buff.toString();
		
		
	//	var astTree=esprima.parse(content,{
	//		range:true
	//	});
	//
	//	walkAstTree(astTree,function(astNode){
	//		if (astNode.type=='CallExpression' && astNode.callee && astNode.callee.type=='Identifier' && astNode.callee.name=='define'){
	//			var args=astNode.arguments.slice(0);
	//			if (args[0].type=='Literal'){
	//				reqs.add(args.shift(),oUrl);
	//			}
	//			if (args[0].type=='ArrayExpression'){
	//				var amds=args.shift().elements;
	//				for (var i=0;i<amds.length;i++){
	////					reqs.fetch(content.slice.apply(content,amds[i].range));
	//				}
	//			}
	//		}
	//	});
		
		content=content.replace(/([\'\"])(text!)(\w+?)\1/g,function(a,b,c,d){
			logger.log('[ Warn  ]'.red+' Require Text: '+c+d);
			return b+d+b;
		});
		content = uglifyOne(content);
		setTimeout(function(){
			buff=new Buffer(content);
			callback&&callback(buff);
		});
	}

	function walkAstTree(astNode,callback){
		switch (typeof astNode){
			case 'array':
				for (var i=0;i<astNode.length;i++){
					if (astNode[i]){
						walkAstTree(astNode[i],callback);
					}
				}
				break;
			case 'object':
				callback && callback(astNode);
				for (var key in astNode){
					var node=astNode[key];
					if (node){
						walkAstTree(node,callback);
					}
				}
				break;
		}
	}

	function replaceLinks(lUrl,mimeType){
				
		var rUrl=config.absRoot;
		if (mimeType=='text/html'){
			rUrl=config.absRoot;
		}else if (mimeType=='text/css'){
			rUrl=path.dirname(lUrl);
		}
		if (mimeType=='text/html' || mimeType=='text/css'){
			logger.log('[  Map  ]'.yellow+' '+lUrl);
			var content=fs.readFileSync(lUrl).toString();
			
			for (var oUrl in map){
				var re=new RegExp(oUrl.toReString(),'g');
				
				var replacement=path.relative(rUrl,map[oUrl].filePath).replace(/\\/g,'/');
			
				replacement = replaceToLowerCase(replacement)
				/*
					实现内容中引用的url地址替换
				*/
				
				if((replacement.indexOf(".js")!=-1)&&config.weinre){
					replacement=path.join(ip+":5389",config.channel,replacement);
					replacement = replacement.replace(/\\/g,'/');
					replacement = "http://"+replacement;
					
					
				}
				
				content=content.replace(re,replacement);
			}
			/*
				对内容进行mini化
			*/
			fs.writeFileSync(lUrl,content);
		}
	}

	function convertHtmlToAmd(lUrl,mimeType){
		if (mimeType=='text/html'){
			var tUrl=lUrl+'.js';
			logger.log('[  AMD  ]'.yellow+' '+tUrl);
			var content=fs.readFileSync(lUrl).toString();
			content='define(function(){return ('+JSON.stringify(content)+');});';
			/*
				对内容进行mini化
			*/
			content = uglifyOne(content);
			
			
			
			fs.writeFileSync(tUrl,content);
			if(config.isDeleteHtml){
				fs.exists(lUrl, function (exists) {
					if(exists)fs.unlinkSync(lUrl);
				});
			}
		}
	}
}
