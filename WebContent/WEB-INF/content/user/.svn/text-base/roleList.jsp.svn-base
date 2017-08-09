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
			<div class="panelBar">
				<ul class="toolBar">
					<li><a class="add"  width="330" height="200" href="${ctx}/core/roleManager.initCreateRole.do"  target="dialog" mask="true" title="新增角色" ><span>添加</span></a></li>
				</ul>
			</div>
			<div id="w_list_print">
	<table class="form" width="100%" layoutH="90" targetType="navTab">
		<thead>
			<tr>
				<th>#</th>
				<th>角色名称</th>
				<th>角色类型</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody>
			<s:iterator value="userRoles" id="id" status="status">
					<tr target="sid_user">

						<td align="center">
							<s:property value='#status.index+1' />
						</td>
						<td>
						   ${roleName}
						</td>
						<td>
						   <s:if test="roleType==1">
						         操盘系统
						   </s:if>
						   <s:if test="roleType==2">
						         数据中心
						   </s:if>
						   <s:if test="roleType==3">
						         管理中心
						   </s:if>
						</td>
						<td class="table-icon-cell">
							<a onclick="delRole(<s:property value="roleId" />)" class="f1">删除</a>
							<a href="${ctx}/core/roleManager.initRoleRightTree.do?roleId=<s:property value="roleId" />&userId=-100&type=1" 
							 target="ajax" class="f1" rel="toStaffPagejbsxBoxRoleAuth">授权</a>
						</td>
									
					</tr>
				</s:iterator>
		</tbody>
	</table>
	</div>
		</div>
		<div layoutH="30"
					style="float: left; display: block; overflow: auto; width: 50%; border: solid 1px #CCC; line-height: 21px; background: #fff" id="toStaffPagejbsxBoxRoleAuth">
		</div>
	</div>
	
	
	
</div> 
</body>
</html>
<<script type="text/javascript">
function delRole(rid){
	$.ajax({
		async:false,
		type : "get",
		url :   "${ctx}/core/roleManager.delRole.do",
		data : {"roleId":rid},
		cache : false,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
		success : function(json) {
			navTab.reload();
		}
   });
}
</script>
