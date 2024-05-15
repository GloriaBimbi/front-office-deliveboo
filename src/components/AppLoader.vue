<script>
export default {
  data() {
    return {
      loading: false,
    };
  },

  mounted() {
    // Listen for Axios events to show/hide the loader
    this.$axios.interceptors.request.use((config) => {
      this.loading = true;
      return config;
    });

    this.$axios.interceptors.response.use(
      (response) => {
        this.loading = false;
        return response;
      },
      (error) => {
        this.loading = false;
        return Promise.reject(error);
      }
    );
  },
};
</script>

<template>
  <div v-if="loading" class="loader-container">
    <div class="loader">
      <i class="fa-solid fa-spinner fa-spin"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader-container {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
