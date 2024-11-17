import toast from "react-hot-toast";
import { decrypt, encrypt } from "./EncrDecr";

export const isLoggedIn = () => {
  const data = sessionStorage.getItem("isLoggedIn");
  return data;
};
// ----------------------------------------------------------------
export const doLogin = (response) => {
  if (response.status === 200) {
    // Encrypt user data and token
    const encryptedUserData = encrypt(JSON.stringify(response.data));
    const encryptedUserJWToken = encrypt(
      JSON.stringify(response.data.jwttoken)
    );

    // Store encrypted data in sessionStorage
    sessionStorage.setItem("encrypted_complete_user_data", encryptedUserData);
    sessionStorage.setItem("encrypted_jwt_token", encryptedUserJWToken);
    sessionStorage.setItem("username", response.data.username);
    sessionStorage.setItem(
      "empid",
      encrypt(JSON.stringify(response.data.empid))
    );
    sessionStorage.setItem("userid", response.data.userid);
    sessionStorage.setItem("role", response.data.role);

    // Set login time
    const loginTime = new Date().getTime(); // Capture current timestamp
    sessionStorage.setItem("loginTime", loginTime);

    // Mark the user as logged in
    sessionStorage.setItem("isLoggedIn", true);
  }
};

export const doLogout = () => {
  sessionStorage.clear();
  console.log("data removed from session");
};
export const doUpdate = (data) => {
  console.log("data update in session storage");
  sessionStorage.removeItem("fulldata");
  const encryptedUserData = encrypt(JSON.stringify(data));
  sessionStorage.setItem("fulldata", encryptedUserData);
  sessionStorage.setItem("dataWithoutEncpt", JSON.stringify(data)); // remove this line after completion
};
// ----------------------------------------------------------------

export const getCurrentUserDetails = () => {
  if (isLoggedIn()) {
    console.log(
      JSON.parse(
        decrypt(sessionStorage.getItem("encrypted_complete_user_data"))
      )
    );
    return JSON.parse(
      decrypt(sessionStorage.getItem("encrypted_complete_user_data"))
    );
  }
};

export const getJwtToken = () => {
  if (isLoggedIn()) {
    console.log(
      JSON.parse(decrypt(sessionStorage.getItem("encrypted_jwt_token")))
    );
    return JSON.parse(decrypt(sessionStorage.getItem("encrypted_jwt_token")));
  }
};

export const setJwtToken = (jwttoken) => {
  return sessionStorage.setItem(
    "encrypted_jwt_token",
    encrypt(JSON.stringify(jwttoken))
  );
};
export const getRefreshToken = () => {
  const user = getCurrentUserDetails();
  return user?.refreshtoken.refreshToken;
};

export const getUserName = () => {
  const user = getCurrentUserDetails();
  return user?.username;
};

export const handleLogoutAndRedirect = (navigate, error) => {
  if (
    error.response.data.status === 400 ||
    error.response.data.status === 401 ||
    error.response.data.status === 403
  ) {
    doLogout();
    // Redirect to the home page
    navigate("/");
    toast.success("please login again..!!");
  }
};
