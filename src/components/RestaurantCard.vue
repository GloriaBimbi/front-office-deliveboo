<script>
export default {
  props: { restaurant: Object },
};
</script>

<template>
  <div class="col">
    <router-link
      :to="{ name: 'restaurant.show', params: { slug: restaurant.slug } }"
    >
      <div class="card h-100">
        <div class="card-top">
          <img :src="restaurant.image" class="card-img-top" alt="..." />
          <div class="badge-container">
            <div class="badge bg-primary me-1" v-for="type in restaurant.types">
              {{ type.name }}
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">
            <h2>{{ restaurant.name }}</h2>
            <p class="restaurant-address">{{ restaurant.address }}</p>
          </div>
          <!-- <p class="card-text">
            {{ restaurant.description }}
          </p> -->
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.restaurant-address {
  font-size: 15px;
  color: #000000;
}
.card {
  border: none;
  background: rgb(217, 217, 217);
  background: linear-gradient(
    0deg,
    rgba(217, 217, 217, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  border-radius: 2px;
  color: #0073de;
  filter: brightness(95%);
  &:hover {
    filter: brightness(100%);
  }
  .card-top {
    position: relative;
    .card-img-top {
      border-radius: 1px;
      height: 250px;
      object-fit: cover;
      object-position: center;
    }

    .badge-container {
      position: absolute;
      bottom: 2.5px;
      left: 5px;
      display: flex;
      flex-wrap: wrap-reverse;
      gap: 2.5px;
    }
  }
}
</style>
