import axios from "axios";

export const API = axios.create({
  // baseURL: "http://localhost:5000" = development
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // VERY IMPORTANT
});
