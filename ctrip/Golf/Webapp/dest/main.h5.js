define('text',["module"],function(a){var b,c,d,e,f=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],g=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,h=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,i="undefined"!=typeof location&&location.href,j=i&&location.protocol&&location.protocol.replace(/\:/,""),k=i&&location.hostname,l=i&&(location.port||void 0),m=[],n=a.config&&a.config()||{};return b={version:"2.0.5+",strip:function(a){if(a){a=a.replace(g,"");var b=a.match(h);b&&(a=b[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:n.createXhr||function(){var a,b,c;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(b=0;3>b;b+=1){c=f[b];try{a=new ActiveXObject(c)}catch(d){}if(a){f=[c];break}}return a},parseName:function(a){var b,c,d,e=!1,f=a.indexOf("."),g=0===a.indexOf("./")||0===a.indexOf("../");return-1!==f&&(!g||f>1)?(b=a.substring(0,f),c=a.substring(f+1,a.length)):b=a,d=c||b,f=d.indexOf("!"),-1!==f&&(e="strip"===d.substring(f+1),d=d.substring(0,f),c?c=d:b=d),{moduleName:b,ext:c,strip:e}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,c,d,e){var f,g,h,i=b.xdRegExp.exec(a);return i?(f=i[2],g=i[3],g=g.split(":"),h=g[1],g=g[0],!(f&&f!==c||g&&g.toLowerCase()!==d.toLowerCase()||(h||g)&&h!==e)):!0},finishLoad:function(a,c,d,e){d=c?b.strip(d):d,n.isBuild&&(m[a]=d),e(d)},load:function(a,c,d,e){if(e.isBuild&&!e.inlineText)return void d();n.isBuild=e.isBuild;var f=b.parseName(a),g=f.moduleName+(f.ext?"."+f.ext:""),h=c.toUrl(g),m=n.useXhr||b.useXhr;!i||m(h,j,k,l)?b.get(h,function(c){b.finishLoad(a,f.strip,c,d)},function(a){d.error&&d.error(a)}):c([g],function(a){b.finishLoad(f.moduleName+"."+f.ext,f.strip,a,d)})},write:function(a,c,d){if(m.hasOwnProperty(c)){var e=b.jsEscape(m[c]);d.asModule(a+"!"+c,"define(function () { return '"+e+"';});\n")}},writeFile:function(a,c,d,e,f){var g=b.parseName(c),h=g.ext?"."+g.ext:"",i=g.moduleName+h,j=d.toUrl(g.moduleName+h)+".js";b.load(i,d,function(){var c=function(a){return e(j,a)};c.asModule=function(a,b){return e.asModule(a,j,b)},b.write(a,i,c,f)},f)}},"node"===n.env||!n.env&&"undefined"!=typeof process&&process.versions&&process.versions.node?(c=require.nodeRequire("fs"),b.get=function(a,b){var d=c.readFileSync(a,"utf8");0===d.indexOf("﻿")&&(d=d.substring(1)),b(d)}):"xhr"===n.env||!n.env&&b.createXhr()?b.get=function(a,c,d,e){var f,g=b.createXhr();if(g.open("GET",a,!0),e)for(f in e)e.hasOwnProperty(f)&&g.setRequestHeader(f.toLowerCase(),e[f]);n.onXhr&&n.onXhr(g,a),g.onreadystatechange=function(){var b,e;4===g.readyState&&(b=g.status,b>399&&600>b?(e=new Error(a+" HTTP status: "+b),e.xhr=g,d(e)):c(g.responseText))},g.send(null)}:"rhino"===n.env||!n.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?b.get=function(a,b){var c,d,e="utf-8",f=new java.io.File(a),g=java.lang.System.getProperty("line.separator"),h=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f),e)),i="";try{for(c=new java.lang.StringBuffer,d=h.readLine(),d&&d.length()&&65279===d.charAt(0)&&(d=d.substring(1)),c.append(d);null!==(d=h.readLine());)c.append(g),c.append(d);i=String(c.toString())}finally{h.close()}b(i)}:("xpconnect"===n.env||!n.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(d=Components.classes,e=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),b.get=function(a,b){var c,f,g={},h=new FileUtils.File(a);try{c=d["@mozilla.org/network/file-input-stream;1"].createInstance(e.nsIFileInputStream),c.init(h,1,0,!1),f=d["@mozilla.org/intl/converter-input-stream;1"].createInstance(e.nsIConverterInputStream),f.init(c,"utf-8",c.available(),e.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),f.readString(c.available(),g),f.close(),c.close(),b(g.value)}catch(i){throw new Error((h&&h.path||"")+": "+i)}}),b});

define('text!templates/index.html',[],function () { return '<div class="body">\r\n    <div class="banner_box"  id="js_detail_pic_slide">\r\n    </div>\r\n\r\n    <table class="tab_container">\r\n        <tbody>\r\n        <tr>\r\n            <td>\r\n                <div class="booking_tab golf_tab" data-name="booking">\r\n                    <ul class="tab_content">\r\n                        <li class="main_title">订场</li>\r\n                        <li class="feature">快速预订</li>\r\n                    </ul>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <div class="package_tab golf_tab" data-name="package">\r\n                    <ul class="tab_content">\r\n                        <li class="main_title">套餐</li>\r\n                        <li class="feature">球场+酒店</li>\r\n                    </ul>\r\n                </div>\r\n            </td>\r\n\r\n            <td>\r\n                <div class="travel_tab golf_tab" data-name="travel">\r\n                    <ul class="tab_content">\r\n                        <li class="main_title">旅行</li>\r\n                        <li class="feature">精选路线</li>\r\n                    </ul>\r\n                </div>\r\n            </td>\r\n        </tr>\r\n        </tbody>\r\n    </table>\r\n\r\n    <div style="display: none;" class="tab_loading">\r\n        <div style="" class="cui-breaking-load"> <div class="cui-i cui-m-logo"></div> <div class="cui-i cui-w-loading"></div></div>\r\n    </div>\r\n\r\n    <div class="homerecommend">\r\n        <div class="golf_product">\r\n            <ul>\r\n                <li>\r\n                    <a href="##" data-id="1792881">\r\n                        <div class="product_pic">\r\n                            <img src="http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/package_recommed.png">\r\n                        </div>\r\n                        <div class="desc_container">\r\n                            <div class="left">\r\n                                <p class="main_title">上海2日1晚高尔夫套餐</p>\r\n                                <p class="subtitle">华凯+棕榈滩2场球</p>\r\n                            </div>\r\n                            <div class="right">\r\n                                <span class="price"><dfn class="price_unit">¥</dfn>1540<dfn class="price_suffix">起</dfn></span>\r\n                            </div>\r\n                            <div class="clear"></div>\r\n                        </div>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a href="###" data-id="1759908">\r\n                        <div class="product_pic">\r\n                            <img src="http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/travel_recommed.png">\r\n                        </div>\r\n                        <div class="desc_container">\r\n                            <div class="left">\r\n                                <p class="main_title">大理+丽江5日高尔夫之旅</p>\r\n                                <p class="subtitle">风花雪月 古城印象</p>\r\n                            </div>\r\n                            <div class="right">\r\n                                <span class="price"><dfn class="price_unit">¥</dfn>5819<dfn class="price_suffix">起</dfn></span>\r\n                            </div>\r\n                            <div class="clear"></div>\r\n                        </div>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n\r\n\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n';});

define('views/index.test',['text!templates/index.html'],
    function (indexTemplate, cslide) {
    
    var GeoLocationWidget, getLocation, geoLocation,  $g_depart, $g_dest, prodListParam, imgsData;
    var defaultDepartCity = "上海", defaultDepartCityId = "2";
    var groupView = Backbone.View.extend({
        el: $('#main'),
        render: function () {
            this.$el.html(indexTemplate);
        },
      
        initialize: function() {  
            this.render();        
        },
        events: {
            "click .golf_tab":"goToGolfLst",
            "click .golf_product a":"goToGolfLst"
        },
        onLoad: function () {
            var self = this;
            /*TODO*/
            imgsData = [{name:"name1",imgUrls:[{key:"s500*280",value:"http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/banner1.png",onClick:function(){self.goToDetailById(1652269)}}]},
                {name:"name2",imgUrls:[{key:"s500*280",value:"http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/banner2.png",onClick:function(){self.goToDetailById(1789418)}}]},
                {name:"name3",imgUrls:[{key:"s500*280",value:	"http://webresource.c-ctrip.com/ResFunOnline/R3/mobile_image/banner3.png",onClick:function(){self.goToDetailById(1757584)}}]}];
            this.slide();
            this.turning();
        },
        showToast: function (msg, fun) {
            if (!fun) {
                fun = function () { }
            }
            
            this.toast.show(msg, 2, fun, true);
        },
        goToLst: function(prdcategory){
            if(isInApp){
                Guider.cross({
                    path:"golf",
                    param:"index.html#golf.list?prdcategory=" + prdcategory + "&from=/webapp/golf/index.html"
                });
            }else{
                this.forward("golf.list?prdcategory=" + prdcategory + "&from=/webapp/golf/index.html");
            }

        },
        goToGolfLst: function(){
            /*TODO*/
            window.location.href = ("#golf.recommend.test").replace(/^#+/, "#");
        },


        onShow: function () {

        },
        onHide: function () {
        },
       
        slide: function () {
            var imgs = [],
                imgsArry = [],
                container = this.$el.find('#js_detail_pic_slide');
            //根据imgsData刷选轮播图片src
            _.each(imgsData, function (index, i) {
                imgsArry.push(imgsData[i].imgUrls[0].value);
            });
            _.each(imgsArry, function (k, v) {
                imgs.push({
                    title: imgsData[v].imgName,
                    src: k,
                    link: '',
                    onClick:imgsData[v].imgUrls[0].onClick
                });
            });
            if (!imageSlide) {
                var imageSlide = new cslide({
                    container: container,
                    images: imgs,
                    autoPlay: true,
                    loop: true,
                    imageSize: { width: 500, height: 280 },
                    defaultImageUrl: 'http://pic.c-ctrip.com/vacation_v2/h5/group_travel/pic_none.png'
                });
                imageSlide.play();
            }
        }
    });
    return groupView;
});

define('text!templates/golf.recommend.html',[],function () { return '<div class="recommend_container">\n    <div>\n        <div class="recommend_box">\n            邀请您的朋友一起打高尔夫！下载爱玩高尔夫，注册并绑定手机成功后，进入个人中心->设置->推荐爱玩高尔夫，输入您的推荐码\n            <span class = "recommend_code"><%= data.recommendCode %></span>， 您的朋友就能立即获得<span class="recommend_award"><%= data.award %>元抵用券</span>。\n        </div>\n\n        <div class="center">\n            <div class="share_icon weixin_share_icon" id="friends_share">\n                <div class="share_title gray_word">微信好友</div>\n            </div>\n            <div class="share_icon friends_share_icon" id="weixin_share">\n                <div class="share_title gray_word">朋友圈</div>\n            </div>\n         <!--   <div class="share_icon email_share_icon" id="email_share">\n                <div class="share_title">邮箱</div>\n            </div>\n            <div class="share_icon message_share_icon" id="message_share">\n                <div class="share_title">短信</div>\n            </div>-->\n        </div>\n\n\n        <%if(!!data.canRecommendCoe && !data.recommendByCode){ %>\n        <div class="share_br"></div>\n        <div class="friend_recommend">\n            <div>\n                <div class="fr_word">输入邀请人推荐码</div>\n                <input type="text" class="input_text" id="recommend_code" placeholder="输入邀请人推荐码">\n                <button href="javascript:;" class="confirm_btn" id="recommend_confirm">确定</button>\n            </div>\n        </div>\n        <%}%>\n    </div>\n    <div class="clear"></div>\n</div>\n';});

/**
 * Created by sq_xu on 14-7-16.
 */
define('views/golf.recommend.test',[ 'text!templates/golf.recommend.html'],
    function ( pageTemplate ) {
        
        var recommendData = {
            "recommendCode":"6sv6j",
             "award" : 100,
            "username": "user",
            "recommendByCode" : "",
            "canRecommendCoe" : 1
        };
        var groupView = Backbone.View.extend({
            el: $('#main'),
            initialize: function() {  
                this.render(recommendData);  
            },
            initTemplate: function () {
                return _.template(pageTemplate);
            },
            render: function (data) {

                var tpl = this.initTemplate();

                this.$el.html(tpl({
                    "data": data
                }));

                this.elsBox ={
                    recommend_text_tpl: this.$el.find('#recommend_text_tpl')
                };

                this.initShareData();
            },

            getEmailTxtMsg : function(data){
                var tpl = ' 邀请您的朋友一起打高尔夫！点击链接 <%= data.downloadLink %> 下载爱玩高尔夫，注册并绑定手机成功后，进入个人中心->设置->推荐爱玩高尔夫，输入我的推荐码\
                    <%= data.recommendCode %>,  您的朋友就能立即获得<%= data.award %>元抵用余额.';
                var tip = _.template(tpl);
                return tip({"data": data });
            },

            onCreate: function () {
                this.injectHeaderView();

            },
            events: {
                'click #friends_share': "friendsShare",
                'click #weixin_share': "weixinShare",
                'click #email_share': "emailShare",
                'click #message_share': "messageShare",
                'click #recommend_confirm': 'recommend'
            },
            onLoad: function () {
                var self = this;
                this.headerview.set({
                    title: '推荐爱玩高尔夫',
                    back: true,
                    view: this,
                    btn: {title: "推荐记录", id: 'recomdHisBtn', classname: 'header_r'}, //设置头部右边的按钮，例如：完成按钮
                    events: {
                        returnHandler: function () {
                            var backpage =  self.getQuery('from');
                            if (backpage == 'nopage') {
                                isInApp ? Guider.backToLastPage({}) : self.back()
                            }
                            else if (/\/webapp\/(\S+)\/(\S+)/.test(backpage)) {
                                var _fromParams = backpage.match(/\/webapp\/(\S+)\/(\S+)/);
                                isInApp ? Guider.cross({ path: _fromParams[1], param: _fromParams[2] }) : window.location = _fromParams[0];
                            }
                            else {
                                this.back((backpage || '#index'));
                            }
                        }
                    },
                    commit: {id: 'recomdHisBtn', callback: function(){ self.forward("#golf.recommend.users");}}
                });
                $("title").html("推荐爱玩高尔夫");
                this.headerview.show();
                var IsNonLogin = IsNonUserLogin();
                if((!!userStore && !!userStore.isLogin() ) || IsNonLogin){
                    //CtripUtil.app_log("recommendCode:" + user.recommendCode, user.recommendCode);
                    recommendData = {
                        "recommendCode":user.recommendCode,
                        "award" : 100,
                        "username":user.UserName,
                        "recommendByCode" : user.recommendByCode,
                        "canRecommendCoe" : user.canRecommendCoe
                    };

                }else{
                    //登入失效返回登入
                    var path = location.pathname;

                    Member.memberLogin({
                        param: "from="+ path +"#golf.recommend",
                        callback: function (userData) {
                            window.location.reload();
                        }
                    });
                    return;
                }
                this.render(recommendData);
                this.turning();

            },
            onShow: function () {},

            initShareData : function(){
                var shareData = {};
                shareData.title = "邀请朋友一起打高尔夫啦！";
                var param = encodeURIComponent(JSON.stringify(recommendData));
                recommendData.downloadLink = 'http://m.ctrip.com/webapp/golf/index.html#golf.recommend.landing?param='+ param;

                shareData.text = this.getEmailTxtMsg(recommendData);
                shareData.linkUrl = 'http://m.ctrip.com/webapp/golf/index.html#golf.recommend.landing?param='+ param;//TODO H5发布链接
                shareData.isIOSSystemShare = false;
            },

            recommend: function(e){
                var self = this;
                var $currTarget = $(e.currentTarget);
                var recommend_code = $("#recommend_code").val();
                if(!recommend_code){
                    self.showToast("请输入推荐码！");
                    return;
                }

                self.recommendModel.param = {
                    "token": (!!headInfo && !!(headInfo.auth)) ? headInfo.auth : "", //用户auth
                    "recommendCode":recommend_code//被推荐码
                };

                self.showLoading();
                self.recommendModel.execute(function (data) {
                    if(data.code == 0){
                        user.recommendByCode =  self.recommendModel.param.recommendCode;
                        recommendData = {
                            "recommendCode":user.recommendCode,
                            "award" : 100,
                            "recommendByCode" : user.recommendByCode,
                            "canRecommendCoe" : user.canRecommendCoe
                        };
                        IWanUtil.app_call_recommendByCode_update(user.recommendByCode);
                        self.render(recommendData);
                        self.showToast("保存推荐码成功！");
                        self.hideLoading();
                    }else{
                        self.showToast(data.message);
                        self.hideLoading();
                    }
                });

            },
            onHide: function () {}
        });
        0
        return groupView;
    });



require.config({
    baseUrl: "./",
    paths: {
        'GolfModel': 'models/golfModel',
        'GolfStore': 'models/golfStore',
        'TourModel': 'models/tourModel',
        'TourStore': 'models/tourStore', /*TODO*/
        'VaBaseView': 'res/scripts/views/BaseView',
        //公共页面
        'CPageStore': '../cpage/models/cpagestore',
        'text':'res/libs/require.text'
    },
    urlArgs: 'v=' + window.TOUR_VER // 修改这里的版本号
})
/*
require([ 'App'], function (App) {
    new App({
        'defaultView': 'index', //指定了访问没有配置hash值时。，默认访问的页面
        'viewRootPath': 'views/', //制定了view的路径
        'animatSwitch': false
    });
});*/
;
define("main", function(){});

