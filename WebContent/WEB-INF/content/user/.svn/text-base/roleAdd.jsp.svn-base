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
				method="post" action="${ctx}/core/roleManager.createRole.do"
				class="pageForm required-validate"
				id="createRoleForm">
				<div id="container-panel" style="overflow: auto;">
					<fieldset class="common-form" data-gp="info" prefix="" id="info_fs">
						<table class="form" width="300">
							<tbody>
								<!-- UserCode -->
								<tr>
									<th><label class="form-field">角色名</label></th>									
                                     <td colspan="3"><input type="text" id="innerUserCode" name="roleInfo.roleName"
										value="" class="required" minlength="2" maxlength="10"
										onblur="checkRoleCode(this);" >
								
										<label><img src=""	class="userCodeCheckIcon" id="roleCheckIcon" style="display: inline;"></label> 
									</td>									
								</tr>
							</tbody>
							<tbody>
								<!-- FirstName & LastName -->
								<tr>
									<th>角色描述</th>
									<td><input type="text" name="roleInfo.roleDesc"></td>
								</tr>
								<!-- <tr>
									<th>所属系统</th>
									<td> 
									   <select name="roleInfo.roleType">
									       <option value="1">操盘</option>
									       <option value="2">数据中心</option>
									       <option value="3">管理中心</option>
									   </select>
									</td>
								</tr> -->
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
var checkCode = '1';
function checkRoleCode(obj){
  var code = $(obj).val();
  if(code == checkCode){
   return false;
  }
  $.ajax({
	async:false,
	type : "get",
	url :   "${ctx}/core/roleManager.checkRoleName.do",
	data : {"roleInfo.roleName":code},
	cache : false,
	contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
	success : function(json) {
		if(json.statusCode != "200"){
			alertMsg.error('存在相同角色名称，请修改！');
			$("#roleCheckIcon").attr("src", "${ctx}/images/rong.png");//
			$("#createRoleForm").attr("illegal", true);
			checkCode = code;
			$(obj).focus();
		}else{
			$("#roleCheckIcon").attr("src", "${ctx}/images/right.png");//rong.png
			$("#createInnerUserForm").removeAttr("illegal");
		}
	}
  });
}

</script>
		</div>
</body>
</html>
