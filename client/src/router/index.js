import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/trainees",
      name: "TraineesList",
      component: () => import("../views/TraineesList.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/trainees/:id",
      name: "TraineeProfile",
      component: () => import("@/views/TraineeProfile.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/trainees/create",
      name: "CreateTrainee",
      component: () => import("../views/CreateTrainee.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/trainees/:id/edit",
      name: "EditTrainee",
      component: () => import("@/views/EditTrainee.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Only check auth if we have a token and are not already authenticated
  if (!authStore.isAuthenticated && authStore.getToken) {
    try {
      await authStore.checkAuth();
    } catch (error) {
      // If auth check fails, clear the invalid token
      authStore.logout();
    }
  }

  // Routes that require authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
    return;
  }

  // Routes that require guest (not authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next("/");
    return;
  }

  next();
});

export default router;
