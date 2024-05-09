import { createApp } from "vue";
import App from "./App.vue";
import * as bootstrap from "bootstrap";
// router
import { router } from "./router";

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import { faYouTube, faFacebook } from 'fortawesome/free-brands-svg-icons';
// library.add(faYouTube, faFacebook);
//nel caso in cui si voglia scaricare la stessa icona ma piena (fa-solid) e vuota (fa-regular), dovrò rinominarla perchè altrimenti darà errore, quindi ad esempio scrivo:
// import { faStar as faStarSolid } from "fortawesome/free-solid-svg-icons";

// esempio
// <font-awesome-icon icon="fa-solid fa-house" />

import { router } from "./router";

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
