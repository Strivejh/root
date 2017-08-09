var HashMap=function(){this.length=0;this.maxLength=Number.MAX_VALUE;this.container={};};HashMap.prototype.put=function(b,a){try{if(this.length>=this.maxLength){throw new Error("[Error HashMap] : Map Datas' count overflow !");}if(a&&b&&b!=""){this.container[b]=a;this.length++;}}catch(c){return c;}};HashMap.prototype.get=function(a){try{if(this.container[a]){return this.container[a];}}catch(b){return b;}};HashMap.prototype.contains=function(a){try{for(var c in this.container){if(this.container[c]===a){return true;}}return false;}catch(b){return b;}};HashMap.prototype.remove=function(a){try{if(this.container[a]){delete this.container[a];this.length--;}}catch(b){return b;}};HashMap.prototype.pop=function(b){try{var a=this.container[b];if(a){delete this.container[b];this.length--;return a;}return null;}catch(c){return c;}};HashMap.prototype.removeAll=function(){try{this.clear();}catch(a){return a;}};HashMap.prototype.clear=function(){try{delete this.container;this.container={};this.length=0;}catch(a){return a;}};HashMap.prototype.isEmpty=function(){if(this.length===0){return true;}else{return false;}};HashMap.prototype.runIn=function(a){try{if(!a){throw new Error("[Error HashMap] : The paramer is null !");}for(var d in this.container){var b=this.container[d];a(b);}}catch(c){return c;}};;
(function(c){var a=new Array("00","33","66","99","CC","FF");var b=new Array("FF0000","00FF00","0000FF","FFFF00","00FFFF","FF00FF");c.fn.colorpicker=function(e){var f=jQuery.extend({},jQuery.fn.colorpicker.defaults,e);d();return this.each(function(){var g=c(this);g.bind(f.event,function(){var m=c(this).offset().top;var n=c(this).height();var h=c(this).offset().left;c("#colorpanel").css({top:m+n+5,left:h}).show();var o=f.target?c(f.target):g;if(o.data("color")==null){o.data("color",o.css("color"));}c("#_creset").bind("click",function(){o.css("color",o.data("color"));c("#colorpanel").hide();f.reset(g);});c("#CT tr td").unbind("click").mouseover(function(){var p=c(this).css("background-color");c("#DisColor").css("background",p);c("#HexColor").val(c(this).attr("rel"));}).click(function(){var q=c(this).css("background");var p=f.ishex?c(this).attr("rel"):q;if(f.fillcolor){o.val(p);}o.css("color",q);c("#colorpanel").hide();c("#_creset").unbind("click");f.success(g,p);}).blur(function(){c("#colorpanel").hide();c("#_creset").unbind("click");});});});function d(){c("body").append('<div  onblur="hideColor(this)" id="colorpanel" style="z-index:900; position:fixed!important; position:absolute;  background:#000;display:none;"></div>');var g="";var h="";for(i=0;i<2;i++){for(j=0;j<6;j++){g=g+"<tr height=12>";g=g+'<td width=11 rel="#000000" style="background-color:#000000">';h=i==0?a[j]+a[j]+a[j]:b[j];g=g+'<td width=11 rel="#'+h+'" style="background-color:#'+h+'">';g=g+'<td width=11 rel="#000000" style="background-color:#000000">';for(k=0;k<3;k++){for(l=0;l<6;l++){h=a[k+i*3]+a[l]+a[j];g=g+'<td width=11 rel="#'+h+'" style="background-color:#'+h+'">';}}}}g='<table width=253 border="0" cellspacing="0" cellpadding="0" style="border:1px solid #000;"><tr height=30><td colspan=21 bgcolor=#cccccc><table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse"><tr><td width="3"><td><input type="text" id="DisColor" size="6" disabled style="border:solid 1px #000000;background-color:#ffff00"></td><td width="3"><td><input type="text" id="HexColor" size="7" style="border:inset 1px;font-family:Arial;" value="#000000"><a href="javascript:void(0);" id="_cclose">关闭</a> | <a href="javascript:void(0);" id="_creset">清除</a></td></tr></table></td></table><table id="CT" border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse" bordercolor="000000"  style="cursor:pointer;">'+g+"</table>";c("#colorpanel").html(g);c("#_cclose").live("click",function(){c("#colorpanel").hide();return false;}).css({"font-size":"12px","padding-left":"20px"});}};jQuery.fn.colorpicker.defaults={ishex:true,fillcolor:false,target:null,event:"click",success:function(){},reset:function(){}};})(jQuery);function hideColor(a){$(a).hide();};
function MM_findObj(f,e){var c,b,a;if(!e){e=document;}if((c=f.indexOf("?"))>0&&parent.frames.length){e=parent.frames[f.substring(c+1)].document;f=f.substring(0,c);}if(!(a=e[f])&&e.all){a=e.all[f];}for(b=0;!a&&b<e.forms.length;b++){a=e.forms[b][f];}for(b=0;!a&&e.layers&&b<e.layers.length;b++){a=MM_findObj(f,e.layers[b].document);}if(!a&&e.getElementById){a=e.getElementById(f);}return a;}function MM_showHideLayers(){var c,e,a,d,b=MM_showHideLayers.arguments;for(c=0;c<(b.length-2);c+=3){if((d=MM_findObj(b[c]))!=null){a=b[c+2];if(d.style){d=d.style;a=(a=="show")?"visible":(a=="hide")?"hidden":a;}d.visibility=a;}}}function getCookie(c){var b=c+"=";var a=document.cookie;if(a.length>0){begin=a.indexOf(b);if(begin!=-1){begin+=b.length;end=a.indexOf(";",begin);if(end==-1){end=a.length;}return a.substring(begin,end);}}return null;}function writeCookie(c,d){var b="";var a=365;b=new Date((new Date()).getTime()+a*3600000);b=";path=/;expires="+b.toGMTString();document.cookie=c+"="+d+b;}function pop(){try{oPopup.show(x,y,imagewidth,imageheight);startani_A=setTimeout("pop()",300);if(pop_TC<0){dismisspopup();}pop_TC=pop_TC-1;}catch(a){}}function dismisspopup(){clearTimeout(startani_A);oPopup.hide();}function showgoallist(a){var c;try{if(Config.language==0){c="http://bf.bet007.com/detail/"+a+"cn.htm";}else{c="http://bf.bet007.com/detail/"+a+".htm";}}catch(b){if(location.href.split("_").length==2){c="http://bf.bet007.com/detail/"+a+"cn.htm";}else{c="http://bf.bet007.com/detail/"+a+".htm";}}window.open(c,"","");}function analysis(a){var c;try{if(Config.language==0){c="http://news.bet007.com/analysis/"+a+"cn.htm";}else{c="http://news.bet007.com/analysis/"+a+".htm";}}catch(b){if(location.href.split("_").length==2){c="http://news.bet007.com/analysis/"+a+"cn.htm";}else{c="http://news.bet007.com/analysis/"+a+".htm";}}window.open(c);}function AsianOdds(a){var b="http://vip.bet007.com/AsianOdds_n.aspx?id="+a;window.open(b);}function EuropeOdds(a){var b="http://1x2.bet007.com/oddslist/"+a+".htm";window.open(b);}function TeamPanlu_10(a){var b="http://bf.bet007.com/panlu/"+a+".htm";window.open(b,"","width=640,height=700,top=10,left=100,resizable=yes,scrollbars=yes");}function advices(a){var b="http://article.bet007.com/UserWeb/LiveInformation.aspx?ID="+a;window.open(b);}var zXml={useActiveX:(typeof ActiveXObject!="undefined"),useXmlHttp:(typeof XMLHttpRequest!="undefined")};zXml.ARR_XMLHTTP_VERS=["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.3.0"];function zXmlHttp(){}zXmlHttp.createRequest=function(){if(zXml.useXmlHttp){return new XMLHttpRequest();}if(zXml.useActiveX){if(!zXml.XMLHTTP_VER){for(var a=0;a<zXml.ARR_XMLHTTP_VERS.length;a++){try{new ActiveXObject(zXml.ARR_XMLHTTP_VERS[a]);zXml.XMLHTTP_VER=zXml.ARR_XMLHTTP_VERS[a];break;}catch(b){}}}if(zXml.XMLHTTP_VER){return new ActiveXObject(zXml.XMLHTTP_VER);}}alert("对不起，您的电脑不支持 XML 插件，请安装好或升级浏览器。");};;;

function selectCpMatch(){
$("#unmyss").children("tr").each(function(){
if($(this).attr("cpId") && $(this).attr("cpId").indexOf("20")>-1){
$(this).show();
}else{
$(this).hide();
}
    });
}
function shakeScore(ele,cls,times){           
    var i = 0,t= false ,o =ele.attr("class")+" ",c ="";
    if(t){clearInterval(t); return;}
    t= setInterval(function(){
        i++;
        c = i%2 ? o+cls : o;
        ele.attr("class",c);
        if(i>=times){
	        clearInterval(t);
	        ele.removeClass(cls);
        }
    },400);
 }; 
 function selectMatch4Level(level){
$("#dataTable").find("tr").each(function(){

if($(this).attr("isData") && $(this).attr("llevel") == level){
$(this).show();
}else if($(this).attr("isData") && $(this).attr("llevel") != level){
$(this).hide();
if($(this).next().is(":visible")){
$(this).children("td:eq(7)").children("a:eq(0)").click();
}
}
    });

}

 function findMatch(obj){
     var keyWord= $.trim($("#matchSelect").val());
     var allLeagueUL = $("#allLeagueUL");
     var allLi = $("#allLeagueUL").children("li");
     var lisnum = allLi.length;
     if(keyWord == '' || keyWord==null){
         alert('请输入搜索关键字！');
         return;
     }
     $("input[name='checkmatchLi']").each(function(){
         this.checked = false;
     });
     for (var i = 0; i < lisnum; i++) {
         var thisLi = $(allLi[i]);
         var thisCheck = thisLi.children("input:eq(0)");
         if(thisCheck.val().indexOf(keyWord)>-1){
 thisLi.insertBefore($("#allLeagueUL").children("li:eq(0)"));
 $("#allLeagueUL").children("li:eq(0)").attr("style", $("#allLeagueUL").children("li:eq(0)").attr("style")+"border: 1px solid #00ff00;");
         }
     }
     return;
 }
 function clearFindMatch(obj){
     $("#matchSelect").val('');
     return;
 }
 function changeThisColor(obj, co){
$(obj).css("background-color", co);
 }
function closeAllAnalysis(){
 var allTr = $("#dataTable").find("tr");
       var trsnum = allTr.length;
       for (var i = 0; i < trsnum; i++) {
       var thisTr = $(allTr[i]);
       var isData = thisTr.attr("isData");
       var isStart = thisTr.attr("isStart");
       if (isData != undefined && isData == 'true') {
                 if(thisTr.next().is(":visible")){
   thisTr.children("td:eq(7)").children("a:eq(0)").click();
  }
            };
        }
}
function SelectAll(value) {
    var i, inputs;
    inputs = document.getElementById("myleague").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "checkbox") continue;
        inputs[i].checked = value;
    }
}

function thirdBetRef(obj){
     allMatchRef();
}

var matchnames='';
function selectMatch(){
	$("#Layer2").empty().append(
	'<div class="sotit" style="width:940px;"><span id="title_span" class="title">赛事选择</span><span style="float: right;"><img alt="关闭" src="${ctx}/images/expectedAll/cc.gif" style="cursor:pointer;" onclick="MM_showHideLayers(\'Layer2\',\'\',\'hide\')"></span></div>'
            +'<div class="rbl" id="rbl_div">'
            +'<input name="selectType" id="rb4" value="4" onclick="selectMatchByMatchState(4)" type="radio"><label for="rb4">滚球赛事</label>'
			+'<input name="selectType" id="rb3" value="3" onclick="selectMatchByMatchState(3)" type="radio"><label for="rb3">未开场　</label>'
			+'<input id="matchSelect"><input type="button" onclick="findMatch(this)" value="搜索"><input type="button" onclick="clearFindMatch(this)" value="清除">'
            +'</div>'
            +'<div class="font12" id="myleague" style="">'
                +'<ul id="allLeagueUL">'
                +'</ul>'
            +'</div>'
            +'<div class="bts" id="bts_div">'
            	 +'<input value="全选" onclick="SelectAll(true)" type="button">' 
			     +'<input value="全不选" onclick="SelectAll(false)" type="button">'
			     +'<input value="确定" onclick="SelectMatchOK(1)" type="button">'	
			    +'<input value="关闭" onclick="MM_showHideLayers(\'Layer2\',\'\',\'hide\')" type="button">'
            +'</div>');
	
    var all = $("#dataTable").find("tr");
    var llen = all.length;
    $("#matchSelect").val('');
    var allpknum = 0;
    var allLeagueUL = $("#allLeagueUL");
   
    allLeagueUL.empty();

    for(var i=1;i<llen;i++){
        if($(all[i]).attr("id") == undefined){
            continue;
        }
		if($(all[i]).attr("mname") == undefined){
			continue;
		}
        var did = $(all[i]).attr("id").toString();
        var dt = '';
	    
        var lname = $(all[i]).attr("mname").toString();
        var showname = lname.replace(" ", "").replace(" ", "");
        var liveImg='';
        var isStart = $(all[i]).attr("isStart").toString();
        var bcolor = "#ffffff";
        var fcolor = "#808000";
        if(isStart == '4'){
            liveImg = '<img title="滚球"  src="${ctx}/images/expectedAll/live.gif" style="height: 15px;width: 15px">';
            bcolor = "#be4441;";
            fcolor = "#ffffff;"
        }else{
			dt = $(all[i]).children("td:eq(2)").html();
		}
        
        //var tinum =  $(all[i]).children("tr").length;
        //allpknum += tinum;
        matchnames = $.cookie("expSelectMatch");
        if(matchnames == undefined)matchnames = "";
        if(isStart == '4'){
            if (showname.length > 15) {
                showname = showname.substr(0, 15) + "...";
            }
            if((matchnames.indexOf(lname)>-1 || matchnames=='')){
                allLeagueUL.append('<li isMatchStart="4"  style="background-color:'+bcolor+'color:'+fcolor+';width: 220;overflow-x:auto;" title="' + lname + '">' + '<input checked="checked" name="checkMatch" onclick="checkedMatchLi(this,"#f8f5f5")" id="myleague_' + i + '" value="' + lname + '" type="checkbox">' + '<label style="cursor:pointer" for="myleague_' + i + '">' + showname + '</label>' +liveImg + '</li>');
            }else{
                allLeagueUL.append('<li isMatchStart="4"  style="background-color:'+bcolor+'color:'+fcolor+';width: 220;overflow-x:auto;" title="' + lname + '">' + '<input name="checkMatch" onclick="checkedMatchLi(this,"#f8f5f5")" id="myleague_' + i + '" value="' + lname + '" type="checkbox">' + '<label style="cursor:pointer" for="myleague_' + i + '">' + showname + '</label>' +liveImg + '</li>');
            }
        }else if(isStart == '3'){
            if (showname.length > 10) {
                showname = showname.substr(0, 10) + "...";
            }
            if((matchnames.indexOf(lname)>-1)){
                allLeagueUL.append('<li isMatchStart="3"  style="background-color:'+bcolor+'color:'+fcolor+';width: 220;overflow-x:auto;" title="' + lname + '">' + '<input checked="checked" name="checkMatch" onclick="checkedMatchLi(this,"#f8f5f5")" id="myleague_' + i + '" value="' + lname + '" type="checkbox">' + '<label style="cursor:pointer" for="myleague_' + i + '">' + showname +dt+'</label>'  +liveImg + '</li>');
            }else{
                allLeagueUL.append('<li isMatchStart="3"  style="background-color:'+bcolor+'color:'+fcolor+';width: 220;overflow-x:auto;" title="' + lname + '">' + '<input  name="checkMatch" onclick="checkedMatchLi(this,"#f8f5f5")" id="myleague_' + i + '" value="' + lname + '" type="checkbox">' + '<label style="cursor:pointer" for="myleague_' + i + '">' + showname +dt+'</label>'  +liveImg + '</li>');
            }
        }
    }
    MM_showHideLayers('Layer2', '', 'show', 'Layer3', '', 'hidden');
}

function SelectMatchOK(bu){
    var ls = '';
    $("input[name='checkMatch']").each(function(){
        if ($(this).attr("checked")) {
            ls += $.trim($(this).val());
        }
    });
    matchnames = ls;
    var all = $("#dataTable").find("tr");
    var llen = all.length;
    for(var i=1;i<llen;i++){
        var lname = $(all[i]).attr("mname");
        lname = $.trim(lname);
        if(ls.indexOf(lname)>-1 && $(all[i]).attr("isData")){
            $(all[i]).show();
        }else{
            $(all[i]).hide();
        }
    }
    var cookietime = new Date(); 
    cookietime.setTime(new Date().getTime() + (60 * 60 * 1000)*24);//coockie保存一小时 
    $.cookie("expSelectMatch", ls,{expires:cookietime});
    MM_showHideLayers('Layer2', '', 'hide');
    return;
}

function selectMatchByMatchState(bu){
    var allLeagueUL = $("#allLeagueUL");
    var allLi = $("#allLeagueUL").children("li");
    var lisnum = allLi.length;
    for (var i = 0; i < lisnum; i++) {
        var thisLi = $(allLi[i]);
        thisLi.show();
    }
    var allLeagueUL = $("#allLeagueUL");
    var allLi = $("#allLeagueUL").children("li");
    var lisnum = allLi.length;
    for (var i = 0; i < lisnum; i++) {
        var thisLi = $(allLi[i]);
        var isStart = thisLi.attr("isMatchStart");
        if (isStart == bu) {
            var thisCheck = thisLi.children("input:eq(0)");
            thisCheck.attr("checked", "true");
        }
        else {
            var thisCheck = thisLi.children("input:eq(0)");
            thisCheck.removeAttr("checked");
        }
    }
    return;
}
function removeClose(nowTime){
    var allTr = $("#dataTable").find("tr");
    var trsnum = allTr.length;
    var cCount = document.getElementById("concernCount").innerHTML;
    for (var i = 0; i < trsnum; i++) {
        var thisTr = $(allTr[i]);
        var trtimes = thisTr.attr("lastUpdate");
        var trid = thisTr.attr("id").replace("tr", "");
        if (trtimes != undefined && trtimes != nowTime) {
            var hid = $("#hostName" + trid).html();
            var gid = $("#guestName" + trid).html();
            if (hid != null && gid) {
                //alert(hid + " VS " + gid + " 已收盘！");
                if ($(allTr[i]).parent("tbody").attr("id") == 'myss') {
                    cCount--;
                    document.getElementById("concernCount").innerHTML = cCount;
                    if (cCount < 1) {
                        $("#myfavMatch").hide();
                        $("#otherMatch").hide();
                    }
                }
				var nextTr = $(allTr[i]).next();
				nextTr.remove();
                $(allTr[i]).remove();
				
            }
        };
            };
    };
function showAll(){
    var allTr = $("#dataTable").find("tr");
    var trsnum = allTr.length;
    for (var i = 0; i < trsnum; i++) {
        var thisTr = $(allTr[i]);
        var isData = thisTr.attr("isData");
        if (isData != undefined && isData == 'true') {
            thisTr.show();
        };
            };
    return;
}
function showCheck(type, bu){
    $("input[name='checkMatch']").each(function(){
        if ($(this).attr("checked")) {
            var tid = ($(this).val());
            $("#" + tid).show();
        }
        else {
            var tid = ($(this).val());
            $("#" + tid).next().hide();
            $("#" + tid).hide();
        };
            });
    return;
}
function hideCheck(bu){
    $("input[name='checkMatch']").each(function(){
        if ($(this).attr("checked")) {
            var tid = ($(this).val());
            $("#" + tid).next().hide();
            $("#" + tid).hide();
        }
        else {
            var tid = ($(this).val());
            $("#" + tid).show();
        };
            });
    return;
}
function SelectOK(bu){
    var ls = '';
    $("input[name='checkLeague']").each(function(){
        if ($(this).attr("checked")) {
            ls += $.trim($(this).val());
        }
    });
    checkLeague = ls;
    var allTr = $("#dataTable").find("tr");
    var trsnum = allTr.length;
    for (var i = 0; i < trsnum; i++) {
        var thisTr = $(allTr[i]);
        var isData = thisTr.attr("isData");
        var ln = thisTr.children("td:eq(1)").html();
        if (ln == null) 
            continue;
        ln = $.trim(ln).toString();
        thisTr.show();
        if (isData != undefined && isData == 'true' && ls.indexOf(ln) < 0) {
            thisTr.hide();
            thisTr.next().hide();
        }
    }
    var cookietime = new Date(); 
    cookietime.setTime(new Date().getTime() + (60 * 60 * 1000)*24);//coockie保存一小时 
    $.cookie("expSelectLeague", ls,{expires:cookietime});
    MM_showHideLayers('Layer2', '', 'hide');
    return;
}
function ShowMatchByMatchState(bu){
    var allTr = $("#dataTable").find("tr");
    var trsnum = allTr.length;
    for (var i = 0; i < trsnum; i++) {
        var thisTr = $(allTr[i]);
        var isData = thisTr.attr("isData");
        var isStart = thisTr.attr("isStart");
        if (isData != undefined && isData == 'true') {
            thisTr.hide();
            thisTr.next().hide();
        }
        //alert(isStart);
        if (isData != undefined && isData == 'true' && isStart == bu) {
                thisTr.show();
        };
    };
    MM_showHideLayers('Layer2', '', 'hide');
    return;
}
function ShowAllMatch(){
    var allTr = $("#dataTable").find("tr");
    var trsnum = allTr.length;
    for (var i = 0; i < trsnum; i++) {
        var thisTr = $(allTr[i]);
        var isData = thisTr.attr("isData");
        var isStart = thisTr.attr("isStart");
        if (isData != undefined && isData == 'true') {
            thisTr.show();
        };
            };
    MM_showHideLayers('Layer2', '', 'hide');
    return;
}

function matchSelect(bu){
    $("Layer2").show();
    return;
}

function selectAllMatch(obj){
    if ($(obj).attr("checked")) {
        $("input[name='checkMatch']").each(function(){
            this.checked = true;
        });
    }
    else {
        $("input[name='checkMatch']").each(function(){
            this.checked = false;
        });
    };
};
function SelectMatchInit(){
	var showSelect = false;
    var ls = $.cookie("expSelectMatch");
    if(ls==undefined) ls='';
    var all = $("#dataTable").find("tr");
    var llen = all.length;
    for(var i=1;i<llen;i++){
        var lname = $(all[i]).attr("mname");
        lname = $.trim(lname);
        if(ls !="" && ls.indexOf(lname)>-1 && $(all[i]).attr("isData")){
            $(all[i]).show();
            showSelect = true;
        }else{
        	if(ls !="" && ls.indexOf(lname)==-1)
            $(all[i]).hide();
        }
    }
    if(!showSelect){
    	showAll();
    }
    return;
}
	
var checkLeague;
function addConcern(obj){
    var tr = ($(obj).parent().parent());
    var cCount = document.getElementById("concernCount").innerHTML;
    $(obj).parent().html('<a onclick="deleteConcern(this)" style="cursor: hand" title="取消置顶"><img src="${ctx}/images/expectedAll/collapse.gif"></a>');
    var netxtr = tr.next();
    $("#myss").append(tr);
    $("#myss").append(netxtr);
    cCount++;
    document.getElementById("concernCount").innerHTML = cCount;
    $("#myfavMatch").show();
    $("#otherMatch").show();
    return false;
}
function deleteConcern(obj){
    var tr = ($(obj).parent().parent());
    var cCount = document.getElementById("concernCount").innerHTML;
    $(obj).parent().html('<a onclick="addConcern(this)" style="cursor: hand"  title="添加置顶"><img src="${ctx}/images/expectedAll/expand.gif"></a>');
    var netxtr = tr.next();
    $("#unmyss").append(tr);
    $("#unmyss").append(netxtr);
    cCount--;
    document.getElementById("concernCount").innerHTML = cCount;
    if (cCount == 0) {
        $("#myfavMatch").hide();
        $("#otherMatch").hide();
    }
    return false;
}