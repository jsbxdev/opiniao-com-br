export default function({ store, route, redirect }) {
  store.dispatch('categories/bindCategories')
  store.dispatch('items/bindItems')
}
