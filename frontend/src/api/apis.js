
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const setToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// ===== USERS (Admin only) =====

export const fetchUsers = async () => {
  const res = await api.get("/auth/users");
  return res.data;
};

export const createUser = async (userData) => {
  const res = await api.post("/auth/users", userData);
  return res.data;
};

export const updatePassword = async (newPassword) => {
  const res = await api.put("/auth/users/password", {
    password: newPassword,
  });

  return res.data;
};

// ===== STORES =====

export const fetchStores = async () => {
  const res = await api.get("/stores");
  return res.data;
};

export const createStore = async (data) => {
  const res = await api.post("/stores", data);
  return res.data;
};

export const fetchStoreById = async (id) => {
  const res = await api.get(`/stores/${id}`);
  return res.data;
};

// ===== RATINGS =====

export const submitRating = async (storeId, value) => {
  const res = await api.post("/stores/rating", {
    storeId,
    value,
  });

  return res.data;
};

export const fetchStoreRatings = async (storeId) => {
  const res = await api.get(`/stores/${storeId}/ratings`);
  return res.data;
};

// ===== AUTH =====

export const signup = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);

  localStorage.setItem("token", res.data.token);

  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("token");
};

export default api;