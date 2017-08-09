<!-- dwz内嵌页面专用head,与原来通用head区分开来，防止css冲突 -->
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%> 
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib uri="/WEB-INF/tld/i18n.tld" prefix="i18n" %>
<%@taglib uri="/WEB-INF/tld/dict.tld" prefix="dict" %>
<%@taglib uri="/WEB-INF/tld/date.tld" prefix="date" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<script>
$.ajaxSettings.traditional = true;
function profit(num){
	if(num>0){
		return "<b class='blue'>"+num+"</b>";
	}else if(num<0){
		return "<b class='red'>"+num+"</b>";
	}else{
		return "<b>"+num+"</b>";
	}
}
</script>