modulex.add("event-dom/gesture/shake",["event-dom/base","modulex-util"],function(e,n,t){var i,o=e("event-dom/base"),a=e("modulex-util");i=function(e){function n(){i=void 0,f=0}function t(e){var n,t=e.accelerationIncludingGravity,o=t.x,a=t.y,d=t.z;void 0!==i&&(n=h(x(o-i),x(a-r),x(d-u)),n>v&&y(),n>l&&(f=1)),i=o,r=a,u=d}e={};var i,r,u,d=o,c=a,s=d.Special,v=5,l=20,f=0,m="shake",h=Math.max,x=Math.abs,b=window,p="devicemotion",y=c.buffer(function(){f&&(d.fireHandler(b,m,{accelerationIncludingGravity:{x:i,y:r,z:u}}),n())},250);return s.shake={setup:function(){this===b&&b.addEventListener(p,t,!1)},tearDown:function(){this===b&&(y.stop(),n(),b.removeEventListener(p,t,!1))}},e={SHAKE:m}}(),t.exports=i});