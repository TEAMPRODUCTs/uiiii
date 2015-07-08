define(["res/libs/inherit","text!./Calendar2-frame.html","text!./Calendar2-month.html","res/scripts/util","./DateChinese"],function(a,b,c,d,e){var f,g,h,i=d.calendar,j=new Date,k=function(){return'<td class="js-calendar-day"></td>'},l={1230:"除夕","0101":"春节","0115":"元宵","0505":"端午","0707":"七夕","0815":"中秋","0909":"重阳"},m={"0101":"元旦","0214":"情人节","0405":"清明","0501":"劳动节",1001:"国庆",1225:"圣诞节"},n=["今天","明天","后天"],o={};for(h=0;3>h;h++){var p=new Date(j.getFullYear(),j.getMonth(),j.getDate()+h);o[p.getTime()]=n[h]}var q=function(a){var b,c,f;return a.cnDate=b=new e(a),c=d.pad(a.getMonth()+1,2,"0",!0)+d.pad(a.getDate(),2,"0",!0),f=d.pad(b.month,2,"0",!0)+d.pad(b.date,2,"0",!0),a.string=i.format(a),a.festival=m[c],a.cnFestival=l[f],a.description=o[a.getTime()],a};return g=a({name:"Month",proto:{__constructor:function(a){this.options=_.extend({firstDayInWeek:0},a),this.options.lastDayInWeek=(this.options.firstDayInWeek+6)%7,this.getMonthData(this.options.date).getMonthHtml()},dayRender:function(a,b,c,d){var e=this.options.dayRender||k,f=e(a,b,c,d,this);return f},getMonthData:function(a){a=i.strToDate(a);var b,c,d,e,f,g,h,j,k,l,m,n,o=a.getFullYear(),p=a.getMonth();for(this.year=a.getFullYear(),this.month=a.getMonth(),this.firstDate=b=q(new Date(o,p,1)),this.lastDate=c=q(new Date(o,p+1,0)),this.days=d=[b],this.prevDays=e=[],this.postDays=f=[],this.daysInWeek=n=[],h=2;h<c.getDate();h++)d.push(q(new Date(o,p,h)));for(d.push(c),h=b.getDay()-this.options.firstDayInWeek;h>0;h--)e.push(q(new Date(o,p,1-h)));for(h=this.options.lastDayInWeek-c.getDay();h>0;h--)f.unshift(q(new Date(o,p+1,h)));for(this.countPrevDays=e.length,this.countPostDays=f.length,this.countWeeks=Math.ceil((d.length+e.length)/7),l=this.countPrevDays,m=this.countPrevDays+d.length,h=0,j=this.countPrevDays+d.length+this.countPostDays;j>h;h++)h%7==0&&(k=n[Math.floor(h/7)]=[]),k.push(g=l>h?e[h]:m>h?d[h-l]:f[h-m]);return this},getMonthHtml:function(){this.html=_.template(c,this)}}}),f=a({name:"Calendar",proto:{__constructor:function(a){var c,d,e,f,h;this.start=c=h=i.strToDate(a.start),this.end=d=i.strToDate(a.end),this.months=f=[];do e=new g({date:h,dayRender:a.dayRender}),f.push(e),h=new Date(h.getFullYear(),h.getMonth()+1,1);while(h.getFullYear()<d.getFullYear()||h.getMonth()<=d.getMonth());this.html=_.template(b,{monthesHTML:_.map(this.months,function(a){return a.html}).join("")})},getDayData:function(a,b,c){var b=_.find(this.months,function(c){return c.year==a&&c.month==b});return b&&_.find(b.days,function(a){return a.getDate()==c})}}})});