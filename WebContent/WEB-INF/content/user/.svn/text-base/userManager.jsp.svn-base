<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/content/public/dhead.jsp" %>
<div id="jbsxBoxUsermnager" class="unitBox">
<div class="pageHeader">
	<form rel="pagerForm" id="pagerForm" onsubmit="return divSearch(this,'jbsxBoxUsermnager');" action="${ctx}/core/userManager.initUserList.do" method="post">
	<input type="hidden" name="pageNum" value="1" /> 
	<div class="searchBar">
		<ul class="searchContent">
			<li>
				<label>登录名：</label>
				<input type="text" name="param.loginName" value="<s:property value='param.loginName' />"/>
			</li>
			<li><input type="submit" value="检索"></li>
		</ul>		
	</div>
	</form>
</div>

<div class="pageContent">    
	
	<div class="panelBar">
		<ul class="toolBar">
			<li><a class="add" href="${ctx}/core/userManager.initCreateUser.do"  width="650" height="300" target="dialog" mask="true" title="新增内部用户" ><span>添加</span></a></li>
		</ul>
	</div>

	<div id="w_list_print">
	<table class="form" width="100%" layoutH="90" targetType="navTab">
		<thead>
			<tr>
				<th>#</th>
				<th>登录名</th>
				<th>用户名称</th>
				<th>修改</th>
				<th>权限分配</th>
				<th>重置密码</th>
				<th>状态</th>
				<th>账户类型</th>
				<th>新增日期</th>
				<th>最后登录时间</th>
			</tr>
		</thead>
		<tbody>
			<s:iterator value="innusers" id="id" status="status">
					<tr target="sid_user" rel="<s:property value='innerUserId' />">

						<td align="center">
							<s:property value='#status.index+1' />
						</td>
						<td>
						   <s:property value='loginName' />
						</td>
						<td>
						   <s:property value='userName' />
						</td>
						<td class="table-icon-cell">
							<a  class="common-img" width="330" height="200"
							    href="${ctx}/core/userManager.initEditUser.do?accountName=<s:property value='accountName' />&userId=<s:property value='innerUserId' />" 
							    target="dialog" mask="true" title="<s:property value='loginName' />-修改信息">
							   <img alt="修改" src="${ctx}\images\edit.png">
							</a>
						</td>
						<td class="table-icon-cell">
							<a  class="common-img" 
							    href="${ctx}/core/userManager.initUserRole.do?accountName=<s:property value='loginName' />&userId=<s:property value='innerUserId' />&type=userRoleTree" 
							    target="navTab" rel="userManager.initUserRole" title="<s:property value='loginName' />-分配角色">
							   <img alt="<s:property value='loginName' />-分配角色" src="${ctx}\images\edit.png">
							</a>
						</td>
						<td class="table-icon-cell"> 
						   <a  class="common-img" width="400" height="200"
								    href="${ctx}/core/userManager.initChangePwd.do?accountName=<s:property value='loginName' />&userId=<s:property value='innerUserId' />" 
								    target="dialog" mask="true" title="<s:property value='loginName' />-修改密码">
						     <img alt="修改" src="${ctx}\images\lock.png" class="common-img">
						  </a>
						</td>
						<td> 
						    <s:if test="status==1">
						        <div id="<s:property value='innerUserId' />changeInnerStatusDiv1">
						                              正常
						         <a class="f1" onclick="changeInnerUserStatus(<s:property value='innerUserId' />, 2 ,this)">停用</a>
						        </div>
						      <div id="<s:property value='innerUserId' />changeInnerStatusDiv2"  style="display: none;">
						                             停用
						         <a class="f1" onclick="changeInnerUserStatus(<s:property value='innerUserId' />, 1 ,this)">启用</a>
						      </div>
						    </s:if>
						    
						    <s:elseif test="status==2">
						       <div id="<s:property value='innerUserId' />changeInnerStatusDiv2">
						                             停用
						         <a class="f1" onclick="changeInnerUserStatus(<s:property value='innerUserId' />, 1 ,this)">启用</a>
						       </div>
						       
						       <div id="<s:property value='innerUserId' />changeInnerStatusDiv1" style="display: none;">
						                              正常
						         <a class="f1" onclick="changeInnerUserStatus(<s:property value='innerUserId' />, 2 ,this)">停用</a>
						        </div>
						     
						    </s:elseif>
						</td>						
						<td> 
							<dict:dictTag controlType="3" dictType="inneruser_bsys" showI18n="false" showTip="false" selectValue="${boundsys}" />
						</td>
						
						<td>
							<date:dateTag key="${createDate}" format="yyyy-MM-dd hh:mm:ss" /><br>
						</td>
						<td>
							<date:dateTag key="${loginDate}" format="yyyy-MM-dd hh:mm:ss" /><br>
						</td>						
					</tr>
				</s:iterator>
		</tbody>
	</table>
	</div>
	
	<div class="panelBar" >
		<div class="pages">
			<span>共<s:property	value="pageBean.totalRows" />条</span>
		</div>
		
		<div class="pagination" targetType="navTab" totalCount="<s:property value="pageBean.totalRows"/>" 
		numPerPage="<s:property value="pageBean.pageSize"/>" pageNumShown="<s:property value="pageBean.pageSize"/>" 
		currentPage="<s:property value="pageBean.currentPage"/>"></div>

	</div>
</div>

<script type="text/javascript">

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
