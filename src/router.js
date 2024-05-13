import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import DetailPage from "./pages/DetailPage.vue";
import CheckoutPage from "./pages/CheckoutPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/restaurant/:slug",
      name: "restaurant.show",
      component: DetailPage,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutPage,
    },
  ],
});

export { router };
