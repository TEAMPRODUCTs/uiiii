/**
 * Created by sq_xu on 2015/4/23.
 */
var http = require('http');
var queryStr = require('querystring');

var contents = queryStr.stringify({
    name: "byvoid",
    email: "byvoid@byvoid.com",
    address: 'Zijing 2#， Tsinghua University'
});


var options = {
    host: '127.0.0.1',
    port: '3000',
    path: '/',
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': contents.length
    }
};

var req = http.request(options, function(res){
    res.setEncoding('UTF-8');
    res.on('data', function(data){
        console.log(data);
    });
});

req.write(contents);
//不要忘了通过 req.end() 结束请求，否则服务器将不会收到信息。
req.end();


