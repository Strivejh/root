<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/content/public/manager.jsp" %>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<div class="pageContent" style="overflow: none">
      <s:if test="roleId != -1">
		  <a rel="toStaffPagejbsxBoxRoleAuth" class="f1"
              href="${ctx}/core/roleManager.initRoleRightTree.do?roleId=<s:property value="roleId" />&userId=<s:property value="userId" />" 
			  target="ajax">权限分配</a>
      </s:if>
  
		<table class="form" style="width:100%;overflow: none;">
			<thead>

				<tr>
					<th width="10%">序号</th>
					<th width="15%">权限ID</th>
					<th width="30%">权限名称</th>
					<th width="15%">权限类型</th>
					<th width="35%">权限描述</th>
				</tr>
 
			</thead>
			<tbody id="roleAuthListTbody">
				<s:iterator value="rights"  status="status">
					<tr>
						<td width="10%"><s:property value='#status.index+1' />
						</td>
						<td width="15%"><s:property value='rightId' />
						</td>
						<td width="30%"><s:property value='rightName' />
						</td>
						<td width="15%"><s:if test="sourceType == 1">菜单</s:if><s:else>功能</s:else>
						</td>
						<td width="35%"><s:property value='rightDesc' />
						</td>
					</tr>
				</s:iterator>
				<s:if test="rights.size==0">
				   <tr>
						<td colspan="5">暂无数据
						</td>
						
					</tr>
				</s:if>
			</tbody>
		</table>
</div>
<script type="text/javascript">
</script>