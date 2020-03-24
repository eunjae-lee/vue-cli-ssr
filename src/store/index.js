import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const createStore = () => {
  const store = new Vuex.Store({
    state: () => ({
      items: {}
    }),
    getters: {},
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      }
    },
    actions: {
      fetchItem({ commit }, id) {
        return new Promise(resolve => {
          commit("setItem", {
            id,
            item: {
              id: `item-${id}`,
              name: `this is item ${id}.`
            }
          });
          resolve();
        });
      }
    },
    modules: {}
  });

  return store;
};
