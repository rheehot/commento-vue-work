<template>
  <section v-show="detail">
    <div class="wrapper">
      <div class="detail">
        <div class="detail__main">
          <h2>{{ detail.title }}</h2>
          <p>{{ detail.contents }}</p>
          <span>{{ detail.created }}</span>
        </div>
        <p>
          답변
          <span class="detail__reply-length">{{ detail.replies.length }}</span>
        </p>
        <div
          v-for="(reply, index) in detail.replies"
          :key="index"
          class="detail__reply"
        >
          <p>{{ reply.name }}</p>
          <hr />
          <h2>{{ reply.title }}</h2>
          <p>{{ reply.contents }}</p>
          <span>{{ reply.created }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    detail() {
      return this.$store.state.detail;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/_placeholders.scss";
@import "../../styles/_variables.scss";

.detail {
  line-height: 1.56;
  &__main {
    max-width: 1140px;
    border: solid 1px $primary-green;

    @extend %detail-style;
  }

  &__reply {
    max-width: 1140px;
    border: solid 1px $primary-grey;

    &-length {
      color: $primary-green;
    }

    @extend %detail-style;
  }
}

hr {
  border: none;
  background-color: $primary-grey;
  height: 2px;
}

h2 {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
}

span {
  opacity: 0.7;
}
</style>
