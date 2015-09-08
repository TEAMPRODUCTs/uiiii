/**
 * Created by fiona.xu on 2015/8/26.
 */
require.config({
    baseUrl: 'res/',
    paths:{
        "jquery":"jquery"
    },
    shim: {
        jquery: {
            exports: "jQuery"//这是原来jQuery库的命名空间，必须写上
        }
    }
});
