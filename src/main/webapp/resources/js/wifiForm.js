/**
 * Author: chandrashekar.b
 */

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
/*$(document).ready( function() {
	$("#district_id").change( function() {
		$("#village_id").html('<option value="0">--Select--</option>');
	});
	$("#work_district_id").change( function() {
		$("#work_village_id").html('<option value="0">--Select--</option>');
	});
});*/


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



function resetForm() {
    location.reload();
}

$(document).ready(function() {
	$("#district_id").change(function() { $("#village_id").html('<option value="0">--Select Village--</option>');});
	$("#land_district_id").change(function() {$("#land_village_id").html('<option value="0">--Select Village--</option>');});
	$("#bldg_district_id").change(function() {$("#bldg_village_id").html('<option value="0">--Select Village--</option>');});
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
	}else if(type == 4) {
		$("#inst_land").show();
		$("#land_private").hide();
		$("#land_govt").show();
		$("#inst_building").hide();
		$("#bld_private").hide();
		$("#bld_govt").hide();
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

$( document ).ready( function () {
	$.validator.addMethod("customemail", 
		    function(value, element) {
		        return  this.optional(element) || /^([a-zA-Z])+([a-zA-Z0-9_.+-])+\@(([a-zA-Z-])+\.+?(com|co|in|org|net|edu|info|gov|vekomy))\.?(com|co|in|org|net|edu|info|gov)?$/.test(value);
		    }, 
		    "Please Check Email Address"
		);
	var validator = $( "#formId" ).validate({
		validClass: "is-valid",
		errorClass: "is-invalid",
		success: "is-valid",
		error: "is-invalid",
		rules: {
			applicationFor: {
				required: true
			},
			applicant_name_id: {
				required: true, min: 1
			},
			plot_flat_no: {
				required: true, pattern: "^[a-zA-Z\\d\\-,\/]+$", maxlength: 25
			},
			road_street: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 25
			},
			city_town: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 25
			},
			district_id: {
				required: true, min: 1
			},
			mandal_id: {
				required: true, min: 1
			},
			village_id: {
				required: true, min: 1
			},
			pin_code: {
				required: true, digits: true, minlength: 6
			},
			auth_person_name: {
				required: true, pattern: "^[a-zA-Z\\s]+$", maxlength: 150
			},
			auth_person_desg: {
				required: true, pattern: "^[a-zA-Z\\s]+$", maxlength: 100
			},
			auth_person_mobile: {
				required: true, digits: true, minlength: 10, pattern: "^[6-9][0-9]{9}$" //"^[6-9][0-9]{9}$"
			},
			auth_person_email: {
				required: true, email: true, maxlength: 55,customemail: true
			},
			noOfPoles: {
				required: function(element) {
					return $("input[name='applicationFor']:checked").val() === 'OG';
				}, digits: true
			},
			noOfMonths: {
				required: function(element) {
					return  $("input[name='applicationFor']:checked").val() === 'OG';
				}, digits: true
			},
			noOfMeters: {
				required: function(element) {
					return  $("input[name='applicationFor']:checked").val() === 'UG';
				}, digits: true
			},
			proposed_extent: {
				required: true, min: 1
			},
			towerType: {
				required: true, min: 1
			},
			department_id: {
				required: true, min: 1
			},
			work_district_id: {
				required: true, min: 1
			},
			work_municipality_id: {
				required: function(element) {
					return $("#enabledDiv").val() === 'muniDiv';
				}, min: 1
			},
			work_mandal_id: {
				required: function(element) {
					return $("#enabledDiv").val() === 'mandalDiv';
				}, min: 1
			},
			work_village_id:{
				required: function(element) {
					return $("#enabledDiv").val() === 'gpDiv';
				}, min: 1
			},
			 workVillageRdId:{
					required: function(element) {
						return $("#enabledDiv").val() === 'gpRdDiv';
					}, min: 1
				},
			work_ward_id:{
				required: function(element) {
					return $("#enabledDiv").val() === 'wardDiv';
				}, min: 1
			},
			work_hmda_id:{
				required: function(element) {
					return $("#enabledDiv").val() === 'hmdaDiv';
				}, min: 1
			},
			work_iala_id:{
				required: function(element) {
					return $("#enabledDiv").val() === 'ialaDiv';
				}, min: 1
			},
			land_required: {
				required: {
					depends: function(element){
						return $('#proposedExtent').val() === '1' || $('#proposedExtent').val() === '4';
					}
				}, digits: true, maxlength: 25
			},
			land_plot_no: {
				required: {
					depends: function(element){
						return $('#proposedExtent').val() === '1' ;
					}
				}, pattern: "^[\\d\\-\/]+$", maxlength: 25
			},
			land_road_street: {
				required: {
					depends: function(element){
						return $('#proposedExtent').val() === '1' || $('#proposedExtent').val() === '4';
					}
				}, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 25
			},
			land_ward_block_locality: {
				required: {
					depends: function(element){
						return $('#proposedExtent').val() === '1' || $('#proposedExtent').val() === '4';
					}
				}, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 25
			},
			land_city_town: {
				required: {
					depends: function(element){
						return $('#proposedExtent').val() === '1' || $('#proposedExtent').val() === '4';
					}
				}, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 25
			},
			land_latitude: {
				required: {
					depends: function(element){
						return $('#proposedExtent').val() === '1' || $('#proposedExtent').val() === '4';
					}
				},
				number: true,
				range: [-90, 90],
				maxlength: 25,
			},
			land_longitude: {
				required: {
					depends: function(element){
						return $('#proposedExtent').val() === '1' || $('#proposedExtent').val() === '4';
					}
				},
				number: true,
				range: [-180, 180],
				maxlength: 25,
			},
			bldg_name: {
				required: true, pattern: "^[a-zA-Z\\s]+$", maxlength: 100
			},
			bldg_height: {
				required: true, maxlength: 10, digits: true
			},
			bldg_stores: {
				required: true, min: 1
			},
			bldg_area_structure: {
				required: true, pattern: "^[a-zA-Z\\d\\s]+$", maxlength: 25
			},
			bldg_structure_pin_code: {
				required: true, digits: true, minlength: 6
			},
			bldg_landmark: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 100
			},
			bldg_locality: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 50
			},
			bldg_street: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 50
			},
			bldg_house_num: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),&#\/\\s]+$", maxlength: 25
			},
			bldg_latitude: {
				required: {
					depends: function(element) {
						var proposedExtent = $('#proposedExtent').val();
						return (proposedExtent === '2' || proposedExtent === '3');
					}
				},
				number: true,
				range: [-90, 90],
				maxlength: 25,
			},
			bldg_longtide: {
				required: {
					depends: function(element){
						var proposedExtent = $('#proposedExtent').val();
						return (proposedExtent === '2' || proposedExtent === '3');
					}
				},
				number: true,
				range: [-180, 180],
				maxlength: 25,
			},
			owner_name: {
				required: true, pattern: "^[a-zA-Z\\s]+$", maxlength: 100
			},
			owner_address: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 250
			},
			mode_time_work: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),.:\\[\\]\/\\s]+$", maxlength: 250
			},
			appmade_email: {
				 email: true, maxlength: 55,customemail: true
			},
			appmade_mob_num: {
				required: true, digits: true, minlength: 10, pattern: "^[6-9][0-9]{9}$" //"^[6-9][0-9]{9}$"
			},
			appmade_address: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),.\/\\s]+$", maxlength: 100
			},
			appmade_name: {
				required: true, pattern: "^[a-zA-Z\\s]{1,150}$", maxlength: 25
			},
			public_incon: {
				 pattern: "^[a-zA-Z\\d\\-(),.:\\[\\]\/\\s]+$", maxlength: 250
			}, 
			 measure_proposed: {
				pattern: "^[a-zA-Z\\d\\-(),.:\\[\\]\/\\s]+$", maxlength: 250
			}, 
			/* appmode_name_add: {
				required: true, pattern: "^[a-zA-Z\\d\\-(),.:\\[\\]\/\\s]+$", maxlength: 250
			}, */
			matter_work_proposed: {
				pattern: "^[a-zA-Z\\d\\-(),.:\\[\\]\/\\s]+$", maxlength: 250
			}, 
			admin_charges: {
				required: true,
				digits: true,
				maxlength: 25,
			},
			gst_charges: {
				required: true,
				digits: true,
				maxlength: 25,
			}
		},
		messages: {
			applicationFor: { 
				required: "This field is required!",
			},
			applicant_name_id: {
				required: "This field is required!",
				min: "This field is required!",
			},
			plot_flat_no: {
				required: "This field is required!",
				pattern: "Numbers, - and / are allowed!",
				maxlength: "Plot/Flat No. should not exceed 25 characters!"
			},
			road_street: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "Road/Street should not exceed {0} characters!"
			},
			city_town: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "City/Town should not exceed {0} characters!"
			},
			district_id: {
				required: "This field is required!",
				min: "This field is required!",
			},
			mandal_id: {
				required: "This field is required!",
				min: "This field is required!",
			},
			village_id: {
				required: "This field is required!",
				min: "This field is required!",	
			},
			pin_code: {
				required: "This field is required!",
				digits: "Pin code must be in Digits!",
				minlength: "Enter a valid {0} digit Pin code!"
			},
			auth_person_name: {
				required: "This field is required!",
				pattern: "Alphabets and Space are allowed!",
				maxlength: "Name should not exceed {0} characters!",
			},
			auth_person_desg: {
				required: "This field is required!",
				pattern: "Alphabets and Space are allowed!",
				maxlength: "Designation should not exceed {0} characters!"
			},
			auth_person_mobile: {
				required: "This field is required!",
				digits: "Phone/Mobile No must be in digits!",
				minlength: "Enter a valid {0} digit Phone/Mobile No!",
				pattern: "Mobile number should start with 6, 7, 8 or 9",
			},
			auth_person_email: {
				required: "This field is required!",
				maxlength: "Email should not exceed {0} characters!",
				email: "Invalid email"
			},
			noOfPoles: {
				required: "This field is required!",
				digits: "No. of Poles must be in digits!",
			},
			noOfMonths: {
				required: "This field is required!",
				digits: "No. of Months must be in digits!",
			},
			noOfMeters: {
				required: "This field is required!",
				digits: "No. of Meters must be in digits!",
			},
			proposed_extent: {
				required: "This field is required!",
				min: "This field is required!",	
			},
			towerType: {
				required: "This field is required!",
				min: "This field is required!",	
			},
			department_id: {
				required: "This field is required!",
				min: "This field is required!",	
			},
			work_district_id: {
				required: "This field is required!",
				min: "This field is required!",	
			},
			work_municipality_id: {
				required: "This field is required!",
				min: "This field is required!",	
			},
			work_mandal_id: {
				required: "This field is required!",
				min: "This field is required!",	
			},
			work_village_id:{
				required: "This field is required!",
				min: "This field is required!",	
			},
			workVillageRdId:{
				required: "This field is required!",
				min: "This field is required!",	
			},
			work_ward_id:{
				required: "This field is required!",
				min: "This field is required!",	
			},
			work_hmda_id:{
				required: "This field is required!",
				min: "This field is required!",	
			},
			work_iala_id:{
				required: "This field is required!",
				min: "This field is required!",	
			},
			land_required: {
				required: "This field is required!",
				maxlength: "Land Required should not exceed {0} digits!"
			},
			land_plot_no: {
				required: "This field is required!",
				pattern: "Numbers, - and / are allowed!",
				maxlength: "Plot No. should not exceed {0} characters!"
			},
			land_road_street: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "Road/Street should not exceed {0} characters!"
			},
			land_ward_block_locality: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "Ward No./ Block No. & Locality should not exceed {0} characters!"
			},
			land_city_town: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "City/Town should not exceed {0} characters!"
			},
			land_latitude: {
				required: "This field is required!",
				number: "Invalid Latitude value!",
				range: "Latitude must be between {0} and {1} degrees inclusive!" 
			},
			land_longitude: {
				required: "This field is required!",
				number: "Invalid Longitude value!",
				range: "Longitude must be between {0} and {1} degrees inclusive!"
			},
			bldg_name: {
				required: "This field is required!",
				pattern: "Alphabets and Space are allowed!",
				maxlength: "Name of building should not exceed {0} characters!"
			},
			bldg_height: {
				required: "This field is required!",
				digits: "Height must be in digits!",
				maxlength: "Height should not exceed {0} characters!"
			},
			bldg_stores: {
				required: "This field is required!",
				min: "This field is required!",
			},
			bldg_area_structure: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers and Space are allowed!",
				maxlength: "Area of the building should not exceed {0} characters!"
			},
			bldg_structure_pin_code: {
				required: "This field is required!",
				digits: "Pin code must be in Digits!",
				minlength: "Enter a valid {0} digit Pin code!"
			},
			bldg_landmark: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "LandMark should not exceed {0} characters!"
			},
			bldg_locality: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "Locality should not exceed {0} characters!"
			},
			bldg_street: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "Street should not exceed {0} characters!"
			},
			bldg_house_num: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) & # - / and , are allowed!",
				maxlength: "H.No. should not exceed 25 characters!"
			},
			bldg_latitude: {
				required: "This field is required!",
				number: "Invalid Latitude value!",
				range: "Latitude must be between {0} and {1} degrees inclusive!" 
			},
			bldg_longtide: {
				required: "This field is required!",
				number: "Invalid Longitude value!",
				range: "Longitude must be between {0} and {1} degrees inclusive!"
			},
			owner_name: {
				required: "This field is required!",
				pattern: "Aplhabets and Space are allowed!",
				maxlength: "Name of Owner should not exceed {0} characters!"
			},
			owner_address: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "Address of Owner should not exceed {0} characters!"
			},
			mode_time_work: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) [ ] : - , / and . are allowed!",
				maxlength: "This Field should not exceed {0} characters!"
			},
			public_incon: {
				pattern: "Alphabets, Numbers, Space ( ) [ ] : - , / and . are allowed!",
				maxlength: "This Field should not exceed {0} characters!"
			}, 
			measure_proposed: {
				pattern: "Alphabets, Numbers, Space ( ) [ ] : - , / and . are allowed!",
				maxlength: "This Field should not exceed {0} characters!"
			}, 
			/* appmode_name_add: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) [ ] : - , / and . are allowed!",
				maxlength: "This Field should not exceed {0} characters!"
			}, */
			matter_work_proposed: {
				pattern: "Alphabets, Numbers, Space ( ) [ ] : - , / and . are allowed!",
				maxlength: "This Field should not exceed {0} characters!"
			}, 
			
			appmade_email: {
				maxlength: "Email should not exceed {0} characters!",
				email: "Invalid email"
			},
			appmade_mob_num: {
				required: "This field is required!",
				digits: "Phone/Mobile No must be in digits!",
				minlength: "Enter a valid {0} digit Phone/Mobile No!",
				pattern: "Mobile number should start with 6, 7, 8 or 9",
			},
			appmade_address: {
				required: "This field is required!",
				pattern: "Alphabets, Numbers, Space ( ) - , / and . are allowed!",
				maxlength: "Address should not exceed {0} characters!"
			},
			appmade_name: {
				required: "This field is required!",
				maxlength: "Name should not exceed {0} characters!",
				pattern: "Alphabets and Space are allowed"
			},
			admin_charges: {
				required: "This field is required!",
				digits: "Administrative Charges must be in digits!",
				maxlength: "Administrative Charges should not exceed {0} digits!"
			},
			gst_charges: {
				required: "This field is required!",
				digits: "GST Charges must be in digits!",
				maxlength: "GST Charges should not exceed {0} digits!"
			},
		},
		errorElement: "div",
		errorPlacement: function ( error, element ) {
			error.addClass( "invalid-feedback" );
			$(element).addClass("is-invalid");
			if ( $(element).prop( "type" ) === "checkbox" ) {
				error.insertAfter( $(element).parent( "label" ) );
			} else {
				error.insertAfter( $(element) );
			}
		},
		submitHandler: function(form) {
			if(confirm("Are you sure you want to Submit?")) {
				$(form)[0].addClass("was-validated");
				$(form)[0].submit();
			} else {
			    return false;
			}
		},
		invalidHandler: function(event, validator) {
			var errors = validator.numberOfInvalids(); // Number Of Invalid fields
			console.log("Number of Invalid Fields: "+errors);
	    }
	});
	
	$("input[id*=upload_file_]").each(function(){
		$(this).rules("add", {
			required: function(element) {
				return $(element).siblings('input[id*=is_mandatory_]').val() === "true";
			},
			extension: "pdf|jpeg|jpg|png",
//			maxFileSize: 1024, //in kb [1024kb = 1Mb]
			maxFileSize: 2048, //in kb [2048kb = 2Mb]
			messages: {
				required: "File is required!",
				extension: "Invalid file selected!",
			}
		});
		
		$(this).change(function() {
			validator.element( this );
		});
	});
	$(".datepicker").change(function() { validator.element( this ); });
	$("#resetButton").click(function() {validator.resetForm();});
	
	/* function ( label, element ) {
	$(element).removeClass( "is-invalid" ).addClass("is-valid");
}, */
/* highlight: function ( element, errorClass, validClass ) {
	$( element ).parents( "div" ).addClass( errorClass ).removeClass( validClass );
	$( element ).addClass( errorClass ).removeClass( validClass );
},
unhighlight: function ( element, errorClass, validClass ) {
	$( element ).parents( "div" ).addClass( validClass ).removeClass( errorClass );
	$( element ).addClass( validClass ).removeClass( errorClass );
}, */
});