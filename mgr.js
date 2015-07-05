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
    var child = exports.child = cp.spawn(exec, args);//
    child.stdout.addListener("data", function (data) {
       console.log('stdoutxx: ' + data);
    });
    child.stderr.addListener("data", function (data) {
         console.log('stdouterror: ' + data);
    });
    child.addListener("exit", function () {
	    console.log('new things');
        rebootProcess(exec, args);//重启程序
		
    });
}
var mainChild = rebootProcess('node',['./bin/www']);
//程序出错处理
function crashProcess (prev, cur) {
    //if ( cur && +cur.mtime !== +prev.mtime|| crashProcess.status ) return;
    crashProcess.status = 1;//
    var child = exports.child;
	console.log('crash process...'+child.pid);
    setTimeout(function() {
        process.kill(child.pid);
        crashProcess.status = 0;
    }, 50);
}
/**
 * 全局错误回收
 */
var catchException = function(){
	process.on('uncaughtException', function (err) {
       console.log("uncaughtException");
    });
};
function start(func){
    var myChild = lpro.bootProcess('node',[ myRootDir + "/process/queryRootAllFiles.js"],function(path,type){
    	func&&func();
    });
   child['query'] = myChild;
   catchException();
}
//启动程序
start(crashProcess);
