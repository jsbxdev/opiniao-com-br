<template>
  <v-list v-if="categoryId" three-line subheader>
    <v-subheader class="category-name grey--text text--darken-4 pl-6 mb-2">
      {{ category.name }}
    </v-subheader>
    <category-item
      v-for="(item, index) in items"
      :key="item.id"
      :item="item"
      :class="{
        'first-item': index === 0,
        'last-item': index === items.length - 1
      }"
    ></category-item>
  </v-list>
</template>

<script>
import { categoriesRef } from '../firebase'
import CategoryItem from './CategoryItem.vue'
export default {
  components: {
    CategoryItem
  },
  props: {
    categoryId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      category: {}
    }
  },
  computed: {
    items() {
      return this.$store.getters['items/getItemsFromCategory'](this.categoryId)
    }
  },
  watch: {
    categoryId: {
      immediate: true,
      handler(id) {
        if (id) {
          this.$bind('category', categoriesRef.doc(id))
        }
      }
    }
  }
}
</script>

<style>
.category-name {
  font-size: 1.125rem !important;
  font-weight: 700 !important;
}
</style>
