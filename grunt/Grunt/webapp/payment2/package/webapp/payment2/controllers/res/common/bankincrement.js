define(['c', 'cWidgetFactory', 'PayStore', 'PayModel', 'Util', 'Business'],
		function (c, widgetFactory, payStore, PayModel, Util, Business) {
		    /**
		    * @author sqsun@ctrip.com
		    * @namespace 银行增量本地初始化
		    */
            //console.time('test')
            var bankListStore = payStore.BankListStore.getInstance(), //银行卡增量localStorage
                bankCrement = payStore.bankCrement.getInstance(); //银行卡101服务增量localStorage
            var ugSystemVer = Util.getSystemVer().ver; //获取共公Ver和platform 参数
		    
		    var BankInCrementArr = []; //银行卡增量本地数组数据 V5.10

		    //还原为null空对象的字段
		    function revertNull(str) {
		        if (str === '#') {
                    return null
		        }
		    }

		    //过滤增理银行格式函数
		    function dataformat(data) {
		        var list = {}, hots = [],
                    word, neworigindatas = [], origindatas = data.baseDatas || [];//Edit by sqsun 20141023 数据做容错处理
		        for (var i = 0; i < origindatas.length; i++) {
		            if (!origindatas[i]) {
                        continue
		            }
		            neworigindatas.push(origindatas[i]);
		            word = list[origindatas[i].initial] || [];
		            word.push(origindatas[i]);
		            if ((origindatas[i].dataAction.category & 1) === 1) {
		                hots.push(origindatas[i]);
		            } else {
		                list[origindatas[i].initial] = word;
		            }
		        }
		        hots.sort(function (a, b) {
		            return a.dataAction.sort - b.dataAction.sort;
		        });

		        return {
		            hots: hots,
		            list: list,
		            origindatas: neworigindatas,
		            //筛选后的列表，储蓄卡DC
		            filteddatasDC: [],
		            //筛选后的列表，目前只有直联信用卡即CCD
		            filteddatasCCD: []
		        };
		    }

		    //还原增量数据格式
		    function revertBankData(flag) {
		        //银行卡增量本地数组数据初始化（共201条 热门14条） V5.10
		        BankInCrementArr[13] = "DEBITCARD_ARCU/0/4/4/105/11/0/#/0/0/0/0//#/0/A/AHSNCXYS/13/安徽农信社//anhuishengnongcunxinyongshe/#/1/CCD/0/101/CCY/0/201/DC/1004/301/ALI/DEBITCARD_ARCU";
		        BankInCrementArr[14] = "DEBITCARD_AYCB/0/4/4/110/11/0/#/0/0/0/0//#/0/A/AYSSYYH/14/安阳银行//anyangshishangyeyinhang/#/2/CCD/0/102/CCY/0/202/DC/1005/302/ALI/DEBITCARD_AYCB";
		        BankInCrementArr[15] = "DEBITCARD_BSB/0/4/4/115/11/0/#/0/0/0/0//#/0/B/BSYH/15/包商银行//baoshangyinhang/#/15/CCD/0/115/CCY/503/215/DC/1007/315/ALI/DEBITCARD_BSB";
		        BankInCrementArr[16] = "DEBITCARD_BJBANK/0/4/4/125/11/0/#/0/0/0/0//#/0/B/BJYH/16/北京银行//beijingyinhang/#/6/CCD/27/106/CCY/570/206/DC/1141/306/ALI/DEBITCARD_BJBANK";
		        BankInCrementArr[17] = "DEBITCARD_CZCCB/0/4/4/145/11/0/#/0/0/0/0//#/0/C/CZSYYH/17/长治市商业银行//changzhishangyeyinhang/#/23/CCD/0/123/CCY/0/223/DC/1014/323/ALI/DEBITCARD_CZCCB";
		        BankInCrementArr[18] = "DEBITCARD_BOCY/0/4/4/155/11/0/#/0/0/0/0//#/0/C/CYYH/18/朝阳银行//chaoyangyinhang/#/9/CCD/0/109/CCY/0/209/DC/1114/309/ALI/DEBITCARD_BOCY";
		        BankInCrementArr[19] = "DEBITCARD_CDRCB/0/4/4/160/11/0/#/0/0/0/0//#/0/C/CDNSYH/19/成都农商行//chengdunongshangyinhang/#/20/CCD/0/120/CCY/504/220/DC/1008/320/ALI/DEBITCARD_CDRCB";
		        BankInCrementArr[20] = "DEBITCARD_CDCB/0/4/4/170/11/0/#/0/0/0/0//#/0/C/CDYH/20/成都银行//chengduyinhang/#/19/CCD/0/119/CCY/0/219/DC/1009/319/ALI/DEBITCARD_CDCB";
		        BankInCrementArr[21] = "DEBITCARD_BOCD/0/4/4/175/11/0/#/0/0/0/0//#/0/C/CDYH/21/承德银行//chengdeyinhang/#/8/CCD/0/108/CCY/508/208/DC/1012/308/ALI/DEBITCARD_BOCD";
		        BankInCrementArr[22] = "DEBITCARD_BODD/0/1/1/185/11/0/#/0/0/0/0//#/0/D/DDYH/22/丹东银行//dandongyinhang/#/10/CCD/0/110/CCY/0/210/DC/0/310/ALI/DEBITCARD_BODD";
		        BankInCrementArr[23] = "DEBITCARD_DYCB/0/4/4/190/11/0/#/0/0/0/0//#/0/D/DYYH/23/德阳银行//deyangyinhang/#/27/CCD/0/127/CCY/0/227/DC/1015/327/ALI/DEBITCARD_DYCB";
		        BankInCrementArr[24] = "DEBITCARD_DZBANK/0/1/1/195/11/0/#/0/0/0/0//#/0/D/DZYH/24/德州银行//dezhouyinhang/#/29/CCD/0/129/CCY/0/229/DC/0/329/ALI/DEBITCARD_DZBANK";
		        BankInCrementArr[25] = "DEBITCARD_DRCBCL/0/4/4/200/11/0/#/0/0/0/0//#/0/D/DWNCSYYH/25/东莞农商行//dongwannongcunshangyeyinhang/#/26/CCD/0/126/CCY/0/226/DC/1016/326/ALI/DEBITCARD_DRCBCL";
		        BankInCrementArr[26] = "DEBITCARD_DYCCB/0/4/4/220/11/0/#/0/0/0/0//#/0/D/DYSSYYH/26/东营银行//dongyingshishangyeyinhang/#/28/CCD/0/128/CCY/511/228/DC/0/328/ALI/DEBITCARD_DYCCB";
		        BankInCrementArr[27] = "DEBITCARD_ORBANK/0/4/4/225/11/0/#/0/0/0/0//#/0/E/EEDSYH/27/鄂尔多斯银行//eerduosiyinhang/#/68/CCD/0/168/CCY/512/268/DC/1017/368/ALI/DEBITCARD_ORBANK";
		        BankInCrementArr[28] = "DEBITCARD_FJHXBC/0/4/4/230/11/0/#/0/0/0/0//#/0/F/FJHXYH/28/福建海峡银行//fujianhaixiayinhang/#/31/CCD/0/131/CCY/0/231/DC/1018/331/ALI/DEBITCARD_FJHXBC";
		        BankInCrementArr[29] = "DEBITCARD_FSCB/0/4/4/240/11/0/#/0/0/0/0//#/0/F/FSYH/29/抚顺银行//fushunyinhang/#/32/CCD/0/132/CCY/0/232/DC/1019/332/ALI/DEBITCARD_FSCB";
		        BankInCrementArr[30] = "DEBITCARD_FXCB/0/1/1/245/11/0/#/0/0/0/0//#/0/F/FXYH/30/阜新银行//fuxinyinhang/#/33/CCD/0/133/CCY/0/233/DC/0/333/ALI/DEBITCARD_FXCB";
		        BankInCrementArr[31] = "DEBITCARD_GZB/0/4/4/260/11/0/#/0/0/0/0//#/0/G/GZYH/31/赣州银行//ganzhouyinhang/#/38/CCD/0/138/CCY/517/238/DC/1026/338/ALI/DEBITCARD_GZB";
		        BankInCrementArr[32] = "DEBITCARD_ICBC/0/4/4/265/11/0/#/0/0/0/0//#/0/G/GSYH/32/工商银行//gongshangyinhang/#/47/CCD/2/147/CCY/554/247/DC/1127/347/ALI/DEBITCARD_ICBC";
		        BankInCrementArr[34] = "DEBITCARD_GDRCC/0/4/4/285/11/0/#/0/0/0/0//#/0/G/GDNCXYS/34/广东农信社//guangdongnongcunxinyongshe/#/35/CCD/0/135/CCY/0/235/DC/1024/335/ALI/DEBITCARD_GDRCC";
		        BankInCrementArr[36] = "DEBITCARD_BGB/0/4/4/295/11/0/#/0/0/0/0//#/0/G/GXBBWYH/36/广西北部湾银行//guangxibeibuwanyinhang/#/4/CCD/0/104/CCY/0/204/DC/1021/304/ALI/DEBITCARD_BGB";
		        BankInCrementArr[37] = "DEBITCARD_GRCB/0/4/4/310/11/0/#/0/0/0/0//#/0/G/GZNSYH/37/广州农商行//guangzhounongshangyinhang/#/36/CCD/0/136/CCY/516/236/DC/1025/336/ALI/DEBITCARD_GRCB";
		        BankInCrementArr[38] = "DEBITCARD_GCB/0/4/4/315/11/0/#/0/0/0/0//#/0/G/GZYH/38/广州银行//guangzhouyinhang/#/34/CCD/0/134/CCY/515/234/DC/1023/334/ALI/DEBITCARD_GCB";
		        BankInCrementArr[39] = "DEBITCARD_GYCB/0/4/4/320/11/0/#/0/0/0/0//#/0/G/GYYH/39/贵阳银行//guiyangyinhang/#/37/CCD/0/137/CCY/518/237/DC/1028/337/ALI/DEBITCARD_GYCB";
		        BankInCrementArr[40] = "DEBITCARD_HDBANK/0/4/4/340/11/0/#/0/0/0/0//#/0/H/HDYH/40/邯郸银行//handanyinhang/#/42/CCD/0/142/CCY/0/242/DC/1041/342/ALI/DEBITCARD_HDBANK";
		        BankInCrementArr[41] = "DEBITCARD_HANABANK/0/1/1/345/11/0/#/0/0/0/0//#/0/H/HYYH/41/韩亚银行//hanyayinhang/#/40/CCD/0/140/CCY/0/240/DC/0/340/ALI/DEBITCARD_HANABANK";
		        BankInCrementArr[42] = "DEBITCARD_HKB/0/1/1/350/11/0/#/0/0/0/0//#/0/H/HKYH/42/汉口银行//hankouyinhang/#/43/CCD/0/143/CCY/0/243/DC/0/343/ALI/DEBITCARD_HKB";
		        BankInCrementArr[43] = "DEBITCARD_HZCB/0/1/1/355/11/0/#/0/0/0/0//#/0/H/HZYH/43/杭州银行//hangzhouyinhang/#/46/CCD/0/146/CCY/519/246/DC/0/346/ALI/DEBITCARD_HZCB";
		        BankInCrementArr[44] = "DEBITCARD_BHB/0/4/4/365/11/0/#/0/0/0/0//#/0/H/HBYH/44/河北银行//hebeiyinhang/#/5/CCD/0/105/CCY/520/205/DC/1030/305/ALI/DEBITCARD_BHB";
		        BankInCrementArr[45] = "DEBITCARD_EGBANK/0/1/1/380/11/0/#/0/0/0/0//#/0/H/HFYH/45/恒丰银行//hengfengyinhang/#/30/CCD/0/130/CCY/0/230/DC/0/330/ALI/DEBITCARD_EGBANK";
		        BankInCrementArr[46] = "DEBITCARD_HSBK/0/4/4/385/11/0/#/0/0/0/0//#/0/H/HSYH/46/衡水市商业银行//hengshuiyinhang/#/45/CCD/0/145/CCY/0/245/DC/1034/345/ALI/DEBITCARD_HSBK";
		        BankInCrementArr[47] = "DEBITCARD_HBC/0/4/4/395/11/0/#/0/0/0/0//#/0/H/HBYH/47/湖北银行//hubeiyinhang/#/41/CCD/0/141/CCY/0/241/DC/1039/341/ALI/DEBITCARD_HBC";
		        BankInCrementArr[48] = "DEBITCARD_HSBC/0/1/1/415/11/0/#/0/0/0/0//#/0/H/HFYH（ZG）/48/汇丰银行（中国）//huifengyinhang（zhongguo）/#/44/CCD/0/144/CCY/0/244/DC/0/344/ALI/DEBITCARD_HSBC";
		        BankInCrementArr[49] = "DEBITCARD_JNBANK/0/1/1/425/11/0/#/0/0/0/0//#/0/J/JNYH/49/济宁银行//jiningyinhang/#/51/CCD/0/151/CCY/0/251/DC/0/351/ALI/DEBITCARD_JNBANK";
		        BankInCrementArr[50] = "DEBITCARD_JXBANK/0/4/4/430/11/0/#/0/0/0/0//#/0/J/JXYH/50/嘉兴银行//jiaxingyinhang/#/54/CCD/0/154/CCY/0/254/DC/1042/354/ALI/DEBITCARD_JXBANK";
		        BankInCrementArr[52] = "DEBITCARD_CZRCB/0/4/4/440/11/0/#/0/0/0/0//#/0/J/JNNCSYYH/52/江南农商行//jiangnannongcunshangyeyinhang/#/24/CCD/0/124/CCY/0/224/DC/1047/324/ALI/DEBITCARD_CZRCB";
		        BankInCrementArr[53] = "DEBITCARD_JRCB/0/4/4/465/11/0/#/0/0/0/0//#/0/J/JSJYNCSYYH/53/江阴农商行//jiangsujiangyinnongcunshangyeyinhang/#/52/CCD/0/152/CCY/525/252/DC/1046/352/ALI/DEBITCARD_JRCB";
		        BankInCrementArr[55] = "DEBITCARD_JHBANK/0/4/4/475/11/0/#/0/0/0/0//#/0/J/JHYH/55/金华银行//jinhuayinhang/#/48/CCD/0/148/CCY/527/248/DC/1051/348/ALI/DEBITCARD_JHBANK";
		        BankInCrementArr[56] = "DEBITCARD_BOJZ/0/1/1/480/11/0/#/0/0/0/0//#/0/J/JZYH/56/锦州银行//jinzhouyinhang/#/11/CCD/0/111/CCY/526/211/DC/0/311/ALI/DEBITCARD_BOJZ";
		        BankInCrementArr[57] = "DEBITCARD_JINCHB/0/4/4/485/11/0/#/0/0/0/0//#/0/J/JCYH/57/晋城银行//jinchengyinhang/#/49/CCD/0/149/CCY/0/249/DC/1043/349/ALI/DEBITCARD_JINCHB";
		        BankInCrementArr[58] = "DEBITCARD_JSB/0/1/1/490/11/0/#/0/0/0/0//#/0/J/JSYH/58/晋商银行//jinshangyinhang/#/53/CCD/0/153/CCY/0/253/DC/0/353/ALI/DEBITCARD_JSB";
		        BankInCrementArr[59] = "DEBITCARD_JZBANK/0/1/1/495/11/0/#/0/0/0/0//#/0/J/JZSSYYH/59/晋中银行//jinzhongshishangyeyinhang/#/55/CCD/0/155/CCY/0/255/DC/0/355/ALI/DEBITCARD_JZBANK";
		        BankInCrementArr[60] = "DEBITCARD_JJBANK/0/4/4/500/11/0/#/0/0/0/0//#/0/J/JJYH/60/九江银行//jiujiangyinhang/#/50/CCD/0/150/CCY/528/250/DC/1052/350/ALI/DEBITCARD_JJBANK";
		        BankInCrementArr[61] = "DEBITCARD_CBKF/0/1/1/505/11/0/#/0/0/0/0//#/0/K/KFSSYYH/61/开封市商业银行//kaifengshishangyeyinhang/#/17/CCD/0/117/CCY/0/217/DC/0/317/ALI/DEBITCARD_CBKF";
		        BankInCrementArr[62] = "DEBITCARD_KORLABANK/0/4/4/510/11/0/#/0/0/0/0//#/0/K/KELSSYYH/62/库尔勒市商业银行//kuerleshishangyeyinhang/#/57/CCD/0/157/CCY/0/257/DC/1054/357/ALI/DEBITCARD_KORLABANK";
		        BankInCrementArr[63] = "DEBITCARD_KLB/0/4/4/515/11/0/#/0/0/0/0//#/0/K/KLYH/63/昆仑银行//kunlunyinhang/#/56/CCD/0/156/CCY/0/256/DC/1055/356/ALI/DEBITCARD_KLB";
		        BankInCrementArr[64] = "DEBITCARD_LSBANK/0/1/1/520/11/0/#/0/0/0/0//#/0/L/LSYH/64/莱商银行//laishangyinhang/#/58/CCD/0/158/CCY/0/258/DC/0/358/ALI/DEBITCARD_LSBANK";
		        BankInCrementArr[65] = "DEBITCARD_LZYH/0/4/4/525/11/0/#/0/0/0/0//#/0/L/LZYH/65/兰州银行//lanzhouyinhang/#/62/CCD/0/162/CCY/530/262/DC/1062/362/ALI/DEBITCARD_LZYH";
		        BankInCrementArr[66] = "DEBITCARD_LSCCB/0/4/4/530/11/0/#/0/0/0/0//#/0/L/LSSSYYH/66/乐山市商业银行//leshanshishangyeyinhang/#/60/CCD/0/160/CCY/0/260/DC/1058/360/ALI/DEBITCARD_LSCCB";
		        BankInCrementArr[67] = "DEBITCARD_LSBC/0/4/4/535/11/0/#/0/0/0/0//#/0/L/LSYH/67/临商银行//linshangyinhang/#/59/CCD/0/159/CCY/0/259/DC/1059/359/ALI/DEBITCARD_LSBC";
		        BankInCrementArr[68] = "DEBITCARD_LZCCB/0/4/4/540/11/0/#/0/0/0/0//#/0/L/LZYH/68/柳州银行//liuzhouyinhang/#/61/CCD/0/161/CCY/0/261/DC/1060/361/ALI/DEBITCARD_LZCCB";
		        BankInCrementArr[69] = "DEBITCARD_DAQINGB/0/4/4/545/11/0/#/0/0/0/0//#/0/L/LJYH/69/龙江银行//longjiangyinhang/#/25/CCD/0/125/CCY/529/225/DC/1056/325/ALI/DEBITCARD_DAQINGB";
		        BankInCrementArr[71] = "DEBITCARD_H3CB/0/4/4/555/11/0/#/0/0/0/0//#/0/N/NMGYH/71/内蒙古银行//namengguyinhang/#/39/CCD/0/139/CCY/0/239/DC/1064/339/ALI/DEBITCARD_H3CB";
		        BankInCrementArr[72] = "DEBITCARD_NCB/0/4/4/560/11/0/#/0/0/0/0//#/0/N/NCYH/72/南昌银行//nanchangyinhang/#/65/CCD/0/165/CCY/531/265/DC/1068/365/ALI/DEBITCARD_NCB";
		        BankInCrementArr[73] = "DEBITCARD_CGNB/0/4/4/565/11/0/#/0/0/0/0//#/0/N/NCSSYYH/73/南充市商业银行//nanchongshishangyeyinhang/#/21/CCD/0/121/CCY/0/221/DC/1070/321/ALI/DEBITCARD_CGNB";
		        BankInCrementArr[74] = "DEBITCARD_NJCB/0/4/4/570/11/0/#/0/0/0/0//#/0/N/NJYH/74/南京银行//nanjingyinhang/#/66/CCD/0/166/CCY/532/266/DC/1069/366/ALI/DEBITCARD_NJCB";
		        BankInCrementArr[75] = "DEBITCARD_NYCB/0/1/1/575/11/0/#/0/0/0/0//#/0/N/NYCZYH/75/南阳村镇银行//nanyangcunzhenyinhang/#/67/CCD/0/167/CCY/0/267/DC/0/367/ALI/DEBITCARD_NYCB";
		        BankInCrementArr[76] = "DEBITCARD_NBBANK/0/3/1/585/11/0/#/0/0/0/0//#/0/N/NBYH/76/宁波银行//ningboyinhang/#/63/CCD/25/163/CCY/568/263/DC/0/363/ALI/DEBITCARD_NBBANK";
		        BankInCrementArr[78] = "DEBITCARD_PZHCCB/0/4/4/600/11/0/#/0/0/0/0//#/0/P/PZHSSYYH/78/攀枝花市商业银行//panzhihuashishangyeyinhang/#/70/CCD/0/170/CCY/0/270/DC/1072/370/ALI/DEBITCARD_PZHCCB";
		        BankInCrementArr[80] = "DEBITCARD_BOP/0/4/4/610/11/0/#/0/0/0/0//#/0/P/PDSYH/80/平顶山银行//pingdingshanyinhang/#/12/CCD/0/112/CCY/0/212/DC/1071/312/ALI/DEBITCARD_BOP";
		        BankInCrementArr[82] = "DEBITCARD_QLBANK/0/4/4/620/11/0/#/0/0/0/0//#/0/Q/QLYH/82/齐鲁银行//qiluyinhang/#/71/CCD/0/171/CCY/534/271/DC/1073/371/ALI/DEBITCARD_QLBANK";
		        BankInCrementArr[83] = "DEBITCARD_RZB/0/1/1/635/11/0/#/0/0/0/0//#/0/R/RZYH/83/日照银行//rizhaoyinhang/#/72/CCD/0/172/CCY/0/272/DC/0/372/ALI/DEBITCARD_RZB";
		        BankInCrementArr[84] = "DEBITCARD_SCCB/0/4/4/640/11/0/#/0/0/0/0//#/0/S/SMXSSYYH/84/三门峡银行//sanmenxiashishangyeyinhang/#/74/CCD/0/174/CCY/0/274/DC/1080/374/ALI/DEBITCARD_SCCB";
		        BankInCrementArr[85] = "DEBITCARD_SDRCU/0/4/4/645/11/0/#/0/0/0/0//#/0/S/SDSNCXYS/85/山东农信社//shandongshengnongcunxinyongshe/#/76/CCD/0/176/CCY/0/276/DC/1089/376/ALI/DEBITCARD_SDRCU";
		        BankInCrementArr[87] = "DEBITCARD_SRBANK/0/4/4/665/11/0/#/0/0/0/0//#/0/S/SRYH/87/上饶银行//shangraoyinhang/#/78/CCD/0/178/CCY/537/278/DC/1081/378/ALI/DEBITCARD_SRBANK";
		        BankInCrementArr[88] = "DEBITCARD_SXCB/0/1/1/670/11/0/#/0/0/0/0//#/0/S/SXYH/88/绍兴银行//shaoxingyinhang/#/80/CCD/0/180/CCY/0/280/DC/0/380/ALI/DEBITCARD_SXCB";
		        BankInCrementArr[89] = "DEBITCARD_SRCB/0/4/4/675/11/0/#/0/0/0/0//#/0/S/SZNCSYYH/89/深圳农商行//shenzhennongcunshangyeyinhang/#/79/CCD/0/179/CCY/0/279/DC/1084/379/ALI/DEBITCARD_SRCB";
		        BankInCrementArr[90] = "DEBITCARD_SJBANK/0/1/1/680/11/0/#/0/0/0/0//#/0/S/SJYH/90/盛京银行//shengjingyinhang/#/77/CCD/0/177/CCY/0/277/DC/0/377/ALI/DEBITCARD_SJBANK";
		        BankInCrementArr[91] = "DEBITCARD_SZSBK/0/1/1/685/11/0/#/0/0/0/0//#/0/S/SZSYH/91/石嘴山银行//shizuishanyinhang/#/81/CCD/0/181/CCY/0/281/DC/0/381/ALI/DEBITCARD_SZSBK";
		        BankInCrementArr[92] = "DEBITCARD_SDEB/0/4/4/690/11/0/#/0/0/0/0//#/0/S/SDNSYH/92/顺德农商行//shundenongshangyinhang/#/75/CCD/0/175/CCY/538/275/DC/1087/375/ALI/DEBITCARD_SDEB";
		        BankInCrementArr[93] = "DEBITCARD_TCRCB/0/4/4/715/11/0/#/0/0/0/0//#/0/T/TCNCSYYH/93/太仓农商行//taicangnongcunshangyeyinhang/#/83/CCD/0/183/CCY/0/283/DC/1092/383/ALI/DEBITCARD_TCRCB";
		        BankInCrementArr[94] = "DEBITCARD_TACCB/0/4/4/720/11/0/#/0/0/0/0//#/0/T/TASSYYH/94/泰安市商业银行//taianshishangyeyinhang/#/82/CCD/0/182/CCY/0/282/DC/1091/382/ALI/DEBITCARD_TACCB";
		        BankInCrementArr[95] = "DEBITCARD_WHCCB/0/4/4/730/11/0/#/0/0/0/0//#/0/W/WHYH/95/威海市商业银行//weihaiyinhang/#/84/CCD/0/184/CCY/542/284/DC/1097/384/ALI/DEBITCARD_WHCCB";
		        BankInCrementArr[96] = "DEBITCARD_BANKWF/0/4/4/740/11/0/#/0/0/0/0//#/0/W/WFYH/96/潍坊银行//weifangyinhang/#/3/CCD/0/103/CCY/541/203/DC/1096/303/ALI/DEBITCARD_BANKWF";
		        BankInCrementArr[97] = "DEBITCARD_WRCB/0/4/4/760/11/0/#/0/0/0/0//#/0/W/WXNCSYYH/97/无锡农商行//wuxinongcunshangyeyinhang/#/86/CCD/0/186/CCY/544/286/DC/1100/386/ALI/DEBITCARD_WRCB";
		        BankInCrementArr[98] = "DEBITCARD_WJRCB/0/4/4/775/11/0/#/0/0/0/0//#/0/W/WJNCSYYH/98/吴江农商行//wujiangnongcunshangyeyinhang/#/85/CCD/0/185/CCY/543/285/DC/1099/385/ALI/DEBITCARD_WJRCB";
		        BankInCrementArr[99] = "DEBITCARD_XABANK/0/1/1/785/11/0/#/0/0/0/0//#/0/X/XAYH/99/西安银行//xianyinhang/#/87/CCD/0/187/CCY/0/287/DC/0/387/ALI/DEBITCARD_XABANK";
		        BankInCrementArr[100] = "DEBITCARD_XXBANK/0/1/1/805/11/0/#/0/0/0/0//#/0/X/XXYH/100/新乡银行//xinxiangyinhang/#/90/CCD/0/190/CCY/0/290/DC/0/390/ALI/DEBITCARD_XXBANK";
		        BankInCrementArr[101] = "DEBITCARD_XYBANK/0/1/1/810/11/0/#/0/0/0/0//#/0/X/XYYH/101/信阳银行//xinyangyinhang/#/91/CCD/0/191/CCY/0/291/DC/0/391/ALI/DEBITCARD_XYBANK";
		        BankInCrementArr[102] = "DEBITCARD_XTB/0/4/4/825/11/0/#/0/0/0/0//#/0/X/XTYH/102/邢台银行//xingtaiyinhang/#/89/CCD/0/189/CCY/0/289/DC/1105/389/ALI/DEBITCARD_XTB";
		        BankInCrementArr[103] = "DEBITCARD_XCYH/0/4/4/830/11/0/#/0/0/0/0//#/0/X/XCYH/103/许昌银行//xuchangyinhang/#/88/CCD/0/188/CCY/0/288/DC/1104/388/ALI/DEBITCARD_XCYH";
		        BankInCrementArr[104] = "DEBITCARD_YQCCB/0/4/4/835/11/0/#/0/0/0/0//#/0/Y/YQSSYYH/104/阳泉市商业银行//yangquanshishangyeyinhang/#/94/CCD/0/194/CCY/0/294/DC/1108/394/ALI/DEBITCARD_YQCCB";
		        BankInCrementArr[105] = "DEBITCARD_YBCCB/0/4/4/845/11/0/#/0/0/0/0//#/0/Y/YBSSYYH/105/宜宾市商业银行//yibinshishangyeyinhang/#/92/CCD/0/192/CCY/0/292/DC/1106/392/ALI/DEBITCARD_YBCCB";
		        BankInCrementArr[106] = "DEBITCARD_NBYZ/0/1/1/860/11/0/#/0/0/0/0//#/0/Y/YZYH/106/鄞州银行//yinzhouyinhang/#/64/CCD/0/164/CCY/549/264/DC/0/364/ALI/DEBITCARD_NBYZ";
		        BankInCrementArr[107] = "DEBITCARD_BOYK/0/4/4/865/11/0/#/0/0/0/0//#/0/Y/YKYH/107/营口银行//yingkouyinhang/#/13/CCD/0/113/CCY/0/213/DC/1111/313/ALI/DEBITCARD_BOYK";
		        BankInCrementArr[108] = "DEBITCARD_PSBC/0/4/4/870/11/0/#/0/0/0/0//#/0/Y/YCYH/108/邮政储蓄银行//youchuyinhang/#/69/CCD/0/169/CCY/501/269/DC/1001/369/ALI/DEBITCARD_PSBC";
		        BankInCrementArr[109] = "DEBITCARD_YXCCB/0/4/4/885/11/0/#/0/0/0/0//#/0/Y/YHSSYYH/109/玉溪市商业银行//yuxishishangyeyinhang/#/95/CCD/0/195/CCY/0/295/DC/1109/395/ALI/DEBITCARD_YXCCB";
		        BankInCrementArr[110] = "DEBITCARD_YNRCC/0/4/4/890/11/0/#/0/0/0/0//#/0/Y/YNSNCXYS/110/云南农信社//yunnanshengnongcunxinyongshe/#/93/CCD/0/193/CCY/0/293/DC/1110/393/ALI/DEBITCARD_YNRCC";
		        BankInCrementArr[111] = "DEBITCARD_SCB/0/4/4/895/11/0/#/0/0/0/0//#/0/Z/ZDYH/111/渣打银行//zhadayinhang/#/73/CCD/0/173/CCY/0/273/DC/1122/373/ALI/DEBITCARD_SCB";
		        BankInCrementArr[112] = "DEBITCARD_ZRCBANK/0/4/4/900/11/0/#/0/0/0/0//#/0/Z/ZJGNCSYYH/112/张家港农商行//zhangjiagangnongcunshangyeyinhang/#/99/CCD/0/199/CCY/0/299/DC/1116/399/ALI/DEBITCARD_ZRCBANK";
		        BankInCrementArr[113] = "DEBITCARD_ZJKCCB/0/4/4/905/11/0/#/0/0/0/0//#/0/Z/ZJKSSYYH/113/张家口市商业银行//zhangjiakoushishangyeyinhang/#/97/CCD/0/197/CCY/0/297/DC/1117/397/ALI/DEBITCARD_ZJKCCB";
		        BankInCrementArr[115] = "DEBITCARD_ZJNX/0/1/1/925/11/0/#/0/0/0/0//#/0/Z/ZJSNCXYS/115/浙江农信社//zhejiangshengnongcunxinyongshe/#/98/CCD/0/198/CCY/0/298/DC/0/398/ALI/DEBITCARD_ZJNX";
		        BankInCrementArr[116] = "DEBITCARD_ZZBANK/0/4/4/935/11/0/#/0/0/0/0//#/0/Z/ZZYH/116/郑州银行//zhengzhouyinhang/#/100/CCD/0/200/CCY/0/300/DC/1115/400/ALI/DEBITCARD_ZZBANK";
		        BankInCrementArr[117] = "DEBITCARD_BOC/0/1/1/940/11/0/#/0/0/0/0//#/0/Z/ZGYH/117/中国银行//zhongguoyinhang/#/7/CCD/1/107/CCY/553/207/DC/1129/307/ALI/DEBITCARD_BOC";
		        BankInCrementArr[121] = "DEBITCARD_CCQTGB/0/1/1/177/11/0/#/0/0/0/0//#/0/C/CQSXYH/121/重庆三峡银行//chongqingsanxiayinhang/#/18/CCD/0/118/CCY/0/218/DC/0/318/ALI/DEBITCARD_CCQTGB";
		        BankInCrementArr[122] = "DEBITCARD_CQBANK/0/1/1/178/11/0/#/0/0/0/0//#/0/C/CQYH/122/重庆银行//chongqingyinhang/#/22/CCD/0/122/CCY/509/222/DC/0/322/ALI/DEBITCARD_CQBANK";
		        BankInCrementArr[123] = "DEBITCARD_BOZK/0/4/4/965/11/0/#/0/0/0/0//#/0/Z/ZKYH/123/周口银行//zhoukouyinhang/#/14/CCD/0/114/CCY/0/214/DC/1119/314/ALI/DEBITCARD_BOZK";
		        BankInCrementArr[124] = "DEBITCARD_BZMD/0/1/1/975/11/0/#/0/0/0/0//#/0/Z/ZMDYH/124/驻马店银行//zhumadianyinhang/#/16/CCD/0/116/CCY/0/216/DC/0/316/ALI/DEBITCARD_BZMD";
		        BankInCrementArr[125] = "DEBITCARD_ZGCCB/0/4/4/980/11/0/#/0/0/0/0//#/0/Z/ZGSSYYH/125/自贡市商业银行//zigongshishangyeyinhang/#/96/CCD/0/196/CCY/0/296/DC/1118/396/ALI/DEBITCARD_ZGCCB";
		        BankInCrementArr[126] = "3/0/5/4/470/11/0/#/0/0/0/0//#/0/J/JTYH/126/交通银行//jiaotongyinhang/DEBITCARD_COMM/401/CCD/3/417/CCY/555/433/DC/1131/449/ALI/DEBITCARD_COMM";
		        BankInCrementArr[127] = "4/0/5/4/595/11/0/#/0/0/0/0//#/0/N/NYYH/127/农业银行//nongyeyinhang/DEBITCARD_ABC/402/CCD/4/418/CCY/556/434/DC/1128/450/ALI/DEBITCARD_ABC";
		        BankInCrementArr[128] = "5/0/5/4/435/11/0/#/0/0/0/0//#/0/J/JSYH/128/建设银行//jiansheyinhang/DEBITCARD_CCB/403/CCD/5/419/CCY/557/435/DC/1130/451/ALI/DEBITCARD_CCB";
		        BankInCrementArr[129] = "11/0/5/4/910/11/0/#/0/0/0/0//#/0/Z/ZSYH/129/招商银行//zhaoshangyinhang/DEBITCARD_CMB/404/CCD/11/420/CCY/558/436/DC/1137/452/ALI/DEBITCARD_CMB";
		        BankInCrementArr[130] = "13/0/5/4/290/11/0/#/0/0/0/0//#/0/G/GFYH/130/广发银行//guangfayinhang/DEBITCARD_GDB/405/CCD/13/421/CCY/559/437/DC/0/453/ALI/DEBITCARD_GDB";
		        BankInCrementArr[131] = "15/0/5/4/270/11/0/#/0/0/0/0//#/0/G/GDYH/131/光大银行//guangdayinhang/DEBITCARD_CEB/406/CCD/15/422/CCY/560/438/DC/1133/454/ALI/DEBITCARD_CEB";
		        BankInCrementArr[132] = "16/0/5/4/550/11/0/#/0/0/0/0//#/0/M/MSYH/132/民生银行//minshengyinhang/DEBITCARD_CMBC/407/CCD/16/423/CCY/561/439/DC/1135/455/ALI/DEBITCARD_CMBC";
		        BankInCrementArr[133] = "17/0/5/4/945/11/0/#/0/0/0/0//#/0/Z/ZXYH/133/中信银行//zhongxinyinhang/DEBITCARD_CITIC/408/CCD/17/424/CCY/562/440/DC/1132/456/ALI/DEBITCARD_CITIC";
		        BankInCrementArr[134] = "18/0/5/4/615/11/0/#/0/0/0/0//#/0/P/PFYH/134/浦发银行//pufayinhang/#/409/CCD/18/425/CCY/563/441/DC/1139/457/ALI/0";
		        BankInCrementArr[135] = "20/0/5/4/815/11/0/#/0/0/0/0//#/0/X/XYYH/135/兴业银行//xingyeyinhang/DEBITCARD_CIB/410/CCD/20/426/CCY/564/442/DC/1138/458/ALI/DEBITCARD_CIB";
		        BankInCrementArr[136] = "21/0/5/4/660/11/0/#/0/0/0/0//#/0/S/SHYH/136/上海银行//shanghaiyinhang/DEBITCARD_SHBANK/411/CCD/21/427/CCY/565/443/DC/1142/459/ALI/DEBITCARD_SHBANK";
		        BankInCrementArr[137] = "22/0/5/4/605/11/0/#/0/0/0/0//#/0/P/PAYH/137/平安银行//pinganyinhang/DEBITCARD_SPABANK/412/CCD/22/428/CCY/566/444/DC/1140/460/ALI/DEBITCARD_SPABANK";
		        BankInCrementArr[139] = "24/0/5/4/405/11/0/#/0/0/0/0//#/0/H/HXYH/139/华夏银行//huaxiayinhang/DEBITCARD_HXBANK/414/CCD/24/430/CCY/567/446/DC/1134/462/ALI/DEBITCARD_HXBANK";
		        BankInCrementArr[140] = "26/0/5/4/210/11/0/#/0/0/0/0//#/0/D/DYYH/140/东亚银行//dongyayinhang/#/415/CCD/26/431/CCY/569/447/DC/0/463/ALI/0";
		        BankInCrementArr[141] = "28/0/5/4/450/11/0/#/0/0/0/0//#/0/J/JSYH/141/江苏银行//jiangsuyinhang/DEBITCARD_JSBANK/416/CCD/28/432/CCY/571/448/DC/1143/464/ALI/DEBITCARD_JSBANK";
		        BankInCrementArr[142] = "510/0/5/4/180/11/0/#/0/0/0/0//#/0/D/DLYH/142/大连银行//dalianyinhang/#/465/CCY/510/484/CCD/0/503/DC/0/522/ALI/0";
		        BankInCrementArr[143] = "511/0/5/2/215/11/0/#/0/0/0/0//#/0/D/DYTH/143/东营银行//dongyingyinhang/#/466/CCY/511/485/CCD/0/504/DC/0/523/ALI/0";
		        BankInCrementArr[144] = "514/0/5/4/250/11/0/#/0/0/0/0//#/0/F/FDYH/144/富滇银行//fudianyinhang/DEBITCARD_FDB/467/CCY/514/486/CCD/0/505/DC/1020/524/ALI/DEBITCARD_FDB";
		        BankInCrementArr[145] = "522/0/5/4/335/11/0/#/0/0/0/0//#/0/H/HEBYH/145/哈尔滨银行//haerbinyinhang/DEBITCARD_HRBANK/468/CCY/522/487/CCD/0/506/DC/1035/525/ALI/DEBITCARD_HRBANK";
		        BankInCrementArr[146] = "521/0/5/4/410/11/0/#/0/0/0/0//#/0/H/HSYH/146/徽商银行//huishangyinhang/DEBITCARD_HSBANK/469/CCY/521/488/CCD/0/507/DC/1032/526/ALI/DEBITCARD_HSBANK";
		        BankInCrementArr[147] = "535/0/5/4/625/11/0/#/0/0/0/0//#/0/Q/QDYH/147/青岛银行//qingdaoyinhang/DEBITCARD_QDCCB/470/CCY/535/489/CCD/0/508/DC/1078/527/ALI/DEBITCARD_QDCCB";
		        BankInCrementArr[148] = "533/0/5/4/630/11/0/#/0/0/0/0//#/0/Q/QHYH/148/青海银行//qinghaiyinhang/#/471/CCY/533/490/CCD/0/509/DC/0/528/ALI/0";
		        BankInCrementArr[149] = "540/0/5/4/710/11/0/#/0/0/0/0//#/0/T/TZYH/149/台州银行//taizhouyinhang/#/472/CCY/540/491/CCD/0/510/DC/1095/529/ALI/0";
		        BankInCrementArr[150] = "542/0/5/2/735/11/0/#/0/0/0/0//#/0/W/WHSSYTH/150/威海市商业银行//weihaishishangyeyinhang/#/473/CCY/542/492/CCD/0/511/DC/1097/530/ALI/0";
		        BankInCrementArr[151] = "545/0/5/4/745/11/0/#/0/0/0/0//#/0/W/WZYH/151/温州银行//wenzhouyinhang/#/474/CCY/545/493/CCD/0/512/DC/1101/531/ALI/0";
		        BankInCrementArr[152] = "546/0/5/4/755/11/0/#/0/0/0/0//#/0/W/WLMQSSYYH/152/乌鲁木齐市商业银行//wulumuqishishangyeyinhang/#/475/CCY/546/494/CCD/0/513/DC/1102/532/ALI/0";
		        BankInCrementArr[153] = "547/0/5/4/850/11/0/#/0/0/0/0//#/0/Y/YCSSYYH/153/宜昌市商业银行//yichangshishangyeyinhang/#/476/CCY/547/495/CCD/0/514/DC/0/533/ALI/0";
		        BankInCrementArr[154] = "548/0/5/4/855/11/0/#/0/0/0/0//#/0/Y/YCSSYYH/154/银川市商业银行//yinchuanshishangyeyinhang/#/477/CCY/548/496/CCD/0/515/DC/0/534/ALI/0";
		        BankInCrementArr[155] = "501/0/5/2/875/11/0/#/0/0/0/0//#/0/Y/YZCXTH/155/邮政储蓄银行//youzhengchuxuyinhang/#/478/CCY/501/497/CCD/0/516/DC/1001/535/ALI/0";
		        BankInCrementArr[156] = "507/0/5/4/140/11/0/#/0/0/0/0//#/0/C/CSYH/156/长沙银行//changshayinhang/#/479/CCY/507/498/CCD/0/517/DC/0/536/ALI/0";
		        BankInCrementArr[157] = "550/0/5/4/915/11/0/#/0/0/0/0//#/0/Z/ZJCZSYYH/157/浙江稠州商业银行//zhejiangchouzhoushangyeyinhang/#/480/CCY/550/499/CCD/0/518/DC/1112/537/ALI/0";
		        BankInCrementArr[158] = "551/0/5/4/920/11/0/#/0/0/0/0//#/0/Z/ZJMTSYYH/158/浙江民泰商业银行//zhejiangmintaishangyeyinhang/#/481/CCY/551/500/CCD/0/519/DC/1113/538/ALI/0";
		        BankInCrementArr[159] = "552/0/5/4/930/11/0/#/0/0/0/0//#/0/Z/ZJTLSYYH/159/浙江泰隆商业银行//zhejiangtailongshangyeyinhang/#/482/CCY/552/501/CCD/0/520/DC/0/539/ALI/0";
		        BankInCrementArr[160] = "505/0/5/4/176/11/0/#/0/0/0/0//#/0/C/CQNCSYYH/160/重庆农商行//chongqingnongcunshangyeyinhang/DEBITCARD_CRCBANK/483/CCY/505/502/CCD/0/521/DC/1010/540/ALI/DEBITCARD_CRCBANK";
		        BankInCrementArr[161] = "DEBITCARD_BOC/1/1/1/5/11/0/#/0/0/0/0//#/0/Z/ZGYH/161/中国银行//zhongguoyinhang/#/541/CCD/1/543/CCY/553/545/DC/1129/547/ALI/DEBITCARD_BOC";
		        BankInCrementArr[162] = "DEBITCARD_ICBC/1/4/4/1/11/0/#/0/0/0/0//#/0/G/GSYH/162/工商银行//gongshangyinhang/#/542/CCD/2/544/CCY/554/546/DC/1127/548/ALI/DEBITCARD_ICBC";
		        BankInCrementArr[163] = "3/1/5/4/6/11/0/#/0/0/0/0//#/0/J/JTYH/163/交通银行//jiaotongyinhang/DEBITCARD_COMM/549/CCD/3/561/CCY/555/573/DC/1131/585/ALI/DEBITCARD_COMM";
		        BankInCrementArr[164] = "4/1/5/4/4/11/0/#/0/0/0/0//#/0/N/NYYH/164/农业银行//nongyeyinhang/DEBITCARD_ABC/550/CCD/4/562/CCY/556/574/DC/1128/586/ALI/DEBITCARD_ABC";
		        BankInCrementArr[165] = "5/1/5/4/3/11/0/#/0/0/0/0//#/0/J/JSYH/165/建设银行//jiansheyinhang/DEBITCARD_CCB/551/CCD/5/563/CCY/557/575/DC/1130/587/ALI/DEBITCARD_CCB";
		        BankInCrementArr[166] = "11/1/5/4/2/11/0/#/0/0/0/0//#/0/Z/ZSYH/166/招商银行//zhaoshangyinhang/DEBITCARD_CMB/552/CCD/11/564/CCY/558/576/DC/1137/588/ALI/DEBITCARD_CMB";
		        BankInCrementArr[167] = "13/1/5/4/13/11/0/#/0/0/0/0//#/0/G/GFYH/167/广发银行//guangfayinhang/DEBITCARD_GDB/553/CCD/13/565/CCY/559/577/DC/0/589/ALI/DEBITCARD_GDB";
		        BankInCrementArr[168] = "15/1/5/4/10/11/0/#/0/0/0/0//#/0/G/GDYH/168/光大银行//guangdayinhang/DEBITCARD_CEB/554/CCD/15/566/CCY/560/578/DC/1133/590/ALI/DEBITCARD_CEB";
		        BankInCrementArr[169] = "16/1/5/4/12/11/0/#/0/0/0/0//#/0/M/MSYH/169/民生银行//minshengyinhang/DEBITCARD_CMBC/555/CCD/16/567/CCY/561/579/DC/1135/591/ALI/DEBITCARD_CMBC";
		        BankInCrementArr[170] = "17/1/5/4/9/11/0/#/0/0/0/0//#/0/Z/ZXYH/170/中信银行//zhongxinyinhang/DEBITCARD_CITIC/556/CCD/17/568/CCY/562/580/DC/1132/592/ALI/DEBITCARD_CITIC";
		        BankInCrementArr[171] = "18/1/5/4/7/11/0/#/0/0/0/0//#/0/P/PFYH/171/浦发银行//pufayinhang/#/557/CCD/18/569/CCY/563/581/DC/1139/593/ALI/0";
		        BankInCrementArr[172] = "20/1/5/4/11/11/0/#/0/0/0/0//#/0/X/XYYH/172/兴业银行//xingyeyinhang/DEBITCARD_CIB/558/CCD/20/570/CCY/564/582/DC/1138/594/ALI/DEBITCARD_CIB";
		        BankInCrementArr[173] = "22/1/5/4/8/11/0/#/0/0/0/0//#/0/P/PAYH/173/平安银行//pinganyinhang/DEBITCARD_SPABANK/559/CCD/22/571/CCY/566/583/DC/1140/595/ALI/DEBITCARD_SPABANK";
		        BankInCrementArr[174] = "24/1/5/4/14/11/0/#/0/0/0/0//#/0/H/HXYH/174/华夏银行//huaxiayinhang/DEBITCARD_HXBANK/560/CCD/24/572/CCY/567/584/DC/1134/596/ALI/DEBITCARD_HXBANK";
		        BankInCrementArr[175] = "502/0/1/1/120/11/0/#/0/0/0/0//#/0/B/BJNSH/175/北京农商行//beijingnongshanghang/#/709/CCD/0/722/DC/0/735/ALI/0/748/CCY/502";
		        BankInCrementArr[176] = "506/0/4/4/150/11/0/#/0/0/0/0//#/0/C/CSNSH/176/常熟农商行//changshunongshanghang/DEBITCARD_CSRCB/710/CCD/0/723/DC/1011/736/ALI/DEBITCARD_CSRCB/749/CCY/506";
		        BankInCrementArr[177] = "504/0/5/2/165/11/0/#/0/0/0/0//#/0/C/CDNSH/177/成都农商行//chengdounongshanghang/#/711/CCD/0/724/DC/1008/737/ALI/0/750/CCY/504";
		        BankInCrementArr[178] = "513/0/1/1/235/11/0/#/0/0/0/0//#/0/F/FJNXS/178/福建农信社//fujiannongxinshe/DEBITCARD_FJNX/712/CCD/0/725/DC/0/738/ALI/DEBITCARD_FJNX/751/CCY/513";
		        BankInCrementArr[179] = "516/0/5/2/305/11/0/#/0/0/0/0//#/0/G/GZNSH/179/广州农商行//guangzhounongshanghang/#/713/CCD/0/726/DC/1025/739/ALI/0/752/CCY/516";
		        BankInCrementArr[180] = "523/0/4/4/400/11/0/#/0/0/0/0//#/0/H/HNNXS/180/湖南农信社//hunannongxinshe/DEBITCARD_HNRCC/714/CCD/0/727/DC/1037/740/ALI/DEBITCARD_HNRCC/753/CCY/523";
		        BankInCrementArr[181] = "524/0/4/4/445/11/0/#/0/0/0/0//#/0/J/JSNXS/181/江苏农信社//jiangsunongxinshe/#/715/CCD/0/728/DC/1045/741/ALI/0/754/CCY/524";
		        BankInCrementArr[182] = "525/0/5/2/460/11/0/#/0/0/0/0//#/0/J/JYNSH/182/江阴农商行//jiangyinnongshanghang/#/716/CCD/0/729/DC/1046/742/ALI/0/755/CCY/525";
		        BankInCrementArr[183] = "539/0/5/4/840/11/0/#/0/0/0/0//#/0/Y/YDNSH/183/尧都农商行//yaodunongshanghang/#/717/CCD/0/730/DC/0/743/ALI/0/756/CCY/539";
		        BankInCrementArr[184] = "536/0/4/4/655/11/0/#/0/0/0/0//#/0/S/SHNSH/184/上海农商行//shanghainongshanghang/#/718/CCD/0/731/DC/1079/744/ALI/0/757/CCY/536";
		        BankInCrementArr[185] = "538/0/5/2/695/11/0/#/0/0/0/0//#/0/S/SDNSH/185/顺德农商行//shundenongshanghang/#/719/CCD/0/732/DC/1087/745/ALI/0/758/CCY/538";
		        BankInCrementArr[186] = "544/0/5/2/765/11/0/#/0/0/0/0//#/0/W/WXNSH/186/无锡农商行//wuxinongshanghang/#/720/CCD/0/733/DC/1100/746/ALI/0/759/CCY/544";
		        BankInCrementArr[187] = "543/0/5/2/770/11/0/#/0/0/0/0//#/0/W/WJNSH/187/吴江农商行//wujiangnongshanghang/#/721/CCD/0/734/DC/1099/747/ALI/0/760/CCY/543";
		        BankInCrementArr[188] = "DEBITCARD_BOHAIB/0/5/4/130/11/0/#/0/0/0/0//#/0/B/BHYH/188/渤海银行//bohaiyinhang/#/761/CCD/0/792/CCY/0/823/DC/1002/854/ALI/DEBITCARD_BOHAIB";
		        BankInCrementArr[189] = "DEBITCARD_BOD/0/5/4/205/11/0/#/0/0/0/0//#/0/D/DWYH/189/东莞银行//dongwanyinhang/#/762/CCD/0/793/CCY/0/824/DC/0/855/ALI/DEBITCARD_BOD";
		        BankInCrementArr[190] = "DEBITCARD_GSRCU/0/4/4/255/11/0/#/0/0/0/0//#/0/G/GSNXS/190/甘肃农信社//gansunongxinshe/#/763/CCD/0/794/CCY/0/825/DC/1029/856/ALI/DEBITCARD_GSRCU";
		        BankInCrementArr[191] = "DEBITCARD_GHB/0/5/4/275/11/0/#/0/0/0/0//#/0/G/GDHXYH/191/广东华兴银行//guangdonghuaxingyinhang/#/764/CCD/0/795/CCY/0/826/DC/0/857/ALI/DEBITCARD_GHB";
		        BankInCrementArr[192] = "DEBITCARD_NYBANK/0/5/4/280/11/0/#/0/0/0/0//#/0/G/GDNYYH/192/广东南粤银行//guangdongnanyueyinhang/#/765/CCD/0/796/CCY/0/827/DC/0/858/ALI/DEBITCARD_NYBANK";
		        BankInCrementArr[193] = "DEBITCARD_GXRCU/0/1/1/300/11/0/#/0/0/0/0//#/0/G/GXZZZZQNXS/193/广西壮族自治区农信社//guangxizhuangzuzizhiqunongxinshe/#/766/CCD/0/797/CCY/0/828/DC/0/859/ALI/DEBITCARD_GXRCU";
		        BankInCrementArr[194] = "DEBITCARD_GZRCU/0/1/1/325/11/0/#/0/0/0/0//#/0/G/GZNXS/194/贵州农信社//guizhounongxinshe/#/767/CCD/0/798/CCY/0/829/DC/0/860/ALI/DEBITCARD_GZRCU";
		        BankInCrementArr[195] = "DEBITCARD_GLBANK/0/5/4/330/11/0/#/0/0/0/0//#/0/G/GLYH/195/桂林银行//guilinyinhang/#/768/CCD/0/799/CCY/0/830/DC/1027/861/ALI/DEBITCARD_GLBANK";
		        BankInCrementArr[196] = "DEBITCARD_HBRCU/0/4/4/360/11/0/#/0/0/0/0//#/0/H/HBNXS/196/河北农信社//hebeinongxinshe/#/769/CCD/0/800/CCY/0/831/DC/1031/862/ALI/DEBITCARD_HBRCU";
		        BankInCrementArr[197] = "DEBITCARD_HNRCU/0/1/1/370/11/0/#/0/0/0/0//#/0/H/HNNXS/197/河南农信社//henannongxinshe/#/770/CCD/0/801/CCY/0/832/DC/0/863/ALI/DEBITCARD_HNRCU";
		        BankInCrementArr[198] = "DEBITCARD_BOHB/0/5/4/375/11/0/#/0/0/0/0//#/0/H/HBYH/198/鹤壁银行//hebiyinhang/#/771/CCD/0/802/CCY/0/833/DC/1033/864/ALI/DEBITCARD_BOHB";
		        BankInCrementArr[199] = "DEBITCARD_HURCB/0/4/4/390/11/0/#/0/0/0/0//#/0/H/HBNXS/199/湖北农信社//hubeinongxinshe/#/772/CCD/0/803/CCY/0/834/DC/1038/865/ALI/DEBITCARD_HURCB";
		        BankInCrementArr[200] = "DEBITCARD_JLRCU/0/4/4/420/11/0/#/0/0/0/0//#/0/J/JLNXS/200/吉林农信社//jilinnongxinshe/#/773/CCD/0/804/CCY/0/835/DC/1048/866/ALI/DEBITCARD_JLRCU";
		        BankInCrementArr[201] = "DEBITCARD_JXRCU/0/1/1/455/11/0/#/0/0/0/0//#/0/J/JXNXS/201/江西农信社//jiangxinongxinshe/#/774/CCD/0/805/CCY/0/836/DC/0/867/ALI/DEBITCARD_JXRCU";
		        BankInCrementArr[202] = "DEBITCARD_NDHB/0/5/4/580/11/0/#/0/0/0/0//#/0/N/NBDHYH/202/宁波东海银行//ningbodonghaiyinhang/#/775/CCD/0/806/CCY/0/837/DC/1066/868/ALI/DEBITCARD_NDHB";
		        BankInCrementArr[203] = "DEBITCARD_NXRCU/0/4/4/590/11/0/#/0/0/0/0//#/0/N/NXHHNSX/203/宁夏黄河农商行//ningxiahuanghenongshangxing/#/776/CCD/0/807/CCY/0/838/DC/1067/869/ALI/DEBITCARD_NXRCU";
		        BankInCrementArr[204] = "DEBITCARD_XMBANK/0/5/4/790/11/0/#/0/0/0/0//#/0/X/XMYH/204/厦门银行//xiamenyinhang/#/777/CCD/0/808/CCY/0/839/DC/1103/870/ALI/DEBITCARD_XMBANK";
		        BankInCrementArr[205] = "DEBITCARD_SXRCCU/0/1/1/650/11/0/#/0/0/0/0//#/0/S/SXXH/205/陕西信合//shanxixinhe/#/778/CCD/0/809/CCY/0/840/DC/0/871/ALI/DEBITCARD_SXRCCU";
		        BankInCrementArr[207] = "DEBITCARD_SCRCU/0/4/4/700/11/0/#/0/0/0/0//#/0/S/SCNXS/207/四川农信社//sichuannongxinshe/#/780/CCD/0/811/CCY/0/842/DC/1088/873/ALI/DEBITCARD_SCRCU";
		        BankInCrementArr[208] = "DEBITCARD_BOSZ/0/5/4/705/11/0/#/0/0/0/0//#/0/S/SZYH/208/苏州银行//suzhouyinhang/#/781/CCD/0/812/CCY/0/843/DC/1085/874/ALI/DEBITCARD_BOSZ";
		        BankInCrementArr[209] = "DEBITCARD_TJBHB/0/4/4/725/11/0/#/0/0/0/0//#/0/T/TJBHNSX/209/天津滨海农商行//tianjinbinhainongshangxing/#/782/CCD/0/813/CCY/0/844/DC/1094/875/ALI/DEBITCARD_TJBHB";
		        BankInCrementArr[210] = "DEBITCARD_WHBANK/0/5/4/750/11/0/#/0/0/0/0//#/0/W/WHYH/210/乌海银行//wuhaiyinhang/#/783/CCD/0/814/CCY/0/845/DC/1098/876/ALI/DEBITCARD_WHBANK";
		        BankInCrementArr[211] = "DEBITCARD_WHRCB/0/1/1/780/11/0/#/0/0/0/0//#/0/W/WHNSX/211/武汉农商行//wuhannongshangxing/#/784/CCD/0/815/CCY/0/846/DC/0/877/ALI/DEBITCARD_WHRCB";
		        BankInCrementArr[212] = "DEBITCARD_XLBANK/0/5/4/795/11/0/#/0/0/0/0//#/0/X/XLYH/212/小榄银行//xiaolanyinhang/#/785/CCD/0/816/CCY/0/847/DC/0/878/ALI/DEBITCARD_XLBANK";
		        BankInCrementArr[213] = "DEBITCARD_BOSH/0/5/4/800/11/0/#/0/0/0/0//#/0/X/XHYH/213/新韩银行//xinhanyinhang/#/786/CCD/0/817/CCY/0/848/DC/1125/879/ALI/DEBITCARD_BOSH";
		        BankInCrementArr[214] = "DEBITCARD_DBSCN/0/5/4/820/11/0/#/0/0/0/0//#/0/X/XZYH/214/星展银行//xingzhanyinhang/#/787/CCD/0/818/CCY/0/849/DC/0/880/ALI/DEBITCARD_DBSCN";
		        BankInCrementArr[215] = "DEBITCARD_RXCB/0/5/4/880/11/0/#/0/0/0/0//#/0/Y/YCRXCZYH/215/榆次融信村镇银行//yucirongxincunzhenyinhang/#/788/CCD/0/819/CCY/0/850/DC/0/881/ALI/DEBITCARD_RXCB";
		        BankInCrementArr[216] = "DEBITCARD_CABANK/0/5/4/135/11/0/#/0/0/0/0//#/0/C/CAYH/216/长安银行//changanyinhang/#/789/CCD/0/820/CCY/0/851/DC/0/882/ALI/DEBITCARD_CABANK";
		        BankInCrementArr[217] = "DEBITCARD_RBOZ/0/5/4/970/11/0/#/0/0/0/0//#/0/Z/ZHHRYH/217/珠海华润银行//zhuhaihuarunyinhang/#/790/CCD/0/821/CCY/0/852/DC/0/883/ALI/DEBITCARD_RBOZ";
		        BankInCrementArr[218] = "DEBITCARD_ZYCBANK/0/5/4/985/11/0/#/0/0/0/0//#/0/Z/ZYSSYYH/218/遵义市商业银行//zunyishishangyeyinhang/#/791/CCD/0/822/CCY/0/853/DC/1120/884/ALI/DEBITCARD_ZYCBANK";
		        BankInCrementArr[219] = "56/0/7/4/1005/11/0/#/0/0/0/0//#/0///219/万事达卡///#/885/CCD/56/890/CCY/0/895/DC/0/900/ALI/0";
		        BankInCrementArr[220] = "57/0/7/4/1000/11/0/#/0/0/0/0//#/0///220/威士卡///#/886/CCD/57/891/CCY/0/896/DC/0/901/ALI/0";
		        BankInCrementArr[221] = "58/0/7/4/1010/11/0/#/0/0/0/0//#/0///221/运通卡///#/887/CCD/58/892/CCY/0/897/DC/0/902/ALI/0";
		        BankInCrementArr[222] = "59/0/7/4/1020/11/0/#/0/0/0/0//#/0///222/大莱卡///#/888/CCD/59/893/CCY/0/898/DC/0/903/ALI/0";
		        BankInCrementArr[223] = "60/0/7/4/1015/11/0/#/0/0/0/0//#/0///223/JCB卡///#/889/CCD/60/894/CCY/0/899/DC/0/904/ALI/0";
		        BankInCrementArr[224] = "6/0/8/1/1025/11/0/#/0/0/0/0//#/0/W/WSD/224/万事达卡//wanshida/#/905/CCD/6/910/CCY/0/915/DC/0/920/ALI/0";
		        BankInCrementArr[225] = "7/0/8/1/1030/11/0/#/0/0/0/0//#/0/W/WS/225/威士卡//weishi/#/906/CCD/7/911/CCY/0/916/DC/0/921/ALI/0";
		        BankInCrementArr[226] = "8/0/8/1/1035/11/0/#/0/0/0/0//#/0/Y/YT/226/运通卡//yuntong/#/907/CCD/8/912/CCY/0/917/DC/0/922/ALI/0";
		        BankInCrementArr[227] = "9/0/8/1/1040/11/0/#/0/0/0/0//#/0/D/DL/227/大莱卡//dalai/#/908/CCD/9/913/CCY/0/918/DC/0/923/ALI/0";
		        BankInCrementArr[228] = "10/0/8/1/1045/11/0/#/0/0/0/0//#/0/J/JCB/228/JCB卡//jcb/#/909/CCD/10/914/CCY/0/919/DC/0/924/ALI/0";

		        var bankL = BankInCrementArr.length, //本地增量长度
                    bankTmpObj = null,//临时增量对象
                    crementObj = null; //当前临时增量全字段

		        for (var i = 0; i < bankL; i++) {
		            crementObj = BankInCrementArr[i];
		            if (!crementObj) {
		                continue;
		            }
		            crementObj = crementObj.split("/");
		            bankTmpObj = {
		                "code": crementObj[0],
		                "dataAction": {
		                    "category": Number(crementObj[1]),
		                    "dataVer": Number(crementObj[2]),
		                    "opr": Number(crementObj[3]),
		                    "sort": Number(crementObj[4]),
		                    "type": Number(crementObj[5])
		                },
		                "dataRegion": {
		                    "countryId": Number(crementObj[6]),
		                    "countryName": revertNull(crementObj[7]),
		                    "districtId": Number(crementObj[8]),
		                    "lat": Number(crementObj[9]),
		                    "lon": Number(crementObj[10]),
		                    "rdius": Number(crementObj[11])
		                },
		                "einitial": crementObj[12],
		                "ename": revertNull(crementObj[13]),
		                "id": Number(crementObj[14]),
		                "initial": crementObj[15],
		                "jp": crementObj[16],
		                "key": Number(crementObj[17]),
		                "name": crementObj[18],
		                "parentName": crementObj[19],
		                "py": crementObj[20],
		                "shortName": revertNull(crementObj[21]),
		                "subDatas": [
                          {
                              "itemId": Number(crementObj[22]),
                              "itemName": crementObj[23],
                              "itembCode": crementObj[24]
                          },
                          {
                              "itemId": Number(crementObj[25]),
                              "itemName": crementObj[26],
                              "itembCode": crementObj[27]
                          },
                          {
                              "itemId": Number(crementObj[28]),
                              "itemName": crementObj[29],
                              "itembCode": crementObj[30]
                          },
                          {
                              "itemId": Number(crementObj[31]),
                              "itemName": crementObj[32],
                              "itembCode": crementObj[33]
                          }
		                ]
		            }
		            BankInCrementArr[Number(crementObj[17])] = bankTmpObj
		        }
		        if (flag) {
		            return dataformat({ "baseDatas": BankInCrementArr });
		        }
		    }
		    
		    
		    //console.timeEnd('test');
		    //页面渲染完成后获取最新的银行增量函数
		    var ret = {};

            //初始化银行增量函数
		    ret.intBankCrement = function () {
		        //判断是否已经处理过localStorage或发布了新的版本号
		        if (!bankListStore.get() || (bankListStore.getAttr('DataVersion') != ugSystemVer)) {
		            //设置银行增量localStorage
		            bankListStore.set(revertBankData(1)); //初始化银行增量数据，有返回值，返回格式过的银行增量
		            bankListStore.setAttr('DataVersion', ugSystemVer); //保存版本号
		        }
		    };

            //获取101银行增量服务请求并做相应处理
		    ret.getLastBankCrement = function () {
		        var headstring = JSON.stringify(Business.getRequestHeader()); //公共header头文本
		        function _callback(data) {
		            var dbd = data.baseDatas || [], bdL = dbd.length, bdtmpobj = null; //Edit by sqsun 20141023 数据做容错处理
		            if (bdL > 0) {
		                if (BankInCrementArr.length < 1) {
		                    revertBankData(0);  //已经存在localstorage增量银行数据，有新的数据需重新初始化银行增量数据，无返回值，设置BankInCrementArr初始值
		                }
		                for (var i = 0; i < bdL; i++) {
		                    bdtmpobj = dbd[i];
		                    if (bdtmpobj.dataAction.opr === 2) { //删除已经存在的银行增量
		                        delete BankInCrementArr[bdtmpobj.key];
		                    } else { //新增或修改已经存在的银行增量
		                        BankInCrementArr[bdtmpobj.key] = bdtmpobj
		                    }
		                }
		                //设置银行增量localStorage
		                //清空bankListStore
                        //没必要清空，lh_sun
		                //bankListStore.remove(); 
		                bankListStore.set(dataformat({ "baseDatas": BankInCrementArr })); //重新设置最新增量数据
		                bankListStore.setAttr('DataVersion', ugSystemVer); //保存版本号
		                BankInCrementArr = null;
		            }
		        }

		        //验证是否需要请求新的 101银行卡增量服务
		        if (!bankCrement.get()) {
                    var PayBankModel = PayModel.BankListModel.getInstance(); //101银行卡增量ajax模组
		            PayBankModel.param.dataVer = 8;  //每一个版本都需要修改，该值由后端告知
		            PayBankModel.excute(_callback, function (err) {
		                console.log("获取101银行增量数据失败，bankincrement.js line 337")
		            }, false, this);
		            PayBankModel = null;
		        }
		    }
		    //console.timeEnd('test')
		    return ret;
		});
