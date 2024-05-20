<script>
import { store } from "../store/index";
export default {
  data() {
    return {
      store,
      wrongRestaurant: false,
      cartRestaurantSlug: "",
    };
  },

  props: { restaurant: Object },

  methods: {
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
    // method to close the modal
    closeModal() {
      store.modal.show = false;
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
        this.closeModal();
      } else {
        this.wrongRestaurant = true;
        this.showErrorModal = true;
      }

      this.cartRestaurantSlug = this.stringToSlug(store.cartRestaurant);
    },
    // method to save the cart in local storage
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(store.cart));
    },
  },
};
</script>

<template>
  <div>
    <div class="layover">
      <div class="my-modal">
        <div @click="closeModal()" class="close-element">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="img-container">
          <img
            v-if="store.modal.image"
            :src="store.modal.image"
            alt="dish image"
          />
        </div>
        <div class="info-container">
          <ul class="info p-0">
            <li class="name">{{ store.modal.name }}</li>
            <li class="description">"{{ store.modal.description }}"</li>
            <li class="ingredients">
              <span>Ingredients:</span> {{ store.modal.ingredients_list }}
            </li>
            <li class="price">$ {{ store.modal.price }}</li>
            <li v-if="wrongRestaurant == false" class="add-to-cart">
              <div @click="addToCart(store.modal.id)" class="add-button">
                <h5>Add to your order</h5>
              </div>
            </li>
            <li class="error py-1 mt-0">
              <div v-if="wrongRestaurant == true" class="error-message">
                Your order can only include dishes from the same restaurant.
              </div>
              <div v-if="wrongRestaurant == true" class="info-button">
                <span @click="goToRestaurant()"
                  >Go back to "{{ store.cartRestaurant }}" page</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
.layover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: rgb(62, 62, 62);
  @include align("both");
  z-index: 1;

  .my-modal {
    width: 1000px;
    height: 500px;
    background-color: white;
    color: black;
    border-radius: 5px;
    position: relative;
    @include align("both");

    .close-element {
      cursor: pointer;
      font-size: 30px;
      position: absolute;
      top: 0;
      right: 1rem;
      color: rgb(86, 83, 83);
    }

    .img-container {
      width: 100%;
      height: 100%;

      img {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .info-container {
      padding-inline: 1rem;
      .info {
        list-style: none;

        .name {
          font-size: 30px;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 40px;
          color: #0099ff;
        }

        .description {
          font-size: 1.5rem;
          max-height: 180px;
          overflow: auto;
        }

        .ingredients {
          padding-top: 20px;

          span {
            text-decoration: underline;
            font-weight: 500;
          }
        }

        .price {
          font-size: 20px;
          padding-top: 20px;
          font-weight: bold;
        }

        .add-to-cart {
          margin-top: 40px;
          gap: 40px;

          h5 {
            text-align: center;
            font-size: 15px;
            margin: 0;
          }

          .add-button {
            cursor: pointer;
            border-radius: 0;
            padding: 0.5rem 2rem;
            text-decoration: none;
            border: 1px solid #0099ff;
            background-color: white;
            color: #0099ff;
            width: max-content;
            &:hover {
              // border: none;
              color: white;
              background-color: #0099ff;
            }
          }
        }

        .error {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 10px;

          .error-message {
            color: red;
            text-align: center;
          }

          .info-button {
            cursor: pointer;
            border-radius: 0;
            padding: 0.5rem 2rem;
            text-decoration: none;
            border: 1px solid #0099ff;
            background-color: white;
            color: #0099ff;
            width: max-content;
            &:hover {
              // border: none;
              color: white;
              background-color: #0099ff;
            }
          }
        }
      }
    }
  }
}

// tablet media query
@media screen and (max-width: 768px) {
  .my-modal {
    min-height: 830px;
    display: flex;
    flex-direction: column;
    .img-container {
      max-height: 200px;
      padding-left: 20px;
    }
  }
}

// mobile media query
@media screen and (max-width: 576px) {
  .my-modal {
    min-height: 800px;
  }
}
</style>
