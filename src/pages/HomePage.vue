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
        store.restaurants = response.data.data;
      });
    },

    fetchTypes() {
      axios.get(api.baseUrl + `types`).then((response) => {
        console.log(response.data.data);
        store.types = response.data.data;
      });
    },
  },

  created() {
    this.fetchRestaurant();
    this.fetchTypes();
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
        <div class="col" v-for="type in store.types">
          <div class="card">
            <div class="card-image"><img :src="type.logo" alt="" /></div>
            <div class="card-body">{{ type.name }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- lista ristoranti  -->
    <section id="restaurant-list">
      <div class="row row-cols-2 g-2">
        <div
          class="col"
          v-for="restaurant in store.restaurants"
          :restaurant="restaurant"
          :key="restaurant.id"
        >
          <router-link
            :to="{ name: 'restaurant.show', params: { slug: restaurant.slug } }"
          >
            <div class="card h-100">
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
          </router-link>
        </div>
      </div>
      <!-- paginator -->
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
