<script>
import { store } from "../store";
export default {
  //   props: { restaurant: Object },

  data() {
    return {
      store,
    };
  },

  methods: {
    calculateTotalPrice() {
      let totalPrice = 0;
      for (const item of store.checkoutCart) {
        totalPrice += item.price * item.quantity;
      }
      return totalPrice.toFixed(2);
    },
  },

  created() {
    const storedCart = localStorage.getItem("cart");
    store.checkoutCart = storedCart ? JSON.parse(storedCart) : [];

    var button = document.querySelector("#submit-button");

    braintree.dropin.create(
      {
        authorization: "sandbox_ktg99hd8_bcfn9z8w5qhgr5xq",
        selector: "#dropin-container",
      },
      function (err, instance) {
        button.addEventListener("click", function () {
          instance.requestPaymentMethod(function (err, payload) {
            // Submit payload.nonce to your server
          });
        });
      }
    );
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="row row-cols-2 g-5">
        <div class="col form-col">
          <div class="py-5 my-5">
            <h3>Insert your data</h3>
            <form action="post">
              <div class="general-user-info">
                <div class="input-name">
                  <label for="name" class="form-label mb-0 mt-2"
                    >Firstname</label
                  >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="form-control"
                  />
                </div>
                <div class="input-surname">
                  <label for="surname" class="form-label mb-0 mt-2"
                    >Lastname</label
                  >
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    class="form-control"
                  />
                </div>
                <div class="input-email">
                  <label for="email" class="form-label mb-0 mt-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                  />
                </div>
                <div class="input-phone">
                  <label for="phone" class="form-label mb-0 mt-2">Phone</label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="address-user-info my-3">
                <div class="input-address-street">
                  <label for="address-street" class="form-label mb-0 mt-2"
                    >Address Street</label
                  >
                  <input
                    type="text"
                    name="address-street"
                    id="address-street"
                    class="form-control"
                  />
                </div>
                <div class="row row-cols-4 g-2 mb-3">
                  <div class="col">
                    <div class="input-address-civic">
                      <label for="address-civic" class="form-label mb-0 mt-2"
                        >Civic</label
                      >
                      <input
                        type="text"
                        name="address-civic"
                        id="address-civic"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-address-cap">
                      <label for="address-cap" class="form-label mb-0 mt-2"
                        >Cap</label
                      >
                      <input
                        type="number"
                        name="address-cap"
                        id="address-cap"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-address-city">
                      <label for="address-city" class="form-label mb-0 mt-2"
                        >City</label
                      >
                      <input
                        type="text"
                        name="address-city"
                        id="address-city"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-address-country">
                      <label for="address-country" class="form-label mb-0 mt-2"
                        >Country</label
                      >
                      <input
                        type="text"
                        name="address-country"
                        id="address-country"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <!-- braintree payment system  -->
                <div id="dropin-container"></div>
                <button
                  id="submit-button"
                  class="button button--small button--green"
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
                  <p>price: ${{ dish.price }}</p>
                </div>
                <div class="quantity-info">
                  <h4 class="mt-auto">x {{ dish.quantity }}</h4>
                </div>
              </li>
            </ul>
            <div class="checkout-wrapper mt-auto">
              <div class="total-price d-flex align-items-center gap-3">
                <h4>Total price:</h4>
                <span> $ {{ calculateTotalPrice() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
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
