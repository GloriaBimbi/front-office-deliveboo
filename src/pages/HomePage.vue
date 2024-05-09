<script>
import { api, store } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      store,
      restaurants: null,
    };
  },

  methods: {
    fetchRestaurant() {
      axios.get(api.baseUrl + `restaurants`).then((response) => {
        console.log(response.data.data);
        store.restaurants = response.data.data;
      });
    },
  },

  created() {
    this.fetchRestaurant();
  },
};
</script>

<template>
  <div class="container">
    <section class="jumbo">
      <h1>Homepage</h1>
    </section>

    <!-- filtro tipologie -->
    <section id="type-filter">
      <div class="row">
        <div class="col"></div>
      </div>
    </section>

    <!-- lista ristoranti  -->
    <section id="restaurant-list">
      <div class="row">
        <div class="col-6" v-for="restaurant in store.restaurants">
          <div class="card">
            <img :src="restaurant.image" class="card-img-top" alt="..." />
            <div class="card-body">
              <div class="card-title">
                {{ restaurant.name }}
              </div>
              <p class="card-text">
                {{ restaurant.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- paginator -->
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
