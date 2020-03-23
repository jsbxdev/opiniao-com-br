import { firestoreAction } from 'vuexfire'
// import { DateTime } from 'luxon'
// import autoParse from 'auto-parse'
// import Fuse from 'fuse.js'
import { categoriesRef } from '~/firebase'

export const state = () => ({
  categories: []
})

export const actions = {
  bindTransactions: firestoreAction((context) => {
    context.bindFirestoreRef('categories', categoriesRef, {
      reset: false
    })
  })
}
