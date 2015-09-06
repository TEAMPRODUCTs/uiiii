/**
 * Created by fiona.xu on 2015/9/6.
 */
/**
 * Created by fiona.xu on 2015/9/6.
 */
define([], function () {
    var database_op = {
        db : openDatabase('mydb1', '1.0', 'Test DB', 10 * 1024 * 1024),
        rows:null,
        select : function(query){
            var self = this;
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM ANALYSIS2 group by address , platform', [], function (tx, results) {
                    var len = results.rows.length, i;
                    msg = "<p>Found rows: " + len + "</p>";
                    self.rows = results.rows;
                    console.log(JSON.stringify(results.rows));
                }, null);
            });
        }
    }
    return database_op;
});