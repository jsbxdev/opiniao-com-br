import FireStoreParser from 'firestore-parser'

const url =
  'https://firestore.googleapis.com/v1/projects/opiniao-com-br/databases/(default)/documents/categories/?pageSize=20'

export const state = () => ({
  categories: []
})

export const mutations = {
  setCategories: (state, categories) => {
    state.categories = categories
  }
}

export const getters = {
  getCategoryById: (state) => (categoryId) =>
    state.categories.find((category) => category.id === categoryId),
  getCategoryList: (state) => state.categories
}

export const actions = {
  fetchCategories({ commit }) {
    this.$axios
      .$get(url)
      .then((response) =>
        FireStoreParser(response).documents.map((category) => ({
          id: category.name.match(/([^/]*$)/)[0],
          ...category.fields
        }))
      )
      .then((document) => document.sort((a, b) => a.order - b.order))
      .then((documents) => commit('setCategories', documents))
  }
}
