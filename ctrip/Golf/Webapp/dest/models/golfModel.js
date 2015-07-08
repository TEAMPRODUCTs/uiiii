define(["c","cModel","cBase","CommonStore","GolfStore","res/scripts/util","cUtility"],function(a,b,c,d,e,f,g){var h={},i=new c.Class(b,{__propertys__:function(){var a,b,c=f.getEnvCode(g);if(0==c)a="mobile.api.fun.fat62.qa.nt.ctripcorp.com:8080",b="fun-golf-mobile/";else if(1==c)a="mobile.api.fun.ctripcorp.com",b="fun-golf-mobile/";else if(-1==c){var e=d.UserStore.getInstance(),h=e.getUser();a=h&&h.domain?h.domain:"172.16.130.7:8080",b=h&&h.path?h.path:"fun-golf-mobile/"}else this.protocol="https",a="sec-m.ctrip.com",b="restapi/fun-golf-mobile/";this.env=c,this.baseurl={domain:a,path:b},this.method="POST",this.param={},this.result=null},initialize:function($super,a){$super(a)},vaGet:function(a){return f.memoryCache.get(a)},vaGetCache:function(a){return this.vaGet(a||this._buildurl())},vaSet:function(a,b){return f.memoryCache.set(a,b)},vaRemove:function(a){return f.memoryCache.remove(a)},vaExec:function(a){function b(b,d){return b||(c(d),f.vaRemove(a.cacheKey)),b}function c(b){var c=e[0];"[object Object]"!==Object.prototype.toString.call(c)&&(c={originError:c}),c.errmsg=b||c.errmsg||c.msg,a.onError&&a.onError.call(g,c)}function d(b){a.onAlways&&a.onAlways.apply(g,b)}a=_.extend({cacheInMemory:!0,cacheKey:this._buildurl()},a);var e,f=this,g=a.scope||this;return this.execute(function(h){e=arguments,0==h.errno?(a.cacheInMemory&&f.vaSet(a.cacheKey,h.data),a.onComplete&&a.onComplete.call(g,h.data,b)):c(),d(e)},function(){e=arguments,c(),d(e)},a.ajaxOnly,g,a.onAbort)},_buildurl:function(){return this.protocol+"://"+this.baseurl.domain+"/"+this.baseurl.path+("function"==typeof this.url?this.url():this.url)+f.paramStringify(this.param)}});h.SubmitOrderModel=new c.Class(i,{__propertys__:function(){this.url="v2/:token/orders/:orderNo/submit/:isThird",this.param={},this.result=null,this.method="GET"},setParameter:function(a,b,c){this.url=this.url.replace(":token",a),this.url=this.url.replace(":orderNo",b),this.url=this.url.replace(":isThird",c)},initialize:function($super,a){$super(a)}}),h.PkgTravelsListModel=new c.Class(i,{__propertys__:function(){this.url="/v1/tourProducts",this.param={productCategory:"2",cityID:"2",startCityID:"2",sortType:"D",sortDirection:"DESC",pageIndex:1,pageSize:20},this.method="GET",this.result=null},initialize:function($super,a){$super(a)}}),h.CityListModel=new c.Class(i,{__propertys__:function(){this.url="/v1/tourProductCities",this.param={productCategory:1},this.result=null,this.method="GET"},initialize:function($super,a){$super(a)}}),h.RecommendModel=new c.Class(i,{__propertys__:function(){this.url="/v2/users/recommend",this.param={token:"",recommendCode:""},this.result=null,this.method="GET"},initialize:function($super,a){$super(a)}}),h.RecommendUsersModel=new c.Class(i,{__propertys__:function(){this.url="/v2/recommendUsers",this.param={token:"",pagerOffset:0,pagerPerPage:100,sortType:"D",sortDirection:"ASC"},this.result=null,this.method="GET"},initialize:function($super,a){$super(a)}});var j=new c.Class(i,{__propertys__:function(){this.method="GET";var a=d.HeadStore.getInstance().get();this.authString=g.isInApp()?a.auth:""},setGameAccessCode:function(a,b){this.gameID=a,this.url=this.url.replace(":id",a),b?this.param.passcode=b:this.authString&&(this.param.auth_string=this.authString),this.fullParam=$.extend({},this.param),this.fullParam.game_id=this.gameID},initialize:function($super,a){$super(a)},load:function(a,b){var c=this.result.get();c&&c.gameID===this.gameID&&c.data.version?this.param.version=c.data.version:delete this.param.version,this.execute(function(d){switch(d.code){case void 0:a(d,!0),this.result.set({gameID:this.gameID,data:d});break;case 304:a(c.data,!1);break;default:b&&b(d.message)}},function(){b&&b("无法获取计分数据。")})},refresh:function(a,b){this.load(a,b)}});return h.LeaderBoardSummaryModel=new c.Class(j,{__propertys__:function(){this.url="games/:id/leader_board/summary",this.result=e.LeaderBoardSummaryStore.getInstance()},initialize:function($super,a){$super(a)},deletePlayer:function(b,c,d,e){var f=this,g=this.protocol+"://"+this.baseurl.domain+"/"+this.baseurl.path+"games/"+this.gameID+"/leader_board/details/"+b.toString()+"?auth_string="+this.authString,h=new a.ui.Alert({title:"提示信息",message:"您确定要删除此参赛人？",buttons:[{text:"取消",click:function(){this.hide(),e&&e()},type:a.ui.Alert.STYLE_CANCEL},{text:"确定",click:function(){f.executeDelete(g,c,d),this.hide()},type:a.ui.Alert.STYLE_CONFIRM}]});h.show()},deleteGame:function(b,c,d){var e=this,f=this.protocol+"://"+this.baseurl.domain+"/"+this.baseurl.path+"games/me/"+this.gameID+"?auth_string="+this.authString,g=new a.ui.Alert({title:"提示信息",message:"您确定要删除此次参赛记录？",buttons:[{text:"取消",click:function(){this.hide(),d&&d()},type:a.ui.Alert.STYLE_CANCEL},{text:"确定",click:function(){e.executeDelete(f,b,c),this.hide()},type:a.ui.Alert.STYLE_CONFIRM}]});g.show()},executeDelete:function(a,b,c){$.ajax({url:a,type:"DELETE",success:function(a){a.code?c(a.message):b()},error:function(a,b,d){c(d)}})}}),h.LeaderBoardModel=new c.Class(j,{__propertys__:function(){this.url="games/:id/leader_board/details",this.result=e.LeaderBoardStore.getInstance()},initialize:function($super,a){$super(a)}}),h});