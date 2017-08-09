<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%> 
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%@taglib uri="/WEB-INF/tld/i18n.tld" prefix="i18n" %>
<%@taglib uri="/WEB-INF/tld/dict.tld" prefix="dict" %>
<%@taglib uri="/WEB-INF/tld/date.tld" prefix="date" %>
<%@taglib uri="/WEB-INF/tld/right.tld" prefix="right" %> 

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">    
<%
		String path=request.getContextPath();
		application.setAttribute("ctx", path);
%>

<link rel="icon" href="${ctx}/images/favicon.ico" type="image/x-icon">
<script src="${ctx}/content/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/js/commonLib.js"></script>
<link href="${ctx}/css/main_cn.css" rel="stylesheet" type="text/css"/>
<!--[if IE]>
<link href="${ctx}/content/themes/css/ieHack.css" rel="stylesheet" type="text/css" media="screen"/>
<![endif]-->

<!--[if lte IE 9]>
<script src="${ctx}/content/js/speedup.js" type="text/javascript"></script>
<![endif]-->
<script>
$.ajaxSettings.traditional = true;
var webctx = "${ctx}";
/**
 * 按小数位数四舍五入,num.toFixed(2);
 */
Number.prototype.toFixed = function(d){

    var s=this+"";if(!d)d=0;

    if(s.indexOf(".")==-1)s+=".";s+=new Array(d+1).join("0");

    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+ (d+1) +"})?)\\d*$").test(s))

    {

        var s="0"+ RegExp.$2, pm=RegExp.$1, a=RegExp.$3.length, b=true;

        if (a==d+2){a=s.match(/\d/g); if (parseInt(a[a.length-1])>4)

        {

            for(var i=a.length-2; i>=0; i--) {a[i] = parseInt(a[i])+1;

            if(a[i]==10){a[i]=0; b=i!=1;} else break;}
       }

        s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");

    }if(b)s=s.substr(1);return (pm+s).replace(/\.$/, "");} return this+"";

};   

function hideBack(){
	var ajaxbg=$("#background,#progressBar");
	ajaxbg.hide();
}
function showBack(){
	var ajaxbg = $("#background,#progressBar");
	ajaxbg.show();	
}
function showMatchAttack(ats){
	if(ats==0){
		return "<b style='color:#003366'>未知</b>";
	}else if(ats==1){
		return "<b style='color:green'>安全</b>";
	}else if(ats==2){
		return "<b style='color:red'>危险</b>";
	}else{
		return ats;
	}
}

function showAttackTeam(att){
	if(att==0){
		return "<span style='color:#003366'>未知</span>";
	}else if(att==1){
		return "<span style='color:#336699'>主队进攻</span>";
	}else if(att==2){
		return "<span style='color:#FF6666'>客队进攻</span>";
	}else{
		return att;
	}
}

function cpgameList(st){	
	var str="";
	if(st==0){
		str="隐藏";
	}else{
		str="开启";
	}	
   	var idlist = new Array();
   	$("#w_list_print").find("input:checkbox[name='n-gid']:checked").each(function(){
   		idlist.push($(this).val());
   	});	
   	if(idlist.length==0){
   		alertMsg.error("请选择游戏");
   		return;
   	}
	alertMsg.confirm("是否要对选中游戏批量执行"+str+"游戏操作", {
        okCall: function(){
        	var url = "${ctx}/core/cpmanager.gameListAcceptBet.do";
        	var param = {"accept":st,"idlist":idlist};
        	
        	$.post(url,param,function(res){		
        		if(res.returncode==0){
        			if(st==0){			
        				alertMsg.correct('批量隐藏游戏');
        			}else{
        				alertMsg.correct('批量开启游戏');
        			}
        		}else{
        			alertMsg.error("游戏操作失败");
        		}
        		changeDate($("#mtype").val());
        	});
        }
	});
}

function batchOpt(){
	var obj=$("#optobj").val();
	var action = $("#action").val();
	if(obj==1){//赛事
		cpmatchList(action);
	}else if(obj==2){//游戏
		cpgameList(action);
	}else{
		alert("错误选择对象:"+obj);
	}
}

/**
 * 选中本列
 */
function selectCol(cls,flag){	
	$("."+cls).prop("checked",flag);
}

function getEventById(eventid){	
	var event = eventid;
	switch (eventid)
	{
		case 1044:
		  event = "Kickoff home";
		  break;
		case 2068:
		  event = "Kickoff away";
		  break;
		case 1030:
		  event = "Cancel goal home";
		  break;
		case 2054:
		  event = "Cancel goal away";
		  break;
		case 256:
		  event = "Cancel last sent event";
		  break;
		case 0:
		  event = "Start first half";
		  break;
		case 1:
		  event = "Stop first half";
		  break;
		case 2:
		  event = "Start second half";
		  break;
		case 3:
		  event = "Stop second half";
		  break;
		case 1032:
		  event = "Red card home";
		  break;
		case 1045:
		  event = "Yellow / red card home";
		  break;
		case 1047:
		  event = "Cancel red card home";
		  break;
		case 1046:
		  event = "Cancel yellow / red card home";
		  break;
		case 2056:
		  event = "Red card away";
		  break;
		case 2069:
		  event = "Yellow / red card away";
		  break;
		case 2071:
		  event = "Cancel red card away";
		  break;
		case 2070:
		  event = "Cancel yellow / red card away";
		  break;
		case 1025:
		  event = "Corner home";
		  break;
		case 1050:
		  event = "Cancel corner home";
		  break;
		case 2049:
		  event = "Corner away";
		  break;
		case 2074:
		  event = "Cancel corner away";
		  break;
		case 128:
		  event = "Safe";
		  break;
		case 129:
		  event = "Danger";
		  break;
		case 1051:
		  event = "Safe home";
		  break;
		case 1052:
		  event = "Danger home";
		  break;
		case 2075:
		  event = "Safe away";
		  break;
		case 2076:
		  event = "Danger away";
		  break;
		case 20:
		  event = "Indicates that the game has finished.";
		  break;
		case 401:
		  event = "Game cancelled";
		  break;
		case 1024:
		  event = "Attack home";
		  break;
		case 2048:
		  event = "Attack away";
		  break;
		case 1026:
		  event = "Dangerous attack home";
		  break;
		case 2050:
		  event = "Dangerous attack away";
		  break;
	}
	return event;
}

</script>