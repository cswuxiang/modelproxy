//本系统不处理的教给这里处理
//这里做透传处理
var config = require('../config/config.js').config;
var express = require('express');
var router = express.Router();
var httprequest = require('../httprequest/httprequest.js');
router.get('/*', function(req, res, next) {
	
	//根据url中前面hw-->http://lowinwu.com/
	var xpath = req.path;
	xpath.match(/\/(.*)\//);
	var newURL = xpath.replace("/"+RegExp.$1+"/",config[RegExp.$1]);
	httprequest.request({
		   type: req.method,
		   url: newURL,
		   headers:req.headers,
		   data: "name=John&location=Boston",
		   success: function(msg){
			   res.send(msg);
		   },
		   fail:function(msg){
			   console.log(msg);
		   }
	  });
	
	
	
	
	
	
});
module.exports = router;
