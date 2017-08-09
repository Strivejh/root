<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/content/public/head.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script>
function testBtn(num){
	var param = {};
	var url = "${ctx}/core/test.testBtn"+num+".do";
	$.post(url,param,function(data){
		alert("测试方法已请求");
	});
}
</script>
<title>测试界面</title>
</head>
<body>
<input type="button" value="测试1" onclick="testBtn(1)"/><br/>
<input type="button" value="测试2" onclick="testBtn(2)"/><br/>
<input type="button" value="测试3" onclick="testBtn(3)"/><br/>
<input type="button" value="测试4" onclick="testBtn(4)"/><br/>
<input type="button" value="测试5" onclick="testBtn(5)"/><br/>
</body>
</html>
