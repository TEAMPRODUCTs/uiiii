/**
 * Created by fiona.xu on 2015/8/27.
 */
/*define(["easyui"], function () {*/
define([], function () {
    var tabView = {
        tabs: null,
        init: function(elemId, option){
           this.tabs =  $('#' + elemId).tabs();
        },

        addTab: function(option){
            this.tabs.addTab(option);
        }
    };

    return tabView;
})