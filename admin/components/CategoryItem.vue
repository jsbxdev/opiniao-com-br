<template>
  <v-col v-if="item" cols="12" sm="4">
    <v-card>
      <!-- Item Editor -->
      <v-container v-if="showEditor">
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="item.name"
              outlined
              label="Nome"
              hide-details
              autocomplete="ingredient"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-subheader>Preço</v-subheader>
        <v-row v-for="(price, index) in item.prices" :key="index" dense>
          <v-col>
            <v-text-field
              v-model="price.currentValue"
              outlined
              label="Preço"
              hide-details
              type="number"
              step="0.50"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="price.oldValue"
              outlined
              label="Antigo Preço"
              hide-details
              type="number"
              step="0.50"
            ></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="price.type"
              outlined
              label="Tipo de preço (opcional)"
              hide-details
              autocomplete="off"
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="d-flex align-center">
            <v-btn icon x-small @click="removePrice(index)">
              <v-icon>mdi-minus-circle</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn small @click="addPrice">Adicionar Preço</v-btn>
          </v-col>
        </v-row>
        <v-subheader>Ingredientes</v-subheader>
        <v-row v-if="item.ingredients" dense>
          <v-col
            v-for="(ingredient, index) in item.ingredients"
            :key="index"
            cols="8"
          >
            <v-text-field
              v-model="ingredient.name"
              outlined
              label="Ingrediente"
              hide-details
              single-line
              append-outer-icon="mdi-minus-circle"
              @click:append-outer="removeIngredient(index)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn small @click="addIngredient">Adicionar Ingrediente</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <!-- Item Viewer -->
      <v-container v-else>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>
              <span v-if="item.name">{{ item.name }}</span>
              <span v-else>Item sem nome</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span v-if="item.ingredients">
                {{ item.ingredients | concatIngredients }}
              </span>
              <span v-else>Item sem nome</span>
            </v-list-item-subtitle>
            <div v-if="item.prices">
              <v-list-item-subtitle
                v-for="(price, index) in item.prices"
                :key="index"
              >
                <span v-if="price.type"> {{ price.type }}: </span>
                <span
                  v-if="price.currentValue"
                  :class="{ 'green--text': price.oldValue }"
                >
                  {{ price.currentValue }}
                </span>
                <span v-if="price.oldValue" class="text--disabled dashed">
                  {{ price.oldValue }}
                </span>
              </v-list-item-subtitle>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-container>
      <v-card-actions>
        <v-btn v-if="!showEditor" text color="green" @click="showEditor = true">
          Editar
        </v-btn>
        <v-btn v-if="showEditor" text color="green" @click="save">Salvar</v-btn>
        <v-btn v-if="showEditor" text @click="showEditor = false">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="remove">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { itemsRef } from '../firebase'
export default {
  filters: {
    concatIngredients(ingredients) {
      if (Array.isArray(ingredients)) {
        return ingredients.reduce((accumulator, current, index) => {
          return index < ingredients.length - 1
            ? accumulator + current.name + ', '
            : accumulator + current.name
        }, '')
      } else {
        return ''
      }
    }
  },
  props: {
    itemId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      ingredients: [],
      item: false,
      showEditor: false
    }
  },
  watch: {
    itemId: {
      immediate: true,
      handler(id) {
        this.$bind('item', itemsRef.doc(id))
      }
    }
  },
  methods: {
    save() {
      this.showEditor = false
      this.$store.dispatch('items/updateItem', this.item)
    },
    remove() {
      if (confirm('Deseja excluir o item?')) {
        this.$store.dispatch('items/removeItem', this.item)
      }
    },
    addIngredient(event) {
      if (!this.item.ingredients) {
        this.item.ingredients = []
      }
      this.item.ingredients.push({ name: '' })
    },
    removeIngredient(index) {
      if (this.item.ingredients) {
        this.item.ingredients.splice(index, 1)
      }
    },
    addPrice() {
      if (!this.item.prices) {
        this.item.prices = []
      }
      this.item.prices.push({
        name: '',
        currentValue: 0.0,
        oldValue: 0.0
      })
    },
    removePrice(index) {
      if (this.item.prices) {
        this.item.prices.splice(index, 1)
      }
    }
  }
}
</script>

<style>
.dashed {
  text-decoration: line-through;
}
</style>
