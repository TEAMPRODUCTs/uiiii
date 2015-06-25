/**
 * Created by wmjiao on 14-7-17.
 */
define(['libs', 'c', 'VaBaseView', 'text!templates/download.html'],
    function (libs, c, pageview, downloadTemplate) {
        var vesion = '5.0.0';
        var android_url = 'http://download.ctrip.com/client/app/iwangolf_'+ vesion + '.apk';//TODO
      //  var android_url = 'http://pan.baidu.com/s/1eQuzSqe';
        var ios_url = 'https://itunes.apple.com/cn/app/id890803357';
        var _title = "爱玩高尔夫";
        var ua = navigator.userAgent.toLowerCase();
        var downloadView = pageview.extend({
            pageid : '275009',
            hpageid : '276009',
            render: function (data) {
                //this.$el.html(downloadTemplate);
                var templteFn = _.template(downloadTemplate);
                var viewhtml = templteFn(data);
                this.$el.html(viewhtml);
            },
            onCreate: function () {
                this.injectHeaderView();
                this.render();
            },
            events: {
            },
            onLoad: function () {
                isInApp = c.utility.isInApp();
                isAndroid = $.os && $.os.android;
                this.render({
                    android_url:android_url,
                    ios_url:ios_url
                });
                //暂时决定不要头部导航
//                if(ua.match(/MicroMessenger/i)!="micromessenger"){
//                    this.headerview.set({
//                        title: _title,
//                        back: true,
//                        view: this,
//                        tel: null,
//                        events: {
//                            returnHandler: function(){
//                                this.jump('./');
//                                isInApp.backToHome()
//                            }
//                        }
//                    })
//                }
//                this.headerview.show();
                this.turning();
            },
            onShow: function () {
                if (/android/i.test(ua)){
                    //Android
                    $(".tip-ios").hide();
                }
                else if (/ipad|iphone|mac/i.test(ua)){
                    //IOS
                    $(".tip-android").hide();
                }
                if(ua.match(/MicroMessenger/i)!="micromessenger"){
                    $(".tip-android").hide();
                    $(".tip-ios").hide();
                }
                window.onload = function() {
                    if (/android/i.test(ua)){
                        //Android
                        window.location.href = android_url;
                    }
                };
//                else if (/ipad|iphone|mac/i.test(ua)){
//                    //IOS
//                    $(".tip-android").hide();
//                }
            },
            onHide: function () {
            }
        });
        return downloadView;
    });
