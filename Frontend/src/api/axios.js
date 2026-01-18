import axios from "axios";

// Create an Axios instance
const instance = axios.create({
  baseURL: "http://localhost:5000/api", // <-- Your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
