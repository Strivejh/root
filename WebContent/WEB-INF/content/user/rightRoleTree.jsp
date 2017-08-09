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
			<ul class="tree treeFolder treeCheck expand">
				<li><a id="staffRoleTreeAid">角色列表</a>
					<ul>
						<s:iterator value="roles" id="id" status="status">
						<li id="<s:property value='roleid' />">
						<s:if test='distribution == "1"'>
							<a tname="rightToRoleRoleName" checked="true" tvalue="<s:property value='roleId' />"> ${roleName}
						    </a>
						</s:if>
						<s:else>
						   <a tname="rightToRoleRoleName"  tvalue="<s:property value='roleId' />"> ${roleName}
						    </a> 
						</s:else>
						</li>
						</s:iterator>
					</ul>
				</li>
			</ul> 
	</div>
	<table width="98%">
			<tr>
				
				<td align="left">
					<dd>
							<div class="buttonActive">
								<div class="buttonContent">
									<button onclick="configRightToRoleThis();">配置</button>
								</div>
							</div>
						</dd>
				</td>
			</tr>
		</table>
</div>
</body>
</html>
<script type="text/javascript">
	
	function configRightToRoleThis(){
		var arrs = new Array();
		var ids = '';
		var roles = document.getElementsByName('rightToRoleRoleName');
		for (i = 0; i < roles.length; i++) {
			if ($(roles[i]).parent().attr("class") == "ckbox checked") {
				ids = ids + "ids=" +roles[i].value + "&";
				var removeObj = document.getElementById(roles[i].value);
				
				arrs.push(removeObj);
			}
		}
		var rightId = '${rightId}';
		//alert(rightId+"::"+ids);
		$.ajax({
			type : "post",
			url : "${ctx}/core/roleManager.rightRoleConfig.do?" + ids +"rightId="+rightId,
			data : "",
			cache : false,
			success : function(msg) {
				alertMsg.correct('权限配置成功！');
			}
		});
		
	}
	
</script>

