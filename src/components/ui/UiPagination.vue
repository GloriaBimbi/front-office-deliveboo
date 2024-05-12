<script>
export default {
  props: { pagination: Array },
  emit: ["change-page"],
};
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li
        @click="$emit('change-page', link.url)"
        :class="{
          active: link.active,
          disabled: !link.url,
        }"
        v-for="link in pagination"
        class="page-item"
      >
        <a class="page-link" href="#" v-html="link.label"> </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped></style>
