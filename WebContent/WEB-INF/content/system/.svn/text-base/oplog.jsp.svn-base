<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/content/public/dhead.jsp" %>
<div id="oplog" class="unitBox">
<div class="pageHeader">
	<form rel="pagerForm" id="pagerForm" onsubmit="return divSearch(this,'oplog');" action="${ctx}/core/oplog.initOplog.do" method="post">
	<input type="hidden" name="pageNum" value="1" /> 
	<div class="searchBar" >
		<table class="searchContent">					
			<tr>
				<td>
				<%--
					模块：
					<select name="param.model">
						<option value="">全部</option>
						<option value="1">注单</option>
						<option value="2">赛事</option>
						<option value="3">系统设置</option>
					</select>&nbsp;&nbsp;&nbsp;&nbsp;
					联赛：<select name="param.leagueid"><option value="">选择联赛</option></select>&nbsp;&nbsp;&nbsp;&nbsp;
					赛事：<select name="param.matchid"><option value="">选择赛事</option></select>&nbsp;&nbsp;&nbsp;&nbsp;
				 --%>
					时间段：
					<input type="text" value="${requestScope.param.starttime}" style="width:130px;" class="date" name="param.starttime" dateFmt="yyyy/MM/dd HH:mm:ss" >
					<span class="limit">-</span>
					<input type="text" value="${requestScope.param.endtime }" style="width:130px;" class="date" name="param.endtime" dateFmt="yyyy/MM/dd HH:mm:ss" >
					<input type="submit" value="检索">					
				</td>
			</tr>
		</table>		
	</div>
	</form>
</div>

<div class="pageContent">
	<div class="panelBar" >
		<div class="pages">
			<span>共<s:property	value="pageBean.totalRows" />条</span>
		</div>		
		<div class="pagination" targetType="navTab" totalCount="<s:property value="pageBean.totalRows"/>" 
		numPerPage="<s:property value="pageBean.pageSize"/>" pageNumShown="10" currentPage="<s:property value="pageBean.currentPage"/>"></div>

	</div>
	<div id="w_list_print">
	<table border="0" cellspacing="0" cellpadding="0" class="table_1"  width="100%" layoutH="60" targetType="navTab">
		<thead>
		<tr>
			<th width="50">
			ID
			</th>
			<th width="50">
				模块
			</th>
						
			<th>
				操作描述
			</th>
			<th width="80">
				操作者
			</th>
			<th width="180">
				时间
			</th>
		</tr>
		</thead>
		<s:iterator value="oplogList" status="st" >
			<tr>
				<td align="center">
					${id}
				</td>
				<td align="center">
					${model}
				</td>
				
				<td>
					${matchid}->${opdesc}
				</td>
				<td>
					${username}
				</td>
				<td>
					<date:dateTag key="${systime}" format="YYYY-MM-dd hh:mm:ss" />					
				</td>
			</tr>
		</s:iterator>
	</table>
	</div>
</div>
</div>

