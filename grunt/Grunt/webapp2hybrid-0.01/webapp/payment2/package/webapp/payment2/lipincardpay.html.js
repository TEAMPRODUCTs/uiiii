define(function(){return'<html>\r\n<head><base href="../../.." /><script type="text/javascript" src="package/lizardlocalroute.js"></script>\r\n  <title>支付</title>\r\n  <meta charset="utf-8" />\r\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n  <meta name="description" content="支付" />\r\n  <meta name="keywords" content="支付" />\r\n  <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui" />\r\n  <link rel="apple-touch-startup-image" href="../lizard/res/html5/content/images/640.png" sizes="320x460" />\r\n  <link rel="apple-touch-startup-image" href="../lizard/res/html5/content/images/940.png" sizes="640x920" />\r\n  <link rel="apple-touch-startup-image" href="../lizard/res/html5/content/images/1004.png" sizes="768x1004" />\r\n  <link rel="apple-touch-icon-precomposed" sizes="57x57" href="../lizard/res/html5/content/images/57.png" />\r\n  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../lizard/res/html5/content/images/72.png" />\r\n  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../lizard/res/html5/content/images/114.png" />\r\n  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../lizard/res/html5/content/images/144.png" />\r\n    <link rel="stylesheet" href="../lizard/webresource/styles/h5/common/main.css" />\r\n    <link rel="stylesheet" type="text/css" href="package/webapp/payment2/res/res/style/pay.css" /> \r\n    <link rel="stylesheet" type="text/css" href="package/webapp/payment2/res/res/style/bank.css" /> \r\n  <meta name="format-detection" content="telephone=no" />\r\n  <meta name="appBaseUrl" content="/webapp/payment2/" />\r\n  <meta name="webresourceBaseUrl" content="/" />\r\n    <meta name="WebresourcePDBaseUrl" content="" />\r\n  <meta name="restfullApi" content="localhost" />\r\n</head>\r\n<body class="gray" onselectstart="return false">\r\n    <div id="headerview" style="height: 48px;display:none;">\r\n        <header></header>\r\n    </div>\r\n    <div id="main">\r\n        <div class="main-frame">\r\n            <div class="main-viewport"></div>\r\n            <div class="main-state"></div>\r\n        </div>\r\n    </div>\r\n    <div id="footer"></div>\r\n    <script type="text/lizard-config">\r\n    {\r\n    "url_schema": "lipincardpay",\r\n    "viewName":"lipincardpay",\r\n    "model": {},\r\n    "view":{\r\n    "header": Lizard.T("headTmpl"),\r\n    "viewport": Lizard.T("viewportTmpl")\r\n    },\r\n    "controller":"package/webapp/payment2/res/ctrl/lipincardpay.js"\r\n    }\r\n</script>\r\n\r\n\r\n\r\n    <input type="hidden" id="page_id" />\r\n    <script type="text/javascript">\r\n        var __SERVERDATE__ = { server: new Date(Date.parse(\'2014/11/28 17:48:59\'.replace(/-/g, \'/\'))), local: new Date() }\r\n    </script>\r\n    <script type="text/javascript" src="../lizard/webresource/code/lizard/2.0/web/lizard.seed.js" pdconfig="package/webapp/payment2/res/paymentconfig.js"></script>\r\n\r\n</body>\r\n</html>'})