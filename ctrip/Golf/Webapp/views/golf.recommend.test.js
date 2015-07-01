/**
 * Created by sq_xu on 14-7-16.
 */
define([ 'text!templates/golf.recommend.html'],
    function ( pageTemplate ) {
        "use strict";
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
        console.log(pageTemplate)
        return groupView;
    });


