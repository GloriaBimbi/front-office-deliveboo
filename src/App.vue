<script>
import axios from "axios";
// import { store } from "./store";
import AppHeader from "./components/AppHeader.vue";

export default {
  data() {
    return {
      //   store,
      title: "Boolfolio",
    };
  },

  components: {
    AppHeader,
  },

  methods: {},
};
</script>

<template>
  <app-header></app-header>
  <router-view></router-view>
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>
