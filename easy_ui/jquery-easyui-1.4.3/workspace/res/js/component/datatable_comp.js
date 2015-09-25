/**
 * Created by fiona.xu on 2015/9/8.
 */
define([], function () {
    var table = {
        elemid : "#dg",//table
        height:"450px",
        renderTableResultset: function(resultset , pageSize,pageNumber){
            var self = this;
            var data_rows =resultset ?  resultset.rows : [];
          //  var rowspan = columns.length;
            var columns_total = [];//总的
            var columns = [];//第一层coulmn title
            var frozenColumns = [];
            var column_selected =  resultset.column_selected || [];
            //添加列
            var columns_j = [];
            if(column_selected.length == 0){
                var row_selected = resultset.row_selected || {};
                for(var i = 0 ; i < row_selected.length; i++){
                    var row_i = row_selected[i];
                    var obj = {field:row_i.id,title:row_i.label}; // , rowspan: row_i.rowspan
                    frozenColumns.push(obj);
                }
            }
            if(columns_j.length != 0){
                columns_total.push(columns_j);
            }
            var fields = [];
            for(var j = 0; j <  column_selected.length; j++){
                var column_j = column_selected[j];
                columns_j = [];
                if(j == 0){
                    //添加行
                    var row_selected = resultset.row_selected || {};
                    for(var i = 0 ; i < row_selected.length; i++){
                        var row_i = row_selected[i];
                        var obj = {field:row_i.id,title:row_i.label}; //,rowspan: row_i.rowspan
                        frozenColumns.push(obj);
                    }
                }

                if(j != column_selected.length -1){
                    var data_j = column_j.data;
                    for(var z = 0 ; z < data_j.length; z++){
                        var obj = {title:data_j[z],colspan:column_j.colspan};
                        columns_j.push(obj);
                    }
                }else{
                    fields = column_j.field;
                    for(var x = 0;  x < fields.length; x++){
                        var data_j = column_j.data;
                        var obj = {title:data_j[x%data_j.length],field:fields[x],  width:100,sortable:true, colspan:column_j.colspan,sorter:function(a,b){console.log(a + " " + b);}};
                        columns_j.push(obj);
                    }
                }
                columns_total.push(columns_j);
            }
            var row_selected = resultset.row_selected || {};
            var total_rows = 1;
            var rows = [];
            var filed = [];
            for(var i = 0 ; i < row_selected.length; i++){
                rows.push(row_selected[i].data.length);
                filed.push(row_selected[i].id);
                total_rows = total_rows * row_selected[i].data.length;
            }

            if((!columns_total || !columns_total.length) && (!frozenColumns || !frozenColumns.length)){
                return;
            }
            var frozenColumns_table = [];
            frozenColumns_table.push(frozenColumns);
            data_rows = data_rows || [];
            var height =window.innerHeight/* $(".tab-content").height()*/ - 200 -35 ;//减去行列 度量 pv 筛选器 分页高度
            console.log(height + "height");
            $(self.elemid).datagrid({
                data: data_rows,
                width:"100%",
                height:data_rows.length > 50 ? height: "auto",//TODO
                columns:columns_total,
                total: resultset.total,
                rownumbers:4,
                frozenColumns:frozenColumns_table,
                loadMsg:'数据装载中......',
                //sortName:fields.join(","),
                pagination:true,
                singleSelect:true,

                onSortColumn:function(){
                    console.log("sort");//TODO SORT
                },
                onBeforeLoad:function(){
                    $(self.elemid).css("display","");
                },
                onLoadSuccess:function(data){
                    if(data.total == 0)
                    {
                        $(self.elemid).css("display","none");
                        $(".nodata").css("display","");
                    }else
                    {
                        $(self.elemid).css("display","");
                        $(".nodata").css("display","none");
                    }
                }
            })
            var p = $(self.elemid).datagrid('getPager');
            $(p).pagination({
                pageList:[2,3,4,5],
                pageSize:pageSize,
                pageNumber:pageNumber, //TODO后台取
                displayMsg:'当前显示从{from}到{to}共{total}记录',
                buttons: [{
                    iconCls:'icon-excel',
                    text:'<a href="http://vipdata.vip.vip.com/xls/a6dc460c-5385-4bdd-ab9e-118cf8ad2765.xlsx">导出Excel文件</a>',
                    handler:function(){
                        alert('add');
                    }
                }],
                onBeforeRefresh:function(pageNumber, pageSize){
                    $(this).pagination('loading');
                    $(this).pagination('loaded');
                },
                onSelectPage: function(pageNumber, pageSize){
                    console.log(pageNumber + " " + pageSize + "onSelectPage");//TODO 调后台 分页 翻页 ok
                    var key = "platformaddress_date_pv_5";
                    var resultset = window.Mockdata.tabs[0].tabcontent.data[key] || {};//TODO后端返回结果
                    self.renderTableResultset(resultset, pageSize, pageNumber);
                    // $('#content').panel('refresh', 'show_content.php?page='+pageNumber);
                },
                onChangePageSize: function(pageSize){
                    console.log(pageSize + "onChangePageSize");
                }
            });

            if(rows.length > 1){ //两行固定
                for(var i = 0; i < rows[0]; i++){
                    $(self.elemid).datagrid('mergeCells', {
                        index: i*rows[1],
                        field: filed[0],
                        rowspan: rows[1],
                        colspan:1
                    });
                }
            }
        },
        renderTable : function(data, option) {
            var self = this;
            avalon.mix(self, option);//优先使用用户的配置
            var columns = _.pluck(data.selected_den.column, 'id');
            var key = columns.join("");
            var rows = _.pluck(data.selected_den.row, 'id');
            key += "_" + rows.join("");
            var magnanimitu = _.pluck(data.selected_den.magnanimity, 'id');
            key += "_" + magnanimitu.join("");

            var resultset = window.Mockdata.tabs[0].tabcontent.data[key] || {};//TODO后端返回结果
            self.renderTableResultset(resultset, 5, 1);
        },
        ChangeToTable: function(printDatagrid) {
            var tableString = '<table cellspacing="0" class="pb">';
            var frozenColumns = printDatagrid.datagrid("options").frozenColumns;  // 得到frozenColumns对象
            var columns = printDatagrid.datagrid("options").columns;    // 得到columns对象
            var nameList = new Array();

            // 载入title
            if (typeof columns != 'undefined' && columns != '') {
                $(columns).each(function (index) {
                    tableString += '\n<tr>';
                    if (typeof frozenColumns != 'undefined' && typeof frozenColumns[index] != 'undefined') {
                        for (var i = 0; i < frozenColumns[index].length; ++i) {
                            if (!frozenColumns[index][i].hidden) {
                                tableString += '\n<th width="' + frozenColumns[index][i].width + '"';
                                if (typeof frozenColumns[index][i].rowspan != 'undefined' && frozenColumns[index][i].rowspan > 1) {
                                    tableString += ' rowspan="' + frozenColumns[index][i].rowspan + '"';
                                }
                                if (typeof frozenColumns[index][i].colspan != 'undefined' && frozenColumns[index][i].colspan > 1) {
                                    tableString += ' colspan="' + frozenColumns[index][i].colspan + '"';
                                }
                                if (typeof frozenColumns[index][i].field != 'undefined' && frozenColumns[index][i].field != '') {
                                    nameList.push(frozenColumns[index][i]);
                                }
                                tableString += '>' + frozenColumns[0][i].title + '</th>';
                            }
                        }
                    }
                    for (var i = 0; i < columns[index].length; ++i) {
                        if (!columns[index][i].hidden) {
                            tableString += '\n<th width="' + columns[index][i].width + '"';
                            if (typeof columns[index][i].rowspan != 'undefined' && columns[index][i].rowspan > 1) {
                                tableString += ' rowspan="' + columns[index][i].rowspan + '"';
                            }
                            if (typeof columns[index][i].colspan != 'undefined' && columns[index][i].colspan > 1) {
                                tableString += ' colspan="' + columns[index][i].colspan + '"';
                            }
                            if (typeof columns[index][i].field != 'undefined' && columns[index][i].field != '') {
                                nameList.push(columns[index][i]);
                            }
                            tableString += '>' + columns[index][i].title + '</th>';
                        }
                    }
                    tableString += '\n</tr>';
                });
            }
            // 载入内容
            var rows = printDatagrid.datagrid("getRows"); // 这段代码是获取当前页的所有行
            for (var i = 0; i < rows.length; ++i) {
                tableString += '\n<tr>';
                for (var j = 0; j < nameList.length; ++j) {
                    var e = nameList[j].field.lastIndexOf('_0');

                    tableString += '\n<td';
                    if (nameList[j].align != 'undefined' && nameList[j].align != '') {
                        tableString += ' style="text-align:' + nameList[j].align + ';"';
                    }
                    tableString += '>';
                    if (e + 2 == nameList[j].field.length) {
                        tableString += rows[i][nameList[j].field.substring(0, e)];
                    }
                    else
                        tableString += rows[i][nameList[j].field];
                    tableString += '</td>';
                }
                tableString += '\n</tr>';
            }
            tableString += '\n</table>';
            return tableString;
    },

     Export: function(strXlsName, exportGrid) {
        var f = $('<form action="/export.aspx" method="post" id="fm1"></form>');
        var i = $('<input type="hidden" id="txtContent" name="txtContent" />');
        var l = $('<input type="hidden" id="txtName" name="txtName" />');
        i.val(this.ChangeToTable(exportGrid));
        i.appendTo(f);
        l.val(strXlsName);
        l.appendTo(f);
        f.appendTo(document.body).submit();
        document.body.removeChild(f);
    }
    }

    return table;
});
