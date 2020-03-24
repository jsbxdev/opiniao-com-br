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
      <v-col cols="4">
        <v-text-field
          v-model="category.slug"
          outlined
          label="Slug"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="category.order"
          type="number"
          outlined
          label="Posição"
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
        </v-subheader>
        <v-chip color="primary"> Posição: {{ category.order }} </v-chip>
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
import autoParse from 'auto-parse'
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
      this.category.order = autoParse(this.category.order || 0, Number)
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
