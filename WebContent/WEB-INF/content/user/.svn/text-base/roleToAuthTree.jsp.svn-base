<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/content/public/manager.jsp" %>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<div class="pageContent" style="overflow: none">
	<div>
		<div layoutH="60px"
					style="display: block; line-height: 21px; background: #fff">
		 <s:if test="userId>0 || userId==-100">
	       <a rel="toStaffPagejbsxBoxRoleAuth" class="f1"
	              href="${ctx}/core/roleManager.roleRightList.do?roleId=<s:property value="roleId" />&userId=<s:property value="userId" />" 
				  target="ajax">权限查看</a>
         </s:if>
		
		<ul class="tree treeFolder treeCheck expand">
			<s:property value="roleToAuthTree"  escape="false" />
		</ul> 
		</div>
	</div>
	
	<table width="500px">
		<tr>

			<td align="left">
				<dd>
					<div class="buttonActive">
						<div class="buttonContent">
							<button onclick="configAuthToRoleTree();">配置</button>
						</div>
					</div>
				</dd></td>
		</tr>
	</table>  
</div>
<input type="hidden" id="roleToAuthTreeRoleId" value='<s:property value="roleId"/>' name='<s:property value="roleId"/>'>
</body>
</html>
<script type="text/javascript">
	
	function configAuthToRoleTree(){
		//push()/pop()
		var arrs = new Array();
		var ids = '';
		var roles = document.getElementsByName('roleToAuthTree');
		
		for (i = 0; i < roles.length; i++) {
			//alert($(roles[i]).attr("checked"));
			//alert( $(roles[i]).parent().attr("class") == "ckbox checked");
			//if (roles[i].checked) {
			if($(roles[i]).parent().attr("class") == "ckbox checked" || $(roles[i]).parent().attr("class").indexOf("ckbox indeterminate")!=-1){
				ids = ids+"ids="+roles[i].value + "&";
			}
		}
		//ids = ids.substr(0,ids.length-1);
		var roleId = document.getElementById("roleToAuthTreeRoleId").value;
		
		$.ajax({
			type : "post",
			url : "${ctx}/core/roleManager.configRoleRight.do?"+ids+"roleId="+roleId,
			data : "",
			cache : false,
			success : function(msg) {
				alertMsg.correct('权限配置成功！');
			}
		});
	}
	
	
</script>