<script></script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="container-logo">
        <a href="http://localhost:5173/">
          <img src="../assets/Group-27.png" alt="logo" />
        </a>
      </div>
      <div class="d-flex gap-3">
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
}
</style>
