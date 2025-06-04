import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import message from "@/utils/message";
import router from "@/router";

interface ApiResponse<T = any> {
  code: number | string;
  message: string;
  data: T;
}

const request = axios.create({
  baseURL: 'http://localhost:9090',
  timeout: 5000,
});

// Request Interceptor
request.interceptors.request.use((config: AxiosRequestConfig) => {
  // Set Content-Type
  if (config.data instanceof FormData) {
    delete config.headers?.['Content-Type'];
  } else {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json;charset=UTF-8',
    };
  }

  // Set Bearer Token
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${JSON.parse(token)}`,
    };
  }

  return config;
}, error => {
  return Promise.reject(error);
});

// Response Interceptor
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    let res = response.data;

    if (response.config.responseType === "blob") {
      return res;
    }

    if (typeof res === "string") {
      res = res ? JSON.parse(res) : {};
    }

    return res; // always resolve to allow custom logic in try block
  },
  (error) => {
    if (error.response && error.response.data) {
      const res = error.response.data;

      // Handle auth-related errors
      if (res.code === 401 || res.code === 400 || res.code === 405) {
        message.error(res.message);
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        message.error(res.message || "Request failed.");
      }

      // Resolve with error response to allow custom handling
      return Promise.resolve(res);
    } else {
      message.error("Network error. Please check your connection.");
      return Promise.reject(error); // actual network or timeout error
    }
  }
);

export default request;
