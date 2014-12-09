define(['libs', 'c', 'PayStore', 'PayModel', 'PayBaseView', 'cUtility', 'cWidgetFactory', 'cWidgetGuider'],
    function (libs, c, payStore, payModel, PayBaseView, cUtility, widgetFactory) {
        var isInApp = cUtility.isInApp();
    var Guider = widgetFactory.create('Guider');
    var View = PayBaseView.extend({
        isInApp: isInApp,
        forward: function (view) {
        	var _view = view;
            if (_view)
                Lizard.goTo(_view.replace(/#*(.*)/gi, "$1"), { "viewName": _view.replace(/#*([\w]*)\?{0,1}.*/gi, "$1"), 'cache': true });
        },
        back: function (view) {
        	var _view = view;
            if (_view) {
                Lizard.goBack(_view.replace(/#*(.*)/gi, "$1"), { "viewName": _view.replace(/#*([\w]*)\?{0,1}.*/gi, "$1"), 'cache': true });
            } else {
                Lizard.goBack();
            }
            
        },
        getQuery: function (name) {//?key=value 通过key获取value
            var _value = "";
            if (this.isInApp) {
                if (location.href.match(new RegExp(name + "%3D", "i"))) {
                    _value = location.href.replace(new RegExp(".*" + name + "%3D([\\w%]*).*", "i"), '$1');
                }
            } else {
                if (location.href.match(new RegExp(name + "=", "i"))) {
                    _value = location.href.replace(new RegExp(".*" + name + "=([\\w%]*).*", "i"), '$1');
                }
            }
            return _value;
        },

        //兼容Lizard 1.0 取1.0 hash
        getViewUrl: function () {
            var _url = "";
            //_url = location.href.replace(/.*payment\//i, "");
            _url =  location.href.replace(new RegExp(".*" + Lizard.appBaseUrl + "([.*]*)", "i"), '$1');
            return _url;
        },
        //兼容lizard 1.0 模拟取hash
        getViewHash: function(view){
            var hash = "";
            if(!view){
                view = location.href.replace(new RegExp(".*" + Lizard.appBaseUrl + "([.*]*)", "i"), '$1');
            }
            hash = view.replace(/([\w]*).*/i, '$1');
            return hash;
        }
    });
    return View;
});