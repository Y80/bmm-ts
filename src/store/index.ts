import { createStore } from 'vuex'
import TagAPI from '../api/tag'
import { ITag } from '../interface'

interface State {
  tags: ITag[]
}

export default createStore<State>({
  state() {
    return {
      tags: [],
    }
  },

  getters: {},

  mutations: {
    setTags(state, payload) {
      state.tags = payload
    },
  },

  actions: {
    async getAllTags({ state }) {
      state.tags = await TagAPI.getAll()

      return state.tags
    },
  },

  modules: {},
})
