<template>
  <div>
    <h2>{{ trainee.name }}'s Profile</h2>

    <!-- Error Message -->
    <div v-if="error" class="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
      <div class="mt-2">
        <router-link to="/login" class="text-blue-600 hover:text-blue-800 underline">
          Go to Login
        </router-link>
      </div>
    </div>

    <!-- Trainee Info -->
    <div v-if="!error" class="p-4 bg-gray-200 rounded">
      <p><strong>Skill level:</strong> {{ trainee.skill }}</p>
      <p><strong>Id:</strong> {{ trainee.id }}</p>
      <p><strong>About me:</strong></p>
      <p>{{ trainee.bio }}</p>
    </div>

    <!-- Training Center Info -->
    <div v-if="!error" class="px-4 pb-4 my-4 bg-white border-2 border-dashed rounded">
      <h3>Training Center Information</h3>
      <p>
        <strong>Training Center name:</strong>
        {{ trainee.training_center.name }}
      </p>
      <p><strong>Location:</strong> {{ trainee.training_center.location }}</p>
      <p><strong>About the Training Center:</strong></p>
      <p>{{ trainee.training_center.description }}</p>
    </div>

    <!-- Delete a Trainee -->
    <form v-if="!error" @submit.prevent="deleteTrainee(trainee.id)">
      <button type="submit" class="my-4 btn">Delete Trainee</button>
    </form>
  </div>
</template>

<script>
import { traineeService } from "../services/api.js";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "TraineeProfile",

  data() {
    return {
      trainee: {
        name: "",
        skill: "",
        id: null,
        bio: "",
        training_center: {
          name: "",
          location: "",
          description: "",
        },
      },
      error: null,
    };
  },
  methods: {
    async fetchTrainee(id) {
      try {
        // Check authentication status
        const authStore = useAuthStore();
        console.log("Auth status:", authStore.isAuthenticated);
        console.log("Token:", authStore.getToken);
        
        if (!authStore.isAuthenticated) {
          this.error = "You are not authenticated. Please log in.";
          return;
        }

        const response = await traineeService.getById(id);
        this.trainee = response.data;
        this.error = null;
      } catch (error) {
        console.error(
          "Error fetching trainee:",
          error.response?.data?.message || error.message
        );
        
        if (error.response?.status === 403) {
          this.error = "Access denied. You may not have permission to view this trainee or your session has expired. Please log in again.";
        } else if (error.response?.status === 401) {
          this.error = "Authentication required. Please log in.";
        } else {
          this.error = error.response?.data?.message || "Error fetching trainee details.";
        }
      }
    },
    async deleteTrainee(id) {
      if (confirm("Are you sure you want to delete this trainee?")) {
        try {
          await traineeService.delete(id);
          this.$router.push("/trainees");
        } catch (error) {
          console.error(
            "Error deleting trainee:",
            error.response?.data?.message || error.message
          );
          this.error = error.response?.data?.message || "Error deleting trainee.";
        }
      }
    },
  },
  mounted() {
    const traineeId = this.$route.params.id; // Get trainee ID from route params
    console.log("Trainee ID:", traineeId);

    this.fetchTrainee(traineeId);
  },
};
</script>

<style scoped></style>
