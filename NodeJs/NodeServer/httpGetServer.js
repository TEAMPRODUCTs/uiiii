var http = require('http');

var server = new http.Server();

var url = require('url');
var util = require('util');

server.on('request', function(req, res){
    console.log(req.data);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var reqObj =url.parse(req.url, true);
    //获取get传进来的参数 param
    if(reqObj.query && reqObj.query.param){
        res.write(reqObj.query.param);
    }
    res.end(util.inspect(reqObj)); //res.end结束并发送
});
server.listen(4000);

console.log("HTTP server is listening at port 4000.")