<template>
  <section>
    <div class="wrapper">
      <div class="feed">
        <button class="feed__login">로그인</button>
        <div class="feed__contents">
          <feed-filter></feed-filter>
          <feed-post
            v-for="(post, index) in posts"
            :post="post"
            :key="index"
          ></feed-post>
          <infinite-loading
            :identifier="infiniteId"
            @infinite="infiniteHandler"
          >
            <div slot="no-more">더 이상의 결과가 없습니다.</div>
            <div slot="no-results">결과가 없습니다.</div>
          </infinite-loading>
        </div>
      </div>
    </div>
    <feed-modal v-if="isFilterClicked"></feed-modal>
  </section>
</template>

<script>
import getPostsFromApi from "../../apis/feedApi";
import { ADD_POST, UPDATE_LIMIT } from "../../store/index";
import { mapState } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import FeedFilter from "./FeedFilter";
import FeedPost from "./FeedPost";
import FeedModal from "./FeedModal";

export default {
  components: {
    FeedFilter,
    FeedPost,
    FeedModal,
    InfiniteLoading
  },
  computed: {
    ...mapState(["posts", "ord", "categories", "limit", "isFilterClicked"]),
    infiniteId() {
      return (
        this.ord +
        this.categories.filter(c => c.checked).reduce((a, c) => a + c.name, 0)
      );
    }
  },
  methods: {
    infiniteHandler($state) {
      getPostsFromApi(this.ord, this.categories, this.limit).then(posts => {
        if (this.posts.length < posts.length) {
          this.$store.commit(ADD_POST, { posts });
          this.$store.commit(UPDATE_LIMIT, { limit: this.limit + 10 });
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/_variables";

.feed {
  display: flex;

  &__login {
    background-color: $primary-green;
    width: 235px;
    height: 60px;
    border-radius: 5px;
    color: white;
    font-size: 1.5rem;
    margin-right: 40px;

    @media (max-width: 480px) {
      display: none;
    }
  }

  &__contents {
    flex: 1;
    min-width: 0;
  }
}
</style>
