<template>
  <div>
    <h2>Currently Available Trainees</h2>

    <ul>
      <li v-for="trainee in trainees" :key="trainee.id">
        <div :class="{ highlight: trainee.skill > 70 }" class="card">
          <div class="w-[70%]">
            <h3>{{ trainee.name }}</h3>
            <p>{{ trainee.training_center.name }}</p>
          </div>

          <!-- View Details Button -->
          <router-link
            :to="{ name: 'TraineeProfile', params: { id: trainee.id } }"
            class="btn"
          >
            View Details
          </router-link>

          <!-- Edit Button -->
          <router-link
            :to="{ name: 'EditTrainee', params: { id: trainee.id } }"
            class="btn-edit"
          >
            Edit
          </router-link>
        </div>
      </li>
    </ul>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ lastPage }}</span>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage >= lastPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { traineeService } from "../services/api.js";

export default {
  name: "TraineesList",

  data() {
    return {
      trainees: [],
      currentPage: 1,
      lastPage: 1,
    };
  },
  methods: {
    goToPage(page) {
      this.$router.push({ path: "/trainees", query: { page } });
    },
    async fetchTrainees(page = 1) {
      try {
        const response = await traineeService.getAll({ page });
        this.trainees = response.data;
        this.currentPage = response.current_page;
        this.lastPage = response.last_page;
      } catch (error) {
        console.error(
          "Error fetching trainees:",
          error.response?.data?.message || error.message
        );
      }
    },
  },
  mounted() {
    const page = parseInt(this.$route.query.page) || 1;
    this.fetchTrainees(page);
    // this.fetchTrainees();
  },
  watch: {
    "$route.query.page"(newPage) {
      this.fetchTrainees(parseInt(newPage) || 1);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
