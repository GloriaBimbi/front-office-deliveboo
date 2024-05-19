<script>
import { api, store } from "../store";
import axios from "axios";
import AppModal from "../components/AppModal.vue";
import AppLoader from "../components/AppLoader.vue";

export default {
  data() {
    return {
      store,
      restaurant: [],
      error: "",
      showErrorModal: { visible: false, id: "" },
      // cartRestaurant: "",
      cartRestaurantSlug: "",
      newRestaurant: "",
      isLoading: false,
    };
  },

  components: {
    AppModal,
    AppLoader,
  },

  created() {
    const storedCart = localStorage.getItem("cart");
    store.checkoutCart = storedCart ? JSON.parse(storedCart) : [];
    store.counter = 0;
    for (let i = 0; i < store.checkoutCart.length; i++) {
      let currentItem = store.checkoutCart[i];
      store.counter += currentItem.quantity;
    }
    // store.cart = store.checkoutCart;

    const restaurantSlug = this.$route.params.slug;
    this.isLoading = true;
    axios
      .get(api.baseUrl + `restaurants/${restaurantSlug}`)
      .then((response) => {
        this.restaurant = response.data;
        store.dishes = this.restaurant.dishes;
        this.scrollToTop();
      })
      .finally(() => {
        this.isLoading = false;
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
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
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
        store.modal.id = selectedDish.id;
        store.modal.name = selectedDish.name;
        store.modal.image = selectedDish.image;
        store.modal.description = selectedDish.description;
        store.modal.price = selectedDish.price;
        store.modal.ingredients_list = selectedDish.ingredients_list;
        //faccio in modo che cliccando su una card si apra la modale
        store.modal.show = true;
      }
    },

    // method to close dish modal
    closeModal() {
      this.showErrorModal.visible = false;
      this.showErrorModal.id = null;
    },

    // CART
    // method to transform the title of the restaurant whose dishes are in the cart into a slug
    stringToSlug(str) {
      if (!str) {
        return ""; // O un valore predefinito in base alle tue esigenze
      }
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

    // method to add item to cart
    addToCart(dishId) {
      const dishToAdd = this.restaurant.dishes.find(
        (dish) => dish.id === dishId
      );

      if (!dishToAdd) {
        return;
      }
      store.cartRestaurant =
        store.cart.length > 0 ? store.cart[0].restaurant : null;

      if (
        !store.cartRestaurant ||
        store.cartRestaurant === this.restaurant.name
      ) {
        const existingCartItem = store.cart.find(
          (item) => item.id === dishToAdd.id
        );

        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          store.cart.push({
            ...dishToAdd,
            quantity: 1,
            restaurant: this.restaurant.name,
          });
        }
        store.counter++;
        this.saveCart();
      } else {
        this.showErrorModal.visible = true;
        this.showErrorModal.id = dishId;
      }

      this.cartRestaurantSlug = this.stringToSlug(store.cartRestaurant);
    },
    // replaceCart() {
    //   store.restaurants.forEach((restaurant) => {
    //     if (restaurant.name == this.newRestaurant) {
    //       const replacedRestaurant = restaurant;
    //       console.log(replacedRestaurant);
    //       return;
    //       const dishId = dish.id;
    //       console.log(dishId);

    //       // clear cart
    //       this.clearCart();
    //       console.log(store.cart);

    //       store.cartRestaurant =
    //         store.cart.length > 0 ? store.cart[0].restaurant : null;

    //       const existingCartItem = store.cart.find(
    //         (item) => item.id === dishToAdd.id
    //       );

    //       if (existingCartItem) {
    //         existingCartItem.quantity++;
    //       } else {
    //         store.cart.push({
    //           ...dishToAdd,
    //           quantity: 1,
    //           restaurant: this.restaurant.name,
    //         });
    //       }
    //       store.counter++;
    //       this.saveCart();
    //       this.closeModal();
    //     }
    //   });
    //   this.restaurant.dishes.forEach((dish) => {
    //     // console.log(this.newRestaurant);
    //     // console.log(dish.name);
    //   });
    // },
    // method to clear the cart
    clearCart() {
      // clear the cart
      store.cart = [];
      this.saveCart();

      // close modal
      store.counter = 0;
      this.showErrorModal = false;
    },

    // method to remove the selected dish from the cart
    isDishInCart(dishId) {
      return store.cart.some((item) => item.id === dishId);
    },

    // Metodo per rimuovere un piatto dal carrello
    removeToCart(dishId) {
      const index = store.cart.findIndex((item) => item.id === dishId);
      if (index !== -1) {
        if (store.cart[index].quantity > 1) {
          store.cart[index].quantity--;
        } else {
          store.cart.splice(index, 1);
        }
        // Diminuiamo il contatore solo se un piatto è effettivamente rimosso dal carrello
        store.counter--;
        this.saveCart();
      }
    },
    // method to calculate the total price of the selected dishes in the cart
    calculateTotalPrice() {
      let totalPrice = 0;
      for (const item of store.cart) {
        totalPrice += item.price * item.quantity;
      }
      return this.formatPrice(totalPrice);
    },

    // method to save the cart in local storage
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(store.cart));
    },
    // method to convert price
    formatPrice(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(price);
    },

    resetCartAdd(dishId) {
      this.clearCart();
      this.addToCart(dishId.id);
    },
  },
};
</script>

<template>
  <section class="loader-container">
    <!-- go back to homepage on click -->
    <a @click="$router.go(-1)" class="btn back-button mb-2">
      <i class="fa-solid fa-arrow-rotate-left"></i>
      <span class="back-button-label"> Back to Home</span>
    </a>
    <div class="container my-5">
      <!-- open cart offcanvas  -->
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

      <div class="row mb-5 g-3">
        <div class="col-md-6 img-container text-center">
          <img class="img-fluid" :src="restaurant.image" alt="" />
        </div>
        <div class="col-md-6 text-white">
          <h1>{{ restaurant.name }}</h1>
          <p class="text-light">{{ restaurant.description }}</p>
          <p class="text-light fs-8">{{ restaurant.address }}</p>
        </div>
      </div>
    </div>
    <div v-if="!isLoading" class="container-fluid bg-white px-md-5 pt-md-3">
      <div v-if="!store.error" class="wrapper-menu">
        <h2 class="h1">Menù</h2>
        <ul class="mx-0 px-0">
          <li class="d-flex gap-2" v-for="dish in restaurant.dishes">
            <div class="d-md-flex gap-3">
              <div @click="handleModalOpening(dish)" class="img-wrapper">
                <img :src="dish.image" alt="" />
              </div>
              <!-- <div class="col-6 col-md-9 d-flex"> -->
              <div
                class="dish-detail d-flex flex-column"
                @click="handleModalOpening(dish)"
              >
                <h3>{{ dish.name }}</h3>
                <p>{{ dish.description }}</p>
              </div>
            </div>
            <div class="dish-purchase ms-auto d-flex flex-column">
              <h3 class="dish-price">{{ formatPrice(dish.price) }}</h3>
              <div class="control-wrapper d-flex gap-2 mt-auto">
                <div
                  class="remove-to-cart"
                  @click="removeToCart(dish.id)"
                  v-if="store.counter > 0 && isDishInCart(dish.id)"
                >
                  <h2>
                    <i class="cart-icon" :class="['fas', 'fa-minus']"></i>
                  </h2>
                </div>
                <div class="add-to-cart" @click="addToCart(dish.id)">
                  <h2><i class="cart-icon" :class="['fas', 'fa-plus']"></i></h2>
                  <!-- </div> -->
                </div>
              </div>
            </div>
            <!-- modale per errore ordine -->

            <!-- modal for error in order -->
            <div
              :class="{ show: showErrorModal.visible }"
              v-if="showErrorModal && dish.id == showErrorModal.id"
              class="modal modal-cart"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Error</h5>
                  </div>
                  <div class="modal-body">
                    <p>
                      The cart contains items from a different restaurant. Do
                      you want to clear the cart and continue with the new
                      order?
                    </p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="closeModal()"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-info">
                      <span @click="goToRestaurant()"
                        >Go back to "{{ store.cartRestaurant }}" page</span
                      >
                    </button>
                    <button
                      type="button"
                      class="btn btn-warning"
                      @click="resetCartAdd(dish)"
                    >
                      Clear Cart
                    </button>
                  </div>
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

    <!-- Offcanvas -->
    <div
      class="offcanvas offcanvas-end"
      data-bs-backdrop="true"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header d-flex align-items-center">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">
          Shopping cart
        </h5>
        <button
          v-if="store.cart.length >= 1"
          type="button"
          class="button-reset-cart"
          @click="clearCart()"
        >
          Reset Order
        </button>
      </div>
      <div class="offcanvas-body d-flex flex-column">
        <ul class="cart-list">
          <li
            class="cart-list-item"
            v-for="(dish, index) in store.cart"
            :key="index"
          >
            <div class="img-dish-wrapper">
              <img :src="dish.image" alt="" />
            </div>
            <div class="primary-info">
              <h5>
                {{ dish.name }}
              </h5>
              <p>price: {{ formatPrice(dish.price) }}</p>
            </div>
            <div class="quantity-info">
              <p>x{{ dish.quantity }}</p>
              <div class="quantity-wrapper">
                <div class="quantity-btn minus" @click="removeToCart(dish.id)">
                  <i class="cart-icon" :class="['fas', 'fa-minus']"></i>
                </div>
                <div class="quantity-btn plus" @click="addToCart(dish.id)">
                  <i class="cart-icon" :class="['fas', 'fa-plus']"></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="col-2"></div>
        <div class="checkout-wrapper mt-auto">
          <div class="total-price">
            <span>Total price: {{ calculateTotalPrice() }}</span>
            <div class="btn-wrapper d-flex">
              <a href="\checkout" class="checkout-btn"> Check-out </a>
              <div class="close-btn" data-bs-dismiss="offcanvas">Close</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-loader :loading="isLoading"></app-loader>
    <app-modal :restaurant="restaurant" v-if="store.modal.show" />
  </section>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  .open-cart-btn {
    box-shadow: 0px 5px 8px 2px rgba(0, 0, 0, 0.2);

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

.button-reset-cart {
  border-radius: 0;
  padding: 0.5rem 2rem;
  text-decoration: none;
  border: 1px solid #de0000;
  background-color: white;
  color: #de0000;
  width: max-content;
  &:hover {
    // border: none;
    color: white;
    background-color: #de0000;
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

.img-container {
  img {
    width: 100%;
  }
}

.container-fluid {
  border-block: 5px solid #0099ff;
  -webkit-box-shadow: 0px -5px 50px 14px rgba(0, 0, 0, 0.5);
  box-shadow: 0px -5px 50px 14px rgba(0, 0, 0, 0.5);
}
.wrapper-menu {
  .h1 {
    color: #0099ff;
  }
  ul {
    li {
      padding-block: 1rem;
      border-bottom: 1px solid #0099ff;
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
  .img-wrapper {
    height: 200px;
    img {
      height: 100%;
      object-fit: cover;
      object-position: center;
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
      height: 75px;
      margin-top: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      aspect-ratio: 1;
      padding-left: 1px;
      padding-top: 4px;
      background-color: #0099ff;
      color: white;
      border-radius: 50%;
      box-shadow: 0px 5px 8px 2px rgba(0, 0, 0, 0.2);
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

// loader
.loader-container {
  position: relative;
  min-height: 200px;
}

// Media Queries

// restaurant detail

@media screen and (min-width: 768px) {
  .offcanvas {
    width: 50%;
  }
}

@media screen and (max-width: 768px) {
  .wrapper-menu .dish-purchase .add-to-cart[data-v-0dd41eea],
  .wrapper-menu .dish-purchase .remove-to-cart[data-v-0dd41eea] {
    width: 50px;
    height: 50px;
    font-size: 0.8em;
  }

  .wrapper-menu .dish-purchase .dish-price[data-v-0dd41eea] {
    font-size: 16px;
  }

  .wrapper-menu .dish-detail p[data-v-0dd41eea] {
    font-size: 16px;
  }

  .control-wrapper {
    flex-direction: column;
  }

  .offcanvas {
    width: 100%;
  }
}
</style>
