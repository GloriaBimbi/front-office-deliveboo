<script>
import { api, store } from "../store";

export default {
  data() {
    return {
      store,
    };
  },
};
</script>
<template>
  <nav class="navbar">
    <div class="container">
      <!-- go back to homepage on click -->
      <div @click="$router.replace({ path: '/' })" class="container-logo">
        <img src="../assets/Group-30.png" alt="logo" />
      </div>
      <div class="d-flex gap-3">
        <a href="http://127.0.0.1:8000/login" class="button" type="submit"
          >Log in</a
        >
        <a href="http://127.0.0.1:8000/register" class="button" type="submit"
          >Register</a
        >

        <router-link class="button" :to="{ name: 'yourOrder' }"
          >Your orders</router-link
        >
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  height: 75px;
  z-index: 1000;
  background: rgb(12, 22, 74);
  .container-logo {
    width: 100px;
    padding: 10px;
    img {
      width: 100%;
    }
  }
  .button {
    border-radius: 0;
    padding: 0.5rem 2rem;
    border: 1px solid #0073de;
    color: white;
    text-decoration: none;
    &:hover {
      // border: none;
      background-color: #0073de;
    }
  }
  .basket-container {
    position: relative;
    margin-right: 25px;
    padding-top: 9px;

    .shooping-chart {
      color: #41a080;
      .cart-icon {
        font-size: 25px;
      }
    }
    .conunter {
      color: white;
      position: absolute;
      text-align: center;
      left: 20px;
      bottom: 18px;
      width: 25px;
      height: 20px;
      padding-bottom: 25px;
      border-radius: 50%;
      border: 1px solid white;
    }
  }
}
</style>
