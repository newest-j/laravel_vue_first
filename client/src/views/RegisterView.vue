<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          sign in to your existing account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div v-if="authStore.error" class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="text-sm text-red-600">{{ authStore.error }}</div>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                autocomplete="name"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.name }"
              />
            </div>
            <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.email }"
              />
            </div>
            <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.password }"
              />
            </div>
            <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                name="password_confirmation"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.password_confirmation }"
              />
            </div>
            <p v-if="errors.password_confirmation" class="mt-2 text-sm text-red-600">{{ errors.password_confirmation }}</p>
          </div>

          <div>
            <label for="training_center_id" class="block text-sm font-medium text-gray-700">
              Training Center
            </label>
            <div class="mt-1">
              <select
                id="training_center_id"
                v-model="form.training_center_id"
                name="training_center_id"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.training_center_id }"
              >
                <option value="">Select a training center</option>
                <option v-for="center in trainingCenters" :key="center.id" :value="center.id">
                  {{ center.name }}
                </option>
              </select>
            </div>
            <p v-if="errors.training_center_id" class="mt-2 text-sm text-red-600">{{ errors.training_center_id }}</p>
          </div>

          <div>
            <label for="skill" class="block text-sm font-medium text-gray-700">
              Skill Level (0-100)
            </label>
            <div class="mt-1">
              <input
                id="skill"
                v-model.number="form.skill"
                name="skill"
                type="number"
                min="0"
                max="100"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.skill }"
              />
            </div>
            <p v-if="errors.skill" class="mt-2 text-sm text-red-600">{{ errors.skill }}</p>
          </div>

          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <div class="mt-1">
              <textarea
                id="bio"
                v-model="form.bio"
                name="bio"
                rows="4"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.bio }"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            <p v-if="errors.bio" class="mt-2 text-sm text-red-600">{{ errors.bio }}</p>
          </div>

          <div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="authStore.loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
              <span v-else>Create account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { trainingCenterService } from '@/services/api';

const router = useRouter();
const authStore = useAuthStore();

const trainingCenters = ref([]);

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  training_center_id: '',
  skill: 50,
  bio: ''
});

const errors = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  training_center_id: '',
  skill: '',
  bio: ''
});

const validateForm = () => {
  errors.name = '';
  errors.email = '';
  errors.password = '';
  errors.password_confirmation = '';
  errors.training_center_id = '';
  errors.skill = '';
  errors.bio = '';

  if (!form.name) {
    errors.name = 'Name is required';
  }

  if (!form.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!form.password_confirmation) {
    errors.password_confirmation = 'Password confirmation is required';
  } else if (form.password !== form.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match';
  }

  if (!form.training_center_id) {
    errors.training_center_id = 'Training center is required';
  }

  if (form.skill < 0 || form.skill > 100) {
    errors.skill = 'Skill level must be between 0 and 100';
  }

  if (!form.bio) {
    errors.bio = 'Bio is required';
  } else if (form.bio.length < 20) {
    errors.bio = 'Bio must be at least 20 characters';
  }

  return !Object.values(errors).some(error => error);
};

const loadTrainingCenters = async () => {
  try {
    const response = await trainingCenterService.getAll();
    trainingCenters.value = response;
  } catch (error) {
    console.error('Failed to load training centers:', error);
  }
};

const handleRegister = async () => {
  if (!validateForm()) return;

  authStore.clearError();
  const result = await authStore.register({
    name: form.name,
    email: form.email,
    password: form.password,
    password_confirmation: form.password_confirmation,
    training_center_id: form.training_center_id,
    skill: form.skill,
    bio: form.bio
  });

  if (result.success) {
    router.push('/');
  }
};

onMounted(() => {
  loadTrainingCenters();
});
</script> 