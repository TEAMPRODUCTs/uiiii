/**
 * Created by sq_xu on 2015/4/23.
 */
var http = require('http');
var querystr = require('querystring');

var util = require('util');

/*
fiddler composer调试
！！！！important
* 不要在真正的生产应用中使用上面这种简单的方法来获取 POST 请
 求，因为它有严重的效率问题和安全问题
* */
http.createServer(function(req, res){
     var post = '';
     req.on('data', function(chunk){//请求数据到来时触发该事件 不监听 ，请求体即被抛弃
         post += chunk;
         console.log(post);
     });

    req.on('end', function(){ //end 请求数据传送完时，触发该事件
        post = querystr.parse(post);
        console.log(post.name);
        console.log(post.email);//！！important 获取相应的具体参数
        res.write(util.inspect(post) , 'utf-8');
        res.end(util.inspect(post));//end 结束并发送
    });
}).listen(3000);