define(function(){return ("<article class=\"cont_wrapnew\" style=\"margin-top: 0\">\r\n    <section id=\"c_payment_selectpay_used_list\">\r\n        <ul class=\"list_st_border\" id=\"c_payment_paymentnote\" style=\"display:none;\">\r\n            <li class=\"bcyellow text-c font12\">本产品仅限以下银行卡进行支付</li>\r\n        </ul>\r\n        <ul class=\"list_st_border2 lastnoborder\" id=\"c_payment_selectpay_bank_lists\"></ul>\r\n    </section>\r\n    <ul id=\"c_payment_selectpay_paywaylist_ul\" class=\"list_st_border2 payicon2\"></ul>\r\n</article>\r\n<script type=\"text/template\" id=\"c_payment_selectpay_list_bank_tpl\">\r\n<%for(var i=0,len=cardlist.length;i<len;i++){ %>\r\n    <li class=\"bankicon h50 c_payment_selectpay_bankitem\" banksn='<%=i %>'>\r\n        <figure class=\"<%=this.get_bankicon(cardlist[i])%>\"></figure>\r\n        <div class=\"ver_c\">\r\n            <div class=\"c_payment_selectpay_cardName\"><span class='font17 fl'><%=cardlist[i].typename %></span><span class='payicon_tips2 fl'><%=this.getCardtype(cardlist[i].category)%></span></div>\r\n            <div class=\"c_payment_selectpay_cardCode\"><%=cardlist[i].cardnumfl.substr(0, 4) + \" \" + cardlist[i].cardnumfl.substr(4, cardlist[i].cardnumfl.length - 1) %></div>\r\n        </div>\r\n        <span class=\"valign fr cardlist_up\"></span>\r\n    </li>\r\n<% } %>\r\n</script>");});