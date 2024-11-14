		function textAreaCounter(field,cntfield,maxlimit) 
		 {
			if (field.value.length > maxlimit) 
				field.value = field.value.substring(0, maxlimit);
			else
				cntfield.value = maxlimit - field.value.length;
		 }
		
		function isInteger(e)
		 {
				var key;
				var keychar;
				if (window.event)
		   			key = window.event.keyCode;
				else if (e)
		   			key = e.which;
				else
		   			return true;
		
				keychar = String.fromCharCode(key);
				keychar = keychar.toLowerCase();
			// control keys
				if ((key==0) || (key==8) || (key==9) || (key==13) || (key==27) || (key==127))
		   			return true;
		
			// alphas and numbers
				else if ((("0123456789").indexOf(keychar) > -1))
		   			return true;
				else
		   			return false;
		}
		
		function isNumberDecimal(sender, evt) {
		    var txt = sender.value;
		    var dotcontainer = txt.split('.');
		    var charCode = (evt.which) ? evt.which : event.keyCode;
		    if (!(dotcontainer.length == 1 && charCode == 46) && charCode > 31 && (charCode < 48 || charCode > 57))
		        return false;

		    return true;
		}
		
		function isAlphaNumeric(e)
		 {
				var key;
				var keychar;
				if (window.event)
		   			key = window.event.keyCode;
				else if (e)
		   			key = e.which;
				else
		   			return true;
		
				keychar = String.fromCharCode(key);
				keychar = keychar.toLowerCase();
			// control keys
				if ((key==0) || (key==8) || (key==9) || (key==13) || (key==27) || (key==127))
		   			return true;
		
			// alphas and numbers
				else if ((("`~!@#$%^&*()-_=+[]{}\\\"'/?.>,<|;:").indexOf(keychar) > -1))
		   			return false;
				else
		   			return true;
		}
		
		function lettercharacter(e)
		{
				var key;
				var keychar;
		
				if (window.event)
		   			key = window.event.keyCode;
				else if (e)
		   			key = e.which;
				else
		   			return false;
		
				keychar = String.fromCharCode(key);
				keychar = keychar.toLowerCase();
		
			// control keys
				if ((key==0) || (key==8) || (key==9) || (key==13) || (key==27) || (key==127))
		   			return true;
		
			// alphas and numbers
				else if ((("`~!@#$%^&*()-_=+[]{}\\\"'/?.>,<|;:").indexOf(keychar) > -1) || (("0123456789").indexOf(keychar) > -1) || (("'").indexOf(keychar) > -1) || (("<").indexOf(keychar) > -1) || ((">").indexOf(keychar) > -1))
		   			return false;
		   		else
		   			 return true;
		   			 
		}	
		
		function letterSingleQuotation(e)
		{
				var key;
				var keychar;
		
				if (window.event)
		   			key = window.event.keyCode;
				else if (e)
		   			key = e.which;
				else
		   			return false;
		
				keychar = String.fromCharCode(key);
				keychar = keychar.toLowerCase();
		
			// control keys
				if ((key==0) || (key==8) || (key==9) || (key==13) || (key==27) || (key==127))
		   			return true;
		
			// alphas and numbers
				 if ((("'").indexOf(keychar) > -1) || (("<").indexOf(keychar) > -1) || ((">").indexOf(keychar) > -1))
		   			return false;
				 else
		   			 return true;
		}
		
		
		function letterUsername(e)
		{
			var key;
			var keychar;
	
			if (window.event)
	   			key = window.event.keyCode;
			else if (e)
	   			key = e.which;
			else
	   			return false;
	
			keychar = String.fromCharCode(key);
			keychar = keychar.toLowerCase();
	
		// control keys
			if ((key==0) || (key==8) || (key==9) || (key==13) || (key==27) || (key==127))
	   			return true;
	
		// alphas and numbers
			else if ((("`~!@#$%^&*()-=+[]{}\\\"'/?Y>,<|;:").indexOf(keychar) > -1) || (("'").indexOf(keychar) > -1) || (("<").indexOf(keychar) > -1) || ((">").indexOf(keychar) > -1))
	   			return false;
	   		else
	   			 return true;
		}
		
		function hideBrowse()
		{
			document.getElementById("employeePhoto").style.visibility="hidden";
		}
		
		
		var emailfilter=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i
		function checkmail(e)
		{			
			
			if (trim(e.value)=='')
			{
				return false;
			}
			else if(isAlphaNumeric(e))
			{
				var preFix=e.value.indexOf("@");				
				if(preFix!=-1 && preFix>26)
				{
					alert("Prefix value of @ symbol of the email address should less than 26 characters");
					e.value="";
					e.select();
					return false;
				}else
				{
					var returnval=emailfilter.test(e.value);					
					if (returnval==false)
					{
						alert("Please enter a valid email address.");
						e.value="";
						e.select();
					}else return returnval;
				}				
			}
		}
		function checkEmail(data)
		{
				alert('Validate this email:'+data.value);
				var str=data.value;
				var at="@";
				var dot=".";
				var lat=str.indexOf(at);
				var lstr=str.length;
				var ldot=str.indexOf(dot);
				if (str.indexOf(at)==-1){
				   alert("Invalid E-mail ID "+data.value);
				   document.getElementById("email").value="";
				   return false;
				}else if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
				   alert("Invalid E-mail ID "+data.value);
				   document.getElementById("email").value="";
				   return false;
				}else if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
				    alert("Invalid E-mail ID "+data.value);
				    document.getElementById("email").value="";
				    return false;
				}else if (str.indexOf(at,(lat+1))!=-1){
				    alert("Invalid E-mail ID "+data.value);
				    document.getElementById("email").value="";
				    return false;
				 }else if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
				    alert("Invalid E-mail ID "+data.value);
				    document.getElementById("email").value="";
				    return false;
				 }else if (str.indexOf(dot,(lat+2))==-1){
				    alert("Invalid E-mail ID "+data.value);
				    document.getElementById("email").value="";
				    return false;
				 }else if (str.indexOf(" ")!=-1){
				   alert("Invalid E-mail ID "+data.value);
				   document.getElementById("email").value="";
				   return false;
				 }else
				 {
				 	return true;
				 }
			//}
		}
		
		
		function getDateObject(dateString,dateSeperator)
		{
			
		   var dt1   = parseInt(dateString.substring(0,2),10);
		   var mon1  = parseInt(dateString.substring(3,5),10);
		   var yr1   = parseInt(dateString.substring(6,10),10);
		   
		   if (parseInt(mon1)>0)
		   {
		   	mon1=parseInt(mon1)-1;
		   }
		   var date1 = new Date(yr1, mon1, dt1);
		   
			return date1;
		}
		function dateComparison(date1,date2)
		{
			dt1=getDateObject(date1,"/");
			dt2=getDateObject(date2,"/");
			
			if(dt1>=dt2)
				return true;
			else
				return false;
		}
		
		function travelDateComparison(date1,date2)
		{
			dt1=getDateObject(date1,"/");
			dt2=getDateObject(date2,"/");
			
			if(dt1>dt2)
				return true;
			else
				return false;
		}
		 function validateFileExtension(fld) {
				
				if((!/(\.jpg|\.jpeg|\.png|\.doc|.docx|.pdf)$/i.test(fld.value))  ){ //&& !/([a-zA-Z0-9\s_\\.\-:])+(.doc|.docx|.pdf)$)/i.test(fld.value)
					alert("Invalid file type.");
					fld.form.reset();
					fld.focus();
					return false;
				}
				return true;
			}
		
		 
		 function urlPostSubmit(path, paramNames, paramValues) {
		     var myForm = document.createElement("form");
		     console.log('path=' + path);
		     console.log('paramNames=' + paramNames);
		     console.log('paramValues=' + paramValues);
		     
		     //alert('path=' + path + 'Param Names' + paramNames + 'param Values' + paramValues);
		     myForm.setAttribute("method", "post");
		     myForm.setAttribute("action", path);
		     for (var i = 0; i < paramNames.length; i++) {

		         var customizedField = document.createElement("input");
		         customizedField.setAttribute("type", "hidden");
		         customizedField.setAttribute("name", paramNames[i]);
		         customizedField.setAttribute("value", paramValues[i]);
		         myForm.appendChild(customizedField);
		     }
		     document.body.appendChild(myForm);

		     myForm.submit();
		     return false;

		 }
		 
		 function urlPostDelete(path, paramNames, paramValues) {
		     var myForm = document.createElement("form");
		     myForm.setAttribute("method", "post");
		     myForm.setAttribute("action", path);
		     for (var i = 0; i < paramNames.length; i++) {

		         var customizedField = document.createElement("input");
		         customizedField.setAttribute("type", "hidden");
		         customizedField.setAttribute("name", paramNames[i]);
		         customizedField.setAttribute("value", paramValues[i]);
		         myForm.appendChild(customizedField);
		     }
		     document.body.appendChild(myForm);

		     if(confirm("Sure you want to Delete this Record?"))
		     	myForm.submit();
		     
		     return false;

		 }
		 function disableDateValidation(formname,id) {
			 
			  /*alert('formname '+ formname + 'id ' + id);
			  return false;
				var bootstrapValidator = $('#'+formname).data('bootstrapValidator');
					bootstrapValidator.enableFieldValidators(id, false); */
			}
		 
		 function chkvalidNo(obj){
				
			    if(obj.value!=""){
			        var noofNumbers=(obj.value).length;
			        if(noofNumbers!=10 &&  noofNumbers!=11){
			            alert("Invalid Mobile/Phone number....\nEntered "+noofNumbers+" Number(s) Only.");
			            obj.value="";
			            return true;
			        }
			    }else{
			        return false;
			    }
			    var num = obj.value;
			    var chk = new Array();
			    chk = num.split("");
			    if(chk[0]=="6" || chk[0]=="7" || chk[0]=="8" || chk[0]=="9" ){
			        return true;
			    }else{
			        alert("Enter a valid mobile number starting with '6' or '7' or '8' or '9'....");
			        obj.value="";
			        return false;
			    }
			}
