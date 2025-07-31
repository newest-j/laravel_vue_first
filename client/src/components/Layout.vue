<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">
                <router-link to="/" class="hover:text-indigo-600"
                  >Trainee Network</router-link
                >
              </h1>
            </div>
            <nav class="ml-6 flex space-x-8">
              <router-link
                :to="{ name: 'TraineesList' }"
                class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                v-if="authStore.isAuthenticated"
              >
                My Profile
              </router-link>
              <router-link
                :to="{ name: 'CreateTrainee' }"
                class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                v-if="authStore.isAuthenticated"
              >
                Create Trainee
              </router-link>
              <router-link
                :to="{ name: 'CreateTrainee' }"
                class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                v-if="authStore.isAuthenticated && !authStore.hasTraineeProfile"
              >
                Create Profile
              </router-link>
            </nav>
          </div>

          <div class="flex items-center">
            <div
              v-if="authStore.isAuthenticated"
              class="flex items-center space-x-4"
            >
              <span class="text-sm text-gray-700">
                Welcome, {{ authStore.currentUser?.name }}
              </span>
              <button
                @click="handleLogout"
                class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
            <div v-else class="flex items-center space-x-4">
              <router-link
                to="/login"
                class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </router-link>
              <router-link
                to="/register"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.router-link-active {
  @apply text-indigo-600;
}
</style>
