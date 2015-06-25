function __bridge_callback(a){a=decodeURIComponent(a);var b=JSON.parse(a);return null!=b?(null!=b.param&&b.param.hasOwnProperty("platform")&&(platform=b.param.platform,"number"==typeof platform&&(1==platform||2==platform||3==platform)&&(Internal.isIOS=1==platform,Internal.isAndroid=2==platform,Internal.isWinOS=3==platform),Internal.isInApp=!0,Internal.appVersion=b.param.version,Internal.osVersion=b.param.osVersion),window.app.callback(b)):-1}function __writeLocalStorage(a,b){Internal.isNotEmptyString(a)&&localStorage.setItem(a,b)}var __CTRIP_JS_PARAM="?jsparam=",__CTRIP_URL_PLUGIN="ctrip://h5/plugin"+__CTRIP_JS_PARAM,Internal={isIOS:!1,isAndroid:!1,isWinOS:!1,isInApp:!1,appVersion:"",osVersion:"",isAppVersionGreatThan:function(a){if("string"==typeof a&&a.length>0){var b=parseFloat(a),c=parseFloat(Internal.appVersion);if(isNaN(c)||c-b>=0)return!0}return!1},appVersionNotSupportCallback:function(a){var b={tagname:"app_version_too_low",start_version:a,app_version:Internal.appVersion};CtripTool.app_log(JSON.stringify(b)),window.app.callback(b)},paramErrorCallback:function(a){var b={tagname:"app_param_error",description:a};CtripTool.app_log(JSON.stringify(b)),window.app.callback(b)},isNotEmptyString:function(a){return"string"==typeof a&&a.length>0?!0:!1},loadURL:function(a){var b=document.createElement("iframe"),c=document.body||document.documentElement;b.style.display="none",b.setAttribute("src",a),c.appendChild(b),setTimeout(function(){b.parentNode.removeChild(b),b=null},200)},makeParamString:function(a,b,c,d){return Internal.isNotEmptyString(a)&&Internal.isNotEmptyString(b)?(c||(c={}),c.service=a,c.action=b,c.callback_tagname=d,JSON.stringify(c)):""},makeURLWithParam:function(a){return null==a&&(a=""),a=encodeURIComponent(a),__CTRIP_URL_PLUGIN+a},callWin8App:function(a){window.external.notify(a)}},CtripTool={app_is_in_ctrip_app:function(){if(Internal.isInApp)return!0;var a=!1,b=navigator.userAgent;return b.indexOf("CtripWireless")>0?(Internal.isAndroid=!0,a=!0):(b.indexOf("iPhone")>0||b.indexOf("iPad")>0||b.indexOf("iPhone"))&&b.indexOf("Safari")<0&&(a=!0,Internal.isIOS=!0),a},app_log:function(a,b){CtripUtil.app_log(a,b)}},CtripUtil={app_log_event:function(a){if(Internal.isNotEmptyString(a)){var b={};b.event=a,paramString=Internal.makeParamString("Util","logEvent",b,"log_event"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.logEvent(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)}},app_init_member_H5_info:function(){paramString=Internal.makeParamString("User","initMemberH5Info",null,"init_member_H5_info"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.User_a.initMemberH5Info(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_call_phone:function(a){a||(a="");var b={};if(b.phone=a,paramString=Internal.makeParamString("Util","callPhone",b,"call_phone"),Internal.isIOS){var c=!1;Internal.isNotEmptyString(a)&&(Internal.appVersion&&"5.2"!=Internal.appVersion||(c=!0,url="tel://"+a,window.location.href=url)),c||(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url))}else Internal.isAndroid?window.Util_a.callPhone(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_back_to_home:function(){paramString=Internal.makeParamString("Util","backToHome",null,"back_to_home"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?CtripUtil.app_open_url("ctrip://wireless/",1,"  "):Internal.isWinOS&&Internal.callWin8App(paramString)},app_back_to_last_page:function(a,b){var c={};a||(a=""),c.callbackString=a,c.isDeleteH5Page=b,paramString=Internal.makeParamString("Util","backToLast",c,"back_to_last_page"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.backToLast(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_locate:function(a){var b={};b.is_async=a,paramString=Internal.makeParamString("Locate","locate",b,"locate"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Locate_a.locate(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_refresh_nav_bar:function(a){CtripBar.app_refresh_nav_bar(a)},app_open_url:function(a,b,c){var d={};if(a||(a=""),c||(c=""),d.openUrl=a,d.title=c,d.targetMode=b,paramString=Internal.makeParamString("Util","openUrl",d,"open_url"),Internal.appVersion)Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.openUrl(paramString):Internal.isWinOS&&Internal.callWin8App(paramString);else{var e=navigator.userAgent,f=e.indexOf("Android")>0&&e.indexOf("CtripWireless")>0;if(f)try{window.Util_a.openUrl(paramString)}catch(g){window.location.href=a}else window.location.href=a}},app_check_update:function(){paramString=Internal.makeParamString("Util","checkUpdate",null,"check_update"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.checkUpdate(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_recommend_app_to_friends:function(){paramString=Internal.makeParamString("Util","recommendAppToFriends",null,"recommend_app_to_friends"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.recommendAppToFriends(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_add_weixin_friend:function(){paramString=Internal.makeParamString("Util","addWeixinFriend",null,"add_weixin_friend"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.addWeixinFriend(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_cross_package_href:function(a,b){var c={};a||(a=""),b||(b=""),c.path=a,c.param=b,paramString=Internal.makeParamString("Util","crossPackageJumpUrl",c,"cross_package_href"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.crossPackageJumpUrl(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_show_newest_introduction:function(){paramString=Internal.makeParamString("Util","showNewestIntroduction",null,"show_newest_introduction"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.showNewestIntroduction(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_check_network_status:function(){paramString=Internal.makeParamString("Util","checkNetworkStatus",null,"check_network_status"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.checkNetworkStatus(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_check_app_install_status:function(a,b){var c={};a||(a=""),b||(b=""),c.openUrl=a,c.packageName=b,paramString=Internal.makeParamString("Util","checkAppInstallStatus",c,"check_app_install_status"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.checkAppInstallStatus(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_refresh_native_page:function(a,b){var c={};a||(a=""),b||(b=""),c.pageName=a,c.jsonStr=b,paramString=Internal.makeParamString("Util","refreshNativePage",c,"refresh_native_page"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.refreshNativePage(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_copy_string_to_clipboard:function(a){var b="5.3";if(!Internal.isAppVersionGreatThan(b))return void Internal.appVersionNotSupportCallback(b);var c={};a||(a=""),c.copyString=a,paramString=Internal.makeParamString("Util","copyToClipboard",c,"copy_string_to_clipboard"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.copyToClipboard(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_read_copied_string_from_clipboard:function(){var a="5.3";return Internal.isAppVersionGreatThan(a)?(paramString=Internal.makeParamString("Util","readCopiedStringFromClipboard",null,"read_copied_string_from_clipboard"),void(Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.readCopiedStringFromClipboard(paramString):Internal.isWinOS&&Internal.callWin8App(paramString))):void Internal.appVersionNotSupportCallback(a)},app_call_system_share:function(a,b,c,d,e){var f="5.3";if(!Internal.isAppVersionGreatThan(f))return void Internal.appVersionNotSupportCallback(f);var g={};a||(a=""),c||(c=""),b||(b=""),d||(d=""),g.title=c,g.text=b,g.linkUrl=d,g.imageRelativePath=a,g.isIOSSystemShare=e,paramString=Internal.makeParamString("Util","callSystemShare",g,"call_system_share"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.callSystemShare(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_download_data:function(a,b,c){var d="5.3";if(!Internal.isAppVersionGreatThan(d))return void Internal.appVersionNotSupportCallback(d);var e={};a||(a=""),b||(b=""),e.downloadUrl=a,e.suffix=b,e.pageUrl=window.location.href,e.isIgnoreHttpsCertification=c;var f=Internal.makeParamString("Util","downloadData",e,"download_data");if(Internal.isIOS){var g=Internal.makeURLWithParam(f);Internal.loadURL(g)}else Internal.isAndroid?window.Util_a.downloadData(f):Internal.isWinOS&&Internal.callWin8App(f)},app_open_other_app:function(a,b,c){var d="5.3";if(!Internal.isAppVersionGreatThan(d))return void Internal.appVersionNotSupportCallback(d);var e={};a||(a=""),b||(b=""),c||(c=""),e.packageId=a,e.jsonParam=b,e.url=c;var f=Internal.makeParamString("Util","openOtherApp",e,"open_other_app");if(Internal.isIOS){var c=Internal.makeURLWithParam(f);Internal.loadURL(c)}else Internal.isAndroid?window.Util_a.openOtherApp(f):Internal.isWinOS&&Internal.callWin8App(f)},app_log:function(a,b){if(Internal.isNotEmptyString(a)){Internal.isNotEmptyString(b)||(b="");var c={};c.log=a,c.result=b,paramString=Internal.makeParamString("Util","h5Log",c,"log"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.h5Log(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)}},app_open_adv_page:function(a){var b="5.4";if(!Internal.isAppVersionGreatThan(b))return void Internal.appVersionNotSupportCallback(b);var c={};c.advUrl=a,paramString=Internal.makeParamString("Util","openAdvPage",c,"open_adv_page"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.openAdvPage(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)}},CtripUser={app_member_login:function(){paramString=Internal.makeParamString("User","memberLogin",null,"member_login"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.User_a.memberLogin(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_non_member_login:function(){paramString=Internal.makeParamString("User","nonMemberLogin",null,"non_member_login"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.User_a.nonMemberLogin(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_member_auto_login:function(){paramString=Internal.makeParamString("User","memberAutoLogin",null,"member_auto_login"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.User_a.memberAutoLogin(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_member_register:function(){paramString=Internal.makeParamString("User","memberRegister",null,"member_register"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.User_a.memberRegister(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)}},CtripEncrypt={app_base64_encode:function(a){var b="5.3";return Internal.isAppVersionGreatThan(b)?(a||(a=""),params={},params.toIncodeString=a,paramString=Internal.makeParamString("Encrypt","base64Encode",params,"base64_encode"),void(Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Encrypt_a.base64Encode(paramString):Internal.isWinOS&&Internal.callWin8App(paramString))):void Internal.appVersionNotSupportCallback(b)}},CtripPay={app_check_pay_app_install_status:function(){var a="5.4";if(!Internal.isAppVersionGreatThan(a))return void Internal.appVersionNotSupportCallback(a);var b=Internal.makeParamString("Pay","checkPayAppInstallStatus",null,"check_pay_app_install_status");Internal.isIOS?(url=Internal.makeURLWithParam(b),Internal.loadURL(url)):Internal.isAndroid?window.Pay_a.checkPayAppInstallStatus(b):Internal.isWinOS&&Internal.callWin8App(b)},app_open_pay_app_by_url:function(a,b,c,d){var e="5.4";if(!Internal.isAppVersionGreatThan(e))return void Internal.appVersionNotSupportCallback(e);b||(b=""),a||(a=""),c||(c=""),d||(d="");var f={};f.payMeta=b,f.payAppName=a,f.successRelativeURL=c,f.detailRelativeURL=d;var g=Internal.makeParamString("Pay","openPayAppByURL",f,"open_pay_app_by_url");Internal.isIOS?(url=Internal.makeURLWithParam(g),Internal.loadURL(url)):Internal.isAndroid?window.Pay_a.openPayAppByURL(g):Internal.isWinOS&&Internal.callWin8App(g)}},CtripPipe={app_send_HTTP_pipe_request:function(a,b,c,d,e,f){var g="5.4";if(!Internal.isAppVersionGreatThan(g))return void Internal.appVersionNotSupportCallback(g);a||(a=""),b||(b=""),c||(c=""),d||(d=""),e||(e=""),f||(f="");var h={};h.baseURL=a,h.path=b,h.method=c,h.header=d,h.parameters=e,h.sequenceId=f,paramString=Internal.makeParamString("Pipe","sendHTTPPipeRequest",h,"send_http_pipe_request"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Pipe_a.sendHTTPPipeRequest(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_abort_HTTP_pipe_request:function(a){var b="5.4";if(!Internal.isAppVersionGreatThan(b))return void Internal.appVersionNotSupportCallback(b);a||(a="");var c={};c.sequenceId=a,paramString=Internal.makeParamString("Pipe","abortHTTPRequest",c,"abort_http_pipe_request"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Pipe_a.abortHTTPRequest(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_send_H5_pipe_request:function(a,b,c,d){var e="5.4";if(!Internal.isAppVersionGreatThan(e))return void Internal.appVersionNotSupportCallback(e);a||(a=""),b||(b=""),c||(c=""),d||(d="");var f={};f.serviceCode=a,f.header=b,f.data=c,f.sequenceId=d,paramString=Internal.makeParamString("Pipe","sendH5PipeRequest",f,"send_h5_pipe_request"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Pipe_a.sendH5PipeRequest(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)}},CtripSumSungWallet={app_check_ticket_in_samsung_wallet:function(a){a||(a="");var b={};b.ticketID=a,paramString=Internal.makeParamString("SamSungWallet","checkTicketInSamSungWallet",b,"check_ticket_in_samsung_wallet"),Internal.isAndroid&&window.SamSungWallet_a.checkTicketInSamSungWallet(paramString)},app_download_ticket_in_samsung_wallet:function(a){a||(a="");var b={};b.ticketID=a,paramString=Internal.makeParamString("SamSungWallet","downloadTicketInSamSungWallet",b,"download_ticket_in_samsung_wallet"),Internal.isAndroid&&window.SamSungWallet_a.downloadTicketInSamSungWallet(paramString)},app_show_ticket_in_samsung_wallet:function(a){a||(a="");var b={};b.ticketID=a,paramString=Internal.makeParamString("SamSungWallet","showTicketInSamSungWallet",b,"show_ticket_in_samsung_wallet"),Internal.isAndroid&&window.SamSungWallet_a.showTicketInSamSungWallet(paramString)}},CtripFile={app_get_current_sandbox_name:function(){var a="5.4";if(!Internal.isAppVersionGreatThan(a))return void Internal.appVersionNotSupportCallback(a);var b={};b.pageUrl=window.location.href,paramString=Internal.makeParamString("File","getCurrentSandboxName",b,"get_current_sandbox_name"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.File_a.getCurrentSandboxName(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_write_text_to_file:function(a,b,c,d){var e="5.4";if(!Internal.isAppVersionGreatThan(e))return void Internal.appVersionNotSupportCallback(e);a||(a=""),b||(b=""),c||(c="");var f={};f.pageUrl=window.location.href,f.text=a,f.fileName=b,f.relativeFilePath=c,f.isAppend=d,paramString=Internal.makeParamString("File","writeTextToFile",f,"write_text_to_file"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.File_a.writeTextToFile(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_delete_file:function(a,b){var c="5.4";if(!Internal.isAppVersionGreatThan(c))return void Internal.appVersionNotSupportCallback(c);a||(a=""),b||(b="");var d={};d.fileName=a,d.relativeFilePath=b,d.pageUrl=window.location.href,paramString=Internal.makeParamString("File","deleteFile",d,"delete_file"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.File_a.deleteFile(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_read_text_from_file:function(a,b){var c="5.4";if(!Internal.isAppVersionGreatThan(c))return void Internal.appVersionNotSupportCallback(c);a||(a=""),b||(b="");var d={};d.fileName=a,d.pageUrl=window.location.href,d.relativeFilePath=b,paramString=Internal.makeParamString("File","readTextFromFile",d,"read_text_from_file"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.File_a.readTextFromFile(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_get_file_size:function(a,b){var c="5.4";if(!Internal.isAppVersionGreatThan(c))return void Internal.appVersionNotSupportCallback(c);a||(a=""),b||(b="");var d={};d.fileName=a,d.relativeFilePath=b,d.pageUrl=window.location.href,paramString=Internal.makeParamString("File","getFileSize",d,"get_file_size"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.File_a.getFileSize(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_check_file_exist:function(a,b){var c="5.4";if(!Internal.isAppVersionGreatThan(c))return void Internal.appVersionNotSupportCallback(c);a||(a=""),b||(b="");var d={};d.fileName=a,d.relativeFilePath=b,d.pageUrl=window.location.href,paramString=Internal.makeParamString("File","checkFileExist",d,"check_file_exist"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.File_a.checkFileExist(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_make_dir:function(a,b){var c="5.4";if(!Internal.isAppVersionGreatThan(c))return void Internal.appVersionNotSupportCallback(c);a||(a=""),b||(b="");var d={};d.dirName=a,d.pageUrl=window.location.href,d.relativeDirPath=b,paramString=Internal.makeParamString("File","makeDir",d,"make_dir"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.File_a.makeDir(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)}},CtripBar={app_refresh_nav_bar:function(a){Internal.isNotEmptyString(a)&&(jsonObj=JSON.parse(a),jsonObj.service="NavBar",jsonObj.action="refresh",jsonObj.callback_tagname="refresh_nav_bar",paramString=JSON.stringify(jsonObj),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.NavBar_a.refresh(paramString):Internal.isWinOS&&Internal.callWin8App(paramString))},app_set_navbar_hidden:function(a){var b="5.4";if(!Internal.isAppVersionGreatThan(b))return void Internal.appVersionNotSupportCallback(b);var c={};c.isHidden=a,paramString=Internal.makeParamString("NavBar","setNavBarHidden",c,"set_navbar_hidden"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.NavBar_a.setNavBarHidden(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)},app_set_toolbar_hidden:function(a){var b="5.4";if(!Internal.isAppVersionGreatThan(b))return void Internal.appVersionNotSupportCallback(b);var c={};c.isHidden=a,paramString=Internal.makeParamString("NavBar","setToolBarHidden",c,"set_toolbar_hidden"),Internal.isIOS?(url=Internal.makeURLWithParam(paramString),Internal.loadURL(url)):Internal.isAndroid?window.Util_a.setToolBarHidden(paramString):Internal.isWinOS&&Internal.callWin8App(paramString)}};CtripTool.app_is_in_ctrip_app();