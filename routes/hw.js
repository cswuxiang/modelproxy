var express = require('express');
var router = express.Router();

/* GET hw listing. */
router.get('/*', function(req, res, next) {
  //res.send('hi this is helloworld');
	if(req.path == '/s') {//自身处理
		res.send('hi this is self');
    }else {//其它逻辑处理
        return next();
    }  
});
//
module.exports = router;
