function CommonLib(){
	this.tagName=null;
	this.getColumVal = function(key){
		var value;
      	for(temp in this.tagName){
    	  
		    if(key==temp){
		    	value=this.tagName[temp];
		    	break;
		    } 
	   	}
      
      	if(value)
	    	return value;
      	else
    	  	return key;
    }
	
   //设置标签名字
    this.setTagName = function(tagName){
    	
		 this.tagName=eval('(' + tagName + ')');
	
		
	} 

}

(function ($) {
	
	$.getMyJSON = function(url,data,callback){
		$.ajax({
			"url": url,
			"context": this,
			"data": data,
			"type": "post",
			"cache":false,
			"dataType": "json",
			"success": function(html){
				callback.call(this,html);
			}
		});
	};

})(jQuery);

/**
 * 获取字典表显示的值。
 * @param tagName
 * @param val
 * @returns
 */
function getDictName(tagName,val){
	var tagNameJson = eval('(' + tagName + ')');
	return tagNameJson[val];
}

/**
 * 限制文本域最大长度。
 * @param Objs 文本域对象
 * @param MaxCount 最大长度
 * @returns
 */
function TxtMaxlength(Objs,MaxCount){
	if(MaxCount==null || typeof(Number(MaxCount))!=="number") MaxCount=50;
	var ObjCou=Objs.value.length;
	if (ObjCou > MaxCount){
		Objs.value=Objs.value.substr(0, MaxCount);
	}
}
/**
 * 判断是因为session过期抛出异常 还是因为程序异常
 * @param strTrow 异常信息
 * @param 
 * @returns
 */
function throwTpyeFlag(strTrow){
	if(strTrow.indexOf('DataCenter Session Timeout')>=0 || strTrow.indexOf('not called')>=0){
				window.location.reload(); 
				return false;
	}
	else
		
	 return true;

}

/**
 * 限制输入的字符数。
 * @param obj
 */
function checklength(obj) {
    var max = obj.attributes['maxlength'].nodeValue; 
    if(max == null || max == "" || max == undefined) {
        return;
    }
    if(obj.value.length > max) {
        alert("请不要超过最大长度:" + max);
        obj.value=obj.value.substring(0,(max-1));
        return;
    }
}

function getFilterStr(str,maxLength){
	if( str.length>maxLength ){
		return str.substring(0,(maxLength-1))+"...";
	}else{
		return str;
	}
}

/**
 * 控制输入的字符只能是数字和小数点。
 * @param e
 */
function IsNum(e) {
    var k = window.event ? e.keyCode : e.which;
    if (((k >= 48) && (k <= 57)) || k == 8 || k == 0 || k==46 || k==13) {
    } else {
        if (window.event) {
            window.event.returnValue = false;
        }
        else {
            e.preventDefault(); //for firefox 
        }
    }
} 

/**
 * 判断输入的文本框是否为数字，非数字自动清空.
 * @param text
 */
function isNumInput(text){
	if(isNaN(text.value)){
		text.value="";
	}
}
