
/*http.createServer([requestListener]) ， 功能是创建一个 HTTP 服务器并将
requestListener 作为 request 事件的监听函数
以下是createServer的显式表现
*/
var http = require('http');

var server = new http.Server();

var url = require('url');
var util = require('util');

server.on('request', function(req, res){

   /* req.on('data', function(chunk){//请求数据到来时触发该事件 不监听 ，请求体即被抛弃
        post += chunk;
        console.log(post);
    });

    req.on('end', function(){ //end 请求数据传送完时，触发该事件
        post = querystr.parse(post);
        console.log(post.name);
        console.log(post.email);//！！important 获取相应的具体参数
        res.write(util.inspect(post) , 'utf-8');
        res.end(util.inspect(post));//end 结束并发送
    });*/

	console.log(req.data);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>Node.js111</h1>');
	res.end('<p>Hello World</p>'); //res.end结束并发送
});
server.listen(3000);

console.log("HTTP server is listening at port 3000.")