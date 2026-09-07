// import axios from "axios";
// import toast from "react-hot-toast";

// const axiosInstance = axios.create({
//   // baseURL: "https://gautamsolar.us",
//   baseURL: import.meta.env.VITE_SERVER_ADDRESS,
//   // baseURL: "http://localhost:1008",
//   withCredentials: true,
// });

// export const apiCall = (method, url, data, config = {}) => {
//   return axiosInstance({
//     method,
//     url,
//     data,
//     ...config,
//   });
// };

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token") || null;
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//       };
//     }

//     return config;
//   },
//   (er) => Promise.reject(er),
// );

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (er) => {
//     if (er.response?.status === 401) {
//       localStorage.removeItem("userData");
//       localStorage.removeItem("token");
//       localStorage.removeItem('loginType')
//       await axios.post(
//         `${import.meta.env.VITE_SERVER_ADDRESS}/api/sales/logout`,
//         {},
//         {
//           withCredentials: true,
//         },
//       );
//       toast.error(
//         er?.response?.data?.message || "Session expired!! Please Login Again",
//       );
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     }
//     return Promise.reject(er);
//   },
// );

import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_ADDRESS, // default/fallback before company is picked
    withCredentials: true,
});

// Call this once a company is selected (or restored from localStorage on boot)
// export const setApiCompany = (company) => {
//     if (company?.apiBaseUrl) {
//         axiosInstance.defaults.baseURL = company.apiBaseUrl;
//     }
// };

export const apiCall = (method, url, data, config = {}) => {
    console.log("API CALL:", method, url, data, config);
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
            localStorage.removeItem("loginType");
            await axios.post(
                `${axiosInstance.defaults.baseURL}/api/sales/logout`, // use the CURRENT company's base URL, not the env var
                {},
                {
                    withCredentials: true,
                },
            );
            toast.error(
                er?.response?.data?.message ||
                    "Session expired!! Please Login Again",
            );
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        }
        return Promise.reject(er);
    },
);

export default axiosInstance;
