<script>
import axios from "axios";
import { store } from "./store";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  data() {
    return {
      store,
      title: "Boolfolio",
    };
  },

  components: {
    AppHeader,
    AppFooter,
  },

  methods: {},
};
</script>

<template>
  <div class="wrapper">
    <app-header></app-header>
    <div class="main">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: rgb(12, 22, 74);
  background: linear-gradient(
    180deg,
    rgba(12, 22, 74, 1) 0%,
    rgba(0, 53, 89, 1) 100%
  );

  .main {
    flex-grow: 1;
  }
}
</style>
