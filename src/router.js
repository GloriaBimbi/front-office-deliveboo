import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import DetailPage from "./pages/DetailPage.vue";
import CheckoutPage from "./pages/CheckoutPage.vue";
import OrderPage from "./pages/OrderPage.vue";
import AboutUsPage from "./pages/AboutUsPage.vue";

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
    {
      path: "/yourOrder",
      name: "yourOrder",
      component: OrderPage,
      props: true,
    },
    {
      path: "/about-us",
      name: "AboutUsPage",
      component: AboutUsPage,
    },
  ],
});

export { router };
