<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/content/public/dhead.jsp" %>
<div id="jbsxBoxStudentList" class="unitBox">
<div class="pageHeader">
	<form rel="pagerForm" id="pagerForm" onsubmit="return divSearch(this,'jbsxBoxStudentList');" action="${ctx}/student/studentList.do" method="post">
	<input type="hidden" name="pageNum" value="1" /> 
	<div class="searchBar">
		<ul class="searchContent">
			<li>
				<label>姓名：</label>
				<input id="stuName" type="text" name="stuName" value=""/>
			</li>
			<li><input type="submit" onclick="return uu();" value="检索"></li>
		</ul>	
	</div>
	</form>
	<div class="panelBar">
		<ul class="toolBar">
			<li class=""><a class="add" href="${ctx}/student/toAddStuPage.do?pageNum=${pageBean.currentPage}" target="dialog" mask="true" title="新增朋友"><span>添加</span></a></li>
			<li class="line">line</li>
		</ul>
	</div>
</div>

<div class="pageContent">    
	
	<%-- <div class="panelBar">
		<ul class="toolBar">
			<li><a class="add" href="${ctx}/core/userManager.initCreateUser.do"  width="650" height="300" target="dialog" mask="true" title="新增内部用户" ><span>添加</span></a></li>
		</ul>
	</div> --%>

	<div id="w_list_print">
	<table id="test" class="form" width="100%" layoutH="90" targetType="navTab">
		<thead>
			<tr>
				<th>姓名</th>
				<th>年龄</th>
				<th>性别</th>
				<th>修改</th>
				<th>删除</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${stuList }" var="stu">
			  <tr>
			    <td>${stu.stuName }</td>
			    <td>
				    <c:choose>
					    <c:when test="${stu.sex == 1 }">
					    	男
					    </c:when>
					    <c:when test="${stu.sex == 2}">
					    	女
					    </c:when>
				    </c:choose>
			    </td>
			    <td>${stu.age }</td>
			    <td>
			    	<a  class="common-img"
					    href="${ctx}/student/toUpdateStuPage.do?id=${stu.id }&pageNum=${pageBean.currentPage}" 
					    target="dialog" mask="true" title="修改${stu.stuName }信息">
					   <img alt="修改" src="${ctx}\images\edit.png">
					</a>
			    </td>
			    <td><a onclick="delStu('${stu.id }')" class="f1">删除</a></td>
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
	  alert(1);
	  if($("#stuName").val() == ""){
		  alert("请输入姓名进行检索");
		  $("#test tbody").html("");
		  return false;
	  }
  }
  
  function delStu(id){
	  if(!confirm("确认要删除信息吗")){
		  return ;
	  }
	  $.ajax({
			async:false,
			type : "get",
			url :   "${ctx}/student/delStu.do",
			data : {"id":id},
			cache : false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
			success : function(json) {
				navTab.reload();
			}
	   });
  }
</script>
