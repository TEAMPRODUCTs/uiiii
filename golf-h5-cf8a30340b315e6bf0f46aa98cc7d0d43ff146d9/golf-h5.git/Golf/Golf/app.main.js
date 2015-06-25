require.config({
    baseUrl: "./",
    paths: {
        'GolfModel': 'models/golfModel',
        'GolfStore': 'models/golfStore',
        'VaBaseView': 'res/scripts/views/BaseView',
        //公共页面
        'CPageStore': '../cpage/models/cpagestore'

    }
});
window.appInstance = false;

window.localStorage.setItem('ISINAPP', '1');
window.app = {};
window.app.callback = function (options) {

    var methods = {
        'web_view_finished_load': function () {

            if (window.localStorage) {
                var appInfo = options.param;
                if (appInfo) window.localStorage.setItem('APPINFO', JSON.stringify(appInfo));
            }

            CtripUtil.app_init_member_H5_info();
        },

        'init_member_H5_info': function (params) {

            require(['libs', 'App', 'CommonStore', 'cLog'], function (libs, App, CommonStore, cLog) {
                window.appInstance = true;
                cLog.applog('init_member_H5_info', params);
                if (window.localStorage && params) {

                    if (params && params.clientID) {
                        var headStore = CommonStore.HeadStore.getInstance();
                        var headInfo = headStore.get();
                        headInfo.cid = params.clientID;
                        headStore.set(headInfo);
                    };

                    if (params && params.userInfo) {
                        try {
                            var userStore = CommonStore.UserStore.getInstance();
                            var userInfo = userStore.getUser();
                            params.userInfo.data.BMobile = params.userInfo.data.BindMobile;
                            userStore.setUser(params.userInfo.data);

                            var headStore = CommonStore.HeadStore.getInstance();
                            var headInfo = headStore.get();
                            headInfo.auth = params.userInfo.data.Auth;
                            headStore.set(headInfo);
                        } catch (e) {
                            alert('set data error');
                        }
                    } else {
                        var userStore = CommonStore.UserStore.getInstance();
                        userStore.removeUser();
                    }


                    if (params && params.device) {
                        var deviceInfo = {
                            device: params.device
                        }
                        window.localStorage.setItem('DEVICEINFO', JSON.stringify(deviceInfo));
                    }


                    if (params && params.appId) {
                        var appInfo = {
                            version: params.version,
                            appId: params.appId,
                            serverVersion: params.serverVersion,
                            platform: params.platform
                        }

                        //var headStore = CommonStore.HeadStore.getInstance();
                        //var headInfo = headStore.get();
                        //headInfo.syscode = params.platform == '1' ? 12 : 32;
                        //headInfo.cver = params.version;
                        //headStore.set(headInfo);

                        window.localStorage.setItem('APPINFO', JSON.stringify(appInfo));
                    }

                    if (params && params.timestamp) {
                        var date = new Date();

                        var serverdate = {
                            server: params.timestamp,
                            local: date.getTime()
                        }

                        window.localStorage.setItem('SERVERDATE', JSON.stringify(serverdate));
                    }

                    if (params && params.sourceId) {
                        var headStore = CommonStore.HeadStore.getInstance();
                        var headInfo = headStore.get();
                        headInfo.sid = params.sourceId;
                        headStore.set(headInfo);
                        window.localStorage.setItem('SOURCEID', params.sourceId);
                    }

                    if (params && params.isPreProduction) {
                        window.localStorage.setItem('isPreProduction', params.isPreProduction);
                    }
                }

                //UBT
                var content = '!function () { var a, b, c, d, e, f, g, i; if (true) { for (a = document.getElementsByTagName("script") || [],' +
                    ' b = /_bfa\.min\.js/i, c = 0; c < a.length; c++) if (b.test(a[c].src)) return; if (!(window.$_bf || window.$LAB || window.CtripJsLoader))' +
                    ' { d = new Date, e = "?v=" + d.getFullYear() + d.getMonth() + "_" + d.getDate() + ".js", f = document.createElement("script"),' +
                    ' f.type = "text/javascript", f.charset = "utf-8", f.async = !0; try { g = "https:" == document.location.protocol } catch (h) ' +
                    '{ g = "https:" == document.URL.match(/[^:]+/) + ":" } f.src = g ? "https://s.c-ctrip.com/_bfa.min.js" + e : "http://webresource.c-ctrip.com' +
                    '/code/ubt/_bfa.min.js" + e, i = document.getElementsByTagName("script")[0], i.parentNode.insertBefore(f, i) } } } ();';

                var s = $('<script>' + content + '//<' + '\/scrtip>');
                $('body').append(s);

                new App({
                    'defaultView': 'index', //指定了访问没有配置hash值时。，默认访问的页面
                    'viewRootPath': 'views/', //制定了view的路径
                    'animatSwitch': false
                });
            });
        },

        'app_h5_need_refresh': function () {

            require(['libs', 'App'], function (libs, App) {
                new App({
                    'defaultView': 'index', //指定了访问没有配置hash值时。，默认访问的页面
                    'viewRootPath': 'views/', //制定了view的路径
                    'animatSwitch': false
                });
            });
        }
    }

    if (options && typeof methods[options.tagname] === 'function') {
        methods[options.tagname](options.param);
    }
};