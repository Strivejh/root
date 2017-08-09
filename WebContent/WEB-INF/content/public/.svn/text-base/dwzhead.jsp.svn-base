<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<link href="${ctx}/content/themes/default/style.css" rel="stylesheet" type="text/css" media="screen"/>
<link href="${ctx}/content/themes/css/core.css" rel="stylesheet" type="text/css" media="screen"/>
<link href="${ctx}/content/themes/css/print.css" rel="stylesheet" type="text/css" media="print"/>

<script src="${ctx}/content/js/jquery.cookie.js" type="text/javascript"></script>
<script src="${ctx}/content/js/jquery.validate.js" type="text/javascript"></script>
<script src="${ctx}/content/bin/dwz.min.js" type="text/javascript"></script>

<script src="${ctx}/content/js/dwz.regional.zh.js" type="text/javascript" id="validateScript"></script>
<script>
var ajaxbg;
$(function(){
	DWZ.init("${ctx}/content/dwz.frag.xml", {
		loginUrl:"${ctx}/login_dialog.jsp", loginTitle:"登录",	// 弹出登录对话框
		statusCode:{ok:200, error:300, timeout:301}, //【可选】
		pageInfo:{pageNum:"pageNum", numPerPage:"numPerPage", orderField:"orderField", orderDirection:"orderDirection"}, //【可选】
		debug:false,	// 调试模式 【true|false】
		callback:function(){
			initEnv();
			$("#themeList").theme({themeBase:"${ctx}/content/themes"}); // themeBase 相对于index页面的主题base路径
			
			ajaxbg = $("#background,#progressBar");
		}
	});	
});

</script>