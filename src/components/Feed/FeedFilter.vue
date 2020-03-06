<template>
  <div class="filter">
    <div class="filter__select">
      <button
        @click="onClickAsc"
        :class="[ord === 'asc' ? activeElementClass : elementClass]"
      >
        <span></span>오름차순
      </button>
      <button
        @click="onClickDesc"
        :class="[ord === 'desc' ? activeElementClass : elementClass]"
      >
        <span></span>내림차순
      </button>
    </div>
    <button @click="onClickFilter" class="filter__button">필터</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { UPDATE_ORD, TOGGLE_FILTER } from "../../store/index";

export default {
  data() {
    return {
      elementClass: "filter__element",
      activeElementClass: "filter__element--active"
    };
  },
  methods: {
    onClickAsc() {
      this.$store.commit(UPDATE_ORD, { ord: "asc" });
    },
    onClickDesc() {
      this.$store.commit(UPDATE_ORD, { ord: "desc" });
    },
    onClickFilter() {
      this.$store.commit(TOGGLE_FILTER);
    }
  },
  computed: {
    ...mapState(["ord"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";

.filter {
  $filter: &;
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;

  &__select {
    display: flex;
  }

  &__button {
    width: 48px;
    height: 24px;
    border-radius: 3px;
    border: solid 1px $primary-grey;
    background-color: #ffffff;
    cursor: pointer;
  }

  &__element {
    $element: &;
    height: 19px;
    font-size: 13px;
    line-height: 1.92;
    text-align: left;
    color: #adb5bd;
    font-family: SpoqaHanSans;
    margin-right: 10px;
    cursor: pointer;

    span {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #adb5bd;
      border-radius: 5px;
      margin-right: 5px;
    }

    &--active {
      @extend #{$element};
      color: #495057;
      font-weight: bold;

      span {
        background-color: #00c854;
      }
    }
  }
}
</style>
