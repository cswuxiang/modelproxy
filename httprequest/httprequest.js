var httpRequest = {
		/*var opt = {
				 host:'这里放代理服务器的ip或者域名',
				 port:'这里放代理服务器的端口号',
				 method:'POST',//这里是发送的方法
				 path:' https://www.google.com',     //这里是访问的路径
				 headers:{
				  //这里放期望发送出去的请求头
				 }
				}
		*/
		request :function(options,sucfun,failfunc){
			var http = require('http');  
			//以下是接受数据的代码
			var body = '';
			var req = http.request(options, function (res) {  
			    console.log('STATUS: ' + res.statusCode);  
			    console.log('HEADERS: ' + JSON.stringify(res.headers));  
			    res.setEncoding('utf8');  
			    res.on('data', function (d) {  
			    	body += d;
			    }) 
			});  
			
			req.on('end', function(){
		    	sucfun&&sucfun(chunk); 
		    }); 
			
			req.on('error', function (e) {  
				failfunc&&failfunc(e);    
			});  
			req.end(); 
			
		}	
}

module.exports = httpRequest;