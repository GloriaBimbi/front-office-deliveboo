import { createApp } from "vue";
import App from "./App.vue";
import * as bootstrap from "bootstrap";
// router
import { router } from "./router";

// fontawsome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { FaBasketShopping } from "@fortawesome/free-solid-svg-icons";
// library.add(FaBasketShopping);

// braintree sistema di pagamento
var button = document.querySelector("#submit-button");

braintree.dropin.create(
  {
    authorization: "sandbox_g42y39zw_348pk9cgf3bgyw2b",
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

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
