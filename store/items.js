import { firestoreAction } from 'vuexfire'
// import Fuse from 'fuse.js'
import { itemsRef } from '~/firebase'

export const state = () => ({
  items: []
})

export const getters = {
  getItemsFromCategory: (state) => (categoryId) =>
    state.items.filter((item) => item.categoryId === categoryId)
}

export const actions = {
  bindItems: firestoreAction((context) => {
    context.bindFirestoreRef('items', itemsRef.orderBy('created'), {
      reset: false
    })
  })
}
