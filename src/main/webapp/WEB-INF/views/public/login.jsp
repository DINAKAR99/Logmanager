<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib
prefix="spring" uri="http://www.springframework.org/tags" %>
<div%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
  <!-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/captcha.js"></script>
			<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/captcha.css" />
			<link rel="stylesheet" type="text/css"
				href="${pageContext.request.contextPath}/resources/toastr/css/toastr.css" />
			<script type="text/javascript"
				src="${pageContext.request.contextPath}/resources/toastr/js/jquery-migrate-1.2.1.min.js"></script>
			<script type="text/javascript"
				src="${pageContext.request.contextPath}/resources/toastr/js/toastr.js"></script>
			<script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script> -->
  <style type="text/css">
    @media (max-width: 1199.98px) {
    }

    @media (max-width: 769px) {
      .logpage {
        margin-top: 170px !important;
      }
    }

    .field-icon {
      float: right;
      margin-right: 10px;
      margin-top: -28px;
      position: relative;
      z-index: 1;
    }
  </style>
  <c:if test="${not empty errorMessageForUsercaptcha}">
    <div class="mt-5 d-flex justify-content-center d-none" id="captchadiv">
      <div
        class="text-center border rounded rounded-5 border-1 border-black py-3 w-50 text-white"
        style="background-color: #dc3546db"
      >
        ${errorMessageForUsercaptcha}
      </div>
    </div>
  </c:if>
  <div class="container-fluid my-5 logpage pr-5">
    <div
      class="col-5 offset-7 p-4 shadow shadow-lg bg-light border"
      style="color: #6bafd4; border-radius: 10px"
    >
      <div class="">
        <h3 class="text-center">Login</h3>
        <hr class="bg-light" />

        <c:if test="${not empty errorMessge}">
          <div class="errorMessageForInvalidCredentials">
            <span
              id="errorMessageForInvalidCredentialsMessage"
              style="color: red"
              >${errorMessge}</span
            >
          </div>
        </c:if>
        <form
          id="loginFormId"
          class="applicantForm"
          method="post"
          action="login"
          autocomplete="off"
        >
          <input
            type="hidden"
            name="${_csrf.parameterName}"
            value="${_csrf.token}"
          />
          <!-- <span id="errorMessageForApplicantName" style="color: red"></span> -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span
                class="input-group-text"
                style="
                  border-radius: 0px;
                  padding-right: 15px;
                  padding-left: 14px;
                "
                ><i class="fa fa-user"></i
              ></span>
            </div>
            <input
              type="text"
              class="form-control applicantLoginInput userNameForApplicant"
              placeholder="User Id"
              name="username"
              id="username"
              required="required"
            />
          </div>
          <!-- <span id="errorMessageForApplicantPassword" style="color: red"></span> -->
          <div class="form-group input-group">
            <div
              class="form-group input-group"
              style="display: flex; width: 100%"
            >
              <div class="input-group-prepend">
                <span class="input-group-text" style="border-radius: 0">
                  <i class="fa fa-key"></i>
                </span>
              </div>
              <div style="flex-grow: 1">
                <input
                  type="password"
                  class="form-control passwordForApplicant"
                  style="
                    border-bottom-left-radius: 0;
                    border-top-left-radius: 0;
                    padding-right: 40px;
                  "
                  placeholder="Password"
                  name="password"
                  required="required"
                  id="passwordInput"
                />
                <span
                  class="fa fa-fw fa-eye-slash field-icon"
                  id="eyeIcon"
                  onclick="togglePasswordVisibility()"
                ></span>
              </div>
            </div>
          </div>

          <div class="form-group d-flex">
            <label
              for="user_captcha"
              class="col-sm-5 col-form-label"
              style="padding-right: 0px; padding-top: 0px"
            >
              <canvas
                id="textCanvas2"
                height="25"
                style="height: 40px"
              ></canvas>
              <!-- <img
                style="height: 40px; width: 110px"
                id="captchaImage2"
                alt="Captcha Image"
                draggable="false"
              /> -->
              <button
                type="button"
                class="btn btn-outline-info px-2 pt-0 pb-0"
                onClick="fetchCaptcha();"
              >
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </button>
            </label>
            <input
              name="captcha"
              required="required"
              type="text"
              id="captchaInput2"
              class="inputbox col-sm-7 form-control"
              placeholder="Enter CAPTCHA"
              style="padding-right: 8px"
            />
          </div>

          <div class="form-group text-center">
            <button
              type="submit"
              class="btn btn-success text-light font-weight-normal"
            >
              <!-- onclick="return saveUserDetails();" -->
              <i class="fa fa-check" aria-hidden="true"></i> Login
            </button>

            <button class="btn btn-danger" type="reset" id="resetButton">
              <!-- onclick="return resetForm();" -->
              <i class="fa fa-refresh" aria-hidden="true"></i> Reset
            </button>
          </div>
          <div class="clearfix"></div>

          <div class="row">
            <div class="col-6">
              <div class="form-group text-center">
                <a
                  href="public/forgotPassword"
                  class="font-weight-bold"
                  id="forgot_password"
                  >Forgot Password</a
                >
              </div>
            </div>
            <div class="col-6">
              <div class="form-group text-center">
                Don't have an account?
                <a
                  href="public/userRegistration"
                  class="font-weight-bold"
                  id="signup"
                  >Register</a
                >
              </div>
            </div>
          </div>

          <!-- <div class="row" style="padding-left:10px;">
						<p class="text-center testColor" >
							Don't have account ? 
							<a class="userRegistration text-primary" href="public/userRegistration"
								id="signup">Click Here to Register </a>
						</p>
					</div> -->
        </form>
      </div>
    </div>
  </div>

  <script>
    let captchaValue = "";
    function fetchCaptcha() {
      $.get(
        "${pageContext.request.contextPath}/captcha/number",
        function (data) {
          captchaValue = data;
          // console.log("captha----------"+data);
          generateCaptcha(data);
        }
      );
    }
    function ValidCaptcha5() {
      var str1 = captchaValue;
      var str2 = document.getElementById("captchaInput2").value;
      if (str1 == str2) {
        return true;
      } else {
        return false;
      }
    }
    function generateCaptcha(data) {
      var code = data;
      var canvasVar = document.getElementById("textCanvas2");
      var tCtx = canvasVar.getContext("2d");
      var imageElem = document.getElementById("captchaImage2");

      // Convert the integer code to a string
      var codeStr = code.toString();
      var codeWithSpaces = codeStr.split("").join(" ");

      // Set canvas size based on the code length
      tCtx.canvas.width = tCtx.measureText(codeWithSpaces).width + 50;
      tCtx.canvas.height = 40; // Adjust as needed

      // Clear the canvas
      tCtx.clearRect(0, 0, tCtx.canvas.width, tCtx.canvas.height);

      // Draw the background
      tCtx.fillStyle = "#000000";
      tCtx.fillRect(0, 0, tCtx.canvas.width, tCtx.canvas.height);

      // Draw the text
      tCtx.font = "18px Arial";
      tCtx.fillStyle = "white";
      tCtx.textAlign = "center";
      tCtx.fillText(
        codeWithSpaces,
        tCtx.canvas.width / 2,
        tCtx.canvas.height / 2 + 6
      );

      // Set the image source to the data URL of the canvas
      imageElem.src = tCtx.canvas.toDataURL();
    }
  </script>
  <script>
    $(document).ready(function () {
      fetchCaptcha();
      $.validator.addMethod(
        "incorrectCaptcha2",
        function (value, element, param) {
          var int1 = captchaValue;
          var int2 = value;
          if (int1 == int2) {
            return true;
          } else {
            return false;
          }
          //return ValidCaptcha2(); // function in captcha.js
        },
        "Entered captcha is incorrect!"
      );
      //captcha
      $(".icon").mousedown(function () {
        $(".passwordForApplicant").attr("type", "text");
      });

      $(".icon").on("mouseup mouseleave", function () {
        $(".passwordForApplicant").attr("type", "password");
      });

      fetchCaptcha();

      $(".formSubmitForAppliant").click(function () {});

      $(".linkForAppliantForgotPassword").click(function () {
        $(".FormForApplicantLogin").hide();
        $(".formForApplicantForgotPassword").show();
      });

      $("#captchaInput2").keyup(function () {
        var captcha = $("#captchaInput2").val().toUpperCase();

        $("#captchaInput2").val(captcha);
      });

      var validator = $("#loginFormId").validate({
        onkeyup: false,
        validClass: "is-valid",
        errorClass: "is-invalid",
        success: "is-valid",
        error: "is-invalid",
        rules: {
          username: {
            required: true,
            pattern: "^[a-zA-Z\\d\\s]{1,150}$",
            maxlength: 20,
          },
          password: {
            required: true,
          },
          captcha: {
            required: true,
            pattern: "^[a-zA-Z\\d]+$",
            minlength: 6,
            maxlength: 6,
            incorrectCaptcha2: true,
          },
        },
        messages: {
          username: {
            required: "This field is required!",
            pattern: "Alphabets and Numbers are allowed!",
            maxlength: "Maximum of {0} characters are allowed",
          },
          password: {
            required: "This field is required!",
          },
          captcha: {
            required: "This field is required!",
            // pattern : "Alphabets and Numbers are allowed!",
            minlength: "Enter a valid captcha!",
            maxlength: "Invalid captcha!",
            incorrectCaptcha2: "Entered captcha is incorrect!",
          },
        },
        errorElement: "div",
        errorPlacement: function (error, element) {
          error.addClass("invalid-feedback");
          $(element).addClass("is-invalid");
          if ($(element).prop("type") === "checkbox") {
            error.insertAfter($(element).parent("label"));
          } else {
            error.insertAfter($(element));
          }
        },
        submitHandler: function (form) {
          $(form)[0].addClass("was-validated");
          $(form)[0].submit();
        },
        invalidHandler: function (event, validator) {
          var errors = validator.numberOfInvalids(); // Number Of Invalid fields
          console.log("Number of Invalid Fields: " + errors);
        },
        onkeyup: function (element, event) {
          if ($(element).attr("id") === "username") {
            //Disabling onkeyup event for User Id as it is depended on Ajax Call for User verification
            return false;
          } else {
            //Calling default onkeyup event for other elements
            return $.validator.defaults.onkeyup.call(this, element, event);
          }
        },
      });
      $("#resetButton").click(function () {
        validator.resetForm();
      });
    });
  </script>
  <script>
    function togglePasswordVisibility() {
      const passwordInput = document.getElementById("passwordInput");
      const eyeIcon = document.getElementById("eyeIcon");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
      } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
      }
    }
  </script></div%@
>
