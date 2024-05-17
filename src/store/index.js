import { reactive } from "vue";
import axios from "axios";

export const api = {
  baseUrl: "http://127.0.0.1:8000/api/",
};

export const store = reactive({
  restaurants: [],
  filterRestaurant: [],
  dishes: [],
  types: [],
  pagination: [],
  counter: 0,
  modal: {
    id: null,
    show: false,
    name: "",
    image: "",
    description: "",
    price: null,
    ingredients_list: "",
  },
  selectedDish: null,
  error: false,
  checkoutCart: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  cartRestaurant: "",
  currentOrders: JSON.parse(localStorage.getItem("currentOrders")) || [],
  ordersHistory: JSON.parse(localStorage.getItem("ordersHistory")) || [],
});
