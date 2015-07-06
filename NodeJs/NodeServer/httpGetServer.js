var http = require('http');

var server = new http.Server();

var url = require('url');
var util = require('util');
// 加载File System读写模块
var fs = require('fs');
// 加载编码转换模块
var iconv = require('iconv-lite');

function writeFile(file , str){
    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    fs.appendFileSync(file, str, {"encoding": "utf-8"},function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });
}

function readFile(file){
    fs.readFile(file,"utf8", function(err, data){
        if(err)
            console.log("读取文件fail " + err);
        else{
            // 读取成功时
            // 输出字节数组
            console.log(data);
            // 把数组转换为gbk中文
            var str = iconv.decode(data, 'gbk');
            console.log(str);
        }
    });
}


server.on('request', function(req, res){
   // console.log(req.data);
    res.writeHead(200, {'Content-Type': 'text/plain', 'charset': 'utf-8'});
    var reqObj =url.parse(req.url, true);
    var strval= "";
    //获取get传进来的参数 param
    for (var e in reqObj.query){
    	res.write(reqObj.query[e]);
        strval += e + ":" + reqObj.query[e] + " ";
    }
    writeFile('a.txt', strval + "\n");
    res.end(util.inspect(reqObj)); //res.end结束并发送
});
server.listen(4000);

console.log("HTTP server is listening at port 4000.");