define(["libs","c","PayStore","PayModel","Util"],function(e,t,n,r,i){function h(e,t){var n=e+"&"+t||"";return n.replace(/[&?]{1,2}/,"?")}var s=n.OrderDetailStore.getInstance(),o=s.get()||{},u=decodeURIComponent(s.getAttr("sback")),a=decodeURIComponent(s.getAttr("eback")),f=i.geturlQuery("success")||"",l="";f=f.toLowerCase();var c="externalNo="+(o.extno||"")+"&"+"billNo="+(o.bilno||"")+"&"+"payType="+(o.realpaytype||"")+"&"+"oid="+(o.oid||"0")+"&"+"busType="+(o.bustype||"")+"&"+"price="+(o.totalamount||"");f==="y"?l=h(u,c):(c=c+"&"+"ErrorCode=&ErrorMessage=",l=h(a,c)),location.href=l})