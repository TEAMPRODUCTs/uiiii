/**
 * Created by sq_xu on 2015/4/20.
 */
var fs = require('fs');

 fs.readFile('content1.txt', 'UTF-8',function(err, data){
 if(err){
 console.error("1111+++++++++++++++++++++" + err);
 }else{
 console.log(data);
 }
 });

try{
    //同步读文件必须加try catch捕捉并处理异常
    var data = fs.readFileSync('content1.txt', 'UTF-8');
    console.log("+++++++++++++++++++++" + data);
    console.log(data);
}catch (e){
    console.log("----------------------------------------" + e)
}
