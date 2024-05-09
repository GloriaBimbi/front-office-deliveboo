<script>
import { api, store } from "../store";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard.vue";

export default {
  data() {
    return {
      store,
      restaurants: [],
      types: [],
    };
  },

  components: {
    RestaurantCard,
  },

  methods: {
    fetchRestaurant() {
      axios.get(api.baseUrl + `restaurants`).then((response) => {
        store.restaurants = response.data.data;
      });
    },
    fetchFilterRestaurant() {
      axios
        .get(api.baseUrl + `restaurants/advanced-filters`, {
          params: {
            types: this.activeTypesId,
          },
        })
        .then((response) => {
          console.log(response.data.result);
          store.filterRestaurants = response.data.result;
        });
    },

    fetchTypes() {
      axios.get(api.baseUrl + `types`).then((response) => {
        console.log(response.data);
        this.types = response.data;
      });
    },

    handleTypeClick(type) {
      type.active = !type.active;
      this.fetchFilterRestaurant();
    },
  },

  computed: {
    activeTypesId() {
      let activeTypes = this.types.filter((type) => type.active);
      let activeTypesId = activeTypes.map((type) => type.id);
      return activeTypesId;
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
      <div class="row g-2">
        <div class="col-2" v-for="types in types">
          <div class="card h-100" :class="types.active ? 'active' : ''">
            <div class="card-top">
              <div class="card-image">
                <img
                  :src="types.logo"
                  alt=""
                  class="type-image"
                  :class="types.active ? 'active' : ''"
                  @click="handleTypeClick(types)"
                />
              </div>
            </div>
            <div class="card-bottom">{{ types.name }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- lista ristoranti  -->
    <section id="restaurant-list">
      <div class="row row-cols-2 g-2">
        <restaurant-card
          v-for="restaurant in store.restaurants"
          :restaurant="restaurant"
          :key="restaurant.id"
        />
      </div>
      <!-- paginator -->
    </section>
  </div>
</template>

<style lang="scss" scoped>
#type-filter {
  .row {
    flex-wrap: nowrap;
    width: 100%;
    overflow: auto;
    padding-bottom: 0.5rem;
    margin-block: 1.5rem;
  }
  .card {
    height: 100%;
    width: 100%;
    padding: 0.25rem 0.5rem;
    border-radius: 2px;
    text-align: center;
    font-weight: 600;
    text-transform: capitalize;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .card-top {
      aspect-ratio: 1;
      .card-image {
        height: 100%;
        .type-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center center;
          border-radius: 50%;
          filter: grayscale(100%);

          &.active {
            filter: grayscale(0);
          }
        }
      }
    }

    .card-bottom {
      padding-top: 0.5rem;
    }
    &.active {
      border: 2px solid blue;
    }
  }
}
</style>
