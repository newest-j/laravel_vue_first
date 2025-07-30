<template>
  <div>
    <form @submit.prevent="updateTrainee" class="space-y-4">
      <h2>Edit Trainee</h2>

      <!-- Trainee Name -->
      <div class="flex flex-col space-y-1">
        <label for="name" class="text-sm font-normal">Trainee Name:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
          class="p-2 border border-gray-300 rounded"
        />
      </div>

      <!-- Trainee Strength -->
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
          class="p-2 border border-gray-300 rounded"
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
          class="p-2 border border-gray-300 rounded resize-none"
        ></textarea>
      </div>

      <!-- Select a Training Center -->
      <div class="flex flex-col space-y-1">
        <label for="training_center_id" class="text-sm font-normal"
          >Select a Training Center:</label
        >
        <select
          id="training_center_id"
          v-model="form.training_center_id"
          required
          class="p-2 border border-gray-300 rounded"
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

      <!-- Update Button -->
      <button
        type="submit"
        class="w-full px-4 py-2 text-white transition duration-300 ease-in-out bg-blue-400 rounded hover:bg-blue-500"
      >
        Update Trainee
      </button>

      <!-- Validation Errors -->
      <ul v-if="errors.length" class="px-4 py-2 bg-red-100">
        <li v-for="(error, index) in errors" :key="index" class="my-2">
          {{ error }}
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { traineeService, trainingCenterService } from "../services/api.js";

export default {
  name: "EditTrainee",

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
    async fetchTrainee() {
      try {
        const response = await traineeService.getById(this.$route.params.id);

        const { name, skill, bio, training_center_id } = response.data;

        this.form = { name, skill, bio, training_center_id };
      } catch (error) {
        console.error(
          "Error fetching trainee details:",
          error.response?.data?.message || error.message
        );
      }
    },

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

    async updateTrainee() {
      try {
        await traineeService.update(this.$route.params.id, this.form);
        this.$router.push({ name: "TraineesList" });
      } catch (error) {
        this.errors = error.response?.data?.errors || [
          "An error occurred. Please try again.",
        ];
      }
    },
  },
  mounted() {
    this.fetchTrainee();
    this.fetchTrainingCenters();
  },
};
</script>

<style scoped></style>
