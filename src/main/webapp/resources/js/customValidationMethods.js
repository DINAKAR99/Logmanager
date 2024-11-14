

$(document).ready(function() {
	
/*-------------File Size validation start-------------*/
	$.validator.addMethod("maxFileSize", function(value, element, param) {
		var isOptional = this.optional(element), file;
		if (isOptional) {
			return isOptional;
		}
		if ($(element).attr("type") === "file") {
			if (element.files && element.files.length) {
				file = element.files[0];
				var result = file.size && (file.size / 1024) <= param;
				if (!result) {
					$(element).val(''); //Clears file from field if size exceeds. 
				}
				return result;
			}
		}
		return false;
	}, "Maximum File size allowed is {0} kb!");
/*-------------File Size validation end-------------*/

/*-------------Used for Login Page-------------------*/

	$.validator.addMethod("incorrectCaptcha", function(value, element, param) {
		var elementId = $(element).attr("id");
		if(elementId === "captchaInput1") {
			return ValidCaptcha1();
		} else if(elementId === "captchaInput2") {
			return ValidCaptcha2();
		} else {
			return true;
		}
		//return ValidCaptcha2(); // function in captcha.js
	}, "Entered captcha is incorrect!");

	$.validator.addMethod("userTypeCheck", function(value, element, param) {
		var result = false;
		$.ajax({
			url : "public/loginusertypecheck",
			type : 'get',
			async: false,
			data : {
				loginName : $(element).val().trim()
			},
			success : function(response) {
				result = (param === response);
			}, erorr: function(e) {
				console.log(e);
			}
		});
		return result;
	}, "User not found!");

	$.validator.addMethod("userExists", function(value, element, param) {
		var result = true;
		$.ajax({
			url : "checkuserid",
			type : 'get',
			async: false,
			data : {
				loginName : $(element).val().trim()
			},
			success : function(response) {
				result = !response;
			}, erorr: function(e) {
				console.log(e);
			}
		});
		return result;
	}, "User not found!");
	
	
	$.validator.addMethod("userExist", function(value, element, param) {
		var result = true;
		$.ajax({
			url : "checkuserid",
			type : 'get',
			async: false,
			data : {
				loginName : $(element).val().trim()
			},
			success : function(response) {
				if(response){
					result = true;
				}else{
					result = false;
				}
			}, erorr: function(e) {
				console.log(e);
			}
		});
		return result;
	}, "User not found!");
	
	
	$.validator.addMethod("OTPValidate", function(value, element, param) {
		var result = true;
		
		$.ajax({
			url : "validateOTPAjax",
			type : 'get',
			async: false,
			data : {
				otp : $(element).val().trim(),
				userId : $(".userIdOtp").val().trim()
				
			},
			success : function(response) {
				if(response){
					result = true;
				}else{
					result = false;
				}
			}, erorr: function(e) {
				console.log(e);
			}
		});
		return result;
	}, "User not found!");
	
	
	
	
/*------------- Used for Login Page [end] -------------------*/
		
});