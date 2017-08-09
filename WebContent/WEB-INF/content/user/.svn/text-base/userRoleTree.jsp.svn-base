<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/WEB-INF/content/public/manager.jsp" %>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
</head>
<body>

  
<div class="pageContent" >
	<div>
		<div layoutH="30"
					style="float: left; display: block; overflow: auto; width: 49%; border: solid 1px #CCC; line-height: 21px; background: #fff">
			<ul> <s:property value="accountName"/>
			     <a class="f1" rel="toStaffPagejbsxBoxRoleAuth" 
			        href="${ctx}/core/roleManager.roleRightList.do?roleId=-1&userId=<s:property value="userId" />" 
							 target="ajax"  tvalue="<s:property value='roleId' />">已分配权限列表</a></ul>	
			 
			<ul class="tree treeFolder collapse">
				<li><a id="staffRoleTreeAid">角色列表</a>
					<ul id="deleteUl" class="tree treeFolder treeCheck">
						<s:iterator value="userRoles" id="id" status="status">
						<li id="<s:property value='roleid' />">
						<s:if test='distribution == "1"'>
							<a tname="staffToRoleRoleName" checked="true" rel="toStaffPagejbsxBoxRoleAuth" 
							   href="${ctx}/core/roleManager.roleRightList.do?roleId=<s:property value="roleId" />&userId=<s:property value="userId" />" 
							 target="ajax"  tvalue="<s:property value='roleId' />"> <s:property value='roleName' />
						    </a>
						</s:if>
						<s:else>
						   <a tname="staffToRoleRoleName"  rel="toStaffPagejbsxBoxRoleAuth" 
						      href="${ctx}/core/roleManager.roleRightList.do?roleId=<s:property value="roleId" />&userId=<s:property value="userId" />" 
							 target="ajax"  tvalue="<s:property value='roleId' />"> <s:property value='roleName' />
						    </a> 
						</s:else>
						</li>
						</s:iterator>
					</ul>
				</li>
			</ul> 
		</div>
		<div layoutH="30"
					style="float: left; display: block; overflow: auto; width: 50%; border: solid 1px #CCC; line-height: 21px; background: #fff" id="toStaffPagejbsxBoxRoleAuth">
		</div>
	</div>
	
	
	<table width="98%">
			<tr>
				
				<td align="left">
					<dd>
							<div class="buttonActive">
								<div class="buttonContent">
									<button onclick="configStaffToRoleThis();">配置</button>
								</div>
							</div>
						</dd>
				</td>
			</tr>
		</table>
</div>
<a id="myStaffId" name="<s:property value='staffid' />"></a>  
</body>
</html>
<script type="text/javascript">
	
	function configStaffToRoleThis(){
		var arrs = new Array();
		var ids = '';
		var roles = document.getElementsByName('staffToRoleRoleName');
		for (i = 0; i < roles.length; i++) {
			if ($(roles[i]).parent().attr("class") == "ckbox checked") {
				ids = ids + "ids=" +roles[i].value + "&";
				var removeObj = document.getElementById(roles[i].value);
				
				arrs.push(removeObj);
			}
		}
		var userId = '${userId}';
		$.ajax({
			type : "post",
			url : "${ctx}/core/roleManager.userRoleConfig.do?" + ids +"userId="+userId,
			data : "",
			cache : false,
			success : function(msg) {
				alertMsg.correct('角色配置成功！');
			}
		});
		
	}
	
</script>

