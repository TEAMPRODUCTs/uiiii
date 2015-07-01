require.config({
    baseUrl: "./",
    paths: {
        'GolfModel': 'models/golfModel',
        'GolfStore': 'models/golfStore',
        'TourModel': 'models/tourModel',
        'TourStore': 'models/tourStore', /*TODO*/
        'VaBaseView': 'res/scripts/views/BaseView',
        //公共页面
        'CPageStore': '../cpage/models/cpagestore',
        'text':'res/libs/require.text'
    },
    urlArgs: 'v=' + window.TOUR_VER // 修改这里的版本号
})
/*
require([ 'App'], function (App) {
    new App({
        'defaultView': 'index', //指定了访问没有配置hash值时。，默认访问的页面
        'viewRootPath': 'views/', //制定了view的路径
        'animatSwitch': false
    });
});*/
