import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  // baseURL: "https://gautamsolar.us",
  baseURL: import.meta.env.VITE_SERVER_ADDRESS,
  // baseURL: "http://localhost:1008",
  withCredentials: true,
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
  (er) => Promise.reject(er),
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (er) => {
    if (er.response?.status === 401) {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.removeItem('loginType')
      await axios.post(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/sales/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      toast.error(
        er?.response?.data?.message || "Session expired!! Please Login Again",
      );
      console.log(er?.response);
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 1500);
    }
    return Promise.reject(er);
  },
);
