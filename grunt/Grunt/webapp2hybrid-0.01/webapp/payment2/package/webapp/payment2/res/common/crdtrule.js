define(["c","cWidgetFactory","PayModel","PayStore","CommonStore","cUtility","paymentPipe","Business","CommRule"],function(e,t,n,r,i,s,o,u,a){var f=new a;return f[1]=function(e){var t=e.obj,n=e.wrapObj,r=t.val(),i=this;i.isNull(t.val())?(i.addErrClass(t,n),i.showToast("请输入信用卡验证码，卡背面3位数字",1.2)):t.val().trim().length>=3&&t.val().trim().length<=4?(r=r.trim(),/\D/gi.test(r)?(i.addErrClass(t,n),i.showToast("请输入正确的信用卡验证码，卡背面3位数字",1.2)):i.clearErrClass(t,n)):t.val().trim().length<3&&(i.addErrClass(t,n),i.showToast("请输入正确的信用卡验证码，卡背面3位数字",1.2))},f[128]=function(e){var t=e.obj,n=e.wrapObj,r=t.val(),i=this;i.isNull(r)?(i.addErrClass(t,n),i.showToast("请输入信用卡号码",1.2)):(r=r.trim().replace(/\s/g,""),/\D/gi.test(r)?(i.addErrClass(t,n),i.showToast("请输入正确的信用卡卡号，或更换其他的信用卡",1.2)):r.length>=14&&r.length<=16?i.clearErrClass(t,n):(i.addErrClass(t,n),i.showToast("请输入正确的信用卡卡号，或更换其他的信用卡",1.2)))},f})