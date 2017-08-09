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
			<ul class="tree treeFolder expand">
				所属系统
									
									   <select onchange="changeSys(this)" initVal="${type}" id="changeAuthTreeSys">
									       <option value="1">操盘</option>
									       <option value="2">数据中心</option>
									       <option value="3">管理中心</option>
									   </select>
				<s:property value="roleToAuthTree"  escape="false" />
			</ul> 
		</div>
		<div layoutH="30"
					style="float: left; display: block; overflow: auto; width: 50%; border: solid 1px #CCC; line-height: 21px; background: #fff" id="authJbsxBox">
		</div>
	</div>
	
	
</div>
</body>
</html>
<script type="text/javascript">
$(function(){
	$("#changeAuthTreeSys").val($("#changeAuthTreeSys").attr("initVal"));
});
function changeSys(obj){
	navTab.reload("${ctx}/core/roleManager.initRightTree.do?type="+$(obj).val());
}
</script>
