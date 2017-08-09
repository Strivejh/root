/** 成交信息*/
var TRANSACTION_MESSAGE = "transaction";
/**系统消息*/
var SYSTEM_MESSAGE = "system";
var MESSAGE_FAIL ='fail';
var ctx = '/autosys/';
function getContent(type, messageObject, authStr){
	if(TRANSACTION_MESSAGE == type || MESSAGE_FAIL==type){
		return transaction(messageObject, authStr, type);
	}
}
//http://localhost:8080/autosys/core/betSingle.betAllIndex.do?matchid=4609
function transaction(messageObject, authStr, type){
	//type = MESSAGE_FAIL;
	var url = '';
	var href = ctx+'core/betSingle.betAllIndex.do?matchid='+messageObject.matchId;
	//118051
	if(authStr.indexOf('|118044|') != -1){
		href = 'javascript:openOrderInfo2()';
	}
	var amt = 0;
	var param=new Array();
	if(TRANSACTION_MESSAGE == type){
		amt = messageObject.currentAmt;
		param['ly'] = 'bottomRight';
	}else if(MESSAGE_FAIL == type){
		param['ly'] = 'topRight';
		amt = messageObject.intentionamt;
	}
	var dir = direction(messageObject.tradingDirection);
	var sc = getScore(messageObject.rollFlag, messageObject.hts, messageObject.gts);
	var ratio = Math.round(messageObject.ratio*1000)/1000;
	var content = "<font color='red'>"+dir+'</font>&nbsp;'+sc+'&nbsp;<b class="f39f_n">'+messageObject.gamingName+'</b>&nbsp;'
	+getDateRange(messageObject.dateRange)+'[<span style="background:#386f1b;color:white">'+switchDate(messageObject.updateDdate)+'</span>]<br>'+
	""+messageObject.leagueName+"<br>" +
	'<a style=\"padding-top: 2px\" target=\'_blank\' href='+href+'>'  +
	"<b>"+messageObject.matchName+"</b></a>"+
	'<br><b class="f30">'+messageObject.tradingItemName
	+"</b>&nbsp;&nbsp;<font color='green'>"+amt+"</font>"
	+'@'+ratio;
	//"<font color='green'>"+ matchamt +"</font>"+'@'+ratios+ '  ' +'('+intentionid+')')
	if(MESSAGE_FAIL == type){
		var betTarget = thirdWebName(messageObject.betTarget);
		content = content+ '<font color=\'red\'>['+betTarget+'.失败]</font>';
	}
	param['content'] = content;
	param['url'] = url;
	
	return param;
}
function direction(d){
	if(d == 1){
		return "买";
	}
	return "卖";
}
function getScore(rf, ht, gt){
	if(rf == '0'){
		return "";
	}
	return '<span class="f30">滚球&nbsp;'+ ht+':'+gt+'&nbsp;</span>';
}
function getDateRange(dateRange){
	/*if(dateRange == 2){
		return "半场";
	}*/
	return "";
}
function switchDate(dateObj){
	//updateDdate hours minutes seconds
	var h = (dateObj.hours+8)%24;
	var m = dateObj.minutes;
	var s = dateObj.seconds;
	if(parseInt(h)<10){
		h = '0'+h;
	}
	if(parseInt(m)<10){
		m = '0'+m;
	}
	if(parseInt(s)<10){
		s = '0'+s;
	}
	return h+':'+m+":"+s;
}

function openOrderInfo2(){
	var title = '成交记录';
	var url = ctx+'content/orderinfo.orderInfo2.do';
	navTab.openTab(title, url, { title:title, fresh:true, external:true});
}
function thirdWebName(str){
	var s;
	switch(str){		
		case "lj":
			s="利记";
			break;
		case "sb":
			s="沙巴";
			break;
		case "hg":
			s="皇冠";
			break;
		case "pb":
			s="浩博";
			break;
		case "df":
			s="东方皇朝";
			break;
		case "bw":
			s="ISN";
			break;
		case "fb":
			s="富博";
			break;
		case "ecp":
			s="竞足";
			break;
		case "bfapi":
			s="必发";
			break;	
		case "best":
			s="最优";
			break;		
		default:
			s=str;
			break;
	}
	return s;
}