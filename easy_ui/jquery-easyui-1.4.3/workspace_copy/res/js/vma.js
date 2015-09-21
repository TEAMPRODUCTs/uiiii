/*! vma.js
//@ candy.jiang
*/
var search_data = [];
//高级查询中不同类型的匹配转换
window.keyAndVal = {
    //日期
    "date" : {
        "介于" : {
            value : "between",
            type : "date"
        },
        "大于等于" : {
            value : ">=",
            type : "single_date"
        },
        "小于等于" : {
            value : "<=",
            type : "single_date"
        }
    },
    "time" : {
        "介于" : {
            value : "between",
            type : "time"
        },
        "大于等于" : {
            value : ">=",
            type : "single_time"
        },
        "小于等于" : {
            value : "<=",
            type : "single_time"
        }
    },
    //数值
    "number" : {
        "等于" : {
            value : "=",
            type : "number"
        },
        "不等于" : {
            value : "<>",
            type : "number"
        },
        "大于等于" : {
            value : ">=",
            type : "number"
        },
        "小于等于" : {
            value : "<=",
            type : "number"
        },
        "介于" : {
            value : "between",
            type : "between"
        }
    },
    "number_muti":{
        "属于" : {
            value : "in",
            type : "number_muti"
        },
        "不属于" : {
            value : "not in",
            type : "number_muti"
        }
    },
    "input" :{
        "属于" : {
            value : "in",
            type : "input"
        },
        "不属于" : {
            value : "not in",
            type : "input"
        }
    },
    //多选下拉框
    "selection_muti" :{
        "属于" : {
            value : "in",
            type : "selectcheckbox"
        },
        "不属于" : {
            value : "not in",
            type : "selectcheckbox"
        }
    },
    //搜索多选下拉框
    "search_muti" :{
        "属于" : {
            value : "in",
            type : "search_muti"
        },
        "不属于" : {
            value : "not in",
            type : "search_muti"
        }
    }
}
var typeKeyVal = {
    "包含" : "包含",
    "不包含" : "不包含",
    "完全匹配" : "完全匹配",
    "不完全匹配" : "不完全匹配",
    "＝" : "等于",
    "≠" : "不等于",
    "＞" : "大于",
    "＜" : "小于",
    "≥" : "大于等于",
    "≤" : "小于等于",
    "between" : "between"
}
/*
 * 显示loadding
 */
function showAllLoadding(){
    $("#pageLoadding").show();
    $(".modal-backdrop").show();
}
/*
 * 隐藏loadding
 */
function hideAllLoadding(){
    $("#pageLoadding").hide();
    $(".modal-backdrop").hide();
}
/*
 * 获取cookie值
 */
function getCookie(key){
    var cook = document.cookie,
        start = cook.indexOf(key + '='),
        end;
    if (start !== -1) {
        start += key.length + 1;
        end = cook.indexOf(';', start);
        return unescape(cook.substring(start, (end === -1 ? cook.length : end)));
    }
}
/*
 * 保存cookie值
 */
function setCookie(key, value){
    document.cookie = key + '=' + escape(value) + ';path=/;';//domain
}
/*
 * 显示提示窗体
 */
function showAlter(mes,headerMes,isconfirm,fn,cancel_fn){
    var alertDiv = $("<div class='alertDiv'></div>");
    var head = $("<div class='alert_header'></div>");
    var closeI = $("<i class='fa fa-times-circle'></i>");
    closeI.on("click",function(){
        hideAlert();
    });
    closeI.appendTo(head);
    var body = "<div class='alert_body'>" + mes + "</div>";

    var bg = "<div class='modal-bg'></div>"
    $("body").append(bg);
    if(isconfirm){
        var foot = $("<div class='alert_foot'></div>");
        var sure = $("<em>确定</em>");
        var cancel = $("<em>取消</em>");
        sure.on("click",function(){
            hideAlert();
            if(fn && typeof fn === 'function'){
                fn();
            }
        });
        cancel.on("click",function(){
            hideAlert();
            if(cancel_fn && typeof cancel_fn === 'function'){
                cancel_fn();
            }

        });
        foot.append(sure).append(cancel);
        alertDiv.append(head).append(body).append(foot).appendTo($("body"));
    }else{
        alertDiv.append(head).append(body).appendTo($("body"));
    }
    function hideAlert(){
        $(".modal-bg").remove();
        var allAlertDiv = $(".alertDiv");
        allAlertDiv.remove();
    }
}
/**
 * 创建背景层
 */
function showLoadding(){
    $("body").append("<div class='bgloadding-bg'></div>");
    $("body").append("<div class='bgloadding'></div>");;
}

define(["jquery"],function($){
    window.chartColor = ["#50B432","#058DC7","#FB9749"];
    var vma = {
        //对比日期显示
        showCompareDate : function(id,compDate){
            //判断对比checkbox是否被选中
            var $comObj = $("#" + id), $compDateObj = $("#" + compDate);
            var isChecked = $comObj.prop("checked");
            if(isChecked == "checked" || isChecked == true){
                $compDateObj.show();
            }else{
                $compDateObj.hide();
                //如果隐藏重新加载页面数据
                queryVisitSql();
            }
        },
        tab_search : function(inputId,tableId,fields,grid_data){
//            fields.push("log_date");   //默认日期为查询项
            var $e_search = $("#" + inputId);
            var $tableId = $("#" + tableId);
            var search_value = $e_search.val();
            var rows = grid_data,rst=[];
            for(var i=0;i<rows.length;i++){
                var isHave = false;
                for(var j = 0; j < fields.length;j++){
                    //有些次级维度和主维度需要转换
                    //存储map关系 主维度var codeNameMap=[];
                    //存储map关系 次级维度 var codeNameMap2=[];
                    var val = rows[i][fields[j]];
                    var changeVal = codeNameMap[val];
                    var changeTwoVal = codeNameMap2[val];
                    if((changeVal && changeVal.indexOf(search_value)>-1 )||(changeTwoVal && changeTwoVal.indexOf(search_value)>-1)){
                        isHave = true;
                        break;
                    }
                    if(!(changeVal||changeTwoVal)&&(rows[i][fields[j]] && rows[i][fields[j]].indexOf(search_value) > -1)){
                        isHave = true;
                        break;
                    }
                }
                if(isHave){
                    rst.push(rows[i]);
                    isHave = false;
                }
            }
            var total_num = rst.length;
            var page_data = rst?rst:[];
            if( total_num>= 20){
                var e_index = total_num;
                var s_index = e_index - 20;
                page_data = rst.slice(s_index,e_index);
//        page_data = datagrid_data.slice(0,20);
            }
            search_data = rst;
            $tableId.datagrid('loadData',page_data);
            var p = $tableId.datagrid('getPager');
            $(p).pagination({
                total: total_num,
                pageSize: 20,//每页显示的记录条数，默认为10
                pageList: [20,40,60],//可以设置每页记录条数的列表
                beforePageText: '第',//页数文本框前显示的汉字
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录' ,
                onSelectPage:function(pageNumber, pageSize){
                    var all_len = rst.length;
                    var startNum =  all_len - (pageNumber * pageSize);
                    var endNum = startNum +  pageSize;
                    if(startNum<0){
                        startNum = 0;
                    }
                    var page = rst.slice(startNum,endNum);
                    $tableId.datagrid('loadData',page); //将数据绑定到datagrid
                    $(p).pagination({
                        total: total_num,
                        pageNumber : pageNumber
                    });
                    if(show_per_btn=='eye_open'){
                        eye_open();
                    }else if(show_per_btn=='eye_close'){
                        eye_close();
                    }else if(show_per_btn=='per_open'){
                        per_open();
                    }
                }
            });

            if(show_per_btn=='eye_open'){
                eye_open();
            }else if(show_per_btn=='eye_close'){
                eye_close();
            }else if(show_per_btn=='per_open'){
                per_open();
            }

            hideAllLoadding();
//            var $seg_list_all_tr = $tableId.find("tr");
//            var $seg_list_tr = $tableId.find(".datagrid-view1").find("tr");

//            if(search_value == ""){
//                $seg_list_all_tr.show();
//                $seg_list_all_tr.find("td[hidden=hidden]").hide();
//            }else{
//                $seg_list_tr.each(function(){
//                    if($(this).text().indexOf(search_value) == -1){
//                        $tableId.find("tr[datagrid-row-index=" + $(this).attr("datagrid-row-index") + "]").hide();
//                    }else{
//                        var showTr = $tableId.find("tr[datagrid-row-index=" + $(this).attr("datagrid-row-index") + "]");
//                        showTr.show();
//                        showTr.find("td[hidden=hidden]").show();
//                    }
//                });
//            }

        },
        drawCricle:function(b,n,c){
            //初始化Raphael画布
            // this.paper = Raphael(b, 70, 70);
            //把底图先画上去
            // this.paper.image("progressBg.jpg", 0, 0, 80, 80);
            //进度比例，0到1，在本例中我们画65%
            //需要注意，下面的算法不支持画100%，要按99.99%来画
            var percent = n	,
                drawPercent = percent >= 1 ? 0.9999 : percent;

            //开始计算各点的位置，见后图
            //r1是内圆半径，r2是外圆半径
            var r1 = 23, r2 = 35, PI = Math.PI,
                p1 = {
                    x:55,
                    y:75
                },
                p4 = {
                    x:p1.x,
                    y:p1.y - r2 + r1
                },
                p2 = {
                    x:p1.x + r2 * Math.sin(2 * PI * (1 - drawPercent)),
                    y:p1.y - r2 + r2 * Math.cos(2 * PI * (1 - drawPercent))
                },
                p3 = {
                    x:p4.x + r1 * Math.sin(2 * PI * (1 - drawPercent)),
                    y:p4.y - r1 + r1 * Math.cos(2 * PI * (1 - drawPercent))
                },
                path = [
                    'M', p1.x, ' ', p1.y,
                    'A', r2, ' ', r2, ' 0 ', percent > 0.5 ? 1 : 0, ' 1 ', p2.x, ' ', p2.y,
                    'L', p3.x, ' ', p3.y,
                    'A', r1, ' ', r1, ' 0 ', percent > 0.5 ? 1 : 0, ' 0 ', p4.x, ' ', p4.y,
                    'Z'
                ].join('');

            //用path方法画图形，由两段圆弧和两条直线组成，画弧线的算法见后
            // this.paper.path(path)
            //填充渐变色，从#3f0b3f到#ff66ff
            //  .attr({"stroke-width":0.5, "stroke":"#d2d4d8", "fill":"90-" + c});
            //显示进度文字
            // $(t).text(Math.round(percent * 100) + "%");
            $("#"+b).attr("d",path).attr("fill",c).attr("stroke-width",0.5).attr("stroke","#d2d4d8");
        },
        getHeight : function(){
            if (window.innerHeight!=window.undefined) return window.innerHeight;
            if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
            if (document.body) return document.body.clientHeight;
            return window.undefined;
        },
        /**
        ** 整合全局变量
        **/
        getPublic : function(vm){
            if(!vm.user&&vm.user!=""){
                vma.getUser(vm);
            }

        },
        /*
        获得用户信息
         */
        getUser : function(vm){
            var userAjax = $.ajax({
                type: "POST",
                url: "/frontend/getUserInfo",
                success: function(result){
                    vm.user = result.data;
                }
            });
        },
        getProgressBar : function(date){
            var hour = (new Date(date)).getHours();
            var minutes = new Date(date).getMinutes();
            var lv = (((100/24) * hour) + (minutes/60));
            var $prsb = $('<div class="prsb"></div>');
            $prsb.append('<div class="prsb_bg"></div>');
            var $prsb_prs = $('<div class="prsb_prs"></div>');

            if(lv < 1.5){
                lv = 1.5;
            }else if(hour >= 4 && hour <= 6){
                lv = lv - 3;
            }else if(hour >= 7 && hour <= 21){
                lv = lv - 5.5;
            }
            $prsb_prs.attr("style","width:" + lv.toFixed(2) + "%;");
            $prsb.append($prsb_prs);
            $prsb.append('<div class="prsb_scale"><span>0</span><span>3</span><span>6</span><span>9</span><span>12</span><span>15</span><span>18</span><span>21</span><span>24</span></div>');
            return $prsb;
        }
    }
    return vma;
})
