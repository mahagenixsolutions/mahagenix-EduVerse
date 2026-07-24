import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach authentication tokens if present
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("eduverse_auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Unified error handling and response formatting
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized access or session expiry gracefully
        localStorage.removeItem("eduverse_auth_token");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
