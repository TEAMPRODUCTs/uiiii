define(["cStore","cBase","cUtility"],function(a,b){var c={};c.HotelInfoStore=new b.Class(a,{__propertys__:function(){this.key="HOTEL_INFO",this.lifeTime="30M"},initialize:function($super,a){$super(a)}}),c.HotelInfoParamStore=new b.Class(a,{__propertys__:function(){this.key="HOTEL_INFO_PARAM",this.lifeTime="30M"},initialize:function($super,a){$super(a)}}),c.CommentListParamStore=new b.Class(a,{__propertys__:function(){this.key="COMMENTLIST_PARAM",this.lifeTime="30M"},initialize:function($super,a){$super(a)}}),c.ExplainPageStore=new b.Class(a,{__propertys__:function(){this.key="EXPLAIN_PAGE",this.lifeTime="30M"},initialize:function($super,a){$super(a)}}),c.passengerEditStore=new b.Class(a,{__propertys__:function(){this.key="FLIGHT_PASSENGEREDIT",this.lifeTime="1H"},initialize:function($super,a){$super(a)}}),c.isBookingEditStore=new b.Class(a,{__propertys__:function(){this.key="FLIGHT_ISBOOKINGEDIT",this.lifeTime="60M"},initialize:function($super,a){$super(a)}}),c.passengerQueryStore=new b.Class(a,{__propertys__:function(){this.key="FLIGHT_PASSENGERRESULT",this.lifeTime="1D"},initialize:function($super,a){$super(a)}}),c.passengerChooseStore=new b.Class(a,{__propertys__:function(){this.key="FLIGHT_PASSENGERCHOOSE",this.lifeTime="1D"},initialize:function($super,a){$super(a)}}),c.passPageTypeStore=new b.Class(a,{__propertys__:function(){this.key="FLIGHT_PAGETYPE",this.lifeTime="1D"},initialize:function($super,a){$super(a)}}),c.CountryDataStore=new b.Class(a,{__propertys__:function(){this.key="FLTINT_COUNTRYDATA",this.lifeTime="15D"},initialize:function($super,a){$super(a)}});var d=new b.Class(a,{__propertys__:function(){this.CONST_TAG="tag",this.CONST_BACKURL="backurl",this.CONST_CALLBACK="callback",this.CONST_CURVALUE="curvalue"},initialize:function($super,a){$super(a)},save:function(a,b){var c=this.get(),d=this,e=0;$.isArray(c.callback)?$.each(c.callback,function(f,g){d._callFunByStr(g,a,null,function(){e++,e===c.callback.length&&b&&b()})}):this._callFunByStr(c.callback,a,null,function(){b&&b()})},setCurrent:function(a,b,c,d){var e={};e[this.CONST_TAG]=a,e[this.CONST_BACKURL]=b,e[this.CONST_CALLBACK]=c,e[this.CONST_CURVALUE]=d,this.set(e)},getCurrent:function(){return this.get()},getValue:function(a){var b=this.get();return this._callFunByStr(b.curvalue,null,null,a)},_callFunByStr:function(a,b,d,e){d=d||c;var f,g,h=/^(?:(\w*)::)?(\w*):(\w*)$/i.exec(a);if(h&&4===h.length)if(h[1])require([h[1]],function(a){var c=a[h[2]],d=h[3];if(c&&c.getInstance){var f=c.getInstance()[d](b);e&&e(f)}});else if(f=d[h[2]],g=h[3],f&&f.getInstance){var i=f.getInstance()[g](b);return e&&e(i),i}return!1}});return c.CustomerAddrListStore=new b.Class(a,{__propertys__:function(){this.key="CAR_CUSTOMER_ADDR_LIST",this.lifeTime="15D"},initialize:function($super,a){$super(a)},addAddr:function(a,b){var c=this.get();return c||(c={count:0,addrs:[]}),0==a.inforId&&(a.inforId=c.addrs.length+1),c.addrs.unshift(a),c.count++,this.set(c,b),a.inforId},removeAddr:function(a,b){for(var c=this.get(),d=c.addrs,e=-1,f=0,g=d.length;g>f;f++)if(d[f].inforId==a){e=f;break}e>-1&&(d.splice(e,1),c.count--),this.set(c,b)}}),c.CustomerAddrStore=new b.Class(a,{__propertys__:function(){this.key="CAR_CUSTOMER_ADDR",this.lifeTime="30M",this.defaultData={addr:"",addrId:1,cty:"",destCtyId:1,dstr:"",dstrId:1,edTime:"",fee:0,gua:!1,ldTime:"",mphone:"",phone:"",port:"",prvn:"",recipient:"",rmk:"",type:1,zip:"",prvnId:"",inforId:0,ctyName:"",dstrName:"",prvnName:""}},initialize:function($super,a){$super(a)},setAddr:function(a){this.set(a,c.AddressStore.getInstance().getCurrent().tag)}}),c.AddressStore=new b.Class(d,{__propertys__:function(){this.key="CAR_ADDRESS",this.lifeTime="1D"},initialize:function($super,a){$super(a)}}),c.SelectAddrStore=new b.Class(a,{__propertys__:function(){this.key="CAR_SELECT_ADDR",this.lifeTime="30M",this.rollbackEnabled=!0,this.defaultData={addr:"",addrId:1,cty:"",destCtyId:1,dstr:"",dstrId:1,edTime:"",fee:0,gua:!1,ldTime:"",mphone:"",phone:"",port:"",prvn:"",recipient:"",rmk:"",type:1,zip:"",prvnId:"",inforId:0,ctyName:"",dstrName:"",prvnName:""}},initialize:function($super,a){$super(a)}}),c.PostCityStore=new b.Class(a,{__propertys__:function(){this.key="CAR_POST_CITY_DATA",this.lifeTime="30D"},initialize:function($super,a){$super(a)}}),c.OperAddrStore=new b.Class(a,{__propertys__:function(){this.key="CAR_OPER_ADDR",this.lifeTime="30M",this.defaultData={recipient:"",addr:"",zip:"",prvnId:"",prvnName:"",ctyName:"",dstrName:"",inforId:0}},initialize:function($super,a){$super(a)}}),c});