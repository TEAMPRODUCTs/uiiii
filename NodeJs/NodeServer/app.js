var http = require('http');

http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>Node.js111</h1>');
	res.end('<p>Hello World</p>'); //res.end结束并发送
}).listen(3000);

console.log("HTTP server is listening at port 3000.")