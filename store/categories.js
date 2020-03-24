// Regex: /([^\/]*$)/g extracts id from URL

import { firestoreAction } from 'vuexfire'
// import { DateTime } from 'luxon'
// import autoParse from 'auto-parse'
// import Fuse from 'fuse.js'
import { categoriesRef } from '~/firebase'

export const state = () => ({
  categories: []
})

export const mutations = {
  setCategories: (state, categories) => {
    console.log(categories)
    state.categories = categories
  }
}

export const getters = {
  getCategoryList: (state) => state.categories
}

export const actions = {
  bindCategories: firestoreAction((context) => {
    context.bindFirestoreRef('categories', categoriesRef.orderBy('order'), {
      reset: false
    })
  })
}
