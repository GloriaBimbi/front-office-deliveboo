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
      <div class="container-logo">
        <a href="http://localhost:5173/">
          <img src="../assets/Group-27.png" alt="logo" />
        </a>
      </div>
      <div class="d-flex gap-3">
        <div class="basket-container">
          <div class="shooping-chart">Shopping Chart</div>
          <div class="conunter">{{ store.counter }}</div>
        </div>
        <a
          href="http://127.0.0.1:8000/login"
          class="btn btn-outline-success"
          type="submit"
          >Log in</a
        >
        <a
          href="http://127.0.0.1:8000/register"
          class="btn btn-outline-success"
          type="submit"
          >Register</a
        >
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  background-color: #002238;
  .container-logo {
    width: 100px;
    padding: 10px;
    img {
      width: 100%;
    }
  }
  .basket-container {
    position: relative;
    margin-right: 25px;
    padding-top: 9px;

    .shooping-chart {
      color: #41a080;
    }
    .conunter {
      color: white;
      position: absolute;
      text-align: center;
      left: 108px;
      bottom: 14px;
      width: 25px;
      height: 20px;
      padding-bottom: 25px;
      border-radius: 50%;
      border: 1px solid white;
    }
  }
}
</style>
