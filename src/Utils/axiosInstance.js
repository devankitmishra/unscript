// src/utils/axiosInstance.js
import axios from "axios";
let authContextRef;

// function to set auth context globally
export const setAuthContext = (ctx) => {
  authContextRef = ctx;
};

const api = axios.create({
  baseURL: "https://diva-trends-server.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    if (authContextRef) authContextRef.setLoading(true);
    return config;
  },
  (error) => {
    if (authContextRef) authContextRef.setLoading(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (authContextRef) authContextRef.setLoading(false);
    return response;
  },
  (error) => {
    if (authContextRef) authContextRef.setLoading(false);
    return Promise.reject(error);
  }
);

export default api;
