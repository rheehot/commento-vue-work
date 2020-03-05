<template>
  <div>
    <shared-header></shared-header>
    <feed-section></feed-section>
  </div>
</template>

<script>
import SharedHeader from "../components/Shared/SharedHeader";
import FeedSection from "../components/Feed/FeedSection";

export default {
  name: "Feed",
  components: {
    SharedHeader,
    FeedSection
  },
  mounted() {
    this.$store.dispatch("addCategories");
  }
};
</script>
