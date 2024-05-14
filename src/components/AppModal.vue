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
      console.log(dishToAdd);
      console.log(!dishToAdd);

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
      console.log(this.cartRestaurantSlug);
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
    <div class="layover container">
      <div class="my-modal row">
        <div @click="closeModal()" class="close-element">X</div>
        <div class="img-container col-6">
          <img
            v-if="store.modal.image"
            :src="store.modal.image"
            alt="dish image"
          />
        </div>
        <div class="info-container col-6">
          <ul class="info">
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
            <li class="error">
              <div v-if="wrongRestaurant == true" class="error">
                Your order can only include dishes from the same restaurant.
              </div>
              <button
                v-if="wrongRestaurant == true"
                type="button"
                class="btn btn-info"
              >
                <span @click="goToRestaurant()"
                  >Go back to "{{ store.cartRestaurant }}" page</span
                >
              </button>
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
    padding: 30px;
    width: 65%;
    background-color: #003559;
    color: white;
    padding: 1rem;
    border-radius: 1rem;
    position: relative;
    @include align("both");

    .close-element {
      cursor: pointer;
      font-size: 30px;
      position: absolute;
      top: 10px;
      left: 792px;
      color: rgb(86, 83, 83);
    }

    .img-container {
      width: 30%;
      @include align("both");
      gap: 5px;
      flex-direction: column;
      img {
        max-width: 225px;
      }
    }

    .info-container {
      width: 70%;

      .info {
        list-style: none;

        .name {
          color: white;
          font-size: 30px;
          text-align: center;
          margin-top: 30px;
          margin-bottom: 40px;
        }

        .description {
          color: rgb(110, 94, 152);
          max-height: 180px;
          overflow: scroll;
        }

        .ingredients {
          padding-top: 20px;

          span {
            text-decoration: underline;
          }
        }

        .price {
          font-size: 20px;
          padding-top: 20px;
        }

        .add-to-cart {
          margin-top: 40px;
          @include align("both");
          gap: 40px;

          h5 {
            text-align: center;
            font-size: 15px;
            margin: 0;
          }

          .add-button {
            @include align("both");
            gap: 20px;
            padding: 8px 60px;
            border-radius: 8px;
            cursor: pointer;
          }

          .add-button {
            background-color: white;
            color: black;
            opacity: 80%;

            &:hover {
              opacity: 100%;
            }
          }
        }

        .error {
          color: red;
          text-align: center;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
