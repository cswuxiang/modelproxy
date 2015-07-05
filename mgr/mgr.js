var cp = require('child_process');
var fs = require("fs");
var http = require('http');

 function rebootProcess(exec,args){
    args = args || []
	//reboot();
    var child = exports.child = cp.spawn(exec, args);//����һ�����߳�������
    child.stdout.addListener("data", function (data) {
       console.log('stdoutxx: ' + data);
    });
    child.stderr.addListener("data", function (data) {
         console.log('stdouterror: ' + data);
    });
    child.addListener("exit", function () {
	    console.log('new things');
        rebootProcess(exec, args);//������ĳ����
		
    });
}
rebootProcess('node',['../bin/www']);//��ʼ��ĳ����
//rebootProcess('node',['websocket.js']);

//�ر��߳�
function crashProcess (prev, cur) {
    //if ( cur && +cur.mtime !== +prev.mtime|| crashProcess.status ) return;
    crashProcess.status = 1;//�������������������߳�
    var child = exports.child;
	console.log('crash process...');
    setTimeout(function() {
		console.log(child.pid);
        process.kill(child.pid);
        crashProcess.status = 0;
    }, 50);
}
fs.watchFile("app.js",crashProcess);

