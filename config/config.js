var config = {
	domains:{//域名服务
	    		mp : "http://lowinwu.com/"
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
