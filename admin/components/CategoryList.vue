<template>
  <v-container>
    <v-btn color="success" @click="create">Criar Categoria</v-btn>
    <v-row dense>
      <category-list-item
        v-for="category in categories"
        :key="category.id"
        :category-id="category.id"
      ></category-list-item>
    </v-row>
  </v-container>
</template>

<script>
import CategoryListItem from '~/components/CategoryListItem.vue'
export default {
  components: {
    CategoryListItem
  },
  computed: {
    categories() {
      return this.$store.getters['categories/getCategoryList']
    }
  },
  methods: {
    create() {
      this.$store.dispatch('categories/create')
    }
  }
}
</script>

<style></style>
