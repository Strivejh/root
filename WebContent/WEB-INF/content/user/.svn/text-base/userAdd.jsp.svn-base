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
			
			<form
				onsubmit="return validateCallback(this, dialogAjaxDone);"
				method="post" action="${ctx}/core/userManager.createInnerUser.do"
				class="pageForm required-validate"
				id="createInnerUserForm">
	<div layoutH="30"
					style="float: left; display: block; overflow: auto; width: 49%; border: solid 1px #CCC; line-height: 21px; background: #fff">	
				<div id="container-panel" style="overflow: auto;">
					<fieldset class="common-form" data-gp="info" prefix="" id="info_fs">
						<table class="form" width="280">
							<tbody>
								<!-- UserCode -->
								<tr>
									<th><label class="form-field">登陆名</label></th>									
                                     <td colspan="3"><input type="text" id="innerUserCode" name="userInfo.loginName"
										value="" class="required alphanumeric" minlength="2" maxlength="10"
										onblur="checkInnerUserCode(this);" >
											<div id="userCodeCheckStatus">
												<img src=""	class="userCodeCheckIcon" id="innerUserCodeCheckIcon" style="display: inline;">
											</div>
									</td>									
								</tr>
								<!-- Password -->

								<tr>
                                   <th><label for="password" class="form-field">密码</label></th>
								    <td colspan="3">
								        <input type="password" id="password" name="userInfo.userPwd" value="" class="required alphanumeric" minlength="6" maxlength="15" 
								               class="required alphanumeric" alt="字母、数字、下划线 6-20位"/>
								        <img id="pwdInfo" src="${ctx}/images/help.png" title="密码: 1. 需在6和15字符之间。 2. 仅可输入字母数字字符。 3. 至少包含1个字母和1个数字。"/>
								    </td>								    
								</tr>
							</tbody>
							<tbody>
								<!-- FirstName & LastName -->
								<tr>
									<th><label for="firstName" class="required">姓名</label></th>
									<td><input type="text" id="firstName" name="userInfo.userName"></td>
								</tr>
								<tr>
									<th><label class="form-field">电话</label></th>
									<td><input type="text" id="phoneNo" name="userInfo.concatPhone" ></td>
								</tr>
								
							</tbody>
							<!-- Currency & FaxNo -->
							<tbody>
								<tr>
									<th>账户类型</th>
									<td>
									   <dict:dictTag controlType="1" name="userInfo.boundsys" dictType="inneruser_bsys" showI18n="false" showTip="false" selectAll="false" />
									</td>
								</tr>
						   </tbody>
						</table>
					</fieldset>
				</div>
				</div>
				<div layoutH="30"
					style="float: left; display: block; overflow: auto; width: 50%; border: solid 1px #CCC; line-height: 21px; background: #fff">
				<ul class="tree treeFolder treeCheck expand">
				
						<s:iterator value="userRoles" id="id" status="status">
						<li id="<s:property value='roleid' />">
						   <a tname="ids"  tvalue="<s:property value='roleId' />"> <s:property value='roleName' />
						    </a> 
						</li>
						</s:iterator>
					
			</ul> 
		</div>
				
				<div id="btn-panel" align="center">
					<!-- Submit Button -->
					<fieldset class="buttons">
						<button name="submit" type="submit">提交</button>
						<button type="button" onclick="$.pdialog.closeCurrent();">取消</button>
					</fieldset>
				</div>
			</form>
   
   
   
<script type="text/javascript" defer="defer">
var checkCode = '1';
function checkInnerUserCode(obj){
  var code = $(obj).val();
  if(code == checkCode){
   return false;
  }
  $.ajax({
	async:false,
	type : "get",
	url :   "${ctx}/core/userManager.checkUserCode.do",
	data : {"accountName":code},
	cache : false,
	contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
	success : function(json) {
		if(json.statusCode != "200"){
			alertMsg.error('存在相同账号，请修改！');
			$("#innerUserCodeCheckIcon").attr("src", "${ctx}/images/rong.png");//
			$("#createInnerUserForm").attr("illegal", true);
			checkCode = code;
			$(obj).focus();
		}else{
			$("#innerUserCodeCheckIcon").attr("src", "${ctx}/images/right.png");//rong.png
			$("#createInnerUserForm").removeAttr("illegal");
		}
	}
  });
}

</script>
		</div>
</body>
</html>
