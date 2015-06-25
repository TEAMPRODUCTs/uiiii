define(['libs', 'c', 'cBasePageView', 'cWidgetFactory', 'GolfModel', 'GolfStore','CommonStore','text!templates/leaderboard.summary.html', 'res/scripts/util', 'res/scripts/leaderboard_helper'],
    function (libs, c, pageview, cWidgetFactory, golfModel, golfStore, commonStore, template, util, helper) {
    var guider = cWidgetFactory.create('Guider');
    var userID = commonStore.UserStore.getInstance().getUserId();
    var leaderboardSummaryModel =  golfModel.LeaderBoardSummaryModel.getInstance();

    return pageview.extend({
        pageid : '275011',
        hpageid : '276011',
        render: function () {
            this.$el.append(template);
            this.els = {
                //"award_cup_template": this.$el.find("#award_cup_template").html(),
                //"last_update_timestamp": this.$el.find("#last_update_timestamp"),
                "award_cup": this.$el.find("#award_cup"),
                "game_info_detail_template": this.$el.find("#game_info_detail_template").html(),
                "game_info_detail": this.$el.find("#game_info_detail"),
                "score_list_template": this.$el.find("#score_list_template").html(),
                "score_list": this.$el.find("#score_container"),
                "footer": this.$el.find("#footer"),
                "delete_game_btn": this.$el.find(".delete_game")
            };
        },
        onCreate: function () {
            //this.showToast("This is updated version!!!");
            var gameID = this.getQuery("game_id");
            var passcode = this.getQuery("passcode");

            if(!gameID) {
                this.showToast("参数错误: 缺失game_id");
                this.forward("");           //Todo: show error page
            }
            else {
                leaderboardSummaryModel.setGameAccessCode(gameID, passcode);
                this.injectHeaderView();
                this.render();
            }

            this.isRecorder = this.getQuery("is_recorder") === "true";
            this.canDeleteGame = this.getQuery("can_delete_game") === "true" && leaderboardSummaryModel.authString;
            //this.canDeleteGame = true;        //For test purpose
        },
        events: {
            'click .edit': 'deleteScoreCard',
            'click #award_cup': 'showAward',
            //'click .game_info': 'showDetails',
            'click #footer': 'startScoreRecording',
            'click .delete_game':'deleteGame'
        },
        onLoad: function () {
            var self = this;

            self.setHeader();
            self.headerview.show();
            self.showLoading();
            leaderboardSummaryModel.load(function(json, isNewData){
                self.hideLoading();
                self.processResponse(json);
                self.showView(json);
                //self.els.last_update_timestamp.html("最后更新：" + (new Date()).toLocaleTimeString());
                self.turning();
            }, function(errorMessage){
                self.hideLoading();
                self.showToast(errorMessage);
            });
        },
        showAward:function() {
            this.forward("leaderboard.award/"
                + util.paramStringify(leaderboardSummaryModel.fullParam));
        },
        showDetails: function() {
            this.forward("leaderboard/"
                + util.paramStringify(leaderboardSummaryModel.fullParam));
        },
        startScoreRecording: function() {
            IWanUtil.app_start_score_recording();
        },
        processResponse: function(json) {
            leaderboardSummaryModel.endOfGame = json.gameStatus == 3;
            json.isOwner = userID === json.creatorUid && !leaderboardSummaryModel.endOfGame;
            //json.isOwner = true;  //Test to show delete icon
        },
        setHeader: function () {
            var self = this;

            //Show sharing button only for app and not in log
            //var content = c.utility.isInApp() && !self.canDeleteGame ? { title: "leaderboard_summary", id: 'leaderboard_summary', classname: 'null'} : null;

            var content = c.utility.isInApp() ? { title: "leaderboard_summary", id: 'leaderboard_summary', classname: 'null'} : null;

            self.headerview.set({
                title: '赛事排名',
                back: c.utility.isInApp(),
                view: this,
                btn: content,
                events:{
                    returnHandler: function(){guider.backToLastPage();}
                },
                commit: { id: 'leaderboard_summary', callback: function () {
                        self.showDetails();
                    }
                }
            });
        },
        showView: function(model) {
            this.els.game_info_detail.html(_.template(this.els.game_info_detail_template)({ model: model}));
            if(!this.isRecorder) this.els.footer.hide();
            if(!this.canDeleteGame) this.els.delete_game_btn.hide();
            this.showScore(model);
        },
        showScore: function(model) {
            if(model.gameStatus == 3) {
                //this.els.award_cup.show();    //disable award feature
                this.els.award_cup.hide();
            } else {
                this.els.award_cup.hide();
            }
            this.els.score_list.html(_.template(this.els.score_list_template)({ model: model, helper:helper}));
        },
        onShow: function () {
            var self = this;

            if(!self.intervalId&& !leaderboardSummaryModel.endOfGame) {
                self.intervalId = setInterval(function(){
                    self.refreshScore();
                }, helper.refreshIntervel);
            }
        },
        onHide: function () {
            if(!this.intervalId) {
                clearInterval(this.intervalId);
                delete this.intervalId;
            }
        },
        refreshScore: function() {
            var self = this;

            leaderboardSummaryModel.refresh(function(data, isNewData){
                if(isNewData) {
                    self.processResponse(data);
                    //self.els.last_update_timestamp.html("最后更新：" + (new Date()).toLocaleTimeString());
                    self.showScore(data);
                }
            });
        },
        deleteScoreCard:function(target){
            var playerId = parseInt($(target.srcElement).children(".icon_delete").attr("data-id"));
            var self = this;

            self.showLoading();
            leaderboardSummaryModel.deletePlayer(playerId, function(){
                self.refreshScore();
                self.hideLoading();
            }, function(error){
                self.hideLoading();
                self.showToast(error);
            }, function(){
                self.hideLoading();
            });
        },
        deleteGame:function(){
            var self = this;

            self.showLoading();

            leaderboardSummaryModel.deleteGame(function(){
                self.hideLoading();
                if(c.utility.isInApp()) {
                    //Notify app the game has been deleted
                    IWanUtil.app_on_game_deletion(leaderboardSummaryModel.gameID);
                }
                self.back();
            }, function(error){
                self.hideLoading();
                self.showToast(error);
            }, function(){
                self.hideLoading();
            });
        }
    });
});