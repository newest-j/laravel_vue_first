import { defineStore } from "pinia";
import { authService } from "@/services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    hasTraineeProfile: (state) => state.user?.trainee !== null,
    getToken: () => localStorage.getItem("auth_token"),
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authService.login(credentials);
        if (response.success) {
          this.user = response.data.user;
          this.token = response.data.token;
          this.isAuthenticated = true;
          return { success: true };
        } else {
          this.error = response.message;
          return { success: false, message: response.message };
        }
      } catch (error) {
        this.error = error.response?.data?.message || "Login failed";
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    async register(userData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authService.register(userData);
        if (response.success) {
          this.user = response.data.user;
          this.token = response.data.token;
          this.isAuthenticated = true;
          return { success: true };
        } else {
          this.error = response.message;
          return { success: false, message: response.message };
        }
      } catch (error) {
        this.error = error.response?.data?.message || "Registration failed";
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await authService.logout();
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        this.error = null;
      }
    },

    async checkAuth() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.logout();
        return false;
      }

      try {
        const response = await authService.getCurrentUser();
        if (response.success) {
          this.user = response.data;
          this.token = token;
          this.isAuthenticated = true;
          return true;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }

      this.logout();
      return false;
    },

    setError(error) {
      this.error = error;
    },

    clearError() {
      this.error = null;
    },
  },
});
