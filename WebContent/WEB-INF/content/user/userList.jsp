<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/content/public/dhead.jsp" %>
<div id="jbsxBoxUserList" class="unitBox">
<div class="pageHeader">
	<form rel="pagerForm" id="pagerForm" onsubmit="return divSearch(this,'jbsxBoxUserList');" action="${ctx}/user/userList.do" method="post">
	<input type="hidden" name="pageNum" value="1" /> 
	<div class="searchBar">
		<ul class="searchContent">
			<li>
				<label>姓名：</label>
				<input id="name" type="text" name="name" value=""/>
			</li>
			<li><input type="submit" onclick="return uu();" value="检索"></li>
		</ul>		
	</div>
	</form>
	<div class="panelBar">
		<ul class="toolBar">
			<li class=""><a class="add" href="${ctx}/user/toAddUserPage.do?pageNum=${pageBean.currentPage}" target="dialog" mask="true" title="新增用户"><span>添加</span></a></li>
			<li class="line">line</li>
		</ul>
	</div>
</div>

<div class="pageContent">  

	<div id="w_list_print">
	<table id="test" class="form" width="100%" layoutH="90" targetType="navTab">
		<thead>
			<tr>
			<!-- 	<th>#</th> -->
				<!-- <th>姓名</th> -->
				<th>id</th>
				<th>姓名</th>
				<th>账号</th>
				<th>密码</th>
				<th>修改</th>
				<th>删除</th>
				
				
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${userList }" var="user">
			  <tr>
			    <%-- <td>${user.id }</td> --%>
			     <%-- <td>${user.name }</td> --%>
			      <td>${user.id }</td>
			      <td>${user.name }</td>
			      <td>${user.account }</td>
			      <td>${user.pwd }</td>
			       
			      
			      
			      <td>
			    	<a  class="common-img"
					    href="${ctx}/user/toUpdateUserPage.do?id=${user.id }&pageNum=${pageBean.currentPage}" 
					    target="dialog" mask="true" title="修改${user.name }信息">
					   <img alt="修改" src="${ctx}\images\edit.png">
					</a>
			    </td>
			    <td><a onclick="delUser('${user.id }')" class="f1">删除</a></td>
			      
			      
			  </tr>
			</c:forEach>
		</tbody>
	</table>
	</div>
	
	<div class="panelBar" >
		<div class="pages">
			<span>共${pageBean.totalRows}条</span>
		</div>
		
		<div class="pagination" targetType="navTab" totalCount="${pageBean.totalRows}" 
		numPerPage="${pageBean.pageSize}" pageNumShown="${pageBean.pageSize}" 
		currentPage="${pageBean.currentPage}"></div>

	</div>
</div>

<script type="text/javascript">

function uu(){ 
	  if($("#name").val() == ""){
		  alert("请输入姓名进行检索");
		  $("#test tbody").html("");
		  return false;
	  }
}


function delUser(id){
	  if(!confirm("确认要删除信息吗")){
		  return ;
	  }
	  $.ajax({
			async:false,
			type : "get",
			url :   "${ctx}/user/delUser.do",
			data : {"id":id},
			cache : false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
			success : function(json) {
				navTab.reload();
			}
	   });

}


  function changeInnerUserStatus(userId, status, obj){
	  alertMsg.confirm("确认修改状态吗？", {
          okCall: function(){
        	  var showid = userId+"changeInnerStatusDiv"+status;
    		  $("#"+showid).show();
    		  $(obj).parent().hide();
    		  var param = {"userInfo.innerUserId":userId,"userInfo.status":status};
    		  var url = "${ctx}/core/userManager.editUser.do";
    		  $.post(url,param,function(data){
    				
    		  });          
          }
    });
  }
</script>
