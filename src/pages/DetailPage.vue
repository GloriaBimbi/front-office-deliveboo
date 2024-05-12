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
    <a
      class="open-cart-btn"
      data-bs-toggle="offcanvas"
      href="#offcanvasExample"
      role="button"
      aria-controls="offcanvasExample"
    >
      <i class="fa-solid fa-shopping-cart"></i>
    </a>
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
              <h2><i class="cart-icon" :class="['fas', 'fa-plus']"></i></h2>
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

  <div
    class="offcanvas offcanvas-end w-50"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Shopping cart</h5>
      <!-- <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button> -->
    </div>
    <div class="offcanvas-body d-flex flex-column">
      <ul class="cart-list">
        <li class="cart-list-item">
          <div class="img-dish-wrapper">
            <img src="https://picsum.photos/200/300" alt="" />
          </div>
          <div class="primary-info">
            <h5>Dish name</h5>
            <p>price:</p>
          </div>
          <div class="quantity-info">
            <p>x</p>
            <div class="quantity-wrapper">
              <div class="quantity-btn minus">-</div>
              <div class="quantity-btn plus">+</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="checkout-wrapper mt-auto">
        <div class="total-price">
          <span>Total price: $ 0</span>
          <div class="btn-wrapper d-flex">
            <div class="checkout-btn">Check-out</div>
            <div class="close-btn" data-bs-dismiss="offcanvas">Close</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  .open-cart-btn {
    position: fixed;
    top: 100px;
    right: 1rem;

    background-color: white;
    aspect-ratio: 1 / 1;
    height: 35px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
    &:hover {
      scale: 1.5;
      transition: 0.25s;
    }
  }
}

.cart-list {
  padding: 0;
  list-style-type: none;
  .cart-list-item {
    display: flex;
    gap: 0.5rem;
    border-block: 1px solid rgba(0, 0, 0);
    padding: 0.5rem;

    .img-dish-wrapper {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .primary-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-block: 0.5rem;
      p {
        margin-bottom: 0;
      }
    }

    .quantity-info {
      display: flex;
      margin-left: auto;
      flex-direction: column;
      justify-content: space-between;
      // padding-block: 0.5rem;
      p {
        text-align: end;
        font-size: 1.5rem;
      }
      .quantity-wrapper {
        display: flex;
        gap: 0.5rem;
        margin-left: auto;
        .quantity-btn {
          height: 30px;
          line-height: 30px;
          vertical-align: top;
          font-size: 1.5rem;
          font-weight: bold;
          aspect-ratio: 1 / 1;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          color: white;
          &.minus {
            background-color: #d9d9d9;
          }
          &.plus {
            background-color: #0073de;
          }
        }
      }
    }
  }
}
.checkout-wrapper {
  border-top: 1px solid rgba(0, 0, 0);
  padding: 0.5rem;
  .btn-wrapper {
    padding-top: 1rem;
    display: flex;
    gap: 0.75rem;
    justify-content: space-between;
    align-items: center;
    .checkout-btn,
    .close-btn {
      padding: 0.5rem;
      background-color: #0073de;
      width: 100%;
      text-align: center;
      color: white;
      cursor: pointer;
    }
    .close-btn {
      background-color: white;
      color: red;
      text-decoration: underline;
      box-shadow: 0px 5px 8px 2px rgba(0, 0, 0, 0.2);
      &:hover {
        background-color: rgb(251, 251, 251);
      }
    }
    .checkout-btn:hover {
      background-color: #0060ba;
    }
  }
}

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
      font-size: 1.67rem;
    }
    .add-to-cart {
      width: 75px;
      margin-top: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      aspect-ratio: 1;
      padding-left: 1px;
      padding-top: 4px;
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
