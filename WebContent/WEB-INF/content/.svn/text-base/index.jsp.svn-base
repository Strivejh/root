<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/content/public/head.jsp" %>
<%@include file="/WEB-INF/content/public/dwzhead.jsp" %>
<script type="text/javascript" src="${ctx}/js/jquery.noty.packaged.min.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.noty.template.js"></script>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script>
/**
 * js方法打开页面
 */
function jump(tabid,url,tit,frh,ext){
	navTab.openTab(tabid, url,{title:tit,external:ext});
}


function getMousePoint(ev) {
	// 定义鼠标在视窗中的位置
	var point = {
		x:0,
		y:0
	}; 
	// 如果浏览器支持 pageYOffset, 通过 pageXOffset 和 pageYOffset 获取页面和视窗之间的距离
	if(typeof window.pageYOffset != 'undefined') {
		point.x = window.pageXOffset;
		point.y = window.pageYOffset;
	}
	// 如果浏览器支持 compatMode, 并且指定了 DOCTYPE, 通过 documentElement 获取滚动距离作为页面和视窗间的距离
	// IE 中, 当页面指定 DOCTYPE, compatMode 的值是 CSS1Compat, 否则 compatMode 的值是 BackCompat
	else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
		point.x = document.documentElement.scrollLeft;
		point.y = document.documentElement.scrollTop;
	}
	// 如果浏览器支持 document.body, 可以通过 document.body 来获取滚动高度
	else if(typeof document.body != 'undefined') {
		point.x = document.body.scrollLeft;
		point.y = document.body.scrollTop;
	} 
	// 加上鼠标在视窗中的位置
	point.x += ev.clientX;
	point.y += ev.clientY; 
	// 返回鼠标在视窗中的位置
	return point;
}
function validate(value, obj){
	var reg = /^\d+(?=\.{0,1}\d+$|$)/;
    if(!reg.test(value)){
    	alertMsg.warn('请输入正确数字后重新提交！');
        return false;
    }else{
    	return true;
    }
    return false;
}

var refmatchcount;


function generate(title , content, type, layout, url) {
	//$("#jplayer").jPlayer('play');
    var n = noty({
        text        : content,
        type        : type,
        dismissQueue: true,
        layout      : layout,
        timeout     : false,
        theme       : 'defaultTheme'
    });
}
/* var time = 9;
$(function(){
	inter = setInterval(function() {
		if (time == 0) {
			time = 9;
			getMessage()
		}
		time--;
	}, 1000);
}); */
function getMessage(){
	var requestURI = "${ctx}/core/messages.getUserMessages.do";
	$.getJSON(requestURI, function(resdata){
  		$.each(resdata.data, function(i, item) {   
  			//var param = getContent(item.type, item.messageObject);
  			var type = item.level;
  			//type = 'warning';
  			var title = item.title;
  			//generate(title ,param['content'], type, param['ly'], param['url']);
  			generate(title ,item.content, type, 'bottomRight', item.link);
  		}); 	  		
  	});
}
//注单管理 end
</script>
<title>CRMV1.00</title>
</head>

<body scroll="no">
	<div id="layout">
		<div id="header">
			<div class="headerNav">	
				<ul class="nav">
				  
				
					<li id="switchEnvBox"><a href="#">帐户:${sessionScope.USER_SESSION.userName}</a></li>										
					<li><a  class="common-img" width="400" height="200" href="${ctx}/core/userManager/initChangePwd.do" target="dialog" mask="true" title="修改密码">修改密码</a></li>
					<li><a href="${ctx}\login.jsp">退出</a></li>
				</ul>
				<ul class="themeList" id="themeList">
					<li theme="default"><div class="selected">蓝色</div></li>
					<li theme="green"><div>绿色</div></li>
					<li theme="purple"><div>紫色</div></li>
					<li theme="silver"><div>银色</div></li>
					<li theme="azure"><div>天蓝</div></li>
				</ul>
			</div>

			<!-- navMenu -->
			
		</div>

		<div id="leftside">
			<div id="sidebar_s">
				<div class="collapse">
					<div class="toggleCollapse"><div></div></div>
				</div>
			</div>
			
			<div id="sidebar">
				<div class="toggleCollapse"><h2>主菜单</h2><div>收缩</div></div>
				<div class="accordion" fillSpace="sidebar">	
					<div class="accordionContent">
						<ul class="tree treeFolder">
						<%-- <right:rightTag rightCode="100">
							 <li><a>权限管理</a>
								<ul>
								<right:rightTag rightCode="100001">
									<li><a href="${ctx}/student/studentList.do?pageNum=1" target="navTab" external="false" rel="studentList">学生列表</a></li>
								 </right:rightTag>
								<right:rightTag rightCode="100001">
									<li><a href="${ctx}/user/userList.do?pageNum=1" target="navTab" external="false" rel="listUsers">员工列表</a></li>
								</right:rightTag>
								<right:rightTag rightCode="100001">
									<li><a href="${ctx}/core/userManager.initUserList.do" target="navTab" external="false" rel="initUserList">用户列表</a></li>
								</right:rightTag>
								<right:rightTag rightCode="100002">
								    <li><a href="${ctx}/core/userManager.initUserRole.do?&type=roleList" target="navTab" external="false" rel="initUserRole">角色列表</a></li>
								</right:rightTag>
								<right:rightTag rightCode="100003">
									<li><a href="${ctx}/core/roleManager.initRightTree.do?type=1" target="navTab" external="false" rel="initRightTree">权限列表</a></li>
								 </right:rightTag>
								</ul>
							</li>
						</right:rightTag>
							
							<right:rightTag rightCode="103">	
							<li><a>系统管理</a>
								<ul>
								<right:rightTag rightCode="103003">										
									<li><a href="${ctx}/content/system.syscfg.do" target="navTab" external="false" rel="xtgl">系统设置</a></li>
								</right:rightTag>
								<right:rightTag rightCode="103005">
								    <li><a href="${ctx}/core/oplog.initOplog.do" target="navTab" external="false" rel="xtgl">操作日志</a></li>
								</right:rightTag>
								</ul>
							</li>
							</right:rightTag>		 --%>				
						</ul>
					</div>					
				</div>
			</div>
		</div>
		<div id="container">
			<div id="navTab" class="tabsPage">
				<div class="tabsPageHeader">
					<div class="tabsPageHeaderContent"><!-- 显示左右控制时添加 class="tabsPageHeaderMargin" -->
						<ul class="navTab-tab">
							<li tabid="main" class="main"><a href="javascript:;"><span><span class="home_icon">首页</span></span></a></li>
						</ul>
					</div>
					<div class="tabsLeft">left</div><!-- 禁用只需要添加一个样式 class="tabsLeft tabsLeftDisabled" -->
					<div class="tabsRight">right</div><!-- 禁用只需要添加一个样式 class="tabsRight tabsRightDisabled" -->
					<div class="tabsMore">more</div>
				</div>
				<ul class="tabsMoreList">
					<li><a href="javascript:;">首页</a></li>
				</ul>
				<div class="navTab-panel tabsPageContent layoutBox">
					<div class="page unitBox">											
						<div style="width:100%;position: absolute;top:0px;left:0" layoutH="5">							
						<%-- 	<%@include file="../system/welcome.jsp" %>  --%>
						</div>
							
					</div>
				</div>
			</div>
		</div>

	</div>
<!-- 
	<div id="footer">提示消息...</div> -->
</body>
</html>