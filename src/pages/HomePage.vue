<script>
import { api, store } from "../store";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard.vue";
import UiPagination from "../components/ui/UiPagination.vue";

export default {
  data() {
    return {
      store,
      restaurants: [],
      types: [],
      pagination: [],
    };
  },

  components: {
    RestaurantCard,
    UiPagination,
  },

  methods: {
    fetchRestaurant(endpoint = api.baseUrl + `restaurants`) {
      axios.get(endpoint).then((response) => {
        store.restaurants = response.data.data;
        this.pagination = response.data.links;
        console.log(response.data.links);
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
          console.log(response.data.result.data);
          console.log(response.data.result.links);
          if (response.data.result.link) {
            store.restaurants = response.data.result.data;
            this.pagination = response.data.result.links;
          } else {
            this.fetchRestaurant();
          }
        });
    },

    clearFilters() {
      let types = this.activeTypes;
      this.types.forEach((type) => (type.active = false));
      this.fetchRestaurant();
    },

    fetchTypes() {
      axios.get(api.baseUrl + `types`).then((response) => {
        // console.log(response.data);
        this.types = response.data;
        store.types = this.types;
      });
    },

    handleTypeClick(type) {
      type.active = !type.active;
      this.fetchFilterRestaurant();
    },
  },

  computed: {
    activeTypes() {
      let activeTypes = this.types.filter((type) => type.active);
      return activeTypes;
    },

    activeTypesId() {
      let activeTypes = this.activeTypes;
      // let activeTypes = this.types.filter((type) => type.active);
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
      <h1></h1>
    </section>

    <!-- types filter -->
    <section id="type-filter">
      <div class="row g-2">
        <div class="col-1" v-for="types in types">
          <div class="card bg-card h-100" :class="types.active ? 'active' : ''">
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
            <div class="card-bottom type-label">{{ types.name }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- filter section -->

    <div class="filter-section container">
      <div class="row">
        <div class="col-6 type-col">
          <h3>Your filters:</h3>
          <div
            v-for="(selectedType, index) in activeTypes"
            :key="selectedType.id"
            class="filter-item"
          >
            <p>
              {{ selectedType.name
              }}<span v-if="index < activeTypes.length - 1">,&nbsp;</span>
            </p>
          </div>
        </div>
        <div class="col-1">
          <button class="reset-button" @click="clearFilters()">reset</button>
        </div>
      </div>
    </div>

    <!-- restaurants list  -->
    <section id="restaurant-list">
      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 mb-5">
        <restaurant-card
          v-for="restaurant in store.restaurants"
          :restaurant="restaurant"
          :key="restaurant.id"
        />
      </div>
      <!-- paginator -->
      <div class="mt-3" v-if="pagination.length > 3">
        <ui-pagination @change-page="fetchRestaurant" :pagination="pagination">
          ></ui-pagination
        >
      </div>
    </section>

    <!-- braintree payment system  -->
    <div id="dropin-container"></div>
    <button id="submit-button" class="button button--small button--green">
      Purchase
    </button>
  </div>
</template>

<style lang="scss" scoped>
// filter section
.filter-section {
  background-color: rgba(6, 82, 149, 0.345);
  min-height: 10px;
  margin-bottom: 30px;
  border-radius: 1rem;
  color: grey;

  .row {
    justify-content: space-between;
    align-items: center;
  }
  .type-col {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 2;
  }

  h3 {
    line-height: none;
  }
  p {
    margin: 0;
  }
}
.reset-button {
  padding: 5px 10px;
  border-radius: 10px;
  border: 0px;
  background-color: rgb(7, 24, 126);
  color: white;
  &:hover {
    background-color: rgb(41, 70, 232);
    color: rgb(137, 167, 255);
  }
}
// braintree payment system
.button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}
// other
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
    -webkit-box-shadow: 1px 12px 17px -5px rgba(0, 0, 0, 0.34);
    box-shadow: 1px 5px 10px -5px rgba(0, 0, 0, 0.34);
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
      padding-top: 0.2rem;
    }
    &.active {
      border: 2px solid rgba(255, 255, 255, 0.564);
    }
    .type-label {
      font-size: 0.5rem;
      font-weight: 700;
    }
  }
  .bg-card {
    background-color: rgba(0, 153, 255, 0.1);
    color: #ffffff;
  }
}
</style>
