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
        select : function(query, callback){
            var self = this;
            self.db.transaction(function (tx) {
                tx.executeSql(query, [], callback, null);
            });
        }
    }
    return database_op;
});