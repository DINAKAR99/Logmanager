<div class="container mt-5">
    <div class="card-header bg-info">
        <h4 class="card-title bg-info ">Warning</h4>
    </div>
    <div class="card-body">
        <h2>DUAL LOGIN DETECTED </h2>
        <h5 class="text-danger">IT IS NOT ALLOWED FOR MORE THAN 1 LOGIN INSTANCE</h5>

        <div class="mt-4">
            <a href="/logoff" class="btn btn-secondary">Cancel</a>
            <a href="${pageContext.request.contextPath}/dualsessionlogin" class="btn btn-primary">Login</a>
        </div><br>
        <h6> <span class="text-danger">* </span> upon clicking login button other session will be expired</h6>
    </div>
</div>
</div>