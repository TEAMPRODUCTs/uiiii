var tf=__dirname+'/TEE-CLC-10.0.0/tf';
var exec = require('child_process').exec;
function shell(command) {
	console.log(command)
//	return
    exec(
		command,
		{
			env:{
				'tfsworkspaces':'1'
			},
			encoding: 'utf8'
		},
		function(error, stdout, stderr) {
			
			stdout && console.log('stdout: ' + stdout);
			stderr && console.log('stderr: ' + stderr);
			if (error !== null) {
				error && console.log('exec error: '+error);
			}
		}
	);
}
var cmd1 = ' checkout $/UISolution/website/_webresource_/code/lizard/2.0/node-webapp2hybrid/app.js app.js /workspace:tfsworkspaces /login:cn1\\tfsci,Tfs_ci12345 /collection:http://192.168.83.70:8080/tfs/ued';



var cmd = ' workfold /map $/UISolution/website/_webresource_/code/lizard/2.0/node-webapp2hybrid/app.j app.js /collection:http://192.168.83.70:8080/tfs/ued /workspace:tfsworkspaces /login:cn1\\tfsci,Tfs_ci12345'
var cmd2 = ' workfold $/UISolution/website/_webresource_/code/lizard/2.0/node-webapp2hybrid/app.j app.js /collection:http://192.168.83.70:8080/tfs/ued /workspace:tfsworkspaces /login:cn1\\tfsci,Tfs_ci12345'
var cmd3 = ' get $/UISolution/website/_webresource_/code/lizard/2.0/node-webapp2hybrid/app.j app.js /collection:http://192.168.83.70:8080/tfs/ued /workspace:tfsworkspaces /login:cn1\\tfsci,Tfs_ci12345'

var server = 'http://192.168.83.70:8080/tfs/ued/'
var login = ' /login:cn1\\tfsci,Tfs_ci12345';

 
var cmd4= ' profile /new -string:serverUrl='+server+' tfsci';
var cmd5 = ' workspace /new tfscis;tfsci /collection:http://192.168.83.70:8080/tfs/ued';
var cmd6 = ' workfold /map $/UISolution/website/_webresource_/code/lizard/2.0/node-webapp2hybrid D:\\working1\\TFS2010\\website\\_webresource_\\code\\lizard\\2.0\\webapp2hybrid-0.01\\tfstest /collection:http://192.168.83.70:8080/tfs/ued /workspace:tfscis '+login;
shell(tf+cmd6) 


//shell(tf+'  /collection:http://192.168.83.70:8080/tfs/ued /login:cn1\\tfsci,Tfs_ci12345 ');
// $/UISolution/website/_webresource_/code/lizard/2.0/node-webapp2hybrid/app.js app.js 
//D:\working1\TFS2010\website\_webresource_\code\lizard\2.0\webapp2hybrid-0.01/TEE-CLC-10.0.0/tf
//checkout /recursive 
///collection:http://192.168.83.70:8080/tfs/ued 
//$/UISolution/website/_webresource_/code/lizard/2.0/node-webapp2hybrid/app.js app.js /login:cn1\tfsci,Tfs_ci12345 
//checkout  /recursive /collection:http://192.168.83.70:8080/tfs/ued 

//D:\working1\TFS2010\website\_webresource_\code\lizard\2.0\webapp2hybrid-0.01/TEE-CLC-10.0.0/tf workspaces /new tfsworkspaces /collection:http://192.168.83.70:8080/tfs/ued /login:cn1\tfsci,Tfs_ci12345 

//D:\working1\TFS2010\website\_webresource_\code\lizard\2.0\webapp2hybrid-0.01/TEE-CLC-10.0.0/tf checkout $/UISolution/website/_webresource_/code/lizard/2.0/node-webapp2hybrid/app.js app.js /login:cn1\tfsci,Tfs_ci12345 /collection:http://192.168.83.70:8080/tfs/ued
