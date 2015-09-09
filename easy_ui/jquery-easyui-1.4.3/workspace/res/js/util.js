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

