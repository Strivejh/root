<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/content/public/head.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<!-- CSS goes in the document HEAD or added to your external stylesheet -->
<style type="text/css">

</style>
<title>内存数据</title>
</head>
<body>
<div class="b_frame" style="wdith:100%;padding-left:10px;">
联赛:leagueMap=<span id="leaguenum">${leagueMapCount}</span><br/>
赛事:matchInfoMap=<span id="matchnum1">${matchInfoMapCount}</span>&nbsp;&nbsp;&nbsp;&nbsp;gameListOfMatch=<span id="matchnum2">${gameListOfMatchCount}</span><br/>
游戏:gameMap=<span id="gamenum1">${gameMapCount}</span>&nbsp;&nbsp;&nbsp;&nbsp;tradeItemListOfGame=<span id="gamenum2">${tradeItemListOfGameCount}</span><br/>
交易项:tradeItemMap=<span id="tradeItemnum">${tradeItemMapCount}</span><br/>
</div>
<div>
================盘中=========<br/>
<s:iterator value="footballCache.matchRealMap">
	${key}---->${value} <br/>
</s:iterator>
</div>
</body>
</html>
