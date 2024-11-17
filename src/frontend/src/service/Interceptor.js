import axios from "axios";
import { getJwtToken, setJwtToken } from "../utility/AuthorizationUtils";

// Define your public and private API base URLs
export const PUBLIC_API_BASE_URL = import.meta.env.VITE_PUBLIC_URL;
export const PROTECTED_API_BASE_URL = import.meta.env.VITE_PROTECTED_API_URL;
// Enable credentials for cross-origin requests
axios.defaults.withCredentials = true;
export const publicAxios = axios.create({
  baseURL: PUBLIC_API_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: PROTECTED_API_BASE_URL,
});

// Public API Base Path
export const publicBasePath = () => {
  return import.meta.env.PUBLIC_URL;
};

// Protected API Base Path
export const apiBasePath = () => {
  return import.meta.env.VITE_API_URL;
};

// Request interceptor to add Authorization header
privateAxios.interceptors.request.use(
  (config) => {
    const token = getJwtToken(); // Get the current JWT token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle expired token (401)
privateAxios.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized error means the token has likely expired
      try {
        // Try to refresh the token by making a call to the refresh endpoint
        const refreshResponse = await publicAxios.post(
          "token/refresh", // Your refresh token endpoint on the backend
          null, // You don't need to send anything if the refresh token is in the HttpOnly cookie
          { withCredentials: true } // Include cookies (for refresh token in HttpOnly cookie)
        );

        const newAccessToken = refreshResponse.data.jwttoken; // Assuming your backend sends the new access token
        setJwtToken(newAccessToken); // Store the new access token (use your utility function to store it)

        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return privateAxios(error.config); // Retry the request with the new token
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        // If refreshing fails (e.g., refresh token is expired or invalid), redirect to login page
        sessionStorage.clear();
        const locati = window.location.origin + "/Logify/#/sessionExpired"; // Fixed path concatenation
        window.location.href = locati; // Correctly setting the location for redirection
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // Reject other errors
  }
);

export default privateAxios;
