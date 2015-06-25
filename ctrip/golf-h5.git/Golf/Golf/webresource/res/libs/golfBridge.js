/**
 * Created by sq_xu on 14-6-17.
 */
var IWanUtil = {
    app_goto_booking: function(){
        paramString = Internal.makeParamString("Golf", "goToBooking", null, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.goToBooking(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },

    /**
     * @c {orderId:1, from:nopage}
     * */
    app_goto_order_detail: function(a , page){
        if (!a) {
            a = ""
        }
        var c = {};
        c.orderId = a;
        c.from = page;
        paramString = Internal.makeParamString("Golf", "goToOrderDetail", c, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.goToOrderDetail(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },


    app_goto_order: function(){
        paramString = Internal.makeParamString("Golf", "goToOrder", null, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.goToOrder(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },

    app_back_to_home: function(){
        paramString = Internal.makeParamString("Golf", "backToHome", null, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.backToHome(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },

    /*微信朋友圈分享*/
    app_call_weixin_share: function(title, text, linkUrl, imageRelativePath, isIOSSystemShare){
        var g = {};
        title || (title = ''), text || (text = ''), linkUrl||(linkUrl = ''), imageRelativePath||(imageRelativePath = ''), isIOSSystemShare||(isIOSSystemShare = '');
        g.title = title;
        g.text = text;
        g.linkUrl = linkUrl;
        g.imageRelativePath = imageRelativePath;
        g.isIOSSystemShare = isIOSSystemShare;

        paramString = Internal.makeParamString("Golf", "call_weixin_share", g, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.call_weixin_share(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },


    /*微信好友分享*/
    app_call_friends_share: function(title, text, linkUrl, imageRelativePath, isIOSSystemShare){
        var g = {};
        title || (title = ''), text || (text = ''), linkUrl||(linkUrl = ''), imageRelativePath||(imageRelativePath = ''), isIOSSystemShare||(isIOSSystemShare = '');
        g.title = title;
        g.text = text;
        g.linkUrl = linkUrl;
        g.imageRelativePath = imageRelativePath;
        g.isIOSSystemShare = isIOSSystemShare;

        paramString = Internal.makeParamString("Golf", "call_friends_share", g, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.call_friends_share(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },



    /*邮件分享*/
    app_call_email_share: function(title, text, linkUrl, imageRelativePath, isIOSSystemShare){
        var g = {};
        title || (title = ''), text || (text = ''), linkUrl||(linkUrl = ''), imageRelativePath||(imageRelativePath = ''), isIOSSystemShare||(isIOSSystemShare = '');
        g.title = title;
        g.text = text;
        g.linkUrl = linkUrl;
        g.imageRelativePath = imageRelativePath;
        g.isIOSSystemShare = isIOSSystemShare;

        paramString = Internal.makeParamString("Golf", "call_email_share", g, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.call_email_share(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },

    /*短信分享*/
    app_call_message_share: function(title, text, linkUrl, imageRelativePath, isIOSSystemShare){
        var g = {};
        title || (title = ''), text || (text = ''), linkUrl||(linkUrl = ''), imageRelativePath||(imageRelativePath = ''), isIOSSystemShare||(isIOSSystemShare = '');
        g.title = title;
        g.text = text;
        g.linkUrl = linkUrl;
        g.imageRelativePath = imageRelativePath;
        g.isIOSSystemShare = isIOSSystemShare;

        paramString = Internal.makeParamString("Golf", "call_message_share", g, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.call_message_share(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },


    /*微信好友分享*/
    app_call_recommendByCode_update: function(recommendByCode){
        var g = {};
        recommendByCode || (recommendByCode = '');
        g.recommendByCode = recommendByCode;

        paramString = Internal.makeParamString("Golf", "call_recommendByCode_update", g, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.call_recommendByCode_update(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },


    app_rotate_screen: function(orientation) {
        var para = {};
        para.orientation = orientation;

        paramString = Internal.makeParamString("Golf", "rotateScreen", para, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.rotateScreen(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },

    app_start_score_recording: function() {
        var paramString = Internal.makeParamString("Golf", "startScoreRecording", null, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                window.Golf_a.startScoreRecording(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    },

    app_on_game_deletion: function(gameID) {
        var para = {};
        para.gameID = gameID;

        var paramString = Internal.makeParamString("Golf", "onGameDeletion", para, null);
        if(Internal.isIOS){
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }else{
            if (Internal.isAndroid) {
                //CtripUtil.app_log("Android", "onGameDeletion called");
                window.Golf_a.onGameDeletion(paramString)
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    }
};
