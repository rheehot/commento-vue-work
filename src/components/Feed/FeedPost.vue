<template>
  <div>
    <router-link :to="{ path: `/detail/${post.id}` }">
      <feed-real
        v-if="post.categoryName && post.categoryName.length"
        :post="post"
      ></feed-real>
    </router-link>
    <feed-ad v-if="post.img && post.img.length" :post="post"></feed-ad>
  </div>
</template>

<script>
import FeedReal from "./FeedReal";
import FeedAd from "./FeedAd";

export default {
  props: {
    post: Object
  },
  components: {
    FeedReal,
    FeedAd
  }
};
</script>
