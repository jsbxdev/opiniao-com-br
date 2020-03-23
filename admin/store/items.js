import { firestoreAction } from 'vuexfire'
// import { DateTime } from 'luxon'
// import autoParse from 'auto-parse'
// import Fuse from 'fuse.js'
import { itemsRef, Timestamp } from '~/firebase'

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
  }),
  createItem: (context, categoryId) => {
    if (categoryId) {
      itemsRef.add({
        categoryId,
        created: Timestamp.now(),
        ingredients: false,
        prices: [
          {
            name: '',
            currentValue: 0.0,
            oldValue: 0.0
          }
        ]
      })
    }
  },
  updateItem: (context, item) => {
    if (item.id) {
      itemsRef.doc(item.id).set(item, { merge: true })
    }
  },
  removeItem: (context, item) => {
    if (item.id) {
      itemsRef.doc(item.id).delete()
    }
  }
}
