define(["libs","c","AnalyzeUrl","CommonStore","PayStore","PayModel","PayParentView","index_html","cUtility","cWidgetFactory","paymentPipe","cUIInputClear","cUtilityCrypt","cUICore","Business","Util","PayValidate","RuleManager","Bankmap","bankincrement","IndexLiPinCard","IndexBankList","cHybridShell"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S){var x=i.PayMentOtherInfo.getInstance(),T=i.PaymentWayStore.getInstance(),N=i.OrderDetailStore.getInstance(),C=i.PayOldCardInfoStore.getInstance(),k=i.PayMentCardParamStore.getInstance(),L=i.ExtendInfoStore.getInstance(),A=i.SelectBankStore.getInstance(),O=f.create("Guider"),M=i.CashPayInfoStore.getInstance(),D=r.HeadStore.getInstance(),P=i.Ali_ReStore.getInstance(),H=i.lipinCardEInfo.getInstance(),B=i.BankListStore.getInstance(),j=i.tktErrorStore.getInstance(),F=i.ToAliFlagStore.getInstance(),I=i.ISDiffSelectBankStore.getInstance(),q=i.SelectIdStore.getInstance(),R=i.oldCardsStore.getInstance(),U=i.touchPayStore.getInstance(),z=i.ParamUrlTokenStore.getInstance(),W=t.base,X=W.Date,V=2,J="",K,Q=1,G=new g,Y=null,Z=60,et=0,tt=o.extend({pageid:"232001",hpageid:"232001",noticeFlag:"pay",alertArr:[],tpl:u,verifyControl:null,Vgetcode:Q,otherInfoFlag:!1,refidCode:"",payMethFlag:1,isnewcard:!1,onHide:function(){this.hideLoading(),this.hideWarning404(),this.alertArr.forEach(function(e,t){e&&e.hide&&e.hide()}),d&&d.alertArr.forEach(function(e,t){e&&e.hide&&e.hide()})},onCreate:function(){var e=this;e.verifyControl=v.verifyCodeControl.call(e),e.clearStore();if(!n.getOrderDetail.call(e)){e.analyzeUrlError=!0;return}if(this.otherInfoFlag){e.hideLoading();return}this.render();var e=this;this.showLoading(),b.intBankCrement(),this.getPayway(function(){alert("getPayway"),e.els.cont_wrapnew.show(),e.updatePage()})},onShow:function(){var e=this;if(e.analyzeUrlError)return;var t=j.getAttr("tktUsed");if(t){window.location.reload();return}this.showTitleByBu(),this.els.cardType&&G.showCardTypeFn(this.els.cardType,this.els.idNum)},onLoad:function(e){var t=this,n=T.getAttr("finalPayWay");T.getAttr("autoPay")&&(t.distingPayWay(),T.setAttr("autoPay",0));try{t.turning()}catch(r){}if(t.analyzeUrlError)return;t.isOldCard()||(this.$el.find("#lastFCode")&&this.$el.find("#lastFCode").text(""),this.$el.find("#bankNum")&&this.$el.find("#bankNum").show(),this.$el.find("#bankNum")&&this.$el.find("#bankNum").val(""),t.els.c_payment_index_snList_content&&t.els.c_payment_index_snList_content.removeClass("bor_b_blue"),t.els.savecardbox&&t.els.savecardbox.hide(),t.els.c_payment_index_cardTop&&t.els.c_payment_index_cardTop.find("li").hide(),t.els.c_payment_index_snList_content&&t.els.c_payment_index_snList_content.height(0),t.els.c_payment_index_snList_content&&t.els.c_payment_index_snList_content.addClass("snList_content"),q.remove());if(this.otherInfoFlag){t.hideLoading();return}if(j.getAttr("tktUsed"))t.getPayway(function(){t.els.cont_wrapnew.show(),t.updatePage()});else{var i=T.get();i&&i.paytype&&w.setLIPINCard.call(t,i)}if(A.get()&&(n==1||n==-1)){var s="",o=A.get(),u=o.typename,a;t.els.c_payment_index_lastCard&&t.els.c_payment_index_lastCard.show(),t.els.paywaylist_ul&&t.els.paywaylist_ul.hide(),t.els.cseltxt&&t.els.cseltxt.text(u),o.isnewcard?(a=1,L.setAttr("policytypeControl",1),V=L.getAttr("policytypeControl")):(a=2,L.setAttr("policytypeControl",2),V=L.getAttr("policytypeControl")),t.isOldCard()?t.vali.rules.setReRender(!1):(t.getisexpired(o),t.vali&&t.vali.rules.setReRender(!0),t.showpolicy(o,a)),o.isnewcard&&t.showNewCard(),o.cardnumfl&&!o.isnewcard?t.els.lastFCode&&t.els.lastFCode.text(o.cardnumfl.substr(0,4)+" "+o.cardnumfl.substr(4,o.cardnumfl.length-1)):o.cardnum&&o.isnewcard&&(t.showNewCard(),t.els.lastFCode&&t.els.lastFCode.text(o.cardnum),this.$el.find("#li_bankNum")&&this.$el.find("#li_bankNum").hide(),this.$el.find("#bankNum")&&this.$el.find("#bankNum").val(o.cardnum)),t.setBankCardIcon(),t.els.used_list.show(),N.getAttr("isload")==1&&o.isnewcard&&(t.els.savecardbox&&t.els.savecardbox.show(),t.$el.find("#saveCrtInfo")&&t.$el.find("#saveCrtInfo").addClass("checked")),C.set(A.get())}n&&(n==2?(t.getWeiXinContent(),t.els.c_payment_index_lastWeixin.show()):n==3?t.els.c_payment_index_lastAlipay.show():n==4&&t.els.c_payment_index_cash.show())},clearStore:function(){A.remove(),I.remove(),T.remove(),x.remove(),j.remove(),T.remove(),C.remove(),k.remove(),L.remove(),A.remove(),M.remove(),D.remove(),U.remove(),z&&z.remove&&z.remove(),F.setAttr("thirdcardnum",""),F.setAttr("is_wap",""),F.setAttr("bankcode",""),H.remove(),I.remove(),q.remove()},render:function(){this.$el.html(this.tpl),this.els={order_title:this.$el.find("#order_title"),used_list:this.$el.find("#c_payment_index_used_list"),cseltxt:this.$el.find("#c_payment_index_cyBank"),lastFCode:this.$el.find("#lastFCode"),listinput:this.$el.find(".listinput"),order_title:this.$el.find("#order_title"),order_amount:this.$el.find("#order_amount"),cvv:this.$el.find("#cvv"),prephone:this.$el.find("#prephone"),safe_intro:this.$el.find("#safe_intro"),cardnotice:this.$el.find("#cardnotice"),changephone:this.$el.find("#changephone"),iPrePhone:this.$el.find("#i_prePhone"),li_checkCode:this.$el.find("#li_checkCode"),lipinCard:this.$el.find("#c_pay_index_lpk"),lipinCardTpl:this.$el.find("#c_pay_index_lpk_tpl"),check_code:this.$el.find("#check_code"),contentText:this.$el.find(".js_text"),payBtn:this.$el.find("#c_payment_index_payBtn"),savecardbox:this.$el.find("#savecardbox"),saveCrtInfo:this.$el.find("#saveCrtInfo"),PeriodEnding:this.$el.find("#c_payment_index_periodEnd"),c_payment_paymentnote:this.$el.find("#c_payment_paymentnote"),police_lists:this.$el.find("#c_payment_index_SnList"),c_payment_index_amount:this.$el.find("#c_payment_index_amount"),c_payment_index_changeBtn:this.$el.find("#c_payment_index_changeBtn"),c_payment_index_cardTop:this.$el.find("#c_payment_index_cardTop"),c_payment_index_bankIcon:this.$el.find("#c_payment_index_bankIcon"),c_payment_index_lastCard:this.$el.find("#c_payment_index_lastCard"),c_payment_index_lastWeixin:this.$el.find("#c_payment_index_lastWeixin"),c_payment_index_lastAlipay:this.$el.find("#c_payment_index_lastAlipay"),c_payment_index_cash:this.$el.find("#c_payment_index_cash"),paywaylist_ul:this.$el.find("#paywaylist_ul"),cont_wrapnew:this.$el.find(".cont_wrapnew"),c_payment_index_snList_content:this.$el.find("#c_payment_index_snList_content"),c_payment_index_weixinContent:this.$el.find("#c_payment_index_weixinContent")},this.templateLipinCard=_.template(this.els.lipinCardTpl.html())},events:{"click #saveCrtInfoHotSpc":"saveCrtInfoFn","click #safe_intro":"show_safeintro","click .credit_btn":"distingPayWay","click #periodQue":"showPeriodQue","click #get_code":"CodeValFn","click #count_down_clock":"countDownFn","click #li_prePhone":"changephone","click #c_pay_index_lpk_btn":"lipinCardAction","click #crtpay_info":"showCrtInfo","click #c_payment_index_periodEnd":"updateCardInfo","click #c_payment_li_cardType":"showCardTypeLayer","input #bankPeriod":"inputPeriod","click #c_payment_index_cardTop":"selectPayment","click .c_payment_index_wordtip":"paytipsAction","click .c_payment_index_hotspace_region":"hotspaceRegionAction"},hotspaceRegionAction:function(e){var t=$(e.currentTarget),n=t.find(".listinput");n&&n.focus&&n.focus()},paytipsAction:function(e){var t=$(e.currentTarget),n=t.attr("data-hash");if(!n)return;this.forward(n+"&from="+encodeURIComponent(this.getViewUrl())),v.stopEvent(e),e.stopImmediatePropagation()},saveCrtInfoFn:function(e){$("#saveCrtInfo").toggleClass("checked")},showCrtInfo:function(){this.forward("creditcardnotice?from=index&noticeflag="+this.noticeFlag)},showPeriodQue:function(){this.forward("paytips!tips_3?from=index")},saveCardStore:function(){var e=this,t=this.payCrtCardStore;t.setAttr("bankInfo",{bankName:e.els.bankName.attr("data-name")||"",typeId:e.els.bankName.attr("data-typeid")||"",paymentwayId:e.els.bankName.attr("data-paymentwayid")||""}),t.setAttr("bankNum",this.els.bankNum.val()),t.setAttr("bankCvv",this.els.bankCvv.val()),t.setAttr("userName",this.els.userName.val()),t.setAttr("bankPeriod",this.els.bankPeriod.attr("data-validate")),t.setAttr("cardId",this.els.cardType.attr("data-value")),t.setAttr("cardTypeName",this.els.cardType.html()),t.setAttr("idNum",this.els.idNum.val()),t.setAttr("userTel",this.els.userTel.val()),t.setAttr("saveCrtInfo",this.els.saveCrtInfo.hasClass("open"))},countDownFn:function(e){v.stopEvent(e),e.stopImmediatePropagation()},CodeValFn:function(e){var n=this;v.stopEvent(e),e.stopImmediatePropagation();var r=N,i=A.get()||{},s=r.getAttr("mobile")||n.els.prephone.val(),o=s.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2"),u=n.els.prephone.val(),f="";if(i.isnewcard){f=n.els.banknum.val().replace(/\s/g,"");if(!/\d/gi.test(f)){n.showToast("请输入正确的储蓄卡卡号",1.2),G.addErrClass(n.els.banknum,n.els.li_banknum);return}G.clearErrClass(n.els.banknum,n.els.li_banknum)}if(!s){n.showToast("请填写手机号码",1.2),G.addErrClass(n.els.prephone,n.els.li_prePhone);return}u!=o&&(s=u);if(!/\d{11}/g.test(s)){n.showToast("请填写正确的手机号码",1.2),G.addErrClass(n.els.prephone,n.els.li_prePhone);return}G.clearErrClass(n.els.prephone,n.els.li_prePhone);var c={ver:1,oid:r.getAttr("oid"),amount:r.getAttr("amount"),mobphone:s,isnewcard:i.isnewcard,cardno:f,cardinfoid:i.cardinfoid,typid:i.typeid,category:3},h=d.getRequestHeader();n.verifyControl.showLoading("count_down_clock","get_code"),l.getValCode(c,function(e){var r=null;n.els.getCode.attr("id","get_code"),n.hideLoading();if(!a.isInApp())r=e;else{if(!e.resultBody){n.hideLoading(),n.showToast(e.errorInformation||"网络不给力,请稍候重试"),n.verifyControl.hideLoading("count_down_clock","get_code");return}r=JSON.parse(e.resultBody)}r.rc==0?(n.refidCode=r.refid,t.storage.localStorage.set("VALIDATETIMEOUT",(new Date).valueOf(),(new X).addDay(1)),n.verifyControl.runVerifyCode("count_down_clock","get_code",n.Vgetcode)):(n.refidCode="",n.showToast(r.rmsg||"提交失败！请稍后再试"),n.verifyControl.hideLoading("count_down_clock","get_code"))},JSON.stringify(h),function(e){n.refidCode="",n.hideLoading(),a.isInApp()||e&&e.msg&&n.showToast(e.msg)},function(){n.hideLoading()}),n.els.getCode.attr("id","")},getisexpired:function(e){var t=T.getAttr("cards"),n=e;this.periodEndingHide(),n.expire||(n=t[0]);var r=this.fillPolicyType(n,2);n.status&64&&!(r&64)&&this.periodEndingShow()},periodEndingShow:function(){this.els.c_payment_index_snList_content.addClass("noBorderRadius"),this.els.PeriodEnding.show()},periodEndingHide:function(){this.els.c_payment_index_snList_content.removeClass("noBorderRadius"),this.els.PeriodEnding.hide()},isexpiredByDate:function(e){var n=t.base.Date.parse(e.expire),r=new Date,i=n.date.getTime()-r.getTime(),s=parseInt(i/864e5),o=n.date.getYear()==r.getYear()&&n.date.getMonth()==r.getMonth();return e.category!=3&&o&&e.isexpired?2:e.category!=3&&e.isexpired?1:0},showpolicy:function(e,t){var n=this,r=T.getAttr("cards"),i="",s=e||{};n.vali=new m({container:n.els.police_lists,prefix:"dep",view:n,valiArr:[{policyId:128,id:"bankNum",wrapId:"li_bankNum",isVali:!0,tpl:function(){return n.$el.find("#li_banknum_tpl").html()}},{policyId:64,id:"bankPeriod",wrapId:"li_bankPeriod",isVali:!0,tpl:function(){return n.$el.find("#li_bankperiod_tpl").html()}},{policyId:1,id:"cvv",wrapId:"li_Cvv",isVali:!0,tpl:function(){return n.$el.find("#li_cvv_tpl").html()}},{policyId:2,id:"c_payment_userName",wrapId:"li_userName",isVali:!0,tpl:function(){return n.$el.find("#li_username_tpl").html()}},{policyId:4,id:"c_payment_cardType",wrapId:"c_payment_li_cardType",isVali:!1,tpl:function(){return n.$el.find("#c_payment_li_cardType_tpl").html()}},{policyId:8,id:"c_payment_idNum",wrapId:"li_idNum",isVali:!0,tpl:function(){return n.$el.find("#c_payment_idNum_tpl").html()}},{policyId:16,id:"prephone",wrapId:"li_prePhone",isVali:!0,valFn:function(e){var t=e.obj.eq(0),r=t.val();r!==i||i==""?G.isNull(r)?(G.addErrClass(e.obj,e.wrapObj),n.showToast("请填写手机号码",1.2)):(r=r.trim(),r.length==11?/\D/gi.test(r)?(G.addErrClass(e.obj,e.wrapObj),n.showToast("请填写正确的手机号码",1.2)):/\d{11}/g.test(r)&&G.clearErrClass(e.obj,e.wrapObj):(G.addErrClass(e.obj,e.wrapObj),n.showToast("请填写正确的手机号码",1.2))):G.clearErrClass(e.obj,e.wrapObj)},tpl:function(){return n.$el.find("#li_prePhone_tpl").html()}},{policyId:32,id:"check_code",wrapId:"li_checkCode",isVali:!0,tpl:function(){return n.$el.find("#li_checkCode_tpl").html()}}],initViewEle:_.bind(function(){var e=this.els;e.cvv=this.$el.find("#cvv"),e.userName=this.$el.find("#c_payment_userName"),e.cardType=this.$el.find("#c_payment_cardType"),e.idNum=this.$el.find("#c_payment_idNum"),e.prephone=this.$el.find("#prephone"),e.iPrePhone=this.$el.find("#i_prePhone"),e.li_prePhone=this.$el.find("#li_prePhone"),e.getCode=this.$el.find("#get_code"),e.CountDownClock=this.$el.find("#count_down_clock"),e.check_code=this.$el.find("#check_code"),e.bankPeriod=this.$el.find("#bankPeriod"),e.banknum=this.$el.find("#bankNum"),e.li_banknum=this.$el.find("#li_bankNum"),e.cseltxt=this.$el.find("#c_payment_index_cyBank"),v.placeholder(this.$el.find("input"))},n)}),n.els.c_payment_index_snList_content.show(),s.category<3?this.vali.setModule("credit"):this.vali.setModule("deposit"),s.status&32&&(t=3);var o=n.fillPolicyType(s,t);if(o||o==0)this.vali.initValiCom(o),n.getPolicyCounts(o)>3?setTimeout(function(){var e=n.els.police_lists.height();n.els.c_payment_index_snList_content.removeClass("snList_content"),n.els.c_payment_index_snList_content.animate({height:e},300)},600):(n.els.c_payment_index_snList_content.removeClass("snList_content"),n.els.c_payment_index_snList_content.css({height:"auto"})),!(o&32)&&o&16?(this.$el.find("#get_code").hide(),this.$el.find("#changephone").removeClass("right90"),n.Vgetcode=0):n.Vgetcode=1;if(s.mobile&&!s.isnewcard){var u=/(\d{3})\d{4}(\d{4})/;N.setAttr("mobile",s.mobile),s.mobile=s.mobile.toString(),i=s.mobile.replace(u,"$1****$2"),this.els.iPrePhone.html(i),this.els.prephone.val(i).hide(),setTimeout(function(){n.els.prephone.parent().find("span.c_global_holder").hide()},0)}else this.$el.find("#changephone").hide();s&&s.typeid&&(s.typeid==8||s.typeid==58)&&(n.els.cvv.attr("placeholder","4位信用卡验证码"),n.els.cvv.attr("maxlength","4"))},fillPolicyType:function(e,t){e.policylist=e.policylist||[];for(var n=0;n<e.policylist.length;n++)if(e.policylist[n].policytype&&e["policylist"][n]["policytype"]==t)return e.policylist[n].policysub;return null},setHeaderView:function(e){var n=this,r=0;n.headerview.set({title:e||"支付方式",back:!0,view:n,events:{returnHandler:function(){if(!r){var e=new t.ui.Alert({title:"提示信息",message:"您的支付尚未完成，是否取消支付？",buttons:[{text:"取消支付",click:function(){this.hide(),n.goBack()},type:t.ui.Alert.STYLE_CONFIRM},{text:"继续支付",click:function(){this.hide(),r=0},type:t.ui.Alert.STYLE_CANCEL}]});r=1,e.show(),n.$el.find("input").blur(),n.alertArr.push(e)}}}}),n.headerview.show()},updatePage:function(){var e=this,n=N.get()||{};e.optInfoTag(),e.els.order_title.html(),this.els.order_title.html(_.escape(n.title));if(!n.totalamount){e.hideLoading();var r="系统异常，请重新提交订单！",i=new t.ui.Alert({title:"提示信息",message:r,buttons:[{text:"确定",click:function(){this.hide(),e.goBack()},type:t.ui.Alert.STYLE_CONFIRM}]});i.show();try{d.exceptionInfoCollect({bustype:n.bustype,excode:3,extype:1,exdesc:"读取localstorage中【totalamount】异常, token:"+JSON.stringify(n)})}catch(s){}return}e.showOrderAmount(),j.remove();var o={svr:0,bustype:n.bustype,ath:n.auth,optype:3,currency:"",amount:n.amount,fee:0,cardno:"",expire:"2014/06/09 00:00:00",cardinfoid:-1,merchsupport:-1},u=function(e){a.isInApp()&&(e=JSON.parse(e.resultBody),M.set(e))},f=d.getRequestHeader(),c=JSON.stringify(f);l.getCashMess(o,u,c,function(t){e.hideLoading()}),b.getLastBankCrement()},showOrderAmount:function(){var e=this,t=null,n=N.getAttr("displayAmount")||0,r=v.transNumToFixedArray(N.getAttr("origamount")||0),i=i||N.getAttr("currency")||"￥";i=="CNY"&&(i="￥");var s=new Array;s.push("应付总额：<div style='display:inline'><i class='corange'>"),s.push(i),s.push("<span class='ft18'>"),s.push(r[0]),s.push("</span>"),r&&r.length>1&&(s.push("."),s.push(r[1])),s.push("</i>");if(n){var o=N.getAttr("displayCurrency")||"";t=v.transNumToFixedArray(n,2,o),s.push("<br/><span style='padding-left: 70px;'>"),s.push("约"),s.push(o),s.push(t.join(".")),s.push("</span>")}s.push("</div>"),this.els.c_payment_index_amount.html(s.join(""))},goBack:function(e){T.getAttr("tktuse")&&T.setAttr("tktuse",null),j&&j.remove();var t=e||N.getAttr("from");a.isInApp()?(N.remove(),d.jump2App(t)):(N.remove(),window.location.href=t)},getRWY:function(e){var t={};for(var n=0,r=null,i=e.length;n<i;n++){r=e[n];if(r.tkttype==2&&r.amount>0){t=r;break}}return t},lipinCardAction:function(){a.isInApp()&&H.setAttr("flag_lipincard",1),Lizard.goTo("lipincardpay",{viewName:"lipincardpay"})},filterRemainAmount:function(e){var t=N.getAttr("bustype")||0;if(this.disTingByBust())return;var n=e.walletlist||[];for(var r=0;r<n.length;r++)n[r].cashbalance*1<1&&(n[r].cashbalance=0);var i=e.tktinfo&&e.tktinfo.tkts||[];for(var r=0;r<i.length;r++)i[r].amount*1<1&&(i[r].amount=0)},disTingByBust:function(){var e=d.supportDecimalBu(),t=N.getAttr("bustype")||0,n=!1;for(var r=0;r<e.length;r++)if(e[r]==t){n=!0;break}return n},optInfoTag:function(){var e=L,t=this.$el.find("#safe_intro"),n=this.$el.find("#crtpay_info");if(!L.getAttr("haveCD")&&!0)return;e.getAttr("creditCardUseExplain")?(n.show(),n.removeClass("fl"),t.addClass("plr_15"),t.addClass("fl")):(n.hide(),n.addClass("fl"),t.removeClass("plr_15"),t.removeClass("fl"))},showTitleByBu:function(){var e=L,t=e&&e.get()&&e.get().useEType;t?t=="1"?(this.setHeaderView(),this.els.contentText.each(function(e,t){$(t).html($(t).html().replace("担保","支付"))}),this.els.payBtn.html("支付"),this.$el.find("#crtpay_info").html('信用卡支付须知<i class="pos_r ml20"><i class="arr2"></i></i>'),this.noticeFlag="pay"):t=="2"&&(this.setHeaderView("担保方式"),this.els.contentText.each(function(e,t){$(t).html($(t).html().replace("支付","担保"))}),this.els.payBtn.html("担保"),this.$el.find("#crtpay_info").html('信用卡担保说明<i class="pos_r ml20"><i class="arr2"></i></i>'),this.noticeFlag="ensure"):(this.setHeaderView(),this.els.contentText.each(function(e,t){$(t).html($(t).html().replace("担保","支付"))}))},isAllUnable:function(e){var t=e.walletlist||[];for(var n=0;n<t.length;n++)if(t[n].status==1)return!1;var r=e.tktinfo&&e.tktinfo.tkts||[];for(var n=0;n<r.length;n++)if(r[n].status==0)return!1;return!0},getPayway:function(e){var n=this,r=N.get()||{},i=d.getRequestHeader(),s=JSON.stringify(i);if(!r.totalamount){n.hideLoading();var o="系统异常，请重新提交订单！",u=new t.ui.Alert({title:"提示信息",message:o,buttons:[{text:"确定",click:function(){this.hide(),n.goBack()},type:t.ui.Alert.STYLE_CONFIRM}]});u.show();try{d.exceptionInfoCollect({bustype:r.bustype,excode:3,extype:1,exdesc:"读取localstorage中【totalamount】异常, token："+JSON.stringify(r)})}catch(f){}return}var c=L,h=c&&c.get()&&c.get().useEType,p=c&&c.get()||{},v=L.getAttr("osType"),m={subpay:p.subPayType,bustype:r.bustype,oid:r.oid,requestid:r.requestid,oidex:r.oid,odesc:r.title,oamount:r.amount,searchmap:0,usetype:h?h:1,subusetype:d.isPreAuth()?1:0,ver:0};p.isIntegralGurantee&&p.integralGuranteeAmount&&(m.subusetype=m.subusetype+2);var g={};p.payTypeList&&(g.paytypelist=p.payTypeList),p.subPayTypeList&&(g.subpaytypelist=p.subPayTypeList);if(p.payWayWhiteList){var y=new Array,b=p.payWayWhiteList.split(",");for(var x=0;x<b.length;x++){var k={};k.whiteid=b[x],y.push(k)}g.whitelist=y}if(p.PayWayBlackList){var y=new Array,b=p.PayWayBlackList.split(",");for(var x=0;x<b.length;x++){var k={};k.blackid=b[x],y.push(k)}g.blacklist=y}if(p.CardNumSegmentList){var y=new Array,b=p.CardNumSegmentList.split(",");for(var x=0;x<b.length;x++){var O=b[x].split("-"),k={};O.length>=3&&(k.cnid=O[0],k.startnum=O[1],k.endnum=O[2],y.push(k))}g.cardnumseglist=y}(p.PayWayBlackList||p.payWayWhiteList)&&L.setAttr("isPayRestrict",1),m.payrestrict=g,L.setAttr("payrestrict",g);var M=function(t){var r,i=0,s,o,u="payment_route_"+N.getAttr("bustype"),f={};n.hideLoading();if(t&&t.errorInformation){n.showToast(t.errorInformation),setTimeout(function(){n.goBack()},2e3);return}a.isInApp()&&(t=JSON.parse(t.resultBody)),n.filterRemainAmount(t),T.setAttr(t);if(a.isInApp()){var l=new S.Fn("do_business_job");f[u]=t.paytoute,l.run(4,10001,f)}if(typeof t.res!="undefined"&&t.res){n.showToast("网络不给力，请稍候重试"),setTimeout(function(){n.goBack()},2e3);return}if(t.rc&&t.rc==1){n.showToast(t.rmsg||"网络不给力,请稍候重试"),setTimeout(function(){n.goBack()},2e3);return}t.cards=E.repalceCardType(t.cards),N.setAttr("paytype",t.paytype),t.cashinfolist?N.setAttr("CashInfo",t.cashinfolist):N.setAttr("CashInfo",t.cashinfo),L.setAttr("payTypeListS",t.paytype),r=L.getAttr("payTypeListS"),r?r&2&&(L.setAttr("payTypeListCard",1),i=L.getAttr("payTypeListCard")):i=0;var c=!t.tktinfo||!t.tktinfo.tkts||t.tktinfo&&t.tktinfo.tkts.length<=0?1:0,h=!t.cards||t.cards.length<=0?1:0,p=!t.thirdpartylist||t.thirdpartylist.length<=0?1:0,v=!t.cashinfolist||t.cashinfolist.length<=0?1:0;(c||n.isAllUnable(t))&&h&&p&&v&&n.forward("nopayment"),n.serverPayEntry=t.rusetype||1,L.setAttr("serverPayEntry",n.serverPayEntry),n.payMethFlag=n.serverPayEntry!=2?1:2,d.isPreAuth()&&(n.payMethFlag=1),w.setLIPINCard.call(n,t);var m=[],g=t.cards;T.setAttr("cards",g),T.setAttr("tktinfo",t.tktinfo),L.getAttr("isPayRestrict")||(T.setAttr("finalPayWay",n.isHasLastPayWay(t)),o=T.getAttr("finalPayWay"),o!==0?N.setAttr("hasLastPayWay",1):N.setAttr("hasLastPayWay",0),o==-100&&(T.setAttr("finalPayWay",0),o=T.getAttr("finalPayWay"))),o==2?(n.getWeiXinContent(),n.els.c_payment_index_lastWeixin.show()):o==3?n.els.c_payment_index_lastAlipay.show():o==4?n.els.c_payment_index_cash.show():n.els.c_payment_index_lastCard.show();if(i)if(g.length>0){L.getAttr("isPayRestrict")&&(n.els.c_payment_index_cardTop.addClass("noBorderRadius"),n.els.c_payment_paymentnote.show());if(g.length==1)m.push(g[0]),g[0].status&1?(L.setAttr("onlyOneOldCard",1),isOnlyOneOldCard=L.getAttr("onlyOneOldCard")):(L.setAttr("isOnlyOneNewCard",1),s=L.getAttr("isOnlyOneNewCard"),L.setAttr("policytypeControl",1),V=L.getAttr("policytypeControl")),g[0].category==3?_catogary="储蓄卡":(_catogary="信用卡",L.setAttr("haveCD",1),i=L.getAttr("haveCD")),s&&p&&v&&n.els.c_payment_index_changeBtn.hide();else if(g.length>1)for(var y=0;y<g.length;y++)g[y].status&!0&&m.push(g[y]),g[y].category!=3&&(L.setAttr("haveCD",1),i=L.getAttr("haveCD"));R.set(m),m.length>0&&!o&&(o=-1,T.setAttr("finalPayWay",o),n.els.c_payment_index_lastCard.show()),A.get()||(A.set(m[0]),C.set(A.get())),A.get()&&!(A.get().status&1)&&(o==1||o==-1)&&(A.setAttr("isnewcard",!0),n.showNewCard()),(o==1||o==-1)&&n.setBankCardIcon()}else!o&&m.length<1&&(n.els.used_list.hide(),n.els.paywaylist_ul.show());else!o&&m.length<1&&(n.els.used_list.hide(),n.els.paywaylist_ul.show());!o&&m.length<1&&(n.els.used_list.hide(),n.els.paywaylist_ul.show(),d.unionPayCollection.call(n,n.els.paywaylist_ul));if(i){(L.getAttr("haveCD")||"")&&n.els.safe_intro.show();if(g.length>0&&(o==1||o==-1)){var b=s?1:2;A.get()&&A.get().status&128&&(A.get().status&1?b=2:b=1),n.getisexpired(A.get()),n.showpolicy(A.get(),b)}}e&&e()};l.getpaymentway(m,M,s,function(e){n.hideLoading(),n.showToast("网络不给力，请稍候重试"),setTimeout(function(){n.goBack()},2e3)})},isHasLastPayWay:function(e){e=e||{};var t=this,n=e.paytype,r=0;if(n&&n&2){var i=e.cards||[],s=null;for(var o=0;o<i.length;o++)if(i[o].status&128){s=i[o],s.status&1||(s.isnewcard=!0,L.setAttr("policytypeControl",1),V=L.getAttr("policytypeControl"));break}if(s)return A.set(s),C.set(A.get()),1}if(n&&n&4){var u=e.thirdpartylist||[],f=null;for(var o=0;o<u.length;o++)if(u[o].thirdstatus&1){f=u[o];break}if(f){A.set(f);if(f.paymentwayid=="EB_MobileAlipay"||f.paymentwayid=="OGP_Alipay")return 3;if(f.paymentwayid=="WechatScanCode"){if(!a.isInApp()){if(!v.isInWeichat())return A.remove(),-100}else{var l=v.getSystemVer();l.platform==3&&O.pay.checkStatus({callback:function(e){e.weixinPay||(A.remove(),r=1)}})}return r?-100:2}}}if(n&&n&16){var c=e.cashinfolist||[],h=null;for(var o=0;o<c.length;o++)if(c[o].cashstatus&1){h=c[o];break}if(h)return A.set(h),4}return 0},transNumToFixedStr:function(e){var t=this,n=N.getAttr("currency")||"￥";n=="CNY"&&(n="￥");var r=v.transNumToFixedArray(e);return typeof r=="string"?r:r&&r.length>1?n+r.join("."):""},distingPayWay:function(){var e=this,t=A.get();if(t&&t.category){this.submitpay();return}if(t&&typeof t.thirdstatus!="undefined"&&t.thirdstatus!=null){P.setAttr("requestid",N.getAttr("requestid")),F.setAttr("jump_ali",1),a.isInApp()||(window.onpageshow=function(){d.jumpDetailFn.call(e)});if(t.paymentwayid=="WechatScanCode"){d.showPromptMask.call(e,2,function(){d.jumpToWeiXinpay.call(this)});return}d.showPromptMask.call(e,1,function(){d.toAlipayBefore.call(this)});return}if(t&&typeof t.cashstatus!="undefined"&&t.cashstatus!=null){d.toCashPayFn.call(e);return}},submitpay:function(){var e=this,n=N.get()||{},r=T.get()||{},i=A.get()||{},s=L&&L.get()||{},o="",u=e.getUserInput();this.vali.validate(function(){var r=e.vali.getErrResult();e.showLoading(),console.log(r);if(r){if(e.els.bankPeriod&&e.els.bankPeriod.length>0){o=e.els.bankPeriod.val();var f=o.substring(2,4),c=o.substring(0,2);o="20"+f+c+"01",o=X.parse(o).format("Y/m/d H:i:s")}else o=i&&i.expire;o&&o.length>=4||(o="0001/01/01 00:00:00");if(e.els.bankPeriod&&e.els.bankPeriod.length<1&&i.category!=3&&d.getPayMeth()==2){if(!d.isAfterCurDate(i.expire)){e.showToast("此卡即将过期，请填写新的卡信息"),e.hideLoading();return}if(!d.isBeforeGuranteeDay(i.expire)){e.showToast("此卡即将过期，请填写新的卡信息"),e.hideLoading();return}}var h={opttype:1,paytype:2,cardinfo:{opttype:"5",cardamount:n.amount}};i.status&32&&(L.setAttr("policytypeControl",3),V=L.getAttr("policytypeControl"));if(u.prephone&&u.prephone.indexOf("****")>-1)var p=i.mobile;else var p=u.prephone;V==1?(h.cardinfo.opttype="1",h.cardinfo.addinfo={cardno:u.bankNum,cvv2:u.cvv,expire:o,holder:u.userName,idcardtype:u.cardType,idcardno:u.idNum,islast4:e.$el.find("#saveCrtInfo").hasClass("checked"),mobile:p,refid:e.refidCode?e.refidCode:"",vcode:u.check_code}):V==2?h.cardinfo.checkinfo={cvv2:u.cvv,expire:o,mobile:p,refid:e.refidCode?e.refidCode:"",vcode:u.check_code,islast4:!1,cardno:u.bankNum,holder:u.userName,idcardtype:u.cardType,idcardno:u.idNum}:V==3&&(h.cardinfo.opttype="4",h.cardinfo.updateinfo={cvv2:u.cvv,expire:o,mobile:p,refid:e.refidCode?e.refidCode:"",vcode:u.check_code,islast4:!1,cardno:u.bankNum,holder:u.userName,idcardtype:u.cardType,idcardno:u.idNum}),h.payrestrict=s.payrestrict;var v=decodeURIComponent(n.sback),m=decodeURIComponent(n.eback),g=function(n){if(a.isInApp()){if(!n.resultBody){e.hideLoading(),e.showToast(n.errorInformation||"网络不给力,请稍候重试");return}n=JSON.parse(n.resultBody)}if(!d.lipinCardExcuteCallback.call(null,n)){j.setAttr("tktUsed",1);var r=new t.ui.Alert({title:"提示信息",message:"支付失败，请重新尝试",buttons:[{text:"确定",click:function(){this.hide(),window.location.reload()},type:t.ui.Alert.STYLE_CONFIRM}]});r.show(),e.alertArr.push(r);return}d.setTempOid(n),n.bilno&&N.setAttr("bilno",n.bilno);if(typeof n.res!="undefined"&&n.res){e.hideLoading(),e.showToast("网络不给力,请稍候重试");return}if(n.rc==0)a.isInApp()?d.jump2AppPage(!0,n,v):d.jump2H5Page(!0,n,v);else if(n.rc<100)if(n.rc==4){var r=new t.ui.Alert({title:"提示信息",message:n.rmsg||"网络不给力,请稍候重试",buttons:[{text:"好的",click:function(){a.isInApp()?(r.hide(),d.jump2AppPage(!0,n,v)):(this.hide(),d.jump2H5Page(!0,n,v))},type:t.ui.Alert.STYLE_CONFIRM}]});r.show(),e.alertArr.push(r)}else if(n.rc==6){var r=new t.ui.Alert({title:"提示信息",message:"常用卡已失效，请重新填写卡信息进行支付",buttons:[{text:"好的",click:function(){var t=_.filter(R.get(),function(e){return i.typeid!=e.typeid});R.set(t),e.els.paywaylist_ul.html("");var n=1;L.setAttr("policytypeControl",1),V=L.getAttr("policytypeControl"),e.hideLoading(),e.els.lastFCode.html(""),i.isnewcard=!0,i.cardnumfl="",e.showpolicy(i,n),A.set(i),e.showNewCard(),r.hide()},type:t.ui.Alert.STYLE_CONFIRM}]});r.show(),e.alertArr.push(r)}else if(n.rc==7){var r=new t.ui.Alert({title:"提示信息",message:n.rmsg||"网络不给力,请稍候重试",buttons:[{text:"确定",click:function(){this.hide(),T.setAttr("verifiedPhone",null),e.PostCheck()},type:t.ui.Alert.STYLE_CONFIRM}]});r.show(),e.alertArr.push(r)}else if(n.rc==8){var r=new t.ui.Alert({title:"提示信息",message:n.rmsg||"网络不给力,请稍候重试",buttons:[{text:"好的",click:function(){this.hide(),a.isInApp()?d.jump2AppPage(!0,n,v):d.jump2H5Page(!0,n,v)},type:t.ui.Alert.STYLE_CONFIRM}]});r.show(),e.alertArr.push(r)}else if(n.rc==9)e.showToast(n.rmsg||"网络不给力,请稍候重试"),k.setAttr("isTouchId",0),k.setAttr("orderid",-1),k.setAttr("cardInfo",{});else if(n.rc==10){var r=new t.ui.Alert({title:"提示信息",message:n.rmsg||"网络不给力,请稍候重试",buttons:[{text:"确定",click:function(){this.hide(),L.setAttr("isVerifyMobile",1),et=L.getAttr("isVerifyMobile"),T.setAttr("verifiedPhone",null),e.UnionPayStatusCheck()},type:t.ui.Alert.STYLE_CONFIRM}]});r.show(),e.alertArr.push(r)}else e.hideLoading(),e.showToast(n.rmsg||"网络不给力,请稍候重试");else a.isInApp()?d.jump2AppPage(!1,n,m):d.jump2H5Page(!1,n,m)},y=d.getRequestHeader(),b=JSON.stringify(y);if(e.validate(i)){i.status&256?(L.setAttr("isVerifyMobile",1),et=L.getAttr("isVerifyMobile")):(L.setAttr("isVerifyMobile",0),et=L.getAttr("isVerifyMobile"));var w=T.getAttr("verifiedPhone");if(k.getAttr("orderid")==-1&&et){var E=i.isnewcard?e.els.banknum.val().replace(/\s/g,""):i.cardinfoid;if(E!=T.getAttr("verifiedCardNo")){e.UnionPayStatusCheck();return}}if(!w&&et){e.UnionPayStatusCheck();return}s.isRealTimePay?(h.opadbitmp=4,l.payV3(h,g,b,function(){e.hideLoading(),e.showToast("网络不给力,请稍候重试")})):l.pay(h,g,b,function(){e.hideLoading(),e.showToast("网络不给力,请稍候重试")})}else e.hideLoading()}})},getUserInput:function(){var e={bankNum:"",bankPeriod:"",cvv:"",userName:"",cardType:"",idNum:"",prephone:"",check_code:""};return this.els.banknum&&this.els.banknum&&this.els.banknum.val()&&(e.bankNum=this.els.banknum.val().replace(/\s/g,"")),this.els.bankPeriod&&(e.bankPeriod=this.els.bankPeriod.val()),this.els.cvv&&(e.cvv=this.els.cvv.val()),this.els.userName&&(e.userName=this.els.userName.val()),this.els.cardType&&(e.cardType=this.els.cardType.attr("data-value")),this.els.idNum&&(e.idNum=this.els.idNum.val()),this.els.prephone&&(e.prephone=this.els.prephone.val()),this.els.check_code&&(e.check_code=this.els.check_code.val()),e},validate:function(e){return!0},show_safeintro:function(){this.forward("paytips?pathid=tips_1&from=index")},changephonefn:function(){var e=this,n=A.get()||{},r=d.getRequestHeader(),i=JSON.stringify(r);K?$("#c_payment_index_newphone").val(""):K=new t.ui.Alert({title:"更新预留手机号",showTitle:!0,message:'若您在银行修改了此卡的预留手机，请更新。</br><input class="aside-mobile-input" placeholder="请输入新预留手机号" type="text" id="c_payment_index_newphone" maxLength="11" />',buttons:[{text:"取消",click:function(){e.hideLoading(),this.hide()},type:t.ui.Alert.STYLE_CANCEL},{text:"确定",click:function(){var t=$("#c_payment_index_newphone"),n=A.get()||{},r=(t.val()||"").trim();if(!r)return;if(r.length<11){e.showToast("请填写正确的手机号码");return}if(n.category<3)this.hide(),e.els.prephone.val(r),e.els.iPrePhone.html(r),N.setAttr("mobile",r);else{var s={category:n.category,cardinfoid:n.cardinfoid,mobphone:r,typid:n.typeid,ver:0};e.showLoading();var o=this,u=function(t){e.hideLoading();if(a.isInApp()){if(!t.resultBody){e.hideLoading(),e.showToast(t.errorInformation||"网络不给力,请稍候重试");return}t=JSON.parse(t.resultBody)}t.rc==0?(e.els.prephone.val(r),e.els.iPrePhone.html(r),N.setAttr("mobile",r),o.hide()):e.showToast(t.rsmsg||"您输入的号码与银行预留手机号不符，请重新输入")},f=function(t){e.hideLoading(),e.showToast("网络不给力,请稍候重试")};l.updateprephone(s,u,i,f,!0)}e.els.CountDownClock.hide(),e.Vgetcode&&e.els.getCode.show()},type:t.ui.Alert.STYLE_CONFIRM}]}),K.show(),e.alertArr.push(K)},filtePaymentType:function(){if(T.get())return _.filter(T.get().cards,function(e){return(e.status!=2||e.status!=3)&&(e.category==1||e.category==2)})},updateCardInfo:function(e){var t=A.get()||{};this.periodEndingHide(),L.setAttr("policytypeControl",3),V=L.getAttr("policytypeControl"),this.showpolicy(t,3),this.els.police_lists.find("input").eq(0).focus()},showCardTypeLayer:function(){this.vali&&this.vali.rules&&this.vali.rules.showCardType()},inputPeriod:function(e){this.vali&&this.vali.rules&&this.vali.rules.getDatePeriod(this.els.bankPeriod)},selectPayment:function(){this.forward("selectpayment")},getCardtype:function(e){var t={1:"信用卡",2:"信用卡",3:"储蓄卡"};return t[e]},setBankCardIcon:function(){var e="",t,n,r=A.get()||{},i=r.typename;r.category==3?e="储蓄卡":e="信用卡",this.els.cseltxt.html("<div class='font17 fl'>"+i+"</div>"+"<span class='payicon_tips2 fl'>"+e+"</span>"),r.cardnumfl&&!r.isnewcard&&this.els.lastFCode.text(r.cardnumfl.substr(0,4)+" "+r.cardnumfl.substr(4,r.cardnumfl.length-1)),t=E.getBankCardType(r),t&&(n=y.getBankClass(t)||"bank_index",this.els.c_payment_index_bankIcon.attr("class",n))},getPolicyCounts:function(e){var t=[1,2,4,8,16,32,64,128],n=0,r=A.get(),i=r.cardnum&&r.isnewcard?t.length-1:t.length;for(var s=0;s<i;s++)e&t[s]&&n++;return n},isOldCard:function(){return C.get()&&A.get()?A.get().isnewcard?C.get().typeid==A.get().typeid&&C.get().cardnum==A.get().cardnum?1:0:C.get().typeid==A.get().typeid&&C.get().cardnumfl==A.get().cardnumfl&&C.get().isnewcard==A.get().isnewcard?1:0:0},changephone:function(e){var t=this.els.li_prePhone.find("#i_prePhone").text();if(t.length>1)this.changephonefn();else{var n=$(e.currentTarget),r=n.find(".listinput");r&&r.focus&&r.focus()}},showNewCard:function(){var e=this;e.els.c_payment_index_snList_content.addClass("bor_b_blue"),N.getAttr("isload")==1?(e.els.savecardbox.show(),e.$el.find("#saveCrtInfo").addClass("checked")):(e.els.savecardbox.hide(),e.$el.find("#saveCrtInfo").removeClass("checked"))},getWeiXinContent:function(){function i(e){var t={},n=0,r=e.length,i=null;for(;n<r;n++){i=e[n];if(i.type==5||i.type==6)t[i.type]=i.value||""}return t}var e=i(T.getAttr("dsettings")),t=this.els.c_payment_index_weixinContent.html(),n="";t.length>3&&(n=t.substring(0,4));var r=!_.isEmpty(e)&&e[5]&&e[6];r&&(e[5]=_.escape(e[5].substring(0,6)),e[6]=_.escape(e[6].substring(0,12)),this.els.c_payment_index_weixinContent.html(n+'<em class="payicon_tips c_payment_index_weixin_title">'+e[5]+'</em><p class="corange c_payment_index_weixin_content">'+e[6]+"</p>"))},PostCheck:function(){var e=this;d.CheckPhoneNum.call(this,function(t){t?(T.setAttr("isGetPassWordfrom1501",1),T.setAttr("verifyMobile",t),T.setAttr("seniortype",1),d.VerifyPhone.call(e,"index")):(T.setAttr("isGetPassWordfrom1501",0),e.distingPayWay())})},UnionPayStatusCheck:function(){var e=this,t=A.get()||{},n=N.get()||{},r=e.getUserInput(),i={},s=1,o="0001/01/01 00:00:00";if(e.els.bankPeriod&&e.els.bankPeriod.length>0){o=e.els.bankPeriod.val();var u=o.substring(2,4),f=o.substring(0,2);o="20"+u+f+"01",o=X.parse(o).format("Y/m/d H:i:s")}else o=t&&t.expire;o&&o.length>=4||(o="0001/01/01 00:00:00");var c;r.prephone&&r.prephone.indexOf("****")>-1?c=t.mobile:c=r.prephone;if(t.isnewcard){var h=e.els.banknum.val().replace(/\s/g,"");i={cardno:h,cvv2:r.cvv,expire:o,mobile:c},T.setAttr("verifyingCardNo",h),s=1}else i={cardinfoid:t.cardinfoid,cvv2:r.cvv,expire:o,mobile:c},T.setAttr("verifyingCardNo",t.cardinfoid),s=2;var p={oid:n.oid,category:t.category,seniortype:s,actcard:i},v=function(t){var n={};if(!a.isInApp())n=t;else{if(!t.resultBody){e.hideLoading(),e.showToast(t.errorInformation||"网络不给力,请稍候重试");return}n=JSON.parse(t.resultBody)}e.hideLoading(),n.result==0?(T.setAttr("creditVerifyMobile",c),T.setAttr("isGetPassWordfrom1801",1),T.setAttr("seniortype",2),d.VerifyPhone.call(e,"index")):n.result==1&&(T.setAttr("isGetPassWordfrom1801",0),e.showToast(n.resultmesg||"网络不给力,请稍候重试"))};e.showLoading();var m=d.getRequestHeader();l.verifyUnionPayStatus(p,v,JSON.stringify(m),function(t){e.hideLoading(),e.showToast(t.msg)})}});return tt})