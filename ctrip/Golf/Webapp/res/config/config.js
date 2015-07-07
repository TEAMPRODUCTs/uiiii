define([], function () {
    /**
        *@namespace config/config
        *@author zh.xu
    */
    var Config = {
        /**
            *@description 版本号，目前支付没有用到这个
            *@inner
            *@memberof config/config
        */
        VER: 'V6.1 B20141113a',

        /**
        *@description 版本号，每个版本必须改
        *@inner
        *@memberof config/config
        */
        APP_VER : 603,

        /**
            *@description 调试标示符，已过时,使用.net 的debug（?debug=1)
            *@deprecated
            *@inner
            *@memberof config/config
        */
        DEBUG: 1,
        /**
            *@description 可以使用本地数据调试，0表示未开启，1表示开启
            *@inner
            *@memberof config/config
        */
        MOCK_SERVICE_CALL: 0,      //use local data instead of actual service call
        //Secure.ctrip.com堡垒内网IP：10.8.5.10
        //Wpg.ctrip.com堡垒内网IP：10.8.5.25公网IP：101.226.248.102
        //m.ctrip.com堡垒内网IP：10.8.2.111
        /**
            *@description 服务请求不同环境对应地址
            *@inner
            *@memberof config/config
        */
        DOMAINARR: {
            "local": { "domain": 'ws.security.pay.fat103.qa.nt.ctripcorp.com/', "path": "api-webapp" },
            "fat": { "domain": 'ws.security.pay.fat103.qa.nt.ctripcorp.com/', "path": "api-webapp" },
            "fws": { "domain": "gateway.secure.fws.qa.nt.ctripcorp.com", "path": "restful/soa2/10289" },
            "uat": { "domain": "gateway.secure.uat.qa.nt.ctripcorp.com", "path": "restful/soa2/10289" },
            "baolei": { "domain": "gateway.secure.ctrip.com", "path": "restful/soa2/10289" },
            "pro": { "domain": "m.ctrip.com", "path": "/restapi/soa2/10101" } //测试用
        },
        /**
            *@description 不同环境首页地址，如m.ctrip.com
            *@inner
            *@memberof config/config
        */
        DOMAIN_HOME_ARR: {
            'local': 'm.fat19.qa.nt.ctripcorp.com',
            'fat': 'm.fat19.qa.nt.ctripcorp.com',
            'fws': 'm.fat19.qa.nt.ctripcorp.com',
            'uat': 'm.uat.qa.nt.ctripcorp.com',
            'baolei': '10.8.2.111',
            'pro': 'm.ctrip.com'
        },
        /**
            *@description 不同环境的登录地址
            *@inner
            *@memberof config/config
        */
        DOMAIN_LOGIN_ARR: {
            'local': 'accounts.fat49.qa.nt.ctripcorp.com',
            'fat': 'accounts.fat49.qa.nt.ctripcorp.com',
            'fws': 'accounts.fat49.qa.nt.ctripcorp.com',
            'uat': 'accounts.uat.qa.nt.ctripcorp.com',
            'baolei': 'accounts.ctrip.com',
            'pro': 'accounts.ctrip.com'
        },
        /**
            *@description 区分接口环境，如?isBastionRequest=true
            *@inner
            *@memberof config/config
        */
        HZ_PARAM: {
            'local': '', //根据服务端环境确定 fat18需要添加 fws不需要添加
            'fat': '?subEnv=fat1', //fat18添加
            'fws': '', //fws不需要
            'uat': '',
            'baolei': '?isBastionRequest=true',
            'pro': ''
        },

        /**
            *@description 获取环境名称
            *@function _env
            *@return {string} 环境名称如pro,uat
            *@inner
            *@memberof config/config
        */

        //local api bellow
        _env: function () {

            var host = location.host;
            if (host.match(/^(localhost|10\.32)/i)) {
                return "pro";
            }
            else if (host.match(/^pay\.fws/i)) {
                return "fws";
            } else if (host.match(/^pay\.fat18/i) || host.match(/^pay\.fat108/i)) {
                return "fat";
            } else if (host.match(/^pay\.uat/i)) {
                return "uat";
            }else if (host.match(/^10\.8\.5\.10/i)) {
                return "baolei";
            }
            else {
                return "pro";
            }

        }
    }

    Config.ENV = Config._env(); //获取服务环境
    return Config;
});
