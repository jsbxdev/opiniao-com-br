<template>
  <v-container class="pa-0">
    <About></About>
    <CategoryList></CategoryList>
  </v-container>
</template>

<script>
import About from '~/components/About.vue'
import CategoryList from '~/components/CategoryList.vue'
export default {
  components: {
    About,
    CategoryList
  }
}
</script>
