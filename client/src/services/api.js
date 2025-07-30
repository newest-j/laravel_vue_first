import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if we're not already on login/register pages
      const currentPath = window.location.pathname;
      if (
        !currentPath.includes("/login") &&
        !currentPath.includes("/register")
      ) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  async register(userData) {
    const response = await api.post("/register", userData);
    if (response.data.success) {
      localStorage.setItem("auth_token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async login(credentials) {
    const response = await api.post("/login", credentials);
    if (response.data.success) {
      localStorage.setItem("auth_token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    }
  },

  async getCurrentUser() {
    const response = await api.get("/me");
    return response.data;
  },

  isAuthenticated() {
    return !!localStorage.getItem("auth_token");
  },

  getToken() {
    return localStorage.getItem("auth_token");
  },

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// Trainee service
export const traineeService = {
  async getAll(params = {}) {
    const response = await api.get("/trainees", { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/trainees/${id}`);
    return response.data;
  },

  async create(traineeData) {
    const response = await api.post("/trainees", traineeData);
    return response.data;
  },

  async update(id, traineeData) {
    const response = await api.put(`/trainees/${id}`, traineeData);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/trainees/${id}`);
    return response.data;
  },
};

// Training center service
export const trainingCenterService = {
  async getAll() {
    const response = await api.get("/training-centers");
    return response.data;
  },
};

export default api;
