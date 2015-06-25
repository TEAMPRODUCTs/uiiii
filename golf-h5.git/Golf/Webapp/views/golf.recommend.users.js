/**
 * Created by sq_xu on 14-8-8.
 */
define(['libs', 'c', 'cBasePageView', 'GolfModel', 'GolfStore','CommonStore', 'text!templates/golf.recommend.users.html','cUtilityCrypt', 'cWidgetFactory','cWidgetGuider', 'cWidgetMember'],
    function (libs, c, pageview, golfModel, golfStore, commonStore, pageTemplate, Crypt, cWidgetFactory ) {
        "use strict";
        var  userStore = commonStore.UserStore.getInstance();
        var user = userStore.getUser();
        var headStore = commonStore.HeadStore.getInstance();
        var headInfo = headStore.get();
        var isInApp =  c.utility.isInApp();
        var onceCount = 100, countSum = 0, addmoreLoading ,//addmoreLoading 0：未加载，1：正在加载，2：全部加载完毕
            $baseLoad , renderDatas, showNext, currentScroll , showmore;
        var testData = {"count" : 17,

            "totAmount" : 11150,
            "recommendUsers" : [
                {
                    "userName" : "张三1",

                    "mobilePhone" : "13388888888",

                    "play" : 1,

                    "amount" : 20
                }
            ]
        };
        var groupView = pageview.extend({
            recommendUsersModel: golfModel.RecommendUsersModel.getInstance(),
            pageid : '',
            hpageid : '',
            initTemplate: function () {
                return _.template(pageTemplate);
            },
            render: function (data) {
                var tpl = this.initTemplate();

                this.$el.html(tpl({
                    "data": data
                }));
            },
           onCreate: function () {
                this.injectHeaderView();
            },
            events: {
                "click .try_again": "tryAgain"
            },
            onShow: function(){

            },
           onLoad: function(){
               var self = this;
               $baseLoad = this.$el.find('.base_loading');
               this.headerview.set({
                    title: '推荐记录',
                    back: true,
                    view: this,
                    events: {
                        returnHandler: function () {
                            this.back();
                        }
                    }
                });
                showNext = function () { self.onWindowScroll(self); }
                this.headerview.show();
                this.getRecommendUsers();
                this.turning();
            },
            getRecommendUsers: function(){
                var self = this;
                self.recommendUsersModel.param = {
                    "token": (!!headInfo && !!(headInfo.auth)) ? headInfo.auth : "10020030001", //用户auth
                    "pagerOffset": 0, //分页偏移,从0开始
                    "pagerPerPage": onceCount, //每页显示多少条，最多100
                    "sortType": "D", //排序类型(D--默认)
                    "sortDirection":"ASC" //排序方向，大写DESC，ASC
                };
                self.showLoading();
                self.recommendUsersModel.execute(function (data) {
                    //data = testData;//TODO
                    renderDatas = data;
                    $(window).bind("scroll", showNext);
                    self.render(data);
                    if(data.recommendUsers && !!data.recommendUsers && data.recommendUsers.length == onceCount){
                        addmoreLoading = 0;
                    }else{
                        addmoreLoading = 2;
                    }
                    self.hideLoading();
                },function(errorInfo){
                    self.hideLoading();
                    $(".wireless_failure").show();
                });
            },
            tryAgain: function(){
                this.onLoad();
            },
            onWindowScroll: function (self) {
                //addmoreLoading的值：0：未加载，1：正在加载，2：全部加载完毕
                if (!!renderDatas.recommendUsers && !$baseLoad.height() && !addmoreLoading) {
                    $baseLoad.show()
                }

                function showMore() {
                    var checkHeight = $("#headerview")[0].clientHeight + $(".recommend_users_ul")[0].clientHeight;

                    if (currentScroll + $(window).height() > checkHeight) {
                        console.log("scrollDown");
                        !addmoreLoading && renderDatas.recommendUsers && self.addmore()
                    }
                }

                if (addmoreLoading == 2) {
                    $(window).unbind("scroll", showNext);
                    !!renderDatas.recommendUsers && $(".no_more").show();
                }
                else {
                    currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    // 300毫秒延时，防止连续请求
                    clearTimeout(showmore);
                    showmore = setTimeout(showMore, 300);
                }
            },
            addmore: function(){
                countSum += onceCount;
                var self = this;
                self.recommendUsersModel.param = {
                    "token": (!!headInfo && !!(headInfo.auth)) ? headInfo.auth : "10020030001", //用户auth
                    "pagerOffset": countSum /onceCount, //分页偏移,从0开始
                    "pagerPerPage": onceCount, //每页显示多少条，最多100
                    "sortType": "D", //排序类型(D--默认)
                    "sortDirection":"ASC" //排序方向，大写DESC，ASC
                };
                self.showLoading();
                self.recommendUsersModel.execute(function (data) {
                    if(data.recommendUsers && !!data.recommendUsers){
                        var tpl = '<%_.each(data.recommendUsers, function(v,k){%>\
                            <li>\
                            <span><span class="name"><%=v.userName%></span>\
                            <%if(!!v.play){%>\
                            <span class="experienced">已体验</span></span>\
                            <span class="price_amount">+<%=v.amount%></span>\
                            <%}%>\
                            </li>\
                            <%})%>';
                        var template = _.template(tpl);
                        var vList = $(template({ data: data }));
                        self.$el.find(".recommend_users_ul").append(vList);
                        renderDatas.recommendUsers = (renderDatas.recommendUsers && renderDatas.recommendUsers.length ? renderDatas.recommendUsers : []).concat(data.recommendUsers);

                        if (data.recommendUsers.length == onceCount) {
                            addmoreLoading = 0;
                        }
                        else {
                            addmoreLoading = 2;
                            $(".no_more").show();
                        }
                        self.hideLoading();
                    } else {
                        addmoreLoading = 2;
                        self.hideLoading();
                        $(".no_more").show();
                    }
                },function(errorInfo){
                    addmoreLoading = 2;
                    self.hideLoading();
                    $(".no_more").show();
                });
            },
            onHide: function(){

            }
        });
        return groupView;
    });