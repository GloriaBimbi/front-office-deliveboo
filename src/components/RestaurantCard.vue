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
        <img :src="restaurant.image" class="card-img-top" alt="..." />
        <div class="card-body">
          <div class="card-title">
            <h2>{{ restaurant.name }}</h2>
            <p class="restaurant-address">{{ restaurant.address }}</p>
          </div>
          <p class="card-text">
            {{ restaurant.description }}
          </p>
        </div>
        <div class="card-footer">
          <div class="badge bg-primary me-1" v-for="type in restaurant.types">
            {{ type.name }}
          </div>
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
  color: #808080;
}
</style>
