require.config({
    baseUrl: "./",
    paths: {
        'GolfModel': 'front/models/golfModel',
        'GolfStore': 'front/models/golfStore',
        'VaBaseView': 'res/scripts/views/BaseView',
        'views': 'front/views',
        'templates': 'front/templates',
        //公共页面
        'CPageStore': '../cpage/models/cpagestore'
    },
    urlArgs: 'v=' + window.TOUR_VER // 修改这里的版本号
})
require(['libs', 'App'], function (libs, App) {
    new App({
        'defaultView': 'index', //指定了访问没有配置hash值时。，默认访问的页面
        'viewRootPath': 'views/', //制定了view的路径
        'animatSwitch': false
    });
});