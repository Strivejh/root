<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">    
<meta http-equiv="description" content="SGFM-TRADE">

<link rel="stylesheet" href="${ctx}/jqueryui1.9/development-bundle/themes/base/jquery.ui.all.css">
<script src="${ctx}/jqueryui1.9/development-bundle/ui/jquery.ui.core.js"></script>
<script src="${ctx}/jqueryui1.9/development-bundle/ui/jquery.ui.widget.js"></script>
<script src="${ctx}/jqueryui1.9/development-bundle/ui/jquery.ui.button.js"></script>
<script src="${ctx}/jqueryui1.9/development-bundle/ui/jquery.ui.position.js"></script>
<script src="${ctx}/jqueryui1.9/development-bundle/ui/jquery.ui.menu.js"></script>
<script src="${ctx}/jqueryui1.9/development-bundle/ui/jquery.ui.autocomplete.js"></script>
<script src="${ctx}/jqueryui1.9/development-bundle/ui/jquery.ui.tooltip.js"></script>
<link rel="stylesheet" href="${ctx}/css/ui/demos.css">

<script>
(function( $ ) {
	$.widget( "ui.combobox", {
		_create: function() {
			
			var input,
				that = this,
				select = this.element.hide(),
				selected = select.children( ":selected" ),
				value = selected.text(),
				wrapper = this.wrapper = $( "<span>" )
					.addClass( "ui-combobox" )
					.insertAfter( select );
				//alert(value);
				
			function removeIfInvalid(element) {
				var value = $( element ).val(),
					matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( value ) + "$", "i" ),
					valid = false;
				select.children( "option" ).each(function() {
					if ( $( this ).text().match( matcher ) ) {
						this.selected = valid = true;
						return false;
					}
				});
				
				if ( !valid ) {
					// remove invalid value, as it didn't match anything
					$( element )
						.val( "" )
						.attr( "title", value + " didn't match any item" )
						.tooltip( "open" );
					select.val( "" );
					setTimeout(function() {
						input.tooltip( "close" ).attr( "title", "" );
					}, 2500 );
					input.data( "autocomplete" ).term = "";
					return false;
				}
			}
			
			input = $( "<input>" )
				.appendTo( wrapper )
				.val( value )
				.attr( "title", "" )
				.addClass( "ui-combobox-input" )
				.bind("click",function(){
				    $(this).parent().find("a").click();
				})
				.autocomplete({
					delay: 0,
					minLength: 0,
					source: function( request, response ) {
						var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
						response( select.children( "option" ).map(function() {
							var text = $( this ).text();
							if ( ( !request.term || matcher.test(text) ) )
								return {
									label: text.replace(
										new RegExp(
											"(?![^&;]+;)(?!<[^<>]*)(" +
											$.ui.autocomplete.escapeRegex(request.term) +
											")(?![^<>]*>)(?![^&;]+;)", "gi"
										), "<font color='red'>$1</font>" ),
									value: text,
									option: this
								};
						}) );
					},
					select: function( event, ui ) {
						ui.item.option.selected = true;
						that._trigger( "selected", event, {
							item: ui.item.option
						});
					},
					change: function( event, ui ) {
						//if(value != ""){
							alert(value);
						//}
						if(select.attr("linkage")){
							dataChange();
						}
						if ( !ui.item )
							return removeIfInvalid( this );
					}
				})
				.addClass( "ui-widget ui-widget-content ui-corner-left" );

			input.data( "autocomplete" )._renderItem = function( ul, item ) {
				var valueLable = item.label.replace(/<font color='red'>/g, '').replace(/<\/font>/g, '');
				//alert(valueLable);
				//alert(input.val()+" --- "+valueLable);
				if(valueLable == input.val())
				   return $( "<li>" )
					.data( "item.autocomplete", item )
					.append( "<a style=\"background: green;color:white\">" + item.label + "</a>" )
					.appendTo( ul );
				else
					return $( "<li>" )
						.data( "item.autocomplete", item )
						.append( "<a>" + item.label + "</a>" )
						.appendTo( ul );
			};

			$( "<a>" )
				.attr( "tabIndex", -1 )
				.attr( "title", "Show All Items" )
				.tooltip()
				.appendTo( wrapper )
				.button({
					icons: {
						primary: "ui-icon-triangle-1-s"
					},
					text: false
				})
				.removeClass( "ui-corner-all" )
				.addClass( "ui-corner-right ui-combobox-toggle" )
				.click(function() {
					// close if already visible
					if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
						input.autocomplete( "close" );
						removeIfInvalid( input );
						return;
					}

					// work around a bug (likely same cause as #5265)
					$( this ).blur();

					// pass empty string as value to search for, displaying all results
					input.autocomplete( "search", "" );
					input.focus();
				});

				input
					.tooltip({
						position: {
							of: this.button
						},
						tooltipClass: "ui-state-highlight"
					});
		},

		destroy: function() {
			this.wrapper.remove();
			this.element.show();
			$.Widget.prototype.destroy.call( this );
		}
	});
})( jQuery );

function showMatch(leagueId){	
	var url2 = '${ctx}/core/matchType.getMatchQueryInfo.do?t='+new Date().getTime()+"";
	$.getJSON(url2,  function(resdata){
		$("#matchInfo").empty();
		$("#matchInfo").append("<option value='' st='' selected>---所有赛事---</option>");
		$.each(resdata.data, function(i, item) {   
           $("#matchInfo").append("<option value='"+item.matchId+"'>"+  item.matchName +"["+item.startDate+"]"+"</option>");
		}); 	
	});	
}
function initSelect(sid){
	$("#"+sid).val($("#"+sid).attr("initval"));
}
</script>
<style>

</style>
<a style="font: bold; background: green;"></a>
