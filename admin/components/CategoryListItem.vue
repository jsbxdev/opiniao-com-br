<template>
  <v-col v-if="category" cols="12">
    <v-row v-if="showEditor">
      <v-col cols="6">
        <v-text-field
          v-model="category.name"
          outlined
          label="Nome"
          hide-details
          @input="updateSlug"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="category.slug"
          outlined
          label="Slug"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="align-center">
        <v-btn block color="primary" @click="save">Salvar</v-btn>
      </v-col>
    </v-row>
    <v-row v-else dense>
      <v-col cols="12" class="d-flex align-center pr-6">
        <v-subheader>
          <span v-if="category.name">{{ category.name }}</span>
          <span v-else>Categoria sem nome</span>
          <span class="mr-1"></span>
          <span v-if="category.slug">({{ category.slug }})</span>
          <span v-else>(sem slug)</span>
        </v-subheader>
        <v-spacer></v-spacer>
        <v-btn icon @click="edit">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <category-item
        v-for="item in items"
        :key="item.id"
        :item-id="item.id"
      ></category-item>
    </v-row>
    <v-row>
      <v-col>
        <v-btn outlined color="primary" block @click="addItem">
          Adicionar Item
        </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { categoriesRef } from '../firebase'
import CategoryItem from '~/components/CategoryItem.vue'
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
      category: false,
      showEditor: false
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
  },
  methods: {
    save() {
      this.showEditor = false
      this.$store.dispatch('categories/update', this.category)
    },
    edit() {
      this.showEditor = true
    },
    updateSlug() {
      this.category.slug = this.category.name
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase()
    },
    addItem() {
      this.$store.dispatch('items/createItem', this.categoryId)
    }
  }
}
</script>

<style></style>
