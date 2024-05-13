<script>
import { api, store } from "../store";
import axios from "axios";

export default {
  props: { restaurant: Object },

  data() {
    return {
      store,
      restaurant: [],
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      error: "",
      showErrorModal: false,
      cartRestaurant: "",
      cartRestaurantSlug: "",
    };
  },

  created() {
    const storedCart = localStorage.getItem("cart");
    this.cart = storedCart ? JSON.parse(storedCart) : [];
    // this.cart = store.checkoutCart;

    const restaurantSlug = this.$route.params.slug;
    axios
      .get(api.baseUrl + `restaurants/${restaurantSlug}`)
      .then((response) => {
        this.restaurant = response.data;
        store.dishes = this.restaurant.dishes;
      })
      .catch((error) => {
        store.error = true;
        if (error.response.status === 404) {
          this.error = "Error 404: Page not found.";
        } else {
          this.error = "An error occurred while retrieving the data.";
        }
      });
  },
  methods: {
    // method to increment number on cart icon in header
    basketIncrementCounter() {
      store.counter++;
    },

    // MODAL
    // method to open dish modal
    handleModalOpening(dish) {
      store.selectedDish = dish;
      const selectedDish = store.selectedDish;

      //controllo che l'indice esista e nel caso collego la modale cliccata con le sue chiavi nello store
      if (store.dishes.includes(selectedDish)) {
        store.modal.name = selectedDish.name;
        store.modal.image = selectedDish.image;
        store.modal.description = selectedDish.description;
        store.modal.price = selectedDish.price;
        store.modal.ingredients_list = selectedDish.ingredients_list;
        //faccio in modo che cliccando su una card si apra la modale
        store.modal.show = true;
        console.log(store.modal);
      }
    },

    // method to close dish modal
    closeModal() {
      this.showErrorModal = false;
    },

    // CART
    // method to transform the title of the restaurant whose dishes are in the cart into a slug
    stringToSlug(str) {
      str = str.replace(/^\s+|\s+$/g, ""); // Trim
      str = str.toLowerCase();

      // remove undesiderized characters
      var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to = "aaaaeeeeiiiioooouuuunc------";
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str
        .replace(/[^a-z0-9 -]/g, "") // revove non halfabetic characters
        .replace(/\s+/g, "-") // sonstitute spaces with -
        .replace(/-+/g, "-"); // remove duplicate -
      return str;
    },

    // method to convert the restaurant name into a slug and redirects the page
    goToRestaurant() {
      const url = `/restaurant/${this.cartRestaurantSlug}`;
      window.location.href = url;
    },

    // method to save the cart in local storage if the selected dish is owned by the right restaurant
    addToCart(index) {
      const dishToAdd = this.restaurant.dishes[index];
      this.cartRestaurant =
        this.cart.length > 0 ? this.cart[0].restaurant : null;
      console.log(this.cartRestaurant);

      if (
        !this.cartRestaurant ||
        this.cartRestaurant === this.restaurant.name
      ) {
        const existingCartItem = this.cart.find(
          (item) => item.name === dishToAdd.name
        );
        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          this.cart.push({
            ...dishToAdd,
            quantity: 1,
            restaurant: this.restaurant.name,
          });
        }
        this.saveCart();
      } else {
        this.showErrorModal = true;
        console.log(this.showErrorModal);
      }
      this.cartRestaurantSlug = this.stringToSlug(this.cartRestaurant);
      console.log(this.cartRestaurantSlug);
    },

    // method to clear the cart
    clearCart() {
      this.cart = [];
      this.saveCart();

      // close modal
      this.showErrorModal = false;
    },

    // method to remove the selected dish from the cart
    removeToCart(index) {
      store.counter--;
      if (this.cart[index]) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--;
        } else {
          this.cart.splice(index, 1);
        }
        this.saveCart();
      }
    },

    // method to calculate the total price of the selected dishes in the cart
    calculateTotalPrice() {
      let totalPrice = 0;
      for (const item of this.cart) {
        totalPrice += item.price * item.quantity;
      }
      return totalPrice.toFixed(2);
    },

    // method to save the cart in local storage
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
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
      <div class="counter" v-if="store.counter > 0">
        {{ store.counter }}
      </div>
    </a>
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
    <div v-if="!store.error" class="wrapper-menu">
      <h2 class="text-white">Menù</h2>
      <ul class="mx-0 px-0">
        <li
          class="d-flex gap-2 text-white"
          v-for="(dish, index) in restaurant.dishes"
        >
          <div @click="handleModalOpening(dish)" class="img-wrapper">
            <img :src="dish.image" alt="" />
          </div>
          <div
            class="dish-detail d-flex flex-column"
            @click="handleModalOpening(dish)"
          >
            <h3>{{ dish.name }}</h3>
            <p>{{ dish.description }}</p>
          </div>
          <div class="dish-purchase ms-auto d-flex flex-column">
            <h3 class="dish-price">$ {{ dish.price }}</h3>
            <div class="control-wrapper d-flex gap-2 mt-auto">
              <div
                class="remove-to-cart"
                @click="removeToCart(index)"
                v-if="store.counter > 0"
              >
                <h2><i class="cart-icon" :class="['fas', 'fa-minus']"></i></h2>
              </div>
              <div class="add-to-cart" @click="addToCart(index)">
                <h2><i class="cart-icon" :class="['fas', 'fa-plus']"></i></h2>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="store.error">
      <h2 class="error-text">{{ this.error }}</h2>
    </div>
  </div>

  <div
    class="offcanvas offcanvas-end w-50"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Shopping cart</h5>
    </div>
    <div class="offcanvas-body d-flex flex-column">
      <ul class="cart-list">
        <li class="cart-list-item" v-for="(dish, index) in cart" :key="index">
          <div class="img-dish-wrapper">
            <img :src="dish.image" alt="" />
          </div>
          <div class="primary-info">
            <h5>
              {{ dish.name }}
            </h5>
            <p>price: ${{ dish.price }}</p>
          </div>
          <div class="quantity-info">
            <p>x{{ dish.quantity }}</p>
            <div class="quantity-wrapper">
              <div class="quantity-btn minus" @click="removeToCart(index)">
                -
              </div>
              <div class="quantity-btn plus" @click="addToCart(index)">+</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="checkout-wrapper mt-auto">
        <div class="total-price">
          <span>Total price: $ {{ calculateTotalPrice() }}</span>
          <div class="btn-wrapper d-flex">
            <router-link :to="{ name: 'checkout' }" class="checkout-btn"
              >Check-out</router-link
            >
            <div class="close-btn" data-bs-dismiss="offcanvas">Close</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modale per errore ordine -->

  <div
    class="modal modal-cart"
    :class="{ show: showErrorModal }"
    v-if="showErrorModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Error</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>
            The cart contains items from a different restaurant. Do you want to
            clear the cart and continue with the new order?
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            <span @click="goToRestaurant()">Close</span>
          </button>
          <button type="button" class="btn btn-primary" @click="clearCart()">
            Clear Cart
          </button>
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
    right: 1.5rem;
    font-size: 1.25rem;

    background-color: white;
    aspect-ratio: 1 / 1;
    height: 45px;
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
    .counter {
      background-color: orange;
      color: white;
      position: absolute;
      right: -0.5rem;
      top: -0.5rem;
      aspect-ratio: 1 / 1;
      height: 1.5rem;
      border-radius: 50%;
      border: 1px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .error-text {
    color: red;
    text-align: center;
  }
}

.cart-list {
  padding: 0;
  list-style-type: none;
  overflow: auto;
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
      cursor: pointer;
    }
  }
  .dish-detail {
    text-transform: capitalize;
    padding-block: 0.5rem;
    cursor: pointer;
    p {
      margin-top: auto;
      margin-bottom: 0;
      width: 90%;
    }
  }

  .dish-purchase {
    min-width: 100px;
    align-items: end;

    .dish-price {
      padding-top: 0.5rem;
      font-size: 1.67rem;
    }
    .add-to-cart,
    .remove-to-cart {
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

    .remove-to-cart {
      background-color: white;
      color: red;
      &:hover {
        background-color: rgb(244, 244, 244);
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
.modal-cart {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .show {
    display: block !important;
  }
}
</style>
