define(['libs', 'c', 'cBasePageView', 'cWidgetFactory', 'GolfModel', 'GolfStore', 'CommonStore', 'text!templates/leaderboard.html', 'res/scripts/leaderboard_helper'],
    function (libs, c, pageview, cWidgetFactory, golfModel, golfStore, commonStore, template, helper) {

    var guider = cWidgetFactory.create('Guider');
    //var userInfo = commonStore.UserStore.getInstance().getUser();
    //var userID = userInfo ? userInfo.UserID : -1;
    var userID = commonStore.UserStore.getInstance().getUserId();
    var leaderboardModel= golfModel.LeaderBoardModel.getInstance();

    return pageview.extend({
        pageid : '275010',
        hpageid : '276010',
        render: function () {
            this.$el.append(template);
            this.els = {
                "detail_header_template": this.$el.find("#detail_header_template").html(),
                "detail_header": this.$el.find("#detail_header"),
                "player_name_template": this.$el.find("#player_name_template").html(),
                "player_name": this.$el.find("#player_name"),
                "player_score_total_template": this.$el.find("#player_score_total_template").html(),
                "player_score_total": this.$el.find("#player_score_total"),
                "player_score_details_template": this.$el.find("#player_score_details_template").html(),
                "player_score_details": this.$el.find("#player_score_details")
            };
        },
        onCreate: function () {
            var gameID = this.getQuery("game_id");
            var passcode = this.getQuery("passcode") || "";

            if(!gameID) {
                this.showToast("参数错误:缺失game_id");
                //this.forward("");           //Todo: show error page
            }
            else {
                leaderboardModel.setGameAccessCode(gameID, passcode);
            }
            this.injectHeaderView();
            this.render();
        },
        events: {
            'click .icon_data': 'switchToSummary',
            'click .GoBack': 'switchToSummary'
        },
        switchToSummary : function(event) {
            if(c.utility.isInApp()) {
                IWanUtil.app_rotate_screen("Portrait");   //comment for test
            }
            this.back();
        },
        onLoad: function () {
            var self = this;

            if(c.utility.isInApp()) {
                IWanUtil.app_rotate_screen("Landscape"); //comment for test
            }

            self.setHeader();
            self.showLoading();
            leaderboardModel.load(function(json, isNewData){
                self.hideLoading();
                self.processResponse(json);
                self.showView(json);
                self.turning();
            }, function(errorMessage){
                self.hideLoading();
                self.showToast(errorMessage);

                //return to summary page in case of error
                self.switchToSummary();
            });
        },
        processResponse: function(json) {
            leaderboardModel.endOfGame = json.gameStatus == 3;

            //Fill scoreCardDetailList
            var holeCount = json.courseFairwayList.length;

            for (var scoreCardIndex in json.playerScoreCard){
                var scoreCard = json.playerScoreCard[scoreCardIndex];

                var scoreCardDetailList =  scoreCard.scoreCardDetailList;
                var scoreCardDetailListAll = []

                for(var i = 0; i < holeCount; i++){
                    var found = false;
                    for(var holeScoreIndex in scoreCardDetailList){
                        var holeScore = scoreCardDetailList[holeScoreIndex];

                        if(i == (holeScore.sort - 1)) {
                            scoreCardDetailListAll[i] = ({totalScore:holeScore.totalScore, handicap: holeScore.handicap});
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        scoreCardDetailListAll[i] = ({totalScore: null, handicap:null});
                    }
                }

                scoreCard.scoreCardDetailListAll = scoreCardDetailListAll;
            }

        },
        setHeader: function () {
            if(c.utility.isInApp()) {
                this.headerview.hideHandler(); //comment for test
            }
        },
        showView: function(model) {
            this.els.detail_header.html(_.template(this.els.detail_header_template)({ model: model, helper:helper }));
            this.showScore(model);
        },
        showScore: function(model) {
            this.els.player_name.html(_.template(this.els.player_name_template)({ model: model, helper:helper }));
            this.els.player_score_total.html(
                _.template(this.els.player_score_total_template)({ model: model, helper:helper }));
            this.els.player_score_details.html(
                _.template(this.els.player_score_details_template)({ model: model, helper:helper }));
        },
        onShow: function () {
            var self = this;

            if(!self.intervalId && !leaderboardModel.endOfGame) {
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

            leaderboardModel.refresh(function(data, isNewData){
                if(isNewData) {
                    self.processResponse(data);
                    self.showScore(data);
                }
            });
        }
    });
});