var spawn = require('child_process').spawn;
var lpro = {
	/**
	 * 调用其它进程
	 * @param {} cmd
	 * @param {} command
	 * @param {} cb
	 * @return {}
	 */
   bootProcess : function(cmd,command,cb){
   	    cb = cb || function(){};
        var child = spawn(cmd,command);
        child.stdout.setEncoding("utf-8");
        
        child.stdout.on("data",function(data){
            cb(data);
        });
     
        child.stderr.on("data",function(data){
            cb(data.toString(),'error')
        });
     
        child.on("exit",function(code){
            console.log("exited with code:"+code);
        });
        return child
    },
    /**
     * 关闭进程
     * @param {} pid
     * @param {} cb
     */
   crashProcess:function(pid,cb){
   	   cb = cb || function(){};
   	   process.kill(pid);
   	   cb();
   }
}
exports.lpro = lpro;

