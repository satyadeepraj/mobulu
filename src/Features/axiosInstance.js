import axios from "axios";

const data = localStorage.getItem("adminToken");
const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});
axiosInstance.interceptors.request.use(
  (config) => {
    if (data) {
    const parsedData = JSON.parse(data);
      config.headers.Authorization = `Bearer ${parsedData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
