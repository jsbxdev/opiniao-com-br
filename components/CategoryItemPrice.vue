<template>
  <v-list-item-subtitle v-if="price" class="grey--text text--darken-4">
    <span v-if="price.type">{{ price.type }}: </span>
    <span v-if="price.currentValue" :class="{ 'green--text': price.oldValue }"
      >{{ price.currentValue | price }}
    </span>
    <span v-if="price.oldValue" class="old-price grey--text">{{
      price.oldValue | price
    }}</span>
  </v-list-item-subtitle>
</template>

<script>
import numeral from 'numeral'
import 'numeral/locales/pt-br'
numeral.locale('pt-br')
export default {
  filters: {
    price: (value) => {
      return numeral(parseFloat(value)).format('$ 0,0.00')
    }
  },
  props: {
    price: {
      required: true,
      type: Object
    }
  }
}
</script>

<style>
.old-price {
  text-decoration: line-through;
  font-size: 0.875em;
}
</style>
