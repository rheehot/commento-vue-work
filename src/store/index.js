import Vue from "vue";
import Vuex from "vuex";
import getCategories from "../apis/categoryApi";

Vue.use(Vuex);

export const ADD_POST = "ADD_POST";
export const UPDATE_ORD = "UPDATE_ORD";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_LIMIT = "UPDATE_LIMIT";
export const TOGGLE_FILTER = "TOGGLE_FILTER";
export const TOGGLE_CATEGORY = "TOGGLE_CATEGORY";

export default new Vuex.Store({
  state: {
    isFilterClicked: false,
    ord: "asc",
    categories: [{ id: "", name: "", checked: true }],
    limit: 8,
    posts: [
      {
        categoryName: "",
        categoryId: "",
        userId: "",
        created: "",
        title: "",
        contents: "",
        img: ""
      }
    ]
  },
  mutations: {
    [ADD_POST](state, { posts }) {
      for (let i = 0; i < posts.length; i++) {
        Vue.set(state.posts, i, posts[i]);
      }
    },
    [UPDATE_ORD](state, { ord }) {
      state.ord = ord;
      state.limit = 10;
      Vue.set(state, "posts", []);
    },
    [UPDATE_CATEGORY](state, { categories }) {
      for (let i = 0; i < categories.length; i++) {
        Vue.set(state.categories, i, categories[i]);
      }
    },
    [UPDATE_LIMIT](state, { limit }) {
      state.limit = limit;
    },
    [TOGGLE_FILTER](state) {
      state.isFilterClicked = !state.isFilterClicked;
    },
    [TOGGLE_CATEGORY](state, { id }) {
      const targetIdx = state.categories.findIndex(
        category => category.id === id
      );
      Vue.set(
        state.categories[targetIdx],
        "checked",
        !state.categories[targetIdx]["checked"]
      );
    }
  },
  actions: {
    async addCategories(context) {
      const categories = await getCategories();
      context.commit(UPDATE_CATEGORY, { categories });
    }
  }
});
