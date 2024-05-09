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
    AppFooter
  },

  methods: {},
};
</script>

<template>
  <app-header></app-header>
  <router-view></router-view>
  <app-footer></app-footer>
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>
