var config = {
	domains:{//域名服务
	    		mp : "http://lowinwu.com/",
	    		baidu : "http://baidu.com/",
	    		sina :"http://www.sina.com.cn/"
	        },
    watch:{//监听的文件
	        dirs:[
		          {
		        	  path:'D:\\project\\KCTWX\\www\\modelproxy',
		        	  type:/(.html)|(.js)|(.shtml)|(\.css)|(\.hdf)$/
		          }
	          ]
		  }
   
}
exports.config = config;   
