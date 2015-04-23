/**
 * Created by sq_xu on 2015/1/29.
 */
define(['libs', 'c', 'AnalyzeUrl', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', "text!test_html", 'cUtility',
        'cWidgetFactory', 'paymentPipe', 'cUIInputClear', 'cUtilityCrypt', 'cUICore', 'Business', 'Util', 'PayValidate', 'RuleManager', 'Bankmap', 'bankincrement', 'IndexLiPinCard', 'IndexBankList', 'cHybridShell'],
    function (libs, c, AnalyzeUrl, commonStore, payStore, payModel, basePageView, html, cUtility, widgetFactory, paymentPipe, cUIInputClear, Crypt, cui, Business, Util, PayValidate, RuleManager, Bankmap, Bankincrement, IndexLiPinCard, IndexBankList, cHybridShell) {
        var View = basePageView.extend({
            tpl: html,
            onCreate: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.tpl);
            },
            events: {
                'keydown #bankPeriod': 'keydownPeriod',//for h5
                'input #bankPeriod': 'inputPeriod'
            },
            onShow: function () {

            },
            onLoad: function(){

            },

            inputPeriod: function (e) {
                var obj = $(e.currentTarget);
                var inputval = e.currentTarget.value;
                var val = inputval.slice(0, inputval.length-1);
                var keychar = inputval.slice(inputval.length-1);
                var fval = inputval.substr(0, 1);
                var bubbleEable = true;
                var yearMin = (new Date()).getFullYear();
                var yearMax = yearMin + 25;
                var yTrdMin = yearMin.toString().substr(2, 1),
                    yTrdMax = yearMax.toString().substr(2, 1),
                    yFthMin = yearMin.toString().substr(3, 1),
                    yFthMax = yearMax.toString().substr(3, 1);

                //第一位为1且按的不是删除键时， 只允许输入‘0,1,2’
                if(val.length == 0){
                    if (parseInt(keychar) > 1) {
                        inputval = '0' + fval + ' ';
                    }
                }else if(val.length == 1){
                    if (val == '1') {
                        bubbleEable = /[012]/.test(keychar);
                    } else if (val == '0') { //第一位为0且按的不是删除键时， 允许输除0外的所有数字
                        bubbleEable = /[1-9]/.test(keychar);
                    }

                    if(bubbleEable){
                        inputval = inputval + '/';
                    }
                } else if (val.length == 3) {//根据当前年份 +25计算 年份不可大于当前年+25
                    //未进位情况下
                    if (yTrdMin < yTrdMax) {
                        if (!(yTrdMin <= keychar && yTrdMax >= keychar)) {
                            bubbleEable = false;
                        }
                    } else { //进位情况下 2085 -- 2110  8-9 0-1
                        if (!((yTrdMin <= keychar && keychar <= '9') || ( '0' <= keychar && keychar <= yTrdMax))) {
                            bubbleEable = false;
                        }
                    }
                } else if (val.length == 4) {
                    // 第四位年份规则  （现在是2020年 有效期 20-45, 第一位可点击数字 ‘2，3,4’ 第一位为2,3时，键盘均可点；第一位为4时，第二位可点1,2,3,4,5）
                    var thirdY = val.substr(3, 1);
                    if (thirdY == yTrdMin) {
                        if (!(keychar >= yFthMin && keychar <= '9')) {
                            bubbleEable = false;
                        }
                    } else if (thirdY == yTrdMax) {
                        if (!(keychar <= yFthMax && keychar >= '0')) {
                            bubbleEable = false;
                        }
                    }
                } else if (val.length >= 5) {
                    bubbleEable = false;
                }

                if (val.length == 2) {
                    setTimeout(function() {
                        obj.val("");
                        obj.val(val + ' ');
                    },10);
                }
                if (!bubbleEable) {
                    setTimeout(function() {
                        obj.val("");
                        obj.val(val);
                    },10);
                }else{
                    setTimeout(function() {
                        obj.val("");
                        obj.val(inputval);
                    },10);
                }
            },

        /**
         @function 有效期keydown事件
         @name keydownPeriod
         @description H5有效期删除事件处理
         @author sq_xu
         @param {event} event object
         * @memberof ctrl/index
         * @inner
         */
        keydownPeriod: function (e) {
            /*if (!!Util.isInApp()) {
                return;
            }*/
            console.log("keydown");
            var keynum;
            if (window.event) {     // IE
                keynum = e.keyCode
            } else if (e.which) {// Netscape/Firefox/Opera
                keynum = e.which;
            }
            var val = e.currentTarget.value;
            var bubbleEable = true;
            if (keynum == 8) {
                //向前删除时，直接删除分割符号"/" 和前一个数字
                if (val.length == 3) {
                    $(e.currentTarget).val(val.substr(0, 1));
                    bubbleEable = false;
                }else if(val.length == 1){
                    $(e.currentTarget).val("");
                    bubbleEable = false;
                }
            }

            if (!bubbleEable) {
                Util.stopEvent(e);
            }
        }
    });
        return View;
});