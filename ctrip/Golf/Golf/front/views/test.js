/**
 * Created by sq_xu on 14-7-16.
 */
/**
 * @license RequireJS text 2.0.5+ Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

function getViewsPath() {
    return"youth/views/"
}
function buildViewPath(e) {
    return getViewsPath() + e
}
function buildViewTemplatesPath(e) {
    return"text!" + getViewsPath() + e
}
define("text", ["module"], function (e) {
    var t, n, r, i, s = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], o = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, u = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, a = typeof location != "undefined" && location.href, f = a && location.protocol && location.protocol.replace(/\:/, ""), l = a && location.hostname, c = a && (location.port || undefined), h = [], p = e.config && e.config() || {};
    t = {version: "2.0.5+", strip: function (e) {
        if (e) {
            e = e.replace(o, "");
            var t = e.match(u);
            t && (e = t[1])
        } else e = "";
        return e
    }, jsEscape: function (e) {
        return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
    }, createXhr: p.createXhr || function () {
        var e, t, n;
        if (typeof XMLHttpRequest != "undefined")return new XMLHttpRequest;
        if (typeof ActiveXObject != "undefined")for (t = 0; t < 3; t += 1) {
            n = s[t];
            try {
                e = new ActiveXObject(n)
            } catch (r) {
            }
            if (e) {
                s = [n];
                break
            }
        }
        return e
    }, parseName: function (e) {
        var t, n, r, i = !1, s = e.indexOf("."), o = e.indexOf("./") === 0 || e.indexOf("../") === 0;
        return s !== -1 && (!o || s > 1) ? (t = e.substring(0, s), n = e.substring(s + 1, e.length)) : t = e, r = n || t, s = r.indexOf("!"), s !== -1 && (i = r.substring(s + 1) === "strip", r = r.substring(0, s), n ? n = r : t = r), {moduleName: t, ext: n, strip: i}
    }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function (e, n, r, i) {
        var s, o, u, a = t.xdRegExp.exec(e);
        return a ? (s = a[2], o = a[3], o = o.split(":"), u = o[1], o = o[0], (!s || s === n) && (!o || o.toLowerCase() === r.toLowerCase()) && (!u && !o || u === i)) : !0
    }, finishLoad: function (e, n, r, i) {
        r = n ? t.strip(r) : r, p.isBuild && (h[e] = r), i(r)
    }, load: function (e, n, r, i) {
        if (i.isBuild && !i.inlineText) {
            r();
            return
        }
        p.isBuild = i.isBuild;
        var s = t.parseName(e), o = s.moduleName + (s.ext ? "." + s.ext : ""), u = n.toUrl(o), h = p.useXhr || t.useXhr;
        !a || h(u, f, l, c) ? t.get(u, function (n) {
            t.finishLoad(e, s.strip, n, r)
        }, function (e) {
            r.error && r.error(e)
        }) : n([o], function (e) {
            t.finishLoad(s.moduleName + "." + s.ext, s.strip, e, r)
        })
    }, write: function (e, n, r, i) {
        if (h.hasOwnProperty(n)) {
            var s = t.jsEscape(h[n]);
            r.asModule(e + "!" + n, "define(function () { return '" + s + "';});\n")
        }
    }, writeFile: function (e, n, r, i, s) {
        var o = t.parseName(n), u = o.ext ? "." + o.ext : "", a = o.moduleName + u, f = r.toUrl(o.moduleName + u) + ".js";
        t.load(a, r, function (n) {
            var r = function (e) {
                return i(f, e)
            };
            r.asModule = function (e, t) {
                return i.asModule(e, f, t)
            }, t.write(e, a, r, s)
        }, s)
    }};
    if (p.env === "node" || !p.env && typeof process != "undefined" && process.versions && !!process.versions.node)n = require.nodeRequire("fs"), t.get = function (e, t) {
        var r = n.readFileSync(e, "utf8");
        r.indexOf("﻿") === 0 && (r = r.substring(1)), t(r)
    }; else if (p.env === "xhr" || !p.env && t.createXhr())t.get = function (e, n, r, i) {
        var s = t.createXhr(), o;
        s.open("GET", e, !0);
        if (i)for (o in i)i.hasOwnProperty(o) && s.setRequestHeader(o.toLowerCase(), i[o]);
        p.onXhr && p.onXhr(s, e), s.onreadystatechange = function (t) {
            var i, o;
            s.readyState === 4 && (i = s.status, i > 399 && i < 600 ? (o = new Error(e + " HTTP status: " + i), o.xhr = s, r(o)) : n(s.responseText))
        }, s.send(null)
    }; else if (p.env === "rhino" || !p.env && typeof Packages != "undefined" && typeof java != "undefined")t.get = function (e, t) {
        var n, r, i = "utf-8", s = new java.io.File(e), o = java.lang.System.getProperty("line.separator"), u = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s), i)), a = "";
        try {
            n = new java.lang.StringBuffer, r = u.readLine(), r && r.length() && r.charAt(0) === 65279 && (r = r.substring(1)), n.append(r);
            while ((r = u.readLine()) !== null)n.append(o), n.append(r);
            a = String(n.toString())
        } finally {
            u.close()
        }
        t(a)
    }; else if (p.env === "xpconnect" || !p.env && typeof Components != "undefined" && Components.classes && Components.interfaces)r = Components.classes, i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), t.get = function (e, t) {
        var n, s, o = {}, u = new FileUtils.File(e);
        try {
            n = r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), n.init(u, 1, 0, !1), s = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), s.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), s.readString(n.available(), o), s.close(), n.close(), t(o.value)
        } catch (a) {
            throw new Error((u && u.path || "") + ": " + a)
        }
    };
    return t
}), define("text!RuleTemplate", [], function () {
    return'<div class="r_container" style="line-height: 20px">\r\n\r\n    <div style="color:red">活动时间：2014年7月21日 — 2014年7月23日</div>\r\n    <div style="color:red">活动资格：仅限在百度、91、安卓市场下载，其他均不参与本次活动。</div>\r\n    \r\n    <br />\r\n    \r\n    <div>邀请步骤：</div>\r\n    <div>1. 点击 <span style="color:red">“我>我的任务>邀请小伙伴”</span>,通过微信、微信朋友圈、短信等方式邀请好友，或扫描二维码邀请。</div>\r\n    <div>2. 好友下载携程学生旅行APP并注册后，输入邀请码。</div>\r\n    <div>3. 验证成功，双方都可获得10元礼品卡。</div>\r\n    <br />\r\n    <div>注意事项：</div>\r\n    <div>1. 每成功邀请1人，邀请人和被邀请人均可获得10元携程礼品卡（任我游）。礼品卡将会在一周内发送到您的账户，详情可以在<span style="color:red">“我>更多>我的钱包>礼品卡账户“</span>查看。</div>\r\n    <div>2. 礼品卡使用规则：</div>\r\n    <div style="padding-left: 10px">\r\n        <div>1) 携程礼品卡（任我游）可预订预付费类酒店、惠选酒店、旅游度假产品、团购产品（注：自由机+酒产品、门票类产品、代驾租车产品及银行专享类旅游度假产品等暂不支持礼品卡支付）。</div>\r\n        <div>2) 礼品卡使用有效期截至<span style="color:red">2014年12月31日</span>。</div>\r\n        <div>3) 礼品卡金额可累积使用。</div>\r\n        <div></div>\r\n\r\n    </div>\r\n    <div>3. 如被邀请好友之前已经是携程用户，则无法获得邀请奖励。</div>\r\n    <div>4. 每个从学生版注册的新账号只能用邀请码成功验证1次。</div>\r\n    <div>5. 1台设备上只能支持1个账号验证，不支持1台手机验证多号。</div>\r\n    <div>6. 每个账号最多只能邀请100个用户</div>\r\n    <div>7. 本活动仅针对真实有效用户，任何作弊用户、有恶意行为用户将被取消奖励资格。</div>\r\n    <div>8. 携程可根据活动举办的实际情况，在法律允许的范围内，对本活动规则进行变动或调整，相关变动或调整将公布在活动规则页面上。</div>\r\n</div>\r\n'
}), define("text!DownloadTemplate", [], function () {
    return'\r\n<div class="splash">\r\n	<div class="wrap">\r\n		<div class="splash-content">\r\n			<div class="slogan">\r\n				<p>携程学生旅行v1.0<br />国内首款学生专属一站式旅行APP<br />享受学生自己的旅行体验！</p>\r\n				<div class="download-btn">\r\n					<a  class="btn-ios" id="j-ios">iOS 免费下载</a>\r\n					<a  class="btn-android" id="j-android" >Android 免费下载</a>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n<div class="feature-intro">\r\n	<div class="wrap">\r\n		<div class="feature-text">\r\n			<h3>功能介绍</h3>\r\n			<p>火车票、门票上线学生票啦<br />精彩专题，激发你的旅行灵感<br />微博、QQ、人人一键登录<br />搜索优化，低价产品尽在掌中<br />想游就游，暑期首单送10元！</p>\r\n		</div>\r\n	</div>\r\n</div>\r\n<div class="feature-assistant">\r\n	<div class="wrap">\r\n		<div class="feature-text">\r\n			<h3>学生一站式旅行助手</h3>\r\n			<p>提供酒店、机票、火车票、门票、用车预订<br />学生团队游、周末游、团购优惠一手掌握<br />贴心旅行小助手，把世界装进口袋</p>\r\n		</div>\r\n	</div>\r\n</div>\r\n<div class="feature-privilege">\r\n	<div class="wrap">\r\n		<div class="feature-text">\r\n			<h3>手机专享产品特权</h3>\r\n			<p>青年旅社、民宿客栈，学生想要的我们都有<br />搜索查询体验优化，超值酒店超值享受</p>\r\n		</div>\r\n	</div>\r\n</div>\r\n<div class="feature-invitation">\r\n	<div class="wrap">\r\n		<div class="feature-text">\r\n			<h3>和我的小伙伴<br />一起去旅行</h3>\r\n			<p>拒绝宅在宿舍，让青春，远行吧！<br />想游就游，暑期首单送10元！<br />你的快乐我们买单！</p>\r\n		</div>\r\n	</div>\r\n</div><div class="tip-android" style="display:none">\r\n	若使用微信打开未自动下载，点击<i class="icon-menu"></i>选择 “<i class="icon-browser"></i><em>在浏览器中打开</em>” 即可下载携程学生旅行客户端！\r\n</div>\r\n\r\n<div style="display:none">\r\n    <iframe id="downloadifm"></iframe>\r\n\r\n</div>'
}), define("text!TaskshareTemplate", [], function () {
    return'<div class="sp_bg" style="height:auto">\r\n    <img src="res/img/bg_spdr.png" style="width:100%" />\r\n    <a class="sp_down" href="javascript:void(0)">\r\n        更多内容请下载携程学生旅行查看\r\n    </a>\r\n</div>'
}), define("text!TaskShareRuleTemplate", [], function () {
    return'<div class="r_container" style="line-height: 20px">\r\n    <div >一、活动时间：</div>\r\n    <div >1.总排行时间：2014年7月21日00:00:00——2014年8月24日23:59:59\r\n</div>\r\n    <br />\r\n\r\n    <div>2.周排行时间：</div>\r\n    <div style="padding-left: 15px">\r\n        <div>第一周：2014年7月21日00:00:00——2014年7月27日23:59:59；</div>\r\n        <div>第二周：2014年7月28日00:00:00——2014年8月3日23:59:59；</div>\r\n        <div>第三周：2014年8月4日00:00:00——2014年8月10日23:59:59；</div>\r\n        <div>第四周：2014年8月11日00:00:00——2014年8月17日23:59:59；</div>\r\n        <div>第五周：2014年8月18日00:00:00——2014年8月24日23:59:59；</div>\r\n    </div>\r\n    <br />\r\n\r\n    <div>二、评选方式：</div>\r\n    <div>1. “‘暑’片达人”为其他用户以点赞的方式评选出，点赞数量为相对应时间内，用户发起内容所获得“赞”数总和；</div>\r\n    <div>2. “点赞狂人”为用户主动点赞获得，点赞数量为相应时间内用户为他人点“赞”数总和；</div>\r\n    <br />\r\n\r\n    <div>三、获得奖励</div>\r\n    <table border=4 width=98% align=center>\r\n    <caption></caption>\r\n     <!-- <tr bgcolor="#cccccc">\r\n      <th ><br></th>\r\n     </tr> -->\r\n     <tr align=center>\r\n      <td rowspan=10>每周奖励</td>\r\n      <td rowspan=5>“暑”片达人</td>\r\n      <td >第一名</td>\r\n      <td>100元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第二名</td>\r\n      <td>50元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第三名</td>\r\n      <td>20元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第4~6名</td>\r\n      <td>2000积分</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第7~10名</td>\r\n      <td>1000积分</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td rowspan=5>点赞狂人</td>\r\n      <td >第一名</td>\r\n      <td>50元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第二名</td>\r\n      <td>30元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第三名</td>\r\n      <td>20元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第4~6名</td>\r\n      <td>1000积分</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第7~10名</td>\r\n      <td>600积分</td>\r\n     </tr>\r\n\r\n\r\n     <tr align=center>\r\n      <td rowspan=10>总奖励</td>\r\n      <td rowspan=5>“暑”片达人</td>\r\n      <td >第一名</td>\r\n      <td>Ipad mini</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第二名</td>\r\n      <td>罗技音箱</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第三名</td>\r\n      <td>200元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第4~6名</td>\r\n      <td>100元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第7~10名</td>\r\n      <td>50元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td rowspan=5>点赞狂人</td>\r\n      <td >第一名</td>\r\n      <td>300元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第二名</td>\r\n      <td>200元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第三名</td>\r\n      <td>100元礼品卡</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第4~6名</td>\r\n      <td>5000积分</td>\r\n     </tr>\r\n     <tr align=center>\r\n      <td>第7~10名</td>\r\n      <td>3000积分</td>\r\n     </tr>\r\n    </table>\r\n    <br />\r\n\r\n    <div>四、活动注意事项：</div>\r\n    <div>&nbsp&nbsp&nbsp&nbsp在活动过程中，如存在违规行为（包括但不限于非真实手机设备、利用系统漏洞、黑客工具等非正常方式），携程学生旅行将取消用户的中奖资格，禁止该用户参与携程学生旅行的其他活动。</div>\r\n</div>\r\n'
}), define("youth/views/download", ["libs", "cBasePageView", "cWidgetFactory", "text!DownloadTemplate"], function (e, t, n, r) {
    "use strict";
    var i = n.create("Guider"), s = {ANDROID: "http://download.ctrip.com/client/youth/ctrip_youth_{version}.apk", ANDROID_SOURCE: "http://download.ctrip.com/client/youth/ctrip_youth_{version}_{sourceid}.apk", IOS: "https://itunes.apple.com/cn/app/id883168310"};
    return t.extend({pageid: "300000", events: {"click #j-ios": "downloadIOS", "click #j-android": "downloadAndroid"}, onCreate: function () {
        this.$el.html(r)
    }, onLoad: function () {
        var e = this;
        this.turning()
    }, onShow: function () {
        this.download()
    }, onHide: function () {
    }, download: function () {
        this.setWeiXin();
        var e = navigator.userAgent;
        if (!this.isAutoDwonload())return;
        /ip(hone|ad|od)/ig.test(e) ? this.downloadIOS() : this.downloadAndroid()
    }, downloadAndroid: function () {
        var e = this;
        setTimeout(function () {
            window.location.href = e.getAndroidUrl()
        }, 800)
    }, downloadIOS: function () {
        window.location.href = s.IOS
    }, setWeiXin: function () {
        var e = navigator.userAgent.toLocaleLowerCase();
        e.indexOf("micromessenger") > 0 && this.$el.find(".tip-android").show()
    }, getAndroidUrl: function () {
        var e = 101, t = this.getQuery("sourceid");
        return t ? s.ANDROID_SOURCE.replace(/{version}/i, e).replace(/{sourceid}/i, t) : s.ANDROID.replace(/{version}/i, e)
    }, isAutoDwonload: function () {
        var e = window.location.href;
        return e.indexOf("auto") > -1 ? !0 : !1
    }})
}), define("youth/views/rule", ["libs", "cBasePageView", "cWidgetFactory", "text!RuleTemplate"], function (e, t, n, r) {
    "use strict";
    var i = n.create("Guider");
    return t.extend({events: {}, onCreate: function () {
        this.injectHeaderView(), this.$el.html(r)
    }, onLoad: function () {
        var e = this;
        this.headerview.set({title: "详细规则", view: this, openAds: !1, back: !0, home: !1, tel: !1, events: {returnHandler: function () {
            return i.apply({hybridCallback: function () {
                i.backToLastPage()
            }, callback: function () {
                e.jump("/html5/")
            }}), !0
        }, homeHandler: function () {
            return i.apply({hybridCallback: function () {
                i.home()
            }, callback: function () {
                e.jump("/html5/")
            }}), !0
        }}}), this.headerview.show(), this.turning()
    }, onShow: function () {
    }, onHide: function () {
    }})
}), window.BASEURL = "/webapp/", window.LIBS_URL = "res/libs", window.APP_PATH = "youth/", window.COMMON_PATH = "app/common/", window.MODELS_PATH = "youth/models/", window.TEMPLATE_PATH = "youth/templates/", window.PLUGIN_PATH = "youth/plugin/", window.PATH = {DEFAULTINDEX: "index", VIEWS_PATH: "youth/views/", BASEURL: "/webapp/"}, require.config({baseUrl: window.PATH.BASEURL, shim: {_: {exports: "_"}, B: {deps: ["_", "$"], exports: "Backbone"}, App: {deps: ["B"]}}, paths: {RuleTemplate: TEMPLATE_PATH + "rule.html", DownloadTemplate: TEMPLATE_PATH + "download.html", TaskCenterTemplate: TEMPLATE_PATH + "task.center.html", TaskShareRuleTemplate: TEMPLATE_PATH + "task.share.rule.html", ExchangeCenterTemplate: TEMPLATE_PATH + "exchange.center.html", ExchangeRuleTemplate: TEMPLATE_PATH + "exchange.rule.html", ExchangeBookingTemplate: TEMPLATE_PATH + "exchange.booking.html", ExchangeCompleteTemplate: TEMPLATE_PATH + "exchange.complete.html", MessageContentTemplate: TEMPLATE_PATH + "message.content.html", TaskshareTemplate: TEMPLATE_PATH + "task.share.html", YoungsModel: MODELS_PATH + "youngsmodel", YoungsStore: MODELS_PATH + "youngsstore", MonitorPlugin: PLUGIN_PATH + "monitor", UtilPlugin: PLUGIN_PATH + "util"}}), require(["libs", "App"], function (e, t) {
    var n = new t({defaultView: window.PATH.DEFAULTINDEX, viewRootPath: window.PATH.VIEWS_PATH})
}), define("main", function () {
});