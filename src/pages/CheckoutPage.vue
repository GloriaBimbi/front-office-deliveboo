<script>
import { api, store } from "../store";
import axios from "axios";
import { router } from "../router";
export default {
  data() {
    return {
      store,
      dropinInstance: null,
      clientToken: null,
      formData: {
        name: "",
        lastname: "",
        addressStreet: "",
        addressCivic: "",
        addressCap: "",
        addressCity: "",
        addressCountry: "",
        phone: "",
        email: "",
      },
      errors: {},
    };
  },

  methods: {
    calculateTotalPrice() {
      let totalPrice = 0;
      for (const item of store.checkoutCart) {
        totalPrice += item.price * item.quantity;
      }
      return this.formatPrice(totalPrice);
    },

    formatPrice(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(price);
    },

    getClientToken() {
      axios
        .get(api.baseUrl + "generate-client-token")
        .then((response) => {
          this.clientToken = response.data.clientToken;

          const dropinContainer = document.getElementById("dropin-container");
          if (dropinContainer) {
            braintree.dropin.create(
              {
                authorization: this.clientToken,
                container: "#dropin-container",
              },
              (dropinErr, dropinInstance) => {
                if (dropinErr) {
                  console.error(
                    "Errore durante la creazione di Drop-in UI:",
                    dropinErr
                  );
                  return;
                }
                this.dropinInstance = dropinInstance;
              }
            );
          } else {
            console.error("Element with ID 'dropin-container' not found.");
          }
        })
        .catch((error) => {
          console.error("Errore durante il recupero del token client:", error);
        });
    },

    submitPayment(event) {
      event.preventDefault();
      this.clearErrors();

      if (this.validateForm()) {
        if (this.clientToken && this.dropinInstance) {
          this.dropinInstance.requestPaymentMethod(
            (requestPaymentMethodErr, payload) => {
              if (requestPaymentMethodErr) {
                console.error(
                  "Errore durante la richiesta del metodo di pagamento:",
                  requestPaymentMethodErr
                );
                return;
              }

              axios
                .post(api.baseUrl + "process-payment", {
                  paymentMethodNonce: payload.nonce,
                  amount: this.calculateTotalPrice(),
                  formData: this.formData,
                  cart: store.checkoutCart,
                })
                .then((response) => {
                  const newOrder = {
                    id: response.data.orderId,
                    items: store.checkoutCart,
                    totalPrice: this.calculateTotalPrice(),
                    date: new Date().toISOString(),
                    status: "Order Accepted",
                    message: "Your order has been accepted.",
                  };

                  let currentOrders =
                    JSON.parse(localStorage.getItem("currentOrders")) || [];
                  currentOrders.push(newOrder);
                  localStorage.setItem(
                    "currentOrders",
                    JSON.stringify(currentOrders)
                  );

                  store.cart = [];
                  store.checkoutCart = [];
                  localStorage.removeItem("cart");

                  this.$root.$emit("order-placed", newOrder);
                  this.$router.push({ name: "yourOrder" });
                })
                .catch((error) => {
                  console.error("Errore durante il pagamento:", error);
                });
            }
          );
        } else {
          console.error(
            "Token client non disponibile. Impossibile inizializzare il client Braintree."
          );
        }
      }
    },

    validateForm() {
      let isValid = true;
      this.errors = {};

      if (!this.formData.name || this.formData.name.length > 255) {
        this.errors.name =
          "First name is required and must be less than 255 characters.";
        isValid = false;
      }
      if (!this.formData.lastname || this.formData.lastname.length > 255) {
        this.errors.lastname =
          "Last name is required and must be less than 255 characters.";
        isValid = false;
      }
      if (
        !this.formData.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email) ||
        this.formData.email.length > 255
      ) {
        this.errors.email =
          "A valid email is required and must be less than 255 characters.";
        isValid = false;
      }
      if (!this.formData.phone || !/^\d{9,10}$/.test(this.formData.phone)) {
        this.errors.phone =
          "Phone is required and must be a numeric value between 9 and 10 digits.";
        isValid = false;
      }
      if (
        !this.formData.addressStreet ||
        this.formData.addressStreet.length > 255
      ) {
        this.errors.addressStreet =
          "Address street is required and must be less than 255 characters.";
        isValid = false;
      }
      if (
        !this.formData.addressCivic ||
        this.formData.addressCivic.length > 10
      ) {
        this.errors.addressCivic =
          "Civic number is required and must be less than 10 characters.";
        isValid = false;
      }
      if (!this.formData.addressCap || this.formData.addressCap.length !== 5) {
        this.errors.addressCap =
          "Cap is required and must be exactly 5 characters.";
        isValid = false;
      }
      if (
        !this.formData.addressCity ||
        this.formData.addressCity.length > 100
      ) {
        this.errors.addressCity =
          "City is required and must be less than 100 characters.";
        isValid = false;
      }
      if (
        !this.formData.addressCountry ||
        this.formData.addressCountry.length > 100
      ) {
        this.errors.addressCountry =
          "Country is required and must be less than 100 characters.";
        isValid = false;
      }

      return isValid;
    },

    clearErrors() {
      this.errors = {};
    },
  },

  created() {
    const storedCart = localStorage.getItem("cart");
    store.checkoutCart = storedCart ? JSON.parse(storedCart) : [];
    this.getClientToken();
  },
};
</script>

<template>
  <div class="wrapper-checkout">
    <div class="container">
      <div
        class="row row-cols-1 row-cols-md-2 g-5 flex-column-reverse flex-md-row"
      >
        <div class="col form-col">
          <div class="py-5 my-5">
            <h3>Insert your data</h3>
            <form id="payment-form" @submit="submitPayment">
              <div class="general-user-info">
                <div class="input-name">
                  <label for="name" class="form-label mb-0 mt-2"
                    >Firstname</label
                  >
                  <input
                    autocomplete="off"
                    v-model="formData.name"
                    type="text"
                    name="name"
                    id="name"
                    class="form-control"
                    required
                  />
                  <div class="error" v-if="errors.name">{{ errors.name }}</div>
                </div>
                <div class="input-surname">
                  <label for="surname" class="form-label mb-0 mt-2"
                    >Lastname</label
                  >
                  <input
                    autocomplete="off"
                    v-model="formData.lastname"
                    type="text"
                    name="surname"
                    id="surname"
                    class="form-control"
                    required
                  />
                  <div class="error" v-if="errors.lastname">
                    {{ errors.lastname }}
                  </div>
                </div>
                <div class="input-email">
                  <label for="email" class="form-label mb-0 mt-2">Email</label>
                  <input
                    autocomplete="off"
                    v-model="formData.email"
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                    required
                  />
                  <div class="error" v-if="errors.email">
                    {{ errors.email }}
                  </div>
                </div>
                <div class="input-phone">
                  <label for="phone" class="form-label mb-0 mt-2">Phone</label>
                  <input
                    autocomplete="off"
                    v-model="formData.phone"
                    type="text"
                    name="phone"
                    id="phone"
                    class="form-control"
                    required
                  />
                  <div class="error" v-if="errors.phone">
                    {{ errors.phone }}
                  </div>
                </div>
              </div>
              <div class="address-user-info my-3">
                <div class="input-address-street">
                  <label for="address-street" class="form-label mb-0 mt-2"
                    >Address Street</label
                  >
                  <input
                    autocomplete="off"
                    v-model="formData.addressStreet"
                    type="text"
                    name="address-street"
                    id="address-street"
                    class="form-control"
                    required
                  />
                  <div class="error" v-if="errors.addressStreet">
                    {{ errors.addressStreet }}
                  </div>
                </div>
                <div class="row row-cols-1 row-cols-md-2 g-2 mb-3">
                  <div class="col">
                    <div class="input-address-civic">
                      <label for="address-civic" class="form-label mb-0 mt-2"
                        >Civic</label
                      >
                      <input
                        autocomplete="off"
                        v-model="formData.addressCivic"
                        type="text"
                        name="address-civic"
                        id="address-civic"
                        class="form-control"
                        required
                      />
                      <div class="error" v-if="errors.addressCivic">
                        {{ errors.addressCivic }}
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-address-cap">
                      <label for="address-cap" class="form-label mb-0 mt-2"
                        >Cap</label
                      >
                      <input
                        autocomplete="off"
                        v-model="formData.addressCap"
                        type="text"
                        name="address-cap"
                        id="address-cap"
                        class="form-control"
                        required
                      />
                      <div class="error" v-if="errors.addressCap">
                        {{ errors.addressCap }}
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-address-city">
                      <label for="address-city" class="form-label mb-0 mt-2"
                        >City</label
                      >
                      <input
                        autocomplete="off"
                        v-model="formData.addressCity"
                        type="text"
                        name="address-city"
                        id="address-city"
                        class="form-control"
                        required
                      />
                      <div class="error" v-if="errors.addressCity">
                        {{ errors.addressCity }}
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-address-country">
                      <label for="address-country" class="form-label mb-0 mt-2"
                        >Country</label
                      >
                      <input
                        autocomplete="off"
                        v-model="formData.addressCountry"
                        type="text"
                        name="address-country"
                        id="address-country"
                        class="form-control"
                        required
                      />
                      <div class="error" v-if="errors.addressCountry">
                        {{ errors.addressCountry }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- braintree payment system  -->
                <div id="dropin-container" name="dropin-container"></div>
                <button
                  id="submit-button"
                  class="button button--small button--green"
                  type="submit"
                >
                  Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col order-details">
          <div class="py-5 my-5">
            <h3>Order summary</h3>
            <ul class="cart-list">
              <li
                class="cart-list-item"
                v-for="(dish, index) in store.checkoutCart"
                :key="index"
              >
                <div class="img-dish-wrapper">
                  <img :src="dish.image" alt="" />
                </div>
                <div class="primary-info">
                  <h5>{{ dish.name }}</h5>
                  <p>price: {{ formatPrice(dish.price) }}</p>
                </div>
                <div class="quantity-info">
                  <h4 class="mt-auto">x {{ dish.quantity }}</h4>
                </div>
              </li>
            </ul>
            <div class="checkout-wrapper mt-auto">
              <div class="total-price d-flex align-items-center gap-3">
                <h4>Total price:</h4>
                <span>{{ calculateTotalPrice() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-checkout {
  min-height: 100vh;
  width: 100%;
  background-color: white;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #0073de;
    font-weight: bold;
  }
}
.order-details {
  .cart-list {
    max-height: 700px;
    overflow: auto;
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
        h4 {
          color: black;
          font-weight: medium;
        }
      }
    }
  }
  .checkout-wrapper {
    padding: 0.5rem;
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
</style>
