var fs = require('fs');

fs.writeFile('content.txt', 'writeFile', 'utf-8', function(err){
	if(err){
		console.error("writeFile " + err);
	}
});


//读取文件的真是路径
fs.realpath('content.txt', function(err, resolvePath){
	if(err){
		console.error("realpath " + err);
	}else{
		console.log(resolvePath);
	}
});


//读取目录 ./当前目录 ， ../上一层目录
fs.readdir('./', function(err, files){
	if(err){
		console.error("readdir " + err);
	}else{
		console.log(files);
	}
});


//创建目录fs.mkdir(path, [mode], [callback(err)])
fs.mkdir('./testFiles', '0754', function(err){
	if(err){
		console.error("mkdir " + err);
	}

	//删除目录 fs.rmdir(path, [callback(err)])
	fs.rmdir('./testFiles', function(err){
			if(err){
				console.error("rmdir " + err);
			}
	});
});

//更名
/*fs.rename('content.txt', 'content1.txt', function(err){
	if(err){
		console.error("rename " + err);
	}

	fs.rename('content1.txt', 'content.txt', function(err){
	if(err){
		console.error("rename11 " + err);
	}
});
});
*/
