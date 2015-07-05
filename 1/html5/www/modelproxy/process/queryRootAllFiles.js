var config = require('../../config.js').config;
var utils = require('../../js/core/lutil.js').utils;
var lfile = require('../../js/core/lfile.js').lfile;


//得到所有文件的md5
var dirs = config.watch.dirs;
var allfiles = {};

console.log("%启动中……稍等………！");

for(var i=0;i < dirs.length; i++){
	utils.extend(allfiles,lfile.getAllFiles(dirs[i]['path'],dirs[i]['type']));
}
console.log("%启动完成………………！");

//监听文件的改变
//
console.log("%开始监听文件………扒拉扒拉………！");
lfile.watchFileChange(allfiles,300*1,function(file){

    console.log("%修改文件:"+file);
    console.log(file);
    

});





