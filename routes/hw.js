var express = require('express');
var httprequest = require('../httprequest/httprequest.js');
var router = express.Router();

/* GET hw listing. */
router.get('/', function(req, res, next) {
  //res.send('hi this is helloworld');
  
  httprequest.request({
	   type: "POST",
	   url: "http://www.lowinwu.com/ci/blog/ueditor/index?action=Summary",
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
