<script></script>

<template>
  <footer class="footer">
    <div class="footer-links">
      <div class="container">
        <a href="#">About Us</a>
        <a href="http://127.0.0.1:8000">Create Your Restaurant</a>
      </div>
    </div>
    <div class="copyright">
      &copy; {{ new Date().getFullYear() }} Team_3_DeliveBoo.
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: rgb(12, 22, 74);

  padding: 20px;
  text-align: center;
  .footer-links {
    margin-bottom: 10px;
    a {
      margin-right: 20px;
      color: white;
    }
  }
}
.copyright {
  font-size: 12px;
  color: #6c757d;
}
</style>
