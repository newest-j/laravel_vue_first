<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<script>
import Layout from "./components/Layout.vue";
export default {
  components: {
    Layout,
  },
};
</script>

<style lang="scss" scoped></style>
