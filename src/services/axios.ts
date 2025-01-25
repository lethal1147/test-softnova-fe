import { baseUrl } from "@/constants";
import axios from "axios";

const api = axios.create({
  baseURL: baseUrl.devUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error && error.status === 401) {
      window.location.href = "/login";
      localStorage.removeItem("user-storage");
      return;
    }

    return Promise.reject(error);
  }
);

export default api;
