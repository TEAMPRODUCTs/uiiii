define(["libs","c","CommonStore","PayStore","PayModel","PayParentView","creditcardnotice_html","cUtility","cWidgetFactory","Business"],function(e,t,n,r,i,s,o,u,a,f){var l=null,c=r.ExtendInfoStore.getInstance(),h=a.create("Guider"),p=s.extend({pageid:"",tpl:o,noticeFlag:"pay",onHide:function(){this.hideLoading(),l=null},onCreate:function(){this.render()},onShow:function(){this.setTitle("信用卡支付须知"),this.pageid=u.isInApp()?"215416":"214416"},onLoad:function(){var e=this;this.noticeFlag=this.getQuery("noticeflag"),this.updatePage();try{e.turning()}catch(t){}},render:function(){var e=c.getAttr("creditCardUseExplain")||"";this.$el.html($(this.tpl).find(".js_content").html(e))},events:{"click #js_return":"backAction","click #js_idlist>dd":"chooseID"},updatePage:function(){this.turning();var e=this;e.headerview.set({title:e.noticeFlag=="pay"?"信用卡支付须知":e.noticeFlag=="ensure"?"信用卡担保说明":"信用卡支付须知",home:!1,back:!0,view:e,events:{returnHandler:$.proxy(function(){this.backAction()},this),homeHandler:$.proxy(function(){this.jump("/html5/")},this)}}),this.headerview.show(),this.hideLoading()},setHeaderView:function(){},backAction:function(){var e=this;u.isInApp()&&window.location.href.indexOf("from_native_page")>-1&&h.backToLastPage();var t=this.getQuery("from");if(t==="index")f.goHome.call(e);else{var t=decodeURIComponent(t||"");this.back(t)}}});return p})