<script>
import { api, store } from "../store";
import axios from "axios";

export default {
  props: { restaurant: {} },
  data() {
    return {
      store,
      restaurant: null,
    };
  },
  mounted() {
    this.fetchRestaurant(this.$route.params.slug);
  },
  methods: {
    fetchRestaurant(slug) {
      const restaurantSlug = this.$route.params.slug;
      axios
        .get(api.baseUrl + `restaurant/${restaurantSlug}`)
        .then((response) => {
          console_log(response.data);
          this.restaurant = response.data.result;
        });
    },
  },
};
</script>

<template>
  <!-- <h1>Name: {{ restaurant.name }}</h1> -->
</template>

<style lang="scss" scoped></style>
