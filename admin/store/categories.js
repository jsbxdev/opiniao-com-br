import { firestoreAction } from 'vuexfire'
// import { DateTime } from 'luxon'
// import autoParse from 'auto-parse'
// import Fuse from 'fuse.js'
import { categoriesRef, Timestamp } from '~/firebase'

export const state = () => ({
  categories: []
})

export const getters = {
  getCategoryList: (state) => state.categories
}

export const actions = {
  bindCategories: firestoreAction((context) => {
    context.bindFirestoreRef('categories', categoriesRef.orderBy('order'), {
      reset: false
    })
  }),
  create() {
    categoriesRef.add({
      created: Timestamp.now(),
      order: 0
    })
  },
  update: (context, category = {}) =>
    categoriesRef.doc(category.id).set(category, { merge: true })
}
