// import Fuse from 'fuse.js'
import FireStoreParser from 'firestore-parser'

const url =
  'https://firestore.googleapis.com/v1/projects/opiniao-com-br/databases/(default)/documents/items/?pageSize=299&orderBy=created'

export const state = () => ({
  items: []
})

export const mutations = {
  setItems: (state, items) => {
    state.items = items
  }
}

export const getters = {
  getItemsFromCategory: (state) => (categoryId) =>
    state.items.filter((item) => item.categoryId === categoryId)
}

export const actions = {
  fetchItems({ commit }) {
    this.$axios
      .$get(url)
      .then((response) => FireStoreParser(response).documents)
      .then((documents) =>
        documents.map((document) => ({
          id: document.name.match(/([^/]*$)/)[0],
          ...document.fields
        }))
      )
      .then((documents) => commit('setItems', documents))
  }
}
