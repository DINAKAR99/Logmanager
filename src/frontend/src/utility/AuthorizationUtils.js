import toast from "react-hot-toast";
import { decrypt, encrypt } from "./EncrDecr";

export const isLoggedIn = () => {
  const data = sessionStorage.getItem("isLoggedIn");
  return data;
};
// ----------------------------------------------------------------
export const doLogin = (response) => {
  if (response.status === 200) {
    const encryptedUserData = encrypt(JSON.stringify(response.data));
    const encryptedUserToken = encrypt(JSON.stringify(response.data.jwttoken));

    sessionStorage.setItem("fulldata", encryptedUserData);
    sessionStorage.setItem("jwttoken", encryptedUserToken);
    sessionStorage.setItem(
      "rawJwtToken",
      JSON.stringify(response.data.jwttoken)
    );
    sessionStorage.setItem("username", response.data.username);
    sessionStorage.setItem("empid", response.data.empid);
    sessionStorage.setItem("userid", response.data.userid);
    sessionStorage.setItem("role", response.data.role);
    sessionStorage.setItem(
      "refreshtoken",
      response.data.refreshtoken.refreshToken
    );
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
    console.log(JSON.parse(decrypt(sessionStorage.getItem("fulldata"))));
    return JSON.parse(decrypt(sessionStorage.getItem("fulldata")));
  }
};

export const getJwtToken = () => {
  const user = getCurrentUserDetails();
  return user?.jwttoken;
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
