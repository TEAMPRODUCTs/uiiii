define(['cUtility'], function (cUtility) {
    var Config = {
        VER: 'V6.1 B20141113a',
        DEBUG: 1,
        MOCK_SERVICE_CALL: 0,      //use local data instead of actual service call
        //Secure.ctrip.com堡垒内网IP：10.8.5.10
        //Wpg.ctrip.com堡垒内网IP：10.8.5.25公网IP：101.226.248.102
        //m.ctrip.com堡垒内网IP：10.8.2.111
        DOMAINARR: {
            "local": { "domain": 'gateway.secure.fws.qa.nt.ctripcorp.com', "path": "restful/soa2/10289" },
            "test": { "domain": "gateway.secure.fws.qa.nt.ctripcorp.com", "path": "restful/soa2/10289" },
            "uat": { "domain": "gateway.secure.uat.qa.nt.ctripcorp.com", "path": "restful/soa2/10289" },
            "baolei": { "domain": "gateway.secure.ctrip.com", "path": "restful/soa2/10289" },
            "pro": { "domain": "gateway.secure.ctrip.com", "path": "restful/soa2/10289" }
        },
        DOMAIN_HOME_ARR: {
            'local': 'm.fat19.qa.nt.ctripcorp.com',
            'test': 'm.fat19.qa.nt.ctripcorp.com',
            'uat': 'm.uat.qa.nt.ctripcorp.com',
            'baolei': '10.8.2.111',
            'pro': 'm.ctrip.com'
        },
        DOMAIN_LOGIN_ARR: {
            'local': 'accounts.fat49.qa.nt.ctripcorp.com',
            'test': 'accounts.fat49.qa.nt.ctripcorp.com',
            'uat': 'accounts.uat.qa.nt.ctripcorp.com',
            'baolei': 'accounts.ctrip.com',
            'pro': 'accounts.ctrip.com'
        },
        HZ_PARAM: {
            'local': '?subEnv=fat1',
            'test': '?subEnv=fat1',
            'uat': '',
            'baolei': '?isBastionRequest=true',
            'pro': ''
        },
        //local api bellow
        _env: function () {
            if (this.IS_INAPP) {
                if (cUtility.isPreProduction() == '1') { // 定义堡垒环境
                    return "baolei";
                }
                else if (cUtility.isPreProduction() == '0') { // 定义测试环境
                    return "test";
                } else if (cUtility.isPreProduction() == '2') { // 定义UAT环境
                    return "uat";
                } else {
                    return "pro";
                }
            }
            else {
                var host = location.host;
                if (host.match(/^(localhost|172\.16|127\.0)/i)) {
                    return "local";
                }
                else if (host.match(/^secure\.fat18/i) || host.match(/^secure\.fat19/i) || host.match(/^secure\.fws/i)) {
                    return "test";
                }
                else if (host.match(/^secure\.uat/i)) {
                    return "uat";
                }
                else if (host.match(/^10\.8\.2\.111/i) || host.match(/^10\.8\.5\.10/i)) {
                    return "baolei";
                }
                else {
                    return "pro";
                }
            }
        }
    }
    Config.IS_INAPP = cUtility.isInApp();

    Config.ENV = Config._env(); //获取服务环境
    return Config;
});