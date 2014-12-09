define(['libs', 'c', 'CommonStore', 'PayStore', 'PayModel', 'PayParentView', "verfiedpsd_html", 'cUtility',
    'cWidgetFactory', 'paymentPipe', 'cUIInputClear', 'cUtilityCrypt', 'cUICore', 'Business', 'Util', 'cUIIdentitycard'], function (libs, c, commonStore, payStore, payModel, PayParentView, html,
    cUtility, widgetFactory, paymentPipe, cUIInputClear, Crypt, cui, Business, Util, cUIIdentitycard) {

        //$.scrollTo({endY: a.top - 50})
        if (!$.scrollTo) {
            $.scrollTo = function (obj) {
                window.scrollTo(0, obj.endY-50);
            }
        }

        var orderDetailStore = payStore.OrderDetailStore.getInstance();
        var paymentcard = payStore.PayMentCardParamStore.getInstance();
        var touchPayStore = payStore.touchPayStore.getInstance();
        var cardpay = payStore.PaymentWayStore.getInstance();
        var Guider = widgetFactory.create('Guider');

        var verifedpsd = null,//初始化数字键盘对象
            tElindex = 0;//初始密码合集索引

        var View = PayParentView.extend({
            pageid: '232002',
            hpageid: '232002',
            noticeFlag: "pay",
            alertArr: [],
            tpl: html,
            onHide: function () {
                this.hideLoading();
                //隐藏弹框
                this.alertArr.forEach(function (item, index) {
                    item && item.hide && item.hide();
                });

                if (Business) {
                    Business.alertArr.forEach(function (item, index) {
                        item && item.hide && item.hide();
                    });
                };
                //隐藏数字键盘
                if (verifedpsd) {
                    verifedpsd.hide();
                }
            },
            onCreate: function () {
                //Edit sqsun 20141009
                Business.jumpDetailFn.call(this);
                this.render();
                //实例化数字键盘
                this.showVerifedpsdUi();
            },
            onShow: function () {
                this.setHeaderView();
            },
            onLoad: function (refer) {
                var self = this;
                try {
                    self.turning();
                } catch (e) {

                }
                //TODO 密码输错时清空支付密码 test
                self.els.verfiedpsds.text(''); //清空显示密码合集
                if (verifedpsd) {
                    verifedpsd.show();
                    verifedpsd.pwdval = [];//清空保存密码
                }
                tElindex = 0; //初始化密码索引值
            },
            render: function () {
                this.$el.html(this.tpl);
                this.els = {
                    verfiedpsd_target: this.$el.find('#c_payment_verfiedpsd_target'), //密码显示对象
                    verfiedpsds: this.$el.find('#c_payment_verfiedpsd_target').children("li") //密码显示对象合集
                }
            },
            events: {
                //选择常用
                "click #c_payment_submitpay": "checkPwd", //确认支付
                "click #c_payment_verfiedpsd_target": "showverifedpsd", //确认支付
                "click #c_payment_verfiedpsd_getpwd": 'getpwd' //忘记密码
            },
            //设置当前场景HeaderView对象
            setHeaderView: function (title) {
                var self = this;
                var hasClick = 0;
                //对HeaderView设置数据
                self.headerview.set({
                    'title': title || '验证支付密码',
                    'back': true,
                    'view': self,
                    'events': {
                        returnHandler: function () {
                            self.goBack()
                        }
                    }
                });
                self.headerview.show();
            },
            getUrlParama: function () {
                var link = "";
                if (orderDetailStore.get()) {
                    link = orderDetailStore.getAttr("indexurl");
                }
                return link;
            },
            goBack: function () {
                var self = this;
                var link = this.getUrlParama();
                var from = Util.geturlQuery('from');
                if (from && from != 'index') {
                    self.back(from);
                } else {
                    self.back(link);
                }
            },
            //设置支付密码Copy linpincardpay
            getpwd: function () {
                var self = this;
                //设置状态 标示进入礼品卡支付页 是否首次进入
                //self.paymentcard.setAttr('orderid', -1);
                //业务端必须传入from参数
                var url = orderDetailStore.getAttr('from');
                var gopage = 'chgpwd';
                var origUrl = location.href;
                var logininfo = {
                    islogin: orderDetailStore.getAttr('isload'),
                    auth: orderDetailStore.getAttr('auth'),
                    time: '2099/01/01 00:00:00', //H5获取不到auth失效的时间
                    isuser: orderDetailStore.getAttr('isload')
                };

                var token_str = encodeURIComponent(Crypt.Base64.encode(JSON.stringify(logininfo)));
                var obj = {
                    "WALLET_AUTH_INFO": token_str
                }
                Util.addCookie(obj);
                localStorage.setItem("WALLET_AUTH_INFO", token_str);

                var token = {
                    from: "",
                    eback: ""
                }

                if (cUtility.isInApp()) {
                    var _url = this.getRoot() + '#lipincardpay';
                    token.eback = token.from = _url;
                    var tempStr = encodeURIComponent(Crypt.Base64.encode(JSON.stringify(token)));
                    Guider.cross({
                        path: 'wallet',
                        param: "index.html#" + gopage + "?token=" + tempStr
                    })
                } else {
                    //H5设置支付密码 需要根据不同的环境跳转不同的地址
                    //url = self.getWalletUrl();
                    url = 'https://' + location.host; //支付和钱包在同一个域下
                    token.eback = token.from = origUrl;
                    var tempStr = encodeURIComponent(Crypt.Base64.encode(JSON.stringify(token)));
                    this.jump(url + "/webapp/wallet/index.html#" + gopage + "?token=" + tempStr);
                }

            },
            //确认使用验证密码
            checkPwd: function () {
                var self = this;
                //礼品卡密码
                var psw = verifedpsd.pwdval;
                var header = {};
                if (!psw || psw.length < 6) {
                    self.showToast('请填写支付密码', 3, function () { }, true);
                    return;
                } else {
                    var reg = /^[0-9]{6}$/;
                    psw = psw.join('');
                    if (!reg.test(psw)) { //验证密码是否为纯数字
                        //支付密码输错时，清空支付密码
                        this.showToast('请填写正确的支付密码', 3, function () {
                            self.els.verfiedpsds.text(''); //清空显示密码合集
                            verifedpsd.pwdval.length = 0;//清空保存密码
                            tElindex = 0; //初始化密码索引值
                        }, true);
                        return;
                    }
                }

                var _callback = function (_json) {
                    var json = {};
                    json.res = _json.res;
                    json.msg = _json.msg;

                    if (cUtility.isInApp()) {
                        //管道返回正确的情况下，是有resultBody字段的。没有的话，就会报错
                        if (_json.resultBody) {
                            json = JSON.parse(_json.resultBody);
                            json.res = json["Result"];
                            json.msg = json["ResultMessage"];
                        } else {
                            //错误的时候，弹出网络不给力提示  
                            self.hideLoading();
                            //self.showToast("网络不给力,请稍候重试");
                            //提示具体的管道错误信息
                            self.showToast(_json.errorInformation || "网络不给力,请稍候重试");
                            return;
                        }
                    }

                    if (!Business.lipinCardExcuteCallback.call(null, _json)) { //判断礼品卡实际支付和余额是否匹配，如不匹配则跳转至首页
                        //保存钱包金额异常状态，重新101拉取最新礼品卡金额
                        self.tktErrorStore.setAttr("tktUsed", 1);
                        var MyAlert = new c.ui.Alert({
                            title: '提示信息',
                            message: '支付失败，请重新尝试',
                            buttons: [
                                {
                                    text: '确定',
                                    click: function () {
                                        Business.removePayCardStore();
                                        Business.goHome.call(self);   //跳转至首页
                                    },
                                    type: c.ui.Alert.STYLE_CONFIRM
                                }
                            ]
                        });
                        MyAlert.show();
                        self.alertArr.push(MyAlert);
                        return; //屏蔽其他msg跳出
                    }

                    if (json.res) {
                        cardpay.setAttr("checkpwd", Crypt.Base64.encode(psw));
                        cardpay.setAttr("checkJson", json);
                        verifedpsd.pwdval = null; //清除保存的密码内存
                        self.goBack();
                        self.hideLoading();
                    } else {
                        self.hideLoading();
                        self.showToast(json.msg || '支付密码错误', 3, function () {
                            //TODO 密码输错时清空支付密码 test
                            self.els.verfiedpsds.text(''); //清空显示密码合集
                            verifedpsd.pwdval.length = 0;//清空保存密码
                            tElindex = 0; //初始化密码索引值
                        }, true);
                    }

                };


                if (orderDetailStore && orderDetailStore.get()) {
                    header = Business.getRequestHeader();
                }
                var headstring = JSON.stringify(header);
                //验证支付密码AJAX请求
                self.showLoading();
                paymentPipe.verifyPassword({
                    'pwd': Crypt.Base64.encode(psw),
                    'ver': 1
                }, _callback, headstring, function () {
                    self.hideLoading();
                    self.showToast('网络不给力,请稍候重试', 3, function () {
                    }, true);
                });
            },
            showVerifedpsdUi: function () {
                var self = this;
                if (!verifedpsd) {
                    var targetPwd = self.els.verfiedpsds; //密码显示对象合集
                    verifedpsd = new cUIIdentitycard({
                        targetEl: self.els.verfiedpsd_target,
                        itemClickAction: function (val) {
                            if (tElindex > 5) return; //如果已经输入了6个密码则终止输入
                            targetPwd.eq(tElindex).html("&#149;");//填写圆点密码
                            val = val.toString().replace(/\s*/g, ""); //获取用户点击的键盘值                           
                            verifedpsd.pwdval.push(val); //保存用户点击的键盘值
                            tElindex++;
                        },
                        deleteAction: function () {
                            if (tElindex < 1) return; //如果已经清除了所有密码则终止操作
                            tElindex--;
                            targetPwd.eq(tElindex).html(""); //重后向前清空密码显示框
                            verifedpsd.pwdval.splice(tElindex, 1); //删除保存的密码
                        },
                        template: '<div class="cui-hd"><span>完成</span></div><div class="cui-bd"><ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li></li><li>0</li><li class="cui-wrapper-delete"><div class="cui-btn-delete"></div></li></ul></div>'

                    });
                }
                verifedpsd.pwdval = [];//初始化密码值
                verifedpsd.show();
            },
            showverifedpsd: function (e) {
                Util.stopEvent(e);
                if (verifedpsd) {
                    verifedpsd.show();
                }
            }
        });
        return View;
    });
