<template>
  <div>
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
    <input
      @input="onInputSearch"
      v-model="search"
      class="search"
      type="text"
      placeholder="검색"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { UPDATE_ORD, TOGGLE_FILTER, UPDATE_SEARCH } from "../../store/index";

let debounceTimeout = null;
export default {
  data() {
    return {
      elementClass: "filter__element",
      activeElementClass: "filter__element--active",
      search: ""
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
    },
    onInputSearch() {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        this.$store.commit(UPDATE_SEARCH, { search: this.search });
      }, 1000);
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
        background-color: $primary-green;
      }
    }
  }
}

.search {
  margin-bottom: 1rem;
  border-radius: 3px;
  border: 1px solid $primary-grey;
  padding: 0.3rem 1rem;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
