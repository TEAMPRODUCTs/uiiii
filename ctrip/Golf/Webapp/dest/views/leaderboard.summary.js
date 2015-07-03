define(["libs","c","cBasePageView","cWidgetFactory","GolfModel","GolfStore","CommonStore","text!templates/leaderboard.summary.html","res/scripts/util","res/scripts/leaderboard_helper"],function(a,b,c,d,e,f,g,h,i,j){var k=d.create("Guider"),l=g.UserStore.getInstance().getUserId(),m=e.LeaderBoardSummaryModel.getInstance();return c.extend({pageid:"275011",hpageid:"276011",render:function(){this.$el.append(h),this.els={award_cup:this.$el.find("#award_cup"),game_info_detail_template:this.$el.find("#game_info_detail_template").html(),game_info_detail:this.$el.find("#game_info_detail"),score_list_template:this.$el.find("#score_list_template").html(),score_list:this.$el.find("#score_container"),footer:this.$el.find("#footer"),delete_game_btn:this.$el.find(".delete_game")}},onCreate:function(){var a=this.getQuery("game_id"),b=this.getQuery("passcode");a?(m.setGameAccessCode(a,b),this.injectHeaderView(),this.render()):(this.showToast("参数错误: 缺失game_id"),this.forward("")),this.isRecorder="true"===this.getQuery("is_recorder"),this.canDeleteGame="true"===this.getQuery("can_delete_game")&&m.authString},events:{"click .edit":"deleteScoreCard","click #award_cup":"showAward","click #footer":"startScoreRecording","click .delete_game":"deleteGame"},onLoad:function(){var a=this;a.setHeader(),a.headerview.show(),a.showLoading(),m.load(function(b){a.hideLoading(),a.processResponse(b),a.showView(b),a.turning()},function(b){a.hideLoading(),a.showToast(b)})},showAward:function(){this.forward("leaderboard.award/"+i.paramStringify(m.fullParam))},showDetails:function(){this.forward("leaderboard/"+i.paramStringify(m.fullParam))},startScoreRecording:function(){IWanUtil.app_start_score_recording()},processResponse:function(a){m.endOfGame=3==a.gameStatus,a.isOwner=l===a.creatorUid&&!m.endOfGame},setHeader:function(){var a=this,c=b.utility.isInApp()?{title:"leaderboard_summary",id:"leaderboard_summary",classname:"null"}:null;a.headerview.set({title:"赛事排名",back:b.utility.isInApp(),view:this,btn:c,events:{returnHandler:function(){k.backToLastPage()}},commit:{id:"leaderboard_summary",callback:function(){a.showDetails()}}})},showView:function(a){this.els.game_info_detail.html(_.template(this.els.game_info_detail_template)({model:a})),this.isRecorder||this.els.footer.hide(),this.canDeleteGame||this.els.delete_game_btn.hide(),this.showScore(a)},showScore:function(a){3==a.gameStatus,this.els.award_cup.hide(),this.els.score_list.html(_.template(this.els.score_list_template)({model:a,helper:j}))},onShow:function(){var a=this;a.intervalId||m.endOfGame||(a.intervalId=setInterval(function(){a.refreshScore()},j.refreshIntervel))},onHide:function(){this.intervalId||(clearInterval(this.intervalId),delete this.intervalId)},refreshScore:function(){var a=this;m.refresh(function(b,c){c&&(a.processResponse(b),a.showScore(b))})},deleteScoreCard:function(a){var b=parseInt($(a.srcElement).children(".icon_delete").attr("data-id")),c=this;c.showLoading(),m.deletePlayer(b,function(){c.refreshScore(),c.hideLoading()},function(a){c.hideLoading(),c.showToast(a)},function(){c.hideLoading()})},deleteGame:function(){var a=this;a.showLoading(),m.deleteGame(function(){a.hideLoading(),b.utility.isInApp()&&IWanUtil.app_on_game_deletion(m.gameID),a.back()},function(b){a.hideLoading(),a.showToast(b)},function(){a.hideLoading()})}})});