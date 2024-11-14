<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %> <%@ taglib uri="http://tiles.apache.org/tags-tiles"
prefix="tiles" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <noscript>
      <meta
        http-equiv="refresh"
        content="1; url=${pageContext.request.contextPath}/jsp/disableJavascript.html"
      />
    </noscript>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="_csrf" content="${_csrf.token}" />
    <meta name="_csrf_header" content="${_csrf.headerName}" />
    <meta name="description" content="Telangana State TFiber" />
    <meta name="keywords" content="Telangana State TFiber" />
    <!-- bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <!-- jquery -->
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
      integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <!-- bootstrap -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <!-- validate -->
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/additional-methods.js"></script>
    <!-- <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.css"> -->
    <!-- validate -->

    <!-- <script src="${pageContext.request.contextPath}/resources/js/jquery.js" defer></script>z -->
    <link
      href="${pageContext.request.contextPath}/resources/main.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/font-awesome.min.css"
    />
    <link
      href="${pageContext.request.contextPath}/resources/css/bootstrap-datepicker.min.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/breakingnews/breaking-news-ticker.css"
    />
    <link
      href="${pageContext.request.contextPath}/resources/custom.css"
      rel="stylesheet"
    />
    <link
      href="${pageContext.request.contextPath}/resources/menu/sm-core-css.css"
      rel="stylesheet"
    />
    <link
      href="${pageContext.request.contextPath}/resources/menu/sm-blue.css"
      rel="stylesheet"
    />

    <!-- <script src="${pageContext.request.contextPath}/resources/js/scriptCheck.js" defer></script> -->

    <title>test</title>
    <script>
      // document.onkeydown = function (e) {
      //   const forbiddenKeys = [
      //     123,
      //     "I".charCodeAt(0),
      //     "C".charCodeAt(0),
      //     "J".charCodeAt(0),
      //     "U".charCodeAt(0),
      //     "S".charCodeAt(0),
      //   ];
      //   if (
      //     forbiddenKeys.includes(e.keyCode) ||
      //     (e.ctrlKey && forbiddenKeys.slice(1).includes(e.keyCode))
      //   ) {
      //     return false;
      //   }
      // };
    </script>
  </head>

  <body>
    <div class="wrapper" id="main-content">
      <header>
        <tiles:insertAttribute name="header" />
      </header>
      <tiles:insertAttribute name="menu" />
      <div class="content-wrapper">
        <tiles:insertAttribute name="content" />
      </div>
      <tiles:insertAttribute name="footer" />
    </div>
  </body>
</html>
