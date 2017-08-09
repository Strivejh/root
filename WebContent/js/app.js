var App = App || {}; // only global property, the root of our namespace
$(function() {
	App = function () {
		var elSubMenu = $('[data-component="sub-menu"]');
		var elBody = $('body');
		
		var dateTime;
		var modalConfig = {
				modal : true,
				type: "info",
				title: "",
				message: "",
				width: 380,
				height: "auto",
				resizable: false,
				fn: null,
				close: function(){
                    $(this).empty();
                    $(this).dialog("destroy").remove();
				}
			};

		function treemenu() {
			elSubMenu.treeview && elSubMenu.treeview({
				collapsed: true,
//				persist: 'cookie',
				animated: 'fast',
				unique: true
			});
		}

		function bindEvents() {
		}



		function updateClock() {

			if(!dateTime){
				var dataDateTime = $.parseJSON($("#serverDateTime").attr("data-datetime"));
				if(dataDateTime) {
					dateTime = dataDateTime;
				} else {
					return;
				}
			}

			var dt, dateArray, timeArray, dateStr;

			if (dateTime.mills === 0){	
				dateArray = dateTime.date.split("/");
				timeArray = dateTime.time.split(":"); 
				dt = new Date(dateArray[2],dateArray[1]-1,dateArray[0],timeArray[0],timeArray[1],timeArray[2]);
			} else {
				dt = new Date(dateTime.mills);
			}

			dateTime.date = padZeros(dt.getDate()) + '/' + padZeros(dt.getMonth() +1)  + '/' + padZeros(dt.getFullYear());
			dateTime.time = padZeros(dt.getHours()) + ':' + padZeros(dt.getMinutes()) + ':' + padZeros(dt.getSeconds());
			dateStr = dateTime.date + ' ' + dateTime.time + ' ' + dateTime.timeZone;

			dateTime.mills = dt.getTime() + 1000;

			$("#serverDateTime").text(dateStr);

			setTimeout(updateClock, 1000);
		}

		function padZeros(n){
			return n < 10 ? '0' + n : '' + n;
		}

        function handleRedirectOnResponse(data){
            if(data && data.respUrl && data.respUrl != '') {
                windowReloadNoCache(data.respUrl);
            }
        }

        function handleCloseWinOnResponse(data, winId){
            if(data && data.closeWin){
                App.closePanel(winId);
            }
        }

        function handleHttpError(jqXHR, textStatus, errorThrown){
            if (jqXHR) {
                // service unavailable...
                if (jqXHR.status == 503) {
                    window.location.reload();
                }
            }
        }

        function windowReloadNoCache(destUrl){
            var d = new Date();
            var n = d.getTime();
            var reloadUrl;

            if (destUrl.indexOf('?') > -1){
                var query = destUrl.split('?');
                if (query[1].indexOf('_=') > -1)
                    reloadUrl = destUrl;
                else{
                    reloadUrl = query[0] + "?" + query[1] + "&_=" + n ;
                }

            } else {
                reloadUrl = destUrl + "?_=" + n;
            }
            window.location.href = reloadUrl;
        }

        function updateSwitchUserCB(cbName) {
            App.ajaxExt({
                url: mainData.server.context.path + "/switchUser/getList",
                dataType: "json",
                cache: false,
                fnSuccess: function(data) {
                    var ele = $(cbName);
                    if (data != null && data.length>0) {
                        ele.show();

                        var option1 = ele.children()[0];
                        ele.empty().append(option1);
                        var dispName;
                        for (var i=0; i<data.length; i++) {
                            if (!data[i].nickName || data[i].nickName==null)
                                dispName = data[i].userCode;
                            else
                                dispName = data[i].userCode +" (" + data[i].nickName +")";
                            ele.append($('<option></option>').attr("value", data[i].userId).text(dispName));
                        }
                    }
                }
            });
        }

        function switchUser(userCodeEle) {
            if (!userCodeEle || userCodeEle.value == "") {
                return;
            }
            var userId = userCodeEle.value;
            App.ajaxExt({
                url: mainData.server.context.path + "/switchUser",
                data: "targetUserId="+userId,
                dataType: "json",
                cache: false,
                fnSuccess: function(data) {
                    if (data.status == "success") {
                        window.location.href=mainData.server.context.path;
                    }else {
                        userCodeEle.selectedIndex = 0;
                        App.messageBox({
                            title: mainData.alert.fail.title,
                            type: "warning",
                            message: data.errMsg
                        });
                    }
                }
            });
        }

		return {
			init: function() {
				treemenu();
				updateClock();
			},

            switchUser: function(userCode) {
                switchUser(userCode);
            },

            updateSwitchUserCB: function(cbName) {
                updateSwitchUserCB(cbName);
            },

            windowReloadNoCache : function(destUrl){
                windowReloadNoCache(destUrl);
            },

            handleHttpError : function(jqXHR, textStatus, errorThrown){
                handleHttpError(jqXHR, textStatus, errorThrown);
            },

            postProcessError : function(jqXHR, textStatus, errorThrown) {
                if(typeof(formFailed)=="function") formFailed();
                handleHttpError(jqXHR, textStatus, errorThrown);
                App.processForm("after");
            },

			postProcess: function(winId,response,successMsg) {
				var obj = $.parseJSON(response);
                var title = obj.success?mainData.alert.success.title:mainData.alert.fail.title;
				if (obj.success) {
                    var dispMsg =obj.successMsg?obj.successMsg:successMsg ;
                    if(dispMsg!=''){
                        App.messageBox({
							title: title,
							message: dispMsg,
							fn: function(){
                                if(typeof(formSuccess)=="function") formSuccess(obj);
                                handleCloseWinOnResponse(obj,winId);
                                handleRedirectOnResponse(obj);
						    }
						});
					} else {
                        if(typeof(formSuccess)=="function") formSuccess(obj);
                        handleRedirectOnResponse(obj);
					}
				} else {
                    App.messageBox({
						title: title,
						message: obj.errors.reason,
						type: "warning",
                        fn: function(){
                            if(typeof(formError)=="function") formFailed(obj);
                            handleRedirectOnResponse(obj);
                        }
					});
				}
				App.processForm("after");
			},
			
			messageBox: function(config) {
  				var elId = typeof App.utils.getRNG() !== 'undefined' ? App.utils.getRNG().next() : "dlMsg";
				var arg = $.extend({}, modalConfig, config);
				var icon = "";
                var doFnOnClose = true;
                var hideXButton = false;
                if (arg.hideXBtn && arg.hideXBtn==true)
                    hideXButton =true;
				if(arg.type) {
					if(arg.type=="info")
                        icon = "<span class=\"ui-icon ui-icon-circle-check\" style=\"float:left; margin:0 7px 50px 0;\"></span>";
					if(arg.type=="warning")
                        icon = "<span class=\"ui-icon ui-icon-alert\" style=\"float:left; margin:0 7px 50px 0;\"></span>";
				}
				$("body").append("<div id='"+elId+"' title=\"" + arg.title + "\"><p>" + icon  + arg.message + "</p></div>");

                var buttons = {};
				buttons[mainData.defaults.ok] =  function () {
					if (typeof(arg.fn)=="function") arg.fn();
                    doFnOnClose=false;
					$(this).dialog("close");
                };

                var dialogConfig = {
                    autoOpen: false,
                    bgiframe: true,
					width: arg.width,
					height: arg.height,
					modal: arg.modal,
					resizable: false,
                    dialogClass: "agencyDialogClass",
                    closeOnEscape:!hideXButton,
                    open: function(event, ui) {
                        if (hideXButton==true){$(".ui-dialog-titlebar-close").hide(); }
                        if (typeof(arg.open)=="function") { arg.open(); }
                    },
					close: function (event, ui) {
                        $(this).empty();
                        $(this).dialog("destroy").remove();
                        if(doFnOnClose) {
                            if(arg.confirm==true) {
                                if (typeof(arg.fnCancel)=="function") { arg.fnCancel(); App.log("on-close:Cancel"); }
                            }
                            else {
                                if (typeof(arg.fn)=="function") { arg.fn(); App.log("on-close:Ok"); }
                            }
                        }
                    },
					buttons: buttons
				};

				// Add cancel button for 'confirm' type dialog
				if(arg.confirm==true)  {
					buttons[mainData.defaults.cancel] =  function () {
						if (typeof(arg.fnCancel)=="function") arg.fnCancel();
                        doFnOnClose=false;
						$(this).dialog("close");
					};

					dialogConfig = $.extend({}, dialogConfig, { 
						buttons: buttons
					});
				}

				$("#"+elId)
					.dialog(dialogConfig)
					.dialog('open');
				return false;
			},
			
			windowPanel: function (url, config, params){
				/**/
				if(!url) {/*alert("URL for App.windowPanel is not defined.");*/ return false;}
				if(!config.id) {/*alert("ID for App.windowPanel is not defined.");*/ return false;}
                var hideXButton = false;
                if (config.hideXBtn && config.hideXBtn==true)
                    hideXButton =true;

                var arg = $.extend({}, modalConfig, config,
                                {   closeOnEscape: !hideXButton,
                                    open: function(event, ui) {
                                        if (hideXButton==true){$(".ui-dialog-titlebar-close").hide(); }
                                        if (typeof(config.open)=="function") { config.open(); }
                                    }
                                });

				url += ((url.indexOf("?")==-1) ? "?" : "&") + "winid="+config.id;
				var data = params ? {data: params} : {};
                var popupClass = " class='agencyPopup'";
                $("<div id='" + config.id + "'" + popupClass + "><div class='progress-div'><p>"+ mainData.defaults.processing +"</p><span style='margin:0pt auto;'></span></div></div>").load(url, data, function(responseText, textStatus, jqXHR) {handleHttpError(jqXHR);}).dialog(arg);
                if(config.exportexcel==true) {
                    $("#ui-dialog-title-"+config.id+ "").append('<span class="export"><input type="hidden" id="inExportUrl" name="inExportUrl" value="'+url+'" /><a href="#" onclick="App.doExport()" id="btnexport" class="excel"></a></span>');
                }

				if(config.pagination==true){ App.activatePopupPaginationLink(config.id); }

			},

            log: function(){
				if(window.console) {
					console.log(arguments)
				}
			},
			
			closePanel: function(winId){
				App.log('#'+winId, $('#'+winId));
				if(!winId) { /*alert("window Id is not defined");*/ return false; }
				if($('#'+winId).is(':data(dialog)')==false) { /*alert("invalid dialog panel");*/ return false; }
				$('#'+winId).empty();
                $('#'+winId).dialog("destroy").remove();
			},

			processForm: function(event) {
				App.progressBox(event === "before" ? "open" : "destroy");
				App.enableButtons(event === "before" ? false : true);
			},

			enableButtons: function(enable) {
				var $submit = $( (App.$form && App.$form.currentForm) || ".ui-dialog form").find("[type='submit']");
				if(!$submit.length) {
					return;
				}
				if(!enable) {
					$submit.attr("disabled","disabled");
				} else {
					$submit.removeAttr("disabled");
				}
			},

			progressBox: function(action, options) {
				var selector = $("#progress");
				switch(action) {
				case "open":
					selector
						.dialog({
							dialogClass: 'progress-win',
							modal: true,
							minHeight: 'auto'
						});
					break;
				case "destroy":
					selector.dialog("destroy");
					break;
				}
			},
			
			activatePopupPaginationLink: function(){
				var winId = arguments[0];
				App.log(winId);
					
					$("div.ui-dialog-content>div#pagination>a").live("click",function(){
						var url = $(this).attr("href");
						winId = winId || $(this).parent().parent().attr("id");
						
						$("div#" + winId + ".ui-dialog-content").load(url);
						App.updateExportUrl(url);
						App.log(winId,url, $(this).parent().parent().attr("id"));
						return false; 
					});
			},
			
			confirm: function(config){
				App.messageBox($.extend({}, config, {type: 'warning', confirm: true}));
			},

            ajaxExt: function (config){
                var defaults = {              //set the defaults
                    success: function(resp){  //hijack the success handler
                        var data;
                        if(typeof resp === "object"){data = resp;}
                        else { try{ data = $.parseJSON(resp);} catch(ex) {} }
                        if (data && data.errors){
                            App.messageBox({
                                title: mainData.alert.fail.title,
                                message: data.errors.reason,
                                type: "warning",
                                close: function() {
                                    if (typeof(config.fnSuccess)=="function") config.fnSuccess(resp);
                                    handleRedirectOnResponse(data);
                                },
                                fn: function(){
                                    if (typeof(config.fnSuccess)=="function") config.fnSuccess(resp);
                                    handleRedirectOnResponse(data);
                                }
                            });
                        }
                        if (typeof(config.fnSuccess)=="function") config.fnSuccess(resp);
                    },
                    error: function(jqXHR){
                        if (typeof(config.fnError)=="function") config.fnError();
                        handleHttpError(jqXHR);
                    },
                    cache:false
                };
                $.extend(config,defaults);  //merge passed options to defaults
                $.ajax(config);             //send request
            },

            invokeUrl: function(config){
				var arg = config;
				var data = config.data || null;
                App.processForm('before');
				$.ajax({
		              url: arg.destUrl,
		              data: data,
                      cache: false,
		           	  success: function(resp) {
                        App.processForm('after');
		           	  	var respData = $.parseJSON(resp);
                        var title = respData.success?mainData.alert.success.title:mainData.alert.fail.title;
		           	  	if(respData.success) {
		           	  		App.messageBox({
								title: title,
								message: respData.successMsg?respData.successMsg:arg.successMessage,
								type: 'info',
								fn: function(){
									if (typeof(arg.fn)=="function") arg.fn(resp);
                                    handleRedirectOnResponse(respData);
								}
							});
		           	  	}
		           	  	else {
		           	  		App.messageBox({
								title: title,
								message: respData.errors.reason,
								type: "warning",
                                     fn: function(){
                                         if (typeof(arg.fnError)=="function") arg.fnError(resp);
                                         handleRedirectOnResponse(respData);
                                     },
                                     fnCancel: function(){ //bind [x]close button
                                         if (typeof(arg.fnError)=="function") arg.fnError(resp);
                                         handleRedirectOnResponse(respData);
                                     }
							});
		           	  	}
					  },
		           	  error: function(data){
                        App.processForm('after');
                        App.messageBox({
                            title: mainData.alert.fail.title,
                            message: data.statusText,
                            type: "warning",
                            fn: function(){
                                if (typeof(arg.fnError)=="function") arg.fnError();
                                handleHttpError(data);
                            }
                        });
		           	  }
		           	});
			},
			
			expandMenuByIndex: function(i) {
				$("#tabs-1>ul>li:eq("+i+") .hitarea").click();
			},
			
			getQueryStringByName: function ( name ) {
			  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			  var regexS = "[\\?&]"+name+"=([^&#]*)";
			  var regex = new RegExp( regexS );
			  var results = regex.exec( window.location.href );
			  if( results == null )
			    return "";
			  else
			    return decodeURIComponent(results[1].replace(/\+/g, " "));
			},
			
			doExport: function() {
				var url = $("#inExportUrl").val(); 
				var actionURL = url;
					actionURL+= ((url.indexOf("?")==-1) ? "?" : "&") + $.param({format: 'excel', extension: 'xls'});
                windowReloadNoCache(actionURL);
			},
			
			updateExportUrl: function(url) {
				var url = $("#inExportUrl").val(url);
			},

            resetFixedTableHeader: function(config) {
                var tableId = config.tableId || "";
                if(tableId == "") { return false; }
                var _tblHeader = "#table-header"+ "-" + tableId;
                var _tblBody = "#table-body"+ "-" + tableId;
                var minWidth  = 30;

                $(_tblHeader).find("th").each(function(i,v){
                    $(this).find('.div-spacer').css("width", minWidth);
                });
                $(_tblBody).find("th").each(function(i,v){
                    $(this).find('.div-spacer').css("width", minWidth);
                });
            },

            adjustFixedTableHeader: function(config) {
                var tableId = config.tableId || "";
                if(tableId == "") { return false; }
                var _tblHeader = "#table-header"+ "-" + tableId;
                var _tblBody = "#table-body"+ "-" + tableId;
                tableId =  "#" + tableId;

                $(tableId).find("tr:last").find("td").each(function(i,v){
                    $(_tblHeader).find("th").eq(i).find('.div-spacer').css("width", $(this).outerWidth());
                    $(_tblBody).find("th").eq(i).find('.div-spacer').css("width", $(this).outerWidth());
                });
                resizeContainer();
            },
			
			fixedTableHeader: function(config){

				var tableId = config.tableId || "";				
				if(tableId == "") { return false; }

				var _tblWrapper = "table-wrapper"+ "-" + tableId;
				var _tblHeader = "table-header"+ "-" + tableId;
				var _tblBody = "table-body"+ "-" + tableId;

				tableId =  "#" + tableId;
                var expr = new RegExp('>[ \t\r\n\v\f]*<', 'g');
                var html = $(tableId).html().replace(expr, '><');
                $(tableId).html(html);

                if($(tableId +">thead>tr").children(":not(th)").length>0) App.log("Note:Header columns must be All in <th> tag.")
                $(tableId +">thead>tr>th").each(function(i,v){
                    $(this).prepend("<div class='div-spacer' style='width:"+ $(v).outerWidth() +"px;height:1px'></div>");
                });

		    	$(tableId).wrap("<div id='"+ _tblWrapper +"' class='table-wrapper'></div>");
		    	$(tableId).before("<div id='"+ _tblHeader +"' class='table-header'></div>");
		    	$(tableId).wrap("<div id='"+ _tblBody +"' class='table-body'></div>");

		    	$("#"+ _tblHeader ).append($(tableId).find("thead").clone());
		    	$("#"+ _tblHeader +">thead").wrapAll("<table></table>");
		    	
		    	/*var _H = $("#" + _tblHeader ).height();
		    	$(tableId).css("margin-top", -_H-1);
		    	$("#" + _tblWrapper).css("padding-top", _H);*/
		    	
		    	$("#"+ _tblBody ).scroll(function() {
		    	     var left = $(this).scrollLeft();
		    	     $("#"+ _tblHeader ).css("margin-left", -left);
		    	});
		    	
		    	$(tableId).parents(".ui-dialog-content.ui-widget-content").css("overflow","hidden");
		    	$("#"+ _tblWrapper ).parent().css("overflow","hidden");

                var dialogId = $(tableId).parents(".ui-dialog-content.ui-widget-content").attr("id");
                var paginateDiv =  $(tableId).parents(".ui-dialog-content.ui-widget-content").find("#pagination");
                var diffHeight=0;
                if (paginateDiv.length>0)
                    diffHeight = 30;
                var dialogHeight = (config.fixedHeight) ? config.fixedHeight : $('#'+dialogId).height()-diffHeight;
                $("#"+ _tblWrapper ).css("height", dialogHeight);
                $("#"+ dialogId).bind("dialogresize", function(event, ui) {
                    if (config.fixedHeight)
                        $("#"+ _tblWrapper ).css("height",config.fixedHeight);
                    else
                        $("#"+ _tblWrapper ).css("height", $('#'+dialogId).height()-diffHeight);
                });

                if(config.resizeContainer==true)
		    		resizeContainer();
			}
		}
	}();
});

function resizeContainer(callback) {
	setTimeout(function() {
		var hFilter = $('#header-panel').outerHeight()||0;
		var hAnnounce = $('#announcement-panel').outerHeight()||0;
		var hUpdate =  $('#update-form-panel').outerHeight()||0;
		var hBtn =  $('#btn-panel').outerHeight()||0;
		var hPage = $('#pagination').outerHeight()||0;
        var hTop =   $('#container-top').outerHeight()||0;
        var hBottom =   $('#container-bottom').outerHeight()||0;
		var hTotal = hFilter + hAnnounce + hUpdate + hBtn + hPage + hTop + hBottom;
		$('#container-panel').css({'height':  ($('.ui-layout-center').height() - hTotal)});

        var h = $(".table-wrapper").parent().height();
		        $(".table-wrapper").height(h);
		        $(".table-wrapper").parents(".ui-dialog-content.ui-widget-content").trigger('dialogresize');

		callback && callback();
	}, 50);

}

$(document).ready(function() {
	App.init();
	if(!$($(".treeview>li .active").parents()[1]).hasClass("collapsable"))
    	$($(".treeview>li .active").parents()[1]).find(".hitarea").click();

	resizeContainer(function() {
		setTimeout(function() { $("#progress").dialog("destroy");}, 200);
	});
});
var App = App || {}; // only global property, the root of our namespace
$(function() {
	App.utils = function () {
		var ACTIVE = 'active';
		var elNumeric = $('.isNumber');


		var previousTargetVal;
        function bindEvents(){
			App.log("Utils Loaded");
			elNumeric.live("keydown", function (e) {
				var key = e.which || e.keyCode;

                if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
					(key >= 48 && key <= 57) ||  // numbers
					(key >= 96 && key <= 105) || // Numeric keypad
					key == 8 || key == 9 || key == 13 ||  // Backspace and Tab and Enter
					key == 35 || key == 36 ||    // Home and End
					key == 37 || key == 39 ||    // left and right arrows
					key == 46 || key == 45) {    // Del and Ins
                    if (isFinite(e.target.value)) {
                        previousTargetVal = e.target.value;
                    }
                    //$('#downlineMaxCreditLabel').text(key);
                    return true;
                }

				return false;
			});
        }

        function customRandom(nseed) {

            var seed,
                constant = Math.pow(2, 13)+1,
                prime = 37,
                maximum = Math.pow(2, 50);

            if (nseed) {
                seed = nseed;
            }

            if (seed == null) {
                //if there is no seed, use timestamp
                seed = (new Date()).getTime();
            }

            return {
                next : function() {
                    seed *= constant;
                    seed += prime;
                    seed %= maximum;

                    return seed;
                }
            }
        }

        function validateContainsScript(data){
            var regex = RegExp("<script?\\w+(?:\\s+(?:" + "" + "=\"([^\"]*)\")|[^\\s>]+|\\s+)*>","gi");
            var result = data.match(regex);
            if (result==null)
                return false;
            else
                return true;
        }

        function formatCurrency(num) {
            num = isNaN(num) || num === '' || num === null ? 0 : num;
            var aDigits = parseFloat(num).toFixed(0).split(".");
            aDigits[0] = aDigits[0].split("").reverse().join("").replace(/(\d{3})(?=\d)/g, "$1,").split("").reverse().join("");
            return aDigits.join(".");
        }

        function formatMessage(source, params) {
            if ( arguments.length == 1 )
                return function() {
                    var args = $.makeArray(arguments);
                    args.unshift(source);
                    return formatMessage.apply( this, args );
                };
            if ( arguments.length > 2 && params.constructor != Array  ) {
                params = $.makeArray(arguments).slice(1);
            }
            if ( params.constructor != Array ) {
                params = [ params ];
            }
            $.each(params, function(i, n) {
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
            });
            return source;
        }

        function padZeros(str, max) {
            return str.length < max ? padZeros("0" + str, max) : str;
        }

        var _RNG = customRandom(23);


		return {
			init: function() {				
				bindEvents();
            },
            getRNG : function(){
                return _RNG;
            },
            containsScript : function(data){
                return validateContainsScript(data);
            },
            padZeros : function (str, max) {
                return padZeros(str, max);
            },
            formatCurrency : function(num){
                return formatCurrency(num);
            },
            formatMessage: function(source, params){
                return  formatMessage(source, params);
            }

		}
	}();
	
	App.utils.init();
});

function difference(array1, array2) {
	var diff = [];
	$.grep(array1, function(el) {
		if ($.inArray(el, array2) == -1) {
			diff.push(el);
		}
	});
	return diff;
}

function remove(domSelector, array, attr, selector, key) {
	var domIds = [], elIds = [];
	$(domSelector).each(function(i, el) {
		var id = $(el).attr("data-"+attr);
		id && domIds.push(id);
	});

	$.each(array, function(i,value) {
		var id = value[key];
		id && elIds.push(id);
	});

	var diff = difference(domIds, elIds);

	if(!diff.length) {
		return;
	}

	$.each(diff, function(i, el) {
		var element = $(selector.replace("###", el));
		//element.remove();
		element.addClass("hidden");
	});

}

function removeFromArray(array, removeItem) {
	return jQuery.grep(array, function(value) {
		return value != removeItem;
	}) || []
}

Array.prototype.getUnique = function(){
	var u = {}, a = [];
	for(var i = 0, l = this.length; i < l; ++i){
		if(u.hasOwnProperty(this[i])) {
			continue;
		}
		a.push(this[i]);
		u[this[i]] = 1;
	}
	return a;
}

if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

/**
 * jQuery.fn.sortElements
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *
 *   E.g. $('td').sortElements(comparator, function(){
		 *	  return this.parentNode;
		 *   })
 *
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */

$.fn.sortElements = (function(){

	var sort = [].sort;

	return function(comparator, getSortable) {

		getSortable = getSortable || function(){return this;};

		var placements = this.map(function(){

			var sortElement = getSortable.call(this),
				parentNode = sortElement.parentNode,

			// Since the element itself will change position, we have
			// to have some way of storing its original position in
			// the DOM. The easiest way is to have a 'flag' node:
				nextSibling = parentNode.insertBefore(
					document.createTextNode(''),
					sortElement.nextSibling
				);

			return function() {

				if (parentNode === this) {
					throw new Error(
						"You can't sort elements if any one is a descendant of another."
					);
				}

				// Insert before flag:
				parentNode.insertBefore(this, nextSibling);
				// Remove flag:
				parentNode.removeChild(nextSibling);

			};

		});

		return sort.call(this, comparator).each(function(i){
			placements[i].call(getSortable.call(this));
		});

	};

})();


var App = App || {}; // only global property, the root of our namespace
$(function() {
    App.cookie = function () {
        var _announcementCfg ={'key':'ag-announcement', 'defaultCfg': {'searchDate':'', 'searchSubject':''}};
        var _qsCfg ={'key':'ag-qs-state', 'defaultCfg': {'searchUserCode':'', 'tabs':0,'searchTab1':0,'searchTab2':0,'searchTab3':0}};
        var _layoutCfg ={'key':'ag-layout-state', 'defaultCfg': {'west':1, 'north':1, 'westSize':0}};
        var _preferenceCfg ={'key':'ag-preference', 'defaultCfg':{'site':''}};
        var _hideFormBarCfg ={'key':'ag-hideFormBar', 'defaultCfg':{'hide':{}}};

        var _clearCookie = function(config){
            $.removeCookie(config.key, {path: '/'})
        };
        var _initCookie = function(config, daysToExpire){
            var _params = arguments.length>1? {path: '/',expires: daysToExpire}:{path: '/'};
            $.cookie(config.key ,JSON.stringify(config.defaultCfg), _params);
        };
        var _getCookie = function(config, daysToExpire){
            if ($.cookie(config.key)==null){
                if (arguments.length>1)
                    _initCookie(config,daysToExpire);
                else
                    _initCookie(config);
            }
            return JSON.parse($.cookie(config.key));
        };
        var _setCookie = function(config, obj, daysToExpire){
            var _params = arguments.length>2? {path: '/',expires: daysToExpire}:{path: '/'};
            var data = $.extend({},_getCookie(config),obj);
            $.cookie(config.key ,JSON.stringify(data), _params);
        };
        var _setFormBar = function(name, val) {
            var hide = _getCookie(_hideFormBarCfg);
            hide[name]=val;
            _setCookie(_hideFormBarCfg,hide);
        };

        return {
            clearAllCookies :function(){
                App.cookie.resetNavCookie();
                App.cookie.clearQSCookie();
                App.cookie.clearLayoutCookie();
                App.cookie.clearAnnouncementCookie();
                App.cookie.clearFormVarCookie();
                return true;
            },
            resetNavCookie : function(){
                $.removeCookie('treeview', {path: '/'})
            },
            clearAnnouncementCookie : function(){
                _clearCookie(_announcementCfg);
            },
            initAnnouncementCookie : function(){
                _initCookie(_announcementCfg);
            },
            getAnnouncementCookie : function(){
                return _getCookie(_announcementCfg);
            },
            setAnnouncementCookie : function(obj){
                _setCookie(_announcementCfg,obj);
            },
            clearQSCookie : function(){
                _clearCookie(_qsCfg);
            },
            initQSCookie : function(){
                _initCookie(_qsCfg);
            },
            getQSCookie : function(){
                return _getCookie(_qsCfg);
            },
            setQSCookie : function(obj){
                _setCookie(_qsCfg,obj);
            },
            clearLayoutCookie : function(){
                _clearCookie(_layoutCfg);
            },
            initLayoutCookie : function(){
                _initCookie(_layoutCfg);
            },
            getLayoutCookie : function(){
                return _getCookie(_layoutCfg);
            },
            setLayoutCookie : function(obj){
                _setCookie(_layoutCfg,obj);
            },
            getPreferenceCookie : function(){
                return _getCookie(_preferenceCfg);
            },
            setPreferenceCookie : function(obj,daysToExpire){
                _setCookie(_preferenceCfg,obj,daysToExpire);
            },
            clearFormVarCookie : function(){
                _clearCookie(_hideFormBarCfg);
            },
            isShowFormBar : function(name) {
                try {
                    var hide = _getCookie(_hideFormBarCfg);
                    return !hide[name];
                }catch (e) {
                    return false;
                }
            },
            showFormBar : function(name) {
                _setFormBar(name, 0);
            },
            hideFormBar : function(name) {
                _setFormBar(name, 1);
            }
        }
    }();
});

var AgencyMgmt = AgencyMgmt || {}; // only global property, the root of our namespace
$(function() {
    // Resources
    AgencyMgmt.Resource = function () {
        var _errorMessages = {
            dataFormInvalid: 'Input error(s) found. Please correct the input based on validation error(s) highlighted on screen.',
            dataInvalid: '{0} is Invalid',
            dataRequired: '{0} is Required',
            dataMaxCharInvalid: '{0} cannot be more than {1} characters',
            dataMinCharInvalid: '{0} cannot be less than {1} characters',
            dataCharInvalid: '{0} must be {1} character(s)',
            dataCharRangeInvalid: '{0} must be between {1} to {2} characters',
            dataMustContainsBothLettersAndNumbers: '{0} should contain both numbers and letters',
            dataDecPlcInvalid: 'Please enter a correct number with {0} decimal places',
            dataMaxValInvalid:'{0} cannot be more than {1}',
            dataMinValInvalid:'{0} cannot be less than {1}',
            dataRangeValInvalid :'{0} must be between {1} to {2}',
            dataForFieldsMustBeTheSame: 'Value for {0} and {1} must be the same',
            maxBetSmallerThanMinBet: 'Max Bet cannot be smaller than Min Bet',
            maxBetPerMatchSmallerThanMinBet: 'Max Bet Per Match cannot be smaller than Min Bet',
            maxBetPerMatchSmallerThanMaxBet: 'Max Bet Per Match cannot be smaller than Max Bet'
        };
        var _fields ={
            minBet :'Min Bet',
            maxBet :'Max Bet',
            maxPerMatch : 'Max Per Match'
        };
        var _messages ={
            loadTemplateSuccess : 'Template values succesfully loaded',
            saveTemplateSuccess : 'Settings succesfully saved as template',
            saveTemplateCfm :'Only Commission, Bet and Position Taking settings will be saved. Do you wish to continue?'
        };

        return{
            initResources : function(errorMessages, messages, fields){
                $.extend(_errorMessages,errorMessages);
                $.extend(_messages, messages);
                $.extend(_fields,fields);
                //_errorMessages =  errorMessages;
                //_messages =  messages;
                //_fields =   fields;
            },
            getErrorMsg : function (msgKey, params){
                if (arguments.length>1){
                    params = $.makeArray(arguments).slice(1);
                } else {
                    params = [];
                }
                return App.utils.formatMessage(_errorMessages[msgKey],params);
            },
            getMessage : function (msgKey,params){
                if (arguments.length>1){
                    params = $.makeArray(arguments).slice(1);
                } else {
                    params = [];
                }
                return App.utils.formatMessage(_messages[msgKey],params);
            },
            getFieldName : function (key, params){
                if (arguments.length>1){
                    params = $.makeArray(arguments).slice(1);
                } else {
                    params = [];
                }
                return App.utils.formatMessage(_fields[key],params);
            }
        }
    }();
    App.log('AgencyMgmt-Resource Loaded');
});

var AgencyMgmt = AgencyMgmt || {}; // only global property, the root of our namespace
$(function() {
    // Util
    AgencyMgmt.Util = function () {
        var _fieldValidateConfig = {
        };
        var _pwdFieldValidateConfig = {
            minChars: 6,
            maxChars:15,
            regEx: [new RegExp(/(?=.*[0-9])(?=.*[a-zA-Z])/),new RegExp(/^[0-9a-zA-Z]+$/)]
        };
        var _numFieldValidateConfig = {
            allowEmpty: false,
            decPlc: 0
        };

        var _setFormErrorMsg = function ($errorEle){
            _setErrorMsg($errorEle, null,  AgencyMgmt.Resource.getErrorMsg('dataFormInvalid'));
        };

        var _setErrorMsg = function ($errorEle, $element, errorMsg){
            var labels = $errorEle.find("label");
            if (labels.length>0){
                var $label = $(labels.get(0));
                if ($element!=null)
                    $label.attr('for',$element.attr('id'));
                else
                    $label.removeAttr('for');
                $label.addClass('error');
                $label.text(errorMsg);
            } else{
                var str = '<label';
                if ($element!=null)
                    str += ' for="' + $element.attr('id') + '"';
                str += ' class="error" style="">' +  errorMsg + '</label>';
                $errorEle.html(str);
            }
            $errorEle.addClass('has-error');
        };
        var _clearErrorMsg = function ($errorEle){
            var labels = $errorEle.find("label");
            if (labels.length>0){
                var $label = $(labels.get(0));
                $label.removeAttr('for');
                $label.removeClass('error');
                $label.text('');
            } else{
                var str = '<label style=""></label>';
                $errorEle.html(str);
            }
            $errorEle.removeClass('has-error');
        };

        var _checkNumberField = function (element, cfg){
            var $element = $(element);
            if ($element == null || $element.size() == 0) {
                return { hasError:false, errMsg:''};
            }
            var config = $.extend({}, _numFieldValidateConfig, { fieldName: _getFieldNameFromLabel($element) }, cfg);
            var value = $.trim($element.val());
            var chkLimits=true;
            if (config.allowEmpty && value.length ==0) chkLimits = false;
            var hasError = false;
            var errMsg = '';
            if (!config.allowEmpty && value.length ==0) { /* Empty */
                errMsg = AgencyMgmt.Resource.getErrorMsg('dataRequired',config.fieldName);
                hasError = true;
            } else if (!isFinite(value)){ /* valid number... */
                errMsg = AgencyMgmt.Resource.getErrorMsg('dataInvalid',config.fieldName);
                hasError = true;
            } else if (chkLimits){ /* check limits */
                // check for decimal places...
                var idx = value.indexOf('.');
                if (idx > 0) {
                    var decs = value.length - idx - 1;
                    if (decs > config.decPlc) {
                        errMsg = AgencyMgmt.Resource.getErrorMsg('dataDecPlcInvalid',config.decPlc);
                        hasError = true;
                    }
                }
                // check limits...
                if (!hasError) {
                    var theVal = + value;
                    // Range...
                    if ($.type(config.minVal)!== "undefined" && $.type(config.maxVal)!== "undefined"){
                        var minVal = + config.minVal;
                        var maxVal = + config.maxVal;
                        if (theVal<minVal || theVal>maxVal){
                            errMsg =  AgencyMgmt.Resource.getErrorMsg('dataRangeValInvalid',config.fieldName, config.minVal, config.maxVal);
                            hasError = true;
                        }
                    }
                    // maxVal
                    else if ($.type(config.maxVal)!== "undefined"){
                        var maxVal = + config.maxVal;
                        if (theVal>maxVal){
                            errMsg = AgencyMgmt.Resource.getErrorMsg('dataMaxValInvalid',config.fieldName, config.maxVal);
                            hasError = true;
                        }
                    }
                    // minVal
                    else if ($.type(config.minVal)!== "undefined"){
                        var minVal = + config.minVal;
                        if (theVal<minVal){
                            errMsg = AgencyMgmt.Resource.getErrorMsg('dataMinValInvalid',config.fieldName, config.minVal);
                            hasError = true;
                        }
                    }
                }
            }
            return {hasError:hasError, errMsg:errMsg};
        };

        var _checkField = function (element, cfg){
            var $element = $(element);
            if ($element == null || $element.size() == 0) {
                return { hasError:false, errMsg:''};
            }
            var config = $.extend({}, _fieldValidateConfig, { fieldName: _getFieldNameFromLabel($element) }, cfg);
            var value = $.trim($element.val());
            var hasError = false;
            var errMsg ='';

            /* Check for Empty ... */
            if (config.minChars && config.minChars>0 && value.length ==0) {
                errMsg = AgencyMgmt.Resource.getErrorMsg('dataRequired',config.fieldName);
                hasError = true;
            }
            /* Check for RegEx */
            if (!hasError){
                var _regExArr = _combineRegEx(config.regEx);
                for (var i=0; i<_regExArr.length; i++){
                    //App.log(value.match(new RegExp(/^av01/i)));
                    if (value.match(_regExArr[i])==null){
                        errMsg = AgencyMgmt.Resource.getErrorMsg('dataInvalid',config.fieldName);
                        hasError = true;
                        break;
                    }
                }
            }
            /* Check for <script> tag */
            if (!hasError && App.utils.containsScript(value)){
                errMsg = AgencyMgmt.Resource.getErrorMsg('dataInvalid',config.fieldName);
                hasError = true;
            }
            /* Check for Character Ranges */
            if (!hasError){
                if (config.maxChars && config.minChars && config.maxChars>0 && config.minChars>0 && config.maxChars==config.minChars && value.length != config.maxChars ) { /* Size Invalid */
                    errMsg =  AgencyMgmt.Resource.getErrorMsg('dataCharInvalid',config.fieldName,config.minChars);
                    hasError = true;
                }
                else if (config.maxChars && config.minChars && config.maxChars>0 && config.minChars>0 && (value.length > config.maxChars ||  value.length < config.minChars)) { /* Range Invalid */
                    errMsg =  AgencyMgmt.Resource.getErrorMsg('dataCharRangeInvalid',config.fieldName,config.minChars,config.maxChars);
                    hasError = true;
                }
                else if (config.maxChars && config.maxChars>0 && value.length > config.maxChars) { /* Max Char */
                    errMsg =  AgencyMgmt.Resource.getErrorMsg('dataMaxCharInvalid',config.fieldName,config.maxChars);
                    hasError = true;
                }
                else if (config.minChars && config.minChars>0 && value.length < config.minChars) { /* Min Char */
                    errMsg =  AgencyMgmt.Resource.getErrorMsg('dataMinCharInvalid',config.fieldName,config.minChars);
                    hasError = true;
                }
            }


            /*else if (config.isPassword){
                if (value.match(/^[0-9a-zA-Z]+$/) == null) {
                    errMsg = AgencyMgmt.Resource.getErrorMsg('dataInvalid',config.fieldName);
                    hasError = true;
                } else {
                    var isNumberFound = false;
                    var isLetterFound = false;
                    for (var i=0;i<value.length;i++) {
                        if (value.charCodeAt(i) >= 48 && value.charCodeAt(i) <= 57) {
                            isNumberFound = true;
                        } else {
                            isLetterFound = true;
                        }
                        if (isNumberFound && isLetterFound)
                            break;
                    }
                    if (!(isNumberFound && isLetterFound)) {
                        errMsg  = AgencyMgmt.Resource.getErrorMsg('dataInvalid',config.fieldName);
                        hasError = true;
                    }
                }
            } */
            return {hasError:hasError, errMsg:errMsg};
        };

        var _combineRegEx= function (_regEx){
            var regArr = [];
            if (_regEx){
                if ($.type(_regEx) === "regexp" )
                    regArr.push(_regEx);
                else if ($.type(_regEx) === "array"){
                    for (var i=0; i<_regEx.length; i++){
                        if ($.type(_regEx[i]) === "regexp")
                            regArr.push(_regEx[i]);
                    }
                }
            }
            return regArr;
        };

        var _validateNumberField = function (element, config){
            var cfg = $.extend({}, config, { isNumeric: true});
            return _validateField(element,cfg);
        };

        var _validateField = function (element, config){
            var $element = $(element);
            if ($element == null || $element.size() == 0) {
                return false;
            }
            var errorSpan = $element.closest("form").find(".error-wrap").get(0);
            var resp = config.isNumeric? _checkNumberField(element, config): _checkField(element, config);
            if (resp.hasError){
                _setErrorMsg($(errorSpan), $element,resp.errMsg);
                $element.addClass("error");
            } else {
                _clearErrorMsg($(errorSpan));
                $element.removeClass("error");
            }
            return resp.hasError;

        };

        var _validatePasswordField = function (element, config){
            var $element = $(element);
            if ($element == null || $element.size() == 0) {
                return false;
            }
            var parents = _getElements($element);
            var pwdList = parents.$parent.find("input[type='password']");
            var pwdsLen = pwdList.length;
            if (pwdsLen==0)
                return false; // no pwd fields to validate....
            var $thisEl;
            var pwds =[];
            var obj;
            var isPwdEle= 0;
            var oldPwdObj = null;
            var newPwdObj = null;
            var cfmPwdObj = null;
            for (var i=0; i<pwdsLen; i++){
                $thisEl = $(pwdList[i]);
                obj = {
                    $ele:$thisEl, hasError:false, isEle : $element.is($thisEl),
                    fieldName : AgencyMgmt.Util.getFieldNameFromLabel($thisEl), errMsg:''
                };
                isPwdEle = isPwdEle | obj.isEle;
                pwds.push(obj);
            }
            switch (pwdsLen){
                case 1 : newPwdObj = pwds[0]; break;
                case 2:  newPwdObj = pwds[0]; cfmPwdObj = pwds[1]; break;
                default: oldPwdObj = pwds[0]; newPwdObj = pwds[1]; cfmPwdObj = pwds[2];
            }
            // Validate oldPwd
            if (oldPwdObj!==null){
                if (oldPwdObj.isEle || isPwdEle==0) $.extend(oldPwdObj,_checkField(oldPwdObj.$ele[0], {minChars:1}));
                else oldPwdObj.hasError = oldPwdObj.$ele.hasClass('error');
            }
            // Validate pwd & cfmPwd
            if (newPwdObj!=null){
                if (oldPwdObj!==null && oldPwdObj.isEle){
                    newPwdObj.hasError = newPwdObj.$ele.hasClass('error');
                    if (cfmPwdObj!=null)
                        cfmPwdObj.hasError = cfmPwdObj.$ele.hasClass('error');
                } else {
                    // Validate Pwd ....
                    var cfg = $.extend({}, _pwdFieldValidateConfig, config);
                    $.extend(newPwdObj,_checkField(newPwdObj.$ele[0], cfg));
                    // validate cfmPwd...
                    if (cfmPwdObj!==null){
                        $.extend(cfmPwdObj,_checkField(cfmPwdObj.$ele[0], {minChars:1}));
                        if (!cfmPwdObj.hasError && newPwdObj.$ele.val()!=cfmPwdObj.$ele.val()){
                            cfmPwdObj.hasError = true;
                            cfmPwdObj.errMsg = AgencyMgmt.Resource.getErrorMsg('dataForFieldsMustBeTheSame', _getFieldNameFromLabel(newPwdObj.$ele),
                                                                _getFieldNameFromLabel(cfmPwdObj.$ele));
                        }
                    }
                }
            }

            // Toggle the classes....
            var hasError = false;
            for (var j=0; j<pwds.length; j++){
                obj = pwds[j];
                hasError = hasError | obj.hasError;
                if (obj.hasError) obj.$ele.addClass("error");
                else obj.$ele.removeClass("error");
                if (obj.isEle) {
                    if (obj.hasError) _setErrorMsg(parents.$errorSpan,$element,obj.errMsg);
                    else _clearErrorMsg(parents.$errorSpan);
                }
            }
            return hasError;
        };

        var _getElements = function ($element){
            if ($element == null || $element.size() == 0) {
                return {};
            }
            else if ($element.is('form')){
                return {$form : $element, $parent:$element, $errorSpan: $element.find(".error-wrap")};
            }
            else if ($element.is('fieldset')){
                var $form = $element.closest("form");
                return {$form :  $form, $parent:$element, $errorSpan: $form.find(".error-wrap")};
            }
            else{
                var $parent = $element.parent();
                if ($parent.is('td') || $parent.is('tr') || $parent.is('tbody') || $parent.is('table'))
                    $parent = $element.closest("table");
                else
                    $parent = $element.closest("fieldset");
                var $form = $element.closest("form");
                return {$form : $form, $parent:$parent, $errorSpan: $form.find(".error-wrap")};
            }
        };

        var _getFieldNameFromLabel = function ($element){
            var $parent = $element.parent();
            if ($parent.is('td'))
                $parent = $element.closest("tr");
            else if ($parent.is('p')){
                //nothing...
            }
            else
                $parent = $element.closest("fieldset");

            var $label = $parent.find("label[for='"+ $element.attr('id') +"']");
            if($label.length !== 0)
                return $.trim($label.text()).split(":")[0];
            else
                return "This Field";
        };

        return{
            setFormErrorMsg : function ($errorEle){
                _setFormErrorMsg($errorEle);
            },
            setErrorMsg : function ($errorEle, $element, errorMsg){
                _setErrorMsg ($errorEle, $element, errorMsg);
            },
            clearErrorMsg : function ($errorEle){
                _clearErrorMsg ($errorEle);
            },
            getFieldNameFromLabel : function ($element){
               return _getFieldNameFromLabel($element);
            },
            validateNumericField : function (element, config){
                return _validateNumberField(element, config);
            },
            validateField : function(element, config){
                return _validateField (element, config);
            },
            validatePassword : function (element, config){
                return _validatePasswordField(element,config);
            }
        }
    }();
    App.log('AgencyMgmt-Util Loaded');
});


