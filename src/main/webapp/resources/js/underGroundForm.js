function isValidFile(obj, maxSizeKB, extns){ // 
	var id = $(obj).attr('id');
	file = $("#"+id).val().toLowerCase();
    extension = file.substring(file.lastIndexOf('.') + 1);
    if(!($.inArray(extension, extns) > -1)) {
    	alert("Please Upload "+extns+" files.");
		$("#"+id).val("");
		$("#"+id).focus();
		return false;
   }
    var s = parseInt(($("#"+id)[0].files[0].size))/2048; 
     if(parseInt(s)>parseInt(maxSizeKB)){
		alert("Please Upload below "+maxSizeKB+"kb file.");
		$("#"+id).val("");
		$("#"+id).focus();
		return false;
    }
}

function resetForm() {
    location.reload();
}

function getPaymentDetails(paymentType){
	if(paymentType == "1"){
		$("#paymentnumberdiv").show("");
		$("#payment_number").val("");
		$("#payment_number_label").html("Demand Draft Number");
	}
	else if(paymentType == "2"){
		$("#paymentnumberdiv").show("");
		$("#payment_number").val("");
		$("#payment_number_label").html("Cheque Number");
	}
	else if(paymentType == "3"){
		$("#paymentnumberdiv").show("");
		$("#payment_number").val("");
		$("#payment_number_label").html("RTGS Number");
    }
	else if (paymentType == "4"){
		$("#paymentnumberdiv").show("");
		$("#payment_number").val("");
		$("#payment_number_label").html("Challan Number");
	}else{
		$("#paymentnumberdiv").hide("");
		$("#payment_number").val("");
	}
}

  

function intOnly(i) {
	if(i.value.length>0) {
		i.value = i.value.replace(/[^\d]+/g, '');
	}
}
function charOnly(i) {
	if(i.value.length>0) {
		i.value = i.value.replace(/[^a-zA-z\s]+/g, '');
	}
}
function TextToTrim(obj){
	obj.value = obj.value.trim();
}
function alphaNumericOnly(i) {
	if(i.value.length>0) {
		i.value = i.value.replace(/[^a-zA-z\s\d]+/g, '');
	}
}  


 
function validateCharacters(obj){
	var inputVal=$("#"+obj).val();
	var characterReg = /^[a-z]([0-9.a-z_\-\,\s])+$/i;

	if(!characterReg.test(inputVal)) {
		alert("Address may consist of a-z, 0-9, underscores, spaces,dots,comma and must begin with a letter.");
		$("#"+obj).val("");
		return false;
	}
	else{
		return true;
	}
}


function checkEmail(email) {

	   var str = email.value;
	   var at="@";
			var dot=".";
			var lat=str.indexOf(at);
			var lstr=str.length;
			var ldot=str.indexOf(dot);
			
			if(str!=""){
			if (str.indexOf(at)==-1){
			   alert("Invalid E-mail ID");
			   email.value="";
			   return false;
			}

			if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
			   alert("Invalid E-mail ID");email.value="";
			   return false;
			}

			if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
			    alert("Invalid E-mail ID");email.value="";
			    return false;
			}

			 if (str.indexOf(at,(lat+1))!=-1){
			    alert("Invalid E-mail ID");email.value="";
			    return false;
			 }

			 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
			    alert("Invalid E-mail ID");email.value="";
			    return false;
			 }

			 if (str.indexOf(dot,(lat+2))==-1){
			    alert("Invalid E-mail ID");email.value="";
			    return false;
			 }
			
			 if (str.indexOf(" ")!=-1){
			    alert("Invalid E-mail ID");email.value="";
			    return false;
			 }

	}
	 		 return true;
	 
	}  
function validatemobile(id) {
	var mobile = id.value;
	if(mobile!="") {
	       var validnbrs=["6", "7","8","9"];
			if(mobile.length!=10) {
		  alert("Enter 10 digit mobile number");
		  id.value="";
			}
			else {
	     if ( !(validnbrs.includes(mobile.substr(0, 1)) ) ) { 
	         alert( "Enter valid  mobile number starting with 6 or 7 or 8 or 9 ");
	         id.value=""
    	  }
  	      }
	}}

//------------------------------------------overground form--------------------------------------------------------


function resetForm() {
    location.reload();
}

$(document)
.ready(
		function() {
			$("#district_id").change(function() { $("#village_id").html('<option value="0">--Select Village--</option>');});
			$("#land_district_id").change(function() {$("#land_village_id").html('<option value="0">--Select Village--</option>');});
			$("#bldg_district_id").change(function() {$("#bldg_village_id").html('<option value="0">--Select Village--</option>');});
			$("#districtId").change(function() { $("#village_id").html('<option value="0">--Select Village--</option>');});
		});


function getPaymentDetailsOverground(paymentType){
	if(paymentType == "1"){
		$("#paymentnumberdiv").show("");
		$("#payment_challan_no").val("");
		$("#payment_number_label").html("Demand Draft Number");
	}
	else if(paymentType == "2"){
		$("#paymentnumberdiv").show("");
		$("#payment_challan_no").val("");
		$("#payment_number_label").html("Cheque Number");
	}
	else if(paymentType == "3"){
		$("#paymentnumberdiv").show("");
		$("#payment_challan_no").val("");
		$("#payment_number_label").html("RTGS Number");
    }
	else if (paymentType == "4"){
		$("#paymentnumberdiv").show("");
		$("#payment_challan_no").val("");
		$("#payment_number_label").html("Challan Number");
	}else{
		$("#paymentnumberdiv").hide("");
		$("#payment_challan_no").val("");
	}
}

function getInstallationType(obj){
	var type=obj.value;
	if(type == 1) {
		$("#inst_land").show();
		$("#land_private").show();
		$("#land_govt").hide();
		$("#inst_building").hide();
		$("#bld_private").hide();
		$("#bld_govt").hide();
		$("#plot_no_span").show();
		$("#land_survey_no_span").hide();
		$("#land_survey_no_div").hide();
		return false;
	} else if(type == 2) {
		$("#inst_building").show();
		$("#inst_land").hide();
		$("#bld_private").show();
		$("#bld_govt").hide();
		
		return false;		
	} else if(type == 3) {
		$("#inst_building").show();
		$("#inst_land").hide();
		$("#bld_private").hide();
		$("#bld_govt").show();
		return false;		
	} else if(type == 4) {
		$("#inst_land").show();
		$("#land_private").hide();
		$("#land_govt").show();
		$("#inst_building").hide();
		$("#bld_private").hide();
		$("#bld_govt").hide();
		$("#land_govt_div").show();
		$("#plot_no_span").hide();
		$("#land_survey_no_span").show();
		$("#land_survey_no_div").show();
		return false;	
	}  else if(type == 0) {
		$("#inst_building").hide();
		$("#inst_land").hide();
		$("#bld_private").hide();
		$("#bld_govt").hide();
		return false;		
	}
}

function ValidateLat(obj) {
    var lat = obj.value;
    if (lat < -90 || lat > 90) {
        alert("Latitude must be between -90 and 90 degrees inclusive.");
        obj.value="";
    } else if (lat == "") {
        alert("Enter a valid Latitude or Longitude!");
    }
}

function ValidateLng(obj) {
    var lng = obj.value;
    if (lng < -180 || lng > 180) {
        alert("Longitude must be between -180 and 180 degrees inclusive.");
        obj.value="";
    } else if (lng == "") {
        alert("Enter a valid Latitude or Longitude!");
    }
}