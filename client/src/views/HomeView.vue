<template>
  <div class="px-8 py-12 text-center">
    <div v-if="authStore.isAuthenticated">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome back, {{ authStore.currentUser?.name }}!</h1>
      <p class="text-lg text-gray-600 mb-8">
        Manage your trainee profile and connect with other trainees.
      </p>
      
      <div class="flex justify-center space-x-4">
        <router-link 
          :to="{ name: 'TraineesList' }" 
          class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          View My Profile
        </router-link>
        <router-link 
          :to="{ name: 'CreateTrainee' }" 
          class="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          v-if="!authStore.hasTraineeProfile"
        >
          Create Profile
        </router-link>
      </div>
    </div>
    
    <div v-else>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to the Trainee Network</h1>
      <p class="text-lg text-gray-600 mb-8">
        Connect with other trainees, share your skills, and grow your network.
      </p>
      
      <div class="flex justify-center space-x-4">
        <router-link 
          to="/register" 
          class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </router-link>
        <router-link 
          to="/login" 
          class="inline-block px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
