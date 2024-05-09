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
            {{ restaurant.name }}
          </div>
          <p class="card-text">
            {{ restaurant.description }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>
