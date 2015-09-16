/**
 * Created by fiona.xu on 2015/8/28.
 */

define([], function () {
    var util = {
        /**
         * object: o
         * deep copy or not: d
         * */
        cloneObject: function(o, d){
            if ( o === null || o === undefined || typeof ( o ) !== 'object' )
            {
                return o;
            }

            var deep = !!d;

            var cloned;

            if ( o.constructor === Array )
            {
                if ( deep === false )
                {
                    return o;
                }

                cloned = [];

                for ( var i in o )
                {
                    cloned.push( this.cloneObject( o[i], deep ) );
                }

                return cloned;
            }

            cloned = {};

            for ( var i in o )
            {
                cloned[i] = deep ? this.cloneObject( o[i], true ) : o[i];
            }

            return cloned;
        },
        formateDate: function(date, format){
            /*
             * format="yyyy-MM-dd hh:mm:ss";
             */

            var o = {
                "M+" : date.getMonth() + 1,
                "d+" : date.getDate(),
                "h+" : date.getHours(),
                "m+" : date.getMinutes(),
                "s+" : date.getSeconds(),
                "q+" : Math.floor((date.getMonth() + 3) / 3),
                "S" : date.getMilliseconds()
            }

            if (/(y+)/.test(format))
            {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4
                    - RegExp.$1.length));
            }

            for (var k in o)
            {
                if (new RegExp("(" + k + ")").test(format))
                {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        },
        generateId: function(idPrefix){
            var timestamp=new Date().getTime();//获取当前时间戳 生成id
            var id = idPrefix + timestamp;
            return id;
        }
    };

    return util;
    var storage = window.localStorage;
    var constant = {
        type:{
            magnanimity: "magnanimity",
            row:"row",
            column:"column"
        }
    }
});

