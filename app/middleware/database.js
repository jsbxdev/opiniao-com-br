export default function({ store, route, redirect }) {
  store.dispatch('categories/fetchCategories')
  store.dispatch('items/fetchItems')
}
