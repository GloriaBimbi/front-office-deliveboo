<script>
import axios from "axios";
// import { store } from "./store";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  data() {
    return {
      //   store,
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
    <router-view class="main"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #003559;

  .main {
    flex-grow: 1;
  }
}
</style>
