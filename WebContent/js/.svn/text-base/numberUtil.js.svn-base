/* 
      数字金额转换为中文,Create By HJ 2009-9-4
 */
var changeCNAMoney = function(money) {
	//debugger;
	var IntNum, PointNum, IntValue, PointValue, unit, moneyCNY;
	var Number = "零一二三四五六七八九";
	var NUMUnit = {
		LING : "零",
		SHI : "十",
		BAI : "百",
		QIAN : "千",
		WAN : "万",
		YI : "亿"
	}
	var CNYUnit = {
		YUAN : "元",
		JIAO : "角",
		FEN : "分",
		ZHENG : "整"
	};
	var beforeReplace = {
		Values : [ {
			Name : NUMUnit.LING + NUMUnit.YI
		}, // 零亿
		{
			Name : NUMUnit.LING + NUMUnit.WAN
		}, // 零万
		{
			Name : NUMUnit.LING + NUMUnit.QIAN
		}, // 零千
		{
			Name : NUMUnit.LING + NUMUnit.BAI
		}, // 零百
		{
			Name : NUMUnit.LING + NUMUnit.SHI
		}, // 零十
		{
			Name : NUMUnit.LING + NUMUnit.LING
		}, // 零零
		{
			Name : NUMUnit.YI + NUMUnit.LING + NUMUnit.WAN
		}, // 亿零万
		{
			Name : NUMUnit.LING + NUMUnit.YI
		}, // 零亿
		{
			Name : NUMUnit.LING + NUMUnit.WAN
		}, // 零万
		{
			Name : NUMUnit.LING + NUMUnit.LING
		} // 零零
		]
	};
	var afterReplace = {
		Values : [ {
			Name : NUMUnit.YI + NUMUnit.LING
		}, //亿零
		{
			Name : NUMUnit.WAN + NUMUnit.LING
		},//万零
		{
			Name : NUMUnit.LING
		}, //零
		{
			Name : NUMUnit.LING
		}, //零
		{
			Name : NUMUnit.LING
		}, //零
		{
			Name : NUMUnit.LING
		}, //零
		{
			Name : NUMUnit.YI + NUMUnit.LING
		}, //亿零
		{
			Name : NUMUnit.YI
		}, //亿
		{
			Name : NUMUnit.WAN
		}, //万
		{
			Name : NUMUnit.LING
		} //零
		]
	};
	var pointBefore = {
		Values : [ {
			Name : NUMUnit.LING + CNYUnit.JIAO
		}, //零角
		{
			Name : NUMUnit.LING + CNYUnit.FEN
		}, //零分
		{
			Name : NUMUnit.LING + NUMUnit.LING
		}, //零零
		{
			Name : CNYUnit.JIAO + NUMUnit.LING
		} //角零
		]
	};
	var pointAfter = {
		Values : [ {
			Name : NUMUnit.LING
		}, //零
		{
			Name : NUMUnit.LING
		}, //零
		{
			Name : ""
		}, {
			Name : CNYUnit.JIAO
		} //角
		]
	};

	/// 递归替换
	var replaceAll = function(inputValue, beforeValue, afterValue) {
		while (inputValue.indexOf(beforeValue) > -1) {
			inputValue = inputValue.replace(beforeValue, afterValue);
		}
		return inputValue;
	}
	var fshu = false;
	money = money+"";
	if(money.indexOf("-")!=-1){
		money = money.replace("-", "");
		fshu = true;
	}
	//alert(11111);
	/// 获取输入金额的整数部分
	IntNum = money.indexOf(".") > -1 ? money.substring(0, money.indexOf("."))
			: money;
	/// 获取输入金额的小数部分
	PointNum = money.indexOf(".") > -1 ? money
			.substring(money.indexOf(".") + 1) : "";
	IntValue = PointValue = "";

	/// 计算整数部分
	for ( var i = 0; i < IntNum.length; i++) {
		/// 获取数字单位
		switch ((IntNum.length - i) % 8) {
		case 5:
			unit = NUMUnit.WAN; //万
			break;
		case 0:
		case 4:
			unit = NUMUnit.QIAN; //千
			break;
		case 7:
		case 3:
			unit = NUMUnit.BAI; //百
			break;
		case 6:
		case 2:
			unit = NUMUnit.SHI; //十
			break;
		case 1:
			if ((IntNum.length - i) > 8) {
				unit = NUMUnit.YI; //亿    
			} else {
				unit = "";
			}
			break;
		default:
			unit = "";
			break;
		}
		/// 组成整数部分
		IntValue += Number.substr(parseInt(IntNum.substr(i, 1)), 1) + unit;
	}

	/// 替换零
	for ( var i = 0; i < beforeReplace.Values.length; i++) {
		IntValue = replaceAll(IntValue, beforeReplace.Values[i].Name,
				afterReplace.Values[i].Name);
	}
	// 末尾是零则去除
	if (IntValue.substr(IntValue.length - 1, 1) == NUMUnit.LING)
		IntValue = IntValue.substring(0, IntValue.length - 1);
	// 一十开头的替换为十开头
	if (IntValue.substr(0, 2) == Number.substr(1, 1) + NUMUnit.SHI)
		IntValue = IntValue.substr(1, IntValue.length - 1);

	/// 计算小数部分
	if (PointNum != "") {
		PointValue = Number.substr(PointNum.substr(0, 1), 1) + CNYUnit.JIAO;
		PointValue += Number.substr(PointNum.substr(1, 1), 1) + CNYUnit.FEN;
		for ( var i = 0; i < pointBefore.Values.length; i++) {
			PointValue = replaceAll(PointValue, pointBefore.Values[i].Name,
					pointAfter.Values[i].Name);
		}
	}
	if(fshu){
		IntValue = '<font color="red">负</font>'+IntValue;
	}
	moneyCNY = PointValue == "" ? IntValue 
			: IntValue + CNYUnit.YUAN + PointValue;
	return moneyCNY;
}

//数字填充，为了提高处理性能定义的填充字符串，如果填充更多只需要修改这个变量即可
var fillNum = "0000000000"; //注：为了不影响不被替换，建议定义为对象属性。
			    //jquery.sgfmtable.js插件中可通过在页面定义 sgfm.fillNum 的属性进行替换。
//格式化数字111,111.00 ，不是数字类型不进行格式化,只支持16位精度
// 参数str:需要格式化的数字，不是数字类型不进行格式化
// 参数num:小数点保留多少位，不是数字或不传为默认保留两位
function formNumber(str,num){
	if(!isNaN(str) && $.trim(str) !==""){
		var html = str.toString(),digits=num,prefix=str<0?"-":"";
		if(!(/^[\d]+$/.test(digits))){
			digits = 2;
		}
		var pow10 = Math.pow(10,digits);
		html = (Math.round(Math.abs(parseFloat(html))*pow10)/pow10).toString();
		var index = html.indexOf("."),sDigits="",length=html.length;
		if(index===-1){index=length++;sDigits=".";}
		if(digits>0){
			var inum = digits-(length-index-1);
			if(inum>0){
				sDigits += fillNum.substr(0,inum);//不足保留小数位补0 ,“fillNum”要与定义的变量相同
				html+=sDigits;
			}
		}
		if(index===0){
			html = "0"+ html;
		}else if(index > 3){
			var inum = Math.ceil(index/3)-1,text=html.substr(index-3),tmpText=html.substring(0,index-3);
			for(var i=1;i<inum;i++){
				var tmpLength=tmpText.length;
				text = tmpText.substr(tmpLength-3) + "," + text;
				tmpText = tmpText.substring(0,tmpLength-3);
			}
			html = tmpText+","+text;
		}
		return prefix+html;
	}
	return str;
}

/**
 * 处理数据,过W 则以万为单位缩写
 */
function disposeNum(num){
	if(num >= 100000000){
		num = num/100000000;
		num = fmoney(num, 3);
		return num +"Y";
	}else if(num >= 10000){
		num = num/10000;
		num = fmoney(num, 3);
		return num +"W";
	}else{
		return num;
	}
}
/**
 * 获取鼠标在页面上的位置
 * @param ev		触发的事件
 * @return			x:鼠标在页面上的横向位置, y:鼠标在页面上的纵向位置
 */
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
	point.x += 15;//横坐标移位15px，防止挡住光标
	return point;
}
function getChinaese(obj, event){
	var num = $(obj).children().html()||$(obj).html();
	num = $.trim(num);
	if(num == 0)
		return;
	//alert(changeCNAMoney(num.toString()));
	var cmoney = changeCNAMoney(num.toString());
	//alert(cmoney);
	$("#ratiocshow").html(cmoney);
	var point = getMousePoint(event);

	if(point.x<20){
		$("#ratiocshow").css("left",point.x+20);
	}
	else if(point.x>150){
		$("#ratiocshow").css("left",point.x-100);
	}else{
		$("#ratiocshow").css("left",point.x-20);
	}
	
	$("#ratiocshow").css("top",point.y+5); 
	
	$("#ratiocshow").show();
}
function hideChinaese(obj, e){
	$("#ratiocshow").hide();
}