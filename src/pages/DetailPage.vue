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
  methods: {
    basketIncrementCounter() {
      store.counter++;
    },
  },
};
</script>

<template>
  <div class="container my-5">
    <!-- <a class="btn btn-primary" href="{{ api.baseUrl }}">Go Back</a> -->
    <a @click="$router.go(-1)" class="btn back-button mb-2"
      ><i class="fa-solid fa-arrow-rotate-left"></i> Back to Home</a
    >
    <div class="row mb-5">
      <div class="col-6 img-container text-center">
        <img class="img-fluid" :src="restaurant.image" alt="" />
      </div>
      <div class="col-6 text-white">
        <h1>{{ restaurant.name }}</h1>
        <p class="text-light">{{ restaurant.description }}</p>
        <p class="text-light fs-8">{{ restaurant.address }}</p>
      </div>
    </div>
    <div class="wrapper-menu">
      <h2 class="text-white">Menù</h2>
      <ul class="mx-0 px-0">
        <li class="d-flex gap-2 text-white" v-for="dish in restaurant.dishes">
          <div class="img-wrapper">
            <img :src="dish.image" alt="" />
          </div>
          <div class="dish-detail d-flex flex-column">
            <h3>{{ dish.name }}</h3>
            <p>{{ dish.description }}</p>
          </div>
          <div class="dish-purchase ms-auto d-flex flex-column">
            <h3 class="dish-price">$ {{ dish.price }}</h3>
            <div class="add-to-cart" @click="basketIncrementCounter()">
              <h2>+</h2>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="row g-2">
      <div class="col-3" v-for="dish in restaurant.dishes">
        <div class="card bg-card h-100">
          <img :src="dish.image" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ dish.name }}</h5>
            <p class="card-text">
              {{ dish.description }}
            </p>
            <a href="#" class="btn btn-primary">Details</a>
            <a
              href="#"
              class="btn btn-success mx-3"
              @click="basketIncrementCounter()"
              >+ Order</a
            >
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.bg-card {
  background-color: rgba(0, 153, 255, 0.1);
  color: #ffffff;
}

.card {
  cursor: pointer;
}

.img-container {
  img {
    width: 100%;
  }
}

.wrapper-menu {
  ul {
    li {
      padding-block: 1rem;
      border-block: 1px solid #0099ff;
    }
  }
  .img-wrapper {
    height: 200px;
    img {
      height: 100%;
    }
  }
  .dish-detail {
    text-transform: capitalize;
    padding-block: 0.5rem;
    p {
      margin-top: auto;
      margin-bottom: 0;
    }
  }

  .dish-purchase {
    min-width: 100px;
    align-items: end;

    .dish-price {
      padding-top: 0.5rem;
    }
    .add-to-cart {
      width: 75px;
      margin-top: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      aspect-ratio: 1;
      background-color: #0099ff;
      border-radius: 50%;
      &:hover {
        background-color: #23a7ff;
      }
    }
  }
}

.back-button {
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.807);
  font-weight: 600;
  border-radius: 3px;

  opacity: 0.5;
  a {
    cursor: pointer;
    text-decoration: none;
  }

  &:hover {
    opacity: 1;
    transition: opacity linear 0.1s;
  }
}
</style>
