/**
 * Created by sq_xu on 2015/4/28.
 */
var http = require('http');
var queryStr = require('querystring');

//1_ 请求方法设为了 GET 请求，同时不需要手动调用 req.end()。
/*http.get({host:'127.0.0.1',port:'4000'},function(res){
    res.setEncoding('utf-8');
    res.on('data', function(data){
        console.log(data);
    });
});*/

//2_ httpresponse
var http = require('http');
var req = http.get({host:'127.0.0.1',port:'3000'});
//req.abort();
req.setTimeout(50000, function(){
    console.log("timeout");
});
req.on('response', function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});



//3_ request
/*
var contents = queryStr.stringify({
    name: "byvoid",
    email: "byvoid@byvoid.com",
    address: 'Zijing 2#， Tsinghua University'
});
var options = {
    host: '127.0.0.1',
    port: '4000',
    path: '/',
    method: "get",
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
req.end();*/
