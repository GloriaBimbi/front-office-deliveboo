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
  <div v-if="loading" class="loading-screen">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<style lang="scss" scoped>
// .loader-container {
//   height: 100vh;
//   width: 100vw;
//   background-color: linear-gradient(
//     180deg,
//     rgb(12, 22, 74) 0%,
//     rgb(0, 53, 89) 100%
//   );
//   position: absolute;
//   top: 0;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 9999;

//   .fa-spinner {
//     color: white;
//   }
// }
</style>
