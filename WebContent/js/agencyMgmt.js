var AgencyMgmt = AgencyMgmt || {}; // only global property, the root of our namespace
$(function() {
    // Common Function
    AgencyMgmt.Common = function () {
        var _validateSettings = function ($form, action){
            var result=true;
            if (action=='betSettings'){
                result = result & AgencyMgmt.BetSettings.validateSettings($form);
            }
            else if (action=='positionTaking' || action=='minPT') {
                result = result & AgencyMgmt.PosTaking.validateSettings($form);
            }
            else if (action=='transfer') {
                result = result & AgencyMgmt.TxfrCond.validateSettings($form);
            }
            else if (action=='commission') {
                result = result & AgencyMgmt.Comm.validateSettings($form);
            }
            else if (action=='editInfo') {
                result = result & AgencyMgmt.UserInfo.validateSettings($form);
            }
            else if (action=='creditLimit') {
                result = result & AgencyMgmt.CL.validateSettings($form);
            }
            else if (action=='saveTmpl') {
                result = result & AgencyMgmt.Comm.validateSettings($form) & AgencyMgmt.BetSettings.validateSettings($form)
                    & AgencyMgmt.PosTaking.validateSettings($form);
            }
            else if (action=='qmCreate') {
                result = result & AgencyMgmt.UserInfo.validateSettings($form) & AgencyMgmt.CL.validateSettings($form);
            }
            else if (action=='createAgent' || action=='editAgent') {
                result = result & AgencyMgmt.UserInfo.validateSettings($form) & AgencyMgmt.Comm.validateSettings($form)
                    & AgencyMgmt.BetSettings.validateSettings($form) & AgencyMgmt.PosTaking.validateSettings($form)
                    & AgencyMgmt.TxfrCond.validateSettings($form) & AgencyMgmt.CL.validateSettings($form);
            }
            else{
                result = false;
            }
            if (!result){
                AgencyMgmt.Util.setFormErrorMsg($form.find(".error-wrap"));
                return false;
            } else
                return true;
        };

        return{
            setComboValue : function (comboId, value){
                var exists =  $("#" + comboId + ":has(option[value='" + value +"'])").length > 0;
                if (exists){
                    $("#" + comboId).val(value);
                }
            },
            addComboOption : function (element){
                if ($(element).length!=0){
                    var text='';
                    var val='-1';
                    if (arguments.length>2){
                        val = arguments[1];
                        text = arguments[2];
                    } else if (arguments.length==2){
                        val = arguments[1];
                        text = arguments[1];
                    }
                    var opt = document.createElement('option');
                    opt.text = text;
                    opt.value = val;
                    try { element.add(opt, null);  }  // standards compliant; doesn't work in IE
                    catch(ex) { element.add(opt); } // IE only
                }

            },
            validateSettings : function ($form, action){
                return _validateSettings($form, action);
            }
        }
    }();
    App.log('AgencyMgmt-Common Loaded');
});

var AgencyMgmt = AgencyMgmt || {}; // only global property, the root of our namespace
$(function() {
        //PosTaking Functions
        AgencyMgmt.PosTaking = function () {

            var _populatePosTakingComboValues = function ($comboEle){
                if ($comboEle==null || $comboEle.size()==0) return;
                var minVal = parseInt($comboEle.attr('min-val'));
                var maxVal = parseInt($comboEle.attr('max-val'));
                $comboEle.empty();
                if (minVal <= maxVal){
                    for (var i=minVal; i <= maxVal; i++){
                        AgencyMgmt.Common.addComboOption($comboEle[0],i);
                    }
                } else {
                    for (var i=minVal; i >= maxVal; i--){
                        AgencyMgmt.Common.addComboOption($comboEle[0],i);
                    }
                }
                $comboEle.prop('value',$comboEle.attr('init-val'));
            };

            var _populateMinPosCombo = function ($eleMaxPos,$eleMinPos){
                if ($eleMinPos==null || $eleMinPos.size()==0)  return;

                var minPosVal = parseInt($eleMinPos.prop('value'));
                var maxPosVal = parseInt($eleMaxPos.prop('value'));
                $eleMinPos.empty();
                for (var val=0; val<=maxPosVal; val++)
                    AgencyMgmt.Common.addComboOption($eleMinPos[0],val);
                $eleMinPos.prop('value',minPosVal>maxPosVal?maxPosVal:minPosVal);
            };

            var _populateMaxPosComboV2 = function ($sourceEle){
                var $eleMaxPos = $sourceEle.closest('tbody').find('td[type="maxpos"][ptg="' + $sourceEle.attr('ptg-id') + '"] > select').first();
                if ($eleMaxPos==null || $eleMaxPos.size()==0)  return;
                var $eleMinPos = $sourceEle.closest('tbody').find('td[type="minpos"][ptg="' + $sourceEle.attr('ptg-id') + '"] > select').first();
                var $eleChk = $sourceEle.closest('tbody').find('td[type="auto"][ptg="' + $sourceEle.attr('ptg-id') + '"] > input[type="checkbox"]').first();

                var maxPosVal = parseInt($eleMaxPos.prop('value'));
                var maxPT = parseInt($eleMaxPos.attr('max-pt'));
                var minPT = parseInt($eleMaxPos.attr('min-pt'));
                var isPreset = !($eleChk!=null && $eleChk.size() >0 && $eleChk.prop('checked'));
                var sourceVal = parseInt($sourceEle.prop('value'));
                var startVal = minPT - sourceVal;
                if(startVal<0) startVal=0;
                var endVal = maxPT;
                if (isPreset)endVal = maxPT - sourceVal;

                if ($eleMinPos==null || $eleMinPos.size()==0){
                    // If the minPos UI is not there, then we must
                    // not let user able to select a maxPos < minPos
                    var minPos = parseInt($eleMaxPos.attr('min-pos'));
                    if (minPos>startVal) startVal=minPos;
                }
                $eleMaxPos.empty();
                for (var val=startVal; val<=endVal; val++)
                    AgencyMgmt.Common.addComboOption($eleMaxPos[0],val);

                var newVal= isPreset? (maxPT - sourceVal):maxPosVal ;
                if(newVal<startVal)newVal= startVal;
                if(newVal>endVal)newVal= endVal;
                $eleMaxPos.prop('value',newVal);
                _populateMinPosCombo($eleMaxPos, $eleMinPos);
            };

            var _toggleAutoPT = function($autoChkEle){
                var isChecked = $autoChkEle.prop('checked');
                var $presetEle = $autoChkEle.closest('tbody').find('td[type="preset"][ptg="' + $autoChkEle.attr('ptg-id') + '"] > select').first();
                var $autoEle = $autoChkEle.parent().find('select').first();

                $presetEle.prop('disabled',isChecked);
                $autoEle.prop('disabled',!isChecked);
                $presetEle.addClass(isChecked?'pt-input-inactive':'pt-input-active');
                $presetEle.removeClass(isChecked?'pt-input-active':'pt-input-inactive');
                $autoEle.addClass(!isChecked?'pt-input-inactive':'pt-input-active');
                $autoEle.removeClass(!isChecked?'pt-input-active':'pt-input-inactive');
                if (isChecked){
                    //checked... means autoPT... if init Value is auto...
                    // then default to init value.... else default to maxPT.... set Preset to 0...
                    $presetEle.prop('value',0);
                    $autoEle.prop('value',$autoEle.attr('init-val')>0?$autoEle.attr('init-val'):$autoEle.attr('max-pt'));
                }else {
                    //unchecked ... mean preset... if init val >0 ...d efault to init value....
                    //else default to maxPT...
                    $presetEle.prop('value',$presetEle.attr('init-val')>0?$presetEle.attr('init-val'):$presetEle.attr('max-pt'));
                    $autoEle.prop('value',0);
                }
                _populateMaxPosComboV2(isChecked?$autoEle:$presetEle);
                if (isChecked){
                    //it it is initial autoPT and niw it is checked back... restore the initial maxPos val else set to minPT
                    var $maxPosEle = $autoChkEle.closest('tbody').find('td[type="maxpos"][ptg="' + $autoChkEle.attr('ptg-id') + '"] > select').first();
                    $maxPosEle.prop('value',$autoEle.attr('init-val')>0? $maxPosEle.attr('init-val'): $maxPosEle.attr('min-pt'));
                }

            };

            var _toggleCopyPtg = function ($eleChk){
                var isChecked = $eleChk.prop('checked');
                var $tds = $eleChk.closest('tbody').find('td.cell-ptg-slave-'+ $eleChk.attr('ptg'));
                $tds.removeClass(isChecked?'table-cell':'table-cell-disabled');
                $tds.addClass(isChecked?'table-cell-disabled':'table-cell');
                $tds.find(isChecked?'input[type="checkbox"],select':'.pt-input-active').prop("disabled", isChecked);
            };

            var _toggleCopyPtgSoccer = function ($table, checked){
                var $tbodySoccer = $table.find('tbody.div-pt-spt-soccer');
                var $obj =  $tbodySoccer.find('tr > td > input[type="checkbox"]');
                var checkedStatus = $obj.prop("checked");
                if (checkedStatus == checked) return;
                var requiredToggle = false;
                // If currentStatus = true && checked==false.... need to toggle to false...
                // else if  currentStatus=false && checked=true ... toggle to true if all checks are true...
                if (checkedStatus && !checked)
                    requiredToggle=true;
                else if (!checkedStatus && checked){
                    var allChecked = true;
                    $table.find('tbody.div-pt-spt-others > tr > td > input[type="checkbox"]').each(function( index , ele ) {
                        allChecked = allChecked && $(ele).prop("checked");
                    });
                    requiredToggle = allChecked;
                }

                if (requiredToggle){
                    var $tbody = $tbodySoccer.next();
                    $tbodySoccer.find('tr > td > input[type="checkbox"]').prop("checked", checked);
                    var $tds = $tbody.find('td.cell-ptg-spt-slave.' + (checked?'table-cell':'table-cell-greyed'));
                    $tds.removeClass(checked?'table-cell':'table-cell-greyed');
                    $tds.addClass(checked?'table-cell-greyed':'table-cell');
                    $tds.find(checked?'input[type="checkbox"],select':'.pt-input-active').prop("disabled", checked);
                    $tbody.find('td.pt-gp-hdr > input[type="checkbox"]').prop("disabled", checked);
                }
            };

            var _toggleCopyPtgSpt =  function ($eleSptChk){
                var isChecked = $eleSptChk.prop('checked');
                var $tbody = $eleSptChk.closest('tbody').next();
                var $tds = $tbody.find('td.cell-ptg-spt-slave.' + (isChecked?'table-cell':'table-cell-greyed'));
                $tds.removeClass(isChecked?'table-cell':'table-cell-greyed');
                $tds.addClass(isChecked?'table-cell-greyed':'table-cell');
                $tds.find(isChecked?'input[type="checkbox"],select':'.pt-input-active').prop("disabled", isChecked);
                $tbody.find('td.pt-gp-hdr > input[type="checkbox"]').prop("disabled", isChecked);
                _toggleCopyPtgSoccer($tbody.closest('table'),isChecked);
            };

            var _toggleCopyPtgSptAll = function ($eleCopyAllChk){
                var isChecked = $eleCopyAllChk.prop('checked');
                var $table = $eleCopyAllChk.closest('table');
                var $tds = $table.find('td.cell-ptg-spt-slave.' + (isChecked?'table-cell':'table-cell-greyed'));
                $tds.removeClass(isChecked?'table-cell':'table-cell-greyed');
                $tds.addClass(isChecked?'table-cell-greyed':'table-cell');
                $tds.find(isChecked?'input[type="checkbox"],select':'.pt-input-active').prop("disabled", isChecked);
                $table.find('td.pt-gp-hdr > input[type="checkbox"]').prop("disabled", isChecked);
                $table.find('tbody.div-pt-spt-others > tr > td > input[type="checkbox"]').prop("checked", isChecked);
            };

            var _toggleEditSport =  function ($obj){
                // This function is to Hide/Unhide "Other Sports"
                var $tbl = $obj.closest('table');
                var $tbody = $obj.closest('tbody').next();
                $tbl.css("border-collapse", "separate");
                var isHidden = $tbody.is(':hidden');
                $tbody.toggle();
                $obj.removeClass(isHidden?"expand":"collapse");
                $obj.addClass(isHidden?"collapse":"expand");
                $tbl.css("border-collapse", "collapse");
            };

            return{
                loadPosTakingComboValues: function ($table)  {
                    var $selects = $table.find('select.pt-type-auto,select.pt-type-preset,select.pt-type-maxpos,select.pt-type-minpos');
                    $selects.each(function( index, element ){
                        _populatePosTakingComboValues($(element));
                    });
                },

                populateMinPosCombo: function (eleMaxPos){
                    var $eleMinPos = $(eleMaxPos).closest('tbody').find('td[type="minpos"][ptg="' + $(eleMaxPos).attr('ptg-id') + '"] > select').first();
                    _populateMinPosCombo($(eleMaxPos),$eleMinPos);
                },

                changePresetValue: function(presetEle){
                    _populateMaxPosComboV2($(presetEle));
                },

                changeAutoValue: function (eleAuto){
                    _populateMaxPosComboV2($(eleAuto));
                },

                toggleAutoPT: function(autoChkEle){
                    _toggleAutoPT($(autoChkEle));
                },

                toggleCopyPtg: function (eleChk){
                    _toggleCopyPtg($(eleChk));
                },

                toggleCopyPtgSpt: function (eleSptChk){
                    _toggleCopyPtgSpt($(eleSptChk));
                },

                toggleCopyPtgSptAll : function (eleCopyAllChk){
                    _toggleCopyPtgSptAll($(eleCopyAllChk));
                },

                toggleEditSport: function (ele){
                    _toggleEditSport($(ele));
                },

                validateSettings : function($form) {
                    var noError = true;
                    /* this is a facility to put it UI validations before submission. as of the moment this use case don't have any needed validations */
                    return noError;
                }
            }
        }();

    App.log('AgencyMgmt-PosTaking Loaded');
});

var AgencyMgmt = AgencyMgmt || {}; // only global property, the root of our namespace
$(function() {
        // BetSettings Functions
        AgencyMgmt.BetSettings = function () {
            var _getParentElement = function($element){
                if ($element.is('form'))
                    return $element.find("fieldset[data-gp='bs']").first();
                else if ($element.is('fieldset'))
                    return $element;
                else
                    return $element.closest('fieldset');
            };

           var _updateMinMaxValues = function(prefix, data){
               var $infoEle = $('#' + prefix +'betSettings_info');
               // update the minMaxValues...
               $infoEle.attr('max-of-min',data.maxOfMinBetParent);
               $infoEle.attr('min-of-max',data.minOfMaxBetParent);
               $infoEle.attr('min-of-max-pm',data.minOfMaxPerMatchParent);
               // update soccer values
               var parentSettings = data.parentBetSettings;
               for (var i=0; i<parentSettings.length; i++) {
                   var p = parentSettings[i];
                   if (p.sport==1){
                       $infoEle.attr('soccer-max-of-min',p.minBet);
                       $infoEle.attr('soccer-min-of-max',p.maxBet);
                       $infoEle.attr('soccer-min-of-max-pm',p.maxPerMatch);
                       break;
                   }
               }
            };

            var _updateSoccerGLs= function(prefix){
                var isChecked = $('#' + prefix +  'copyBS').prop('checked');
                var $infoEle = $('#' + prefix +'betSettings_info');
                var minBet = isChecked?$infoEle.attr('max-of-min'): $infoEle.attr('soccer-max-of-min');
                var maxBet = isChecked?$infoEle.attr('min-of-max'): $infoEle.attr('soccer-min-of-max');
                var maxPerMatch = isChecked?$infoEle.attr('min-of-max-pm'): $infoEle.attr('soccer-min-of-max-pm');
                var str = prefix + "betSettings_1";
                $("#"+str+"_minBet").attr("data-guideLine", minBet);
                $("#"+str+"_minBet_guideLineSpan").text(App.utils.formatCurrency(minBet));
                $("#"+str+"_maxBet").attr("data-guideLine", maxBet);
                $("#"+str+"_maxBet_guideLineSpan").text(App.utils.formatCurrency(maxBet));
                $("#"+str+"_maxPerMatch").attr("data-guideLine", maxPerMatch);
                $("#"+str+"_maxPerMatch_guideLineSpan").text(App.utils.formatCurrency(maxPerMatch));
            };

            var _copyToOtherSports = function (obj) {
                var $parent = _getParentElement($(obj));
                var prefix= $parent.attr('prefix');
                _updateSoccerGLs(prefix);
                var isChecked = $('#' + prefix +  'copyBS').prop('checked');
                if (isChecked){
                    var $inputs =  $parent.find('.bs-other-spt');
                    $inputs.prop('disabled',true);
                    $inputs.removeClass('error'); // clear the error class
                    $parent.find('.bs-other-spt-gl').hide();
                } else {
                    $parent.find('.bs-other-spt').prop('disabled',false);
                    $parent.find('.bs-other-spt-gl').show();
                }
                // revalidate values....
                _validateSettings($parent);
                return false;
            };

            var _updateGuidelineValues = function ($form, data) {
                var $parent = _getParentElement($form);
                var prefix= $parent.attr('prefix');
                _updateMinMaxValues(prefix, data);
                var parentSettings = data.parentBetSettings;
                for (i=0; i<parentSettings.length; i++) {
                    var p = parentSettings[i];
                    var str = prefix + "betSettings_"+ p.sport;
                    if (p.sport==1){
                        _updateSoccerGLs(prefix);
                    } else {
                        //update the  DataGuidelines...
                        $("#"+str+"_minBet").attr("data-guideLine", p.minBet);
                        $("#"+str+"_minBet_guideLineSpan").text(App.utils.formatCurrency(p.minBet));
                        $("#"+str+"_maxBet").attr("data-guideLine", p.maxBet);
                        $("#"+str+"_maxBet_guideLineSpan").text(App.utils.formatCurrency(p.maxBet));
                        if (p.sport!=0) {
                            $("#"+str+"_maxPerMatch").attr("data-guideLine", p.maxPerMatch);
                            $("#"+str+"_maxPerMatch_guideLineSpan").text(App.utils.formatCurrency(p.maxPerMatch));
                        }
                    }
                }
                //reValidate the values
                _validateSettings($parent);
            };

            var _validateSettings = function($element){
                var $parent = _getParentElement($element);
                var prefix= $parent.attr('prefix');
                var isChecked = $('#' + prefix +  'copyBS').prop('checked');
                var labels = isChecked?$parent.find("label[for='" + prefix + "betSettings_1']") : $parent.find("label[for^='" + prefix + "betSettings_']");
                var noError = 1;
                $(labels).each(function( index , ele ) {
                    noError = noError & _validateValues(ele);
                });
                return noError==1;
            };

            var _validateValues  = function (element) {
                var $element = $(element);
                if ($element == null || $element.size() == 0) {
                    return true;
                }
                var $parent = $element.closest("tr");
                var $label = $element.is('label')? $element : $parent.find('label').first();
                var sportName = '[' + $label.text() + '] - ';
                var bets =[];
                $parent.find("input[type=text]").each(function( index , ele ) {
                    var guideLine = +$(ele).attr("data-guideline");
                    var value = +$(ele).val();
                    var isEmpty = $.trim($(ele).val())=='';
                    bets.push({$ele:$(ele), hasError:false, isEle : $(ele).is($element), errMsg:'',
                                guideLine:guideLine, value: value, isEmpty:isEmpty});
                });
                var minBet=bets[0], maxBet=bets[1], maxBetPM=bets[2];
                // Begin Validations ....
                if(minBet.value <= 0 || minBet.value  >= 1e20 || minBet.value  < minBet.guideLine || minBet.isEmpty){
                    minBet.hasError=true;
                    minBet.errMsg = sportName +  AgencyMgmt.Resource.getErrorMsg(minBet.isEmpty? 'dataRequired' : 'dataInvalid',
                                            AgencyMgmt.Resource.getFieldName('minBet'));
                }
                if(maxBet.value < 0 || maxBet.value >= 1e20 || (maxBet.guideLine != 0 && (maxBet.value === 0 || maxBet.value > maxBet.guideLine)) || maxBet.isEmpty) {
                    maxBet.hasError=true;
                    maxBet.errMsg = sportName + AgencyMgmt.Resource.getErrorMsg(maxBet.isEmpty? 'dataRequired' : 'dataInvalid',
                        AgencyMgmt.Resource.getFieldName('maxBet'));
                }
                if (!isNaN(maxBetPM.guideLine)) {
                    if(maxBetPM.value < 0 || maxBetPM.value >= 1e20 || (maxBetPM.guideLine != 0 && (maxBetPM.value === 0 || maxBetPM.value > maxBetPM.guideLine)) || maxBetPM.isEmpty){
                        maxBetPM.hasError = true;
                        maxBetPM.errMsg = sportName + AgencyMgmt.Resource.getErrorMsg(maxBetPM.isEmpty? 'dataRequired' : 'dataInvalid',
                            AgencyMgmt.Resource.getFieldName('maxPerMatch'));
                    }
                }
                if(minBet.value > maxBet.value && maxBet.value !== 0) {
                    if (!minBet.hasError || !maxBet.hasError){
                        minBet.errMsg = sportName + AgencyMgmt.Resource.getErrorMsg('maxBetSmallerThanMinBet');
                        maxBet.errMsg = sportName + AgencyMgmt.Resource.getErrorMsg('maxBetSmallerThanMinBet')
                    }
                    minBet.hasError = true;
                    maxBet.hasError = true;
                }
                if (minBet.value > maxBetPM.value && maxBetPM.value !== 0) {
                    if (!minBet.hasError || !maxBetPM.hasError){
                        minBet.errMsg = sportName + AgencyMgmt.Resource.getErrorMsg('maxBetPerMatchSmallerThanMinBet');
                        maxBetPM.errMsg = sportName + AgencyMgmt.Resource.getErrorMsg('maxBetPerMatchSmallerThanMinBet');
                    }
                    minBet.hasError = true;
                    maxBetPM.hasError = true;
                }
                if((maxBet.value > maxBetPM.value && maxBetPM.value !== 0) || (maxBet.value === 0 && maxBetPM.value > 0)) {
                    if (!maxBet.hasError || !maxBetPM.hasError){
                       maxBet.errMsg =  sportName + AgencyMgmt.Resource.getErrorMsg('maxBetPerMatchSmallerThanMaxBet');
                       maxBetPM.errMsg = sportName + AgencyMgmt.Resource.getErrorMsg('maxBetPerMatchSmallerThanMaxBet');
                    }
                    maxBet.hasError = true;
                    maxBetPM.hasError = true;
                }

                // Toggle the class
                var errorSpan = $element.closest("form").find(".error-wrap")[0];
                var hasError = false;
                var betObj;
                for (var i=0; i<bets.length; i++){
                    betObj = bets[i];
                    hasError = hasError || betObj.hasError;
                    if (betObj.hasError) betObj.$ele.addClass("error");
                    else betObj.$ele.removeClass("error");
                    if (betObj.isEle) {
                        if (betObj.hasError) AgencyMgmt.Util.setErrorMsg($(errorSpan),$element,betObj.errMsg);
                        else AgencyMgmt.Util.clearErrorMsg($(errorSpan));
                    }
                }
                return !hasError;
            };

           return{
                validateSettings: function($element){
                    return _validateSettings($element);
                },
                validateValues : function (element) {
                    return _validateValues(element);
                },
                copyToOtherSports: function (obj) {
                    return _copyToOtherSports(obj);
                },
                updateGuidelineValues: function ($form, data) {
                    _updateGuidelineValues($form, data)
                }
            }
        }();

    App.log('AgencyMgmt-BetSettings Loaded');
});

var AgencyMgmt = AgencyMgmt || {}; // only global property, the root of our namespace
$(function() {
    // Credit Limit Function
    AgencyMgmt.CL = function () {
        var _getParentElement = function ($element){
            if ($element.is('form')){
                var $table = $element.find("fieldset[data-gp='info'] table");
                if ($table.length==0)
                    return $element.find("table").first();
                else
                    return $table.first();
            }
            else if ($element.is('fieldset'))
                return $element.find("table").first();
            else if ($element.is('table'))
                return $element;
            else
                return $element.closest('table');
        };

        var _reloadCreditGuidelines = function ($parent, creditLimitVal,memberMaxCreditVal){
            // Update Guidelines
            _updateCreditGuideLineVal ($parent, creditLimitVal, memberMaxCreditVal);
            // Credit Limit
            var creditLimitEle = $parent.find("input[name='creditLimit']")[0];
            _updateGuideLines (creditLimitEle);
            // AgentMaxCredit
            var agentMaxCreditEle = $parent.find("input[name='downlineMaxCredit']");
            if (agentMaxCreditEle.length>0)
                _updateGuideLines (agentMaxCreditEle[0]);
            // MemberMaxCredit
            var memberMaxCreditEle = $parent.find("input[name='memberMaxCredit']");
            if (memberMaxCreditEle.length>0)
                _updateGuideLines (memberMaxCreditEle[0]);
        };

        var _validateSettings = function ($form){
            return !_validateValues($form);
        };

        var _updateCreditGuideLineVal = function ($parent, creditLimitVal, parentMaxMemberVal){
            // Update CreditLimit Guideline...
            var $creditLimit = $parent.find("input[name='creditLimit']").first();
            var $creditLimitSpan = $parent.find("span[name='creditLimit_guideLineSpan']").first();
            $creditLimitSpan.text(App.utils.formatCurrency(creditLimitVal));
            $creditLimit.attr('data-guideline',creditLimitVal);
            // Update parentMaxMemberCL attribute
            var $memberMaxCredit = $parent.find("input[name='memberMaxCredit']").first();
            if ($memberMaxCredit.length!=0){
                $memberMaxCredit.attr('max-cl',parentMaxMemberVal);
            }
        };

        var _updateGuideLines = function (element){
            var $element = $(element);
            if ($element == null || $element.size() == 0)
                return;
            var $parent = $element.closest("table");
            var $creditLimit = $parent.find("input[name='creditLimit']").first();
            var $exposure = $parent.find("input[name='exposure']").first();
            var $agentMaxCredit = $parent.find("input[name='downlineMaxCredit']").first();
            var $memberMaxCredit = $parent.find("input[name='memberMaxCredit']").first();

            // From Credit Limit...
            if ($element.is($creditLimit)){
                // if got exposure element...
                if ($exposure.length!=0)
                    _updateMaxAgentAndExposureGL($parent, $creditLimit, $agentMaxCredit, $exposure);
                // if got agentMaxCredit
                else if ($agentMaxCredit.length!=0)
                    _updateMaxAgentGL($parent, $creditLimit, $agentMaxCredit);
                // if got memberMaxCredit
                else if ($memberMaxCredit.length!=0)
                    _updateMaxMemberGL($parent, $creditLimit, $memberMaxCredit);

                // validate the CreditLimit Value
                _validateValues($creditLimit);
            }
            // From AgentMaxCredit
            else if ($element.is($agentMaxCredit)){
                // if got memberMaxCredit
                if ($memberMaxCredit.length!=0)
                    _updateMaxMemberGL($parent, $agentMaxCredit, $memberMaxCredit);

                // validate the Agent MaxCredit Value
                _validateValues($agentMaxCredit);
            }
            // From MemberMaxCredit
            else if ($element.is($memberMaxCredit)){
                // validate the Member MaxCredit Value
                _validateValues($memberMaxCredit);
            }

        };

        var _updateMaxMemberGL = function ($parent, $element, $memberMaxCredit){
            var creditVal = +$element.val();
            var creditGuidelineVal=+$element.attr("data-guideline");
            var maxMemberGuideLineVal;
            if (creditVal > creditGuidelineVal)
                maxMemberGuideLineVal = creditGuidelineVal;
            else
                maxMemberGuideLineVal = creditVal;
            var parentMaxMemberVal = +$memberMaxCredit.attr('max-cl');
            if (parentMaxMemberVal<maxMemberGuideLineVal)
                maxMemberGuideLineVal = parentMaxMemberVal;
            if (maxMemberGuideLineVal<0)
                maxMemberGuideLineVal=0;

            // Update the  MaxMemberGL
            var $membertMaxCreditSpan = $parent.find("span[name='memberMaxCredit_guideLineSpan']").first();
            $membertMaxCreditSpan.text(App.utils.formatCurrency(maxMemberGuideLineVal));
            $memberMaxCredit.attr('data-guideline',maxMemberGuideLineVal);

        };

        var _updateMaxAgentGL = function ($parent, $creditLimit, $agentMaxCredit){
            var creditLimitVal = +$creditLimit.val();
            var creditLimitGuidelineVal =  +$creditLimit.attr("data-guideline");
            var maxAgentGuideLineVal;
            if (creditLimitVal > creditLimitGuidelineVal)
                maxAgentGuideLineVal = creditLimitGuidelineVal;
            else
                maxAgentGuideLineVal = creditLimitVal;
            if (maxAgentGuideLineVal<0)
                maxAgentGuideLineVal=0;

            // Update AgentMaxCreditGL
            var $agentMaxCreditSpan = $parent.find("span[name='downlineMaxCredit_guideLineSpan']").first();
            $agentMaxCreditSpan.text(App.utils.formatCurrency(maxAgentGuideLineVal));
            $agentMaxCredit.attr('data-guideline',maxAgentGuideLineVal);
        };

        var _updateMaxAgentAndExposureGL = function ($parent, $creditLimit, $agentMaxCredit, $exposure ){
            var creditLimitVal = +$creditLimit.val();
            if (creditLimitVal >= 1e20 || creditLimitVal<0)
                creditLimitVal=0;
            // Update AgentMaxCredit
            var $agentMaxCreditSpan = $parent.find("span[name='downlineMaxCredit_guideLineSpan']").first();
            $agentMaxCreditSpan.text(App.utils.formatCurrency(creditLimitVal));
            $agentMaxCredit.attr('data-guideline',creditLimitVal);
            // Update Exposure
            var $exposureSpan = $parent.find("span[name='exposure_guideLineSpan']").first();
            $exposureSpan.text(App.utils.formatCurrency(creditLimitVal));
            $exposure.attr('data-guideline',creditLimitVal);
        };

        var _updateGuideLinesQM = function (element){
            var $element = $(element);
            if ($element == null || $element.size() == 0)
                return;

            // Objects...
            var $parent = $element.closest("table");
            var creditLimits = $parent.find("input[data-gp='cl']");
            var $memberCL = $(creditLimits).last();
            // update GLs
            var $curEle, $nextEle;
            for (var i=0; i<creditLimits.length-1; i++){ // excludes member....
                $curEle = $(creditLimits[i]);
                $nextEle = $(creditLimits[i+1]);
                if (parseInt($curEle.attr('order'))>=parseInt($element.attr('order'))) {
                    _updateDlGuideLineQM ($curEle,$nextEle, $memberCL);
                }
            }
            // validate GLs
            _validateValues(element);
        };

        var _updateDlGuideLineQM = function ($element, $nextEle, $memberEle){
            if ($element.is($memberEle) )
                return;
            var creditVal = +$element.val();
            var creditGuidelineVal=+$element.attr("data-guideline");
            var dlGuideLineVal;
            if (creditVal > creditGuidelineVal)
                dlGuideLineVal = creditGuidelineVal;
            else
                dlGuideLineVal = creditVal;
            if ($nextEle.is($memberEle)){
                var parentMaxMemberVal = +$memberEle.attr('max-cl');
                var memCnt = +$memberEle.attr('mem-cnt');
                dlGuideLineVal =  Math.floor(dlGuideLineVal / memCnt);
                if (parentMaxMemberVal<dlGuideLineVal)
                    dlGuideLineVal = parentMaxMemberVal;
            }
            if (dlGuideLineVal<0)
                dlGuideLineVal=0;

            // Update DownLineCreditGL
            var $dlCreditSpan = $nextEle.parent().find("span[name='creditLimit_guideLineSpan']").first();
            $dlCreditSpan.text(App.utils.formatCurrency(dlGuideLineVal));
            $nextEle.attr('data-guideline',dlGuideLineVal);
        };

        var _validateValues  = function (element) {
            var $element = $(element);
            if ($element == null || $element.size() == 0) {
                return false;
            }
            //Objects....
            var $parent = _getParentElement($element);
            var creditLimits = $parent.find("input[data-gp='cl']");
            var limits =[];
            var obj;
            var $thisEl;
            for (var i=0; i<creditLimits.length; i++){
                $thisEl = $(creditLimits[i]);
                obj = {
                    $ele:$thisEl, hasError:false, isEle : $element.is($thisEl),
                    fieldName : AgencyMgmt.Util.getFieldNameFromLabel($thisEl), errMsg:''
                };
                limits.push(obj);
            }
            return _validateFields ($element, limits);
        };

        var _validateFields = function($element, limits){
            var errorSpan = $element.closest("form").find(".error-wrap").get(0);
            var obj;
            for (var i=0; i<limits.length; i++){
                obj = limits[i];
                var creditVal = +obj.$ele.val();
                var guidelineVal = +obj.$ele.attr("data-guideline");
                if(obj.$ele.val().length === 0){/* element is required */
                    obj.errMsg = AgencyMgmt.Resource.getErrorMsg('dataRequired',obj.fieldName);
                    obj.hasError = true;
                }
                if(creditVal < 0 || creditVal >= 1e20 || creditVal > guidelineVal){ /* invalid value */
                    obj.errMsg = AgencyMgmt.Resource.getErrorMsg('dataInvalid',obj.fieldName);
                    obj.hasError = true;
                }
            }
            // Toggle the class
            var hasError = false;
            for (var j=0; j<limits.length; j++){
                obj = limits[j];
                hasError = hasError | obj.hasError;
                if (obj.hasError) obj.$ele.addClass("error");
                else obj.$ele.removeClass("error");
                if (obj.isEle) {
                    if (obj.hasError) AgencyMgmt.Util.setErrorMsg($(errorSpan),$element,obj.errMsg);
                    else AgencyMgmt.Util.clearErrorMsg($(errorSpan));
                }
            }
            return hasError;
        };

        return{
            validateValues : function (element){
                return _validateValues(element);
            },
            updateGuideLines : function (element){
                _updateGuideLines(element);
            },
            reloadGuideLines : function ($parent, creditLimitVal, memberMaxCreditVal){
                _reloadCreditGuidelines($parent,creditLimitVal, memberMaxCreditVal);
            },
            validateSettings : function ($form){
                return _validateSettings($form);
            },
            updateGuideLinesQM : function (element){
                _updateGuideLinesQM(element);
            }
        }
    }();
    App.log('AgencyMgmt-CL Loaded');
});

var AgencyMgmt = AgencyMgmt || {}; // only global property, the root of our namespace
$(function() {
        // TransferCond Function
        AgencyMgmt.TxfrCond = function(){

            return{
                disabledWeekdays: function() {
                    $('.weekday').removeAttr('checked');
                },
                selectWeekly: function(prefix) {
                    var objWeekly = document.getElementById(prefix+"trans-weekly");
                    $(objWeekly).prop('checked','checked');
                },
                validateSettings: function($form) {
                    var noError = true;
                    /* this is a facility to put it UI validations before submission. as of the moment this use case don't have any needed validations */
                    return noError;
                }
            }
        }();

        // Commission Function
        AgencyMgmt.Comm = function(){
            var _populateComboValues = function(minVal, maxVal, comboId){
                var rselect = document.getElementById(comboId);
                if (rselect){
                    $(rselect).empty();
                    minVal = minVal*100;
                    maxVal = maxVal*100;
                    for (var i=minVal; i <= maxVal; i++){
                        AgencyMgmt.Common.addComboOption(rselect,parseFloat(i/100).toFixed(2));
                    }
                    AgencyMgmt.Common.setComboValue(comboId,$(rselect).attr('initval'));
                }
            };
            var _loadComboValues = function(type){
                var valueObj = document.getElementById(type+"Range");
                if (valueObj){
                    var minVal = $(valueObj).attr('minval');
                    var maxVal = $(valueObj).attr('maxval');
                    _populateComboValues(parseFloat(minVal).toFixed(2), parseFloat(maxVal).toFixed(2), type);
                }
            };
            var _reloadMemberBinaryCommValues = function(){
                var commGp = parseInt($("#oddsGroup").val());
                $("#groupMemComm").empty();
                var objId="";
                if (commGp==1)
                    objId = "groupACommRange";
                else if (commGp==2)
                    objId = "groupBCommRange";
                else if (commGp==3)
                    objId = "groupCCommRange";
                else if (commGp==4)
                    objId = "groupDCommRange";
                var obj = document.getElementById(objId);
                if (obj){
                    var minVal = $(obj).attr('minval');
                    var maxVal = $(obj).attr('maxval');
                    $("#groupMemComm").attr('initval',maxVal);
                    _populateComboValues(parseFloat(minVal).toFixed(2), parseFloat(maxVal).toFixed(2), 'groupMemComm');
                    $("#groupMemCommRange").attr('minval',minVal);
                    $("#groupMemCommRange").attr('maxval',maxVal);
                }
             };

            return{
                validateSettings: function($form) {
                    var noError = true;
                    /* this is a facility to put it UI validations before submission. as of the moment this use case don't have any needed validations */
                    return noError;
                },
                loadComboValues :function(type){
                    _loadComboValues (type);
                },
                reloadMemberBinaryCommValues : function (){
                    _reloadMemberBinaryCommValues();
                }
            }
        }();

        // User Info
        AgencyMgmt.UserInfo = function () {
            var _reloadGuideLines = function (element, parentUserCode, isTopLevelAgent, childLevel){
                var $element = $(element);
                var currencyCode = $element.find('option:selected').text();
                var $parent = $element.closest("form");
                if (parseInt(isTopLevelAgent)==1){
                    _updateCurrencyGuideLine($parent,currencyCode);
                    return;
                }
                var params = "parentUserCode=" + parentUserCode + "&baseCurrency=" + $element.val() + "&level=" + childLevel;
                var destUrl = mainData.server.context.path + '/agentCreation/convertCreditLimit';
                App.ajaxExt({
                    url: destUrl,
                    data: params,
                    dataType: "json",
                    cache: false,
                    fnSuccess: function(data) {
                        // update Credit GLs
                        AgencyMgmt.CL.reloadGuideLines($parent,data.creditLimit, data.maxMemberParent);
                        // update BetSettings GLs
                        AgencyMgmt.BetSettings.updateGuidelineValues($parent,data);
                        // update Currency GLs
                        _updateCurrencyGuideLine($parent,currencyCode);
                    }
                });
            };
            var _updateCurrencyGuideLine = function ($parent, currencyCode){
                var $currencyGLs = $parent.find('span[name="currency_guideLineSpan"]');
                if ($currencyGLs.length>0)
                    $currencyGLs.text(currencyCode);
            };
            var _validateName = function(element) {
                var $element = $(element);
                if ($element == null || $element.size() == 0) {
                    return false;
                }
                return AgencyMgmt.Util.validateField(element, {maxChars:30});
            };
            var _validateContactNo = function(element) {
                var $element = $(element);
                if ($element == null || $element.size() == 0) {
                    return false;
                }
                return AgencyMgmt.Util.validateField(element, {maxChars:15});
            };
            var _validateSkypeInfo = function(element) {
                var $element = $(element);
                if ($element == null || $element.size() == 0) {
                    return false;
                }
                return AgencyMgmt.Util.validateField(element, {maxChars:32});
            };
            var _getParentElement = function($element){
                if ($element.is('form'))
                    return $element.find("fieldset[data-gp='info']").first();
                else if ($element.is('fieldset'))
                    return $element;
                else
                    return $element.closest('fieldset');
            };
            var _validateSettings = function ($element){
                var $parent = _getParentElement($element);
                var hasError = false;
                // validate names....
                var names = $parent.find("input[data-gp='name']");
                for (var i=0; i<names.length; i++){
                    hasError = hasError | _validateName(names[i]);
                }
                // validate contact no
                var contacts = $parent.find("input[data-gp='phone']");
                for (var j=0; j<contacts.length; j++){
                    hasError = hasError | _validateContactNo(contacts[j]);
                }
                // validate skype
                var skype = $parent.find("input[name='skypeAccount']");
                if (skype.length>0){
                    hasError = hasError |  _validateSkypeInfo(skype[0]);
                }
                // validate pwd ....
                hasError = hasError |  AgencyMgmt.Util.validatePassword($parent,{});

                return !hasError;
            };
            return{
                reloadGuideLines : function (element, parentUserCode, isTopLevelAgent, childLevel){
                    _reloadGuideLines(element, parentUserCode, isTopLevelAgent, childLevel);
                },
                validateName : function (element,type){
                    return _validateName(element,type);
                },
                validateContactNo : function (element,type){
                    return _validateContactNo(element,type);
                },
                validateSkypeInfo: function (element){
                    return _validateSkypeInfo(element);
                },
                validateSettings:  function ($element){
                    return _validateSettings($element);
                }
            }
        }();

        // Member Template
        AgencyMgmt.MemberTmpl = function () {
            var _saveTemplateValues = function(){
                var destUrl =  mainData.server.context.path + '/agentCreation/saveTemplate';
                var data = $('#agentCreationForm').serialize();
                App.invokeUrl({
                    destUrl: destUrl,
                    data: data,
                    successMessage: AgencyMgmt.Resource.getMessage('saveTemplateSuccess'),
                    fn: function(){
                        $('#loadTemplate').removeAttr("disabled");
                    },
                    fnError: function(resp){
                        //
                    }
                });
            };
            var _retrieveTemplateValues = function(parentUserCode){
                var destUrl =  mainData.server.context.path + '/agentCreation/loadTemplate?parentUserCode=' + parentUserCode;
                App.invokeUrl({
                    destUrl: destUrl,
                    successMessage: AgencyMgmt.Resource.getMessage('loadTemplateSuccess'),
                    fn: function(resp){
                        _loadTemplateValues($.parseJSON(resp));
                    },
                    fnError: function(resp){
                        //
                    }
                });
            };
            var _loadTemplateValues = function (data){
                if (data.templ){
                    // oddsGroup...
                    var oddsGpObj =document.getElementById('oddsGroup');
                    $(oddsGpObj).val(data.templ.oddsGp);
                    AgencyMgmt.Comm.reloadMemberBinaryCommValues();
                    // comm binary..
                    if (data.templ.commBinary){
                        AgencyMgmt.Common.setComboValue("groupMemComm", data.templ.commBinary);
                    }
                    // comm 1x2
                    if (data.templ.commOneByTwo){
                        AgencyMgmt.Common.setComboValue("groupOneByTwoComm", data.templ.commOneByTwo);
                    }
                    // comm others
                    if (data.templ.commOthers){
                        AgencyMgmt.Common.setComboValue("groupOthersComm", data.templ.commOthers);
                    }
                    // allowPartial txfr
                    if (data.templ.allowPartialTxfr){
                        var allowPartialObj = document.getElementById('create.allowPartialTRF');
                        if (data.templ.allowPartialTxfr=="1")
                            $(allowPartialObj).prop('checked',true);
                        else
                            $(allowPartialObj).prop('checked',false);
                    }
                    // Bet Settings
                    if (data.templBS){
                        _loadBetSettingsValues(data.templBS);
                    }
                    // PT Settings
                    if (data.templPT){
                        _loadPosTakingValues(data.templPT);
                    }
                }
            };

            var _loadBetSettingsValues = function(templBS){
                if ($.isArray(templBS)){
                    var bs;
                    var obj;
                    for (var i=0; i<templBS.length; i++){
                        bs = templBS[i];
                        // minBet
                        obj = document.getElementById("betSettings_" + bs.sportId + "_minBet");
                        if (obj)
                            $(obj).val(bs.minBet);
                        // maxBet
                        obj = document.getElementById("betSettings_" + bs.sportId + "_maxBet");
                        if (obj)
                            $(obj).val(bs.maxBet);
                        // maxPerMatch
                        if (bs.sportId !="0"){
                            obj = document.getElementById("betSettings_" + bs.sportId + "_maxPerMatch");
                            if (obj)
                                $(obj).val(bs.maxPerMatch);
                        }
                    }
                    var $fieldSet = $('#betsetting_fs');
                    AgencyMgmt.BetSettings.validateSettings($fieldSet);
                }
            };

            var _loadPosTakingValues = function (templPT){
                if ($.isArray(templPT)){
                    var pt;
                    var objNameId;
                    for (var i=0; i<templPT.length; i++){
                        pt = templPT[i];
                        objNameId = "pt_" + pt.ptgId + "-preset";
                        AgencyMgmt.Common.setComboValue(objNameId, pt.posTaking);
                    }
                }
            }

            return{
                retrieveTemplate : function (parentUserCode){
                    _retrieveTemplateValues(parentUserCode);
                },
                saveTemplate : function(){
                    App.confirm({
                        message: AgencyMgmt.Resource.getMessage('saveTemplateCfm'),
                        fn: function(resp) {
                            _saveTemplateValues();
                        },
                        fnCancel: function(){
                            return false;
                        }
                    });

                }
            }
        }();

        AgencyMgmt.MonitorTextbox = function() {
            var textboxPrevVal = {};
            var t = {};
            var _add = function (element, fn) {
                var id = $(element).attr("id");
                if (t[id]) {
                    clearInterval(t[id])
                }
                t[id]=setInterval(function() {
                    var currValue = $(element).val();
                    var prevValue = textboxPrevVal[id];
                    if (currValue != prevValue) {
                        textboxPrevVal[id] = currValue;
                        fn();
                    }
                }, 0.5);
            };

            return{
                add : function(element, fn) {
                    return _add(element, fn);
                },

                reset : function(id) {
                    textboxPrevVal[id] = "";
                }
            }
        }();

        AgencyMgmt.Username = function() {
            var _checkServer = function(element, url, processData, onSuccess) {
                var username = element.value;
                if (username.length > 3) {
                    var data = {};
                    data['username'] = username;
                    if (processData) {
                        data = processData(data);
                    }
                    App.ajaxExt({
                        type: "POST",
                        data: data,
                        url: url,
                        cache: false,
                        datatype: "json",
                        fnSuccess: function(data){
                            if(data != "null") {   //if no errors
                                if (data.result != "") {
                                    var $img = $('.userCodeCheckIcon.ok');
                                    var $other = $('.userCodeCheckIcon.notOk');
                                    //$("#saveShareholder").removeAttr("disabled");
                                    $("#userId").val(data.result);
                                }else {
                                    var $img = $('.userCodeCheckIcon.notOk');
                                    var $other = $('.userCodeCheckIcon.ok');
                                    //$("#saveShareholder").attr("disabled", "true");
                                    $("#userId").val("");
                                }
                                $img.show();
                                $other.hide();
                                $("#userCodeCheckStatus").show();
                                if (onSuccess) {
                                    onSuccess(data);
                                }
                            }
                        }
                    });
                }else {
                    var $img = $('.userCodeCheckIcon.notOk');
                    var $other = $('.userCodeCheckIcon.ok');
                    $img.show();
                    $other.hide();
                    //$("#saveShareholder").attr("disabled", "true");
                    $("#userId").val("");
                }
            };

            return {
                checkServer : function(element, url, processData, onSuccess) {
                    _checkServer(element, url, processData, onSuccess);
                },
                monitor : function(url, processData, onSuccess) {
                    var element = document.getElementById("username");
                    AgencyMgmt.MonitorTextbox.add(element, function(){
                        _checkServer(element, url, processData, onSuccess);
                    });
                }
            }
        }();

    App.log('AgencyMgmt-Others Loaded');
});

var AgencyList = AgencyList || {}; // only global property, the root of our namespace
$(function() {
    AgencyList.Common = function () {
        var _handleCheckColumn = function (obj){
            var $obj = $(obj);
            var gpName = $obj.attr('chk-gp-name');
            var $parent = $obj.closest("form");
            var $boxes = $parent.find("input[type='checkbox'][chk-gp-name='" + gpName+"']");
            var $master =  $boxes.first();
            if (obj.checked){
                var allChecked=true;
                $boxes.each(function( index, element ) {
                    if (!$(element).attr('checked') && $(element).attr('chk-gp-type')=='slave')
                        allChecked=false;
                });
                $master.attr('checked',allChecked);
            } else{
                // unchecked... make sure master is unchecked....
                $master.attr('checked',false);
            }
        };

        var _handleMultiCheck = function (obj){
            var $obj = $(obj);
            var gpName = $obj.attr('chk-gp-name');
            $obj.closest("form").find("input[type='checkbox'][chk-gp-type='slave'][chk-gp-name='" + gpName+"']").attr('checked', obj.checked);
        };

        var _showUpdateError = function (errMsg){
            App.messageBox({
                title: "",
                message: errMsg,
                type: "warning"
            });
        };

        return {
            handleMultiCheck: function (obj){
                _handleMultiCheck(obj);
            },
            handleCheckColumn: function (obj){
               _handleCheckColumn(obj);
            },
            showUpdateError : function (errMsg){
                _showUpdateError(errMsg);
            }
        }
    }();
});

