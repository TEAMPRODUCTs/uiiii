define(function(){return'﻿<article id="artic_list" class="cont_wrapnew" style="margin-top: 0;">\r\n         \r\n\r\n</article>\r\n\r\n\r\n\r\n    <script type="text/template" id="cardlist">\r\n        <div class="ptb_10 plr15 lh100 mt10 pay-c666"><%=this.showOrderAmount()%></div>\r\n        <ul id=\'allcardList\' class="list_st_border2 usecardlist mb5">\r\n        <%for(var i=0;i<cardlist.length;i++){ %>\r\n            <%if(cardlist[i].status==0 && cardlist[i].amount>0){ %>\r\n                <li target="li-target" class="li-<%=cardlist[i].ename %>">\r\n                    <div class="selcard">\r\n                        <span data-id="<%=cardlist[i].tktid %>" data-name="<%=cardlist[i].ename %>" class="checkbox-input-c"></span >\r\n                    </div>\r\n                    使用礼品卡-<%=cardlist[i].name %>\r\n                    <span  class="span-<%=cardlist[i].ename %> fr"><%=this.transNumToFixedStr(cardlist[i].useamoumt) %></span>\r\n                    <p>可用<%=this.transNumToFixedStr(cardlist[i].ableamount) %></p>\r\n                </li> \r\n            <%}else if(cardlist[i].isshow && cardlist[i].amount>0){ %>\r\n                <li target="li-target" class="li-<%=cardlist[i].ename %> invalidate cgray">\r\n                    <div class="selcard">\r\n                        <span data-id="<%=cardlist[i].tktid %>" data-name="<%=cardlist[i].ename %>" class="checkbox-input-c"></span >\r\n                    </div>\r\n                    礼品卡-<%=cardlist[i].name %><span  class="span-<%=cardlist[i].ename %> fr font14">当前订单不可用</span><p>余额<%=this.transNumToFixedStr(cardlist[i].ableamount)%></p></li> \r\n            <%} %>\r\n        <%} %>\r\n\r\n        <%for(var i=0;i<walletlist.length;i++){ %>\r\n            <%if(walletlist[i].status==1 && walletlist[i].cashbalance>0){ %>\r\n                <li target="li-target" class="li-<%=walletlist[i].ename %>">\r\n                    <div class="selcard">\r\n                        <span data-name="<%=walletlist[i].ename %>"  class="checkbox-input-c"></span >\r\n                    </div>\r\n                    使用现金余额<span  class="span-<%=walletlist[i].ename %> fr"><%=this.transNumToFixedStr(walletlist[i].useamoumt)%></span><p>可用<%=this.transNumToFixedStr(walletlist[i].ableamount)%></p></li> \r\n            <%}else if(walletlist[i].isshow && walletlist[i].cashbalance>0){ %>\r\n                <li target="li-target" class="li-<%=walletlist[i].ename %> invalidate cgray">\r\n                    <div class="selcard">\r\n                        <span data-name="<%=walletlist[i].ename %>" class="checkbox-input-c"></span>\r\n                    </div>\r\n                    现金余额<span  class="span-<%=walletlist[i].ename %> fr font14">当前订单不可用</span><p>余额<%=this.transNumToFixedStr(walletlist[i].ableamount)%></p></li> \r\n            <% }%>\r\n        <%} %>\r\n\r\n        \r\n        </ul>\r\n        \r\n        <div id=\'span_leavaamount\' style="display:none;" class="p0_10 txtright pay-c666" > 订单还需支付：<span class="corange font16" ><span class="laveamount">0.00</span></span> </div>\r\n        \r\n        <ul id=\'li_password\' style=\'display:none;\' class="list_st_border2 mt10 mb5">\r\n            <li class="invalidate" style="z-index:1;"><span class="font16">支付密码</span> <input id="c_payment_fadekey" type="password" placeholder="请输入六位数字支付密码" class="listinput" maxLength="6"/><input type="tel" id="c_payment_numinput" class="listinput" maxLength="6" style="position: absolute;left: 85px; top: 3px;z-index:1000;height:90%;opacity:0;font-family:\'Courier\',Arial;display:none" /></li>\r\n        </ul>\r\n        <p id=\'c_pay_lpk_forget\' style=\'display:none;\' class="txtright pos_r mb10"><span id="c_lpk_password_set" class="catxt">设置支付密码<i class="pos_r ml25"><i class="arr2"></i></i></span><span id="c_lpk_password_forget" style=\'display:none;\' class="catxt">忘记支付密码<i class="pos_r ml25"><i class="arr2"></i></i></span></p>\r\n        <section id=\'se_textDetail\' class="cgray p0_10 mb5 font12">\r\n            <div id="c_payment_lipincard_text1" style=\'display:none;\'></div>\r\n            <div id=\'isAllPay_div\' style=\'display:none;\'>点击支付按钮，订单将直接完成支付。</div>\r\n        </section>\r\n        \r\n        <p id=\'useBtn\' class="p10 none"><button class="paybtn w100">确认使用</button></p>\r\n        <p id=\'payBtn\' class="p10 none"><button class="paybtn w100">确认支付</button></p>\r\n        <p id=\'confirmBtn\' class="p10"><button class="paybtn w100">确认</button></p>\r\n        <p class="clearfix"></p>\r\n    </script>'})