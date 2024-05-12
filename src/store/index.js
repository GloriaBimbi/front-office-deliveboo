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
    show: false,
    name: "",
    image: "",
    description: "",
    price: null,
    ingredients_list: "",
  },
  selectedDishIndex: null,
});
