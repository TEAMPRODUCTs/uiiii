/*--数组扩展方法--*/
/*
 *去除数组中的重复项
 */
Array.prototype.unique = function()
{
    var a = []; var l = this.length;
    for (var i = 0; i < l; i++)
    {
        for (var j = i + 1; j < l; j++)
        {
            if (this[i] === this[j]) j = ++i;
        }
        a.push(this[i]);
    }
    return a;
};
// Usage : var uniqueA = [1,2,3,3,5,5,3,7]; var uniqueResult = uniqueA.unique(); // uniqueResult = [1, 2, 5, 3, 7];

/*
 *获取数组的交集需要有unique方法支持
 */
Array.prototype.intersect = function()
{
    if (!arguments.length) return [];
    var a1 = this; var a = a2 = null;
    var n = 0;
    while (n < arguments.length)
    {
        a = []; a2 = arguments[n]; var l = a1.length; var l2 = a2.length;
        for (var i = 0; i < l; i++)
        {
            for (var j = 0; j < l2; j++)
            {
                if (a1[i] === a2[j]) a.push(a1[i]);
            }
        }
        a1 = a; n++;
    }
    return a.unique();
};
// Usage : var intersectA = [1,2,3]; var intersectB = [2,3,4]; var intersectC = [3,4,5]; var intersectResult = intersectA.intersect(intersectB,intersectC); // intersectResult = [3];

/*
 *判断是否为数组
 */
function isArray(a){
    return a.constructor === Array ? true : false;
}
// Usage : var isArrayA = [3]; var isArrayB = 3; var isArrayResultA = isArray(isArrayA); //true var isArrayResultB = isArray(isArrayB); //false

/*
 *获取数组中不相同的元素
 */
Array.prototype.diff = function(){
    var a1 = this;
    var a = a2 = null;
    var n = 0;
    while (n < arguments.length)
    {
        a = []; a2 = arguments[n];
        var l = a1.length;
        var l2 = a2.length;
        var diff = true;
        for (var i = 0; i < l; i++)
        {
            for (var j = 0; j < l2; j++)
            {
                if (a1[i] === a2[j])
                {
                    diff = false; break;
                }
            }
            diff ? a.push(a1[i]) : diff = true;
        }
        a1 = a; n++;
    }
    return a.unique();
};
// Usage : var diffA = [1,2,3]; var diffB = [2,3,4]; var diffResult = diffA.diff(diffB); // diff = [1];
/**
 * 数组中对象 为 Object时  析取 其中一项属性 组成新的数组
 */
Array.prototype.disjunction=function(key){
    var arr=this
    var newArr=[]
    for(var i=0;i<arr.length;i++){
        newArr.push(arr[i][key])
    }
    return newArr
}
// Usage : [{name:1},{name:2}].disjunction('name')    =>>   [1,2]
/**
 * array 中 循环 处理
 * @param func
 */
Array.prototype.eachDo=function(func){
    var newArr=[]
    newArr.length=this.length;
    for(var i=0;i<this.length;i++){
        newArr[i]=func(this[i])
    }
    return newArr;
}

Number.prototype.add = function (arg){
    var arg1=this,arg2=arg;
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}


Number.prototype.format=function(unit){
    if(unit==undefined)unit=true
    var num=this
    if(num>1000000){
        return Math.floor(num/10000)/100+(unit?"M":"")
    }
    if(num>1000){
        return Math.floor(num/10)/100+(unit?"K":"")
    }
    return Math.floor(num);
}
Number.prototype.formatPercent=function(){
    var num=this;
    num=Math.floor(num*10000)
    num/=100
    if(isNaN(num))return ''
    num+=" %"
    return num;
}

Date.prototype.format = function(format)
{
    /*
     * format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        "S" : this.getMilliseconds()
    }

    if (/(y+)/.test(format))
    {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
            - RegExp.$1.length));
    }

    for (var k in o)
    {
        if (new RegExp("(" + k + ")").test(format))
        {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
//换算成耗时
Date.prototype.convert2cost=function(){
    var t=Math.floor(this.getTime()/1000);
    var d=Math.floor(t/(24*60*60));
    var h= Math.floor(t%(24*60*60)/(60*60));
    var mi=Math.floor(t%(60*60)/60);
    var s=Math.floor(t%(60));
    return (d>0?d+"天":"")+(h>0?h+"小时":"")+(mi>0?mi+"分钟":"")+(s>0?s+"秒":"");
}

;(function($){
    Array.prototype.contains = function (element) { //利用Array的原型prototype点出一个我想要封装的方法名contains
        for (var i = 0; i < this.length; i++) {
            if (this[i] == element) { //如果数组中某个元素和你想要测试的元素对象element相等，则证明数组中包含这个元素，返回true
                return true;
            }
        }
    }
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    var base = {
        /*
         @getMousePoint 获取鼠标坐标位置
         @param ev mouse event
         @returnType object, {'x':posX, 'y':posY}
         */
        getMousePoint : function(ev) {
            ev = ev || window.event;
            if(ev.pageX || ev.pageY) {
                return {x:ev.pageX, y:ev.pageY};
            }
            return {
                x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y:ev.clientY + document.body.scrollTop  - document.body.clientTop
            };
            /*var x = y = 0,
             doc = document.documentElement,
             body = document.body;
             if(!ev) ev = appAnalysis.getEvent();
             if (window.pageYoffset) {//pageYoffset是Netscape特有
             x = window.pageXOffset;
             y = window.pageYOffset;
             }else{
             x = (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
             y = (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
             }
             x += ev.clientX;
             y += ev.clientY;
             return {'x' : x, 'y' : y};*/
        },
        //阻止冒泡
        stopPropagation : function(e) {
            e = e || window.event;
            if(e.stopPropagation) { //W3C阻止冒泡方法
                e.stopPropagation();
            } else {
                e.cancelBubble = true; //IE阻止冒泡方法
            }
        },
        //字符串转换
        JSONstringify : function(Json){
            if(jQuery.browser.msie){
                if(jQuery.browser.version=="7.0"||$.browser.version=="6.0"){
                    var  result=jQuery.parseJSON(Json);
                }else{
                    var result=JSON.stringify(Json);
                }
            }else{
                var result=JSON.stringify(Json);
            }
            return result;
        },
        getDate : function(startDate,day){
            var zdate = new Date(startDate);
            zdate.setDate(zdate.getDate() + day);
            var month = (zdate.getMonth()+1) < 10?"0" + (zdate.getMonth()+1):(zdate.getMonth()+1);
            var day = zdate.getDate() < 10?"0"+zdate.getDate():zdate.getDate();
            return zdate.getFullYear() + "-" + month + "-" + day;
        },
        addEvent:function(k,v){
            var me = this;
            if (me.addEventListener){
                me.addEventListener(k, v, false);
            }else if(me.attachEvent){
                me.attachEvent("on" + k, v);
            }else{
                me["on" + k] = v;
            }
        },
        removeEvent:function(k,v){
            var me = this;
            if (me.removeEventListener){
                me.removeEventListener(k, v, false);
            }else if (me.detachEvent){
                me.detachEvent("on" + k, v);
            }else{
                me["on" + k] = null;
            }
        },
        Qfw:function(num){
            if(isNaN(num)){
                return 0;
            }
            num  =  num + "";
            if(num.indexOf(',')>0)
            {
                num = num.replace(/,/gi,'') + "";
            }
            var  re = /(-?\d+)(\d{3})/
            while(re.test(num)){
                num = num.replace(re,"$1,$2")
            }
            return  num;
        },
        //去掉千分位
        unQfw : function(num){
            var x = num.toString().split(',');
            return parseFloat(x.join(""));
        },
        numberSort :function(a,b){
            var number1 = parseFloat(base.unQfw(a));
            var number2 = parseFloat(base.unQfw(b));
            return (number1 > number2 ? 1 : -1);
        },
        multSelect : function(){
            var $dropdown = $(".btn-select_dropdown"),
                $showName = $("#btn_select_show_name"),
                $btnSelect = $(".btn-select");
            $dropdown.on("click",base.stopPropagation);
            $btnSelect.on("click",function(){
                if($dropdown.is(":visible")){
                    $dropdown.hide();
                }else{
                    setTimeout(function(){base.addEvent.call(document,'click',hide);});
                    $dropdown.show();
                }
            });
            function hide(){
                $dropdown.hide();
                base.removeEvent.call(document,'click',hide);
            }
            $dropdown.delegate("li","click",function(){
                if($(this).find("input[type=checkbox]:eq(0)").attr("checked")=="checked"){
                    $(this).find("input[type=checkbox]:eq(0)").removeAttr("checked");
                }else{
                    $(this).find("input[type=checkbox]:eq(0)").attr("checked","checked");
                }
                var parent = $(this).parent();

                if(parent.find("input[type=checkbox]:checked").length > 1){
                    $showName.text("(多个值)");
                }else if(parent.find("input[type=checkbox]:checked").length == 1){
                    $showName.text(parent.find("input[type=checkbox]:checked").parent().text());
                }else{
                    $showName.text("无");
                }
                $dropdown.show();
            });
            $dropdown.delegate("input[type=checkbox]","click",function(){
                if($(this).attr("checked")=="checked"){
                    $(this).removeAttr("checked");
                }else{
                    $(this).attr("checked","checked");
                }
                var parent = $(this).parent();
                if(parent.find("input[type=checkbox]:checked").length > 1){
                    $showName.text("(多个值)");
                }else if(parent.find("input[type=checkbox]:checked").length == 1){
                    $showName.text(parent.find("input[type=checkbox]:checked").parent().text());
                }else{
                    $showName.text("无");
                }
            });

        },

        multSelectForVisit : function(){
            var $dropdown = $(".btn-select_dropdown"),
                $showName = $("#btn_select_show_name"),
                $btnSelect = $(".btn-select");
            $dropdown.on("click",base.stopPropagation);
            $btnSelect.on("click",function(){
                if($dropdown.is(":visible")){
                    $dropdown.hide();
                }else{
                    setTimeout(function(){base.addEvent.call(document,'click',hide);});
                    $dropdown.show();
                }
            });
            function hide(){
                $dropdown.hide();
                base.removeEvent.call(document,'click',hide);
            }
            $dropdown.delegate("li","click",function(){
                if($(this)[0].id=='selectAll'){
                    if($(this).find("input[type=checkbox]:checked") && $(this).find("input[type=checkbox]:checked").length != 0){
                        $('#drill_type_child_ul input[type=checkbox]').removeAttr("checked");
                    }else{
                        $('#drill_type_child_ul input[type=checkbox]').attr("checked","checked");
                    }
                }else{
                    if($(this).find("input[type=checkbox]:eq(0)").attr("checked")=="checked"){
                        $(this).find("input[type=checkbox]:eq(0)").removeAttr("checked");
                    }else{
                        $(this).find("input[type=checkbox]:eq(0)").attr("checked","checked");
                    }
                }
                var parent = $(this).parent();

                if(parent.find("input[type=checkbox]:checked").length > 1){
                    $showName.text("(多个值)");
                }else if(parent.find("input[type=checkbox]:checked").length == 1){
                    $showName.text(parent.find("input[type=checkbox]:checked").parent().text());
                }else{
                    $showName.text("无");
                }
                $dropdown.show();
            });
            $dropdown.delegate("input[type=checkbox]","click",function(){
                console.log("111",111)
                if($(this).attr("checked")=="checked"){
                    $(this).removeAttr("checked");
                }else{
                    $(this).attr("checked","checked");
                }
                var parent = $(this).parent();
                if(parent.find("input[type=checkbox]:checked").length > 1){
                    $showName.text("(多个值)");
                }else if(parent.find("input[type=checkbox]:checked").length == 1){
                    $showName.text(parent.find("input[type=checkbox]:checked").parent().text());
                }else{
                    $showName.text("无");
                }
            });

        },
        //多选下拉框
        multSelectMult : function(valueType){
            var $dropdown = $(".btn-select_dropdown"),
                $btnSelect = $(".btn-select");
            var $showName = "",$dropdown_now = "",$showId="";
            $dropdown.on("click",base.stopPropagation);
            $btnSelect.on("click",function(){
                $dropdown_now = $("#" + $(this).attr("id") + "_ul");
                //判断显示的下拉框是否可见
                if($dropdown_now.is(":visible")){
                    hide();
                }else{
                    hide();
                    setTimeout(function(){base.addEvent.call(document,'click',hide);});
                    $dropdown_now.show();
                    $showName = $("#" + $(this).attr("id") + "_show_name");
                    $showId = $("#" + $(this).attr("id") + "_show_id");
                }

            });
            function hide(){
                $dropdown.hide();
                base.removeEvent.call(document,'click',hide);
            }

            $dropdown.delegate("li:not(.dropdown_search_li):visible","click",function(){
                var $this = $(this);
                var parent = $this.parent();

                if($this.text() == "(全部)"){
                    if($this.find("input[type=checkbox]:eq(0)").attr("checked")=="checked"){
                        $this.parent().find("input[type=checkbox]").removeAttr("checked");
                        $showName.text("无");
                    }else{
                        $this.parent().find("input[type=checkbox]").attr("checked","checked");
                        $showName.text("(全部)");
                    }
                    var checkedVal = parent.find("input[type=checkbox]:checked:visible");
                    var idArr = "";
                    for(var i = 1,len = checkedVal.length;i<len;i++){
                        idArr += checkedVal.eq(i).val() + ",";
                        if((i+1) == len){
                            idArr = idArr.substring(0,idArr.length-1);
                        }
                    }
                    $showId.val(idArr);
                }else{
                    if($this.find("input[type=checkbox]:eq(0)").attr("checked")=="checked"){
                        $this.find("input[type=checkbox]:eq(0)").removeAttr("checked");
                    }else{
                        $this.find("input[type=checkbox]:eq(0)").attr("checked","checked");
                    }

                    var checkedVal = parent.find("input[type=checkbox]:gt(0):visible:checked");
                    var checkboxLen = parent.find("input[type=checkbox]:gt(0):visible").length;
                    var checkedLength = checkedVal.length;
                    if(checkedLength > 1){
                        //判断是否选择全部
                        if(checkedLength == checkboxLen){
                            $showName.text("(全部)");
                            parent.find("input[type=checkbox]:eq(0):visible").attr("checked","checked");
                        }else{
                            $showName.text("(多个值)");
                            parent.find("input[type=checkbox]:eq(0):visible").removeAttr("checked");
                        }
                        var idArr = "";
                        for(var i = 0,len = checkedVal.length;i<len;i++){
                            idArr += checkedVal.eq(i).val() + ",";
                            if((i+1) == len){
                                idArr = idArr.substring(0,idArr.length-1);
                            }
                        }
                        $showId.val(idArr);
                    }else if(checkedVal.length == 1){
                        $showName.text(checkedVal.parent().text());
                        $showId.val(checkedVal.eq(0).val());
                    }else{
                        $showName.text("无");
                        $showId.val('');
                    }
                }
                $dropdown_now.show();
            });
            $dropdown.delegate("input[type=checkbox]","click",function(){
                if($(this).attr("checked")=="checked"){
                    $(this).removeAttr("checked");
                }else{
                    $(this).attr("checked","checked");
                }
                var parent = $(this).parent();
                if(parent.find("input[type=checkbox]:checked").length > 1){
                    $showName.text("(多个值)");
                }else if(parent.find("input[type=checkbox]:checked").length == 1){
                    $showName.text(parent.find("input[type=checkbox]:checked").parent().text());
                }else{
                    $showName.text("无");
                }
            });
            //判断添加搜索功能

            var $searchLi = $('<li class="search_li" style="display: list-item;"><i class="icon-search" style="left:0px;"></i></li>');
            var $input = $('<input class="searchBtn" type="text" style="border-radius: 4px;"/>');
            $input.on("keyup",function(){
                var val = $(this).val();
                var liList = $dropdown.find("li:not(.dropdown_search_li):gt(0)");
                liList.hide();
                if(val == ''){
                    liList.show();
                }else{
                    for(var i = 0,len = liList.length;i<len;i++){
                        var $liList_i = $(liList[i]);
                        if($liList_i.text().indexOf(val)>-1){
                            $liList_i.show();
                        }
                    }
                }
                //隐藏的checkbox去掉选中
                var checkedVal = liList.find("input[type=checkbox]:checked:visible");
                var idArr = "";
                for(var i = 0,len = checkedVal.length;i<len;i++){
                    idArr += "'" + checkedVal.eq(i).val() + "',";
                    if((i+1) == len){
                        idArr = idArr.substring(0,idArr.length-1);
                    }
                }
                $showId.val(idArr);
            });
            $searchLi.prepend($input);
            $dropdown.prepend($searchLi);

        },
        /**
         * 获得查询条件，条件可以为多级，无子集条件展示为checkbox，有子集条件展示为可以点击形式
         * @method getSearchList
         * @param {string} id 显示查询条件的元素id
         * @param {string} name 定义创建的子集数据的name
         * @param {string} parent 父集合的value
         * @param {array} data 条件的数据集合
         * @param {number} layerNum 当前条件的层级数
         * @param {Object} conObj 显示查询的条件集合
         */
        getSearchList2 : function(id,name,parent,data,layerNum,conObj){
            var downIcon = "",
                hasRadio = true,
                searchBtnName = "searchBtn",
                isSearch = true,
                isPackUp = true,
                lastClass = "";
            if(conObj){
                downIcon = conObj["downIcon"]; //显示父菜单icon样式
                hasRadio = conObj["hasRadio"]||conObj["hasRadio"]==undefined?true:false; //父菜单是否显示radio，默认显示
                lastClass = conObj["lastClass"]; //最后一个子集的样式
                searchBtnName = conObj["searchBtn"]==undefined?searchBtnName:conObj["searchBtn"]; //条件查询name
                isSearch = conObj["isSearch"]||conObj["isSearch"]==undefined?true:false; //是否显示搜索框
                isPackUp = conObj["isPackUp"]||conObj["isPackUp"]==undefined?true:false; //是否显示收起按钮，true显示，false不显示
            }

            var sObj = $("#"+id),
                isLast = true;
            if(!layerNum){
                //第一级显示时清空数据
                sObj.html("");
                layerNum = 0;
            }
            //获取需要展示的子集数据
            //if(!data){
            //data = base.data(parent);
            // }else{
            //data = base.getData(data,parent);
            // }

            var divLen = sObj.find("div").length;
            //点选非最小级别子集时，删除不需显示的子集
            if(layerNum <= divLen){
                sObj.find("div:gt("+(layerNum-1)+")").remove();
            }
            layerNum++;
            var conFirst = $("<div class='con_" + layerNum + "'></div>");
            for(var i = 0,len=data.length;i<len;i++){
                var	conCheckbox = $("<input type='checkbox' checked='checked'/>"),
                    conRadio = $("<input type='radio'/>"),
                    conEm = $("<em class='"+downIcon+"'></em>"),
                    conVal = $("<span></span>"),
                    conLabel = $("<label></label>");
                //有子集展示
                if(data[i].children&&data[i].children.length>0){
                    isLast = false;
                    conLabel.attr("value",data[i].value);
                    if(hasRadio){
                        conRadio.attr("name",name+"_"+layerNum);
                        conRadio.attr("value",data[i].value);
                        conLabel.append(conRadio);
                    }
                    conVal.text(data[i].name);
                    conLabel.attr("title",data[i].name);
                    conLabel.append(conVal);
                    conLabel.append(conEm);
                    var child_data = data,_layerNum = layerNum,_conObj = conObj;
                    conLabel.on("click",function(){
                        var _this = $(this);
                        base.getSearchList(id,name+"_"+_this.attr("value"),_this.attr("value"),child_data,_layerNum,_conObj);
                        //选中查看子集时改变样式
                        _this.parent().find("label").removeClass();
                        _this.addClass("ser_label_sel");
                    });
                }else{
                    conCheckbox.attr("id",data[i].value);
                    conCheckbox.attr("name",name);
                    conCheckbox.attr("value",data[i].value);
                    conLabel.append(conCheckbox);
                    conVal.text(data[i].name);
                    conLabel.attr("title",data[i].name);
                    conLabel.append(conVal);
                }
                conFirst.append(conLabel);
            }
            //添加全选按钮
            if(isLast){
                var allCheckbox = $("<label><input type='checkbox' checked='checked'/><span>全选</span></label>");
                allCheckbox.find("input[type=checkbox]").bind("click",function(){
                    base.selectAll($(this));
                });
                conFirst.prepend(allCheckbox);
                conFirst.addClass(lastClass);
                var _width = $("#searchList").width();
                if(_width > 0){
                    $("#searchList").find("div").each(function(){
                        _width = _width - $(this).width();
                    });
                    _width = _width - 5;
                    conFirst.attr("style","width:"+_width+"px");
                }

                //绑定反选操作
                conFirst.find("input[type=checkbox]:gt(0)").bind("click",function(){
                    base.isSelectAll(conFirst);
                });
                if(isSearch){
                    //添加搜索按钮
                    var searchBtn = '<label class="searchBtn_lab"><input class="searchBtn" id="'+searchBtnName+'" type="text"><i class="icon-search"></i></label>';
                    conFirst.prepend(searchBtn);
                    $("body").delegate("#"+searchBtnName,'keyup',function(){
                        var key = $(this).val();
                        base.querySearchData(key,conFirst);
                    });
                }
            }
            sObj.append(conFirst);
            //sObj.find("div:eq("+(layerNum-1)+")").append("<b class='icon-chevron-up'></b>");
            //动态显示
            //sObj.parent().slideDown();
            //conFirst.slideDown();
            //绑定取消按钮事件
            if(isPackUp){
                $("#search_cancel").unbind("click");

                $("#search_cancel").on("click",function(){
                    base.closeList($("#"+id).parent());
                });
                $("#search_cancel").parent().show();
            }else{
                $("#search_cancel").parent().hide();
            }
            //}
        },

        //获得对应父集的子集
        getData : function(dataArr,p){
            if(p){
                for(var i = 0,len=dataArr.length;i<len;i++){
                    if(dataArr[i].value == p){
                        return dataArr[i].children;
                    }
                }
                return [];
            }
            return dataArr;
        },
        data : function(p){
            return Search.getData(Search.dataArr,p);
        },
        slideDownUp : function(e,fn){
            if(e.is(':visible')){
                e.slideUp("normal",fn);
            }else{
                e.slideDown("normal",fn);
            }
        },
        //全选操作
        selectAll : function(obj,parameter){
            var _thisCheckbox = obj,
                _this_parent = _thisCheckbox.parent().parent().find("input[type=checkbox]:visible");
            if(_thisCheckbox.attr("checked")=="checked"){
                _this_parent.attr("checked","checked");
            }else{
                _this_parent.removeAttr("checked");
            }
            if(parameter){
                //判断是否显示为已选条件
                var show_sel = parameter["show_sel"]?parameter["show_sel"]: "1";
                //显示已选结果
                if(show_sel == "0"){
                    var $lastDiv = $("#searchList .lastClass");
                    var $selDiv = $lastDiv.find(".last_sel");
                    if(!$selDiv || $selDiv.length == 0){
                        $selDiv = $("<p class='last_sel' style='display: none;'>已选条件：</p>");
                        $lastDiv.prepend($selDiv);
                        $selDiv.slideDown();
                    }
                    var selData = $selDiv.text().substring(5).split(";");
                    var selText = $selDiv.html();
                    if(_thisCheckbox.attr("checked")=="checked"){
                        for(var i = 1,len = _this_parent.length;i<len;i++){
                            var isChecked = false;
                            //通过id判断是否已经绑定该值
                            for(var j = 0,j_len = selData.length;j<j_len;j++){
                                if(_this_parent[i].value == selData[j]){
                                    isChecked = true;
                                    break;
                                }
                            }
                            selText += _this_parent[i].value + ";";

                            if(isChecked){
                                selText = selText.replace(_this_parent[i].value + ";","");
                            }

                        }

                        $selDiv.html(selText).attr("title",selText.substring(5));
                        $selDiv.slideDown();
                    }else{
                        for(var i = 1,len = _this_parent.length;i<len;i++){
                            selText = selText.replace(_this_parent[i].value + ";","");
                        }
                        $selDiv.html(selText).attr("title",selText.substring(5));

                        if($selDiv.html().length <= 5){
                            $selDiv.slideUp();
                        }
                    }
                }
            }
        },
        //判断是否为全选
        isSelectAll : function(conFirst,parameter){
            if(parameter){
                var show_sel = parameter["show_sel"]?parameter["show_sel"]: "1",
                    $obj = $(parameter["obj"]);
                //显示已选结果
                if(show_sel == "0"){
                    var $lastDiv = $("#searchList .lastClass");
                    var $selDiv = $lastDiv.find(".last_sel");
                    if(!$selDiv || $selDiv.length == 0){
                        $selDiv = $("<p class='last_sel' style='display: none;'>已选条件：</p>");
                        $lastDiv.prepend($selDiv);
                        $selDiv.slideDown();
                    }
                    var selText = $selDiv.html();
                    if($obj.attr("checked") || $obj.attr("checked") == "checked"){
                        var title = selText + $obj.val() + ";";
                        $selDiv.html(selText + $obj.val() + ";").attr("title",title.substring(5));
                        $selDiv.slideDown();
                    }else{
                        var text = selText.replace($obj.val() + ";","")
                        $selDiv.html(text).attr("title",text.substring(5));
                        if($selDiv.html().length <= 5){
                            $selDiv.slideUp();
                        }
                    }

                }
            }

            var checkList = conFirst.find("input[type=checkbox]:visible:gt(0)"),
                len = checkList.length;
            if(len > 0){
                for(var i = 0;i < len;i++){
                    if($(checkList[i]).attr("checked")!="checked"){
                        conFirst.find("input[type=checkbox]:eq(0)").removeAttr("checked");
                        return null;
                    }
                }
                conFirst.find("input[type=checkbox]:eq(0)").attr("checked","checked");
            }
        },
        //关闭明细查询层
        closeList : function(obj){
            obj.slideUp();
        },
        //筛选查询数据
        querySearchData : function(key,data,parameter){
            var isRemoveChceked = "1";
            if(parameter){
                isRemoveChceked = parameter["isRemoveChceked"]?parameter["isRemoveChceked"] : isRemoveChceked;
            }
            var queryData = data.find("label:gt(1)");
            for(var i=0,len=queryData.length;i<len;i++){
                var _d = $(queryData[i]),
                    _d_span = _d.find("span").text();
                if(_d_span.indexOf(key) > -1){
                    _d.show();
                }else{
                    if(isRemoveChceked == "0"){
                        _d.find("input[type=checkbox]").removeAttr("checked");
                    }
                    _d.hide();
                }
            }
            data.find("input[type=checkbox]:eq(0)").removeAttr("checked");
            base.isSelectAll(data);
        },
        //显示已选条件
        getCondition : function(){
            var div_select = $("#searchList").find("div"),
                div_select_len =  div_select.length - 1,
                condition = "",
                condition_sel = $("#searchList").find("div:last-child").find("label:visible").find("input[type=checkbox]:checked"),
                $last_sel = $(".last_sel"),
                $con_sel = $(".con_select");
            if($last_sel&&$last_sel.length > 0){
                var _html = $last_sel.html();
                if(_html==""){
                    $con_sel.html("");
                }else{
                    var title = _html.substring(5);
                    if(title == ''){
                        $con_sel.html("");
                    }else{
                        $con_sel.html("查询条件：" + title).attr("title",title);
                    }

                }
            }else{
                for(var d = 0;d < div_select_len;d++){
                    var sel = $(div_select[d]).find(".ser_label_sel"),
                        sel_len = sel.length;
                    for(var i = 0;i < sel_len;i++){
                        condition += sel[i].innerText + " ";
                    }
                    condition +=  " > ";
                }

                if(div_select_len > 0 || condition_sel.length > 0){
                    if("全选" == $(condition_sel[0]).next("span").text() || condition_sel.length == 0){
                        condition = condition.substring(0,condition.lastIndexOf(">"));
                    }else{
                        for(var i = 0,len = condition_sel.length;i < len;i++){
                            condition +=  $(condition_sel[i]).next("span").text() + "　";
                        }
                    }
                    if(condition.length == 0){
                        $con_sel.html("");
                    }else{
                        $con_sel.html("查询条件：").append(condition).attr("title",condition);
                    }
                }else{
                    $con_sel.html("");
                }
            }

        },
        /**
         *   数值转换
         * @value 需要判断的值
         * @num 保留的位数
         */
        getFixed :function(value,num){
            if(typeof value == 'undefined'){
                if(num>0){
                    var str_num = "." ;
                    for(var i=0;i<num;i++){
                        str_num+="0";
                    }
                    return "0" + str_num;
                }
                return "0";
            }else{
                var v = Number(value);
                if(isNaN(v)){
                    return value;
                }else{
                    return base.Qfw(v.toFixed(num));
                }
            }
        } ,
        /**
         * 将字符串格式化成 HTML 代码输出
         *
         * @param string
         *            要格式化的字符串
         * @return 格式化后的字符串
         */
        toHtml : function(string)
        {
            if (string == null)
            {
                return "";
            }
            string = string.replace(/&/g, "&amp;");
            string = string.replace(/\"/g, "&quot;");
            string = string.replace(/</g, "&lt;");
            string = string.replace(/>/g, "&gt;");
            // string = string.replace("\r\n", "\n");
            string = string.replace(/\n/g, "<br>\n");
            string = string.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
            string = string.replace(/ /g, "&nbsp;");
            return string;
        },
        /**
         * 描述：html 标记反转显示
         * @param string   例如： &#123;#enter#  id:&quot;123&quot;,#enter#  name:&quot;张三&quot;#enter#&#125;
         * @return
         */
        toReversalHtml : function(string)
        {
            if (string == null)
            {
                return "";
            }
            string = string.replace(/&amp;/g, "&");
            string = string.replace(/&quot;/g, "\"");
            string = string.replace(/&apos;/g, "\'");
            string = string.replace(/&lt;/g, "<");
            string = string.replace(/&gt;/g, ">");
            string = string.replace(/&#123;/g, "{");
            string = string.replace(/&#125;/g, "}");
            string = string.replace(/&nbsp;/g, " ");
            string = string.replace(/#enter#/g, "\n");
            return string;
        },
        /**
         * 验证str中是否含有特殊字符（^/|"'<>&）
         * @param {Object} str
         */
        isSpecialChar : function (str){
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
            if(pattern.test(str)){
                return false;
            }
            return true;
        }

    };
    window.base = base;
})(jQuery);