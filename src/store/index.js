import Vue from "vue";
import Vuex from "vuex";
import algoliasearch from "algoliasearch";

Vue.use(Vuex);

const client = algoliasearch("latency", "af044fb0788d6bb15f807e4420592bc5");
const index = client.initIndex("instant_search");

/*
    {
      name: 'Amazon - Fire TV Stick with Alexa Voice Remote - Black',
      description: 'Enjoy smart access to videos, games and apps with this',
      brand: 'Amazon',
      categories: [Array],
      hierarchicalCategories: [Object],
      type: 'Streaming media plyr',
      price: 39.99,
      price_range: '1 - 50',
      image: 'https://cdn-demo.algolia.com/bestbuy-0118/5477500_sb.jpg',
      url: 'https://api.bestbuy.com/click/-/5477500/pdp',
      free_shipping: false,
      rating: 4,
      popularity: 21469,
      objectID: '5477500',
      _highlightResult: [Object]
    },
*/

export const createStore = () => {
  const store = new Vuex.Store({
    modules: {
      search: {
        namespaced: true,
        state: () => ({
          result: {
            hits: undefined,
            nbHits: undefined,
            page: undefined,
            nbPages: undefined,
            hitsPerPage: undefined,
            query: undefined
          }
        }),
        mutations: {
          setResult(state, { hits, nbHits, page, nbPages, hitsPerPage, query }) {
            Vue.set(state, "result", { hits, nbHits, page, nbPages, hitsPerPage, query });
          }
        },
        actions: {
          search({ commit }, { query }) {
            return index.search(query).then(({ hits, nbHits, page, nbPages, hitsPerPage }) => {
              commit("setResult", { hits, nbHits, page, nbPages, hitsPerPage, query });
            });
          }
        }
      }
    }
  });

  return store;
};
