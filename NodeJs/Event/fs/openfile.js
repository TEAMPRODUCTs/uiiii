var fs = require('fs');

/*
   r ：以读取模式打开文件。
 r+ ：以读写模式打开文件。
 w ：以写入模式打开文件，如果文件不存在则创建。
 w+ ：以读写模式打开文件，如果文件不存在则创建。
 a ：以追加模式打开文件，如果文件不存在则创建。
 a+ ：以读取追加模式打开文件，如果文件不存在则创建。
*/
fs.open('content.txt', 'r' , function(err, fd){//fd文件描述符
	if(err){
		console.error(err);
		return;
	}

	var buf  = new Buffer(8);

	//fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead,buffer)])
	fs.read(fd, buf, 0, 8, null, function(err, bytesRead, buffer){// bytesRead 字节数  buffer 缓冲区对象
		if (err) {
			console.error(err);
			return;
		};

		console.log('bytesRead: ' + bytesRead);
		console.log(buffer);
	});
});


