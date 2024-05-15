import { createApp } from "vue";
import App from "./App.vue";
import * as bootstrap from "bootstrap";
// router
import { router } from "./router";

// // fontawsome
// /* import the fontawesome core */
// import { library } from "@fortawesome/fontawesome-svg-core";

// /* import font awesome icon component */
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// /* import specific icons */
// import { FaBasketShopping } from "@fortawesome/free-solid-svg-icons";

// /* add icons to the library */
// library.add(...FaBasketShopping);
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { FaBasketShopping } from "@fortawesome/free-solid-svg-icons";
// library.add(FaBasketShopping);

const app = createApp(App);
app.use(router);
// app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
