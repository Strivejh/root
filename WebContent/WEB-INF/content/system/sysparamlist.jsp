<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/content/public/dhead.jsp" %>
<table class="table_3" width="700">
<thead>
	<tr>
		<th>键</th>
		<th>名称</th>
		<th>值</th>
		<th>描述</th>
	</tr>
</thead>
<tbody>
	<s:iterator id="id" value="spList" status="indexs" >
	<tr>
		<td width="180">${itemKey}</td>
		<td width="150">${itemName}</td>		
		<td width="120">
		<s:if test='itemKey=="watercfg_ratio_src"'>
			<select onchange="changeValue('${itemKey}',this,'${rule}')">
				<option value="lj,hg" <s:if test='value=="lj,hg"'>selected="selected"</s:if>>利记,皇冠</option>
				<option value="hg,lj" <s:if test='value=="hg,lj"'>selected="selected"</s:if> >皇冠,利记</option>
			</select>
		</s:if>		
		<s:else>
			<input type="text" value="${value}" onchange="changeValue('${itemKey}',this,'${rule}')" size="10"><img src="${ctx}\images\right.png" style="display:none;"/>		
		</s:else>		
		</td>
		<td width="250">${itemDesc}</td>
	</tr>
	</s:iterator>
</tbody>
</table>	
<script>
function changeValue(key,obj,rule){
	var value=obj.value;		
	var r=new RegExp(rule);
	if(r.test(value)){		
		var param = {"param.itemKey":key,"param.value":value};
		var url = "${ctx}/core/sysCfg.updParam.do";
		showBack();
		$.post(url,param,function(data){
			hideBack();
			if(data.statusCode==200){
				alertMsg.correct('参数修改成功');
				$(obj).css("border","1px solid #a2bac0");
			}else{
				alertMsg.error('参数修改失败');
			}
		});		
	}else{
		alertMsg.error('参数错误,不符合要求:'+value);
		$(obj).css("border","1px solid red");
	}
	
}
</script>	

