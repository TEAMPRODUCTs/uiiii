define(["cUtility"],function(e){var t={VER:"V6.1 B20141113a",DEBUG:1,MOCK_SERVICE_CALL:0,DOMAINARR:{local:{domain:"gateway.secure.fws.qa.nt.ctripcorp.com",path:"restful/soa2/10289"},fat:{domain:"gateway.secure.fat18.qa.nt.ctripcorp.com",path:"restful/soa2/10289"},fws:{domain:"gateway.secure.fws.qa.nt.ctripcorp.com",path:"restful/soa2/10289"},uat:{domain:"gateway.secure.uat.qa.nt.ctripcorp.com",path:"restful/soa2/10289"},baolei:{domain:"gateway.secure.ctrip.com",path:"restful/soa2/10289"},pro:{domain:"gateway.secure.ctrip.com",path:"restful/soa2/10289"}},DOMAIN_HOME_ARR:{local:"m.fat19.qa.nt.ctripcorp.com",fat:"m.fat19.qa.nt.ctripcorp.com",fws:"m.fat19.qa.nt.ctripcorp.com",uat:"m.uat.qa.nt.ctripcorp.com",baolei:"10.8.2.111",pro:"m.ctrip.com"},DOMAIN_LOGIN_ARR:{local:"accounts.fat49.qa.nt.ctripcorp.com",fat:"accounts.fat49.qa.nt.ctripcorp.com",fws:"accounts.fat49.qa.nt.ctripcorp.com",uat:"accounts.uat.qa.nt.ctripcorp.com",baolei:"accounts.ctrip.com",pro:"accounts.ctrip.com"},HZ_PARAM:{local:"",fat:"?subEnv=fat1",fws:"",uat:"",baolei:"?isBastionRequest=true",pro:""},_env:function(){if(this.IS_INAPP)return e.isPreProduction()=="1"?"baolei":e.isPreProduction()=="0"?"fws":e.isPreProduction()=="2"?"uat":"pro";var t=location.host;return t.match(/^(localhost|172\.16|127\.0)/i)?"local":t.match(/^secure\.fws/i)?"fws":t.match(/^secure\.fat18/i)||t.match(/^secure\.fat19/i)?"fat":t.match(/^secure\.uat/i)?"uat":t.match(/^10\.8\.2\.111/i)||t.match(/^10\.8\.5\.10/i)?"baolei":"pro"}};return t.IS_INAPP=e.isInApp(),t.ENV=t._env(),t})