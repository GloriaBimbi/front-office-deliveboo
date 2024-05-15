<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <div v-if="loading === true" class="loader-container">
    <div class="loader">
      <i class="fa-solid fa-spinner fa-spin fa-4x"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader-container {
  height: 100vh;
  width: 100vw;
  background-color: #0a1c4d;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .fa-spinner {
    color: white;
  }
}
</style>
