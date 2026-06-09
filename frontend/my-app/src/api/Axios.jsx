import axios from "axios";

export const API = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: import.meta.env.VITE_API_URL || "/api",
  // withCredentials: true - this is for a specific range/url (cors setup)
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // VERY IMPORTANT
});
