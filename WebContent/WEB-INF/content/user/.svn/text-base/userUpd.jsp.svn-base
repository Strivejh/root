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
			<form
				onsubmit="return validateCallback(this, dialogAjaxDone);"
				method="post" action="${ctx}/core/userManager.editUser.do"
				class="pageForm required-validate"
				id="updInnerUserForm">
				<div id="container-panel" style="overflow: auto;">
					<fieldset class="common-form" data-gp="info" prefix="" id="info_fs">
						<table class="form" width="300">
							<tbody>
								<!-- UserCode -->
								<tr>
									<th><label class="form-field">登陆名</label></th>									
                                     <td colspan="3"><s:property value="userInfo.loginName"/>
                                        <input type="hidden" value="<s:property value="userInfo.innerUserId"/>" name="userInfo.innerUserId">
									</td>									
								</tr>
							</tbody>
							<tbody>
								<!-- FirstName & LastName -->
								<tr>
									<th><label for="firstName" class="required">姓名</label></th>
									<td><input type="text" id="firstName" name="userInfo.userName" value="<s:property value="userInfo.userName"/>"></td>
								</tr>
								<tr>
									<th><label class="form-field">电话</label></th>
									<td><input type="text" id="phoneNo" name="userInfo.concatPhone" value="<s:property value="userInfo.concatPhone"/>"></td>
								</tr>
								
							</tbody>
							<!-- Currency & FaxNo -->
							<tbody>
								<tr>
									<th>账户类型</th>
									<td>
									   <dict:dictTag controlType="1" name="userInfo.boundsys" dictType="inneruser_bsys" showI18n="false" showTip="false" selectAll="false" selectValue="${userInfo.boundsys}"/>
									</td>
								</tr>
						   </tbody>
						</table>
					</fieldset>
				</div>
				<div id="btn-panel" align="center">
					<!-- Submit Button -->
					<fieldset class="buttons">
						<button name="submit" type="submit">提交</button>
						<button type="button" onclick="$.pdialog.closeCurrent();">取消</button>
					</fieldset>
				</div>
			</form>
   </div>
<script type="text/javascript" defer="defer">


</script>
		</div>
</body>
</html>
