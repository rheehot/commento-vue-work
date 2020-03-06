<template>
  <div class="post">
    <div class="post__intro">
      <span>{{ post.categoryName }}</span>
      <span>카테고리 아이디: {{ post.categoryId }}</span>
    </div>
    <hr class="divider" />
    <div class="post__create">
      <h3 class="post__author">{{ post.userId }}</h3>
      <span class="post__vertical">|</span>
      <span>{{ post.created }}</span>
    </div>
    <h2 class="post__title">{{ post.title }}</h2>
    <p class="post__contents">{{ post.contents }}</p>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";
@import "../../styles/_placeholders.scss";

.post {
  $post: &;
  @extend %post-style;

  &__intro {
    display: flex;
    justify-content: space-between;
    color: #7e848a;
  }

  &__create {
    display: flex;
    margin-bottom: 17px;

    #{$post}__author {
      color: $primary-green;
    }

    #{$post}__vertical {
      margin: 0 10px;
      color: $primary-grey;
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;

    @extend %text-ellipsis;
  }

  &__contents {
    @extend %text-ellipsis;
  }
}

.divider {
  height: 2px;
  border: none;
  background-color: $primary-grey;
  margin-top: 11px;
  margin-bottom: 15px;
}
</style>
