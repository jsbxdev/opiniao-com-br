<template>
  <v-list-item v-if="item" class="category-item px-5" link>
    <v-list-item-content class="py-4">
      <v-list-item-title
        v-if="item.name"
        :class="{ 'mb-3': !hasIngredients, 'mb-1': hasIngredients }"
      >
        <span>{{ item.name }}</span>
      </v-list-item-title>
      <v-list-item-subtitle
        v-if="hasIngredients"
        :class="{ 'mb-3': !hasPrices }"
      >
        <span>{{ item.ingredients | concatIngredients }}</span>
      </v-list-item-subtitle>
      <category-item-price
        v-for="(price, index) in item.prices"
        :key="index"
        :price="price"
      ></category-item-price>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import CategoryItemPrice from './CategoryItemPrice.vue'
export default {
  components: {
    CategoryItemPrice
  },
  filters: {
    concatIngredients: (ingredients) =>
      ingredients.reduce((accumulator, current, idx) => {
        return (
          accumulator +
          (idx > 0 ? (idx < ingredients.length - 1 ? ', ' : ' e ') : '') +
          current.name.toLowerCase()
        )
      }, '')
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  computed: {
    hasIngredients() {
      return this.item.ingredients ? this.item.ingredients.length : false
    },
    hasPrices() {
      return this.item.prices ? this.item.prices.length : false
    }
  }
}
</script>

<style>
.category-item .v-list-item__content {
  border-bottom: solid 1px #ddd;
}

.category-item.first-item .v-list-item__content {
  border-top: solid 1px #ddd;
}

.first-category .category-item.first-item .v-list-item__content {
  /* border-top: none; */
}

.last-category .category-item.first-item .v-list-item__content {
  border-bottom: none;
}
</style>
