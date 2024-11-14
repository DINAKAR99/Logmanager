

/*---------------- Global Variables ------------------*/


/*---------------- String functions ------------------*/
	
	function stringTrim(ctrl)
	{
		ctrl.value = ctrl.value.replace(/^\s+|\s+$/g, "");
	}
	
	function isNumberKey(evt)
	{
		var charCode = (evt.which) ? evt.which : evt.keyCode
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		return true;
	}

	function isAlpha(evt)
	{
		var charCode = (evt.which) ? evt.which : evt.keyCode
		if(charCode >= 65 && charCode <= 90) return true;
		if(charCode == 32) return true;
		if(charCode >= 97 && charCode <= 122) return true;
		if(charCode==8 || charCode==9) return true;
		//alert(charCode);
		return false;
	}

	function convertToUpper(ctrl)
	{
		ctrl.value = ctrl.value.toUpperCase();
	}

	function convertToLower(ctrl)
	{
		ctrl.value = ctrl.value.toLowerCase();
	}

//*********operations on a select box ************

	// adding a new option
	function addOptionToSelectBox(selectbox,text,value )
	{
		var optn = document.createElement("OPTION");
		optn.text = text;
		optn.value = value;
		selectbox.options.add(optn);
	}
	
	// emptying a select box
	function emptySelectBox(selectbox)
	{
		selectbox.options.length = 0;
	}
	
	// this function sorts all the list items
    function sortlist(selectbox) {
		var lb = selectbox;
		arrTexts = new Array();
		
		for(i=1; i<lb.length; i=i+1)  {
		  arrTexts[i] = lb.options[i].text;
		}
		
		arrTexts.sort();
		
		for(i=1; i<lb.length; i=i+1)  {
		  lb.options[i].text = arrTexts[i];
		  lb.options[i].value = arrTexts[i];
		}
	}
	
	// returns select boxs selected index
	function getSelectBoxText(ctrl)
	{
		return ctrl.options[ctrl.selectedIndex].text;
	}
//*********End of operations on a select box ************

	function getSelectedValueRadioButton(ctrl)
	{
		for(var i=0;i<ctrl.length;i=i+1)
		{
			if(ctrl[i].checked==true)
			{
				return ctrl[i].value;
			}
		}
		return "#";
	}

	function getCheckBoxStatus(ctrl)
	{
		if(ctrl.checked==true) { return 'Y'; } else { return 'N'; }
	}

	function checkSameOrNot(ctrl1,ctrl2)
	{
		if(ctrl1.value==ctrl2.value)
		{
			return true;
		}
		return false;
	}
	
	// detecting the browser
	
	function detectBrowser()
	{
	var browser=navigator.appName;
	var b_version=navigator.appVersion;
	var version=parseFloat(b_version);
	if ((browser=="Microsoft Internet Explorer") && (version>=4))
	{
		//alert("Your browser is good enough!");
	}
	else
	{
		alert("This application is only compatilbe with 'Internet Explorer' and your browser is " + browser);
		window.location="notCompatible.appsc";
	}
	}
	

	// Date Validator	
	 function checkDate(day,mon,yr) {
	  	var myDayStr = day;
		var myMonthStr = mon - 1;
		var myYearStr = yr;
		var myMonth = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'); var myDateStr = myDayStr + ' ' + myMonth[myMonthStr] + ' ' + myYearStr;
		
		/* Using form values, create a new date object
		using the setFullYear function */
		var myDate = new Date();
		myDate.setFullYear( myYearStr, myMonthStr, myDayStr );
		
		if ( myDate.getMonth() != myMonthStr ) {
		  return false;
		} else {
		  return true;
		}
	}

	
	
	
	/*** e-Mail validation	 ***/
/***	function echeck(str) 
	{
		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   return false
		}
		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   return false
		}
		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    return false
		}
		 if (str.indexOf(at,(lat+1))!=-1){
		    return false
		 }
		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    return false
		 }
		 if (str.indexOf(dot,(lat+2))==-1){
		    return false
		 }
		 if (str.indexOf(" ")!=-1){
		    return false
		 }
		 if (str.indexOf("..")!=-1){
		    return false
		 }

 		 return true					
	}***/
	
	
	function echeck(str){
        var filter=/^.+@.+\..{2,3}$/
   
        if (filter.test(str)){
      
            return false;
            }
        else {
            return true;
         }
   
    }
	/*** e-Mail validation ***/
	
	

	function resetRadioButtonValue(ctrl){
	        try{
	        for(var i=0;i<ctrl.length;i=i+1)
	        {
	            ctrl[i].checked=false;
	        }}catch(e){
	           
	        }
	}
	
	
	function urlPostSubmit(path, paramNames, paramValues) {
		//alert(path);
	     var myForm = document.createElement("form");
	     myForm.setAttribute("method", "post");
	     myForm.setAttribute("action", path);
	     for (var i = 0; i < paramNames.length; i++) {

	         var customizedField = document.createElement("input");
	         customizedField.setAttribute("type", "hidden");
	         customizedField.setAttribute("name", paramNames[i]);
	         //alert(paramValues[i]);
	         customizedField.setAttribute("value", paramValues[i]);
	         myForm.appendChild(customizedField);
	     }
	     document.body.appendChild(myForm);

	     myForm.submit();
	     return false;

	 }
	
	//http://jsfiddle.net/Jd4xn/2/
	function calDaysDatePicker(from_id, to_id){
		 var a = $("#"+from_id).datepicker('getDate').getTime(),
	     b = $("#"+to_id).datepicker('getDate').getTime(),
	     c = 24*60*60*1000,
	     diffDays = Math.round(Math.abs((b - a)/(c))) +1;//+1 Include start or end date
	 	//console.log((b - a)/(c)+"::"+diffDays);
	 	return diffDays;
	}

	
	function copyOptionList(objSourceElement, objTargetElement)    
    {  		        
       for (var i = 1; i < objSourceElement.length; i++) {            
               var intTargetLen = objTargetElement.length++;                
               objTargetElement.options[intTargetLen].text = objSourceElement.options[i].text;                
               objTargetElement.options[intTargetLen].value = objSourceElement.options[i].value;            
        }
        for(i=objSourceElement.options.length-1;i>=0;i--)
		{
		if(objSourceElement.options[i].selected)
		  objTargetElement.options[i].selected=true;
		}
                        
    }
	
	
	function getSpecialization(qualificationId, target, specializationId) {
		
		console.log("qualificationId:"+qualificationId+"   target:"+target+"  specializationId::"+specializationId);
		
	}
	
	function getOptions(fullURL, nextId){
		//console.log(fullURL + nextId);
		$.post(fullURL, function(data) {
			$("select#"+nextId).html(data);
		});
	}
	
	function isValidFile1(obj, maxSizeKB, extns){ // onchange="isValidFile(this, '100', ['pdf', 'jpg'])"
		//alert(id+sizeKB+extns);
		var id = $(obj).attr('id');
		file = $("#"+id).val().toLowerCase();
	    extension = file.substring(file.lastIndexOf('.') + 1);
	   // alert(extension+"::extension "+extns+"::extns   ::");
	  //  alert($.inArray(extension, extns) > -1);
	    if(!($.inArray(extension, extns) > -1)) {
	    	alert("Please Upload "+extns+" files.");
			$("#"+id).val("");
			$("#"+id).focus();
			return false;
	   }
	    var s = parseInt(($("#"+id)[0].files[0].size))/1024;///1048576
	  //  alert(s);
	     if(parseInt(s)>parseInt(maxSizeKB)){
			alert("Please Upload below "+maxSizeKB+"kb file.");
			$("#"+id).val("");
			$("#"+id).focus();
			return false;
	    }
	}
	
	function isValidFile(obj, minSizeKB, maxSizeKB, extns){ // onchange="isValidFile(this, '100', '200', ['pdf', 'jpg'])" ***** for validating file limit MIN - MAX
		//alert(id+sizeKB+extns);
		var id = $(obj).attr('id');
		file = $("#"+id).val().toLowerCase();
	    extension = file.substring(file.lastIndexOf('.') + 1);
	   // alert(extension+"::extension "+extns+"::extns   ::");
	  //  alert($.inArray(extension, extns) > -1);
	    if(!($.inArray(extension, extns) > -1)) {
	    	alert("Please Upload "+extns+" files!");
			$("#"+id).val("");
			$("#"+id).focus();
			return false;
	   }
	    var s = parseInt(($("#"+id)[0].files[0].size))/1024;///1048576
	  //  alert(s);
		    if(parseInt(s)<parseInt(minSizeKB)){
		    	alert("Please Upload minimum "+minSizeKB+"kb file.");
				$("#"+id).val("");
				$("#"+id).focus();
				return false;
		    }
		     if(parseInt(s)>parseInt(maxSizeKB)){
				alert("Please Upload between "+minSizeKB+"kb - "+maxSizeKB+"kb file.");
				$("#"+id).val("");
				$("#"+id).focus();
				return false;
		    }

	}

	