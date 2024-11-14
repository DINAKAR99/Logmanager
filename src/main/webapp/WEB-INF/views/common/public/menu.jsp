<nav class="navbar navbar-expand-lg navbar-dark bg-dark p-1" style="background-color: #6bafd4;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown">
          <a class="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            Company
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Blog</a></li>
            <li><a class="dropdown-item" href="#">About Us</a></li>
            <li><a class="dropdown-item" href="#">Contact us</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2 active" aria-current="page" href="${pageContext.request.contextPath}/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2" href="#">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2" href="${pageContext.request.contextPath}/userRegistration">Registration</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2" href="${pageContext.request.contextPath}/loginPage">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2" href="${pageContext.request.contextPath}/logout">LOgout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .navbar-nav .nav-link {
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .navbar-nav .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    /* Slight color change */
    transform: scale(1.1);
    /* Slight scale effect */
  }

  /* For dropdown items */
  .dropdown-menu .dropdown-item {
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .dropdown-menu .dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
    /* Slight color change */
    transform: scale(1.05);
    /* Slight scale effect */
  }
</style>