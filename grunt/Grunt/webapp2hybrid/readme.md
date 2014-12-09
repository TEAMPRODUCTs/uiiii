框架打包
	node lizard.js --path=lizard.json
BUSBU打包
	node busbu.js --path=busbu.json

bu\sbu开发人员需要遵守的规则
	1.页面中要配置appBaseUrl、webresourceBaseUrl、restfulApi等用到的属性
		<meta name="appBaseUrl" content="/webapp/tour/">
		<meta name="webresourceBaseUrl" content="http://webresource.c-ctrip.com/">
	2.pdconfig文件的加载作为框架文件的一个属性来加载
		eg:
		<script type="text/javascript" src="../lizard/webresource.c-ctrip.com/code/lizard/2.0/web/lizard.seed.js" pdconfig="127.0.0.1/html5/tour/webresource/tour/tourConfig.js"></script>
	3.pdconfig的具体内容
		a.所有的配置都走绝对路径
		b.所有模块都要在pdconfig中有定义，包括html模块
		eg:
		require.config({
		    paths: {
			'TourModel': Lizard.appBaseUrl + 'webresource/tour/models/tourModel',
			'Calendar2Frame': Lizard.appBaseUrl + 'webresource/tour/res/scripts/widget/Calendar2-frame.html'
		    }
		})
文件夹说明
	webapp:文件夹为打包后的目录
	lizard：文件夹为框架打包后的目录
执行顺序  
	0.进入当前目录，重新安装jsdom
	1.pd人员需要配置busbu.jon
	2.点击busbu.bat
	如框架人员需本地调试框架代码， busbu.jon中的属性weinre设置成tru，然后执行3，否则不需要执行3
	3.weinre.bat
	4.webapp为打包生成的文件
	5.busbu.json中的属性说明
	{
		/*pd项目的服务器地址*/
		"hostname":"127.0.0.1:8082",
		/*host的别名*/
		"hostnameShim":"package",
		/*需要打包的页面*/
		"views":{
			"/webapp/tour/index":1,
			"/webapp/tour/VacationList/2/2/%E4%B8%8A%E6%B5%B7/mobi/1/nopage":1,
			"/webapp/tour/Detail/1666873/2/2/nopage":1
		},
		/*
		hybrid进来的首页
		eg:
		"defaultView":"http://127.0.0.1:8082/webapp/tour/VacationList/2/2/%E4%B8%8A%E6%B5%B7/mobi/1/nopage"
		*/
		"defaultView":"/webapp/tour/VacationList/2/2/上海/mobi/1/nopage",

		/*需要打包的域名，框架资源不需要处理，框架默认添加*/
		"resource":{
			"127.0.0.1:8082":1
		},
		/*--lizardEnv 框架代码环境*/
		"lizardEnv":"local",
		/*--channel 频道名称*/
		"channel":"tour",
		/*是否进行本地weinre调试*/
		"weinre":true,
		/**/
		"include":{
		//		"http://webresource.ctrip.com/code/lizard/2.0/webapporigin/lizard.seed.js":0,
		//		"http://webresource.ctrip.com/code/lizard/2.0/web/lizard.seed.js":0
		},
		/*生产包的根目录*/
		"root":"webapp/",
		/*是否开启压缩css的功能*/
		"cssMini":true,
		/*是否开启压缩js的功能*/
		"jsMini":true,
		/*是否开启压缩html的功能*/
		"htmlMini":true,
		switch:{
			/*开启打包webapp的功能,默认false*/
			web:true,
			/*开启打包hybrid的功能,默认true*/
			hybrid:true
		},
		/以下2个属性，只有开启switch.web为true的情况下才会执行/
		/*pcconfig文件的地址*/
		"pdConfig":'../../../../../../../../mobile1/TicketSEO/webresource/ticket/ticketConfig.js',
		/*pdconfig文件中用的Lizard.appBaseUrl的值*/
		"appBaseUrl":'../../../../../../../../mobile1/TicketSEO/'
	};

门票打包的示例代码：
{
  "hostname": "172.16.140.161:8082",
  "views": {
    "/webapp/ticket/index": 1,
    "/webapp/ticket/citylist": 1,
    "/webapp/ticket/search": 1,
    "/webapp/ticket/dest/ct-上海-2/s-tickets": 1,
    "/webapp/ticket/listfilter": 1,
    "/webapp/ticket/listfilter": 1,
    "/webapp/ticket/listfilteropt": 1,
    "/webapp/ticket/dest/t57043.html": 1,
    "/webapp/ticket/bookingnotice": 1,
    "/webapp/ticket/booking?pid=3019323&tid=3019326&spotid=762": 1,
    "/webapp/ticket/usedate?tid=3019326": 1,
    "/webapp/ticket/managetraveler?index=0": 1,
    "/webapp/ticket/choosetraveler?index=0": 1,
    "/webapp/ticket/choosetraveler?index=0": 1,
    "/webapp/ticket/coupon?tid=123 ": 1,
    "/webapp/ticket/addmoretk": 1,
    "/webapp/ticket/orderdetail?orderid=123 ": 1,
    "/webapp/ticket/bookingcomplete?orderid=123": 1,
    "/webapp/ticket/dest/t138822/p81081/comment.html":1,
    "/webapp/ticket/map":1
},
  "htmlMini":false,
  "resource":{
	"apps.bdimg.com":1
  },
  "channel": "ticket",
  "lizardEnv":"ui",
  "level":1,
  "weinre":false,
  switch:{
	web:false,
	hybrid:true
  },
  "pdConfig":'../../../../../../../../mobile1/TicketSEO/webresource/ticket/ticketConfig.js',
  "appBaseUrl":'../../../../../../../../mobile1/TicketSEO/'
}

注：
主要讲一下web的打包，以门票为例，pdconfig中的代码如下
require.config({
    paths: {
        'TicketModel': Lizard.appBaseUrl + 'webresource/ticket/models/ticketmodel',
        'TicketStore': Lizard.appBaseUrl + 'webresource/ticket/models/ticketstore',
        'TicketCommon': Lizard.appBaseUrl + 'webresource/ticket/common/common',
        'TicketConfig': Lizard.appBaseUrl + 'webresource/ticket/common/config',
        'ScrollObserver': Lizard.appBaseUrl + 'webresource/ticket/util/scrollobserver',
        'TicketLazyLoad': Lizard.appBaseUrl + 'webresource/ticket/util/lazyload',
        'headroom': Lizard.appBaseUrl + 'webresource/ticket/util/headroom',
        'Controller': Lizard.appBaseUrl + 'webresource/ticket/common/controller',
        'TicketImport': Lizard.appBaseUrl + 'webresource/ticket/common/import',
        'TicketAMap': Lizard.appBaseUrl + 'webresource/ticket/common/amap',
        'TicketList': Lizard.appBaseUrl + 'webresource/ticket/common/ticketlist',
        'templateAddmoretk' : Lizard.appBaseUrl + 'webresource/ticket/templates/addmoretk.html',
        'templateBooking' : Lizard.appBaseUrl + 'webresource/ticket/templates/booking.html',
        'templateBookingcomplete' : Lizard.appBaseUrl + 'webresource/ticket/templates/bookingcomplete.html',
        'templateBookingnotice' : Lizard.appBaseUrl + 'webresource/ticket/templates/bookingnotice.html',
        'templateChoosetraveler' : Lizard.appBaseUrl + 'webresource/ticket/templates/choosetraveler.html',
        'templateCitylist' : Lizard.appBaseUrl + 'webresource/ticket/templates/citylist.html',
        'templateCountrylist' : Lizard.appBaseUrl + 'webresource/ticket/templates/countrylist.html',
        'templateCoupon' :  Lizard.appBaseUrl + 'webresource/ticket/templates/coupon.html',
        'templateListfilter' :  Lizard.appBaseUrl + 'webresource/ticket/templates/listfilter.html',
        'templateListfilteropt' :  Lizard.appBaseUrl + 'webresource/ticket/templates/listfilteropt.html',
        'templateManagetraveler' :  Lizard.appBaseUrl + 'webresource/ticket/templates/managetraveler.html',
        'templateOrderdetail'  :  Lizard.appBaseUrl + 'webresource/ticket/templates/orderdetail.html',
        'templateTicketdetail'  :  Lizard.appBaseUrl + 'webresource/ticket/templates/ticketdetail.html',
        'templateTicketsearch' : Lizard.appBaseUrl + 'webresource/ticket/templates/ticketsearch.html',
        'templateUsedate' : Lizard.appBaseUrl + 'webresource/ticket/templates/usedate.html'
    },
    /*
    这个属性的意思是，将'TicketCommon', 'TicketConfig'这两个模块打包到Lizard.appBaseUrl + 'webresource/ticket/views/index.js'这个js中，
    剩下的模块都会被打包到当前的pdconfig文件中

    modules: [
       {
            name: Lizard.appBaseUrl + 'webresource/ticket/views/index.js',
            include: ['TicketCommon', 'TicketConfig']
        }
    ]
})
凡是参与打包的文件，都会在同级文件夹中生成一个.lizard.js的文件，如pdconfig.js的同级目录下会有一个pdconfig.lizard.js的文件，
开发人员如何使用呢，开发人员可以在AppSetting.config文件中指定 <add key="min" value=".lizard"/>，然后页面上引用的时候，就可以这样引用了
xxx/pdconfig@ConfigurationManager.AppSettings["min"].js





