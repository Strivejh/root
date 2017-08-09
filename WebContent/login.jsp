<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <%@include file="/WEB-INF/content/public/head.jsp" %>
  <%--  <link href="${ctx}/css/sgfmform.css" rel="stylesheet" type="text/css" /> --%>

   <script type="text/javascript" src="${ctx}/js/Base64Util.js"></script>
   <title>基础平台系统</title>
  </head>

  <body onkeyup="submitLogin(event)">        <br><br><br><br><br><br><br><br><br><br><br><br>
    
	   	<table  align="center" height="120px" width="300px" style="background-color:#72a700;color:white;">
	   	<tr>
		    <td align="center" style="font-size:18px;" colspan="3">基础平台系统</td>
		  </tr>
		  <tr>
		    <td width="70px" align="right">登录名：</td>
		    <td  width="160px"><input type="text" id="loginuserid"   errormsg="请输入正确的登录名" nullmsg="登录名不能为空"  datatype="^\w{2,50}$" maxlength="16"  /><span class="Validform_checktip"></span></td>
		    <td align="right"> </td>
		  </tr>
		  <tr>
		    <td align="right">密&nbsp;&nbsp;码：</td>
		    <td><input type="password" id="password"  errormsg="请输入正确的密码" nullmsg="密码不能为空" datatype="*" maxlength="16" /><span class="Validform_checktip"></span></td>
		    <td title="点击更换验证码" style="cursor:hand;" rowspan="2">
					<img name="divCode"  id="divCode"  title="点击更换验证码" style="cursor:hand;display:none;margin-right:3px;"/>
					<span></span><span></span><span></span><span></span>
					</div>
				</td>
		  </tr>
		 <tr>
			    <td align="right"><label>验证码：</label></td>
			    <td width="60"><input  value="点击生成验证码" errormsg="请输入正确的验证码" nullmsg="验证码不能为空" datatype="*" maxlength="16" id="yzmbox" name="yzmbox"   
			                errormsg="请输入正确的验证码" nullmsg="验证码不能为空" datatype="*" maxlength="16" /></td>
			    
			  </tr>
		  <tr>
		  	<td colspan="3" align='center'> <input type="submit" value="登录" onclick="loginSystem()"/></td>
		  </tr>
		  <tr style="background-color:white;">
		  	<td colspan="3" ><span id='passwordInfo'></span></td>
		  </tr>
		   
		  
		</table>		
			            
  
  </body>
</html>

<script type="text/javascript">
function loginSystem(){
	var userid = $("#loginuserid").val();
	var password = $("#password").val();
	var yzmbox = $("#yzmbox").val();
	var languageName = $("#languageName").val();
	password = encode64(strUnicode2Ansi(password));	
	 //alert("UTC "+clientTimeZone());
	 var userUTC = "GMT"+clientTimeZone();
   // alert(userUTC);
	if(userid == ''){
		alert('登录名不能为空');
		$("#loginuserid").focus();
		return false;
	}
	if(password == ''){
		$("#password").focus();
		alert('密码不能为空');
		return false;
	}
	if(yzmbox == ''){
		alert('验证码不能为空');
		$("#yzmbox").focus();
		return false;
	}
	$.ajax({
		url:"${ctx}/login/doLogin.do",
		type: "post",
			dataType: "json",
			//data: "userid="+userid+"&password="+password+"&yzmbox="+yzmbox+"&languageName="+languageName+"&userUTC="+userUTC,
			data : {"loginName":userid,"userPwd":password,"yzmbox":yzmbox},
			success: function(result){
				if('0' == result.returncode){
					//登录成功
					window.location.href = "${ctx}/login/main.do";
				}else if('-1' == result.returncode){
					yzmboxClick();
					$("#userid").val("").focus();
					$("#password").val("");
					$("#passwordInfo").html("<span style='color:red'>系统登录异常,请找管理员联系</span>");;
				}else if('21' == result.returncode){
					window.location.href = "${ctx}/login/toUpdLoginName.do";
				}else if('22' == result.returncode){
					window.location.href = "${ctx}/agencyManagement/toUpdPassword.do";
				}else{	
					$("#passwordInfo").html(result.errmsg).css("color","red");
					yzmboxClick();
				}
 			},
 			error:function(result){
 				$("#passwordInfo").html("<span style='color:red'>系统登录异常,请找管理员联系</span>");;
 		//alert(result.errmsg);
 			}
	});
}


$(document).ready(function(){
	$("#userid").focus();
});

function clientTimeZone() 
{

 var munites = new Date().getTimezoneOffset();
 var hour = parseInt(munites / 60);
 var munite = munites % 60;
 var prefix = "-";
 if (hour < 0 || munite < 0) {
     prefix = "+";
     hour = -hour;
     if (munite < 0) {
          munite = -munite;
     }
 }
 hour = hour + "";
 munite = munite + "";
 if (hour.length == 1) {
     hour = hour;
 }
 if (munite.length == 1) {
     munite = "0" + munite;
 }
 return prefix + hour;
}

function yzmboxClick(){
 	  // alert('验证码2');
     jQuery("#yzmbox").val("");
     document.getElementById('yzmbox').value = '';
     //jQuery("#yzmbox").css("color", "black");
     var rand = Math.random();
     var url = "${ctx}/verifyCodeGenerator/printImage.do?rand=" + rand;
	   //alert(Result);
     jQuery("#divCode").attr("src", url);
     document.getElementById("divCode").style.display = "inline";
     jQuery("#yzmbox").unbind("focus");
     jQuery("#yzmbox").unbind("click");
 } 
 

  jQuery(document).ready(function(){
     jQuery("#divCode").click(function(){
         var rand = Math.random();
         var url = "${ctx}/verifyCodeGenerator/printImage.do?rand=" + rand;
         jQuery("#divCode").attr("src", url);
		  // alert(2222);
		   //alert(jQuery("#divCode").attr("value"));
     });
     jQuery("#yzmbox").click(yzmboxClick);
     jQuery("#yzmbox").focus(yzmboxClick);
     yzmboxClick();
 }); 
 function submitLogin(event){
	 if(event.keyCode == 13){
		 loginSystem(); 
	 }
 }
</script>