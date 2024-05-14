<script>
import { api, store } from "../store";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard.vue";
import UiPagination from "../components/ui/UiPagination.vue";

export default {
  data() {
    return {
      store,
      types: [],
      pagination: [],
      filters: [],
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
          if (!response.data.result.link) {
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
      this.filters = [];
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

      if (type.active) {
        // Se il tipo è stato appena attivato, aggiungilo all'array filters
        if (!this.filters.includes(type.id)) {
          this.filters.push(type.id);
        }
      } else {
        // Se il tipo è stato disattivato, rimuovilo dall'array filters
        let index = this.filters.indexOf(type.id);
        if (index !== -1) {
          this.filters.splice(index, 1);
        }
      }

      this.fetchFilterRestaurant();
    },

    getTypeName(typeId) {
      console.log(this.filters);
      for (let type of this.filters) {
        let type = this.types.find((t) => t.id === typeId);
        return type ? type.name : ""; // Restituisce il nome del tipo se trovato, altrimenti una stringa vuota
      }
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
  <section class="jumbo">
    <img src="../../public/take-away-animate.svg" alt="" />

    <div class="catch-phrase">
      <h1>Deliveboo</h1>
      <p>
        "Consegniamo il gusto direttamente alla tua porta: il cibo che desideri,
        quando lo desideri."
      </p>
    </div>
  </section>
  <div class="container">
    <!-- types filter -->
    <section id="type-filter">
      <div class="row g-3">
        <div class="col-3 col-md-2 col-lg-1" v-for="types in types">
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
            <div class="card-bottom type-label">{{ types.name }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- filter section -->

    <div class="filter-section container" v-if="filters.length > 0">
      <div class="row py-3">
        <div class="col type-col">
          <h3>Your filters:</h3>
          <div
            v-for="(selectedType, index) in filters"
            :key="selectedType.id"
            class="filter-item ms-2"
          >
            <p>
              {{ getTypeName(selectedType) }}
              <span v-if="index < filters.length - 1">,&nbsp;</span>
            </p>
          </div>
        </div>
        <div class="col button-col">
          <button class="button" @click="clearFilters()">reset</button>
        </div>
      </div>
    </div>

    <!-- restaurants list  -->
    <section id="restaurant-list">
      <div class="row row-cols-2 row-cols-md-3 g-3 mb-5">
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
  </div>
</template>

<style lang="scss" scoped>
// jumbo section
.jumbo {
  position: relative;
  background-color: white;
  padding-block: 1.5rem;
  border-bottom: 1px solid white;
  img {
    width: 60%;
    object-fit: cover;
  }
  .catch-phrase {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 45%;
    color: white;
    font-size: 1.5rem;
  }
  h1 {
    font-size: clamp(1.5rem, 2rem, 4rem);
    color: black;
  }
  p {
    font-size: clamp(1rem, 1.5rem, 2rem);
    color: black;
    // background-color: white;

    position: relative;
    z-index: 1;
  }
}

// filter section
.filter-section {
  background-color: white;
  min-height: 10px;
  margin-bottom: 30px;
  border-radius: 2px;
  // color: grey;

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
    text-transform: capitalize;
  }
}
.button-col {
  text-align: end;
  .button {
    border-radius: 0;
    padding: 0.5rem 2rem;
    background-color: #0073de;
    color: white;
    text-decoration: none;
    &:hover {
      // border: none;
      background-color: #0073de;
    }
  }
}

// other
#type-filter {
  .row {
    flex-wrap: nowrap;
    width: 100%;
    overflow: auto;
    display: flex;
    align-items: end;
    padding-bottom: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
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
    background-color: #cdcdcd;
    &:hover {
      transform: scale(1.1);
    }
    &.active {
      background-color: #ffffff;
      transform: scale(1.1);
    }
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
