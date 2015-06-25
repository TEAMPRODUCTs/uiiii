define(['libs', 'c', 'cBasePageView', 'cWidgetFactory', 'GolfModel', 'GolfStore', 'CommonStore', 'text!templates/leaderboard.award.html'],
    function (libs, c, pageview, cWidgetFactory, golfModel, golfStore, commonStore, template) {
    //var guider = cWidgetFactory.create('Guider');
    var leaderboardModel = golfModel.LeaderBoardModel.getInstance();

    return pageview.extend({

        pageid: '275012',
        hpageid : '276012',
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
                this.forward("");           //Todo: show error page
            }
            else {
                leaderboardModel.setGameAccessCode(gameID, passcode);
                this.injectHeaderView();
                this.render();
            }
        },
        events: {
            'click .award_info': 'switchToBack'
        },
        switchToBack: function() {
            this.back();
        },
        onLoad: function () {
            var self = this;

            self.setHeader();
            self.headerview.show();

            leaderboardModel.load(function(json){
                self.showView(json);
                self.turning();
            }, function(errorMessage){
                self.showToast(errorMessage);
            });
        },
        showView: function(model) {
        },
        setHeader: function () {
            var self = this;
            self.headerview.set({
                title: '奖项',
                back: true,
                view: this,
                events: {
                    returnHandler: function () {
                        self.back();
                    }
                }
            });
        },
        onShow: function () {
        }
    });
});