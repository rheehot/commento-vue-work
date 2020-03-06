import Vue from "vue";
import Vuex from "vuex";
import getCategories from "../apis/categoryApi";
import getDetailFromApi from "../apis/detailApi";

Vue.use(Vuex);

export const ADD_POST = "ADD_POST";
export const UPDATE_ORD = "UPDATE_ORD";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_LIMIT = "UPDATE_LIMIT";
export const UPDATE_DETAIL = "UPDATE_DETAIL";
export const UPDATE_SEARCH = "UPDATE_SEARCH";
export const TOGGLE_FILTER = "TOGGLE_FILTER";
export const TOGGLE_CATEGORY = "TOGGLE_CATEGORY";

export default new Vuex.Store({
  state: {
    isFilterClicked: false,
    ord: "asc",
    categories: [{ id: "", name: "", checked: true }],
    limit: 8,
    search: "",
    posts: [
      {
        id: "",
        categoryName: "",
        categoryId: "",
        userId: "",
        created: "",
        title: "",
        contents: "",
        img: ""
      }
    ],
    detail: {
      email: "",
      title: "",
      contents: "",
      created: "",
      replies: [
        {
          name: "",
          title: "",
          contents: "",
          created: ""
        }
      ]
    }
  },
  mutations: {
    [ADD_POST](state, { posts }) {
      const filterdPosts = posts.filter(post =>
        post.contents.includes(state.search)
      );
      for (let i = 0; i < filterdPosts.length; i++) {
        Vue.set(state.posts, i, filterdPosts[i]);
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
    [UPDATE_DETAIL](state, { detail }) {
      Vue.set(state, "detail", detail);
    },
    [UPDATE_LIMIT](state, { limit }) {
      state.limit = limit;
    },
    [UPDATE_SEARCH](state, { search }) {
      state.search = search;
      state.limit = 10;
      Vue.set(state, "posts", []);
    },
    [TOGGLE_FILTER](state) {
      state.isFilterClicked = !state.isFilterClicked;
    },
    [TOGGLE_CATEGORY](state, { checkedIds }) {
      const beforeLength = state.categories.filter(c => c.checked).length;
      const beforeSum = state.categories
        .filter(c => c.checked)
        .reduce((a, c) => a + c.id, 0);

      for (let category of state.categories) {
        if (checkedIds.includes(category.id)) {
          Vue.set(category, "checked", true);
          continue;
        }
        Vue.set(category, "checked", false);
      }

      const afterLength = state.categories.filter(c => c.checked).length;
      const afterSum = state.categories
        .filter(c => c.checked)
        .reduce((a, c) => a + c.id, 0);
      if (beforeSum !== afterSum || beforeLength !== afterLength) {
        state.limit = 10;
        Vue.set(state, "posts", []);
      }
    }
  },
  actions: {
    async addCategories(context) {
      const categories = await getCategories();
      context.commit(UPDATE_CATEGORY, { categories });
    },
    async addDetail(context, { id }) {
      const detail = await getDetailFromApi(id);
      context.commit(UPDATE_DETAIL, { detail });
    }
  }
});
