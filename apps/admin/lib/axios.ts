import axios from "axios";

const apiBase =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

const baseURL = apiBase
  ? apiBase.endsWith("/api")
    ? apiBase
    : `${apiBase}/api`
  : "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically if available
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("bearer_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error)
    return Promise.reject(error.response.data);
  }
);
