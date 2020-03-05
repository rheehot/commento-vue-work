<template>
  <div class="ad">
    <p class="ad__mark">sponsored</p>
    <div class="ad__main">
      <img
        class="ad__img"
        :src="`https://cdn.comento.kr/assignment/${post.img}`"
        alt="광고사진"
      />
      <div class="ad__description">
        <h2 class="ad__title">{{ post.title }}</h2>
        <p class="ad__contents">{{ post.contents }}</p>
      </div>
    </div>
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
@import "../../styles/_placeholders.scss";

.ad {
  $ad: &;
  @extend %post-style;
  height: 255px;

  &__mark {
    color: #adb5bd;
    margin-bottom: 16.5px;
  }

  &__main {
    display: flex;

    #{$ad}__img {
      max-height: 179px;
      margin-right: 29.5px;
    }

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  &__description {
    min-width: 0;

    #{$ad}__title {
      max-height: 55px;
      margin-bottom: 11px;
      -webkit-line-clamp: 3;

      @extend %vertical-ellipsis;
    }

    #{$ad}__contents {
      max-height: 99px;
      -webkit-line-clamp: 5;

      @extend %vertical-ellipsis;

      @media (max-width: 480px) {
        -webkit-line-clamp: 3;
      }
    }
  }

  @media (max-width: 480px) {
    height: 381px;
  }
}
</style>
