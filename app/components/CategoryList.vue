<template>
  <v-container class="pa-0">
    <category-list-item
      v-for="(category, index) in categories"
      :key="category.id"
      :category-id="category.id"
      :class="{
        'first-category': index === 0,
        'last-category': index === categories.length - 1
      }"
    ></category-list-item>
  </v-container>
</template>

<script>
import CategoryListItem from './CategoryListItem.vue'
export default {
  components: {
    CategoryListItem
  },
  computed: {
    categories() {
      return this.$store.getters['categories/getCategoryList']
    }
  }
}
</script>

<style></style>
