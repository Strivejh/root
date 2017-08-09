<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@include file="/WEB-INF/content/public/manager.jsp" %>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
</head>
<body>
<div id="container-margin" style="height: auto;overflow: auto;background-color: white">			
	<div class="pageContent" style="width: 200px;">
	<form
		onsubmit="return validateCallback(this, dialogAjaxDone);"
		method="post" action="${ctx}/student/updateStu.do"
		class="pageForm required-validate">
		<div class="pageFormContent" layouth="56" style="height: 205px; overflow: auto;">
			<input type="hidden" name="pageNum" value="${pageNum }">
			<input type="hidden" name="id" value="${student.id }">
			<p>
				<label>学生姓名：</label>
				<input type="text" size="30" name="stuName" value="${student.stuName }" 
				readonly="readonly" class="required readonly" minlength="2" 
				maxlength="10">
			</p>
			<p>
				<label>密码：</label>
				<input type="password" size="30" name="password" id="password" 
				class="required alphanumeric" minlength="6" 
				maxlength="18" alt="字母、数字、下划线 6-18位">
			</p>
			<p>
				<label>确认密码：</label>
				<input type="password" size="30" name="confirmPwd" id="confirmPwd" 
				class="textInput" minlength="6" 
				maxlength="18" onblur="checkPwd();">
			</p>
			<p>
				<label>性别：</label>
				<input type="radio" name="sex" value="1">男
				<input type="radio" name="sex" value="2">女
			</p>
			<p>
				<label>年龄：</label>
				<input type="text" size="10" name="age" value="${student.age }" 
				class="textInput" onblur="checkAge(this);">
			</p>
		</div>
		<div class="formBar">
			<ul>
				<li><div class="buttonActive"><div class="buttonContent"><button type="submit">保存</button></div></div></li>
				<li>
					<div class="button"><div class="buttonContent"><button type="button" class="close">取消</button></div></div>
				</li>
			</ul>
		</div>
	</form>
	</div>
	
   </div>
<script type="text/javascript" defer="defer">
$(function(){
	var sexNum = ${student.sex };
	$('input[name="sex"]').each(function(){
		if(sexNum == this.value){
			$(this).attr("checked",true);
		}
	});
});
function checkPwd(){
	if($("#password").val() != $("#confirmPwd").val()){
		alertMsg.error("两次密码不一致");
	}
}

function checkAge(obj){
	var age = $(obj).val();
	age = parseInt(age);
	if((age < 0)  || (age > 150)){
		alertMsg.error("年龄不合法");
	}
}


</script>
</body>
</html>
