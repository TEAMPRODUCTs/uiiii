/**
 * Created by fiona.xu on 2015/9/8.
 */
define([], function () {
    var table = {
        elemid : "#dg",//table
        height:"150px",
        renderTable : function(data){
            var self  =this;
            var columns = _.pluck(data.selected_den.column, 'id');
            var key = columns.join("");
            var rows = _.pluck(data.selected_den.row, 'id');
            key += "_" + rows.join("");
            var magnanimitu = _.pluck(data.selected_den.magnanimity, 'id');
            key += "_" + magnanimitu.join("");

            var resultset = window.Mockdata.tabs[0].tabcontent.data[key] || {};//TODO后端返回结果
            var data_rows =resultset ?  resultset.rows : [];

            var rowspan = columns.length;
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
                   // columns_j.push(obj);
                }
            }
            if(columns_j.length != 0){
                columns_total.push(columns_j);
            }
            var fields = [];
            for(var j = 0; j <  column_selected.length; j++){
                var column_j = column_selected[j];
                var column_next = null;
                var colspan = 1;
                columns_j = [];

                if(j == 0){
                    //添加行
                    var row_selected = resultset.row_selected || {};
                    for(var i = 0 ; i < row_selected.length; i++){
                        var row_i = row_selected[i];
                        var obj = {field:row_i.id,title:row_i.label}; //,rowspan: row_i.rowspan
                        frozenColumns.push(obj);
                       // columns_j.push(obj);
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
                        //console.log(x%data_j.length + " jjj " + data_j[x/data_j.length]);//取模取title
                        var obj = {title:data_j[x%data_j.length],field:fields[x],  width:100, colspan:column_j.colspan};
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

            var frozenColumns_table = [];
            frozenColumns_table.push(frozenColumns);
            $(self.elemid).datagrid({
                data: data_rows || [],
                width:"100%",
                columns:columns_total,
                frozenColumns:frozenColumns_table,
                sortName:fields.join(","),
              //  pagination:true,
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
            });



            if(rows.length > 1){
                for(var i = 0; i < rows[0]; i++){
                    $(self.elemid).datagrid('mergeCells', {
                        index: i*rows[1],
                        field: filed[0],
                        rowspan: rows[1],
                        colspan:1
                    });
                }
            }


        }
    }

    return table;
});
