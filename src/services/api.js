import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1008",
});

export const apiCall = (method, url, data) => {
  return axiosInstance({
    method,
    url,
    data,
  });
};
