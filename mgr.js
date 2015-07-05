var cp = require('child_process');
var fs = require("fs");
var http = require('http');
var lfile = require('./core/lfile').lfile;
var utils = require('./core/lutil.js').utils;
var lpro = require('./core/lprocess.js').lpro;
var myRootDir = utils.getSoftPath();
/**
 * 全局文件
 * @type 
 */
var g_files = {},listFiles = {},child = {};

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
rebootProcess('node',['./bin/www']);//��ʼ��ĳ����

//程序出错处理
function crashProcess (prev, cur) {
    //if ( cur && +cur.mtime !== +prev.mtime|| crashProcess.status ) return;
    crashProcess.status = 1;//
    var child = exports.child;
	console.log('crash process...');
    setTimeout(function() {
		console.log(child.pid);
        process.kill(child.pid);
        crashProcess.status = 0;
    }, 50);
}
//todo:修改改成watchDir

function start(){
	var regLog = /^%/;
    var myChild = lpro.bootProcess('node',[ myRootDir + "/process/queryRootAllFiles.js"],function(path,type){
        	           if(type && type ==="error"){
    	           	        JSlog.sendLog({msg:path,type:'error'});
        	           }else{
                        	if(path.match(regLog)){//日志处理
                        		JSlog.sendLog(path.replace(regLog,""));
                        	}else{
                                path = path.replace("\n","");
                                g_files[path] = path;
                                //加入列表中
                                PKF.listChangeFiles(g_files);
                                storage.setItem("g_files",g_files);
                        	}
                      }
                });
   child['query'] = myChild;
   this.catchException();
	
}

//lfile.watchFileChange("../app.js",crashProcess);

