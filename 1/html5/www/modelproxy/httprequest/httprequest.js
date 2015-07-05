var httpRequest = {
		request :function(options,headers){
			options = options || {};
			var http = require('http');  
			var newOptions = this.parseOptions(options);
			//以下是接受数据的代码
			var body = '';
			var req = http.request(newOptions, function (res) {  
			    console.log('STATUS: ' + res.statusCode);  
			    console.log('HEADERS: ' + JSON.stringify(res.headers));  
			    res.setEncoding('utf8');  
			    res.on('data', function (d) {  
			    	body += d;
			    }).on('end', function(){
					options.success&&options.success(body); 
			    }); 
			});  
			
			req.on('error', function (e) {  
				options.fail&&options.fail(e);    
			});  
			// write data to request body
			this.setPostData(req,options);
			req.end(); 
		},
		parseOptions:function(options,headers){
			var url = require('url');
			var data = url.parse(options.url);
			var opt = { hostname : data.hostname,
				        port : data.port || 80,
					 	method:options.method || 'get',//这里是发送的方法
					 	path:data.path,     //这里是访问的路径
					 	headers: headers   
					  };
			
			console.log(opt);
			return opt;
		},
		setPostData:function(req,options){
			var data = require('querystring').stringify(options.data||{})
			req.write(data);
		}
}
///sdsdf
module.exports = httpRequest;