<style>
  .error {
    color: red;
  }
</style>

<body>
  <div class="row p-5">
    <div class="col-6 offset-3 p-3 border rounded shadow shadow-lg">
      <h2 class="text-center"></h2>
      <form
        id="registrationForm"
        action="${pageContext.request.contextPath}/userRegistration"
        method="post"
        novalidate
      >
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="userName"
            required
          />
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="mobile" class="form-label">Mobile:</label>
            <input
              type="text"
              class="form-control"
              id="mobile"
              name="userMobile"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            required
            minlength="6"
          />
        </div>
        <div class="d-flex w-100 mb-3">
          <canvas id="captchaCanvas" width="100" height="50"></canvas>
          <button
            type="button"
            style="border-radius: 130px; height: 30px"
            class="btn btn-outline-info px-2 pt-0 pb-0 ml-2 mt-2"
            onClick="fetchCaptcha();"
          >
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </button>
          <div style="flex-grow: 1">
            <input
              name="captcha"
              required="required"
              type="text"
              id="captchaInput2"
              name="captcha"
              class="inputbox col-sm-7 form-control ml-2"
              placeholder="Enter CAPTCHA"
            />
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button type="reset" class="btn btn-danger mr-2">Reset Form</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    $(document).ready(function () {
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
        },
        "Entered captcha is incorrect!"
      );

      $("#registrationForm").validate({
        rules: {
          userName: {
            required: true,
            minlength: 2,
          },

          mobile: {
            required: true,
            pattern: "^[0-9]{10}$", // Correct way to specify the pattern
          },
          password: {
            required: true,
            minlength: 6,
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
          userName: {
            required: "Please enter your name",
            minlength: "Your name must be at least 2 characters long",
          },

          mobile: {
            required: "Please enter your mobile number",
            pattern: "Please enter a valid 10-digit mobile number",
          },
          password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 6 characters long",
          },
          captcha: {
            required: "This field is required!",
            // pattern : "Alphabets and Numbers are allowed!",
            minlength: "Enter a valid captcha!",
            maxlength: "Invalid captcha!",
            incorrectCaptcha2: "Entered captcha is incorrect!",
          },
        },
        // Add Bootstrap 4 styling to the error messages
        errorElement: "span",
        errorClass: "invalid-feedback",
        highlight: function (element, errorClass, validClass) {
          $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).removeClass("is-invalid").addClass("is-valid");
        },

        submitHandler: function (form) {
          // Submit the form
          if (confirm("Are you sure you want to save this role ?")) {
            form.submit();
          }
        },
      });
    });
  </script>
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

    function generateCaptcha(captchaText) {
      const canvas = document.getElementById("captchaCanvas");
      const ctx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Set background color
      ctx.fillStyle = "#000"; // Change to black
      ctx.fillRect(0, 0, width, height);

      // Draw the provided CAPTCHA text
      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff"; // Change text color to white
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(captchaText, width / 2, height / 2);

      // Add some noise
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  </script>
  <script>
    $(document).ready(function () {
      fetchCaptcha();
    });
  </script>
</body>
