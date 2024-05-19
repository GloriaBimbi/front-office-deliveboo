<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
      ordersHistory: JSON.parse(localStorage.getItem("ordersHistory")) || [],
      currentOrders: JSON.parse(localStorage.getItem("currentOrders")) || [],
    };
  },
  methods: {
    clearOrderHistory() {
      this.ordersHistory = [];
      localStorage.setItem("ordersHistory", JSON.stringify([]));
      this.$forceUpdate();
    },

    formatPrice(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(price);
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    moveOrderToHistory(order) {
      this.ordersHistory.push(order);
      localStorage.setItem("ordersHistory", JSON.stringify(this.ordersHistory));
    },
    refreshOrders() {
      this.currentOrders =
        JSON.parse(localStorage.getItem("currentOrders")) || [];
      this.currentOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      this.ordersHistory =
        JSON.parse(localStorage.getItem("ordersHistory")) || [];
      this.ordersHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    handleOrderPlaced(newOrder) {
      this.currentOrders.push(newOrder);
      localStorage.setItem("currentOrders", JSON.stringify(this.currentOrders));
    },
  },

  created() {
    this.refreshOrders();
    console.log(this.ordersHistory);
    console.log();
    setTimeout(() => {
      this.currentOrders.forEach((order) => {
        this.moveOrderToHistory(order);
      });
      this.currentOrders = [];
      localStorage.setItem("currentOrders", JSON.stringify([]));
    }, 10000);
  },
};
</script>

<template>
  <div class="container-fluid">
    <!-- go back to homepage on click -->
    <router-link :to="{ name: 'home' }" class="btn back-button mb-2">
      <i class="fa-solid fa-arrow-rotate-left"></i>
      <span class="back-button-label"> Back to Home</span>
    </router-link>
    <div class="card mb-3">
      <h2>Your Orders</h2>

      <div class="row" v-if="this.currentOrders.length">
        <div
          class="order-details"
          v-for="(order, index) in this.currentOrders"
          :key="index"
        >
          <div>
            <p>Status: {{ order.status }}</p>
            <p>Message: {{ order.message }}</p>
            <ul class="cart-list">
              <li
                class="cart-list-item"
                v-for="(item, itemIndex) in order.items"
                :key="itemIndex"
              >
                <div class="img-dish-wrapper">
                  <img :src="item.image" alt="" />
                </div>
                <div class="primary-info">
                  <h5>{{ item.name }}</h5>
                  <p>price: {{ formatPrice(item.price) }}</p>
                </div>
                <div class="quantity-info">
                  <h4 class="mt-auto">x {{ item.quantity }}</h4>
                </div>
              </li>
            </ul>
            <div class="checkout-wrapper mt-auto">
              <div class="total-price d-flex align-items-center gap-3">
                <h4>Total price:</h4>
                <span> {{ order.totalPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-info">You have no current orders.</p>
      </div>
    </div>

    <div class="card">
      <h2>Your Order History</h2>
      <div v-if="this.ordersHistory.length">
        <div class="row d-flex flex-column-reverse">
          <div
            class="col-12 order-details"
            v-for="(order, index) in ordersHistory"
            :key="index"
          >
            <div>
              <h3>{{ order.items[0].restaurant }}</h3>
              <p>Order Placed - {{ formatDate(order.date) }}</p>
              <ul class="cart-list">
                <li
                  class="cart-list-item"
                  v-for="(item, itemIndex) in order.items"
                  :key="itemIndex"
                >
                  <div class="img-dish-wrapper">
                    <img :src="item.image" alt="" />
                  </div>
                  <div class="primary-info">
                    <h5>{{ item.name }}</h5>
                    <p>price: {{ formatPrice(item.price) }}</p>
                  </div>
                  <div class="quantity-info">
                    <h4 class="mt-auto">x {{ item.quantity }}</h4>
                  </div>
                </li>
              </ul>
              <div class="checkout-wrapper mt-auto">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="total-price d-flex align-items-center gap-3">
                    <h4>Total price:</h4>
                    <span class="price">{{ order.totalPrice }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          class="btn btn-link text-danger text-end"
          @click="clearOrderHistory"
        >
          Clear Order History
        </button>
      </div>

      <div v-else>
        <p class="text-info">No previous orders.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  color: black;
}
.container-fluid {
  position: relative;
  padding-block: 5rem;
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  position: absolute;
  left: 0px;
  top: 10px;
  width: 60px;
  aspect-ratio: 1 / 1;
  background-color: rgba(255, 255, 255, 0.807);
  font-weight: bold;
  border-radius: 0px;
  z-index: 1;
  opacity: 0.5;
  a {
    cursor: pointer;
    text-decoration: none;
  }
  .back-button-label {
    display: none;
  }
  i {
    display: block;
  }

  &:hover {
    opacity: 1;
    width: 180px;
    aspect-ratio: 3 / 1;
    z-index: 2;
    transition: opacity linear 0.3s;
    .back-button-label {
      display: block;
    }
  }
}

.card {
  background-color: white;
  padding: 1rem;
  border-radius: 2px;
}
.order-details {
  border-bottom: 2px solid #0073de;
  padding-block: 1rem;
  &:first-of-type {
    border-bottom: none;
  }
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
          // color: white;
          font-weight: medium;
        }
      }
    }
  }
  .checkout-wrapper {
    padding: 0.5rem;
    .total-price {
      line-height: 1rem;
      h4 {
        margin-bottom: 0;
      }
      .price {
        height: 1rem;
        vertical-align: top;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
