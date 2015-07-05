//本系统不处理的教给这里处理
//这里做透传处理
var config = require('../config/config.js').config;
var express = require('express');
var url = require('url');
var router = express.Router();
var httprequest = require('../httprequest/httprequest.js');
router.get('/*', function(req, res, next) {
	//根据url中前面hw-->http://lowinwu.com/
	var newURL = getNewUrl(req);
	if(newURL){
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
		  },req.headers);
	}else{
		res.send('hi this is no');
	}
});
function getNewUrl(req){
	var xpath = req.path;
	xpath.match(/\/([a-z A-Z 0-9]+)\//);
	var newURL = xpath.replace("/"+RegExp.$1+"/",config["domains"][RegExp.$1]);
	var query = url.parse(req.url).query;
	newURL = newURL+"?"+query;
	return newURL;
}
module.exports = router;
