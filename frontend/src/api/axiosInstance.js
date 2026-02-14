import axios from "axios";

// In production (Vercel): set VITE_API_URL=https://team-square-one-bddx.onrender.com in Vercel env vars
// In development: Vite proxy handles /api → localhost:5000 automatically
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("vv_user") || "null");
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("vv_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
