<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@include file="/WEB-INF/content/public/manager.jsp" %>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
</head>

<body class="ui-layout-container" style="overflow: hidden; width: auto; height: auto; margin: 0px; position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">
		<div id="container-margin" style="height: auto;overflow: auto;background-color: white">
			<div id="container-top"></div>

			<form
				onsubmit="return validateCallback(this, dialogAjaxDone);"
				method="post" action="${ctx}/core/userManager.editUser.do"
				class="pageForm required-validate"
				id="agentCreationForm3">
				<div id="container-panel" style="overflow: auto;">

					<fieldset data-gp="pt" prefix="pt_" id="updpt_postaking_fs">
						 <table class="form">
							<thead></thead>
							<tbody>
								<tr>
									<td><label>用户名称:</label></td>
									<td>${sessionScope.USER_SESSION.userName}
									   <input type="hidden"  autofocus="autofocus" name="userInfo.innerUserId" value="${sessionScope.USER_SESSION.innerUserId}">
									</td>
								</tr>
								
								<tr>
									<td><label for="updPwd_newPwd">新密码:</label></td>
									<td>
				                        <input type="password" id="updPwd_newPwd" name="userInfo.userPwd" value="" class="required alphanumeric">
				                        <img id="pwdInfo" src="${ctx}/images/help.png" title="密码: 1. 需在6和15字符之间。 2. 仅可输入字母数字字符。 3. 至少包含1个字母和1个数字。"/>
				                    </td>
								</tr>
				                
								<tr>
									<td><label for="updPwd_cfmPwd">确认密码:</label></td>
									<td><input type="password" id="updPwd_cfmPwd"  class="required" equalto="#updPwd_newPwd"></td>
								</tr>
							</tbody>
						</table>
					</fieldset>
					<script>
						
					</script>
				</div>
				<div id="btn-panel">
					<!-- Submit Button -->
					<fieldset class="buttons">
						<button name="submit" type="submit">提交</button>
						<button type="button" onclick="$.pdialog.closeCurrent();">取消</button>
					</fieldset>
				</div>
			</form>

<script type="text/javascript">
   $(function (){
	   initSelect();
	   initSelectVal();
   });
	
   function initSelectVal() {
       $("#updcommTable").find("select").each(function (){
    	   $(this).val($(this).attr("initval"));
       });
       
        $("#updpt_tblPT").find("select").each(function (){
    	   $(this).val(parseInt($(this).attr("initval")));
       });
   }
   function initSelect(){
	   $("#updpt_tblPT").find("select").each(function (){
    	   for(var i=0;i<=100;i++){
    		    var op = '<option value="'+i+'">'+i+'</option>';
				$(this).append(op);
    	   }
       });
   }

</script>
		</div>
</body>
</html>
