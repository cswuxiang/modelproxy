var utils = {
	date:{
		format:function () { //author: meizz
			var date,fmt;
			if(arguments.length === 1){
				date = new Date();
				fmt = arguments[0];
			}
            var o = {
                "M+": date.getMonth() + 1, //�·� 
                "d+": date.getDate(), //�� 
                "h+": date.getHours(), //Сʱ 
                "m+": date.getMinutes(), //�� 
                "s+": date.getSeconds(), //�� 
                "q+": Math.floor((date.getMonth() + 3) / 3), //���� 
                "S": date.getMilliseconds() //���� 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
	},
	extend : function(o,n,override){
               for(var p in n){
                    if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)){
                        o[p]=n[p];
                    }
               }
   },
   isEmptyObject: function( obj ) { 
        for ( var name in obj ) { 
            return false; 
        } 
        return true; 
  },
   getSoftPath:function(){
      if(!this.Path){
        this.Path = require('path');
      }
      return this.Path.dirname(process.mainModule.filename);
    }
}
exports.utils = utils;
