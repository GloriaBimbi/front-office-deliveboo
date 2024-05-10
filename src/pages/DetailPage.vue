<script>
import { api, store } from "../store";
import axios from "axios";

export default {
  props: { restaurant: Object },

  data() {
    return {
      store,
      restaurant: [],
    };
  },

  created() {
    const restaurantSlug = this.$route.params.slug;
    axios
      .get(api.baseUrl + `restaurants/${restaurantSlug}`)
      .then((response) => {
        console.log(response.data);
        this.restaurant = response.data;
      });
  },
};
</script>

<template>
  <div class="container my-5">
    <div class="row mb-3">
      <div class="col-6">
        <img class="img-fluid" :src="restaurant.image" alt="" />
      </div>
      <div class="col-6 text-info">
        <h1>{{ restaurant.name }}</h1>
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <div class="row g-2">
      <div class="col-3" v-for="dish in restaurant.dishes">
        <div class="card bg-card h-100">
          <img :src="dish.image" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ dish.name }}</h5>
            <p class="card-text">
              {{ dish.description }}
            </p>

            <a href="#" class="btn btn-primary">See details</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-card {
  background-color: rgba(0, 153, 255, 0.1);
  color: #ffffff;
}
</style>
