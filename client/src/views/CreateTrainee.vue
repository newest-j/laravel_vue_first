<template>
  <div>
    <form @submit.prevent="submitForm" class="space-y-4">
      <h2>Create a New Trainee</h2>

      <!-- Trainee Name -->
      <div class="flex flex-col space-y-1">
        <label for="name" class="text-sm font-normal">Trainee Name:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
          class="border border-gray-300 p-2 rounded"
        />
      </div>

      <!-- Trainee Skill -->
      <div class="flex flex-col space-y-1">
        <label for="skill" class="text-sm font-normal"
          >Trainee Skill (0-100):</label
        >
        <input
          type="number"
          id="skill"
          v-model="form.skill"
          min="0"
          max="100"
          required
          class="border border-gray-300 p-2 rounded"
        />
      </div>

      <!-- Trainee Bio -->
      <div class="flex flex-col space-y-1">
        <label for="bio" class="text-sm font-normal">Biography:</label>
        <textarea
          rows="5"
          id="bio"
          v-model="form.bio"
          required
          class="border border-gray-300 p-2 rounded resize-none"
        ></textarea>
      </div>

      <!-- Training Center Selection -->
      <div class="flex flex-col space-y-1">
        <label for="training_center_id" class="text-sm font-normal"
          >Select a Training Center:</label
        >
        <select
          id="training_center_id"
          v-model="form.training_center_id"
          required
          class="border border-gray-300 p-2 rounded"
        >
          <option value="" disabled>Select a Center</option>
          <option
            v-for="center in trainingCenters"
            :key="center.id"
            :value="center.id"
          >
            {{ center.name }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition duration-300 ease-in-out"
      >
        Create Trainee
      </button>

      <!-- Validation Errors -->
      <div v-if="errors.length" class="px-4 py-2 bg-red-100">
        <ul>
          <li v-for="(error, index) in errors" :key="index" class="my-2">
            {{ error }}
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import { traineeService, trainingCenterService } from "../services/api.js";

export default {
  data() {
    return {
      form: {
        name: "",
        skill: "",
        bio: "",
        training_center_id: "",
      },
      trainingCenters: [],
      errors: [],
    };
  },

  methods: {
    async fetchTrainingCenters() {
      try {
        const response = await trainingCenterService.getAll();
        this.trainingCenters = response.data;
      } catch (error) {
        console.error(
          "Error fetching training centers:",
          error.response?.data?.message || error.message
        );
      }
    },

    async submitForm() {
      try {
        const response = await traineeService.create(this.form);
        if (response.success) {
          alert("Trainee created successfully.");
          this.$router.push({ name: "TraineesList" });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        this.errors.push("Failed to create trainee.");
      }
    },
  },

  mounted() {
    this.fetchTrainingCenters();
  },
};
</script>

<style scoped></style>
