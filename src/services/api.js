import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://gautamsolar.us",
  // baseURL: "http://localhost:1008",
});

export const apiCall = (method, url, data, config = {}) => {
  return axiosInstance({
    method,
    url,
    data,
    ...config,
  });
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (er) => Promise.reject(er)
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (er) => {
    if (er.response?.status === 401) {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      toast.error(er?.response?.data?.message || "Session expired!! please login again");
      window.location.href = "/login";
    }
    return Promise.reject(er);
  }
);
